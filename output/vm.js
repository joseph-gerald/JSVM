/* JOVM */
const _ = {
    _: {
        t: 0,
        o: 1,
        l: 2,
        W: 3,
        g: 4,
        i: 5,
        p: 6,
        T: 7,
        X: 8,
        C: 9,
        D: 10,
        F: 11,
        K: 12,
        h: 13,
        I: 14,
        N: 15,
        m: 16,
        u: 17,
        J: 18,
        M: 19,
        O: 20,
        P: 21,
        U: 22,
        v: 23,
        A: 24,
        R: 25,
        S: 26,
        V: 27
    },
    set V(e) {
        _.Y(_.j(2).reverse(e).reduce(((_, e) => _ > e)))
    },
    set g(e) {
        _.Y(_.j(2).reverse(e).reduce(((_, e) => _ ** e)))
    },
    k: _ => _.shift(),
    set N(e) {
        _.Y(_.j(2).reverse(e).reduce(((_, e) => _ | e)))
    },
    set O(e) {
        _.Y(_.j(2).reverse(e).reduce(((_, e) => _ / e)))
    },
    set R(e) {
        _.q(e[0])
    },
    H: e => _.$[_.B(_.G())] = _.G(),
    L: [],
    $: [],
    Z: e => {
        e.map(_.__)
    },
    set i(e) {
        _.Y(_.j(2).reverse(e).reduce(((_, e) => _ >= e)))
    },
    e_: e => _.k(_.L),
    set v(e) {
        _.s_(e[0])
    },
    set I(e) {
        _.Y(_.j(2).reverse(e).reduce(((_, e) => e > _)))
    },
    set S(e) {
        _.Y(_.j(2).reverse(e).reduce(((_, e) => _ * e)))
    },
    Y: e => _.t_(e),
    o_: e => _.k(e).apply(_.k(e), _.k(e)),
    set D(e) {
        _.Y(_.j(2).reverse(e).reduce(((_, e) => _ == e)))
    },
    set U(e) {
        _.n_(e[0])
    },
    s_: e => _.o_([_.e_(), e, _.j(e)]),
    get K() {
        _.l_()
    },
    a_: e => [_.k(e), e],
    d_: e => _.Z(e),
    __: e => _.o_([_.x_, e, _.a_(e)]),
    n_: e => _.Y(_.$[_.B(e)] ?? this[e]),
    W_: [],
    g_: e => _.L.unshift(e),
    t_: e => _.W_.unshift(e),
    set W(e) {
        _.Y(_.j(2).reverse(e).reduce(((_, e) => _ != e)))
    },
    x_: (e, s) => _[Object.keys(_._)[e]] = s,
    G: e => _.k(_.W_),
    q: e => _.g_(e.reduce(((_ = this, e) => _[e]), this)),
    set u(e) {
        _.Y(_.j(2).reverse(e).reduce(((_, e) => _ && e)))
    },
    set m(e) {
        _.Y(_.j(2).reverse(e).reduce(((_, e) => _ ^ e)))
    },
    j: e => ($ = _.W_.slice(0, e), _.W_ = _.W_.slice(e, _.W_.length), $),
    set F(e) {
        _.Y(e[0])
    },
    set p(e) {
        _.Y(_.j(2).reverse(e).reduce(((_, e) => _ || e)))
    },
    set l(e) {
        _.Y(_.j(2).reverse(e).reduce(((_, e) => e >= _)))
    },
    set J(e) {
        _.Y(_.j(2).reverse(e).reduce(((_, e) => _ & e)))
    },
    set X(e) {
        _.H(e[0])
    },
    get A() {
        return _.G()
    },
    B: _ => btoa(btoa(btoa(_))).split("").map((_ => _.charCodeAt())).reduce(((_, e) => (e ^ _ / e | e & e | _ << (_.length | _ << e | 1e-5) << (_.length | 41 * _.length) << _ * _) + "" + _)).split("").slice(6, 26).join(""),
    l_: e => _.t_(_.W_[0]),
    set C(e) {
        _.Y(_.j(2).reverse(e).reduce(((_, e) => _ - e)))
    },
    set t(e) {
        _.Y(_.j(2).reverse(e).reduce(((_, e) => _ + e)))
    }
};