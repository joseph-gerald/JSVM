import { parse } from "@babel/parser"
import * as types from "@babel/types";
import traverse from "@babel/traverse"
import fs from "fs";

import code_utils from "./utils/code_utils";
import string_utils from "./utils/string_utils";
var beautify = require('js-beautify/js').js;

function handleMemberExpression(node: types.Node) {
    let keys: string[] = [];

    if (types.isMemberExpression(node)) {
        if (types.isIdentifier(node.object)) {
            keys.push(node.object.name);

            if (types.isIdentifier(node.property)) {
                keys.push(node.property.name);
            } else if (types.isStringLiteral(node.property)) {
                keys.push(node.property.value);
            }
        }
    }
    //console.log(keys)
    return JSON.stringify(keys);
}

function handleBinaryExpression(node: types.BinaryExpression) {

    let instructions: any[] = [];

    for (let subNode of [node.left, node.right]) {
        if (types.isIdentifier(subNode)) {
            instructions.push(handleIdentifier(subNode));
        }

        if (types.isNumericLiteral(subNode)) {
            instructions.push(["STORE", subNode.value])
        }

        if (types.isStringLiteral(subNode)) {
            instructions.push(["STORE", '"' + subNode.value + '"'])
        }

        if (types.isBinaryExpression(subNode)) {
            instructions.push(...handleBinaryExpression(subNode))
        }
    }

    instructions.push([code_utils.operations[node.operator], ""])

    return instructions;
}

function handleIdentifier(node: types.Identifier) {
    return ["READ_REGISTRY", '"' + node.name + '"']
}

export const transform = async (code: string) => {
    const state = btoa(Math.random().toString()).split("=").join("");
    const ast = parse(code, {
        // sourceType: 'module',
        plugins: ["jsx"],
    });

    let output = "";

    const handledNodeTypes = new Set();

    const addInstruction = (instruction: string, args: any = null) => {
        output += `
        [
            ${code_utils.getInstruction(instruction)},${args == null ? '' : '\n            ' + args}
        ],`
        return [instruction, args]
    }

    let handled: any[] = [];

    const handleNode = (node: types.Node) => {
        const nodeType = node.type;

        if (handled.includes(node.loc)) {
            console.log("SKIPPED: " + nodeType)
            return;
        }

        switch (nodeType) {
            case "VariableDeclaration":
                // kinda useless cause we dont care of its type (const,let,var)
                break;
            case "IfStatement":
                if (!types.isIfStatement(node)) return;

                const firstBlockEnd = string_utils.make_large_string(Date.now() % 1000000, 5).slice(1);
                const end = string_utils.make_large_string(Date.now() % 1000000, 5).slice(1);

                // handle test/condition
                if (types.isBinaryExpression(node.test)) {
                    const instructions = handleBinaryExpression(node.test);

                    for (const instruction of instructions) {
                        addInstruction.apply(null, instruction);
                    }
                }

                addInstruction("CJUMP", '"' + firstBlockEnd + '"')

                if (types.isIdentifier(node.test)) {
                    addInstruction.apply(0, handleIdentifier(node.test) as any);
                }

                if (types.isCallExpression(node.test)) {

                }

                // First block

                // if(...) {}
                // if(...) thing()
                if (node.consequent) {
                    handleNode(node.consequent);
                }

                addInstruction("JUMP", '"' + end + '"')
                addInstruction("LABEL", '"' + firstBlockEnd + '"')

                // Latter block

                // if(...) {}
                // if(...) thing()
                if (node.alternate) {
                    handleNode(node.alternate);
                }

                addInstruction("LABEL", '"' + end + '"')
                break;
            case "VariableDeclarator":
                if (!types.isVariableDeclarator(node)) return;

                const identifier = (node.id as types.Identifier).name;

                if (types.isStringLiteral(node.init) || types.isNumericLiteral(node.init)) {
                    addInstruction("STORE", '"' + node.init.value + '"');
                }

                if (types.isIdentifier(node.init)) {
                    addInstruction.apply(0, handleIdentifier(node.init) as any);
                }

                if (types.isBinaryExpression(node.init)) {
                    const instructions = handleBinaryExpression(node.init);

                    for (const instruction of instructions) {
                        addInstruction.apply(null, instruction);
                    }
                }

                addInstruction("STORE", '"' + identifier + '"');
                addInstruction("REGISTER");
                break;
            case "Identifier":
                break;
            case "Program":
                output = `${code_utils.vmCode}\nend_of_vm_${state}\nvm.EXECUTE([${output}`;
                break;
            case "CallExpression":
                if (!types.isCallExpression(node)) return;

                // coolObject.coolFunction()
                if (types.isMemberExpression(node.callee)) {
                    addInstruction("GET", handleMemberExpression(node.callee))
                }

                // coolFunction()
                if (types.isIdentifier(node.callee)) {
                    addInstruction("GET", JSON.stringify([node.callee.name]))
                }

                let args: any[] = [];

                // arguments of call
                for (let arg of node.arguments) {
                    if (types.isIdentifier(arg)) {
                        console.log("identifier: " + arg.name)
                        args.push(addInstruction.apply(0, handleIdentifier(arg) as any))
                    } else if (types.isStringLiteral(arg)) {
                        args.push(addInstruction("STORE", '"' + arg.value + '"'))
                    } else if (types.isNumericLiteral(arg)) {
                        args.push(addInstruction("STORE", arg.value))
                    } else if (types.isBinaryExpression(arg)) {
                        const instructions = handleBinaryExpression(arg);

                        for (const instruction of instructions) {
                            args.push(addInstruction.apply(null, instruction));
                        }
                    } else {
                        console.log("Argument type not implemented: " + arg.type)
                    }
                }

                addInstruction("INVOKE", [args.length])
                break;
            case "BinaryExpression":
                if (!types.isBinaryExpression(node)) return;
                break;
            case "ExpressionStatement":
                if (!types.isExpressionStatement(node)) return;
                handleNode(node.expression);
                break;
            case "BlockStatement":
                if(!types.isBlockStatement(node)) return;

                for (const subNode of node.body) {
                    handleNode(subNode);
                }    
                break;
            // Default case for unhandled node types
            default:
                if (!handledNodeTypes.has(nodeType)) {
                    console.log(`${nodeType} not implemented`);
                    handledNodeTypes.add(nodeType);
                }
                return;
        }

        handled.push(node.loc);
    }

    traverse(ast, {
        enter(path) {
            const node = path.node;

            // Handle specific node types
            //console.log("Node -> " + nodeType)
            handleNode(node)
        },
    });

    output += "])";
    //console.log(output)

    try {
        output = await code_utils.minify(output)
    } catch (ignore) { }

    const splitted = output.split(`end_of_vm_${state}`);
    console.log(splitted[1])
    splitted[1] = splitted[1].slice(splitted[1].charAt(1) == " " ? 2 : 1)
    console.log(splitted[1])
    const vm = splitted[0];
    const bytecode = splitted[1];
    output = splitted.join("");

    fs.writeFileSync("output/vm.js", beautify(vm));
    fs.writeFileSync("output/bytecode.js", beautify(bytecode));

    return output;
};