/* JOVM */
const _ = {
    get _() {
        return _.t()
    },
    set o(e) {
        _.g([e, (_, e) => e >= _])
    },
    M: _ => structuredClone(_),
    get l() {
        return _.U([_.J.keys, _, [_.N]])
    },
    get O() {
        _.u()
    },
    set v(e) {
        _.I(e[0])
    },
    K: e => _.T[_.T.map((_ => _[0])).indexOf(e)][1],
    set Y(e) {
        _.g([e, (_, e) => e > _])
    },
    set Z(e) {
        _.g([e, (_, e) => _ >= e])
    },
    j: e => _.S(e) == _.N.C ? _.D([_.S(e), _.G]) : e,
    p: e => _.U([_.M, e, [_.q[_.G++]]]),
    L: (e, t) => _[_.l[e]] = t,
    g: e => _.P(_.h(2).reverse(_.S(e)).reduce(_.S(e))),
    set i(e) {
        _.g([e, (_, e) => _ + e])
    },
    A: e => [_.S(e), e],
    F: e => _.G = _.K(e),
    set R(e) {
        _.g([e, (_, e) => _ || e])
    },
    m: e => _.B[_.H(_.t())] = _.t(),
    set V(e) {
        _.F(e[0])
    },
    P: e => _.X(e),
    W: e => {
        for (; _.G < _.q.length;) _.j(_.p());
        for (_.G = 0; _.G < _.q.length;) _.$(_.p())
    },
    set k(e) {
        _.g([e, (_, e) => _ ^ e])
    },
    set __(e) {
        _.g([e, (_, e) => _ - e])
    },
    set e_(e) {
        _.t() || _.F(e[0])
    },
    t_: e => _.s_([_.o_, e]),
    t: e => _.S(_.n_),
    set C(e) {
        _.D
    },
    S: _ => _.shift(),
    set g_(e) {
        _.g([e, (_, e) => _ | e])
    },
    J: Object,
    set r_(e) {
        _.m(e[0])
    },
    G: 0,
    set a_(e) {
        _.M_(e[0])
    },
    c_: this,
    U: e => _.S(e).apply(_.S(e), _.S(e)),
    D: e => _.undefined(e),
    l_: e => _.W(_.q = e),
    B: [],
    q: [],
    set d_(e) {
        _.g([e, (_, e) => _ == e])
    },
    set x_(e) {
        _.g([e, (_, e) => _ > e])
    },
    w_: e => _.t_(e.reduce(((e = _.c_, t) => e[t]), _.c_)),
    I: e => _.U([_.U_(), e, _.h(e)]),
    set f_(e) {
        _.g([e, (_, e) => _ * e])
    },
    T: [],
    $: e => _.U([_.L, e, _.A(e)]),
    M_: e => _.P(_.B[_.H(e)] ?? _.c_[e]),
    undefined: e => _.s_([_.T, e]),
    U_: e => _.S(_.o_),
    set J_(e) {
        _.w_(e[0])
    },
    set N_(e) {
        _.g([e, (_, e) => _ ** e])
    },
    N: {
        Z: 0,
        O_: 1,
        i: 2,
        v: 3,
        __: 4,
        V: 5,
        J_: 6,
        Y: 7,
        a_: 8,
        r_: 9,
        _: 10,
        R: 11,
        d_: 12,
        k: 13,
        u_: 14,
        f_: 15,
        N_: 16,
        x_: 17,
        v_: 18,
        e_: 19,
        C: 20,
        y_: 21,
        O: 22,
        o: 23,
        E_: 24,
        I_: 25,
        g_: 26,
        K_: 27
    },
    s_: e => _.S(e).unshift(_.S(e)),
    u: e => _.X(_.n_[0]),
    set I_(e) {
        _.g([e, (_, e) => _ & e])
    },
    o_: [],
    X: e => _.s_([_.n_, e]),
    set y_(e) {
        _.P(e[0])
    },
    h: e => ($ = _.n_.slice(0, e), _.n_ = _.n_.slice(e, _.n_.length), $),
    H: _ => btoa(btoa(btoa(_))).split("").map((_ => _.charCodeAt())).reduce(((_, e) => (e ^ _ / e | e & e | _ << (_.length | _ << e | 1e-5) << (_.length | 41 * _.length) << _ * _) + "" + _)).split("").slice(6, 26).join(""),
    n_: [],
    set u_(e) {
        _.g([e, (_, e) => _ && e])
    },
    set E_(e) {
        _.g([e, (_, e) => _ / e])
    },
    set v_(e) {
        _.g([e, (_, e) => _ != e])
    }
};