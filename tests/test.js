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
    
    CINSERT: x => vm.CPOOL.unshift(x),
    SINSERT: x => vm.STACK.unshift(x),

    _LOAD: _ => vm.CPOOL.shift(),
    _LOADX: _ => ($=vm.CPOOL.slice(0,_),vm.CPOOL = vm.CPOOL.slice(_,vm.CPOOL.length),$),
    _SLOAD: _ => vm.STACK.shift(),

    _DUP: _ => vm.CINSERT(vm.CPOOL[0]),
    _STORE: _ => vm.CINSERT(_),
    _GET: _ => vm.SINSERT(_.reduce((($=this, _) => $[_]), this)),

    _INVOKE: _ => vm._SLOAD().apply(null, vm._LOADX(_)),

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
        for (item of _) vm._STORE(item);
    },
    
    set INVOKE(_) { 
        return vm._INVOKE(_[0][0]);
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
            OPCODES.GET,
            ["console","log"]
        ],
        [
            OPCODES.STORE,
            "Hello"
        ],
        [
            OPCODES.INVOKE,
            [
                1
            ]
        ],
        [
            OPCODES.GET,
            ["console","log"]
        ],
        [
            OPCODES.STORE,
            "Hello"
        ],
        [
            OPCODES.INVOKE,
            [
                1
            ]
        ],
    ]
)

// console.log("Hello World") in JVM (Joseph's VM)

