/* JOVM */
const _ = {
    _R7z: 0,
    _dkb: 1,
    _z9y: 2,
    _IaV: 3,
    _vyw: 4,
    _goi: 5,
    _ehb: 6,
    _Oys: 7,
    _f4p: 8,
    _DZB: 9
}, e = {
    set _goi(_) {
        e._(_[0]);
    },
    e: _ => e.o.shift(),
    set _R7z(_) {
        e.l(_[0]);
    },
    l: _ => e.t(_),
    _: _ => e.s(_.reduce(((_ = this, e) => _[e]), this)),
    set _DZB(_) {
        e.y(_[0][0]);
    },
    y: _ => e.g().apply(_, e.b(_)),
    t: _ => e.o.unshift(_),
    c: [],
    s: _ => e.c.unshift(_),
    o: [],
    b: _ => ($ = e.o.slice(0, _), e.o = e.o.slice(_, e.o.length), $),
    h: _ => e.t(e.o[0]),
    g: _ => e.c.shift(),
    get _z9y() {
        e.h();
    },
    z: (o, l) => e[Object.keys(_)[o]] = l,
    EXECUTE: _ => {
        for (let o of _) e.z(o.shift(), o);
    },
    get _IaV() {
        e.e();
    }
};

e.EXECUTE([ [ _._goi, [ "console", "log" ] ], [ _._R7z, "Hello world" ], [ _._DZB, 1 ], [ _._goi, [ "console", "log" ] ], [ _._R7z, "Bye bye world" ], [ _._DZB, 1 ] ]);