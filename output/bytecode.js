vm.EXECUTE([
    [vm.OPCODES.STORE, "0x7CF3F"],
    [vm.OPCODES.STORE, "greet"],
    [vm.OPCODES.REGISTER],
    [vm.OPCODES.JUMP, "0x38068"],
    [vm.OPCODES.LABEL, "0x7CF3F"],
    [vm.OPCODES.GET, ["console", "log"]],
    [vm.OPCODES.STORE, "Hello "],
    [vm.OPCODES.READ_REGISTRY, ["greet", "0x7CF3F", "name"]],
    [vm.OPCODES.OADD],
    [vm.OPCODES.INVOKE, 1],
    [vm.OPCODES.LABEL, "0x38068"],
    [vm.OPCODES.GET, ["greet"]],
    [vm.OPCODES.STORE, "Bob"],
    [vm.OPCODES.INVOKE, 1]
]);