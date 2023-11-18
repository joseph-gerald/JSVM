/* JOVM */
const E = {
    OPCODES: {
        STORE: 0,
        LOADC: 1,
        DUP: 2,
        LOAD: 3,
        GOTO: 4,
        GET: 5,
        LABEL: 6,
        VISIT: 7,
        JUMP: 8,
        INVOKE: 9,
        OADD: 10,
        OSUB: 11,
        OMUL: 12,
        ODIV: 13,
        OXOR: 14,
        OBOR: 15,
        OAND: 16,
        OEXP: 17,
        REGISTER: 18,
        READ_REGISTRY: 19,
        AND: 20,
        OR: 21,
        OEQ: 22,
        OIQ: 23,
        OGT: 24,
        OGE: 25,
        OLT: 27,
        OLE: 27
    },
    OP_INDEX: 0,
    CPOOL: [],
    STACK: [],
    REGISTRY: [],
    LABELS: [],
    GETTHIS: this,
    OBJECT: Object,
    HASH: E => btoa(btoa(btoa(E))).split("").map((E => E.charCodeAt())).reduce(((E, O) => (O ^ E / O | O & O | E << (E.length | E << O | 1e-5) << (E.length | 41 * E.length) << E * E) + "" + E)).split("").slice(6, 26).join(""),
    CINSERT: O => E.UNSHIFTER([ E.CPOOL, O ]),
    SINSERT: O => E.UNSHIFTER([ E.STACK, O ]),
    undefined: O => E.UNSHIFTER([ E.LABELS, O ]),
    _LOAD: O => E.SHIFTER(E.CPOOL),
    _LOADX: O => ($ = E.CPOOL.slice(0, O), E.CPOOL = E.CPOOL.slice(O, E.CPOOL.length), 
    $),
    _SLOAD: O => E.SHIFTER(E.STACK),
    _DUP: O => E.CINSERT(E.CPOOL[0]),
    _STORE: O => E.CINSERT(O),
    _GET: O => E.SINSERT(O.reduce(((O = E.GETTHIS, R) => O[R]), E.GETTHIS)),
    _INVOKE: O => E.APPLIER([ E._SLOAD(), O, E._LOADX(O) ]),
    _REGISTER: O => E.REGISTRY[E.HASH(E._LOAD())] = E._LOAD(),
    _READ_REGISTRY: O => E._STORE(E.REGISTRY[E.HASH(O)] ?? E.GETTHIS[O]),
    _CREATE_LABEL: O => E.undefined(O),
    get OPCODE_KEYS() {
        return E.APPLIER([ E.OBJECT.keys, E, [ E.OPCODES ] ]);
    },
    get LOAD() {
        return E._LOAD();
    },
    get DUP() {
        E._DUP();
    },
    set GET(O) {
        E._GET(O[0]);
    },
    set STORE(O) {
        E._STORE(O[0]);
    },
    set INVOKE(O) {
        E._INVOKE(O[0]);
    },
    set REGISTER(O) {
        E._REGISTER(O[0]);
    },
    set READ_REGISTRY(O) {
        E._READ_REGISTRY(O[0]);
    },
    set LABEL(O) {
        E._CREATE_LABEL(O[0]);
    },
    OPERATE: O => E._STORE(E._LOADX(2).reverse(E.SHIFTER(O)).reduce(E.SHIFTER(O))),
    set OADD(O) {
        E.OPERATE([ O, (E, O) => E + O ]);
    },
    set OSUB(O) {
        E.OPERATE([ O, (E, O) => E - O ]);
    },
    set OMUL(O) {
        E.OPERATE([ O, (E, O) => E * O ]);
    },
    set ODIV(O) {
        E.OPERATE([ O, (E, O) => E / O ]);
    },
    set OXOR(O) {
        E.OPERATE([ O, (E, O) => E ^ O ]);
    },
    set OBOR(O) {
        E.OPERATE([ O, (E, O) => E | O ]);
    },
    set OAND(O) {
        E.OPERATE([ O, (E, O) => E & O ]);
    },
    set OEXP(O) {
        E.OPERATE([ O, (E, O) => E ** O ]);
    },
    set AND(O) {
        E.OPERATE([ O, (E, O) => E && O ]);
    },
    set OR(O) {
        E.OPERATE([ O, (E, O) => E || O ]);
    },
    set OEQ(O) {
        E.OPERATE([ O, (E, O) => E == O ]);
    },
    set OIQ(O) {
        E.OPERATE([ O, (E, O) => E != O ]);
    },
    set OGT(O) {
        E.OPERATE([ O, (E, O) => E > O ]);
    },
    set OGE(O) {
        E.OPERATE([ O, (E, O) => E >= O ]);
    },
    set OLE(O) {
        E.OPERATE([ O, (E, O) => O > E ]);
    },
    set OLE(O) {
        E.OPERATE([ O, (E, O) => O >= E ]);
    },
    SHIFTER: E => E.shift(),
    UNSHIFTER: O => E.SHIFTER(O).unshift(E.SHIFTER(O)),
    APPLIER: O => E.SHIFTER(O).apply(E.SHIFTER(O), E.SHIFTER(O)),
    EXECUTE_INSN: (O, R) => E[E.OPCODE_KEYS[O]] = R,
    EXECUTOR_ARGS: O => [ E.SHIFTER(O), O ],
    INSN_EXECUTOR: O => E.APPLIER([ E.EXECUTE_INSN, O, E.EXECUTOR_ARGS(O) ]),
    EXECUTE_PROXY: O => {
        O.map(E.INSN_EXECUTOR);
    },
    EXECUTE: O => E.EXECUTE_PROXY(O)
};

E.EXECUTE([ [ E.OPCODES.STORE, 42 ], [ E.OPCODES.STORE, 100 ], [ E.OPCODES.OMUL ], [ E.OPCODES.STORE, "age" ], [ E.OPCODES.REGISTER ], [ E.OPCODES.STORE, "I am " ], [ E.OPCODES.STORE, 42 ], [ E.OPCODES.OADD ], [ E.OPCODES.STORE, " years old" ], [ E.OPCODES.OADD ], [ E.OPCODES.STORE, "text" ], [ E.OPCODES.REGISTER ], [ E.OPCODES.GET, [ "console", "log" ] ], [ E.OPCODES.STORE, "Can drink in US?" ], [ E.OPCODES.INVOKE, 1 ], [ E.OPCODES.READ_REGISTRY, "age" ], [ E.OPCODES.STORE, 20 ], [ E.OPCODES.OGT ], [ E.OPCODES.GET, [ "console", "log" ] ], [ E.OPCODES.STORE, "Yes" ], [ E.OPCODES.INVOKE, 1 ], [ E.OPCODES.GET, [ "console", "warn" ] ], [ E.OPCODES.STORE, "No, Too Young" ], [ E.OPCODES.INVOKE, 1 ], [ E.OPCODES.GET, [ "console", "log" ] ], [ E.OPCODES.READ_REGISTRY, "text" ], [ E.OPCODES.INVOKE, 1 ] ]);