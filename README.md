# JSVM
JavaScript virtual machine

## TO-DO
- [x] Literals
- [x] Binary Expressions
- [x] Control Flow
- [x] Variables
- [ ] Functions
- [ ] Objects
- [ ] Errors

## Instructions
```js
[
    "STORE",    // store to constant pool / heap
    "DUP",      // duplicate item from stack
    "LOAD",     // load from top of stack
    "GOTO",     // jump to bytecode index
    "GET",      // fetch from global context

    // Control Flow

    "LABEL",    // Label
    "VISIT",    // Visit label and return back
    "CJUMP",    // Jump if false
    "JUMP",     // Jump to label
    "INVOKE",   // Invoke Function

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
]
```
