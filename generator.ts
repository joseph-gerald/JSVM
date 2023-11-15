import { parse } from "@babel/parser"
import generate from "@babel/generator"
import * as types from "@babel/types";
import traverse from "@babel/traverse"

import code_utils from "./utils/code_utils";
import vm from "./utils/vm";

function handleMemberExpression(node: types.Node) {
    let keys: string[] = [];

    if(types.isMemberExpression(node)) {
        if(types.isIdentifier(node.object)) {
            keys.push(node.object.name);
            
            if(types.isIdentifier(node.property)) {
                keys.push(node.property.name);
            } else if(types.isStringLiteral(node.property)) {
                keys.push(node.property.value);
            }
        }
    }

    return JSON.stringify(keys);
}

export const transform = async (code: string) => {
    const ast = parse(code, {
        // sourceType: 'module',
        plugins: ["jsx"],
    });

    let output = "vm.EXECUTE([";

    const handledNodeTypes = new Set();

    const addInstruction = (instruction: string, args: any) => {
        output += `
        [
            ${code_utils.getInstruction(instruction)},
            ${args}
        ],
        `
    }

    traverse(ast, {
        enter(path) {
            const node = path.node;
            const nodeType = node.type;

            // Handle specific node types
            console.log("Node -> " + nodeType)
            switch (nodeType) {
                case "IfStatement":
                    break;
                case "Identifier":
                    break;
                case "Program":
                    output = code_utils.vmCode + "\n" + output;
                    break;
                case "CallExpression":
                    if(!types.isCallExpression(node)) return;

                    let args: any[] = [];
                    
                    for (let arg of node.arguments) {
                        if(types.isIdentifier(arg)) {
                            args.push("identifier in args");
                        } else if(types.isStringLiteral(arg)) {
                            args.push(arg.value);
                        } else if(types.isNumericLiteral(arg)) {
                            args.push(arg.value);
                        }
                    }

                    if(types.isMemberExpression(node.callee)) {
                        addInstruction("GET", handleMemberExpression(node.callee))
                    }

                    for (let arg of args) {
                        addInstruction("STORE", typeof arg == "string" ? '"' + arg + '"' : arg)
                    }

                    addInstruction("INVOKE", [args.length])
                    break;
                case "MemberExpression":

                    break;

                // Default case for unhandled node types
                default:
                    if (!handledNodeTypes.has(nodeType)) {
                        console.log(`${nodeType} not implemented`);
                        handledNodeTypes.add(nodeType);
                    }
            }
        },
    });

    output += "])";

    output = await code_utils.minify(output)

    return output;
};