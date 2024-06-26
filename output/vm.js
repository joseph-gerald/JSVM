/* JOVM */
const E = {
    OPCODES: {
        DEBUG: 0,
        STORE: 1,
        DUP: 2,
        DEL: 3,
        LOAD: 4,
        GOTO: 5,
        GET: 6,
        SET_CONTEXT: 7,
        LABEL: 8,
        RETURN: 9,
        VISIT: 10,
        CJUMP: 11,
        JUMP: 12,
        INVOKE: 13,
        SINVOKE: 14,
        ASSIGN: 15,
        ASSIGN_FUNCTION: 16,
        OADD: 17,
        OSUB: 18,
        OMUL: 19,
        ODIV: 20,
        OEXP: 21,
        OMOD: 22,
        OXOR: 23,
        OBOR: 24,
        OAND: 25,
        ONOT: 26,
        REGISTER: 27,
        READ_REGISTRY: 28,
        OR: 29,
        NOT: 30,
        AND: 31,
        OEQ: 32,
        OIQ: 33,
        OGT: 34,
        OGE: 35,
        OLT: 36,
        OLE: 37
    },
    OP_INDEX: 0,
    OPERATIONS: [],
    CPOOL: [],
    STACK: [],
    REGISTRY: [],
    LABELS: [],
    VISITS: [],
    CONTEXT: [],
    BTOA: E => btoa(E),
    BTOA_PROXY: O => E.APPLIER([E.BTOA, E, [O]]),
    TRIPLE_BTOA: O => E.BTOA_PROXY(E.BTOA_PROXY(E.BTOA_PROXY(O))),
    EMPTY_STRING: this.name,
    GETTHIS: this,
    OBJECT: Object,
    OBJECT_CLONER: E => structuredClone(E),
    TYPEOF_PROXY: E => typeof E,
    EQUALITY_PROXY: O => E.SHIFTER(O) == E.SHIFTER(O),
    LENGTH_PROXY: E => E.length,
    MAPPER: O => E.SHIFTER(O).map(E.SHIFTER(O)),
    REVERSE_PROXY: E => E.reverse(),
    HASH_MAPPER: E => E.map((E => E.charCodeAt())),
    HASH_REDUCER: O => O.reduce(((O, T) => (T ^ O / T | T & T | O << (E.LENGTH_PROXY(O) | O << T | 1e-5) << (E.LENGTH_PROXY(O) | 41 * E.LENGTH_PROXY(O)) << O * O) + E.EMPTY_STRING + O)),
    HASH: O => E.HASH_REDUCER(E.HASH_MAPPER(E.TRIPLE_BTOA(O).split(E.EMPTY_STRING))),
    CINSERT: O => E.UNSHIFTER([E.CPOOL, O]),
    SINSERT: O => E.UNSHIFTER([E.STACK, O]),
    LINSERT: O => E.UNSHIFTER([E.LABELS, O]),
    VINSERT: O => E.UNSHIFTER([E.VISITS, O]),
    _LOAD: O => E.SHIFTER(E.CPOOL),
    _LOADX: O => ($ = E.CPOOL.slice(0, O), E.CPOOL = E.CPOOL.slice(O, E.LENGTH_PROXY(E.CPOOL)),
        $),
    _SLOAD: O => E.SHIFTER(E.STACK),
    _DIG: O => E.SHIFTER(O).reduce(((O = E.SHIFTER(T), T) => O[T]), E.SHIFTER(O)),
    _DUP: O => E.CINSERT(E.CPOOL[0]),
    _SDUP: O => E.SINSERT(E.STACK[0]),
    _STORE: O => E.CINSERT(O),
    _GET: O => E.SINSERT(E._DIG([O, E.GETTHIS, E.GETTHIS]) ?? E._DIG([O.map((O => E.HASH(O))), E.REGISTRY, E.REGISTRY])),
    _INVOKE_JUMP: O => E._VISIT([E.OP_INDEX, E.SHIFTER(O)]),
    _INVOKE_GLOBAL: O => E.APPLIER([E.SHIFTER(O), O, E.REVERSE_PROXY(E._LOADX(E.SHIFTER(O)))]),
    _INVOKE_MATCH: O => E.EQUALITY_PROXY([E.TYPEOF_PROXY(E.EMPTY_STRING), E.TYPEOF_PROXY(O[0])]) ? E._INVOKE_JUMP(O) : E._INVOKE_GLOBAL(O),
    _INVOKE: O => E._INVOKE_MATCH([E._SLOAD(), O]),
    _REGISTER: O => E.REGISTRY[E.LENGTH_PROXY(E.CONTEXT) ? E.HASH(E.CONTEXT.concat(E._LOAD())) : E.HASH(E._LOAD())] = E._LOAD(),
    _READ_REGISTRY: O => E._STORE((E.LENGTH_PROXY(E.CONTEXT) ? E.REGISTRY[E.HASH(E.CONTEXT.concat(O))] ?? E.REGISTRY[E.HASH(O)] : E.REGISTRY[E.HASH(O)]) ?? E._DIG([O, E.GETTHIS, E.GETTHIS])),
    _CREATE_LABEL: O => E.LINSERT(O),
    _FIND_LABEL: O => E.LABELS[E.LABELS.map((E => E[0])).indexOf(O)][1],
    _ASSIGN: O => {
        let T = E.GETTHIS;
        for (let R = 0; R < E.LENGTH_PROXY(O[1]) - 1; R++) T = T[O[1][R]];
        T[O[1][E.LENGTH_PROXY(O[1]) - 1]] = O[0];
    },
    _JUMP_OPERATION: O => E.OP_INDEX = O,
    _RETURN_VISITOR: O => E._JUMP_OPERATION(E.SHIFTER(E.VISITS)),
    _VISIT: O => (E.VINSERT(E.SHIFTER(O)), E._JUMP_OPERATION(E._FIND_LABEL(E.SHIFTER(O)))),
    _JUMP: O => E._JUMP_OPERATION(E._FIND_LABEL(O)),
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
        E._GET(E._LOADX(E.SHIFTER(O)));
    },
    set STORE(O) {
        E._STORE(E.SHIFTER(O));
    },
    set INVOKE(O) {
        E._INVOKE(E.SHIFTER(O));
    },
    set SINVOKE(O) {
        E._SDUP(), E.TYPEOF_PROXY(E.EMPTY_STRING) == E.TYPEOF_PROXY(E._SLOAD()) ? E._INVOKE(E.SHIFTER(O)) : E._STORE(E._INVOKE(E.SHIFTER(O)));
    },
    set SET_CONTEXT(O) {
        E.CONTEXT = E.SHIFTER(O);
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
    set RETURN(O) {
        E._RETURN_VISITOR(O);
    },
    set ASSIGN(O) {
        E._ASSIGN(E._LOADX(2));
    },
    set ASSIGN_FUNCTION(O) {
        const T = E._SLOAD(),
            R = E.EXECUTE_INDEPENDENT;
        E._ASSIGN([function() {
            R([T, arguments]);
        }, E._LOAD()]);
    },
    OPERATE: O => E._STORE(E.REVERSE_PROXY(E._LOADX(2), E.SHIFTER(O)).reduce(E.SHIFTER(O))),
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
    set ONOT(O) {
        E.OPERATE([O, E => ~E]);
    },
    set NOT(O) {
        E.OPERATE([O, E => !E]);
    },
    SHIFTER: E => E.shift(),
    UNSHIFTER: O => E.SHIFTER(O).unshift(E.SHIFTER(O)),
    APPLIER: O => E.SHIFTER(O).apply(E.SHIFTER(O), E.SHIFTER(O)),
    STORE_LABEL: O => E.SHIFTER(O) == E.OPCODES.LABEL ? E._CREATE_LABEL([E.SHIFTER(O), E.OP_INDEX]) : O,
    GET_NEXT_INSTRUCTION: O => E.APPLIER([E.OBJECT_CLONER, O, [E.OPERATIONS[E.OP_INDEX++]]]),
    EXECUTE_INSN: (O, T) => E[E.OPCODE_KEYS[O]] = T,
    EXECUTOR_ARGS: O => [E.SHIFTER(O), O],
    INSN_EXECUTOR: O => E.APPLIER([E.EXECUTE_INSN, O, E.EXECUTOR_ARGS(O)]),
    set DEBUG(O) {
        const T = E.OP_INDEX,
            R = structuredClone(E.OPERATIONS[T - 1]);
        console.warn("===========    DEBUG    ==========="), console.warn("DEBUG OCCURED ON INDEX: " + T),
            console.warn("=========== ENVIRONMENT ==========="), console.error("OPERATIONS:", E.OPCODES),
            console.error("Constants:", E.CPOOL), console.error("Obj Stack:", E.STACK), console.error("Registery:", E.REGISTRY),
            console.error("Visitors :", E.VISITS), console.error("Context :", E.CONTEXT), console.warn("=========== INSTRUCTION ==========="),
            console.error("Operation: " + E.OPCODE_KEYS[R[0]]), console.error("Arguments: " + JSON.stringify(R));
    },
    EXECUTE_INDEPENDENT: O => {
        const T = E.CPOOL,
            R = Object.entries(E).reduce(((E, O) => (E ??= {}, E[O[0]] = O[1] instanceof Function || (() => {
                try {
                    return structuredClone(O[1]), True;
                } catch {
                    return False;
                }
            }) ? O[1] : console.log(O) + structuredClone(O[1]), E)), {});
        E.CPOOL = T, console.log("TEST", T, JSON.stringify(E.CPOOL)), R.REGISTRY = E.REGISTRY,
            E.UNSHIFTER([R.OPERATIONS, [E.OPCODES.JUMP, E.SHIFTER(O)]]), E.UNSHIFTER([R.CPOOL, ...E.SHIFTER(O)]);
        const S = E.OP_INDEX;
        R.EXECUTION_ENTRY(R.OPERATIONS), E._JUMP_OPERATION(S), E.DEBUG = "";
    },
    EXECUTE_PROXY: O => {
        const T = E.OBJECT_CLONER(O);
        for (; E.OP_INDEX < E.LENGTH_PROXY(E.OPERATIONS);) E.STORE_LABEL(E.GET_NEXT_INSTRUCTION());
        for (E.OP_INDEX = 0; E.OP_INDEX < E.LENGTH_PROXY(E.OPERATIONS);) {
            const O = [E.CPOOL, E.STACK, E.REGISTRY, E.VISITS, E.CONTEXT].map((O => {
                    try {
                        return E.OBJECT_CLONER(O);
                    } catch (E) {
                        return ["error"];
                    }
                })),
                R = E.OP_INDEX;
            try {
                E.INSN_EXECUTOR(E.GET_NEXT_INSTRUCTION());
            } catch (S) {
                const I = E.OPERATIONS[R];
                return console.warn("===========  EXCEPTION  ==========="), console.warn("ERROR OCCURED ON INDEX: " + R),
                    console.warn("=========== ENVIRONMENT ==========="), console.error("OPERATIONS:", E.OPCODES),
                    console.error("EXECUTION QUEUE:", T), console.error("Constants:", O[0]), console.error("Obj Stack:", O[1]),
                    console.error("Registery:", O[2]), console.error("Visitors :", O[3]), console.error("Context  :", O[4]),
                    console.warn("=========== INSTRUCTION ==========="), console.error("Operation: " + E.OPCODE_KEYS[I.shift()]),
                    console.error("Arguments: " + JSON.stringify(I)), console.warn("=========== STACK TRACE ==========="),
                    console.warn("Original:"), console.error(S), console.warn("Attemping to recreate..."),
                    E.CPOOL = O[0], E.STACK = O[1], E.REGISTRY = O[2], E.VISITS = O[3], void E.INSN_EXECUTOR(E.OPCODES[R]);
            }
        }
    },
    EXECUTION_ENTRY: O => E.EXECUTE_PROXY(E.OPERATIONS = O)
};