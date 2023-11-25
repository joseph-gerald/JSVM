import { parse } from "@babel/parser"
import * as types from "@babel/types";
import traverse from "@babel/traverse"
import fs from "fs";

import code_utils from "./utils/code_utils";
import string_utils from "./utils/string_utils";
var beautify = require('js-beautify/js').js;

export const transform = async (code: string) => {
    const state = btoa(Math.random().toString()).split("=").join("");
    const ast = parse(code, {
        // sourceType: 'module',
        plugins: ["jsx"],
    });

    let context: any[] = [];
    let handling_call_expression = 0;
    let output = "";
    let store_invokes = 0;

    const handledNodeTypes = new Set();

    const addInstruction = (instruction: string, args: any = null) => {
        output += `
        [
            ${code_utils.getInstruction(instruction)},${args == null ? '' : '\n            ' + args}
        ],`
        return [instruction, args]
    }

    let handled: any[] = [];

    function setHandled(node: any) {
        handled.push(node.loc);
    }

    const handleKeys = (node: types.MemberExpression) => {
        let keys: string[] = [];


        if (types.isMemberExpression(node.object)) {
            keys.push(...handleKeys(node.object))
            setHandled(node.object);
        }

        if (types.isIdentifier(node.object)) {
            keys.push(node.object.name);
            setHandled(node.object);
        }

        if (types.isThisExpression(node.object)) {
            keys.push("this")
            setHandled(node.object);
        }

        // property

        if (types.isIdentifier(node.property)) {
            keys.push(node.property.name);
            setHandled(node.property);
        }

        if (types.isStringLiteral(node.property)) {
            keys.push(node.property.value);
            setHandled(node.property);
        }

        if (types.isThisExpression(node.property)) {
            keys.push("this")
            setHandled(node.property);
        }

        return keys;
    }

    const handleLiteral = (node: types.Node) => {
        if (types.isNumericLiteral(node) || types.isStringLiteral(node)) {
            addInstruction("STORE", types.isStringLiteral(node) ? '"' + node.value + '"' : node.value);
            setHandled(node);
        }
    }

    const handleValue = (node: types.Node) => {
        if (types.isLiteral(node)) {
            handleLiteral(node);
            return;
        }

        handleNode(node)

        if(types.isUpdateExpression(node) && types.isIdentifier(node.argument))
            addInstruction("READ_REGISTRY",JSON.stringify([node.argument.name]))
    }

    const handleNode = (node: types.Node) => {
        const nodeType = node.type;

        if (handled.includes(node.loc)) {
            //console.log("SKIPPED: " + nodeType)
            return;
        }

        switch (nodeType) {
            case "Program":
                output = `${code_utils.vmCode}\nend_of_vm_${state}\nvm.EXECUTE([${output}`;
                break;

            // Declerations
            case "FunctionDeclaration":
                if(!types.isFunctionDeclaration(node)) return;
                if(!types.isBlockStatement(node.body)) return;

                var start = string_utils.get_jump_address();
                var end = string_utils.get_jump_address();

                const id = node.id;

                setHandled(node.id);
                console.log(node.id?.loc)

                const params = node.params;
                const body = node.body;

                addInstruction("STORE", '"' + start + '"')
                addInstruction("STORE", '"' + id?.name + '"')
                addInstruction("REGISTER");

                addInstruction("JUMP", '"' + end + '"')
                addInstruction("LABEL", '"' + start + '"')

                context = [id?.name,start]

                for (const param of params) {
                    if(!types.isIdentifier(param)) continue;
                    addInstruction("STORE", JSON.stringify(context.concat(param.name)));
                    addInstruction("REGISTER");
                    setHandled(param);
                }


                handleNode(body);
                
                context = [];

                addInstruction("RETURN")
                addInstruction("LABEL", '"' + end + '"')
                break;

            case "VariableDeclaration":
                if (!types.isVariableDeclaration(node)) return;
                for (const decleration of node.declarations)
                    handleNode(decleration);
                break;
            case "VariableDeclarator":
                if (!types.isVariableDeclarator(node)) return;

                setHandled(node.id);

                const identifier = (node.id as types.Identifier).name;

                if (types.isStringLiteral(node.init) || types.isNumericLiteral(node.init)) {
                    handleLiteral(node.init);
                }

                if (
                    types.isIdentifier(node.init) ||
                    types.isBinaryExpression(node.init) ||
                    types.isObjectExpression(node.init))
                {
                    handleNode(node.init)
                }

                addInstruction("STORE", '"' + identifier + '"');
                addInstruction("REGISTER");
                break;

            case "Identifier":
                if (!types.isIdentifier(node)) return;
                addInstruction("READ_REGISTRY", JSON.stringify(context.concat([node.name] as any)));
                break;

            // Expression
            case "CallExpression":
                if (!types.isCallExpression(node)) return;
                if (handling_call_expression > 0) store_invokes++;
                handling_call_expression++;

                // coolObject.coolFunction()
                if (types.isMemberExpression(node.callee)) {
                    handleNode(node.callee);
                }

                // coolFunction()
                if (types.isIdentifier(node.callee)) {
                    setHandled(node.callee)
                    addInstruction("GET", JSON.stringify([node.callee.name]))
                }

                let args: any[] = [];

                // arguments of call
                for (let arg of node.arguments) {
                    if (types.isIdentifier(arg)) {
                        console.log("identifier: " + arg.name)
                        args.push(handleNode(arg))
                    } else if (types.isMemberExpression(arg)) {
                        args.push(addInstruction("READ_REGISTRY", JSON.stringify(handleKeys(arg))))
                    } else if (types.isStringLiteral(arg)) {
                        args.push(addInstruction("STORE", '"' + arg.value + '"'))
                    } else if (types.isNumericLiteral(arg)) {
                        args.push(addInstruction("STORE", arg.value))
                    } else if (types.isBinaryExpression(arg)) {
                        args.push(handleNode(arg));
                    } else if (types.isCallExpression(arg)) {
                        args.push(handleNode(arg))
                    } else {
                        console.log("Argument type not implemented: " + arg.type)
                    }
                }

                handling_call_expression--;
                addInstruction(store_invokes-- > 0 ? "SINVOKE" : "INVOKE", [args.length])
                break;
            case "MemberExpression":
                if (!types.isMemberExpression(node)) return;

                addInstruction("GET", JSON.stringify(handleKeys(node)));
                break;
            case "BinaryExpression":
                if (!types.isBinaryExpression(node)) return;

                for (let subNode of [node.left, node.right]) {
                    handleValue(subNode);
                }

                addInstruction(code_utils.operations[node.operator], "")
                break;
            case "AssignmentExpression":
                if (!types.isAssignmentExpression(node)) return;
                if (!types.isIdentifier(node.left) && !types.isMemberExpression(node.left)) return;



                switch (node.operator) {
                    case "=":
                        if(types.isIdentifier(node.left)) {
                            setHandled(node.left);
                            handleValue(node.right)
                            addInstruction("STORE", '"' + node.left.name + '"');
                            addInstruction("REGISTER");
                        }

                        if(types.isMemberExpression(node.left)) {
                            setHandled(node.left);
                            addInstruction("STORE", JSON.stringify(handleKeys(node.left)));
                            handleValue(node.right)
                            addInstruction("ASSIGN");
                        }
                        break;
                    default:
                        const operation = node.operator.charAt(0);

                        if(types.isIdentifier(node.left)) {
                            setHandled(node.left);
                            
                            addInstruction("READ_REGISTRY", '"' + node.left.name + '"')
                            handleValue(node.right)

                            addInstruction(code_utils.operations[operation])
                            
                            addInstruction("STORE", '"' + node.left.name + '"');
                            addInstruction("REGISTER");
                        }

                        if(types.isMemberExpression(node.left)) {
                            setHandled(node.left);
                            addInstruction("STORE", JSON.stringify(handleKeys(node.left)));
                            handleValue(node.right)
                            addInstruction("ASSIGN");
                        }
                        break;
                }
                break;
            case "UpdateExpression":
                if (!types.isUpdateExpression(node) || !types.isIdentifier(node.argument)) return;

                handleNode(node.argument);
                addInstruction("STORE", "1");

                addInstruction(node.operator == "++" ? "OADD" : "OSUB");
                addInstruction("STORE", '"' + node.argument.name + '"');
                addInstruction("REGISTER")
                break;
            case "ObjectExpression":
                if(!types.isObjectExpression(node)) return;

                for (const prop of node.properties) {
                    
                }
                break;
            

            // Literals
            case "StringLiteral":
            case "NumericLiteral":
                break;

            // Statements
            case "BlockStatement":
                if (!types.isBlockStatement(node)) return;

                for (const subNode of node.body) {
                    handleNode(subNode);
                }
                break;
            case "ExpressionStatement":
                if (!types.isExpressionStatement(node)) return;
                handleNode(node.expression);
                break;
            case "ReturnStatement":
                addInstruction("RETURN")
                break;

            // Control Flow
            case "IfStatement":
                if (!types.isIfStatement(node)) return;

                var firstBlockEnd = string_utils.get_jump_address();
                var end = string_utils.get_jump_address();

                // handle test/condition
                if (types.isBinaryExpression(node.test)) {
                    handleNode(node.test);
                }

                if (types.isIdentifier(node.test)) {
                    handleNode(node.test);
                }

                if (types.isCallExpression(node.test)) {

                }

                addInstruction("CJUMP", '"' + firstBlockEnd + '"')

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
            case "WhileStatement":
                if (!types.isWhileStatement(node)) return;

                var loopStart = string_utils.get_jump_address();
                var end = string_utils.get_jump_address();

                // Set label at start of block statement so it can jump up to repeat
                addInstruction("LABEL", '"' + loopStart + '"')

                handleNode(node.body);

                // handle test/condition
                if (types.isBinaryExpression(node.test)) {
                    handleNode(node.test);
                }

                if (types.isIdentifier(node.test)) {
                    handleNode(node.test);
                }

                addInstruction("STORE",1);
                addInstruction("OSUB");

                addInstruction("CJUMP", '"' + loopStart + '"')
                break;

            // Default case for unhandled node types
            default:
                if (!handledNodeTypes.has(nodeType)) {
                    console.log(`${nodeType} not implemented`);
                    handledNodeTypes.add(nodeType);
                }
                return;
        }

        setHandled(node);
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
    //console.log(splitted[1])
    splitted[1] = splitted[1].slice(splitted[1].charAt(1) == " " ? 2 : 1)
    const vm = splitted[0];
    const bytecode = splitted[1];
    output = splitted.join("");

    console.log(bytecode)
    
    fs.writeFileSync("output/vm.js", beautify(vm));
    fs.writeFileSync("output/bytecode.js", beautify(bytecode));

    return output;
};