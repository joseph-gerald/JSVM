vm.EXECUTE([
    [vm.OPCODES.STORE, "log"],
    [vm.OPCODES.STORE, "prop"],
    [vm.OPCODES.REGISTER],
    [vm.OPCODES.READ_REGISTRY, "prop"],
    [vm.OPCODES.STORE, "console"],
    [vm.OPCODES.GET, 2],
    [vm.OPCODES.STORE, "BRUH"],
    [vm.OPCODES.INVOKE, 1]
]);