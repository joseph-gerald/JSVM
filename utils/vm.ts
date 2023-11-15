
const OPCODES: {} = {
    STORE: 0,    // store to constant pool
    LOADC: 1,    // store to stack
    DUP: 2,   // duplicate item from stack
    LOAD: 3,  // load from top of stack
    GOTO: 4,  // jump to bytecode index
    GET: 5,   // fetch from global context
    LABEL: 6, // Label
    VISIT: 7, // Visit label and return back
    JUMP: 8,  // Jump to label
    INVOKE: 9,// Invoke Function
};

export default {
    OPCODES,
}