/* JOVM */
const _ = {
    _: e => _.t(e),
    O: 0,
    o: e => {
        let s = _.g;
        for (let t = 0; t < _.l(e[1]) - 1; t++) s = s[e[1][t]];
        s[e[1][_.l(e[1]) - 1]] = e[0]
    },
    set u(e) {
        _.A([e, (_, e) => _ >= e])
    },
    D: _ => _.map((_ => _.charCodeAt())),
    I: e => e.reduce(((e, s) => (s ^ e / s | s & s | e << (_.l(e) | e << s | 1e-5) << (_.l(e) | 41 * _.l(e)) << e * e) + _.M + e)),
    V: e => _.I(_.D(_.U(e).split(_.M))),
    set j(e) {
        _.A([e, (_, e) => _ != e])
    },
    get p() {
        _.C()
    },
    g: this,
    N: e => _.R(_.Y),
    get h() {
        return {
            ..._.i,
            ..._.k,
            ..._.G,
            ..._.J,
            ..._.H
        }
    },
    set T(e) {
        _.A([e, (_, e) => e >= _])
    },
    set X(e) {
        _._(_.R(e))
    },
    set v(e) {
        _.F(_.R(e))
    },
    set K(e) {
        _.A([e, (_, e) => _ > e])
    },
    set P(e) {
        _.A([e, (_, e) => _ | e])
    },
    W: e => _.m[_.V(_.N())] = _.N(),
    B: e => _.L(_.S[0]),
    Z: e => _.R(e).map(_.R(e)),
    $: e => _._(_.m[_.V(e)] ?? _.q([e, _.g, _.g])),
    G: {
        __: 22,
        e_: 23,
        s_: 24,
        t_: 25,
        O_: 26,
        o_: 27,
        n_: 28,
        r_: 29,
        g_: 30,
        T: 31,
        l_: 32
    },
    c_: e => _.E_[_.E_.map((_ => _[0])).indexOf(e)][1],
    a_: e => _.O = e,
    Y: [],
    u_: e => _.A_([_.D_, e, _.I_(e)]),
    set w_(e) {
        _.A([e, (_, e) => _ ** e])
    },
    set M_(e) {
        _.A([e, (_, e) => _ & e])
    },
    set O_(e) {
        _.A([e, _ => !_])
    },
    I_: e => [_.R(e), e],
    set V_(e) {
        _.o(_.z_(2))
    },
    set U_(e) {
        _.A([e, (_, e) => _ * e])
    },
    U: e => _.b_(_.b_(_.b_(e))),
    j_: e => _.p_([_.y_, e]),
    set n_(e) {
        _.A([e, (_, e) => _ && e])
    },
    C_: e => _.R(e) == _.h.N_ ? _.R_([_.R(e), _.O]) : e,
    Y_: e => _.A_([_.f_, e, [_.h_[_.O++]]]),
    D_: (e, s) => _[_.i_[e]] = s,
    A: e => _._(_.k_(_.z_(2), _.R(e)).reduce(_.R(e))),
    set G_(e) {
        _.A([e, (_, e) => _ + e])
    },
    H: {
        J_: 44,
        d_: 45,
        H_: 46,
        X: 47,
        T_: 48,
        X_: 49,
        p: 50,
        v_: 51,
        x_: 52,
        F_: 53,
        V_: 54,
        G_: 55
    },
    K_: e => _.P_([_.O, _.R(e)]),
    set d_(e) {
        _.A([e, _ => ~_])
    },
    Q_: e => _.A_([_.R(e), e, _.k_(_.z_(_.R(e)))]),
    set W_(e) {
        _.m_(_.R(e))
    },
    k: {
        M_: 11,
        B_: 12,
        L_: 13,
        u: 14,
        W_: 15,
        S_: 16,
        Z_: 17,
        q_: 18,
        U_: 19,
        _e: 20,
        ee: 21
    },
    set q_(e) {
        _.B(), _.se(_.M) == _.se(_.te()) ? _.F(_.R(e)) : _._(_.F(_.R(e)))
    },
    A_: e => _.R(e).apply(_.R(e), _.R(e)),
    set Oe(e) {
        _.oe(e)
    },
    q: e => _.R(e).reduce(((e = _.R(s), s) => e[s]), _.R(e)),
    C: e => _.t(_.Y[0]),
    ne: e => _.R(e) == _.R(e),
    se: _ => typeof _,
    S: [],
    set re(e) {
        _.A([e, (_, e) => _ - e])
    },
    t: e => _.p_([_.Y, e]),
    l: _ => _.length,
    E_: [],
    J: {
        ge: 33,
        K: 34,
        le: 35,
        N_: 36,
        ce: 37,
        Ee: 38,
        w_: 39,
        ae: 40,
        P: 41,
        ue: 42,
        Ae: 43
    },
    i: {
        re: 0,
        De: 1,
        Oe: 2,
        Ie: 3,
        we: 4,
        v: 5,
        Me: 6,
        Ve: 7,
        ze: 8,
        j: 9,
        Ue: 10
    },
    oe: e => _.a_(_.R(_.y_)),
    P_: e => (_.j_(_.R(e)), _.a_(_.c_(_.R(e)))),
    be: _ => btoa(_),
    F: e => _.je([_.te(), e]),
    M: this.name,
    set r_(e) {
        _.A([e, (_, e) => e > _])
    },
    L: e => _.p_([_.S, e]),
    m: [],
    set S_(e) {
        _.W(_.R(e))
    },
    R_: e => _.pe(e),
    h_: [],
    ye: e => {
        for (_.f_(e); _.O < _.l(_.h_);) _.C_(_.Y_());
        for (_.O = 0; _.O < _.l(_.h_);) _.u_(_.Y_())
    },
    k_: _ => _.reverse(),
    set ze(e) {
        _.A([e, (_, e) => _ == e])
    },
    p_: e => _.R(e).unshift(_.R(e)),
    Ce: e => _.ye(_.h_ = e),
    set N_(e) {
        _.R_
    },
    set le(e) {
        _.A([e, (_, e) => _ / e])
    },
    z_: e => ($ = _.Y.slice(0, e), _.Y = _.Y.slice(e, _.l(_.Y)), $),
    b_: e => _.A_([_.be, _, [e]]),
    set e_(e) {
        _.A([e, (_, e) => _ ^ e])
    },
    m_: e => _.a_(_.c_(e)),
    Ne: e => _.L(_.q([e, _.g, _.g]) ?? _.q([e.map((e => _.V(e))), _.m, _.m])),
    je: e => _.ne([_.se(_.M), _.se(e[0])]) ? _.K_(e) : _.Q_(e),
    set v_(e) {
        _.Ne(_.z_(_.R(e)))
    },
    te: e => _.R(_.S),
    y_: [],
    f_: _ => structuredClone(_),
    R: _ => _.shift(),
    pe: e => _.p_([_.E_, e]),
    get ae() {
        return _.N()
    },
    set g_(e) {
        _.N() || _.m_(e[0])
    },
    set __(e) {
        _.$(_.R(e))
    },
    get i_() {
        return _.A_([_.Re.keys, _, [_.h]])
    },
    set ge(e) {
        _.A([e, (_, e) => _ || e])
    },
    Re: Object,
    set B_(e) {
        _.A([e, (_, e) => _ % e])
    }
};