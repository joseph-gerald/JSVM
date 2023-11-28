import { MangleOptions, MinifyOptions } from "terser";
import terser from "terser"

import string_utils from "./string_utils";

const shuffle = true; // false for debug

const mangleSettings: MangleOptions = {
    eval: true,
    properties: shuffle,
    reserved: [""],

};

var options: MinifyOptions = {
    toplevel: true,
    enclose: false,
    keep_classnames: true,
    mangle: mangleSettings,
    compress: {
        passes: 4,
        hoist_funs: true,
        hoist_vars: true,
        expression: true,
        arguments: true,
        unsafe_comps: true,
        unsafe_arrows: true,
        unsafe: true,
        unsafe_Function: true,
        unsafe_math: true,
        unsafe_symbols: true,
        unsafe_methods: true,
        unsafe_proto: true,
        unsafe_undefined: true,
        unsafe_regexp: true,
        unused: true
    },
    format: {
        preamble: `/* JOVM */`,
        beautify: !shuffle,
        semicolons: true,
    }
}

async function minify(code: string) {
    return (await terser.minify(code, options)).code as string;
}

const OPCODE_ARRAY = [
    "DEBUG",    // Logs environment to console    

    "STORE",    // store to constant pool
    "DUP",      // duplicate item from top of constant pool
    "DEL",      // delete item from top of constant pool
    "LOAD",     // load from top of constant pool
    "GOTO",     // jump to bytecode index
    "GET",      // fetch from global context

    // Control Flow

    "LABEL",    // Label
    "RETURN",   // Return visitor
    "VISIT",    // Visit label (same as jump but return will jump to instruction after)
    "CJUMP",    // Jump if false
    "JUMP",     // Jump to label
    "INVOKE",   // Invoke Function
    "SINVOKE",   // Invoke then store Function
    "ASSIGN",   // Assign Global Context

    // // Operations

    // Math Operations

    "OADD",  // Operation: Add
    "OSUB",  // Operation: Subtract
    "OMUL",  // Operation: Multiply
    "ODIV",  // Operation: Division
    "OEXP",  // Operation: Exponents
    "OMOD",  // Operation: Modulo
    "OXOR",  // Operation: Bitwise XOR
    "OBOR",  // Operation: Bitwise OR
    "OAND",  // Operation: Bitwise And
    "ONOT",  // Operation: Bitwise NOT

    "REGISTER",
    "READ_REGISTRY",

    // Logic Operations

    "OR",   // Operation: Or
    "NOT",  // Operation: Not
    "AND",  // Operation: And
    "OEQ",  // Operation: Equality
    "OIQ",  // Operation: Inequality
    "OGT",  // Operation: Greater Than
    "OGE",  // Operation: Greater / Equal
    "OLT",  // Operation: Less Than
    "OLE",  // Operation: Less / Equal
]

const dead_instructions = 20;

if (shuffle) {
    for (let i = 0; i < dead_instructions; i++) {
        OPCODE_ARRAY.push(btoa(Math.random().toString(16)).split("=").join(""))
    }
}

let ORIGINAL_OPCODES: { [key: string]: any } = OPCODE_ARRAY.reduce((obj, item, index) => ({ ...obj, [item]: index }), {});;

if (shuffle) {
    const opcodes_ids = string_utils.shuffleArray(Object.keys(ORIGINAL_OPCODES));

    ORIGINAL_OPCODES = {}

    for (const opcode_id of opcodes_ids) {
        ORIGINAL_OPCODES[opcode_id] = Object.keys(ORIGINAL_OPCODES).length;
    }
    // ORIGINAL_OPCODES = string_utils.shuffleDict(ORIGINAL_OPCODES); // won't work with current index based instruction handler
}

//console.log(ORIGINAL_OPCODES)

const OPCODES: { [key: string]: any } = structuredClone(ORIGINAL_OPCODES);

