/* JOVM */
const _ = {
    _: e => _.t(_.O(_.o)),
    g: e => (_.l(e.shift()), _.t(_.C(e.shift()))),
    set u(e) {
        _.j(_.G(2))
    },
    L: this,
    U: e => _.k(_.m[0]),
    set F(e) {
        _.M([e, (_, e) => _ | e])
    },
    i: _ => structuredClone(_),
    p: e => _.T[_.K(_.P())] = _.P(),
    Y: e => _.Z(e),
    v: e => ["string"].includes(typeof e[0]) ? _.A(e) : _.R(e),
    set J(e) {
        _.M([e, (_, e) => _ > e])
    },
    h: e => _.D([_.q, e]),
    set H(e) {
        _.M([e, (_, e) => _ * e])
    },
    P: e => _.O(_.X),
    I: e => [_.O(e), e],
    G: e => ($ = _.X.slice(0, e), _.X = _.X.slice(e, _.X.length), $),
    j: e => {
        let t = _.L;
        for (let _ = 0; _ < e[1].length - 1; _++) t = t[e[1][_]];
        t[e[1][e[1].length - 1]] = e[0]
    },
    N: e => _.O(_.m),
    V: {
        W: 11,
        B: 12,
        S: 13,
        $: 14,
        __: 15,
        e_: 16,
        t_: 17,
        O_: 18,
        s_: 19,
        o_: 20,
        n_: 21
    },
    set a_(e) {
        _._(e)
    },
    get s_() {
        return _.P()
    },
    set g_(e) {
        _.P() || _.l_(e[0])
    },
    M: e => _.Y(_.G(2).reverse(_.O(e)).reduce(_.O(e))),
    set r_(e) {
        _.M([e, (_, e) => _ + e])
    },
    get b_() {
        return _.c_([_.z_.keys, _, [_.C_]])
    },
    set f_(e) {
        _.u_
    },
    set n_(e) {
        _.M([e, (_, e) => e > _])
    },
    set j_(e) {
        _.Y(_.O(e))
    },
    set x_(e) {
        _.G_(_.O(e))
    },
    set L_(e) {
        _.M([e, (_, e) => _ >= e])
    },
    Q_: e => _.O(e).reduce(((e = _.O(t), t) => e[t]), _.O(e)),
    U_: e => _.Z(_.X[0]),
    set k_(e) {
        _.M([e, (_, e) => _ && e])
    },
    u_: e => _.h(e),
    get m_() {
        _.U_()
    },
    set y_(e) {
        _.F_(_.O(e))
    },
    M_: e => {
        for (_.i(e); _.d_ < _.i_.length;) _.p_(_.T_());
        for (_.d_ = 0; _.d_ < _.i_.length;) _.E_(_.T_())
    },
    c_: e => _.O(e).apply(_.O(e), _.O(e)),
    D: e => _.O(e).unshift(_.O(e)),
    l_: e => _.t(_.C(e)),
    set K_(e) {
        _.M([e, (_, e) => _ / e])
    },
    K: _ => btoa(btoa(btoa(_))).split("").map((_ => _.charCodeAt())).reduce(((_, e) => (e ^ _ / e | e & e | _ << (_.length | _ << e | 1e-5) << (_.length | 41 * _.length) << _ * _) + "" + _)).slice(6, 26),
    O: _ => _.shift(),
    set P_(e) {
        _.M([e, (_, e) => _ ** e])
    },
    R: e => _.c_([e.shift(), e, _.G(e.shift()).reverse()]),
    Y_: e => _.M_(_.i_ = e),
    set Z_(e) {
        _.M([e, (_, e) => _ != e])
    },
    G_: e => _.v([_.N(), e]),
    d_: 0,
    set t_(e) {
        _.p(_.O(e))
    },
    m: [],
    X: [],
    i_: [],
    v_: {
        A_: 0,
        f_: 1,
        R_: 2,
        w_: 3,
        J_: 4,
        h_: 5,
        D_: 6,
        q_: 7,
        H_: 8,
        X_: 9,
        L_: 10
    },
    l: e => _.D([_.o, e]),
    set A_(e) {
        _.U(), "string" == typeof _.N() ? _.G_(_.O(e)) : _.Y(_.G_(_.O(e)))
    },
    set I_(e) {
        _.M([e, (_, e) => _ & e])
    },
    N_: e => _.k(_.Q_([e, _.L, _.L]) ?? _.Q_([e.map((e => _.K(e))), _.T, _.T])),
    t: e => _.d_ = e,
    o: [],
    Z: e => _.D([_.X, e]),
    V_: {
        W_: 44,
        Z_: 45,
        r_: 46,
        B_: 47,
        S_: 48,
        P_: 49,
        _e: 50,
        ee: 51,
        te: 52,
        k_: 53,
        I_: 54,
        j_: 55
    },
    set O_(e) {
        _.M([e, _ => !_])
    },
    set D_(e) {
        _.M([e, (_, e) => _ - e])
    },
    Oe: {
        u: 22,
        se: 23,
        oe: 24,
        K_: 25,
        J: 26,
        ne: 27,
        ae: 28,
        ge: 29,
        le: 30,
        g_: 31,
        x_: 32
    },
    A: e => _.g([_.d_, e.shift()]),
    re: {
        be: 33,
        ce: 34,
        ze: 35,
        Ce: 36,
        fe: 37,
        F: 38,
        H: 39,
        y_: 40,
        m_: 41,
        ue: 42,
        a_: 43
    },
    set S(e) {
        _.M([e, (_, e) => e >= _])
    },
    set S_(e) {
        _.l_(_.O(e))
    },
    set se(e) {
        _.M([e, (_, e) => _ || e])
    },
    T: [],
    F_: e => _.Y(_.T[_.K(e)] ?? _.Q_([e, _.L, _.L])),
    set o_(e) {
        _.M([e, (_, e) => _ ^ e])
    },
    set ge(e) {
        _.M([e, (_, e) => _ == e])
    },
    set te(e) {
        _.M([e, _ => ~_])
    },
    get C_() {
        return {
            ..._.v_,
            ..._.V,
            ..._.Oe,
            ..._.re,
            ..._.V_
        }
    },
    set _e(e) {
        _.M([e, (_, e) => _ % e])
    },
    q: [],
    p_: e => _.O(e) == _.C_.f_ ? _.u_([_.O(e), _.d_]) : e,
    T_: e => _.c_([_.i, e, [_.i_[_.d_++]]]),
    je: (e, t) => _[_.b_[e]] = t,
    z_: Object,
    set ne(e) {
        _.N_(_.G(_.O(e)))
    },
    k: e => _.D([_.m, e]),
    E_: e => _.c_([_.je, e, _.I(e)]),
    C: e => _.q[_.q.map((_ => _[0])).indexOf(e)][1]
};