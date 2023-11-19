/* JOVM */
const vm = {
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
    CINSERT: E => vm.UNSHIFTER([vm.CPOOL, E]),
    SINSERT: E => vm.UNSHIFTER([vm.STACK, E]),
    LINSERT: E => vm.UNSHIFTER([vm.LABELS, E]),
    _LOAD: E => vm.SHIFTER(vm.CPOOL),
    _LOADX: E => ($ = vm.CPOOL.slice(0, E), vm.CPOOL = vm.CPOOL.slice(E, vm.CPOOL.length),
        $),
    _SLOAD: E => vm.SHIFTER(vm.STACK),
    _DIG: E => vm.SHIFTER(E).reduce(((E = vm.SHIFTER(O), O) => E[O]), vm.SHIFTER(E)),
    _DUP: E => vm.CINSERT(vm.CPOOL[0]),
    _STORE: E => vm.CINSERT(E),
    _GET: E => vm.SINSERT(vm._DIG([E, vm.GETTHIS, vm.GETTHIS]) ?? vm._DIG([E.map((E => vm.HASH(E))), vm.REGISTRY, vm.REGISTRY])),
    _INVOKE_JUMP: E => vm._JUMP(E.shift()),
    _INVOKE_GLOBAL: E => vm.APPLIER([E.shift(), E, vm._LOADX(E.shift()).reverse()]),
    _INVOKE_MATCH: E => ["string", "number"].includes(typeof E[0]) ? vm._INVOKE_JUMP(E) : vm._INVOKE_GLOBAL(E),
    _INVOKE: E => vm._INVOKE_MATCH([vm._SLOAD(), E]),
    _REGISTER: E => vm.REGISTRY[vm.HASH(vm._LOAD())] = vm._LOAD(),
    _READ_REGISTRY: E => vm._STORE(vm.REGISTRY[vm.HASH(E)] ?? vm._DIG([E, vm.GETTHIS, vm.GETTHIS])),
    _CREATE_LABEL: E => vm.LINSERT(E),
    _FIND_LABEL: E => vm.LABELS[vm.LABELS.map((E => E[0])).indexOf(E)][1],
    _JUMP: E => vm.OP_INDEX = vm._FIND_LABEL(E),
    get OPCODE_KEYS() {
        return vm.APPLIER([vm.OBJECT.keys, vm, [vm.OPCODES]]);
    },
    get LOAD() {
        return vm._LOAD();
    },
    get DUP() {
        vm._DUP();
    },
    set GET(E) {
        vm._GET(vm.SHIFTER(E));
    },
    set STORE(E) {
        vm._STORE(vm.SHIFTER(E));
    },
    set INVOKE(E) {
        vm._INVOKE(vm.SHIFTER(E));
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
    OPERATE: E => vm._STORE(vm._LOADX(2).reverse(vm.SHIFTER(E)).reduce(vm.SHIFTER(E))),
    set OADD(E) {
        vm.OPERATE([E, (E, O) => E + O]);
    },
    set OSUB(E) {
        vm.OPERATE([E, (E, O) => E - O]);
    },
    set OMUL(E) {
        vm.OPERATE([E, (E, O) => E * O]);
    },
    set ODIV(E) {
        vm.OPERATE([E, (E, O) => E / O]);
    },
    set OXOR(E) {
        vm.OPERATE([E, (E, O) => E ^ O]);
    },
    set OBOR(E) {
        vm.OPERATE([E, (E, O) => E | O]);
    },
    set OAND(E) {
        vm.OPERATE([E, (E, O) => E & O]);
    },
    set OMOD(E) {
        vm.OPERATE([E, (E, O) => E % O]);
    },
    set OEXP(E) {
        vm.OPERATE([E, (E, O) => E ** O]);
    },
    set AND(E) {
        vm.OPERATE([E, (E, O) => E && O]);
    },
    set OR(E) {
        vm.OPERATE([E, (E, O) => E || O]);
    },
    set OEQ(E) {
        vm.OPERATE([E, (E, O) => E == O]);
    },
    set OIQ(E) {
        vm.OPERATE([E, (E, O) => E != O]);
    },
    set OGT(E) {
        vm.OPERATE([E, (E, O) => E > O]);
    },
    set OGE(E) {
        vm.OPERATE([E, (E, O) => E >= O]);
    },
    set OLT(E) {
        vm.OPERATE([E, (E, O) => O > E]);
    },
    set OLE(E) {
        vm.OPERATE([E, (E, O) => O >= E]);
    },
    SHIFTER: E => E.shift(),
    UNSHIFTER: E => vm.SHIFTER(E).unshift(vm.SHIFTER(E)),
    APPLIER: E => vm.SHIFTER(E).apply(vm.SHIFTER(E), vm.SHIFTER(E)),
    STORE_LABEL: E => vm.SHIFTER(E) == vm.OPCODES.LABEL ? vm._CREATE_LABEL([vm.SHIFTER(E), vm.OP_INDEX]) : E,
    GET_NEXT_INSTRUCTION: E => vm.APPLIER([vm.OBJECT_CLONER, E, [vm.OPERATIONS[vm.OP_INDEX++]]]),
    EXECUTE_INSN: (E, O) => vm[vm.OPCODE_KEYS[E]] = O,
    EXECUTOR_ARGS: E => [vm.SHIFTER(E), E],
    INSN_EXECUTOR: E => vm.APPLIER([vm.EXECUTE_INSN, E, vm.EXECUTOR_ARGS(E)]),
    EXECUTE_PROXY: E => {
        const O = vm.OBJECT_CLONER(E);
        for (; vm.OP_INDEX < vm.OPERATIONS.length;) vm.STORE_LABEL(vm.GET_NEXT_INSTRUCTION());
        for (vm.OP_INDEX = 0; vm.OP_INDEX < vm.OPERATIONS.length;) {
            const E = [vm.CPOOL, vm.STACK, vm.REGISTRY].map((E => {
                try {
                    return vm.OBJECT_CLONER(E);
                } catch (E) {
                    return ["error"];
                }
            }));
            try {
                vm.INSN_EXECUTOR(vm.GET_NEXT_INSTRUCTION());
            } catch (T) {
                const R = vm.OPERATIONS[vm.OP_INDEX - 1];
                return console.warn("===========  EXCEPTION  ==========="), console.warn("ERROR OCCURED ON INDEX: " + (vm.OP_INDEX - 1)),
                    console.warn("=========== ENVIRONMENT ==========="), console.error("OPERATIONS:", vm.OPCODES),
                    console.error("EXECUTION QUEUE:", O), console.error("Constants:", E[0]), console.error("Obj Stack:", E[1]),
                    console.error("REGISTERY:", E[2]), console.warn("=========== INSTRUCTION ==========="),
                    console.error("Operation: " + vm.OPCODE_KEYS[R.shift()]), console.error("Arguments: " + JSON.stringify(R)),
                    console.warn("=========== STACK TRACE ==========="), void vm.INSN_EXECUTOR(vm.OPCODES[vm.OP_INDEX - 1]);
            }
        }
    },
    EXECUTE: E => vm.EXECUTE_PROXY(vm.OPERATIONS = E)
};