if (shuffle) {
    for (let key of Object.keys(OPCODES)) {
        OPCODES[string_utils.make_large_string(string_utils.calculateChecksum(key), 3)] = OPCODES[key];
        delete OPCODES[key]
    }
}

const OPCODE_KEYS = Object.keys(OPCODES);

const identifiers: { [key: string]: any } = {
    VM: "VM", 

    OPCODE_KEYS: "OPCODE_KEYS",
    OPCODES: "OPCODES",

    CPOOL: "CPOOL",
    STACK: "STACK",
    REGISTRY: "REGISTRY",

    HASH: "HASH",
    HASH_REDUCER: "HASH_REDUCER",
    HASH_MAPPER: "HASH_MAPPER",

    CINSERT: "CINSERT",
    SINSERT: "SINSERT",
    LINSERT: "LINSERT",
    VINSERT: "VINSERT",

    _LOAD: "_LOAD",
    _LOADX: "_LOADX",
    _SLOAD: "_SLOAD",

    _DUP: "_DUP",
    _SDUP: "_SDUP",
    _STORE: "_STORE",
    _GET: "_GET",
    _DIG: "_DIG",

    _INVOKE: "_INVOKE",

    _INVOKE_MATCH: "_INVOKE_MATCH",

    _INVOKE_JUMP: "_INVOKE_JUMP",
    _INVOKE_GLOBAL: "_INVOKE_GLOBAL",
    _REGISTER: "_REGISTER",
    _READ_REGISTRY: "_READ_REGISTRY",

    REGISTER: "REGISTER",
    READ_REGISTRY: "READ_REGISTRY",

    VISITS: "VISITS",
    LABELS: "LABELS",
    STORE_LABEL: "STORE_LABEL",
    _CREATE_LABEL: "_CREATE_LABEL",
    _FIND_LABEL: "_FIND_LABEL",

    _JUMP: "_JUMP",
    _VISIT: "_VISIT",
    _RETURN_VISITOR: "_RETURN_VISITOR",

    _ASSIGN: "_ASSIGN",
    _JUMP_OPERATION: "_JUMP_OPERATION",

    OP_INDEX: "OP_INDEX",
    OPERATIONS: "OPERATIONS",

    APPLIER: "APPLIER",
    SHIFTER: "SHIFTER",
    OPERATE: "OPERATE",

    UNSHIFTER: "UNSHIFTER",

    GETTHIS: "GETTHIS",
    OBJECT: "OBJECT",

    EXECUTE_INSN: "EXECUTE_INSN",
    EXECUTOR_ARGS: "EXECUTOR_ARGS",
    INSN_EXECUTOR: "INSN_EXECUTOR",
    EXECUTE: "EXECUTE_PROXY",
    GET_NEXT_INSTRUCTION: "GET_NEXT_INSTRUCTION",

    BTOA: "BTOA",
    BTOA_PROXY: "BTOA_PROXY",
    TRIPLE_BTOA: "TRIPLE_BTOA",
    LENGTH_PROXY: "LENGTH_PROXY",
    EMPTY_STRING: "EMPTY_STRING",
    REVERSE_PROXY: "REVERSE_PROXY",
    EQUALITY_PROXY: "EQUALITY_PROXY",
    OBJECT_CLONER: "OBJECT_CLONER",
    TYPEOF_PROXY: "TYPEOF_PROXY",
    MAPPER: "MAPPER",
    DEBUG: "DEBUG",
}

const getInstruction = (x: any) => {
    const OPCODE = OPCODE_KEYS[Object.keys(ORIGINAL_OPCODES).indexOf(x)]; // OPCODES gets mangled so have to comapre to original
    if (shuffle) {
        return OPCODES[OPCODE];
    } else {
        return `${identifiers.VM}.${identifiers.OPCODES}.${OPCODE}`;
    }
}

if (shuffle) {
    for (let key of Object.keys(identifiers)) {
        identifiers[key] = string_utils.make_large_string(string_utils.calculateChecksum(key), 3);
    }
}

