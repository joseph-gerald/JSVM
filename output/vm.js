/* JOVM */
const E = {
    OPCODES: {
        STORE: 0,
        DUP: 1,
        LOAD: 2,
        GOTO: 3,
        GET: 4,
        LABEL: 5,
        VISIT: 6,
        CJUMP: 7,
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
        OMOD: 18,
        REGISTER: 19,
        READ_REGISTRY: 20,
        AND: 21,
        OR: 22,
        OEQ: 23,
        OIQ: 24,
        OGT: 25,
        OGE: 26,
        OLT: 27,
        OLE: 28
    },
    OP_INDEX: 0,
    OPERATIONS: [],
    CPOOL: [],
    STACK: [],
    REGISTRY: [],
    LABELS: [],
    GETTHIS: this,
    OBJECT: Object,
    OBJECT_CLONER: E => structuredClone(E),
    HASH: E => btoa(btoa(btoa(E))).split("").map((E => E.charCodeAt())).reduce(((E, O) => (O ^ E / O | O & O | E << (E.length | E << O | 1e-5) << (E.length | 41 * E.length) << E * E) + "" + E)).split("").slice(6, 26).join(""),
    CINSERT: O => E.UNSHIFTER([E.CPOOL, O]),
    SINSERT: O => E.UNSHIFTER([E.STACK, O]),
    LINSERT: O => E.UNSHIFTER([E.LABELS, O]),
    _LOAD: O => E.SHIFTER(E.CPOOL),
    _LOADX: O => ($ = E.CPOOL.slice(0, O), E.CPOOL = E.CPOOL.slice(O, E.CPOOL.length),
        $),
    _SLOAD: O => E.SHIFTER(E.STACK),
    _DUP: O => E.CINSERT(E.CPOOL[0]),
    _STORE: O => E.CINSERT(O),
    _GET: O => E.SINSERT(O.reduce(((O = E.GETTHIS, T) => O[T]), E.GETTHIS)),
    _INVOKE: O => E.APPLIER([E._SLOAD(), O, E._LOADX(O).reverse()]),
    _REGISTER: O => E.REGISTRY[E.HASH(E._LOAD())] = E._LOAD(),
    _READ_REGISTRY: O => E._STORE(E.REGISTRY[E.HASH(O)] ?? E.GETTHIS[O]),
    _CREATE_LABEL: O => E.LINSERT(O),
    _FIND_LABEL: O => E.LABELS[E.LABELS.map((E => E[0])).indexOf(O)][1],
    _JUMP: O => E.OP_INDEX = E._FIND_LABEL(O),
    get OPCODE_KEYS() {
        return E.APPLIER([E.OBJECT.keys, E, [E.OPCODES]]);
    },
    get LOAD() {
        return E._LOAD();
    },
    get DUP() {
        E._DUP();
    },
    set GET(O) {
        E._GET(E.SHIFTER(O));
    },
    set STORE(O) {
        E._STORE(E.SHIFTER(O));
    },
    set INVOKE(O) {
        E._INVOKE(E.SHIFTER(O));
    },
    set REGISTER(O) {
        E._REGISTER(E.SHIFTER(O));
    },
    set READ_REGISTRY(O) {
        E._READ_REGISTRY(E.SHIFTER(O));
    },
    set LABEL(O) {
        E._CREATE_LABEL;
    },
    set JUMP(O) {
        E._JUMP(E.SHIFTER(O));
    },
    set CJUMP(O) {
        E._LOAD() || E._JUMP(O[0]);
    },
    OPERATE: O => E._STORE(E._LOADX(2).reverse(E.SHIFTER(O)).reduce(E.SHIFTER(O))),
    set OADD(O) {
        E.OPERATE([O, (E, O) => E + O]);
    },
    set OSUB(O) {
        E.OPERATE([O, (E, O) => E - O]);
    },
    set OMUL(O) {
        E.OPERATE([O, (E, O) => E * O]);
    },
    set ODIV(O) {
        E.OPERATE([O, (E, O) => E / O]);
    },
    set OXOR(O) {
        E.OPERATE([O, (E, O) => E ^ O]);
    },
    set OBOR(O) {
        E.OPERATE([O, (E, O) => E | O]);
    },
    set OAND(O) {
        E.OPERATE([O, (E, O) => E & O]);
    },
    set OMOD(O) {
        E.OPERATE([O, (E, O) => E % O]);
    },
    set OEXP(O) {
        E.OPERATE([O, (E, O) => E ** O]);
    },
    set AND(O) {
        E.OPERATE([O, (E, O) => E && O]);
    },
    set OR(O) {
        E.OPERATE([O, (E, O) => E || O]);
    },
    set OEQ(O) {
        E.OPERATE([O, (E, O) => E == O]);
    },
    set OIQ(O) {
        E.OPERATE([O, (E, O) => E != O]);
    },
    set OGT(O) {
        E.OPERATE([O, (E, O) => E > O]);
    },
    set OGE(O) {
        E.OPERATE([O, (E, O) => E >= O]);
    },
    set OLT(O) {
        E.OPERATE([O, (E, O) => O > E]);
    },
    set OLE(O) {
        E.OPERATE([O, (E, O) => O >= E]);
    },
    SHIFTER: E => E.shift(),
    UNSHIFTER: O => E.SHIFTER(O).unshift(E.SHIFTER(O)),
    APPLIER: O => E.SHIFTER(O).apply(E.SHIFTER(O), E.SHIFTER(O)),
    STORE_LABEL: O => E.SHIFTER(O) == E.OPCODES.LABEL ? E._CREATE_LABEL([E.SHIFTER(O), E.OP_INDEX]) : O,
    GET_NEXT_INSTRUCTION: O => E.APPLIER([E.OBJECT_CLONER, O, [E.OPERATIONS[E.OP_INDEX++]]]),
    EXECUTE_INSN: (O, T) => E[E.OPCODE_KEYS[O]] = T,
    EXECUTOR_ARGS: O => [E.SHIFTER(O), O],
    INSN_EXECUTOR: O => E.APPLIER([E.EXECUTE_INSN, O, E.EXECUTOR_ARGS(O)]),
    EXECUTE_PROXY: O => {
        for (; E.OP_INDEX < E.OPERATIONS.length;) E.STORE_LABEL(E.GET_NEXT_INSTRUCTION());
        for (E.OP_INDEX = 0; E.OP_INDEX < E.OPERATIONS.length;) E.INSN_EXECUTOR(E.GET_NEXT_INSTRUCTION());
    },
    EXECUTE: O => E.EXECUTE_PROXY(E.OPERATIONS = O)
};