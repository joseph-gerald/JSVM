import { MangleOptions, MinifyOptions } from "terser";
import terser from "terser"

import string_utils from "./string_utils";

const shuffle = false; // false for debug

const mangleSettings: MangleOptions = {
    eval: true,
    properties: shuffle,
    reserved: ["vm"],

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

let ORIGINAL_OPCODES: { [key: string]: any } = [
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

    // Math

    "OADD",  // Operation: Add
    "OSUB",  // Operation: Subtract
    "OMUL",  // Operation: Multiply
    "ODIV",  // Operation: Division
    "OXOR",  // Operation: Bitwise XOR
    "OBOR",  // Operation: Bitwise OR
    "OAND",  // Operation: Bitwise And
    "OEXP",  // Operation: Exponents
    "OMOD",  // Operation: Modulo

    "REGISTER",
    "READ_REGISTRY",

    // Logic Operations

    "AND",  // Operation: And
    "OR",   // Operation: Or
    "OEQ",  // Operation: Equality
    "OIQ",  // Operation: Inequality
    "OGT",  // Operation: Greater Than
    "OGE",  // Operation: Greater / Equal
    "OLT",  // Operation: Less Than
    "OLE",  // Operation: Less / Equal
].reduce((obj, item, index) => ({ ...obj, [item]: index }), {});;

if (shuffle) {
    const opcodes_ids = string_utils.shuffleArray(Object.keys(ORIGINAL_OPCODES));

    ORIGINAL_OPCODES = {}

    for (const opcode_id of opcodes_ids) {
        ORIGINAL_OPCODES[opcode_id] = Object.keys(ORIGINAL_OPCODES).length;
    }
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
    OPCODE_KEYS: "OPCODE_KEYS",
    OPCODES: "OPCODES",
    HASH: "HASH",

    CPOOL: "CPOOL",
    STACK: "STACK",
    REGISTRY: "REGISTRY",

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

    OBJECT_CLONER: "OBJECT_CLONER",
    DEBUG: "DEBUG",
}

const getInstruction = (x: any) => {
    const OPCODE = OPCODE_KEYS[Object.keys(ORIGINAL_OPCODES).indexOf(x)]; // OPCODES gets mangled so have to comapre to original
    if (shuffle) {
        return OPCODES[OPCODE];
    } else {
        return `vm.${identifiers.OPCODES}.${OPCODE}`;
    }
}

if (shuffle) {
    for (let key of Object.keys(identifiers)) {
        identifiers[key] = string_utils.make_large_string(string_utils.calculateChecksum(key), 3);
    }
}

const operations: { [key: string]: any } = {
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

let MATH_OPERATIONS = "";

// generate operation opcodes
for (let operation of Object.keys(operations)) {
    /*
        const nums=vm.${identifiers._LOADX}(2);
    vm._STORE(nums[1]${operation}nums[0])
    */
    MATH_OPERATIONS += `
set ${OPCODE_KEYS[ORIGINAL_OPCODES[operations[operation]]]}(_) {
    vm.${identifiers.OPERATE}([_,(a, b) => a ${operation} b]);
}, | - SPLIT >
    `
}

//console.log(MATH_OPERATIONS)

let vmBody = `
/*@__MANGLE_PROP__*/
${identifiers.OPCODES}: {${JSON.stringify(OPCODES).slice(1, -1).split(",").map(_ => "/*@__MANGLE_PROP__*/ /*@__KEY__*/ " + _).join(",")}}, | - SPLIT >

${identifiers.OP_INDEX}: 0, // index of operation | - SPLIT >
${identifiers.OPERATIONS}: [], // operations | - SPLIT >

${identifiers.CPOOL}: [], // constant pool | - SPLIT >
${identifiers.STACK}: [], // virtual stack | - SPLIT >
${identifiers.REGISTRY}: [], // variable registry | - SPLIT >
${identifiers.LABELS}: [], // label registry | - SPLIT >
${identifiers.VISITS}: [], // visit stack | - SPLIT >

${identifiers.GETTHIS}: this, | - SPLIT >
${identifiers.OBJECT}: Object, | - SPLIT >
${identifiers.OBJECT_CLONER}: _ => structuredClone(_), | - SPLIT >

${identifiers.HASH}: _ => btoa(btoa(btoa(_))).split('').map((_=>_.charCodeAt())).reduce(((_,$)=>($^_/$|$&$|_<<(_.length|_<<$|1e-5)<<(_.length|41*_.length)<<_*_)+''+_)).slice(6,26), | - SPLIT >

${identifiers.CINSERT}: _ => vm.${identifiers.UNSHIFTER}([vm.${identifiers.CPOOL},_]), | - SPLIT >
${identifiers.SINSERT}: _ => vm.${identifiers.UNSHIFTER}([vm.${identifiers.STACK},_]), | - SPLIT >
${identifiers.LINSERT}: _ => vm.${identifiers.UNSHIFTER}([vm.${identifiers.LABELS},_]), | - SPLIT >
${identifiers.VINSERT}: _ => vm.${identifiers.UNSHIFTER}([vm.${identifiers.VISITS},_]), | - SPLIT >

${identifiers._LOAD}: _ => vm.${identifiers.SHIFTER}(vm.${identifiers.CPOOL}), | - SPLIT >
${identifiers._LOADX}: _ => ($=vm.${identifiers.CPOOL}.slice(0,_),vm.${identifiers.CPOOL} = vm.${identifiers.CPOOL}.slice(_,vm.${identifiers.CPOOL}.length),$), | - SPLIT >
${identifiers._SLOAD}: _ => vm.${identifiers.SHIFTER}(vm.${identifiers.STACK}), | - SPLIT >

${identifiers._DIG}: _ => vm.${identifiers.SHIFTER}(_).reduce((($=vm.${identifiers.SHIFTER}(_), _) => $[_]), vm.${identifiers.SHIFTER}(_)),
${identifiers._DUP}: _ => vm.${identifiers.CINSERT}(vm.${identifiers.CPOOL}[0]), | - SPLIT >
${identifiers._SDUP}: _ => vm.${identifiers.SINSERT}(vm.${identifiers.STACK}[0]), | - SPLIT >
${identifiers._STORE}: _ => vm.${identifiers.CINSERT}(_), | - SPLIT >
${identifiers._GET}: _ => vm.${identifiers.SINSERT}(vm.${identifiers._DIG}([_,vm.${identifiers.GETTHIS},vm.${identifiers.GETTHIS}])??vm.${identifiers._DIG}([_.map(_ => vm.${identifiers.HASH}(_)),vm.${identifiers.REGISTRY},vm.${identifiers.REGISTRY}])), | - SPLIT >

${identifiers._INVOKE_JUMP}: _ => vm.${identifiers._VISIT}([vm.${identifiers.OP_INDEX},_.shift()]), | - SPLIT >
${identifiers._INVOKE_GLOBAL}: _ => vm.${identifiers.APPLIER}([_.shift(),_, vm.${identifiers._LOADX}(_.shift()).reverse()]), | - SPLIT >
${identifiers._INVOKE_MATCH}: _ => [typeof ""].includes(typeof _[0]) ? vm.${identifiers._INVOKE_JUMP}(_) : vm.${identifiers._INVOKE_GLOBAL}(_), | - SPLIT >
${identifiers._INVOKE}: _ => vm.${identifiers._INVOKE_MATCH}([vm.${identifiers._SLOAD}(),_]), | - SPLIT >
${identifiers._REGISTER}: _ => vm.${identifiers.REGISTRY}[vm.${identifiers.HASH}(vm.${identifiers._LOAD}())] = vm.${identifiers._LOAD}(), | - SPLIT >
${identifiers._READ_REGISTRY}: _ => vm.${identifiers._STORE}(vm.${identifiers.REGISTRY}[vm.${identifiers.HASH}(_)]??vm.${identifiers._DIG}([_,vm.${identifiers.GETTHIS},vm.${identifiers.GETTHIS}])), | - SPLIT >

${identifiers._CREATE_LABEL}: _ => vm.${identifiers.LINSERT}(_), | - SPLIT >
${identifiers._FIND_LABEL}: _ => vm.${identifiers.LABELS}[vm.${identifiers.LABELS}.map(_ => _[0]).indexOf(_)][1], | - SPLIT >

${identifiers._ASSIGN}: _ => {let context = vm.${identifiers.GETTHIS};for (let $ = 0; $ < _[1].length - 1; $++) context = context[_[1][$]];context[_[1][_[1].length - 1]] = _[0]}, | - SPLIT >
${identifiers._JUMP_OPERATION}: _ => vm.${identifiers.OP_INDEX} = _, | - SPLIT >

${identifiers._RETURN_VISITOR}: _ => vm.${identifiers._JUMP_OPERATION}(vm.${identifiers.SHIFTER}(vm.${identifiers.VISITS})),
${identifiers._VISIT}: _ => (vm.${identifiers.VINSERT}(_.shift()),vm.${identifiers._JUMP_OPERATION}(vm.${identifiers._FIND_LABEL}(_.shift()))), | - SPLIT >
${identifiers._JUMP}: _ => vm.${identifiers._JUMP_OPERATION}(vm.${identifiers._FIND_LABEL}(_)), | - SPLIT >

get ${identifiers.OPCODE_KEYS}() {
    return vm.${identifiers.APPLIER}([vm.${identifiers.OBJECT}.keys,vm,[vm.${identifiers.OPCODES}]]);
}, | - SPLIT >

get ${OPCODE_KEYS[ORIGINAL_OPCODES.LOAD]}() { 
    return vm.${identifiers._LOAD}();
}, | - SPLIT >

get ${OPCODE_KEYS[ORIGINAL_OPCODES.DUP]}() { 
    vm.${identifiers._DUP}();
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.GET]}(_) { 
    vm.${identifiers._GET}(vm.${identifiers.SHIFTER}(_));
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.STORE]}(_) { 
    vm.${identifiers._STORE}(vm.${identifiers.SHIFTER}(_));
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.INVOKE]}(_) { 
    vm.${identifiers._INVOKE}(vm.${identifiers.SHIFTER}(_));
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.SINVOKE]}(_) { 
    if((vm.${identifiers._SDUP}(),typeof "" == typeof vm.${identifiers._SLOAD}())) {
        vm.${identifiers._INVOKE}(vm.${identifiers.SHIFTER}(_));
    } else {
        vm.${identifiers._STORE}(vm.${identifiers._INVOKE}(vm.${identifiers.SHIFTER}(_)));
    }
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.REGISTER]}(_) {
    vm.${identifiers._REGISTER}(vm.${identifiers.SHIFTER}(_))
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.READ_REGISTRY]}(_) {
    vm.${identifiers._READ_REGISTRY}(vm.${identifiers.SHIFTER}(_))
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.LABEL]}(_) {
    vm.${identifiers._CREATE_LABEL}
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.JUMP]}(_) {
    vm.${identifiers._JUMP}(vm.${identifiers.SHIFTER}(_));
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.CJUMP]}(_) {
    vm.${identifiers._LOAD}() ? _ : vm.${identifiers._JUMP}(_[0]);
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.RETURN]}(_) {
    vm.${identifiers._RETURN_VISITOR}(_);
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.ASSIGN]}(_) {
    vm.${identifiers._ASSIGN}(vm.${identifiers._LOADX}(2));
}, | - SPLIT >

${identifiers.OPERATE}: _ =>  vm.${identifiers._STORE}(vm.${identifiers._LOADX}(2).reverse(vm.${identifiers.SHIFTER}(_)).reduce(vm.${identifiers.SHIFTER}(_))),

${MATH_OPERATIONS}

${identifiers.SHIFTER}: _ => _.shift(), | - SPLIT >
${identifiers.UNSHIFTER}: _ => vm.${identifiers.SHIFTER}(_).unshift(vm.${identifiers.SHIFTER}(_)), | - SPLIT >
${identifiers.APPLIER}: _ => vm.${identifiers.SHIFTER}(_).apply(vm.${identifiers.SHIFTER}(_),vm.${identifiers.SHIFTER}(_)), | - SPLIT >

${identifiers.STORE_LABEL}: _ => vm.${identifiers.SHIFTER}(_) == vm.${identifiers.OPCODES}.${OPCODE_KEYS[ORIGINAL_OPCODES.LABEL]} ? vm.${identifiers._CREATE_LABEL}([vm.${identifiers.SHIFTER}(_),vm.${identifiers.OP_INDEX}]) : _,

${identifiers.GET_NEXT_INSTRUCTION}: _ => vm.${identifiers.APPLIER}([vm.${identifiers.OBJECT_CLONER}, _, [vm.${identifiers.OPERATIONS}[vm.${identifiers.OP_INDEX}++]]]),

${identifiers.EXECUTE_INSN}: (insn, args) => vm[vm.${identifiers.OPCODE_KEYS}[insn]] = args, | - SPLIT >

${identifiers.EXECUTOR_ARGS}: _ => [vm.${identifiers.SHIFTER}(_), _], | - SPLIT >

${identifiers.INSN_EXECUTOR}: _ => vm.${identifiers.APPLIER}([vm.${identifiers.EXECUTE_INSN}, _,vm.${identifiers.EXECUTOR_ARGS}(_)]), | - SPLIT >

${shuffle ? "" : `set ${OPCODE_KEYS[ORIGINAL_OPCODES.DEBUG]}(_) {
    const index = vm.${identifiers.OP_INDEX};
    const instruction = structuredClone(vm.${identifiers.OPERATIONS}[index-1]);
    console.warn("===========    DEBUG    ===========");
    console.warn("DEBUG OCCURED ON INDEX: " + index);
    console.warn("=========== ENVIRONMENT ===========");
    console.error("OPERATIONS:",vm.${identifiers.OPCODES});

    console.error("Constants:",vm.${identifiers.CPOOL});
    console.error("Obj Stack:",vm.${identifiers.STACK});
    console.error("Registery:",vm.${identifiers.REGISTRY});
    console.error("Visitors :",vm.${identifiers.VISITS});

    console.warn("=========== INSTRUCTION ===========");
    console.error("Operation: " + vm.${identifiers.OPCODE_KEYS}[instruction.shift()]);
    console.error("Arguments: " + JSON.stringify(instruction));
}, | - SPLIT >`}

${identifiers.EXECUTE}: _ => {

    const opsCloned = vm.${identifiers.OBJECT_CLONER}(_);

    while (vm.${identifiers.OP_INDEX} < vm.${identifiers.OPERATIONS}.length) {
        vm.${identifiers.STORE_LABEL}(vm.${identifiers.GET_NEXT_INSTRUCTION}());
    }

    vm.${identifiers.OP_INDEX} = 0;

    while (vm.${identifiers.OP_INDEX} < vm.${identifiers.OPERATIONS}.length) {
        ${shuffle ?
        `vm.${identifiers.INSN_EXECUTOR}(vm.${identifiers.GET_NEXT_INSTRUCTION}());` :
        `
        const cloned = [vm.${identifiers.CPOOL},vm.${identifiers.STACK},vm.${identifiers.REGISTRY},vm.${identifiers.VISITS}].map(_ => {try{return vm.${identifiers.OBJECT_CLONER}(_)}catch(e){return ["error"]}});
        const index = vm.${identifiers.OP_INDEX};
        try {
            vm.${identifiers.INSN_EXECUTOR}(vm.${identifiers.GET_NEXT_INSTRUCTION}());
        } catch (e) {
            const instruction = vm.${identifiers.OPERATIONS}[index];
            console.warn("===========  EXCEPTION  ===========");
            console.warn("ERROR OCCURED ON INDEX: " + index);
            console.warn("=========== ENVIRONMENT ===========");
            console.error("OPERATIONS:",vm.${identifiers.OPCODES});

            console.error("EXECUTION QUEUE:",opsCloned);

            console.error("Constants:",cloned[0]);
            console.error("Obj Stack:",cloned[1]);
            console.error("Registery:",cloned[2]);
            console.error("Visitors :",cloned[3]);

            console.warn("=========== INSTRUCTION ===========");
            console.error("Operation: " + vm.${identifiers.OPCODE_KEYS}[instruction.shift()]);
            console.error("Arguments: " + JSON.stringify(instruction));

            console.warn("=========== STACK TRACE ===========");
            console.warn("Original:");
            console.error(e);
            console.warn("Attemping to recreate...");
            vm.${identifiers.CPOOL} = cloned[0];
            vm.${identifiers.STACK} = cloned[1];
            vm.${identifiers.REGISTRY} = cloned[2];
            vm.${identifiers.VISITS} = cloned[3];
            vm.${identifiers.INSN_EXECUTOR}(vm.${identifiers.OPCODES}[index]);
            return;
        }
            `
    }
    }
}, | - SPLIT >

EXECUTE: _ => vm.${identifiers.EXECUTE}(vm.${identifiers.OPERATIONS} = _),
`.split(" | - SPLIT >")

if (shuffle) vmBody = string_utils.shuffleArray(vmBody);

const vmCode = `
const vm = {
    ${vmBody.join("")}
};
`

export default {
    vmCode,
    operations,
    minify,
    getInstruction
}