import { MangleOptions, MinifyOptions } from "terser";
import terser from "terser"

import string_utils from "./string_utils";

const mangleSettings: MangleOptions = {
    eval: true,
    properties: {
        keep_quoted: true,
        builtins: true,
        regex: /^_[a-zA-Z0-9]/,
        reserved: ["submitCaptcha"],
    },
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
        beautify: true,
        semicolons: true,
    }
}

async function minify(code: string) {
    return (await terser.minify(code, options)).code as string;
}

const ORIGINAL_OPCODES = {
    STORE: 0,    // store to constant pool / heap
    LOADC: 1,    // store to stack
    DUP: 2,      // duplicate item from stack
    LOAD: 3,     // load from top of stack
    GOTO: 4,     // jump to bytecode index
    GET: 5,      // fetch from global context

    // Control Flow

    LABEL: 6,    // Label
    VISIT: 7,    // Visit label and return back
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
};

const OPCODES : { [key: string]: any } = structuredClone(ORIGINAL_OPCODES);

const shuffle = false;

if(shuffle) {
    for (let key of Object.keys(OPCODES)) {
        OPCODES[string_utils.make_large_string(string_utils.calculateChecksum(key),3)] = OPCODES[key];
        delete OPCODES[key]
    }
}

const OPCODE_KEYS = Object.keys(OPCODES);

const identifiers : { [key: string]: any } = {
    OPCODES: "OPCODES",

    CPOOL: "CPOOL",
    STACK: "STACK",

    CINSERT: "CINSERT",
    SINSERT: "SINSERT",

    _LOAD: "_LOAD",
    _LOADX: "_LOADX",
    _SLOAD: "_SLOAD",

    _DUP: "_DUP",
    _STORE: "_STORE",
    _GET: "_GET",

    _INVOKE: "_INVOKE",

    EXECUTE_INSN: "EXECUTE_INSN",
    EXECUTE: "EXECUTE_PROXY",
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

let vmBody = `
${identifiers.CPOOL}: [], // constant pool | - SPLIT >
${identifiers.STACK}: [], // virtual stack | - SPLIT >

${identifiers.CINSERT}: x => vm.${identifiers.CPOOL}.unshift(x), | - SPLIT >
${identifiers.SINSERT}: x => vm.${identifiers.STACK}.unshift(x), | - SPLIT >

${identifiers._LOAD}: _ => vm.${identifiers.CPOOL}.shift(), | - SPLIT >
${identifiers._LOADX}: _ => ($=vm.${identifiers.CPOOL}.slice(0,_),vm.${identifiers.CPOOL} = vm.${identifiers.CPOOL}.slice(_,vm.${identifiers.CPOOL}.length),$), | - SPLIT >
${identifiers._SLOAD}: _ => vm.${identifiers.STACK}.shift(), | - SPLIT >

${identifiers._DUP}: _ => vm.${identifiers.CINSERT}(vm.${identifiers.CPOOL}[0]), | - SPLIT >
${identifiers._STORE}: _ => vm.${identifiers.CINSERT}(_), | - SPLIT >
${identifiers._GET}: _ => vm.${identifiers.SINSERT}(_.reduce((($=this, _) => $[_]), this)), | - SPLIT >

${identifiers._INVOKE}: _ => vm.${identifiers._SLOAD}().apply(_, vm.${identifiers._LOADX}(_)), | - SPLIT >

get ${OPCODE_KEYS[ORIGINAL_OPCODES.LOAD]}() { 
    vm.${identifiers._LOAD}();
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
    vm.${identifiers._INVOKE}(_[0][0]);
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.OADD]}(_) { 
    const nums=vm.${identifiers._LOADX}(2);
    vm._STORE(nums[1]+nums[0])
}, | - SPLIT >

set ${OPCODE_KEYS[ORIGINAL_OPCODES.OSUB]}(_) {
    const nums=vm.${identifiers._LOADX}(2);
    vm._STORE(nums[1]-nums[0])
}, | - SPLIT >

${identifiers.EXECUTE_INSN}: (insn, args) => vm[Object.keys(vm.${identifiers.OPCODES})[insn]] = args, | - SPLIT >

${identifiers.EXECUTE}: insns => {
    for (let insn of insns) {
        vm.${identifiers.EXECUTE_INSN}(insn.shift(), insn);
    }
},

EXECUTE: _ => vm.${identifiers.EXECUTE}(_),
`.split(" | - SPLIT >")

if(shuffle) vmBody = string_utils.shuffleArray(vmBody);

const vmCode = `
const vm = {
    ${identifiers.OPCODES}: ${JSON.stringify(OPCODES)},
    ${vmBody.join("")}
};
`

export default {
    vmCode,
    minify,
    getInstruction
}