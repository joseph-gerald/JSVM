const OPCODES = {
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

const vm = {
    CPOOL: [], // constant pool
    STACK: [], // virtual stack
    
    INSERT_START: x => vm.CPOOL.unshift(x),
    _LOAD: _ => vm.CPOOL.shift(),
    _DUP: _ => vm.INSERT_START(vm.CPOOL[0]),
    _STORE: _ => vm.INSERT_START(_),
    _GET: _ => _.reduce((($=this, _) => $[_]), this),
    _INVOKE: _ => vm._GET(_[0]).apply(null, _[1]),

    get LOAD() { 
        return vm._LOAD();
    },
    
    get DUP() { 
        return vm._DUP();
    },
    
    set GET(_) { 
        return vm._GET(_[0]);
    },
    
    set STORE(_) { 
        return vm._STORE(_[0]);
    },
    
    set INVOKE(_) { 
        return vm._INVOKE(_[0]);
    },

    EXECUTE_INSN: (insn, args) => (console.log(insn),vm[Object.keys(OPCODES)[insn]] = args),

    EXECUTE: insns => {
        for (insn of insns) {
            vm.EXECUTE_INSN(insn.shift(), insn);
        }
    }
};

vm.EXECUTE(
    [
        [
            OPCODES.LOADC,
            "Hello"
        ],
        [
            OPCODES.GET,
            ["console","log"]
        ],
        [
            OPCODES.INVOKE,
            [
                ["console","log"],
                ["Hello world"]
            ]
        ],
    ]
)

// console.log("Hello World") in JVM (Joseph's VM)

