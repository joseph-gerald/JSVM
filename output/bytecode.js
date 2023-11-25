vm.EXECUTE([
    [vm.OPCODES.GET, ["console", "log"]],
    [vm.OPCODES.GET, ["Date", "now"]],
    [vm.OPCODES.SINVOKE, 0],
    [vm.OPCODES.STORE, .5],
    [vm.OPCODES.OMUL],
    [vm.OPCODES.GET, ["Date", "now"]],
    [vm.OPCODES.SINVOKE, 0],
    [vm.OPCODES.STORE, 1e3],
    [vm.OPCODES.OADD],
    [vm.OPCODES.INVOKE, 2]
]);