/* JOVM */
const _ = {
    _: t => _.t([_.u, _.o(t)]),
    m: t => _.C([_.l, t]),
    D: t => _.B(_.g[0]),
    set O(t) {
        _.R([t, (_, t) => _ >= t])
    },
    R: t => _.I(_.V(_.W(2), _.o(t)).reduce(_.o(t))),
    set A(t) {
        _.R([t, (_, t) => _ + t])
    },
    J: t => [_.o(t), t],
    M: Object,
    j: [],
    set p(t) {
        _.R([t, (_, t) => _ % t])
    },
    P: _ => structuredClone(_),
    set X(t) {
        _.Z(_.o(t))
    },
    h: t => _.C([_.q, t]),
    o: _ => _.shift(),
    set v(t) {
        _.R([t, (_, t) => _ ^ t])
    },
    F: this.name,
    K: t => _.h(t),
    set N(t) {
        _.R([t, (_, t) => _ / t])
    },
    S: t => _.L([_.i(), t]),
    set k(t) {
        _.D(), _.G(_.F) == _.G(_.i()) ? _.S(_.o(t)) : _.I(_.S(_.o(t)))
    },
    T: t => _.o(t) == _.H.Y ? _.K([_.o(t), _.u]) : t,
    $: t => _.U([_.P, t, [_.__[_.u++]]]),
    t_: (t, s) => _[_.s_[t]] = s,
    q: [],
    get s_() {
        return _.U([_.M.keys, _, [_.H]])
    },
    e_: {
        u_: 33,
        x_: 34,
        o_: 35,
        d_: 36,
        c_: 37,
        m_: 38,
        C_: 39,
        l_: 40,
        E_: 41,
        n_: 42,
        D_: 43
    },
    G: _ => typeof _,
    a_: {
        B_: 0,
        g_: 1,
        O_: 2,
        R_: 3,
        r_: 4,
        Q_: 5,
        A: 6,
        b_: 7,
        X: 8,
        I_: 9,
        V_: 10
    },
    W_: _ => btoa(_),
    A_: t => _.o(t).reduce(((t = _.o(s), s) => t[s]), _.o(t)),
    f_: t => _.w_(_.y_[0]),
    set z_(t) {
        _.R([t, _ => !_])
    },
    J_: t => _.j[_.M_(_.j_())] = _.j_(),
    i: t => _.o(_.g),
    p_: t => {
        let s = _.P_;
        for (let e = 0; e < _.X_(t[1]) - 1; e++) s = s[t[1][e]];
        s[t[1][_.X_(t[1]) - 1]] = t[0]
    },
    L: t => _.Z_([_.G(_.F), _.G(t[0])]) ? _._(t) : _.h_(t),
    q_: {
        k: 44,
        v_: 45,
        N: 46,
        F_: 47,
        K_: 48,
        N_: 49,
        S_: 50,
        L_: 51,
        i_: 52,
        k_: 53,
        G_: 54,
        T_: 55
    },
    y_: [],
    get Q_() {
        return _.j_()
    },
    Y_: _ => _.map((_ => _.charCodeAt())),
    H_: t => t.reduce(((t, s) => (s ^ t / s | s & s | t << (_.X_(t) | t << s | 1e-5) << (_.X_(t) | 41 * _.X_(t)) << t * t) + _.F + t)),
    M_: t => _.H_(_.Y_(_.U_(t).split(_.F))),
    U_: t => _._t(_._t(_._t(t))),
    P_: this,
    j_: t => _.o(_.y_),
    set tt(t) {
        _.R([t, (_, t) => t > _])
    },
    st: t => _.q[_.q.map((_ => _[0])).indexOf(t)][1],
    set et(t) {
        _.R([t, (_, t) => _ == t])
    },
    Z_: t => _.o(t) == _.o(t),
    U: t => _.o(t).apply(_.o(t), _.o(t)),
    set v_(t) {
        _.R([t, (_, t) => _ * t])
    },
    g: [],
    u: 0,
    set ut(t) {
        _.R([t, (_, t) => _ != t])
    },
    xt: {
        O: 11,
        Y: 12,
        ot: 13,
        p: 14,
        dt: 15,
        ct: 16,
        tt: 17,
        Ct: 18,
        lt: 19,
        Et: 20,
        nt: 21
    },
    set d_(t) {
        _.j_() || _.Dt(t[0])
    },
    Bt: t => _.B(_.A_([t, _.P_, _.P_]) ?? _.A_([t.map((t => _.M_(t))), _.j, _.j])),
    B: t => _.C([_.g, t]),
    set n_(t) {
        _.gt(t)
    },
    V: _ => _.reverse(),
    set F_(t) {
        _.R([t, (_, t) => _ | t])
    },
    set dt(t) {
        _.R([t, (_, t) => _ & t])
    },
    Z: t => _.I(_.j[_.M_(t)] ?? _.A_([t, _.P_, _.P_])),
    set B_(t) {
        _.S(_.o(t))
    },
    Ot: t => _.U([_.t_, t, _.J(t)]),
    _t: t => _.U([_.W_, _, [t]]),
    C: t => _.o(t).unshift(_.o(t)),
    h_: t => _.U([_.o(t), t, _.V(_.W(_.o(t)))]),
    Rt: t => _.o(t).map(_.o(t)),
    get H() {
        return {
            ..._.a_,
            ..._.xt,
            ..._.rt,
            ..._.e_,
            ..._.q_
        }
    },
    set g_(t) {
        _.J_(_.o(t))
    },
    set Qt(t) {
        _.R([t, _ => ~_])
    },
    set nt(t) {
        _.R([t, (_, t) => _ && t])
    },
    Dt: t => _.bt(_.st(t)),
    set It(t) {
        _.p_(_.W(2))
    },
    I: t => _.w_(t),
    Vt: t => {
        for (_.P(t); _.u < _.X_(_.__);) _.T(_.$());
        for (_.u = 0; _.u < _.X_(_.__);) _.Ot(_.$())
    },
    W: t => ($ = _.y_.slice(0, t), _.y_ = _.y_.slice(t, _.X_(_.y_)), $),
    set Ct(t) {
        _.R([t, (_, t) => t >= _])
    },
    set T_(t) {
        _.R([t, (_, t) => _ > t])
    },
    set l_(t) {
        _.R([t, (_, t) => _ || t])
    },
    bt: t => _.u = t,
    rt: {
        Wt: 22,
        At: 23,
        z_: 24,
        Qt: 25,
        ut: 26,
        It: 27,
        et: 28,
        v: 29,
        ft: 30,
        wt: 31,
        yt: 32
    },
    set E_(t) {
        _.Bt(_.W(_.o(t)))
    },
    set u_(t) {
        _.Dt(_.o(t))
    },
    __: [],
    set Y(t) {
        _.K
    },
    set x_(t) {
        _.R([t, (_, t) => _ - t])
    },
    set Et(t) {
        _.I(_.o(t))
    },
    gt: t => _.bt(_.o(_.l)),
    t: t => (_.m(_.o(t)), _.bt(_.st(_.o(t)))),
    zt: t => _.Vt(_.__ = t),
    l: [],
    X_: _ => _.length,
    get c_() {
        _.f_()
    },
    set L_(t) {
        _.R([t, (_, t) => _ ** t])
    },
    w_: t => _.C([_.y_, t])
};