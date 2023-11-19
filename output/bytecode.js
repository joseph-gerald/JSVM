vm.EXECUTE([
    [vm.OPCODES.STORE, 5],
    [vm.OPCODES.STORE, "name"],
    [vm.OPCODES.REGISTER],
    [vm.OPCODES.READ_REGISTRY, "name"],
    [vm.OPCODES.STORE, 3],
    [vm.OPCODES.OMUL],
    [vm.OPCODES.STORE, "name"],
    [vm.OPCODES.REGISTER],
    [vm.OPCODES.GET, ["console", "log"]],
    [vm.OPCODES.STORE, "NAME: "],
    [vm.OPCODES.READ_REGISTRY, ["name"]],
    [vm.OPCODES.OADD],
    [vm.OPCODES.INVOKE, 1]
]);