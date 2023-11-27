/* JOVM */
const vm = {
    OPCODES: {
        DEBUG: 0,
        STORE: 1,
        DUP: 2,
        DEL: 3,
        LOAD: 4,
        GOTO: 5,
        GET: 6,
        LABEL: 7,
        RETURN: 8,
        VISIT: 9,
        CJUMP: 10,
        JUMP: 11,
        INVOKE: 12,
        SINVOKE: 13,
        ASSIGN: 14,
        OADD: 15,
        OSUB: 16,
        OMUL: 17,
        ODIV: 18,
        OXOR: 19,
        OBOR: 20,
        OAND: 21,
        OEXP: 22,
        OMOD: 23,
        REGISTER: 24,
        READ_REGISTRY: 25,
        AND: 26,
        OR: 27,
        OEQ: 28,
        OIQ: 29,
        OGT: 30,
        OGE: 31,
        OLT: 32,
        OLE: 33
    },
    OP_INDEX: 0,
    OPERATIONS: [],
    CPOOL: [],
    STACK: [],
    REGISTRY: [],
    LABELS: [],
    VISITS: [],
    GETTHIS: this,
    OBJECT: Object,
    OBJECT_CLONER: E => structuredClone(E),
    HASH: E => btoa(btoa(btoa(E))).split("").map((E => E.charCodeAt())).reduce(((E, O) => (O ^ E / O | O & O | E << (E.length | E << O | 1e-5) << (E.length | 41 * E.length) << E * E) + "" + E)).slice(6, 26),
    CINSERT: E => vm.UNSHIFTER([ vm.CPOOL, E ]),
    SINSERT: E => vm.UNSHIFTER([ vm.STACK, E ]),
    LINSERT: E => vm.UNSHIFTER([ vm.LABELS, E ]),
    VINSERT: E => vm.UNSHIFTER([ vm.VISITS, E ]),
    _LOAD: E => vm.SHIFTER(vm.CPOOL),
    _LOADX: E => ($ = vm.CPOOL.slice(0, E), vm.CPOOL = vm.CPOOL.slice(E, vm.CPOOL.length), 
    $),
    _SLOAD: E => vm.SHIFTER(vm.STACK),
    _DIG: E => vm.SHIFTER(E).reduce(((E = vm.SHIFTER(O), O) => E[O]), vm.SHIFTER(E)),
    _DUP: E => vm.CINSERT(vm.CPOOL[0]),
    _SDUP: E => vm.SINSERT(vm.STACK[0]),
    _STORE: E => vm.CINSERT(E),
    _GET: E => vm.SINSERT(vm._DIG([ E, vm.GETTHIS, vm.GETTHIS ]) ?? vm._DIG([ E.map((E => vm.HASH(E))), vm.REGISTRY, vm.REGISTRY ])),
    _INVOKE_JUMP: E => vm._VISIT([ vm.OP_INDEX, E.shift() ]),
    _INVOKE_GLOBAL: E => vm.APPLIER([ E.shift(), E, vm._LOADX(E.shift()).reverse() ]),
    _INVOKE_MATCH: E => [ "string" ].includes(typeof E[0]) ? vm._INVOKE_JUMP(E) : vm._INVOKE_GLOBAL(E),
    _INVOKE: E => vm._INVOKE_MATCH([ vm._SLOAD(), E ]),
    _REGISTER: E => vm.REGISTRY[vm.HASH(vm._LOAD())] = vm._LOAD(),
    _READ_REGISTRY: E => vm._STORE(vm.REGISTRY[vm.HASH(E)] ?? vm._DIG([ E, vm.GETTHIS, vm.GETTHIS ])),
    _CREATE_LABEL: E => vm.LINSERT(E),
    _FIND_LABEL: E => vm.LABELS[vm.LABELS.map((E => E[0])).indexOf(E)][1],
    _ASSIGN: E => {
        let O = vm.GETTHIS;
        for (let T = 0; T < E[1].length - 1; T++) O = O[E[1][T]];
        O[E[1][E[1].length - 1]] = E[0];
    },
    _JUMP_OPERATION: E => vm.OP_INDEX = E,
    _RETURN_VISITOR: E => vm._JUMP_OPERATION(vm.SHIFTER(vm.VISITS)),
    _VISIT: E => (vm.VINSERT(E.shift()), vm._JUMP_OPERATION(vm._FIND_LABEL(E.shift()))),
    _JUMP: E => vm._JUMP_OPERATION(vm._FIND_LABEL(E)),
    get OPCODE_KEYS() {
        return vm.APPLIER([ vm.OBJECT.keys, vm, [ vm.OPCODES ] ]);
    },
    get LOAD() {
        return vm._LOAD();
    },
    get DUP() {
        vm._DUP();
    },
    set GET(E) {
        vm._GET(vm._LOADX(vm.SHIFTER(E)));
    },
    set STORE(E) {
        vm._STORE(vm.SHIFTER(E));
    },
    set INVOKE(E) {
        vm._INVOKE(vm.SHIFTER(E));
    },
    set SINVOKE(E) {
        vm._SDUP(), "string" == typeof vm._SLOAD() ? vm._INVOKE(vm.SHIFTER(E)) : vm._STORE(vm._INVOKE(vm.SHIFTER(E)));
    },
    set REGISTER(E) {
        vm._REGISTER(vm.SHIFTER(E));
    },
    set READ_REGISTRY(E) {
        vm._READ_REGISTRY(vm.SHIFTER(E));
    },
    set LABEL(E) {
        vm._CREATE_LABEL;
    },
    set JUMP(E) {
        vm._JUMP(vm.SHIFTER(E));
    },
    set CJUMP(E) {
        vm._LOAD() || vm._JUMP(E[0]);
    },
    set RETURN(E) {
        vm._RETURN_VISITOR(E);
    },
    set ASSIGN(E) {
        vm._ASSIGN(vm._LOADX(2));
    },
    OPERATE: E => vm._STORE(vm._LOADX(2).reverse(vm.SHIFTER(E)).reduce(vm.SHIFTER(E))),
    set OADD(E) {
        vm.OPERATE([ E, (E, O) => E + O ]);
    },
    set OSUB(E) {
        vm.OPERATE([ E, (E, O) => E - O ]);
    },
    set OMUL(E) {
        vm.OPERATE([ E, (E, O) => E * O ]);
    },
    set ODIV(E) {
        vm.OPERATE([ E, (E, O) => E / O ]);
    },
    set OXOR(E) {
        vm.OPERATE([ E, (E, O) => E ^ O ]);
    },
    set OBOR(E) {
        vm.OPERATE([ E, (E, O) => E | O ]);
    },
    set OAND(E) {
        vm.OPERATE([ E, (E, O) => E & O ]);
    },
    set OMOD(E) {
        vm.OPERATE([ E, (E, O) => E % O ]);
    },
    set OEXP(E) {
        vm.OPERATE([ E, (E, O) => E ** O ]);
    },
    set AND(E) {
        vm.OPERATE([ E, (E, O) => E && O ]);
    },
    set OR(E) {
        vm.OPERATE([ E, (E, O) => E || O ]);
    },
    set OEQ(E) {
        vm.OPERATE([ E, (E, O) => E == O ]);
    },
    set OIQ(E) {
        vm.OPERATE([ E, (E, O) => E != O ]);
    },
    set OGT(E) {
        vm.OPERATE([ E, (E, O) => E > O ]);
    },
    set OGE(E) {
        vm.OPERATE([ E, (E, O) => E >= O ]);
    },
    set OLT(E) {
        vm.OPERATE([ E, (E, O) => O > E ]);
    },
    set OLE(E) {
        vm.OPERATE([ E, (E, O) => O >= E ]);
    },
    SHIFTER: E => E.shift(),
    UNSHIFTER: E => vm.SHIFTER(E).unshift(vm.SHIFTER(E)),
    APPLIER: E => vm.SHIFTER(E).apply(vm.SHIFTER(E), vm.SHIFTER(E)),
    STORE_LABEL: E => vm.SHIFTER(E) == vm.OPCODES.LABEL ? vm._CREATE_LABEL([ vm.SHIFTER(E), vm.OP_INDEX ]) : E,
    GET_NEXT_INSTRUCTION: E => vm.APPLIER([ vm.OBJECT_CLONER, E, [ vm.OPERATIONS[vm.OP_INDEX++] ] ]),
    EXECUTE_INSN: (E, O) => vm[vm.OPCODE_KEYS[E]] = O,
    EXECUTOR_ARGS: E => [ vm.SHIFTER(E), E ],
    INSN_EXECUTOR: E => vm.APPLIER([ vm.EXECUTE_INSN, E, vm.EXECUTOR_ARGS(E) ]),
    set DEBUG(E) {
        const O = vm.OP_INDEX, T = structuredClone(vm.OPERATIONS[O - 1]);
        console.warn("===========    DEBUG    ==========="), console.warn("DEBUG OCCURED ON INDEX: " + O), 
        console.warn("=========== ENVIRONMENT ==========="), console.error("OPERATIONS:", vm.OPCODES), 
        console.error("Constants:", vm.CPOOL), console.error("Obj Stack:", vm.STACK), console.error("Registery:", vm.REGISTRY), 
        console.error("Visitors :", vm.VISITS), console.warn("=========== INSTRUCTION ==========="), 
        console.error("Operation: " + vm.OPCODE_KEYS[T.shift()]), console.error("Arguments: " + JSON.stringify(T));
    },
    EXECUTE_PROXY: E => {
        const O = vm.OBJECT_CLONER(E);
        for (;vm.OP_INDEX < vm.OPERATIONS.length; ) vm.STORE_LABEL(vm.GET_NEXT_INSTRUCTION());
        for (vm.OP_INDEX = 0; vm.OP_INDEX < vm.OPERATIONS.length; ) {
            const E = [ vm.CPOOL, vm.STACK, vm.REGISTRY, vm.VISITS ].map((E => {
                try {
                    return vm.OBJECT_CLONER(E);
                } catch (E) {
                    return [ "error" ];
                }
            })), T = vm.OP_INDEX;
            try {
                vm.INSN_EXECUTOR(vm.GET_NEXT_INSTRUCTION());
            } catch (R) {
                const S = vm.OPERATIONS[T];
                return console.warn("===========  EXCEPTION  ==========="), console.warn("ERROR OCCURED ON INDEX: " + T), 
                console.warn("=========== ENVIRONMENT ==========="), console.error("OPERATIONS:", vm.OPCODES), 
                console.error("EXECUTION QUEUE:", O), console.error("Constants:", E[0]), console.error("Obj Stack:", E[1]), 
                console.error("Registery:", E[2]), console.error("Visitors :", E[3]), console.warn("=========== INSTRUCTION ==========="), 
                console.error("Operation: " + vm.OPCODE_KEYS[S.shift()]), console.error("Arguments: " + JSON.stringify(S)), 
                console.warn("=========== STACK TRACE ==========="), console.warn("Original:"), 
                console.error(R), console.warn("Attemping to recreate..."), vm.CPOOL = E[0], vm.STACK = E[1], 
                vm.REGISTRY = E[2], vm.VISITS = E[3], void vm.INSN_EXECUTOR(vm.OPCODES[T]);
            }
        }
    },
    EXECUTE: E => vm.EXECUTE_PROXY(vm.OPERATIONS = E)
};

vm.EXECUTE([ [ vm.OPCODES.STORE, "log" ], [ vm.OPCODES.STORE, "prop" ], [ vm.OPCODES.REGISTER ], [ vm.OPCODES.READ_REGISTRY, "prop" ], [ vm.OPCODES.STORE, "console" ], [ vm.OPCODES.GET, 2 ], [ vm.OPCODES.STORE, "BRUH" ], [ vm.OPCODES.INVOKE, 1 ] ]);