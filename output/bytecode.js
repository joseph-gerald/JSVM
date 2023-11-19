vm.EXECUTE([
    [vm.OPCODES.STORE, "0x91A4A"],
    [vm.OPCODES.STORE, "greet"],
    [vm.OPCODES.REGISTER],
    [vm.OPCODES.JUMP, "0x10D90"],
    [vm.OPCODES.LABEL, "0x91A4A"],
    [vm.OPCODES.STORE, ["greet", "0x91A4A", "name"]],
    [vm.OPCODES.REGISTER],
    [vm.OPCODES.GET, ["console", "log"]],
    [vm.OPCODES.STORE, "Hello "],
    [vm.OPCODES.READ_REGISTRY, ["greet", "0x91A4A", "name"]],
    [vm.OPCODES.OADD],
    [vm.OPCODES.INVOKE, 1],
    [vm.OPCODES.LABEL, "0x10D90"],
    [vm.OPCODES.GET, ["greet"]],
    [vm.OPCODES.STORE, "Bob"],
    [vm.OPCODES.INVOKE, 1]
]);