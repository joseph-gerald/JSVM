/* JOVM */
const vm = {
    _: 0,
    t: {
        o: 33,
        g: 34,
        l: 35,
        D: 36,
        i: 37,
        C: 38,
        A: 39,
        k: 40,
        O: 41,
        X: 42,
        N: 43
    },
    R: _ => vm.T([vm.I, _]),
    M: _ => vm.V(vm.Z),
    set q(_) {
        vm.u([_, (_, e) => _ ** e])
    },
    H: {
        L: 11,
        j: 12,
        m: 13,
        p: 14,
        B: 15,
        U: 16,
        h: 17,
        G: 18,
        P: 19,
        W: 20,
        Y: 21
    },
    set v(_) {
        vm.S(vm.F(vm.V(_)))
    },
    set K(_) {
        vm.u([_, (_, e) => _ || e])
    },
    J: this,
    $: _ => vm.__(_),
    set e_(_) {
        vm.t_(vm.V(_))
    },
    set p(_) {
        vm.u([_, (_, e) => _ != e])
    },
    F: _ => ($ = vm.Z.slice(0, _), vm.Z = vm.Z.slice(_, vm.Z.length), $),
    set j(_) {
        vm.s_(vm.V(_))
    },
    set o_(_) {
        vm.u([_, _ => ~_])
    },
    g_: _ => structuredClone(_),
    set l_(_) {
        vm.M() || vm.n_(_[0])
    },
    set a_(_) {
        vm.u([_, (_, e) => _ >= e])
    },
    Z: [],
    r_: [],
    set c_(_) {
        vm.y_(vm.V(_))
    },
    D_: [],
    get x_() {
        return vm.i_([vm.C_.keys, vm, [vm.E_]])
    },
    set U(_) {
        vm.u([_, (_, e) => _ / e])
    },
    set D(_) {
        vm.u([_, (_, e) => e > _])
    },
    y_: _ => vm.r_[vm.A_(vm.M())] = vm.M(),
    k_: _ => {
        let e = vm.J;
        for (let t = 0; t < _[1].length - 1; t++) e = e[_[1][t]];
        e[_[1][_[1].length - 1]] = _[0]
    },
    O_: _ => vm.V(_) == vm.E_.X ? vm.$([vm.V(_), vm._]) : _,
    f_: _ => vm.i_([vm.g_, _, [vm.X_[vm._++]]]),
    N_: (_, e) => vm[vm.x_[_]] = e,
    R_: _ => vm.T([vm.Z, _]),
    set G(_) {
        vm.T_(), "string" == typeof vm.d_() ? vm.t_(vm.V(_)) : vm.I_(vm.t_(vm.V(_)))
    },
    s_: _ => vm.I_(vm.r_[vm.A_(_)] ?? vm.M_([_, vm.J, vm.J])),
    set m(_) {
        vm.V_(_)
    },
    Z_: {
        o_: 0,
        b_: 1,
        q_: 2,
        u_: 3,
        H_: 4,
        L_: 5,
        j_: 6,
        m_: 7,
        q: 8,
        p_: 9,
        B_: 10
    },
    Q_: _ => vm.U_[vm.U_.map((_ => _[0])).indexOf(_)][1],
    set A(_) {
        vm.u([_, (_, e) => _ == e])
    },
    set h_(_) {
        vm.u([_, (_, e) => _ > e])
    },
    V_: _ => vm.w_(vm.V(vm.D_)),
    G_: _ => (vm.P_(_.shift()), vm.w_(vm.Q_(_.shift()))),
    set W_(_) {
        vm.I_(vm.V(_))
    },
    i_: _ => vm.V(_).apply(vm.V(_), vm.V(_)),
    get E_() {
        return {
            ...vm.Z_,
            ...vm.H,
            ...vm.Y_,
            ...vm.t,
            ...vm.v_
        }
    },
    set h(_) {
        vm.u([_, (_, e) => _ * e])
    },
    S_: _ => vm.i_([vm.N_, _, vm.z_(_)]),
    U_: [],
    Y_: {
        F_: 22,
        K_: 23,
        v: 24,
        J_: 25,
        _e: 26,
        ee: 27,
        W_: 28,
        te: 29,
        se: 30,
        oe: 31,
        c_: 32
    },
    C_: Object,
    z_: _ => [vm.V(_), _],
    T_: _ => vm.R(vm.I[0]),
    ge: _ => ["string"].includes(typeof _[0]) ? vm.le(_) : vm.ne(_),
    le: _ => vm.G_([vm._, _.shift()]),
    ne: _ => vm.i_([_.shift(), _, vm.F(_.shift()).reverse()]),
    set ae(_) {
        vm.n_(vm.V(_))
    },
    set re(_) {
        vm.u([_, (_, e) => _ % e])
    },
    set W(_) {
        vm.u([_, _ => !_])
    },
    get H_() {
        return vm.M()
    },
    set N(_) {
        vm.k_(vm.F(2))
    },
    set X(_) {
        vm.$
    },
    set L(_) {
        vm.u([_, (_, e) => _ & e])
    },
    ce: _ => vm.ye(vm.X_ = _),
    M_: _ => vm.V(_).reduce(((_ = vm.V(e), e) => _[e]), vm.V(_)),
    De: _ => vm.R_(vm.Z[0]),
    set J_(_) {
        vm.u([_, (_, e) => _ ^ e])
    },
    set p_(_) {
        vm.u([_, (_, e) => _ && e])
    },
    d_: _ => vm.V(vm.I),
    t_: _ => vm.ge([vm.d_(), _]),
    set te(_) {
        vm.u([_, (_, e) => e >= _])
    },
    I_: _ => vm.R_(_),
    get _e() {
        vm.De()
    },
    set i(_) {
        vm.u([_, (_, e) => _ - e])
    },
    u: _ => vm.I_(vm.F(2).reverse(vm.V(_)).reduce(vm.V(_))),
    set ee(_) {
        vm.u([_, (_, e) => _ + e])
    },
    A_: _ => btoa(btoa(btoa(_))).split("").map((_ => _.charCodeAt())).reduce(((_, e) => (e ^ _ / e | e & e | _ << (_.length | _ << e | 1e-5) << (_.length | 41 * _.length) << _ * _) + "" + _)).slice(6, 26),
    T: _ => vm.V(_).unshift(vm.V(_)),
    __: _ => vm.T([vm.U_, _]),
    n_: _ => vm.w_(vm.Q_(_)),
    set xe(_) {
        vm.u([_, (_, e) => _ | e])
    },
    ye: _ => {
        for (vm.g_(_); vm._ < vm.X_.length;) vm.O_(vm.f_());
        for (vm._ = 0; vm._ < vm.X_.length;) vm.S_(vm.f_())
    },
    v_: {
        l_: 44,
        h_: 45,
        K: 46,
        xe: 47,
        ie: 48,
        Ce: 49,
        Ee: 50,
        e_: 51,
        re: 52,
        Ae: 53,
        ae: 54,
        a_: 55
    },
    V: _ => _.shift(),
    w_: _ => vm._ = _,
    P_: _ => vm.T([vm.D_, _]),
    S: _ => vm.R(vm.M_([_, vm.J, vm.J]) ?? vm.M_([_.map((_ => vm.A_(_))), vm.r_, vm.r_])),
    I: [],
    X_: []
};