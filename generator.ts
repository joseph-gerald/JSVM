import { parse } from "@babel/parser"
import * as types from "@babel/types";
import traverse from "@babel/traverse"

import code_utils from "./utils/code_utils";

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
    console.log(keys)
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
                    
                    // arguments of call
                    for (let arg of node.arguments) {
                        if(types.isIdentifier(arg)) {
                            args.push("identifier in args");
                        } else if(types.isStringLiteral(arg)) {
                            args.push(arg.value);
                        } else if(types.isNumericLiteral(arg)) {
                            args.push(arg.value);
                        } else {
                            console.log("Argument type not implemented: " + arg.type)
                        }
                    }

                    // coolObject.coolFunction()
                    if(types.isMemberExpression(node.callee)) {
                        addInstruction("GET", handleMemberExpression(node.callee))
                    }

                    // coolFunction()
                    if(types.isIdentifier(node.callee)) {
                        addInstruction("GET", JSON.stringify([node.callee.name]))
                    }

                    for (let arg of args) {
                        addInstruction("STORE", typeof arg == "string" ? '"' + arg + '"' : arg)
                    }

                    addInstruction("INVOKE", [args.length])
                    break;
                case "BinaryExpression":
                    if(!types.isBinaryExpression(node)) return;

                    if(types.isNumericLiteral(node.left)) {
                        addInstruction("STORE", node.left.value);
                    }

                    
                    if(types.isNumericLiteral(node.right)) {
                        addInstruction("STORE", node.right.value);
                    }

                    const operations : { [key: string]: any } = {
                        "+": "OADD",
                        "-": "OSUB",
                        "*": "OMUL",
                        "/": "ODIV",
                        "^": "OXOR",
                        "|": "OBOR",
                        "&": "OAND",
                        "**": "OEXP"
                    }

                    addInstruction(operations[node.operator],"");
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

    //output = await code_utils.minify(output)

    return output;
};