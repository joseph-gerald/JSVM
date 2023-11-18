import { MangleOptions, MinifyOptions } from "terser";
import terser from "terser"

import string_utils from "./string_utils";

const shuffle = true; // false for debug

const mangleSettings: MangleOptions = {
    eval: true,
    properties: shuffle,
    reserved: ["submitCaptcha"],

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

let ORIGINAL_OPCODES : { [key: string]: any } = {
    STORE: 0,    // store to constant pool / heap
    DUP: 1,      // duplicate item from stack
    LOAD: 2,     // load from top of stack
    GOTO: 3,     // jump to bytecode index
    GET: 4,      // fetch from global context

    // Control Flow

    LABEL: 5,    // Label
    VISIT: 6,    // Visit label and return back
    CJUMP: 7,    // Jump if false
    JUMP: 8,     // Jump to label
    INVOKE: 9,   // Invoke Function

    // Math

    OADD: 10,   // Operation: Add
    OSUB: 11,   // Operation: Subtract
    OMUL: 12,   // Operation: Multiply
    ODIV: 13,   // Operation: Division
    OXOR: 14,   // Operation: Bitwise XOR
    OBOR: 15,   // Operation: Bitwise OR
    OAND: 16,   // Operation: Bitwise And
    OEXP: 17,   // Operation: Exponents

    REGISTER: 18,
    READ_REGISTRY: 19,

    // Logical Operations
    AND: 20,   // Operation: And
    OR : 21,   // Operation: Or
    OEQ: 22,   // Operation: Equality
    OIQ: 23,   // Operation: Inequality
    OGT: 24,   // Operation: Greater Than
    OGE: 25,   // Operation: Greater / Equal
    OLT: 27,   // Operation: Less Than
    OLE: 27,   // Operation: Less / Equal
};

if(shuffle) {
    const opcodes_ids = string_utils.shuffleArray(Object.keys(ORIGINAL_OPCODES));

    ORIGINAL_OPCODES = {}

    for (const opcode_id of opcodes_ids) {
        ORIGINAL_OPCODES[opcode_id] = Object.keys(ORIGINAL_OPCODES).length;
    }
}

//console.log(ORIGINAL_OPCODES)

const OPCODES : { [key: string]: any } = structuredClone(ORIGINAL_OPCODES);

if(shuffle) {
    for (let key of Object.keys(OPCODES)) {
        OPCODES[string_utils.make_large_string(string_utils.calculateChecksum(key),3)] = OPCODES[key];
        delete OPCODES[key]
    }
}

const OPCODE_KEYS = Object.keys(OPCODES);

const identifiers : { [key: string]: any } = {
    OPCODE_KEYS: "OPCODE_KEYS",
    OPCODES: "OPCODES",
    HASH: "HASH",

    CPOOL: "CPOOL",
    STACK: "STACK",
    REGISTRY: "REGISTRY",

    CINSERT: "CINSERT",
    SINSERT: "SINSERT",

    _LOAD: "_LOAD",
    _LOADX: "_LOADX",
    _SLOAD: "_SLOAD",

    _DUP: "_DUP",
    _STORE: "_STORE",
    _GET: "_GET",

    _INVOKE: "_INVOKE",
    _REGISTER: "_REGISTER",
    _READ_REGISTRY: "_READ_REGISTRY",

    REGISTER: "REGISTER",
    READ_REGISTRY: "READ_REGISTRY",

    LABELS: "LABELS",
    STORE_LABEL: "STORE_LABEL",
    _CREATE_LABEL: "_CREATE_LABEL",
    _FIND_LABEL: "_FIND_LABEL",

    _JUMP: "_JUMP",

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
}

const getInstruction = (x: any) => {
    const OPCODE = OPCODE_KEYS[Object.keys(ORIGINAL_OPCODES).indexOf(x)]; // OPCODES gets mangled so have to comapre to original
    return `vm.${identifiers.OPCODES}.${OPCODE}`;
}

if(shuffle) {
    for (let key of Object.keys(identifiers)) {
        identifiers[key] = string_utils.make_large_string(string_utils.calculateChecksum(key),3);
    }
}

const operations : { [key: string]: any } = {
    // Math
    "+": "OADD",
    "-": "OSUB",
    "*": "OMUL",
    "/": "ODIV",
    "^": "OXOR",
    "|": "OBOR",
    "&": "OAND",
    "**": "OEXP",

    // Logical
    "&&": "AND",
    "||": "OR",
    "==": "OEQ",
    "!=": "OIQ",
    ">" : "OGT",
    ">=": "OGE",
    "<" : "OLT",
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
${identifiers.OPCODES}: {${JSON.stringify(OPCODES).slice(1,-1).split(",").map(_ => "/*@__MANGLE_PROP__*/ /*@__KEY__*/ "+_).join(",")}}, | - SPLIT >

${identifiers.OP_INDEX}: 0, // index of operation | - SPLIT >
${identifiers.OPERATIONS}: [], // operations | - SPLIT >

${identifiers.CPOOL}: [], // constant pool | - SPLIT >
${identifiers.STACK}: [], // virtual stack | - SPLIT >
${identifiers.REGISTRY}: [], // variable registry | - SPLIT >
${identifiers.LABELS}: [], // label registry | - SPLIT >

${identifiers.GETTHIS}: this, | - SPLIT >
${identifiers.OBJECT}: Object, | - SPLIT >
${identifiers.OBJECT_CLONER}: _ => structuredClone(_), | - SPLIT >

${identifiers.HASH}: _ => btoa(btoa(btoa(_))).split('').map((_=>_.charCodeAt())).reduce(((_,$)=>($^_/$|$&$|_<<(_.length|_<<$|1e-5)<<(_.length|41*_.length)<<_*_)+''+_)).split("").slice(6,26).join(''), | - SPLIT >
${identifiers.CINSERT}: _ => vm.${identifiers.UNSHIFTER}([vm.${identifiers.CPOOL},_]), | - SPLIT >
${identifiers.SINSERT}: _ => vm.${identifiers.UNSHIFTER}([vm.${identifiers.STACK},_]), | - SPLIT >
${identifiers.LINSERT}: _ => vm.${identifiers.UNSHIFTER}([vm.${identifiers.LABELS},_]), | - SPLIT >

${identifiers._LOAD}: _ => vm.${identifiers.SHIFTER}(vm.${identifiers.CPOOL}), | - SPLIT >
${identifiers._LOADX}: _ => ($=vm.${identifiers.CPOOL}.slice(0,_),vm.${identifiers.CPOOL} = vm.${identifiers.CPOOL}.slice(_,vm.${identifiers.CPOOL}.length),$), | - SPLIT >
${identifiers._SLOAD}: _ => vm.${identifiers.SHIFTER}(vm.${identifiers.STACK}), | - SPLIT >

${identifiers._DUP}: _ => vm.${identifiers.CINSERT}(vm.${identifiers.CPOOL}[0]), | - SPLIT >
${identifiers._STORE}: _ => vm.${identifiers.CINSERT}(_), | - SPLIT >
${identifiers._GET}: _ => vm.${identifiers.SINSERT}(_.reduce((($=vm.${identifiers.GETTHIS}, _) => $[_]), vm.${identifiers.GETTHIS})), | - SPLIT >

${identifiers._INVOKE}: _ => vm.${identifiers.APPLIER}([vm.${identifiers._SLOAD}(),_, vm.${identifiers._LOADX}(_)]), | - SPLIT >
${identifiers._REGISTER}: _ => vm.${identifiers.REGISTRY}[vm.${identifiers.HASH}(vm.${identifiers._LOAD}())] = vm.${identifiers._LOAD}(), | - SPLIT >
${identifiers._READ_REGISTRY}: _ => vm.${identifiers._STORE}(vm.${identifiers.REGISTRY}[vm.${identifiers.HASH}(_)]??vm.${identifiers.GETTHIS}[_]), | - SPLIT >

${identifiers._CREATE_LABEL}: _ => vm.${identifiers.LINSERT}(_), | - SPLIT >
${identifiers._FIND_LABEL}: _ => vm.${identifiers.LABELS}[vm.${identifiers.LABELS}.map(_ => _[0]).indexOf(_)][1], | - SPLIT >

${identifiers._JUMP}: _ => vm.${identifiers.OP_INDEX} = vm.${identifiers._FIND_LABEL}(_), | - SPLIT >

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
    vm.${identifiers._GET}(_[0]);
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.STORE]}(_) { 
    vm.${identifiers._STORE}(_[0]);
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.INVOKE]}(_) { 
    vm.${identifiers._INVOKE}(_[0]);
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.REGISTER]}(_) {
    vm.${identifiers._REGISTER}(_[0])
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.READ_REGISTRY]}(_) {
    vm.${identifiers._READ_REGISTRY}(_[0])
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.LABEL]}(_) {
    vm.${identifiers._CREATE_LABEL}
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.JUMP]}(_) {
    vm.${identifiers._JUMP}(_[0]);
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.CJUMP]}(_) {
    vm.${identifiers._LOAD}() ? _ : vm.${identifiers._JUMP}(_[0]);
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

${identifiers.EXECUTE}: _ => {
    while (vm.${identifiers.OP_INDEX} < vm.${identifiers.OPERATIONS}.length) {
        vm.${identifiers.STORE_LABEL}(vm.${identifiers.GET_NEXT_INSTRUCTION}());
    }

    vm.${identifiers.OP_INDEX} = 0;

    while (vm.${identifiers.OP_INDEX} < vm.${identifiers.OPERATIONS}.length) {
        //console.log(vm.${identifiers.OP_INDEX})
        vm.${identifiers.INSN_EXECUTOR}(vm.${identifiers.GET_NEXT_INSTRUCTION}())
    }
}, | - SPLIT >

EXECUTE: _ => vm.${identifiers.EXECUTE}(vm.${identifiers.OPERATIONS} = _),
`.split(" | - SPLIT >")

if(shuffle) vmBody = string_utils.shuffleArray(vmBody);

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