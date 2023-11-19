vm.EXECUTE([
    [vm.OPCODES.STORE, "0x89161"],
    [vm.OPCODES.STORE, "greet"],
    [vm.OPCODES.REGISTER],
    [vm.OPCODES.JUMP, "0x6C38C"],
    [vm.OPCODES.LABEL, "0x89161"],
    [vm.OPCODES.GET, ["console", "log"]],
    [vm.OPCODES.STORE, "Hello "],
    [vm.OPCODES.READ_REGISTRY, ["greet", "0x89161", "name"]],
    [vm.OPCODES.OADD],
    [vm.OPCODES.INVOKE, 1],
    [vm.OPCODES.LABEL, "0x6C38C"],
    [vm.OPCODES.GET, ["greet"]],
    [vm.OPCODES.STORE, "Bob"],
    [vm.OPCODES.INVOKE, 1]
]);