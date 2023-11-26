vm.EXECUTE([
    [vm.OPCODES.STORE, "log"],
    [vm.OPCODES.STORE, "prop"],
    [vm.OPCODES.REGISTER],
    [vm.OPCODES.GET, ["console", "prop"]],
    [vm.OPCODES.STORE, "BRUH"],
    [vm.OPCODES.INVOKE, 1]
]);