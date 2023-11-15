
const vm = {
    OPCODES: {"STORE":0,"LOADC":1,"DUP":2,"LOAD":3,"GOTO":4,"GET":5,"LABEL":6,"VISIT":7,"JUMP":8,"INVOKE":9,"OADD":10,"OSUB":11,"OMUL":12,"ODIV":13,"OXOR":14,"OBOR":15,"OAND":16,"OEXP":17},
    
CPOOL: [], // constant pool
STACK: [], // virtual stack

CINSERT: x => vm.CPOOL.unshift(x),
SINSERT: x => vm.STACK.unshift(x),

_LOAD: _ => vm.CPOOL.shift(),
_LOADX: _ => ($=vm.CPOOL.slice(0,_),vm.CPOOL = vm.CPOOL.slice(_,vm.CPOOL.length),$),
_SLOAD: _ => vm.STACK.shift(),

_DUP: _ => vm.CINSERT(vm.CPOOL[0]),
_STORE: _ => vm.CINSERT(_),
_GET: _ => vm.SINSERT(_.reduce((($=this, _) => $[_]), this)),

_INVOKE: _ => vm._SLOAD().apply(_, vm._LOADX(_)),

get LOAD() { 
    vm._LOAD();
},

get DUP() { 
    vm._DUP();
},

set GET(_) { 
    vm._GET(_[0]);
},

set STORE(_) { 
    vm._STORE(_[0]);
},

set INVOKE(_) { 
    vm._INVOKE(_[0][0]);
},

set OADD(_) { 
    const nums=vm._LOADX(2);
    vm._STORE(nums[1]+nums[0])
},

set OSUB(_) {
    const nums=vm._LOADX(2);
    vm._STORE(nums[1]-nums[0])
},

EXECUTE_INSN: (insn, args) => vm[Object.keys(vm.OPCODES)[insn]] = args,

EXECUTE_PROXY: insns => {
    for (let insn of insns) {
        vm.EXECUTE_INSN(insn.shift(), insn);
    }
},

EXECUTE: _ => vm.EXECUTE_PROXY(_),

};

vm.EXECUTE([
        [
            vm.OPCODES.STORE,
            1
        ],
        
        [
            vm.OPCODES.STORE,
            2
        ],
        
        [
            vm.OPCODES.OSUB,
            
        ],
        ])