const binaryOperations: { [key: string]: string } = {
    // Math
    "+": "OADD",
    "-": "OSUB",
    "*": "OMUL",
    "/": "ODIV",
    "^": "OXOR",
    "|": "OBOR",
    "&": "OAND",
    "%": "OMOD",
    "**": "OEXP",

    // Logic
    "&&": "AND",
    "||": "OR",
    "==": "OEQ",
    "!=": "OIQ",
    ">": "OGT",
    ">=": "OGE",
    "<": "OLT",
    "<=": "OLE"
}

const unaryOperations: { [key: string]: string } = {
    "~": "ONOT",
    "!": "NOT",
}

let MATH_OPERATIONS = "";

// generate operation opcodes
for (let operation of structuredClone(Object.keys(binaryOperations)).concat(Object.keys(unaryOperations))) {
    const isUnary = Object.keys(unaryOperations).includes(operation);
    MATH_OPERATIONS += `
set ${OPCODE_KEYS[ORIGINAL_OPCODES[isUnary ? unaryOperations[operation] : binaryOperations[operation]]]}(_) {
    ${isUnary ? `${identifiers.VM}.${identifiers.OPERATE}([_,a => ${operation}a]);` : `${identifiers.VM}.${identifiers.OPERATE}([_,(a, b) => a ${operation} b]);`
        }
}, | - SPLIT >
    `
}

//console.log(MATH_OPERATIONS)

function splitObject(obj: any, chunkLength: number): any[] {
    let keys = Object.keys(obj);

    function chunkArray(array: any[], chunkSize: number): any[] {
        return Array.from(
            { length: Math.ceil(array.length / chunkSize) },
            (_, i) => array.slice(i * chunkSize, i * chunkSize + chunkSize)
        );
    }

    let chunks = chunkArray(keys, chunkLength);

    let result = chunks.map((chunk: any[]) => {
        let newObj: any = {};
        chunk.forEach((key: any) => {
            newObj[key] = obj[key];
        });
        return newObj;
    });

    return result;
}

const chunkCount = 5;
const chunkSize = Object.keys(OPCODES).length/chunkCount;
const split_opcodes = splitObject(OPCODES, chunkSize);
const chunk_identifiers: string[] = [];

for (let _ of split_opcodes) {
    chunk_identifiers.push(string_utils.make_large_string(Date.now(), 10));
}

let chunksAsString = "";

let chunkIndex = 0;
for (let chunk of split_opcodes) {
    chunksAsString += `
${chunk_identifiers[chunkIndex]}: ${JSON.stringify(chunk)}, | - SPLIT >
    `
    chunkIndex++;
}

let vmBody = `
/*@__MANGLE_PROP__*/

${!shuffle ? `${identifiers.OPCODES}: {${JSON.stringify(OPCODES).slice(1, -1).split(",").map(_ => "/*@__MANGLE_PROP__*/ /*@__KEY__*/ " + _).join(",")}}, | - SPLIT >` :
        (
            `
