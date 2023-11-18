E.EXECUTE([
    [E.OPCODES.STORE, "0"],
    [E.OPCODES.STORE, "age"],
    [E.OPCODES.REGISTER],
    [E.OPCODES.GET, ["console", "log"]],
    [E.OPCODES.STORE, "Can not drink yet"],
    [E.OPCODES.INVOKE, 1],
    [E.OPCODES.GET, ["console", "log"]],
    [E.OPCODES.STORE, "Can drink now!"],
    [E.OPCODES.INVOKE, 1]
]);