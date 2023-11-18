/* JOVM */
const O = {
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
        READ_REGISTRY: 19
    },
    CPOOL: [],
    STACK: [],
    REGISTRY: [],
    HASH: O => btoa(btoa(btoa(O))).split("").map((O => O.charCodeAt())).reduce(((O, E) => (E ^ O / E | E & E | O << (O.length | O << E | 1e-5) << (O.length | 41 * O.length) << O * O) + "" + O)).split("").slice(6, 26).join(""),
    CINSERT: E => O.CPOOL.unshift(E),
    SINSERT: E => O.STACK.unshift(E),
    _LOAD: E => O.CPOOL.shift(),
    _LOADX: E => ($ = O.CPOOL.slice(0, E), O.CPOOL = O.CPOOL.slice(E, O.CPOOL.length), 
    $),
    _SLOAD: E => O.STACK.shift(),
    _DUP: E => O.CINSERT(O.CPOOL[0]),
    _STORE: E => O.CINSERT(E),
    _GET: E => O.SINSERT(E.reduce(((O = this, E) => O[E]), this)),
    _INVOKE: E => O._SLOAD().apply(E, O._LOADX(E)),
    _REGISTER: E => O.REGISTRY[O.HASH(O._LOAD())] = O._LOAD(),
    _READ_REGISTRY: E => O._STORE(O.REGISTRY[O.HASH(E)] ?? this[E]),
    get LOAD() {
        return O._LOAD();
    },
    get DUP() {
        O._DUP();
    },
    set GET(E) {
        O._GET(E[0]);
    },
    set STORE(E) {
        O._STORE(E[0]);
    },
    set INVOKE(E) {
        O._INVOKE(E[0]);
    },
    set REGISTER(E) {
        O._REGISTER(E[0]);
    },
    set READ_REGISTRY(E) {
        O._READ_REGISTRY(E[0]);
    },
    set OADD(E) {
        O._STORE(O._LOADX(2).reverse(E).reduce(((O, E) => O + E)));
    },
    set OSUB(E) {
        O._STORE(O._LOADX(2).reverse(E).reduce(((O, E) => O - E)));
    },
    set OMUL(E) {
        O._STORE(O._LOADX(2).reverse(E).reduce(((O, E) => O * E)));
    },
    set ODIV(E) {
        O._STORE(O._LOADX(2).reverse(E).reduce(((O, E) => O / E)));
    },
    set OXOR(E) {
        O._STORE(O._LOADX(2).reverse(E).reduce(((O, E) => O ^ E)));
    },
    set OBOR(E) {
        O._STORE(O._LOADX(2).reverse(E).reduce(((O, E) => O | E)));
    },
    set OAND(E) {
        O._STORE(O._LOADX(2).reverse(E).reduce(((O, E) => O & E)));
    },
    set OEXP(E) {
        O._STORE(O._LOADX(2).reverse(E).reduce(((O, E) => O ** E)));
    },
    EXECUTE_INSN: (E, S) => O[Object.keys(O.OPCODES)[E]] = S,
    INSN_EXECUTOR: E => O.EXECUTE_INSN(E.shift(), E),
    EXECUTE_PROXY: E => {
        E.map(O.INSN_EXECUTOR);
    },
    EXECUTE: E => O.EXECUTE_PROXY(E)
};

O.EXECUTE([ [ O.OPCODES.STORE, "42" ], [ O.OPCODES.STORE, "age" ], [ O.OPCODES.REGISTER ], [ O.OPCODES.STORE, "I am " ], [ O.OPCODES.STORE, 42 ], [ O.OPCODES.OADD ], [ O.OPCODES.STORE, " years old" ], [ O.OPCODES.OADD ], [ O.OPCODES.STORE, "text" ], [ O.OPCODES.REGISTER ], [ O.OPCODES.GET, [ "console", "log" ] ], [ O.OPCODES.READ_REGISTRY, "text" ], [ O.OPCODES.INVOKE, 1 ], [ O.OPCODES.GET, [ "console", "log" ] ], [ O.OPCODES.STORE, "Hello | " ], [ O.OPCODES.READ_REGISTRY, "age" ], [ O.OPCODES.OADD ], [ O.OPCODES.INVOKE, 3 ], [ O.OPCODES.GET, [ "console", "log" ] ], [ O.OPCODES.READ_REGISTRY, "text" ], [ O.OPCODES.INVOKE, 1 ], [ O.OPCODES.GET, [ "console", "log" ] ], [ O.OPCODES.STORE, "Yes" ], [ O.OPCODES.INVOKE, 1 ], [ O.OPCODES.GET, [ "console", "warn" ] ], [ O.OPCODES.STORE, "Too Young" ], [ O.OPCODES.INVOKE, 1 ] ]);