get ${identifiers.OPCODES}() {
    return {
${
    "..." + chunk_identifiers.map(_ => `${identifiers.VM}.`+_).join(",...")
}
}}, | - SPLIT >
${
    chunksAsString   
}
`
        )
    }

${identifiers.OP_INDEX}: 0, // index of operation | - SPLIT >
${identifiers.OPERATIONS}: [], // operations | - SPLIT >

${identifiers.CPOOL}: [], // constant pool | - SPLIT >
${identifiers.STACK}: [], // virtual stack | - SPLIT >
${identifiers.REGISTRY}: [], // variable registry | - SPLIT >
${identifiers.LABELS}: [], // label registry | - SPLIT >
${identifiers.VISITS}: [], // visit stack | - SPLIT >

${identifiers.BTOA}: _ => btoa(_), | - SPLIT >
${identifiers.BTOA_PROXY}: _ => ${identifiers.VM}.${identifiers.APPLIER}([${identifiers.VM}.${identifiers.BTOA},${identifiers.VM},[_]]), | - SPLIT >
${identifiers.TRIPLE_BTOA}: _ => ${identifiers.VM}.${identifiers.BTOA_PROXY}(${identifiers.VM}.${identifiers.BTOA_PROXY}(${identifiers.VM}.${identifiers.BTOA_PROXY}(_))), | - SPLIT >
${identifiers.EMPTY_STRING}: this.name, | - SPLIT >
${identifiers.GETTHIS}: this, | - SPLIT >
${identifiers.OBJECT}: Object, | - SPLIT >
${identifiers.OBJECT_CLONER}: _ => structuredClone(_), | - SPLIT >
${identifiers.TYPEOF_PROXY}: _ => typeof _, | - SPLIT >
${identifiers.EQUALITY_PROXY}: _ => ${identifiers.VM}.${identifiers.SHIFTER}(_) == ${identifiers.VM}.${identifiers.SHIFTER}(_), | - SPLIT >
${identifiers.LENGTH_PROXY}: _ => _.length, | - SPLIT >
${identifiers.MAPPER}: _ => ${identifiers.VM}.${identifiers.SHIFTER}(_).map(${identifiers.VM}.${identifiers.SHIFTER}(_)), | - SPLIT >
${identifiers.REVERSE_PROXY}: _ => _.reverse(), | - SPLIT >

${identifiers.HASH_MAPPER}: _ => _.map((_=>_.charCodeAt())),
${identifiers.HASH_REDUCER}: _ => _.reduce(((_,$)=>($^_/$|$&$|_<<(${identifiers.VM}.${identifiers.LENGTH_PROXY}(_)|_<<$|1e-5)<<(${identifiers.VM}.${identifiers.LENGTH_PROXY}(_)|41*${identifiers.VM}.${identifiers.LENGTH_PROXY}(_))<<_*_)+${identifiers.VM}.${identifiers.EMPTY_STRING}+_)),
${identifiers.HASH}: _ => ${identifiers.VM}.${identifiers.HASH_REDUCER}(${identifiers.VM}.${identifiers.HASH_MAPPER}(${identifiers.VM}.${identifiers.TRIPLE_BTOA}(_).split(${identifiers.VM}.${identifiers.EMPTY_STRING}))), | - SPLIT >

${identifiers.CINSERT}: _ => ${identifiers.VM}.${identifiers.UNSHIFTER}([${identifiers.VM}.${identifiers.CPOOL},_]), | - SPLIT >
${identifiers.SINSERT}: _ => ${identifiers.VM}.${identifiers.UNSHIFTER}([${identifiers.VM}.${identifiers.STACK},_]), | - SPLIT >
${identifiers.LINSERT}: _ => ${identifiers.VM}.${identifiers.UNSHIFTER}([${identifiers.VM}.${identifiers.LABELS},_]), | - SPLIT >
${identifiers.VINSERT}: _ => ${identifiers.VM}.${identifiers.UNSHIFTER}([${identifiers.VM}.${identifiers.VISITS},_]), | - SPLIT >

${identifiers._LOAD}: _ => ${identifiers.VM}.${identifiers.SHIFTER}(${identifiers.VM}.${identifiers.CPOOL}), | - SPLIT >
${identifiers._LOADX}: _ => ($=${identifiers.VM}.${identifiers.CPOOL}.slice(0,_),${identifiers.VM}.${identifiers.CPOOL} = ${identifiers.VM}.${identifiers.CPOOL}.slice(_,${identifiers.VM}.${identifiers.LENGTH_PROXY}(${identifiers.VM}.${identifiers.CPOOL})),$), | - SPLIT >
${identifiers._SLOAD}: _ => ${identifiers.VM}.${identifiers.SHIFTER}(${identifiers.VM}.${identifiers.STACK}), | - SPLIT >

${identifiers._DIG}: _ => ${identifiers.VM}.${identifiers.SHIFTER}(_).reduce((($=${identifiers.VM}.${identifiers.SHIFTER}(_), _) => $[_]), ${identifiers.VM}.${identifiers.SHIFTER}(_)),
${identifiers._DUP}: _ => ${identifiers.VM}.${identifiers.CINSERT}(${identifiers.VM}.${identifiers.CPOOL}[0]), | - SPLIT >
${identifiers._SDUP}: _ => ${identifiers.VM}.${identifiers.SINSERT}(${identifiers.VM}.${identifiers.STACK}[0]), | - SPLIT >
${identifiers._STORE}: _ => ${identifiers.VM}.${identifiers.CINSERT}(_), | - SPLIT >
${identifiers._GET}: _ => ${identifiers.VM}.${identifiers.SINSERT}(${identifiers.VM}.${identifiers._DIG}([_,${identifiers.VM}.${identifiers.GETTHIS},${identifiers.VM}.${identifiers.GETTHIS}])??${identifiers.VM}.${identifiers._DIG}([_.map(_ => ${identifiers.VM}.${identifiers.HASH}(_)),${identifiers.VM}.${identifiers.REGISTRY},${identifiers.VM}.${identifiers.REGISTRY}])), | - SPLIT >

${identifiers._INVOKE_JUMP}: _ => ${identifiers.VM}.${identifiers._VISIT}([${identifiers.VM}.${identifiers.OP_INDEX},${identifiers.VM}.${identifiers.SHIFTER}(_)]), | - SPLIT >
${identifiers._INVOKE_GLOBAL}: _ => ${identifiers.VM}.${identifiers.APPLIER}([${identifiers.VM}.${identifiers.SHIFTER}(_),_, ${identifiers.VM}.${identifiers.REVERSE_PROXY}(${identifiers.VM}.${identifiers._LOADX}(${identifiers.VM}.${identifiers.SHIFTER}(_)))]), | - SPLIT >
${identifiers._INVOKE_MATCH}: _ => ${identifiers.VM}.${identifiers.EQUALITY_PROXY}([${identifiers.VM}.${identifiers.TYPEOF_PROXY}(${identifiers.VM}.${identifiers.EMPTY_STRING}),${identifiers.VM}.${identifiers.TYPEOF_PROXY}(_[0])]) ? ${identifiers.VM}.${identifiers._INVOKE_JUMP}(_) : ${identifiers.VM}.${identifiers._INVOKE_GLOBAL}(_), | - SPLIT >
${identifiers._INVOKE}: _ => ${identifiers.VM}.${identifiers._INVOKE_MATCH}([${identifiers.VM}.${identifiers._SLOAD}(),_]), | - SPLIT >
${identifiers._REGISTER}: _ => ${identifiers.VM}.${identifiers.REGISTRY}[${identifiers.VM}.${identifiers.HASH}(${identifiers.VM}.${identifiers._LOAD}())] = ${identifiers.VM}.${identifiers._LOAD}(), | - SPLIT >
${identifiers._READ_REGISTRY}: _ => ${identifiers.VM}.${identifiers._STORE}(${identifiers.VM}.${identifiers.REGISTRY}[${identifiers.VM}.${identifiers.HASH}(_)]??${identifiers.VM}.${identifiers._DIG}([_,${identifiers.VM}.${identifiers.GETTHIS},${identifiers.VM}.${identifiers.GETTHIS}])), | - SPLIT >

${identifiers._CREATE_LABEL}: _ => ${identifiers.VM}.${identifiers.LINSERT}(_), | - SPLIT >
${identifiers._FIND_LABEL}: _ => ${identifiers.VM}.${identifiers.LABELS}[${identifiers.VM}.${identifiers.LABELS}.map(_ => _[0]).indexOf(_)][1], | - SPLIT >

${identifiers._ASSIGN}: _ => {let context = ${identifiers.VM}.${identifiers.GETTHIS};for (let $ = 0; $ < ${identifiers.VM}.${identifiers.LENGTH_PROXY}(_[1]) - 1; $++) context = context[_[1][$]];context[_[1][${identifiers.VM}.${identifiers.LENGTH_PROXY}(_[1]) - 1]] = _[0]}, | - SPLIT >
${identifiers._JUMP_OPERATION}: _ => ${identifiers.VM}.${identifiers.OP_INDEX} = _, | - SPLIT >

${identifiers._RETURN_VISITOR}: _ => ${identifiers.VM}.${identifiers._JUMP_OPERATION}(${identifiers.VM}.${identifiers.SHIFTER}(${identifiers.VM}.${identifiers.VISITS})),
${identifiers._VISIT}: _ => (${identifiers.VM}.${identifiers.VINSERT}(${identifiers.VM}.${identifiers.SHIFTER}(_)),${identifiers.VM}.${identifiers._JUMP_OPERATION}(${identifiers.VM}.${identifiers._FIND_LABEL}(${identifiers.VM}.${identifiers.SHIFTER}(_)))), | - SPLIT >
${identifiers._JUMP}: _ => ${identifiers.VM}.${identifiers._JUMP_OPERATION}(${identifiers.VM}.${identifiers._FIND_LABEL}(_)), | - SPLIT >

get ${identifiers.OPCODE_KEYS}() {
    return ${identifiers.VM}.${identifiers.APPLIER}([${identifiers.VM}.${identifiers.OBJECT}.keys,${identifiers.VM},[${identifiers.VM}.${identifiers.OPCODES}]]);
}, | - SPLIT >

get ${OPCODE_KEYS[ORIGINAL_OPCODES.LOAD]}() { 
    return ${identifiers.VM}.${identifiers._LOAD}();
}, | - SPLIT >

get ${OPCODE_KEYS[ORIGINAL_OPCODES.DUP]}() { 
    ${identifiers.VM}.${identifiers._DUP}();
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.GET]}(_) { 
    ${identifiers.VM}.${identifiers._GET}(${identifiers.VM}.${identifiers._LOADX}(${identifiers.VM}.${identifiers.SHIFTER}(_)));
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.STORE]}(_) { 
    ${identifiers.VM}.${identifiers._STORE}(${identifiers.VM}.${identifiers.SHIFTER}(_));
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.INVOKE]}(_) { 
    ${identifiers.VM}.${identifiers._INVOKE}(${identifiers.VM}.${identifiers.SHIFTER}(_));
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.SINVOKE]}(_) { 
    if((${identifiers.VM}.${identifiers._SDUP}(),${identifiers.VM}.${identifiers.TYPEOF_PROXY}(${identifiers.VM}.${identifiers.EMPTY_STRING}) == ${identifiers.VM}.${identifiers.TYPEOF_PROXY}(${identifiers.VM}.${identifiers._SLOAD}()))) {
        ${identifiers.VM}.${identifiers._INVOKE}(${identifiers.VM}.${identifiers.SHIFTER}(_));
    } else {
        ${identifiers.VM}.${identifiers._STORE}(${identifiers.VM}.${identifiers._INVOKE}(${identifiers.VM}.${identifiers.SHIFTER}(_)));
    }
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.REGISTER]}(_) {
    ${identifiers.VM}.${identifiers._REGISTER}(${identifiers.VM}.${identifiers.SHIFTER}(_))
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.READ_REGISTRY]}(_) {
    ${identifiers.VM}.${identifiers._READ_REGISTRY}(${identifiers.VM}.${identifiers.SHIFTER}(_))
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.LABEL]}(_) {
    ${identifiers.VM}.${identifiers._CREATE_LABEL}
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.JUMP]}(_) {
    ${identifiers.VM}.${identifiers._JUMP}(${identifiers.VM}.${identifiers.SHIFTER}(_));
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.CJUMP]}(_) {
    ${identifiers.VM}.${identifiers._LOAD}() ? _ : ${identifiers.VM}.${identifiers._JUMP}(_[0]);
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.RETURN]}(_) {
    ${identifiers.VM}.${identifiers._RETURN_VISITOR}(_);
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.ASSIGN]}(_) {
    ${identifiers.VM}.${identifiers._ASSIGN}(${identifiers.VM}.${identifiers._LOADX}(2));
}, | - SPLIT >

${identifiers.OPERATE}: _ =>  ${identifiers.VM}.${identifiers._STORE}(${identifiers.VM}.${identifiers.REVERSE_PROXY}(${identifiers.VM}.${identifiers._LOADX}(2),${identifiers.VM}.${identifiers.SHIFTER}(_)).reduce(${identifiers.VM}.${identifiers.SHIFTER}(_))),

${MATH_OPERATIONS}

${identifiers.SHIFTER}: _ => _.shift(), | - SPLIT >
${identifiers.UNSHIFTER}: _ => ${identifiers.VM}.${identifiers.SHIFTER}(_).unshift(${identifiers.VM}.${identifiers.SHIFTER}(_)), | - SPLIT >
${identifiers.APPLIER}: _ => ${identifiers.VM}.${identifiers.SHIFTER}(_).apply(${identifiers.VM}.${identifiers.SHIFTER}(_),${identifiers.VM}.${identifiers.SHIFTER}(_)), | - SPLIT >

${identifiers.STORE_LABEL}: _ => ${identifiers.VM}.${identifiers.SHIFTER}(_) == ${identifiers.VM}.${identifiers.OPCODES}.${OPCODE_KEYS[ORIGINAL_OPCODES.LABEL]} ? ${identifiers.VM}.${identifiers._CREATE_LABEL}([${identifiers.VM}.${identifiers.SHIFTER}(_),${identifiers.VM}.${identifiers.OP_INDEX}]) : _,

${identifiers.GET_NEXT_INSTRUCTION}: _ => ${identifiers.VM}.${identifiers.APPLIER}([${identifiers.VM}.${identifiers.OBJECT_CLONER}, _, [${identifiers.VM}.${identifiers.OPERATIONS}[${identifiers.VM}.${identifiers.OP_INDEX}++]]]),

${identifiers.EXECUTE_INSN}: (insn, args) => ${identifiers.VM}[${identifiers.VM}.${identifiers.OPCODE_KEYS}[insn]] = args, | - SPLIT >

${identifiers.EXECUTOR_ARGS}: _ => [${identifiers.VM}.${identifiers.SHIFTER}(_), _], | - SPLIT >

${identifiers.INSN_EXECUTOR}: _ => ${identifiers.VM}.${identifiers.APPLIER}([${identifiers.VM}.${identifiers.EXECUTE_INSN}, _,${identifiers.VM}.${identifiers.EXECUTOR_ARGS}(_)]), | - SPLIT >

${shuffle ? "" : `set ${OPCODE_KEYS[ORIGINAL_OPCODES.DEBUG]}(_) {
    const index = ${identifiers.VM}.${identifiers.OP_INDEX};
    const instruction = structuredClone(${identifiers.VM}.${identifiers.OPERATIONS}[index-1]);
    console.warn("===========    DEBUG    ===========");
    console.warn("DEBUG OCCURED ON INDEX: " + index);
    console.warn("=========== ENVIRONMENT ===========");
    console.error("OPERATIONS:",${identifiers.VM}.${identifiers.OPCODES});

    console.error("Constants:",${identifiers.VM}.${identifiers.CPOOL});
    console.error("Obj Stack:",${identifiers.VM}.${identifiers.STACK});
    console.error("Registery:",${identifiers.VM}.${identifiers.REGISTRY});
    console.error("Visitors :",${identifiers.VM}.${identifiers.VISITS});

    console.warn("=========== INSTRUCTION ===========");
    console.error("Operation: " + ${identifiers.VM}.${identifiers.OPCODE_KEYS}[instruction.shift()]);
    console.error("Arguments: " + JSON.stringify(instruction));
}, | - SPLIT >`}

${identifiers.EXECUTE}: _ => {

    const opsCloned = ${identifiers.VM}.${identifiers.OBJECT_CLONER}(_);

    while (${identifiers.VM}.${identifiers.OP_INDEX} < ${identifiers.VM}.${identifiers.LENGTH_PROXY}(${identifiers.VM}.${identifiers.OPERATIONS})) {
        ${identifiers.VM}.${identifiers.STORE_LABEL}(${identifiers.VM}.${identifiers.GET_NEXT_INSTRUCTION}());
    }

    ${identifiers.VM}.${identifiers.OP_INDEX} = 0;

    while (${identifiers.VM}.${identifiers.OP_INDEX} < ${identifiers.VM}.${identifiers.LENGTH_PROXY}(${identifiers.VM}.${identifiers.OPERATIONS})) {
        ${shuffle ?
        `${identifiers.VM}.${identifiers.INSN_EXECUTOR}(${identifiers.VM}.${identifiers.GET_NEXT_INSTRUCTION}());` :
        `
        const cloned = [${identifiers.VM}.${identifiers.CPOOL},${identifiers.VM}.${identifiers.STACK},${identifiers.VM}.${identifiers.REGISTRY},${identifiers.VM}.${identifiers.VISITS}].map(_ => {try{return ${identifiers.VM}.${identifiers.OBJECT_CLONER}(_)}catch(e){return ["error"]}});
        const index = ${identifiers.VM}.${identifiers.OP_INDEX};
        try {
            ${identifiers.VM}.${identifiers.INSN_EXECUTOR}(${identifiers.VM}.${identifiers.GET_NEXT_INSTRUCTION}());
        } catch (e) {
            const instruction = ${identifiers.VM}.${identifiers.OPERATIONS}[index];
            console.warn("===========  EXCEPTION  ===========");
            console.warn("ERROR OCCURED ON INDEX: " + index);
            console.warn("=========== ENVIRONMENT ===========");
            console.error("OPERATIONS:",${identifiers.VM}.${identifiers.OPCODES});

            console.error("EXECUTION QUEUE:",opsCloned);

            console.error("Constants:",cloned[0]);
            console.error("Obj Stack:",cloned[1]);
            console.error("Registery:",cloned[2]);
            console.error("Visitors :",cloned[3]);

            console.warn("=========== INSTRUCTION ===========");
            console.error("Operation: " + ${identifiers.VM}.${identifiers.OPCODE_KEYS}[instruction.shift()]);
            console.error("Arguments: " + JSON.stringify(instruction));

            console.warn("=========== STACK TRACE ===========");
            console.warn("Original:");
            console.error(e);
            console.warn("Attemping to recreate...");
            ${identifiers.VM}.${identifiers.CPOOL} = cloned[0];
            ${identifiers.VM}.${identifiers.STACK} = cloned[1];
            ${identifiers.VM}.${identifiers.REGISTRY} = cloned[2];
            ${identifiers.VM}.${identifiers.VISITS} = cloned[3];
            ${identifiers.VM}.${identifiers.INSN_EXECUTOR}(${identifiers.VM}.${identifiers.OPCODES}[index]);
            return;
        }
            `
    }
    }
}, | - SPLIT >

EXECUTE: _ => ${identifiers.VM}.${identifiers.EXECUTE}(${identifiers.VM}.${identifiers.OPERATIONS} = _),
`.split(" | - SPLIT >")

if (shuffle) vmBody = string_utils.shuffleArray(vmBody);

const vmCode = `
const ${identifiers.VM} = {
    ${vmBody.join("")}
};
`

export default {
    vm_identifier: identifiers.VM,
    vmCode,
    operations: {...binaryOperations, ...unaryOperations},
    minify,
    getInstruction
}