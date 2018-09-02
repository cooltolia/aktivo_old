(function (M, R) {
    "object" === typeof module && module.exports ? module.exports = M.document ? R(M) : R : M.Highcharts = R(M)
})("undefined" !== typeof window ? window : this, function (M) {
    M = function () {
        var a = window,
            C = a.document,
            z = a.navigator && a.navigator.userAgent || "",
            F = C && C.createElementNS && !!C.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            D = /(edge|msie|trident)/i.test(z) && !window.opera,
            n = !F,
            g = /Firefox/.test(z),
            k = g && 4 > parseInt(z.split("Firefox/")[1], 10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
            product: "Highcharts",
            version: "5.0.14",
            deg2rad: 2 * Math.PI / 360,
            doc: C,
            hasBidiBug: k,
            hasTouch: C && void 0 !== C.documentElement.ontouchstart,
            isMS: D,
            isWebKit: /AppleWebKit/.test(z),
            isFirefox: g,
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(z),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: F,
            vml: n,
            win: a,
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function () {},
            charts: []
        }
    }();
    (function (a) {
        var C = [],
            z = a.charts,
            F = a.doc,
            D = a.win;
        a.error = function (n, g) {
            n = a.isNumber(n) ? "Highcharts error #" + n + ": www.highcharts.com/errors/" + n : n;
            if (g) throw Error(n);
            D.console && console.log(n)
        };
        a.Fx = function (a, g, k) {
            this.options = g;
            this.elem = a;
            this.prop = k
        };
        a.Fx.prototype = {
            dSetter: function () {
                var a = this.paths[0],
                    g = this.paths[1],
                    k = [],
                    l = this.now,
                    q = a.length,
                    t;
                if (1 === l) k = this.toD;
                else if (q === g.length && 1 > l)
                    for (; q--;) t = parseFloat(a[q]), k[q] = isNaN(t) ? a[q] : l * parseFloat(g[q] - t) + t;
                else k = g;
                this.elem.attr("d", k, null, !0)
            },
            update: function () {
                var a = this.elem,
                    g = this.prop,
                    k = this.now,
                    l = this.options.step;
                if (this[g + "Setter"]) this[g + "Setter"]();
                else a.attr ? a.element && a.attr(g, k, null, !0) : a.style[g] = k + this.unit;
                l && l.call(a, k, this)
            },
            run: function (a, g, k) {
                var l = this,
                    q = function (a) {
                        return q.stopped ? !1 : l.step(a)
                    },
                    t;
                this.startTime = +new Date;
                this.start = a;
                this.end = g;
                this.unit = k;
                this.now = this.start;
                this.pos = 0;
                q.elem = this.elem;
                q.prop = this.prop;
                q() && 1 === C.push(q) && (q.timerId = setInterval(function () {
                    for (t = 0; t < C.length; t++) C[t]() || C.splice(t--, 1);
                    C.length || clearInterval(q.timerId)
                }, 13))
            },
            step: function (n) {
                var g = +new Date,
                    k, l = this.options,
                    q = this.elem,
                    t = l.complete,
                    h = l.duration,
                    b = l.curAnim;
                q.attr && !q.element ? n = !1 : n || g >= h + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), k = b[this.prop] = !0, a.objectEach(b, function (a) {
                    !0 !== a && (k = !1)
                }), k && t && t.call(q), n = !1) : (this.pos = l.easing((g - this.startTime) / h), this.now = this.start + (this.end - this.start) * this.pos, this.update(), n = !0);
                return n
            },
            initPath: function (n, g, k) {
                function l(a) {
                    var e, c;
                    for (m = a.length; m--;) e = "M" === a[m] || "L" === a[m], c = /[a-zA-Z]/.test(a[m + 3]), e && c && a.splice(m + 1, 0, a[m + 1], a[m + 2], a[m + 1], a[m + 2])
                }

                function q(a, e) {
                    for (; a.length < v;) {
                        a[0] = e[v - a.length];
                        var d = a.slice(0, c);
                        [].splice.apply(a, [0, 0].concat(d));
                        A && (d = a.slice(a.length - c), [].splice.apply(a, [a.length, 0].concat(d)), m--)
                    }
                    a[0] = "M"
                }

                function t(a, e) {
                    for (var b = (v - a.length) / c; 0 < b && b--;) y = a.slice().splice(a.length / H - c, c * H), y[0] = e[v - c - b * c], d && (y[c - 6] = y[c - 2], y[c - 5] = y[c - 1]), [].splice.apply(a, [a.length / H, 0].concat(y)), A && b--
                }
                g = g || "";
                var h, b = n.startX,
                    f = n.endX,
                    d = -1 < g.indexOf("C"),
                    c = d ? 7 : 3,
                    v, y, m;
                g = g.split(" ");
                k = k.slice();
                var A = n.isArea,
                    H = A ? 2 : 1,
                    e;
                d && (l(g), l(k));
                if (b && f) {
                    for (m = 0; m < b.length; m++)
                        if (b[m] === f[0]) {
                            h = m;
                            break
                        } else if (b[0] === f[f.length - b.length + m]) {
                        h = m;
                        e = !0;
                        break
                    }
                    void 0 === h && (g = [])
                }
                g.length && a.isNumber(h) && (v = k.length + h * H * c, e ? (q(g, k), t(k, g)) : (q(k, g), t(g, k)));
                return [g, k]
            }
        };
        a.Fx.prototype.fillSetter = a.Fx.prototype.strokeSetter = function () {
            this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0)
        };
        a.extend = function (a, g) {
            var k;
            a || (a = {});
            for (k in g) a[k] = g[k];
            return a
        };
        a.merge = function () {
            var n, g = arguments,
                k, l = {},
                q = function (g, h) {
                    "object" !== typeof g && (g = {});
                    a.objectEach(h, function (b, f) {
                        !a.isObject(b, !0) || a.isClass(b) || a.isDOMElement(b) ? g[f] = h[f] : g[f] = q(g[f] || {}, b)
                    });
                    return g
                };
            !0 === g[0] && (l = g[1], g = Array.prototype.slice.call(g, 2));
            k = g.length;
            for (n = 0; n < k; n++) l = q(l, g[n]);
            return l
        };
        a.pInt = function (a, g) {
            return parseInt(a, g || 10)
        };
        a.isString = function (a) {
            return "string" === typeof a
        };
        a.isArray = function (a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function (n, g) {
            return !!n && "object" === typeof n && (!g || !a.isArray(n))
        };
        a.isDOMElement = function (n) {
            return a.isObject(n) && "number" === typeof n.nodeType
        };
        a.isClass = function (n) {
            var g = n && n.constructor;
            return !(!a.isObject(n, !0) || a.isDOMElement(n) || !g || !g.name || "Object" === g.name)
        };
        a.isNumber = function (a) {
            return "number" === typeof a && !isNaN(a)
        };
        a.erase = function (a, g) {
            for (var k = a.length; k--;)
                if (a[k] === g) {
                    a.splice(k, 1);
                    break
                }
        };
        a.defined = function (a) {
            return void 0 !== a && null !== a
        };
        a.attr = function (n, g, k) {
            var l;
            a.isString(g) ? a.defined(k) ? n.setAttribute(g, k) : n && n.getAttribute && (l = n.getAttribute(g)) : a.defined(g) && a.isObject(g) && a.objectEach(g, function (a, g) {
                n.setAttribute(g, a)
            });
            return l
        };
        a.splat = function (n) {
            return a.isArray(n) ? n : [n]
        };
        a.syncTimeout = function (a, g, k) {
            if (g) return setTimeout(a, g, k);
            a.call(0, k)
        };
        a.pick = function () {
            var a = arguments,
                g, k, l = a.length;
            for (g = 0; g < l; g++)
                if (k = a[g], void 0 !== k && null !== k) return k
        };
        a.css = function (n, g) {
            a.isMS && !a.svg && g && void 0 !== g.opacity && (g.filter = "alpha(opacity=" + 100 * g.opacity + ")");
            a.extend(n.style, g)
        };
        a.createElement = function (n, g, k, l, q) {
            n = F.createElement(n);
            var t = a.css;
            g && a.extend(n, g);
            q && t(n, {
                padding: 0,
                border: "none",
                margin: 0
            });
            k && t(n, k);
            l && l.appendChild(n);
            return n
        };
        a.extendClass = function (n, g) {
            var k = function () {};
            k.prototype = new n;
            a.extend(k.prototype, g);
            return k
        };
        a.pad = function (a, g, k) {
            return Array((g || 2) + 1 - String(a).length).join(k || 0) + a
        };
        a.relativeLength = function (a, g, k) {
            return /%$/.test(a) ? g * parseFloat(a) / 100 + (k || 0) : parseFloat(a)
        };
        a.wrap = function (a, g, k) {
            var l = a[g];
            a[g] = function () {
                var a = Array.prototype.slice.call(arguments),
                    g = arguments,
                    h = this;
                h.proceed = function () {
                    l.apply(h, arguments.length ? arguments : g)
                };
                a.unshift(l);
                a = k.apply(this, a);
                h.proceed = null;
                return a
            }
        };
        a.getTZOffset = function (n) {
            var g = a.Date;
            return 6E4 * (g.hcGetTimezoneOffset && g.hcGetTimezoneOffset(n) || g.hcTimezoneOffset || 0)
        };
        a.dateFormat = function (n, g, k) {
            if (!a.defined(g) || isNaN(g)) return a.defaultOptions.lang.invalidDate || "";
            n = a.pick(n, "%Y-%m-%d %H:%M:%S");
            var l = a.Date,
                q = new l(g - a.getTZOffset(g)),
                t = q[l.hcGetHours](),
                h = q[l.hcGetDay](),
                b = q[l.hcGetDate](),
                f = q[l.hcGetMonth](),
                d = q[l.hcGetFullYear](),
                c = a.defaultOptions.lang,
                v = c.weekdays,
                y = c.shortWeekdays,
                m = a.pad,
                l = a.extend({
                    a: y ? y[h] : v[h].substr(0, 3),
                    A: v[h],
                    d: m(b),
                    e: m(b, 2, " "),
                    w: h,
                    b: c.shortMonths[f],
                    B: c.months[f],
                    m: m(f + 1),
                    y: d.toString().substr(2, 2),
                    Y: d,
                    H: m(t),
                    k: t,
                    I: m(t % 12 || 12),
                    l: t % 12 || 12,
                    M: m(q[l.hcGetMinutes]()),
                    p: 12 > t ? "AM" : "PM",
                    P: 12 > t ? "am" : "pm",
                    S: m(q.getSeconds()),
                    L: m(Math.round(g % 1E3), 3)
                }, a.dateFormats);
            a.objectEach(l, function (a, c) {
                for (; - 1 !== n.indexOf("%" + c);) n = n.replace("%" + c, "function" === typeof a ? a(g) : a)
            });
            return k ? n.substr(0, 1).toUpperCase() + n.substr(1) : n
        };
        a.formatSingle = function (n, g) {
            var k = /\.([0-9])/,
                l = a.defaultOptions.lang;
            /f$/.test(n) ? (k = (k = n.match(k)) ? k[1] : -1, null !== g && (g = a.numberFormat(g, k, l.decimalPoint, -1 < n.indexOf(",") ? l.thousandsSep : ""))) : g = a.dateFormat(n, g);
            return g
        };
        a.format = function (n, g) {
            for (var k = "{", l = !1, q, t, h, b, f = [], d; n;) {
                k = n.indexOf(k);
                if (-1 === k) break;
                q = n.slice(0, k);
                if (l) {
                    q = q.split(":");
                    t = q.shift().split(".");
                    b = t.length;
                    d = g;
                    for (h = 0; h < b; h++) d = d[t[h]];
                    q.length && (d = a.formatSingle(q.join(":"), d));
                    f.push(d)
                } else f.push(q);
                n = n.slice(k + 1);
                k = (l = !l) ? "}" : "{"
            }
            f.push(n);
            return f.join("")
        };
        a.getMagnitude = function (a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function (n, g, k, l, q) {
            var t, h = n;
            k = a.pick(k, 1);
            t = n / k;
            g || (g = q ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === l && (1 === k ? g = a.grep(g, function (a) {
                return 0 === a % 1
            }) : .1 >= k && (g = [1 / k])));
            for (l = 0; l < g.length && !(h = g[l], q && h * k >= n || !q && t <= (g[l] + (g[l + 1] || g[l])) / 2); l++);
            return h = a.correctFloat(h * k, -Math.round(Math.log(.001) / Math.LN10))
        };
        a.stableSort = function (a, g) {
            var k = a.length,
                l, q;
            for (q = 0; q < k; q++) a[q].safeI = q;
            a.sort(function (a, h) {
                l = g(a, h);
                return 0 === l ? a.safeI - h.safeI : l
            });
            for (q = 0; q < k; q++) delete a[q].safeI
        };
        a.arrayMin = function (a) {
            for (var g = a.length, k = a[0]; g--;) a[g] < k && (k = a[g]);
            return k
        };
        a.arrayMax = function (a) {
            for (var g = a.length, k = a[0]; g--;) a[g] > k && (k = a[g]);
            return k
        };
        a.destroyObjectProperties = function (n, g) {
            a.objectEach(n, function (a, l) {
                a && a !== g && a.destroy && a.destroy();
                delete n[l]
            })
        };
        a.discardElement = function (n) {
            var g = a.garbageBin;
            g || (g = a.createElement("div"));
            n && g.appendChild(n);
            g.innerHTML = ""
        };
        a.correctFloat = function (a, g) {
            return parseFloat(a.toPrecision(g || 14))
        };
        a.setAnimation = function (n, g) {
            g.renderer.globalAnimation = a.pick(n, g.options.chart.animation, !0)
        };
        a.animObject = function (n) {
            return a.isObject(n) ? a.merge(n) : {
                duration: n ? 500 : 0
            }
        };
        a.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        };
        a.numberFormat = function (n, g, k, l) {
            n = +n || 0;
            g = +g;
            var q = a.defaultOptions.lang,
                t = (n.toString().split(".")[1] || "").split("e")[0].length,
                h, b, f = n.toString().split("e"); - 1 === g ? g = Math.min(t, 20) : a.isNumber(g) || (g = 2);
            b = (Math.abs(f[1] ? f[0] : n) + Math.pow(10, -Math.max(g, t) - 1)).toFixed(g);
            t = String(a.pInt(b));
            h = 3 < t.length ? t.length % 3 : 0;
            k = a.pick(k, q.decimalPoint);
            l = a.pick(l, q.thousandsSep);
            n = (0 > n ? "-" : "") + (h ? t.substr(0, h) + l : "");
            n += t.substr(h).replace(/(\d{3})(?=\d)/g, "$1" + l);
            g && (n += k + b.slice(-g));
            f[1] && (n += "e" + f[1]);
            return n
        };
        Math.easeInOutSine = function (a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        };
        a.getStyle = function (n, g, k) {
            if ("width" === g) return Math.min(n.offsetWidth, n.scrollWidth) - a.getStyle(n, "padding-left") - a.getStyle(n, "padding-right");
            if ("height" === g) return Math.min(n.offsetHeight, n.scrollHeight) - a.getStyle(n, "padding-top") - a.getStyle(n, "padding-bottom");
            if (n = D.getComputedStyle(n, void 0)) n = n.getPropertyValue(g), a.pick(k, !0) && (n = a.pInt(n));
            return n
        };
        a.inArray = function (a, g) {
            return g.indexOf ? g.indexOf(a) : [].indexOf.call(g, a)
        };
        a.grep = function (a, g) {
            return [].filter.call(a, g)
        };
        a.find = function (a, g) {
            return [].find.call(a, g)
        };
        a.map = function (a, g) {
            for (var k = [], l = 0, q = a.length; l < q; l++) k[l] = g.call(a[l], a[l], l, a);
            return k
        };
        a.offset = function (a) {
            var g = F.documentElement;
            a = a.getBoundingClientRect();
            return {
                top: a.top + (D.pageYOffset || g.scrollTop) - (g.clientTop || 0),
                left: a.left + (D.pageXOffset || g.scrollLeft) - (g.clientLeft || 0)
            }
        };
        a.stop = function (a, g) {
            for (var k = C.length; k--;) C[k].elem !== a || g && g !== C[k].prop || (C[k].stopped = !0)
        };
        a.each = function (a, g, k) {
            return Array.prototype.forEach.call(a, g, k)
        };
        a.objectEach = function (a, g, k) {
            for (var l in a) a.hasOwnProperty(l) && g.call(k, a[l], l, a)
        };
        a.addEvent = function (n, g, k) {
            function l(a) {
                a.target = a.srcElement || D;
                k.call(n, a)
            }
            var q = n.hcEvents = n.hcEvents || {};
            n.addEventListener ? n.addEventListener(g, k, !1) : n.attachEvent && (n.hcEventsIE || (n.hcEventsIE = {}), k.hcGetKey || (k.hcGetKey = a.uniqueKey()), n.hcEventsIE[k.hcGetKey] = l, n.attachEvent("on" + g, l));
            q[g] || (q[g] = []);
            q[g].push(k);
            return function () {
                a.removeEvent(n, g, k)
            }
        };
        a.removeEvent = function (n, g, k) {
            function l(a, d) {
                n.removeEventListener ? n.removeEventListener(a, d, !1) : n.attachEvent && (d = n.hcEventsIE[d.hcGetKey], n.detachEvent("on" + a, d))
            }

            function q() {
                var b, d;
                n.nodeName && (g ? (b = {}, b[g] = !0) : b = h, a.objectEach(b, function (a, b) {
                    if (h[b])
                        for (d = h[b].length; d--;) l(b, h[b][d])
                }))
            }
            var t, h = n.hcEvents,
                b;
            h && (g ? (t = h[g] || [], k ? (b = a.inArray(k, t), -1 < b && (t.splice(b, 1), h[g] = t), l(g, k)) : (q(), h[g] = [])) : (q(), n.hcEvents = {}))
        };
        a.fireEvent = function (n, g, k, l) {
            var q;
            q = n.hcEvents;
            var t, h;
            k = k || {};
            if (F.createEvent && (n.dispatchEvent || n.fireEvent)) q = F.createEvent("Events"), q.initEvent(g, !0, !0), a.extend(q, k), n.dispatchEvent ? n.dispatchEvent(q) : n.fireEvent(g, q);
            else if (q)
                for (q = q[g] || [], t = q.length, k.target || a.extend(k, {
                        preventDefault: function () {
                            k.defaultPrevented = !0
                        },
                        target: n,
                        type: g
                    }), g = 0; g < t; g++)(h = q[g]) && !1 === h.call(n, k) && k.preventDefault();
            l && !k.defaultPrevented && l(k)
        };
        a.animate = function (n, g, k) {
            var l, q = "",
                t, h, b;
            a.isObject(k) || (b = arguments, k = {
                duration: b[2],
                easing: b[3],
                complete: b[4]
            });
            a.isNumber(k.duration) || (k.duration = 400);
            k.easing = "function" === typeof k.easing ? k.easing : Math[k.easing] || Math.easeInOutSine;
            k.curAnim = a.merge(g);
            a.objectEach(g, function (b, d) {
                a.stop(n, d);
                h = new a.Fx(n, k, d);
                t = null;
                "d" === d ? (h.paths = h.initPath(n, n.d, g.d), h.toD = g.d, l = 0, t = 1) : n.attr ? l = n.attr(d) : (l = parseFloat(a.getStyle(n, d)) || 0, "opacity" !== d && (q = "px"));
                t || (t = b);
                t && t.match && t.match("px") && (t = t.replace(/px/g, ""));
                h.run(l, t, q)
            })
        };
        a.seriesType = function (n, g, k, l, q) {
            var t = a.getOptions(),
                h = a.seriesTypes;
            t.plotOptions[n] = a.merge(t.plotOptions[g], k);
            h[n] = a.extendClass(h[g] || function () {}, l);
            h[n].prototype.type = n;
            q && (h[n].prototype.pointClass = a.extendClass(a.Point, q));
            return h[n]
        };
        a.uniqueKey = function () {
            var a = Math.random().toString(36).substring(2, 9),
                g = 0;
            return function () {
                return "highcharts-" + a + "-" + g++
            }
        }();
        D.jQuery && (D.jQuery.fn.highcharts = function () {
            var n = [].slice.call(arguments);
            if (this[0]) return n[0] ? (new(a[a.isString(n[0]) ? n.shift() : "Chart"])(this[0], n[0], n[1]), this) : z[a.attr(this[0], "data-highcharts-chart")]
        });
        F && !F.defaultView && (a.getStyle = function (n, g) {
            var k = {
                width: "clientWidth",
                height: "clientHeight"
            } [g];
            if (n.style[g]) return a.pInt(n.style[g]);
            "opacity" === g && (g = "filter");
            if (k) return n.style.zoom = 1, Math.max(n[k] - 2 * a.getStyle(n, "padding"), 0);
            n = n.currentStyle[g.replace(/\-(\w)/g, function (a, g) {
                return g.toUpperCase()
            })];
            "filter" === g && (n = n.replace(/alpha\(opacity=([0-9]+)\)/, function (a, g) {
                return g / 100
            }));
            return "" === n ? 1 : a.pInt(n)
        });
        Array.prototype.forEach || (a.each = function (a, g, k) {
            for (var l = 0, q = a.length; l < q; l++)
                if (!1 === g.call(k, a[l], l, a)) return l
        });
        Array.prototype.indexOf || (a.inArray = function (a, g) {
            var k, l = 0;
            if (g)
                for (k = g.length; l < k; l++)
                    if (g[l] === a) return l;
            return -1
        });
        Array.prototype.filter || (a.grep = function (a, g) {
            for (var k = [], l = 0, q = a.length; l < q; l++) g(a[l], l) && k.push(a[l]);
            return k
        });
        Array.prototype.find || (a.find = function (a, g) {
            var k, l = a.length;
            for (k = 0; k < l; k++)
                if (g(a[k], k)) return a[k]
        })
    })(M);
    (function (a) {
        var C = a.each,
            z = a.isNumber,
            F = a.map,
            D = a.merge,
            n = a.pInt;
        a.Color = function (g) {
            if (!(this instanceof a.Color)) return new a.Color(g);
            this.init(g)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function (a) {
                    return [n(a[1]), n(a[2]), n(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function (a) {
                    return [n(a[1]), n(a[2]), n(a[3]), 1]
                }
            }],
            names: {
                none: "rgba(255,255,255,0)",
                white: "#ffffff",
                black: "#000000"
            },
            init: function (g) {
                var k, l, q, t;
                if ((this.input = g = this.names[g && g.toLowerCase ? g.toLowerCase() : ""] || g) && g.stops) this.stops = F(g.stops, function (h) {
                    return new a.Color(h[1])
                });
                else if (g && "#" === g.charAt() && (k = g.length, g = parseInt(g.substr(1), 16), 7 === k ? l = [(g & 16711680) >> 16, (g & 65280) >> 8, g & 255, 1] : 4 === k && (l = [(g & 3840) >> 4 | (g & 3840) >> 8, (g & 240) >> 4 | g & 240, (g & 15) << 4 | g & 15, 1])), !l)
                    for (q = this.parsers.length; q-- && !l;) t = this.parsers[q], (k = t.regex.exec(g)) && (l = t.parse(k));
                this.rgba = l || []
            },
            get: function (a) {
                var k = this.input,
                    l = this.rgba,
                    q;
                this.stops ? (q = D(k), q.stops = [].concat(q.stops), C(this.stops, function (l, h) {
                    q.stops[h] = [q.stops[h][0], l.get(a)]
                })) : q = l && z(l[0]) ? "rgb" === a || !a && 1 === l[3] ? "rgb(" + l[0] + "," + l[1] + "," + l[2] + ")" : "a" === a ? l[3] : "rgba(" + l.join(",") + ")" : k;
                return q
            },
            brighten: function (a) {
                var k, l = this.rgba;
                if (this.stops) C(this.stops, function (l) {
                    l.brighten(a)
                });
                else if (z(a) && 0 !== a)
                    for (k = 0; 3 > k; k++) l[k] += n(255 * a), 0 > l[k] && (l[k] = 0), 255 < l[k] && (l[k] = 255);
                return this
            },
            setOpacity: function (a) {
                this.rgba[3] = a;
                return this
            },
            tweenTo: function (a, k) {
                var l, q;
                a.rgba.length ? (l = this.rgba, a = a.rgba, q = 1 !== a[3] || 1 !== l[3], a = (q ? "rgba(" : "rgb(") + Math.round(a[0] + (l[0] - a[0]) * (1 - k)) + "," + Math.round(a[1] + (l[1] - a[1]) * (1 - k)) + "," + Math.round(a[2] + (l[2] - a[2]) * (1 - k)) + (q ? "," + (a[3] + (l[3] - a[3]) * (1 - k)) : "") + ")") : a = a.input || "none";
                return a
            }
        };
        a.color = function (g) {
            return new a.Color(g)
        }
    })(M);
    (function (a) {
        var C, z, F = a.addEvent,
            D = a.animate,
            n = a.attr,
            g = a.charts,
            k = a.color,
            l = a.css,
            q = a.createElement,
            t = a.defined,
            h = a.deg2rad,
            b = a.destroyObjectProperties,
            f = a.doc,
            d = a.each,
            c = a.extend,
            v = a.erase,
            y = a.grep,
            m = a.hasTouch,
            A = a.inArray,
            H = a.isArray,
            e = a.isFirefox,
            E = a.isMS,
            u = a.isObject,
            w = a.isString,
            I = a.isWebKit,
            r = a.merge,
            B = a.noop,
            G = a.objectEach,
            K = a.pick,
            p = a.pInt,
            x = a.removeEvent,
            O = a.stop,
            L = a.svg,
            N = a.SVG_NS,
            P = a.symbolSizes,
            Q = a.win;
        C = a.SVGElement = function () {
            return this
        };
        c(C.prototype, {
            opacity: 1,
            SVG_NS: N,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),
            init: function (a, p) {
                this.element = "span" === p ? q(p) : f.createElementNS(this.SVG_NS, p);
                this.renderer = a
            },
            animate: function (J, p, e) {
                p = a.animObject(K(p, this.renderer.globalAnimation, !0));
                0 !== p.duration ? (e && (p.complete = e), D(this, J, p)) : (this.attr(J, null, e), p.step && p.step.call(this));
                return this
            },
            colorGradient: function (J, p, e) {
                var x = this.renderer,
                    c, u, b, m, h, f, L, E, v, B, y = [],
                    w;
                J.radialGradient ? u = "radialGradient" : J.linearGradient && (u = "linearGradient");
                u && (b = J[u], h = x.gradients, L = J.stops, B = e.radialReference, H(b) && (J[u] = b = {
                    x1: b[0],
                    y1: b[1],
                    x2: b[2],
                    y2: b[3],
                    gradientUnits: "userSpaceOnUse"
                }), "radialGradient" === u && B && !t(b.gradientUnits) && (m = b, b = r(b, x.getRadialAttr(B, m), {
                    gradientUnits: "userSpaceOnUse"
                })), G(b, function (a, J) {
                    "id" !== J && y.push(J, a)
                }), G(L, function (a) {
                    y.push(a)
                }), y = y.join(","), h[y] ? B = h[y].attr("id") : (b.id = B = a.uniqueKey(), h[y] = f = x.createElement(u).attr(b).add(x.defs), f.radAttr = m, f.stops = [], d(L, function (J) {
                    0 === J[1].indexOf("rgba") ? (c = a.color(J[1]), E = c.get("rgb"), v = c.get("a")) : (E = J[1], v = 1);
                    J = x.createElement("stop").attr({
                        offset: J[0],
                        "stop-color": E,
                        "stop-opacity": v
                    }).add(f);
                    f.stops.push(J)
                })), w = "url(" + x.url + "#" + B + ")", e.setAttribute(p, w), e.gradient = y, J.toString = function () {
                    return w
                })
            },
            applyTextOutline: function (J) {
                var p = this.element,
                    e, x, r, c, u; - 1 !== J.indexOf("contrast") && (J = J.replace(/contrast/g, this.renderer.getContrast(p.style.fill)));
                J = J.split(" ");
                x = J[J.length - 1];
                if ((r = J[0]) && "none" !== r && a.svg) {
                    this.fakeTS = !0;
                    J = [].slice.call(p.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    r = r.replace(/(^[\d\.]+)(.*?)$/g, function (a, J, p) {
                        return 2 * J + p
                    });
                    for (u = J.length; u--;) e = J[u], "highcharts-text-outline" === e.getAttribute("class") && v(J, p.removeChild(e));
                    c = p.firstChild;
                    d(J, function (a, J) {
                        0 === J && (a.setAttribute("x", p.getAttribute("x")), J = p.getAttribute("y"), a.setAttribute("y", J || 0), null === J && p.setAttribute("y", 0));
                        a = a.cloneNode(1);
                        n(a, {
                            "class": "highcharts-text-outline",
                            fill: x,
                            stroke: x,
                            "stroke-width": r,
                            "stroke-linejoin": "round"
                        });
                        p.insertBefore(a, c)
                    })
                }
            },
            attr: function (a, p, e, x) {
                var r, c = this.element,
                    d, u = this,
                    b, m;
                "string" === typeof a && void 0 !== p && (r = a, a = {}, a[r] = p);
                "string" === typeof a ? u = (this[a + "Getter"] || this._defaultGetter).call(this, a, c) : (G(a, function (p, e) {
                    b = !1;
                    x || O(this, e);
                    this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(e) && (d || (this.symbolAttr(a), d = !0), b = !0);
                    !this.rotation || "x" !== e && "y" !== e || (this.doTransform = !0);
                    b || (m = this[e + "Setter"] || this._defaultSetter, m.call(this, p, e, c), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(e) && this.updateShadows(e, p, m))
                }, this), this.afterSetters());
                e && e();
                return u
            },
            afterSetters: function () {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            },
            updateShadows: function (a, p, e) {
                for (var x = this.shadows, r = x.length; r--;) e.call(x[r], "height" === a ? Math.max(p - (x[r].cutHeight || 0), 0) : "d" === a ? this.d : p, a, x[r])
            },
            addClass: function (a, p) {
                var e = this.attr("class") || ""; - 1 === e.indexOf(a) && (p || (a = (e + (e ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
                return this
            },
            hasClass: function (a) {
                return -1 !== A(a, (this.attr("class") || "").split(" "))
            },
            removeClass: function (a) {
                return this.attr("class", (this.attr("class") || "").replace(a, ""))
            },
            symbolAttr: function (a) {
                var p = this;
                d("x y r start end width height innerR anchorX anchorY".split(" "), function (e) {
                    p[e] = K(a[e], p[e])
                });
                p.attr({
                    d: p.renderer.symbols[p.symbolName](p.x, p.y, p.width, p.height, p)
                })
            },
            clip: function (a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function (a, p) {
                var e = this,
                    x = {},
                    r;
                p = p || a.strokeWidth || 0;
                r = Math.round(p) % 2 / 2;
                a.x = Math.floor(a.x || e.x || 0) + r;
                a.y = Math.floor(a.y || e.y || 0) + r;
                a.width = Math.floor((a.width || e.width || 0) - 2 * r);
                a.height = Math.floor((a.height || e.height || 0) - 2 * r);
                t(a.strokeWidth) && (a.strokeWidth = p);
                G(a, function (a, J) {
                    e[J] !== a && (e[J] = x[J] = a)
                });
                return x
            },
            css: function (a) {
                var e = this.styles,
                    x = {},
                    r = this.element,
                    d, u = "",
                    b, m = !e,
                    h = ["textOutline", "textOverflow", "width"];
                a && a.color && (a.fill = a.color);
                e && G(a, function (a, J) {
                    a !== e[J] && (x[J] = a, m = !0)
                });
                m && (e && (a = c(e, x)), d = this.textWidth = a && a.width && "auto" !== a.width && "text" === r.nodeName.toLowerCase() && p(a.width), this.styles = a, d && !L && this.renderer.forExport && delete a.width, E && !L ? l(this.element, a) : (b = function (a, J) {
                    return "-" + J.toLowerCase()
                }, G(a, function (a, J) {
                    -1 === A(J, h) && (u += J.replace(/([A-Z])/g, b) + ":" + a + ";")
                }), u && n(r, "style", u)), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline)));
                return this
            },
            strokeWidth: function () {
                return this["stroke-width"] || 0
            },
            on: function (a, p) {
                var e = this,
                    x = e.element;
                m && "click" === a ? (x.ontouchstart = function (a) {
                    e.touchEventFired = Date.now();
                    a.preventDefault();
                    p.call(x, a)
                }, x.onclick = function (a) {
                    (-1 === Q.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (e.touchEventFired || 0)) && p.call(x, a)
                }) : x["on" + a] = p;
                return this
            },
            setRadialReference: function (a) {
                var p = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                p && p.radAttr && p.animate(this.renderer.getRadialAttr(a, p.radAttr));
                return this
            },
            translate: function (a, p) {
                return this.attr({
                    translateX: a,
                    translateY: p
                })
            },
            invert: function (a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function () {
                var a = this.translateX || 0,
                    p = this.translateY || 0,
                    e = this.scaleX,
                    x = this.scaleY,
                    r = this.inverted,
                    c = this.rotation,
                    d = this.element;
                r && (a += this.width, p += this.height);
                a = ["translate(" + a + "," + p + ")"];
                r ? a.push("rotate(90) scale(-1,1)") : c && a.push("rotate(" + c + " " + (d.getAttribute("x") || 0) + " " + (d.getAttribute("y") || 0) + ")");
                (t(e) || t(x)) && a.push("scale(" + K(e, 1) + " " + K(x, 1) + ")");
                a.length && d.setAttribute("transform", a.join(" "))
            },
            toFront: function () {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function (a, p, e) {
                var x, r, c, d, u = {};
                r = this.renderer;
                c = r.alignedObjects;
                var b, m;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = p, !e || w(e)) this.alignTo = x = e || "renderer", v(c, this), c.push(this), e = null
                } else a = this.alignOptions, p = this.alignByTranslate, x = this.alignTo;
                e = K(e, r[x], r);
                x = a.align;
                r = a.verticalAlign;
                c = (e.x || 0) + (a.x || 0);
                d = (e.y || 0) + (a.y || 0);
                "right" === x ? b = 1 : "center" === x && (b = 2);
                b && (c += (e.width - (a.width || 0)) / b);
                u[p ? "translateX" : "x"] = Math.round(c);
                "bottom" === r ? m = 1 : "middle" === r && (m = 2);
                m && (d += (e.height - (a.height || 0)) / m);
                u[p ? "translateY" : "y"] = Math.round(d);
                this[this.placed ? "animate" : "attr"](u);
                this.placed = !0;
                this.alignAttr = u;
                return this
            },
            getBBox: function (a, p) {
                var e, x = this.renderer,
                    r, u = this.element,
                    b = this.styles,
                    m, f = this.textStr,
                    L, E = x.cache,
                    v = x.cacheKeys,
                    B;
                p = K(p, this.rotation);
                r = p * h;
                m = b && b.fontSize;
                void 0 !== f && (B = f.toString(), -1 === B.indexOf("<") && (B = B.replace(/[0-9]/g, "0")), B += ["", p || 0, m, b && b.width, b && b.textOverflow].join());
                B && !a && (e = E[B]);
                if (!e) {
                    if (u.namespaceURI === this.SVG_NS || x.forExport) {
                        try {
                            (L = this.fakeTS && function (a) {
                                d(u.querySelectorAll(".highcharts-text-outline"), function (J) {
                                    J.style.display = a
                                })
                            }) && L("none"), e = u.getBBox ? c({}, u.getBBox()) : {
                                width: u.offsetWidth,
                                height: u.offsetHeight
                            }, L && L("")
                        } catch (y) {}
                        if (!e || 0 > e.width) e = {
                            width: 0,
                            height: 0
                        }
                    } else e = this.htmlGetBBox();
                    x.isSVG && (a = e.width, x = e.height, b && "11px" === b.fontSize && 17 === Math.round(x) && (e.height = x = 14), p && (e.width = Math.abs(x * Math.sin(r)) + Math.abs(a * Math.cos(r)), e.height = Math.abs(x * Math.cos(r)) + Math.abs(a * Math.sin(r))));
                    if (B && 0 < e.height) {
                        for (; 250 < v.length;) delete E[v.shift()];
                        E[B] || v.push(B);
                        E[B] = e
                    }
                }
                return e
            },
            show: function (a) {
                return this.attr({
                    visibility: a ? "inherit" : "visible"
                })
            },
            hide: function () {
                return this.attr({
                    visibility: "hidden"
                })
            },
            fadeOut: function (a) {
                var p = this;
                p.animate({
                    opacity: 0
                }, {
                    duration: a || 150,
                    complete: function () {
                        p.attr({
                            y: -9999
                        })
                    }
                })
            },
            add: function (a) {
                var p = this.renderer,
                    e = this.element,
                    x;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && p.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) x = this.zIndexSetter();
                x || (a ? a.element : p.box).appendChild(e);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function (a) {
                var p = a.parentNode;
                p && p.removeChild(a)
            },
            destroy: function () {
                var a = this,
                    p = a.element || {},
                    e = a.renderer.isSVG && "SPAN" === p.nodeName && a.parentGroup,
                    x = p.ownerSVGElement;
                p.onclick = p.onmouseout = p.onmouseover = p.onmousemove = p.point = null;
                O(a);
                a.clipPath && x && (d(x.querySelectorAll("[clip-path]"), function (p) {
                    -1 < p.getAttribute("clip-path").indexOf(a.clipPath.element.id + ")") && p.removeAttribute("clip-path")
                }), a.clipPath = a.clipPath.destroy());
                if (a.stops) {
                    for (x = 0; x < a.stops.length; x++) a.stops[x] = a.stops[x].destroy();
                    a.stops = null
                }
                a.safeRemoveChild(p);
                for (a.destroyShadows(); e && e.div && 0 === e.div.childNodes.length;) p = e.parentGroup, a.safeRemoveChild(e.div), delete e.div, e = p;
                a.alignTo && v(a.renderer.alignedObjects, a);
                G(a, function (p, e) {
                    delete a[e]
                });
                return null
            },
            shadow: function (a, p, e) {
                var x = [],
                    r, c, u = this.element,
                    d, b, m, h;
                if (!a) this.destroyShadows();
                else if (!this.shadows) {
                    b = K(a.width, 3);
                    m = (a.opacity || .15) / b;
                    h = this.parentInverted ? "(-1,-1)" : "(" + K(a.offsetX, 1) + ", " + K(a.offsetY, 1) + ")";
                    for (r = 1; r <= b; r++) c = u.cloneNode(0), d = 2 * b + 1 - 2 * r, n(c, {
                        isShadow: "true",
                        stroke: a.color || "#000000",
                        "stroke-opacity": m * r,
                        "stroke-width": d,
                        transform: "translate" + h,
                        fill: "none"
                    }), e && (n(c, "height", Math.max(n(c, "height") - d, 0)), c.cutHeight = d), p ? p.element.appendChild(c) : u.parentNode.insertBefore(c, u), x.push(c);
                    this.shadows = x
                }
                return this
            },
            destroyShadows: function () {
                d(this.shadows || [], function (a) {
                    this.safeRemoveChild(a)
                }, this);
                this.shadows = void 0
            },
            xGetter: function (a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function (a) {
                a = K(this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function (a, p, e) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                this[p] !== a && (e.setAttribute(p, a), this[p] = a)
            },
            dashstyleSetter: function (a) {
                var e, x = this["stroke-width"];
                "inherit" === x && (x = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (e = a.length; e--;) a[e] = p(a[e]) * x;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            },
            alignSetter: function (a) {
                this.element.setAttribute("text-anchor", {
                    left: "start",
                    center: "middle",
                    right: "end"
                } [a])
            },
            opacitySetter: function (a, p, e) {
                this[p] = a;
                e.setAttribute(p, a)
            },
            titleSetter: function (a) {
                var p = this.element.getElementsByTagName("title")[0];
                p || (p = f.createElementNS(this.SVG_NS, "title"), this.element.appendChild(p));
                p.firstChild && p.removeChild(p.firstChild);
                p.appendChild(f.createTextNode(String(K(a), "").replace(/<[^>]*>/g, "")))
            },
            textSetter: function (a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            fillSetter: function (a, p, e) {
                "string" === typeof a ? e.setAttribute(p, a) : a && this.colorGradient(a, p, e)
            },
            visibilitySetter: function (a, p, e) {
                "inherit" === a ? e.removeAttribute(p) : this[p] !== a && e.setAttribute(p, a);
                this[p] = a
            },
            zIndexSetter: function (a, e) {
                var x = this.renderer,
                    r = this.parentGroup,
                    c = (r || x).element || x.box,
                    u, d = this.element,
                    b;
                u = this.added;
                var m;
                t(a) && (d.zIndex = a, a = +a, this[e] === a && (u = !1), this[e] = a);
                if (u) {
                    (a = this.zIndex) && r && (r.handleZ = !0);
                    e = c.childNodes;
                    for (m = 0; m < e.length && !b; m++) r = e[m], u = r.zIndex, r !== d && (p(u) > a || !t(a) && t(u) || 0 > a && !t(u) && c !== x.box) && (c.insertBefore(d, r), b = !0);
                    b || c.appendChild(d)
                }
                return b
            },
            _defaultSetter: function (a, p, e) {
                e.setAttribute(p, a)
            }
        });
        C.prototype.yGetter = C.prototype.xGetter;
        C.prototype.translateXSetter = C.prototype.translateYSetter = C.prototype.rotationSetter = C.prototype.verticalAlignSetter = C.prototype.scaleXSetter = C.prototype.scaleYSetter = function (a, p) {
            this[p] = a;
            this.doTransform = !0
        };
        C.prototype["stroke-widthSetter"] = C.prototype.strokeSetter = function (a, p, e) {
            this[p] = a;
            this.stroke && this["stroke-width"] ? (C.prototype.fillSetter.call(this, this.stroke, "stroke", e), e.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === p && 0 === a && this.hasStroke && (e.removeAttribute("stroke"), this.hasStroke = !1)
        };
        z = a.SVGRenderer = function () {
            this.init.apply(this, arguments)
        };
        c(z.prototype, {
            Element: C,
            SVG_NS: N,
            init: function (a, p, x, r, c, u) {
                var d;
                r = this.createElement("svg").attr({
                    version: "1.1",
                    "class": "highcharts-root"
                }).css(this.getStyle(r));
                d = r.element;
                a.appendChild(d); - 1 === a.innerHTML.indexOf("xmlns") && n(d, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = d;
                this.boxWrapper = r;
                this.alignedObjects = [];
                this.url = (e || I) && f.getElementsByTagName("base").length ? Q.location.href.replace(/#.*?$/, "").replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(f.createTextNode("Created with Highcharts 5.0.14"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = u;
                this.forExport = c;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(p, x, !1);
                var b;
                e && a.getBoundingClientRect && (p = function () {
                    l(a, {
                        left: 0,
                        top: 0
                    });
                    b = a.getBoundingClientRect();
                    l(a, {
                        left: Math.ceil(b.left) - b.left + "px",
                        top: Math.ceil(b.top) - b.top + "px"
                    })
                }, p(), this.unSubPixelFix = F(Q, "resize", p))
            },
            getStyle: function (a) {
                return this.style = c({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, a)
            },
            setStyle: function (a) {
                this.boxWrapper.css(this.getStyle(a))
            },
            isHidden: function () {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function () {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                b(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            },
            createElement: function (a) {
                var p = new this.Element;
                p.init(this, a);
                return p
            },
            draw: B,
            getRadialAttr: function (a, p) {
                return {
                    cx: a[0] - a[2] / 2 + p.cx * a[2],
                    cy: a[1] - a[2] / 2 + p.cy * a[2],
                    r: p.r * a[2]
                }
            },
            getSpanWidth: function (a, p) {
                var e = a.getBBox(!0).width;
                !L && this.forExport && (e = this.measureSpanWidth(p.firstChild.data, a.styles));
                return e
            },
            applyEllipsis: function (a, p, e, x) {
                var r = a.rotation,
                    c = e,
                    u, d = 0,
                    b = e.length,
                    m = function (a) {
                        p.removeChild(p.firstChild);
                        a && p.appendChild(f.createTextNode(a))
                    },
                    h;
                a.rotation = 0;
                c = this.getSpanWidth(a, p);
                if (h = c > x) {
                    for (; d <= b;) u = Math.ceil((d + b) / 2), c = e.substring(0, u) + "…", m(c), c = this.getSpanWidth(a, p), d === b ? d = b + 1 : c > x ? b = u - 1 : d = u;
                    0 === b && m("")
                }
                a.rotation = r;
                return h
            },
            buildText: function (a) {
                var e = a.element,
                    x = this,
                    r = x.forExport,
                    c = K(a.textStr, "").toString(),
                    u = -1 !== c.indexOf("<"),
                    b = e.childNodes,
                    m, h, E, B, v = n(e, "x"),
                    w = a.styles,
                    G = a.textWidth,
                    A = w && w.lineHeight,
                    g = w && w.textOutline,
                    k = w && "ellipsis" === w.textOverflow,
                    q = w && "nowrap" === w.whiteSpace,
                    O = w && w.fontSize,
                    t, H, I = b.length,
                    w = G && !a.added && this.box,
                    P = function (a) {
                        var r;
                        r = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : O || x.style.fontSize || 12;
                        return A ? p(A) : x.fontMetrics(r, a.getAttribute("style") ? a : e).h
                    };
                t = [c, k, q, A, g, O, G].join();
                if (t !== a.textCache) {
                    for (a.textCache = t; I--;) e.removeChild(b[I]);
                    u || g || k || G || -1 !== c.indexOf(" ") ? (m = /<.*class="([^"]+)".*>/, h = /<.*style="([^"]+)".*>/, E = /<.*href="([^"]+)".*>/, w && w.appendChild(e), c = u ? c.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g) : [c], c = y(c, function (a) {
                        return "" !== a
                    }), d(c, function (p, c) {
                        var u, b = 0;
                        p = p.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
                        u = p.split("|||");
                        d(u, function (p) {
                            if ("" !== p || 1 === u.length) {
                                var d = {},
                                    w = f.createElementNS(x.SVG_NS, "tspan"),
                                    y, A;
                                m.test(p) && (y = p.match(m)[1], n(w, "class", y));
                                h.test(p) && (A = p.match(h)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), n(w, "style", A));
                                E.test(p) && !r && (n(w, "onclick", 'location.href="' + p.match(E)[1] + '"'), l(w, {
                                    cursor: "pointer"
                                }));
                                p = (p.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
                                if (" " !== p) {
                                    w.appendChild(f.createTextNode(p));
                                    b ? d.dx = 0 : c && null !== v && (d.x = v);
                                    n(w, d);
                                    e.appendChild(w);
                                    !b && H && (!L && r && l(w, {
                                        display: "block"
                                    }), n(w, "dy", P(w)));
                                    if (G) {
                                        d = p.replace(/([^\^])-/g, "$1- ").split(" ");
                                        y = 1 < u.length || c || 1 < d.length && !q;
                                        var g = [],
                                            O, t = P(w),
                                            K = a.rotation;
                                        for (k && (B = x.applyEllipsis(a, w, p, G)); !k && y && (d.length || g.length);) a.rotation = 0, O = x.getSpanWidth(a, w), p = O > G, void 0 === B && (B = p), p && 1 !== d.length ? (w.removeChild(w.firstChild), g.unshift(d.pop())) : (d = g, g = [], d.length && !q && (w = f.createElementNS(N, "tspan"), n(w, {
                                            dy: t,
                                            x: v
                                        }), A && n(w, "style", A), e.appendChild(w)), O > G && (G = O)), d.length && w.appendChild(f.createTextNode(d.join(" ").replace(/- /g, "-")));
                                        a.rotation = K
                                    }
                                    b++
                                }
                            }
                        });
                        H = H || e.childNodes.length
                    }), B && a.attr("title", a.textStr), w && w.removeChild(e), g && a.applyTextOutline && a.applyTextOutline(g)) : e.appendChild(f.createTextNode(c.replace(/&lt;/g, "<").replace(/&gt;/g, ">")))
                }
            },
            getContrast: function (a) {
                a = k(a).rgba;
                return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            },
            button: function (a, p, e, x, d, u, b, m, h) {
                var f = this.label(a, p, e, h, null, null, null, null, "button"),
                    L = 0;
                f.attr(r({
                    padding: 8,
                    r: 2
                }, d));
                var B, w, v, y;
                d = r({
                    fill: "#f7f7f7",
                    stroke: "#cccccc",
                    "stroke-width": 1,
                    style: {
                        color: "#333333",
                        cursor: "pointer",
                        fontWeight: "normal"
                    }
                }, d);
                B = d.style;
                delete d.style;
                u = r(d, {
                    fill: "#e6e6e6"
                }, u);
                w = u.style;
                delete u.style;
                b = r(d, {
                    fill: "#e6ebf5",
                    style: {
                        color: "#000000",
                        fontWeight: "bold"
                    }
                }, b);
                v = b.style;
                delete b.style;
                m = r(d, {
                    style: {
                        color: "#cccccc"
                    }
                }, m);
                y = m.style;
                delete m.style;
                F(f.element, E ? "mouseover" : "mouseenter", function () {
                    3 !== L && f.setState(1)
                });
                F(f.element, E ? "mouseout" : "mouseleave", function () {
                    3 !== L && f.setState(L)
                });
                f.setState = function (a) {
                    1 !== a && (f.state = L = a);
                    f.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
                    f.attr([d, u, b, m][a || 0]).css([B, w, v, y][a || 0])
                };
                f.attr(d).css(c({
                    cursor: "default"
                }, B));
                return f.on("click", function (a) {
                    3 !== L && x.call(f, a)
                })
            },
            crispLine: function (a, p) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - p % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + p % 2 / 2);
                return a
            },
            path: function (a) {
                var p = {
                    fill: "none"
                };
                H(a) ? p.d = a : u(a) && c(p, a);
                return this.createElement("path").attr(p)
            },
            circle: function (a, p, e) {
                a = u(a) ? a : {
                    x: a,
                    y: p,
                    r: e
                };
                p = this.createElement("circle");
                p.xSetter = p.ySetter = function (a, p, e) {
                    e.setAttribute("c" + p, a)
                };
                return p.attr(a)
            },
            arc: function (a, p, e, x, r, c) {
                u(a) ? (x = a, p = x.y, e = x.r, a = x.x) : x = {
                    innerR: x,
                    start: r,
                    end: c
                };
                a = this.symbol("arc", a, p, e, e, x);
                a.r = e;
                return a
            },
            rect: function (a, p, e, x, r, c) {
                r = u(a) ? a.r : r;
                var d = this.createElement("rect");
                a = u(a) ? a : void 0 === a ? {} : {
                    x: a,
                    y: p,
                    width: Math.max(e, 0),
                    height: Math.max(x, 0)
                };
                void 0 !== c && (a.strokeWidth = c, a = d.crisp(a));
                a.fill = "none";
                r && (a.r = r);
                d.rSetter = function (a, p, e) {
                    n(e, {
                        rx: a,
                        ry: a
                    })
                };
                return d.attr(a)
            },
            setSize: function (a, p, e) {
                var x = this.alignedObjects,
                    r = x.length;
                this.width = a;
                this.height = p;
                for (this.boxWrapper.animate({
                        width: a,
                        height: p
                    }, {
                        step: function () {
                            this.attr({
                                viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                            })
                        },
                        duration: K(e, !0) ? void 0 : 0
                    }); r--;) x[r].align()
            },
            g: function (a) {
                var p = this.createElement("g");
                return a ? p.attr({
                    "class": "highcharts-" + a
                }) : p
            },
            image: function (a, p, e, x, r) {
                var d = {
                    preserveAspectRatio: "none"
                };
                1 < arguments.length && c(d, {
                    x: p,
                    y: e,
                    width: x,
                    height: r
                });
                d = this.createElement("image").attr(d);
                d.element.setAttributeNS ? d.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : d.element.setAttribute("hc-svg-href", a);
                return d
            },
            symbol: function (a, p, e, x, r, u) {
                var b = this,
                    m, h = /^url\((.*?)\)$/,
                    L = h.test(a),
                    B = !L && (this.symbols[a] ? a : "circle"),
                    E = B && this.symbols[B],
                    w = t(p) && E && E.call(this.symbols, Math.round(p), Math.round(e), x, r, u),
                    v, y;
                E ? (m = this.path(w), m.attr("fill", "none"), c(m, {
                    symbolName: B,
                    x: p,
                    y: e,
                    width: x,
                    height: r
                }), u && c(m, u)) : L && (v = a.match(h)[1], m = this.image(v), m.imgwidth = K(P[v] && P[v].width, u && u.width), m.imgheight = K(P[v] && P[v].height, u && u.height), y = function () {
                    m.attr({
                        width: m.width,
                        height: m.height
                    })
                }, d(["width", "height"], function (a) {
                    m[a + "Setter"] = function (a, p) {
                        var e = {},
                            x = this["img" + p],
                            r = "width" === p ? "translateX" : "translateY";
                        this[p] = a;
                        t(x) && (this.element && this.element.setAttribute(p, x), this.alignByTranslate || (e[r] = ((this[p] || 0) - x) / 2, this.attr(e)))
                    }
                }), t(p) && m.attr({
                    x: p,
                    y: e
                }), m.isImg = !0, t(m.imgwidth) && t(m.imgheight) ? y() : (m.attr({
                    width: 0,
                    height: 0
                }), q("img", {
                    onload: function () {
                        var a = g[b.chartIndex];
                        0 === this.width && (l(this, {
                            position: "absolute",
                            top: "-999em"
                        }), f.body.appendChild(this));
                        P[v] = {
                            width: this.width,
                            height: this.height
                        };
                        m.imgwidth = this.width;
                        m.imgheight = this.height;
                        m.element && y();
                        this.parentNode && this.parentNode.removeChild(this);
                        b.imgCount--;
                        if (!b.imgCount && a && a.onload) a.onload()
                    },
                    src: v
                }), this.imgCount++));
                return m
            },
            symbols: {
                circle: function (a, p, e, x) {
                    return this.arc(a + e / 2, p + x / 2, e / 2, x / 2, {
                        start: 0,
                        end: 2 * Math.PI,
                        open: !1
                    })
                },
                square: function (a, p, e, x) {
                    return ["M", a, p, "L", a + e, p, a + e, p + x, a, p + x, "Z"]
                },
                triangle: function (a, p, e, x) {
                    return ["M", a + e / 2, p, "L", a + e, p + x, a, p + x, "Z"]
                },
                "triangle-down": function (a, p, e, x) {
                    return ["M", a, p, "L", a + e, p, a + e / 2, p + x, "Z"]
                },
                diamond: function (a, p, e, x) {
                    return ["M", a + e / 2, p, "L", a + e, p + x / 2, a + e / 2, p + x, a, p + x / 2, "Z"]
                },
                arc: function (a, p, e, x, r) {
                    var d = r.start,
                        c = r.r || e,
                        u = r.r || x || e,
                        b = r.end - .001;
                    e = r.innerR;
                    x = K(r.open, .001 > Math.abs(r.end - r.start - 2 * Math.PI));
                    var m = Math.cos(d),
                        h = Math.sin(d),
                        f = Math.cos(b),
                        b = Math.sin(b);
                    r = .001 > r.end - d - Math.PI ? 0 : 1;
                    c = ["M", a + c * m, p + u * h, "A", c, u, 0, r, 1, a + c * f, p + u * b];
                    t(e) && c.push(x ? "M" : "L", a + e * f, p + e * b, "A", e, e, 0, r, 0, a + e * m, p + e * h);
                    c.push(x ? "" : "Z");
                    return c
                },
                callout: function (a, p, e, x, r) {
                    var d = Math.min(r && r.r || 0, e, x),
                        c = d + 6,
                        u = r && r.anchorX;
                    r = r && r.anchorY;
                    var b;
                    b = ["M", a + d, p, "L", a + e - d, p, "C", a + e, p, a + e, p, a + e, p + d, "L", a + e, p + x - d, "C", a + e, p + x, a + e, p + x, a + e - d, p + x, "L", a + d, p + x, "C", a, p + x, a, p + x, a, p + x - d, "L", a, p + d, "C", a, p, a, p, a + d, p];
                    u && u > e ? r > p + c && r < p + x - c ? b.splice(13, 3, "L", a + e, r - 6, a + e + 6, r, a + e, r + 6, a + e, p + x - d) : b.splice(13, 3, "L", a + e, x / 2, u, r, a + e, x / 2, a + e, p + x - d) : u && 0 > u ? r > p + c && r < p + x - c ? b.splice(33, 3, "L", a, r + 6, a - 6, r, a, r - 6, a, p + d) : b.splice(33, 3, "L", a, x / 2, u, r, a, x / 2, a, p + d) : r && r > x && u > a + c && u < a + e - c ? b.splice(23, 3, "L", u + 6, p + x, u, p + x + 6, u - 6, p + x, a + d, p + x) : r && 0 > r && u > a + c && u < a + e - c && b.splice(3, 3, "L", u - 6, p, u, p - 6, u + 6, p, e - d, p);
                    return b
                }
            },
            clipRect: function (p, e, x, r) {
                var d = a.uniqueKey(),
                    c = this.createElement("clipPath").attr({
                        id: d
                    }).add(this.defs);
                p = this.rect(p, e, x, r, 0).add(c);
                p.id = d;
                p.clipPath = c;
                p.count = 0;
                return p
            },
            text: function (a, p, e, x) {
                var r = !L && this.forExport,
                    d = {};
                if (x && (this.allowHTML || !this.forExport)) return this.html(a, p, e);
                d.x = Math.round(p || 0);
                e && (d.y = Math.round(e));
                if (a || 0 === a) d.text = a;
                a = this.createElement("text").attr(d);
                r && a.css({
                    position: "absolute"
                });
                x || (a.xSetter = function (a, p, e) {
                    var x = e.getElementsByTagName("tspan"),
                        r, d = e.getAttribute(p),
                        c;
                    for (c = 0; c < x.length; c++) r = x[c], r.getAttribute(p) === d && r.setAttribute(p, a);
                    e.setAttribute(p, a)
                });
                return a
            },
            fontMetrics: function (a, e) {
                a = a || e && e.style && e.style.fontSize || this.style && this.style.fontSize;
                a = /px/.test(a) ? p(a) : /em/.test(a) ? parseFloat(a) * (e ? this.fontMetrics(null, e.parentNode).f : 16) : 12;
                e = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {
                    h: e,
                    b: Math.round(.8 * e),
                    f: a
                }
            },
            rotCorr: function (a, p, e) {
                var x = a;
                p && e && (x = Math.max(x * Math.cos(p * h), 4));
                return {
                    x: -a / 3 * Math.sin(p * h),
                    y: x
                }
            },
            label: function (p, e, u, b, m, h, f, L, B) {
                var v = this,
                    E = v.g("button" !== B && "label"),
                    w = E.text = v.text("", 0, 0, f).attr({
                        zIndex: 1
                    }),
                    y, G, A = 0,
                    g = 3,
                    l = 0,
                    k, O, q, H, N, K = {},
                    n, I, P = /^url\((.*?)\)$/.test(b),
                    Q = P,
                    z, F, D, M;
                B && E.addClass("highcharts-" + B);
                Q = P;
                z = function () {
                    return (n || 0) % 2 / 2
                };
                F = function () {
                    var a = w.element.style,
                        p = {};
                    G = (void 0 === k || void 0 === O || N) && t(w.textStr) && w.getBBox();
                    E.width = (k || G.width || 0) + 2 * g + l;
                    E.height = (O || G.height || 0) + 2 * g;
                    I = g + v.fontMetrics(a && a.fontSize, w).b;
                    Q && (y || (E.box = y = v.symbols[b] || P ? v.symbol(b) : v.rect(), y.addClass(("button" === B ? "" : "highcharts-label-box") + (B ? " highcharts-" + B + "-box" : "")), y.add(E), a = z(), p.x = a, p.y = (L ? -I : 0) + a), p.width = Math.round(E.width), p.height = Math.round(E.height), y.attr(c(p, K)), K = {})
                };
                D = function () {
                    var a = l + g,
                        p;
                    p = L ? 0 : I;
                    t(k) && G && ("center" === N || "right" === N) && (a += {
                        center: .5,
                        right: 1
                    } [N] * (k - G.width));
                    if (a !== w.x || p !== w.y) w.attr("x", a), void 0 !== p && w.attr("y", p);
                    w.x = a;
                    w.y = p
                };
                M = function (a, p) {
                    y ? y.attr(a, p) : K[a] = p
                };
                E.onAdd = function () {
                    w.add(E);
                    E.attr({
                        text: p || 0 === p ? p : "",
                        x: e,
                        y: u
                    });
                    y && t(m) && E.attr({
                        anchorX: m,
                        anchorY: h
                    })
                };
                E.widthSetter = function (p) {
                    k = a.isNumber(p) ? p : null
                };
                E.heightSetter = function (a) {
                    O = a
                };
                E["text-alignSetter"] = function (a) {
                    N = a
                };
                E.paddingSetter = function (a) {
                    t(a) && a !== g && (g = E.padding = a, D())
                };
                E.paddingLeftSetter = function (a) {
                    t(a) && a !== l && (l = a, D())
                };
                E.alignSetter = function (a) {
                    a = {
                        left: 0,
                        center: .5,
                        right: 1
                    } [a];
                    a !== A && (A = a, G && E.attr({
                        x: q
                    }))
                };
                E.textSetter = function (a) {
                    void 0 !== a && w.textSetter(a);
                    F();
                    D()
                };
                E["stroke-widthSetter"] = function (a, p) {
                    a && (Q = !0);
                    n = this["stroke-width"] = a;
                    M(p, a)
                };
                E.strokeSetter = E.fillSetter = E.rSetter = function (a, p) {
                    "r" !== p && ("fill" === p && a && (Q = !0), E[p] = a);
                    M(p, a)
                };
                E.anchorXSetter = function (a, p) {
                    m = E.anchorX = a;
                    M(p, Math.round(a) - z() - q)
                };
                E.anchorYSetter = function (a, p) {
                    h = E.anchorY = a;
                    M(p, a - H)
                };
                E.xSetter = function (a) {
                    E.x = a;
                    A && (a -= A * ((k || G.width) + 2 * g));
                    q = Math.round(a);
                    E.attr("translateX", q)
                };
                E.ySetter = function (a) {
                    H = E.y = Math.round(a);
                    E.attr("translateY", H)
                };
                var R = E.css;
                return c(E, {
                    css: function (a) {
                        if (a) {
                            var p = {};
                            a = r(a);
                            d(E.textProps, function (e) {
                                void 0 !== a[e] && (p[e] = a[e], delete a[e])
                            });
                            w.css(p)
                        }
                        return R.call(E, a)
                    },
                    getBBox: function () {
                        return {
                            width: G.width + 2 * g,
                            height: G.height + 2 * g,
                            x: G.x - g,
                            y: G.y - g
                        }
                    },
                    shadow: function (a) {
                        a && (F(), y && y.shadow(a));
                        return E
                    },
                    destroy: function () {
                        x(E.element, "mouseenter");
                        x(E.element, "mouseleave");
                        w && (w = w.destroy());
                        y && (y = y.destroy());
                        C.prototype.destroy.call(E);
                        E = v = F = D = M = null
                    }
                })
            }
        });
        a.Renderer = z
    })(M);
    (function (a) {
        var C = a.attr,
            z = a.createElement,
            F = a.css,
            D = a.defined,
            n = a.each,
            g = a.extend,
            k = a.isFirefox,
            l = a.isMS,
            q = a.isWebKit,
            t = a.pInt,
            h = a.SVGRenderer,
            b = a.win,
            f = a.wrap;
        g(a.SVGElement.prototype, {
            htmlCss: function (a) {
                var c = this.element;
                if (c = a && "SPAN" === c.tagName && a.width) delete a.width, this.textWidth = c, this.updateTransform();
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = g(this.styles, a);
                F(this.element, a);
                return this
            },
            htmlGetBBox: function () {
                var a = this.element;
                "text" === a.nodeName && (a.style.position = "absolute");
                return {
                    x: a.offsetLeft,
                    y: a.offsetTop,
                    width: a.offsetWidth,
                    height: a.offsetHeight
                }
            },
            htmlUpdateTransform: function () {
                if (this.added) {
                    var a = this.renderer,
                        c = this.element,
                        b = this.translateX || 0,
                        h = this.translateY || 0,
                        m = this.x || 0,
                        f = this.y || 0,
                        g = this.textAlign || "left",
                        e = {
                            left: 0,
                            center: .5,
                            right: 1
                        } [g],
                        E = this.styles;
                    F(c, {
                        marginLeft: b,
                        marginTop: h
                    });
                    this.shadows && n(this.shadows, function (a) {
                        F(a, {
                            marginLeft: b + 1,
                            marginTop: h + 1
                        })
                    });
                    this.inverted && n(c.childNodes, function (e) {
                        a.invertChild(e, c)
                    });
                    if ("SPAN" === c.tagName) {
                        var u = this.rotation,
                            w = t(this.textWidth),
                            l = E && E.whiteSpace,
                            r = [u, g, c.innerHTML, this.textWidth, this.textAlign].join();
                        r !== this.cTT && (E = a.fontMetrics(c.style.fontSize).b, D(u) && this.setSpanRotation(u, e, E), F(c, {
                            width: "",
                            whiteSpace: l || "nowrap"
                        }), c.offsetWidth > w && /[ \-]/.test(c.textContent || c.innerText) && F(c, {
                            width: w + "px",
                            display: "block",
                            whiteSpace: l || "normal"
                        }), this.getSpanCorrection(c.offsetWidth, E, e, u, g));
                        F(c, {
                            left: m + (this.xCorr || 0) + "px",
                            top: f + (this.yCorr || 0) + "px"
                        });
                        q && (E = c.offsetHeight);
                        this.cTT = r
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function (a, c, h) {
                var f = {},
                    m = l ? "-ms-transform" : q ? "-webkit-transform" : k ? "MozTransform" : b.opera ? "-o-transform" : "";
                f[m] = f.transform = "rotate(" + a + "deg)";
                f[m + (k ? "Origin" : "-origin")] = f.transformOrigin = 100 * c + "% " + h + "px";
                F(this.element, f)
            },
            getSpanCorrection: function (a, c, b) {
                this.xCorr = -a * b;
                this.yCorr = -c
            }
        });
        g(h.prototype, {
            html: function (a, c, b) {
                var h = this.createElement("span"),
                    m = h.element,
                    A = h.renderer,
                    l = A.isSVG,
                    e = function (a, e) {
                        n(["opacity", "visibility"], function (c) {
                            f(a, c + "Setter", function (a, r, c, d) {
                                a.call(this, r, c, d);
                                e[c] = r
                            })
                        })
                    };
                h.textSetter = function (a) {
                    a !== m.innerHTML && delete this.bBox;
                    m.innerHTML = this.textStr = a;
                    h.htmlUpdateTransform()
                };
                l && e(h, h.element.style);
                h.xSetter = h.ySetter = h.alignSetter = h.rotationSetter = function (a, e) {
                    "align" === e && (e = "textAlign");
                    h[e] = a;
                    h.htmlUpdateTransform()
                };
                h.attr({
                    text: a,
                    x: Math.round(c),
                    y: Math.round(b)
                }).css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize,
                    position: "absolute"
                });
                m.style.whiteSpace = "nowrap";
                h.css = h.htmlCss;
                l && (h.add = function (a) {
                    var c, d = A.box.parentNode,
                        b = [];
                    if (this.parentGroup = a) {
                        if (c = a.div, !c) {
                            for (; a;) b.push(a), a = a.parentGroup;
                            n(b.reverse(), function (a) {
                                var m, f = C(a.element, "class");
                                f && (f = {
                                    className: f
                                });
                                c = a.div = a.div || z("div", f, {
                                    position: "absolute",
                                    left: (a.translateX || 0) + "px",
                                    top: (a.translateY || 0) + "px",
                                    display: a.display,
                                    opacity: a.opacity,
                                    pointerEvents: a.styles && a.styles.pointerEvents
                                }, c || d);
                                m = c.style;
                                g(a, {
                                    classSetter: function (a) {
                                        this.element.setAttribute("class", a);
                                        c.className = a
                                    },
                                    on: function () {
                                        b[0].div && h.on.apply({
                                            element: b[0].div
                                        }, arguments);
                                        return a
                                    },
                                    translateXSetter: function (e, p) {
                                        m.left = e + "px";
                                        a[p] = e;
                                        a.doTransform = !0
                                    },
                                    translateYSetter: function (e, p) {
                                        m.top = e + "px";
                                        a[p] = e;
                                        a.doTransform = !0
                                    }
                                });
                                e(a, m)
                            })
                        }
                    } else c = d;
                    c.appendChild(m);
                    h.added = !0;
                    h.alignOnAdd && h.htmlUpdateTransform();
                    return h
                });
                return h
            }
        })
    })(M);
    (function (a) {
        var C, z, F = a.createElement,
            D = a.css,
            n = a.defined,
            g = a.deg2rad,
            k = a.discardElement,
            l = a.doc,
            q = a.each,
            t = a.erase,
            h = a.extend;
        C = a.extendClass;
        var b = a.isArray,
            f = a.isNumber,
            d = a.isObject,
            c = a.merge;
        z = a.noop;
        var v = a.pick,
            y = a.pInt,
            m = a.SVGElement,
            A = a.SVGRenderer,
            H = a.win;
        a.svg || (z = {
            docMode8: l && 8 === l.documentMode,
            init: function (a, c) {
                var d = ["<", c, ' filled="f" stroked="f"'],
                    b = ["position: ", "absolute", ";"],
                    m = "div" === c;
                ("shape" === c || m) && b.push("left:0;top:0;width:1px;height:1px;");
                b.push("visibility: ", m ? "hidden" : "visible");
                d.push(' style="', b.join(""), '"/>');
                c && (d = m || "span" === c || "img" === c ? d.join("") : a.prepVML(d), this.element = F(d));
                this.renderer = a
            },
            add: function (a) {
                var c = this.renderer,
                    d = this.element,
                    b = c.box,
                    m = a && a.inverted,
                    b = a ? a.element || a : b;
                a && (this.parentGroup = a);
                m && c.invertChild(d, b);
                b.appendChild(d);
                this.added = !0;
                this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform();
                if (this.onAdd) this.onAdd();
                this.className && this.attr("class", this.className);
                return this
            },
            updateTransform: m.prototype.htmlUpdateTransform,
            setSpanRotation: function () {
                var a = this.rotation,
                    c = Math.cos(a * g),
                    d = Math.sin(a * g);
                D(this.element, {
                    filter: a ? ["progid:DXImageTransform.Microsoft.Matrix(M11=", c, ", M12=", -d, ", M21=", d, ", M22=", c, ", sizingMethod='auto expand')"].join("") : "none"
                })
            },
            getSpanCorrection: function (a, c, d, b, m) {
                var r = b ? Math.cos(b * g) : 1,
                    h = b ? Math.sin(b * g) : 0,
                    f = v(this.elemHeight, this.element.offsetHeight),
                    y;
                this.xCorr = 0 > r && -a;
                this.yCorr = 0 > h && -f;
                y = 0 > r * h;
                this.xCorr += h * c * (y ? 1 - d : d);
                this.yCorr -= r * c * (b ? y ? d : 1 - d : 1);
                m && "left" !== m && (this.xCorr -= a * d * (0 > r ? -1 : 1), b && (this.yCorr -= f * d * (0 > h ? -1 : 1)), D(this.element, {
                    textAlign: m
                }))
            },
            pathToVML: function (a) {
                for (var c = a.length, d = []; c--;) f(a[c]) ? d[c] = Math.round(10 * a[c]) - 5 : "Z" === a[c] ? d[c] = "x" : (d[c] = a[c], !a.isArc || "wa" !== a[c] && "at" !== a[c] || (d[c + 5] === d[c + 7] && (d[c + 7] += a[c + 7] > a[c + 5] ? 1 : -1), d[c + 6] === d[c + 8] && (d[c + 8] += a[c + 8] > a[c + 6] ? 1 : -1)));
                return d.join(" ") || "x"
            },
            clip: function (a) {
                var c = this,
                    d;
                a ? (d = a.members, t(d, c), d.push(c), c.destroyClip = function () {
                    t(d, c)
                }, a = a.getCSS(c)) : (c.destroyClip && c.destroyClip(), a = {
                    clip: c.docMode8 ? "inherit" : "rect(auto)"
                });
                return c.css(a)
            },
            css: m.prototype.htmlCss,
            safeRemoveChild: function (a) {
                a.parentNode && k(a)
            },
            destroy: function () {
                this.destroyClip && this.destroyClip();
                return m.prototype.destroy.apply(this)
            },
            on: function (a, c) {
                this.element["on" + a] = function () {
                    var a = H.event;
                    a.target = a.srcElement;
                    c(a)
                };
                return this
            },
            cutOffPath: function (a, c) {
                var d;
                a = a.split(/[ ,]/);
                d = a.length;
                if (9 === d || 11 === d) a[d - 4] = a[d - 2] = y(a[d - 2]) - 10 * c;
                return a.join(" ")
            },
            shadow: function (a, c, d) {
                var b = [],
                    m, r = this.element,
                    h = this.renderer,
                    f, g = r.style,
                    p, x = r.path,
                    A, L, l, k;
                x && "string" !== typeof x.value && (x = "x");
                L = x;
                if (a) {
                    l = v(a.width, 3);
                    k = (a.opacity || .15) / l;
                    for (m = 1; 3 >= m; m++) A = 2 * l + 1 - 2 * m, d && (L = this.cutOffPath(x.value, A + .5)), p = ['<shape isShadow="true" strokeweight="', A, '" filled="false" path="', L, '" coordsize="10 10" style="', r.style.cssText, '" />'], f = F(h.prepVML(p), null, {
                        left: y(g.left) + v(a.offsetX, 1),
                        top: y(g.top) + v(a.offsetY, 1)
                    }), d && (f.cutOff = A + 1), p = ['<stroke color="', a.color || "#000000", '" opacity="', k * m, '"/>'], F(h.prepVML(p), null, null, f), c ? c.element.appendChild(f) : r.parentNode.insertBefore(f, r), b.push(f);
                    this.shadows = b
                }
                return this
            },
            updateShadows: z,
            setAttr: function (a, c) {
                this.docMode8 ? this.element[a] = c : this.element.setAttribute(a, c)
            },
            classSetter: function (a) {
                (this.added ? this.element : this).className = a
            },
            dashstyleSetter: function (a, c, d) {
                (d.getElementsByTagName("stroke")[0] || F(this.renderer.prepVML(["<stroke/>"]), null, null, d))[c] = a || "solid";
                this[c] = a
            },
            dSetter: function (a, c, d) {
                var b = this.shadows;
                a = a || [];
                this.d = a.join && a.join(" ");
                d.path = a = this.pathToVML(a);
                if (b)
                    for (d = b.length; d--;) b[d].path = b[d].cutOff ? this.cutOffPath(a, b[d].cutOff) : a;
                this.setAttr(c, a)
            },
            fillSetter: function (a, c, d) {
                var b = d.nodeName;
                "SPAN" === b ? d.style.color = a : "IMG" !== b && (d.filled = "none" !== a, this.setAttr("fillcolor", this.renderer.color(a, d, c, this)))
            },
            "fill-opacitySetter": function (a, c, d) {
                F(this.renderer.prepVML(["<", c.split("-")[0], ' opacity="', a, '"/>']), null, null, d)
            },
            opacitySetter: z,
            rotationSetter: function (a, c, d) {
                d = d.style;
                this[c] = d[c] = a;
                d.left = -Math.round(Math.sin(a * g) + 1) + "px";
                d.top = Math.round(Math.cos(a * g)) + "px"
            },
            strokeSetter: function (a, c, d) {
                this.setAttr("strokecolor", this.renderer.color(a, d, c, this))
            },
            "stroke-widthSetter": function (a, c, d) {
                d.stroked = !!a;
                this[c] = a;
                f(a) && (a += "px");
                this.setAttr("strokeweight", a)
            },
            titleSetter: function (a, c) {
                this.setAttr(c, a)
            },
            visibilitySetter: function (a, c, d) {
                "inherit" === a && (a = "visible");
                this.shadows && q(this.shadows, function (d) {
                    d.style[c] = a
                });
                "DIV" === d.nodeName && (a = "hidden" === a ? "-999em" : 0, this.docMode8 || (d.style[c] = a ? "visible" : "hidden"), c = "top");
                d.style[c] = a
            },
            xSetter: function (a, c, d) {
                this[c] = a;
                "x" === c ? c = "left" : "y" === c && (c = "top");
                this.updateClipping ? (this[c] = a, this.updateClipping()) : d.style[c] = a
            },
            zIndexSetter: function (a, c, d) {
                d.style[c] = a
            }
        }, z["stroke-opacitySetter"] = z["fill-opacitySetter"], a.VMLElement = z = C(m, z), z.prototype.ySetter = z.prototype.widthSetter = z.prototype.heightSetter = z.prototype.xSetter, z = {
            Element: z,
            isIE8: -1 < H.navigator.userAgent.indexOf("MSIE 8.0"),
            init: function (a, c, d) {
                var b, m;
                this.alignedObjects = [];
                b = this.createElement("div").css({
                    position: "relative"
                });
                m = b.element;
                a.appendChild(b.element);
                this.isVML = !0;
                this.box = m;
                this.boxWrapper = b;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(c, d, !1);
                if (!l.namespaces.hcv) {
                    l.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
                    try {
                        l.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    } catch (r) {
                        l.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    }
                }
            },
            isHidden: function () {
                return !this.box.offsetWidth
            },
            clipRect: function (a, c, b, m) {
                var f = this.createElement(),
                    r = d(a);
                return h(f, {
                    members: [],
                    count: 0,
                    left: (r ? a.x : a) + 1,
                    top: (r ? a.y : c) + 1,
                    width: (r ? a.width : b) - 1,
                    height: (r ? a.height : m) - 1,
                    getCSS: function (a) {
                        var c = a.element,
                            e = c.nodeName,
                            p = a.inverted,
                            x = this.top - ("shape" === e ? c.offsetTop : 0),
                            d = this.left,
                            c = d + this.width,
                            r = x + this.height,
                            x = {
                                clip: "rect(" + Math.round(p ? d : x) + "px," + Math.round(p ? r : c) + "px," + Math.round(p ? c : r) + "px," + Math.round(p ? x : d) + "px)"
                            };
                        !p && a.docMode8 && "DIV" === e && h(x, {
                            width: c + "px",
                            height: r + "px"
                        });
                        return x
                    },
                    updateClipping: function () {
                        q(f.members, function (a) {
                            a.element && a.css(f.getCSS(a))
                        })
                    }
                })
            },
            color: function (c, d, b, m) {
                var h = this,
                    r, f = /^rgba/,
                    v, g, p = "none";
                c && c.linearGradient ? g = "gradient" : c && c.radialGradient && (g = "pattern");
                if (g) {
                    var x, A, L = c.linearGradient || c.radialGradient,
                        y, l, k, J, t, H = "";
                    c = c.stops;
                    var n, z = [],
                        C = function () {
                            v = ['<fill colors="' + z.join(",") + '" opacity="', k, '" o:opacity2="', l, '" type="', g, '" ', H, 'focus="100%" method="any" />'];
                            F(h.prepVML(v), null, null, d)
                        };
                    y = c[0];
                    n = c[c.length - 1];
                    0 < y[0] && c.unshift([0, y[1]]);
                    1 > n[0] && c.push([1, n[1]]);
                    q(c, function (p, c) {
                        f.test(p[1]) ? (r = a.color(p[1]), x = r.get("rgb"), A = r.get("a")) : (x = p[1], A = 1);
                        z.push(100 * p[0] + "% " + x);
                        c ? (k = A, J = x) : (l = A, t = x)
                    });
                    if ("fill" === b)
                        if ("gradient" === g) b = L.x1 || L[0] || 0, c = L.y1 || L[1] || 0, y = L.x2 || L[2] || 0, L = L.y2 || L[3] || 0, H = 'angle="' + (90 - 180 * Math.atan((L - c) / (y - b)) / Math.PI) + '"', C();
                        else {
                            var p = L.r,
                                T = 2 * p,
                                D = 2 * p,
                                U = L.cx,
                                V = L.cy,
                                M = d.radialReference,
                                S, p = function () {
                                    M && (S = m.getBBox(), U += (M[0] - S.x) / S.width - .5, V += (M[1] - S.y) / S.height - .5, T *= M[2] / S.width, D *= M[2] / S.height);
                                    H = 'src="' + a.getOptions().global.VMLRadialGradientURL + '" size="' + T + "," + D + '" origin="0.5,0.5" position="' + U + "," + V + '" color2="' + t + '" ';
                                    C()
                                };
                            m.added ? p() : m.onAdd = p;
                            p = J
                        }
                    else p = x
                } else f.test(c) && "IMG" !== d.tagName ? (r = a.color(c), m[b + "-opacitySetter"](r.get("a"), b, d), p = r.get("rgb")) : (p = d.getElementsByTagName(b), p.length && (p[0].opacity = 1, p[0].type = "solid"), p = c);
                return p
            },
            prepVML: function (a) {
                var c = this.isIE8;
                a = a.join("");
                c ? (a = a.replace("/>", ' xmlns="urn:schemas-microsoft-com:vml" />'), a = -1 === a.indexOf('style="') ? a.replace("/>", ' style="display:inline-block;behavior:url(#default#VML);" />') : a.replace('style="', 'style="display:inline-block;behavior:url(#default#VML);')) : a = a.replace("<", "<hcv:");
                return a
            },
            text: A.prototype.html,
            path: function (a) {
                var c = {
                    coordsize: "10 10"
                };
                b(a) ? c.d = a : d(a) && h(c, a);
                return this.createElement("shape").attr(c)
            },
            circle: function (a, c, b) {
                var m = this.symbol("circle");
                d(a) && (b = a.r, c = a.y, a = a.x);
                m.isCircle = !0;
                m.r = b;
                return m.attr({
                    x: a,
                    y: c
                })
            },
            g: function (a) {
                var c;
                a && (c = {
                    className: "highcharts-" + a,
                    "class": "highcharts-" + a
                });
                return this.createElement("div").attr(c)
            },
            image: function (a, c, d, b, m) {
                var r = this.createElement("img").attr({
                    src: a
                });
                1 < arguments.length && r.attr({
                    x: c,
                    y: d,
                    width: b,
                    height: m
                });
                return r
            },
            createElement: function (a) {
                return "rect" === a ? this.symbol(a) : A.prototype.createElement.call(this, a)
            },
            invertChild: function (a, c) {
                var d = this;
                c = c.style;
                var b = "IMG" === a.tagName && a.style;
                D(a, {
                    flip: "x",
                    left: y(c.width) - (b ? y(b.top) : 1),
                    top: y(c.height) - (b ? y(b.left) : 1),
                    rotation: -90
                });
                q(a.childNodes, function (c) {
                    d.invertChild(c, a)
                })
            },
            symbols: {
                arc: function (a, c, d, b, m) {
                    var r = m.start,
                        h = m.end,
                        f = m.r || d || b;
                    d = m.innerR;
                    b = Math.cos(r);
                    var v = Math.sin(r),
                        p = Math.cos(h),
                        x = Math.sin(h);
                    if (0 === h - r) return ["x"];
                    r = ["wa", a - f, c - f, a + f, c + f, a + f * b, c + f * v, a + f * p, c + f * x];
                    m.open && !d && r.push("e", "M", a, c);
                    r.push("at", a - d, c - d, a + d, c + d, a + d * p, c + d * x, a + d * b, c + d * v, "x", "e");
                    r.isArc = !0;
                    return r
                },
                circle: function (a, c, d, b, m) {
                    m && n(m.r) && (d = b = 2 * m.r);
                    m && m.isCircle && (a -= d / 2, c -= b / 2);
                    return ["wa", a, c, a + d, c + b, a + d, c + b / 2, a + d, c + b / 2, "e"]
                },
                rect: function (a, c, d, b, m) {
                    return A.prototype.symbols[n(m) && m.r ? "callout" : "square"].call(0, a, c, d, b, m)
                }
            }
        }, a.VMLRenderer = C = function () {
            this.init.apply(this, arguments)
        }, C.prototype = c(A.prototype, z), a.Renderer = C);
        A.prototype.measureSpanWidth = function (a, c) {
            var d = l.createElement("span");
            a = l.createTextNode(a);
            d.appendChild(a);
            D(d, c);
            this.box.appendChild(d);
            c = d.offsetWidth;
            k(d);
            return c
        }
    })(M);
    (function (a) {
        function C() {
            var g = a.defaultOptions.global,
                k = l.moment;
            if (g.timezone) {
                if (k) return function (a) {
                    return -k.tz(a, g.timezone).utcOffset()
                };
                a.error(25)
            }
            return g.useUTC && g.getTimezoneOffset
        }

        function z() {
            var g = a.defaultOptions.global,
                t, h = g.useUTC,
                b = h ? "getUTC" : "get",
                f = h ? "setUTC" : "set";
            a.Date = t = g.Date || l.Date;
            t.hcTimezoneOffset = h && g.timezoneOffset;
            t.hcGetTimezoneOffset = C();
            t.hcMakeTime = function (a, c, b, f, m, g) {
                var l;
                h ? (l = t.UTC.apply(0, arguments), l += n(l)) : l = (new t(a, c, k(b, 1), k(f, 0), k(m, 0), k(g, 0))).getTime();
                return l
            };
            D("Minutes Hours Day Date Month FullYear".split(" "), function (a) {
                t["hcGet" + a] = b + a
            });
            D("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "), function (a) {
                t["hcSet" + a] = f + a
            })
        }
        var F = a.color,
            D = a.each,
            n = a.getTZOffset,
            g = a.merge,
            k = a.pick,
            l = a.win;
        a.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {
                useUTC: !0,
                VMLRadialGradientURL: "http://code.highcharts.com/5.0.14/gfx/vml-radial-gradient.png"
            },
            chart: {
                borderRadius: 0,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {
                        zIndex: 20
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                widthAdjust: -44
            },
            plotOptions: {},
            labels: {
                style: {
                    position: "absolute",
                    color: "#333333"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                layout: "horizontal",
                labelFormatter: function () {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {
                    activeColor: "#003399",
                    inactiveColor: "#cccccc"
                },
                itemStyle: {
                    color: "#333333",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textOverflow: "ellipsis"
                },
                itemHoverStyle: {
                    color: "#000000"
                },
                itemHiddenStyle: {
                    color: "#cccccc"
                },
                shadow: !1,
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative",
                    top: "45%"
                },
                style: {
                    position: "absolute",
                    backgroundColor: "#ffffff",
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                backgroundColor: F("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y}</b><br/>',
                shadow: !0,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "http://www.highcharts.com",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                style: {
                    cursor: "pointer",
                    color: "#999999",
                    fontSize: "9px"
                },
                text: "Highcharts.com"
            }
        };
        a.setOptions = function (l) {
            a.defaultOptions = g(!0, a.defaultOptions, l);
            z();
            return a.defaultOptions
        };
        a.getOptions = function () {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        z()
    })(M);
    (function (a) {
        var C = a.correctFloat,
            z = a.defined,
            F = a.destroyObjectProperties,
            D = a.isNumber,
            n = a.merge,
            g = a.pick,
            k = a.deg2rad;
        a.Tick = function (a, g, k, h) {
            this.axis = a;
            this.pos = g;
            this.type = k || "";
            this.isNewLabel = this.isNew = !0;
            k || h || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function () {
                var a = this.axis,
                    k = a.options,
                    t = a.chart,
                    h = a.categories,
                    b = a.names,
                    f = this.pos,
                    d = k.labels,
                    c = a.tickPositions,
                    v = f === c[0],
                    y = f === c[c.length - 1],
                    b = h ? g(h[f], b[f], f) : f,
                    h = this.label,
                    c = c.info,
                    m;
                a.isDatetimeAxis && c && (m = k.dateTimeLabelFormats[c.higherRanks[f] || c.unitName]);
                this.isFirst = v;
                this.isLast = y;
                k = a.labelFormatter.call({
                    axis: a,
                    chart: t,
                    isFirst: v,
                    isLast: y,
                    dateTimeLabelFormat: m,
                    value: a.isLog ? C(a.lin2log(b)) : b,
                    pos: f
                });
                z(h) ? h && h.attr({
                    text: k
                }) : (this.labelLength = (this.label = h = z(k) && d.enabled ? t.renderer.text(k, 0, 0, d.useHTML).css(n(d.style)).add(a.labelGroup) : null) && h.getBBox().width, this.rotation = 0)
            },
            getLabelSize: function () {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            },
            handleOverflow: function (a) {
                var q = this.axis,
                    t = a.x,
                    h = q.chart.chartWidth,
                    b = q.chart.spacing,
                    f = g(q.labelLeft, Math.min(q.pos, b[3])),
                    b = g(q.labelRight, Math.max(q.pos + q.len, h - b[1])),
                    d = this.label,
                    c = this.rotation,
                    v = {
                        left: 0,
                        center: .5,
                        right: 1
                    } [q.labelAlign],
                    y = d.getBBox().width,
                    m = q.getSlotWidth(),
                    A = m,
                    H = 1,
                    e, E = {};
                if (c) 0 > c && t - v * y < f ? e = Math.round(t / Math.cos(c * k) - f) : 0 < c && t + v * y > b && (e = Math.round((h - t) / Math.cos(c * k)));
                else if (h = t + (1 - v) * y, t - v * y < f ? A = a.x + A * (1 - v) - f : h > b && (A = b - a.x + A * v, H = -1), A = Math.min(m, A), A < m && "center" === q.labelAlign && (a.x += H * (m - A - v * (m - Math.min(y, A)))), y > A || q.autoRotation && (d.styles || {}).width) e = A;
                e && (E.width = e, (q.options.labels.style || {}).textOverflow || (E.textOverflow = "ellipsis"), d.css(E))
            },
            getPosition: function (a, g, k, h) {
                var b = this.axis,
                    f = b.chart,
                    d = h && f.oldChartHeight || f.chartHeight;
                return {
                    x: a ? b.translate(g + k, null, null, h) + b.transB : b.left + b.offset + (b.opposite ? (h && f.oldChartWidth || f.chartWidth) - b.right - b.left : 0),
                    y: a ? d - b.bottom + b.offset - (b.opposite ? b.height : 0) : d - b.translate(g + k, null, null, h) - b.transB
                }
            },
            getLabelPosition: function (a, g, t, h, b, f, d, c) {
                var v = this.axis,
                    y = v.transA,
                    m = v.reversed,
                    A = v.staggerLines,
                    H = v.tickRotCorr || {
                        x: 0,
                        y: 0
                    },
                    e = b.y;
                z(e) || (e = 0 === v.side ? t.rotation ? -8 : -t.getBBox().height : 2 === v.side ? H.y + 8 : Math.cos(t.rotation * k) * (H.y - t.getBBox(!1, 0).height / 2));
                a = a + b.x + H.x - (f && h ? f * y * (m ? -1 : 1) : 0);
                g = g + e - (f && !h ? f * y * (m ? 1 : -1) : 0);
                A && (t = d / (c || 1) % A, v.opposite && (t = A - t - 1), g += v.labelOffset / A * t);
                return {
                    x: a,
                    y: Math.round(g)
                }
            },
            getMarkPath: function (a, g, k, h, b, f) {
                return f.crispLine(["M", a, g, "L", a + (b ? 0 : -k), g + (b ? k : 0)], h)
            },
            renderGridLine: function (a, g, k) {
                var h = this.axis,
                    b = h.options,
                    f = this.gridLine,
                    d = {},
                    c = this.pos,
                    v = this.type,
                    y = h.tickmarkOffset,
                    m = h.chart.renderer,
                    A = v ? v + "Grid" : "grid",
                    H = b[A + "LineWidth"],
                    e = b[A + "LineColor"],
                    b = b[A + "LineDashStyle"];
                f || (d.stroke = e, d["stroke-width"] = H, b && (d.dashstyle = b), v || (d.zIndex = 1), a && (d.opacity = 0), this.gridLine = f = m.path().attr(d).addClass("highcharts-" + (v ? v + "-" : "") + "grid-line").add(h.gridGroup));
                if (!a && f && (a = h.getPlotLinePath(c + y, f.strokeWidth() * k, a, !0))) f[this.isNew ? "attr" : "animate"]({
                    d: a,
                    opacity: g
                })
            },
            renderMark: function (a, k, t) {
                var h = this.axis,
                    b = h.options,
                    f = h.chart.renderer,
                    d = this.type,
                    c = d ? d + "Tick" : "tick",
                    v = h.tickSize(c),
                    y = this.mark,
                    m = !y,
                    A = a.x;
                a = a.y;
                var H = g(b[c + "Width"], !d && h.isXAxis ? 1 : 0),
                    b = b[c + "Color"];
                v && (h.opposite && (v[0] = -v[0]), m && (this.mark = y = f.path().addClass("highcharts-" + (d ? d + "-" : "") + "tick").add(h.axisGroup), y.attr({
                    stroke: b,
                    "stroke-width": H
                })), y[m ? "attr" : "animate"]({
                    d: this.getMarkPath(A, a, v[0], y.strokeWidth() * t, h.horiz, f),
                    opacity: k
                }))
            },
            renderLabel: function (a, k, t, h) {
                var b = this.axis,
                    f = b.horiz,
                    d = b.options,
                    c = this.label,
                    v = d.labels,
                    y = v.step,
                    m = b.tickmarkOffset,
                    A = !0,
                    H = a.x;
                a = a.y;
                c && D(H) && (c.xy = a = this.getLabelPosition(H, a, c, f, v, m, h, y), this.isFirst && !this.isLast && !g(d.showFirstLabel, 1) || this.isLast && !this.isFirst && !g(d.showLastLabel, 1) ? A = !1 : !f || b.isRadial || v.step || v.rotation || k || 0 === t || this.handleOverflow(a), y && h % y && (A = !1), A && D(a.y) ? (a.opacity = t, c[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) : (c.attr("y", -9999), this.isNewLabel = !0), this.isNew = !1)
            },
            render: function (a, k, t) {
                var h = this.axis,
                    b = h.horiz,
                    f = this.getPosition(b, this.pos, h.tickmarkOffset, k),
                    d = f.x,
                    c = f.y,
                    h = b && d === h.pos + h.len || !b && c === h.pos ? -1 : 1;
                t = g(t, 1);
                this.isActive = !0;
                this.renderGridLine(k, t, h);
                this.renderMark(f, t, h);
                this.renderLabel(f, k, t, a)
            },
            destroy: function () {
                F(this, this.axis)
            }
        }
    })(M);
    var R = function (a) {
        var C = a.addEvent,
            z = a.animObject,
            F = a.arrayMax,
            D = a.arrayMin,
            n = a.color,
            g = a.correctFloat,
            k = a.defaultOptions,
            l = a.defined,
            q = a.deg2rad,
            t = a.destroyObjectProperties,
            h = a.each,
            b = a.extend,
            f = a.fireEvent,
            d = a.format,
            c = a.getMagnitude,
            v = a.grep,
            y = a.inArray,
            m = a.isArray,
            A = a.isNumber,
            H = a.isString,
            e = a.merge,
            E = a.normalizeTickInterval,
            u = a.objectEach,
            w = a.pick,
            I = a.removeEvent,
            r = a.splat,
            B = a.syncTimeout,
            G = a.Tick,
            K = function () {
                this.init.apply(this, arguments)
            };
        a.extend(K.prototype, {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y"
                },
                endOnTick: !1,
                labels: {
                    enabled: !0,
                    style: {
                        color: "#666666",
                        cursor: "default",
                        fontSize: "11px"
                    },
                    x: 0
                },
                minPadding: .01,
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                title: {
                    align: "middle",
                    style: {
                        color: "#666666"
                    }
                },
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                maxPadding: .05,
                minPadding: .05,
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    allowOverlap: !1,
                    enabled: !1,
                    formatter: function () {
                        return a.numberFormat(this.total, -1)
                    },
                    style: {
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: "#000000",
                        textOutline: "1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            },
            defaultRightAxisOptions: {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            },
            defaultBottomAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            defaultTopAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            init: function (a, c) {
                var d = c.isX,
                    b = this;
                b.chart = a;
                b.horiz = a.inverted && !b.isZAxis ? !d : d;
                b.isXAxis = d;
                b.coll = b.coll || (d ? "xAxis" : "yAxis");
                b.opposite = c.opposite;
                b.side = c.side || (b.horiz ? b.opposite ? 0 : 2 : b.opposite ? 1 : 3);
                b.setOptions(c);
                var e = this.options,
                    m = e.type;
                b.labelFormatter = e.labels.formatter || b.defaultLabelFormatter;
                b.userOptions = c;
                b.minPixelPadding = 0;
                b.reversed = e.reversed;
                b.visible = !1 !== e.visible;
                b.zoomEnabled = !1 !== e.zoomEnabled;
                b.hasNames = "category" === m || !0 === e.categories;
                b.categories = e.categories || b.hasNames;
                b.names = b.names || [];
                b.plotLinesAndBandsGroups = {};
                b.isLog = "logarithmic" === m;
                b.isDatetimeAxis = "datetime" === m;
                b.positiveValuesOnly = b.isLog && !b.allowNegativeLog;
                b.isLinked = l(e.linkedTo);
                b.ticks = {};
                b.labelEdge = [];
                b.minorTicks = {};
                b.plotLinesAndBands = [];
                b.alternateBands = {};
                b.len = 0;
                b.minRange = b.userMinRange = e.minRange || e.maxZoom;
                b.range = e.range;
                b.offset = e.offset || 0;
                b.stacks = {};
                b.oldStacks = {};
                b.stacksTouched = 0;
                b.max = null;
                b.min = null;
                b.crosshair = w(e.crosshair, r(a.options.tooltip.crosshairs)[d ? 0 : 1], !1);
                c = b.options.events; - 1 === y(b, a.axes) && (d ? a.axes.splice(a.xAxis.length, 0, b) : a.axes.push(b), a[b.coll].push(b));
                b.series = b.series || [];
                a.inverted && !b.isZAxis && d && void 0 === b.reversed && (b.reversed = !0);
                u(c, function (a, p) {
                    C(b, p, a)
                });
                b.lin2log = e.linearToLogConverter || b.lin2log;
                b.isLog && (b.val2lin = b.log2lin, b.lin2val = b.lin2log)
            },
            setOptions: function (a) {
                this.options = e(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], e(k[this.coll], a))
            },
            defaultLabelFormatter: function () {
                var p = this.axis,
                    c = this.value,
                    b = p.categories,
                    e = this.dateTimeLabelFormat,
                    r = k.lang,
                    m = r.numericSymbols,
                    r = r.numericSymbolMagnitude || 1E3,
                    h = m && m.length,
                    f, u = p.options.labels.format,
                    p = p.isLog ? Math.abs(c) : p.tickInterval;
                if (u) f = d(u, this);
                else if (b) f = c;
                else if (e) f = a.dateFormat(e, c);
                else if (h && 1E3 <= p)
                    for (; h-- && void 0 === f;) b = Math.pow(r, h + 1), p >= b && 0 === 10 * c % b && null !== m[h] && 0 !== c && (f = a.numberFormat(c / b, -1) + m[h]);
                void 0 === f && (f = 1E4 <= Math.abs(c) ? a.numberFormat(c, -1) : a.numberFormat(c, -1, void 0, ""));
                return f
            },
            getSeriesExtremes: function () {
                var a = this,
                    c = a.chart;
                a.hasVisibleSeries = !1;
                a.dataMin = a.dataMax = a.threshold = null;
                a.softThreshold = !a.isXAxis;
                a.buildStacks && a.buildStacks();
                h(a.series, function (b) {
                    if (b.visible || !c.options.chart.ignoreHiddenSeries) {
                        var d = b.options,
                            e = d.threshold,
                            r;
                        a.hasVisibleSeries = !0;
                        a.positiveValuesOnly && 0 >= e && (e = null);
                        if (a.isXAxis) d = b.xData, d.length && (b = D(d), A(b) || b instanceof Date || (d = v(d, function (a) {
                            return A(a)
                        }), b = D(d)), a.dataMin = Math.min(w(a.dataMin, d[0]), b), a.dataMax = Math.max(w(a.dataMax, d[0]), F(d)));
                        else if (b.getExtremes(), r = b.dataMax, b = b.dataMin, l(b) && l(r) && (a.dataMin = Math.min(w(a.dataMin, b), b), a.dataMax = Math.max(w(a.dataMax, r), r)), l(e) && (a.threshold = e), !d.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
                    }
                })
            },
            translate: function (a, c, b, d, e, r) {
                var m = this.linkedParent || this,
                    h = 1,
                    f = 0,
                    u = d ? m.oldTransA : m.transA;
                d = d ? m.oldMin : m.min;
                var v = m.minPixelPadding;
                e = (m.isOrdinal || m.isBroken || m.isLog && e) && m.lin2val;
                u || (u = m.transA);
                b && (h *= -1, f = m.len);
                m.reversed && (h *= -1, f -= h * (m.sector || m.len));
                c ? (a = (a * h + f - v) / u + d, e && (a = m.lin2val(a))) : (e && (a = m.val2lin(a)), a = h * (a - d) * u + f + h * v + (A(r) ? u * r : 0));
                return a
            },
            toPixels: function (a, c) {
                return this.translate(a, !1, !this.horiz, null, !0) + (c ? 0 : this.pos)
            },
            toValue: function (a, c) {
                return this.translate(a - (c ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function (a, c, b, d, e) {
                var r = this.chart,
                    m = this.left,
                    h = this.top,
                    f, u, v = b && r.oldChartHeight || r.chartHeight,
                    g = b && r.oldChartWidth || r.chartWidth,
                    B;
                f = this.transB;
                var y = function (a, p, c) {
                    if (a < p || a > c) d ? a = Math.min(Math.max(p, a), c) : B = !0;
                    return a
                };
                e = w(e, this.translate(a, null, null, b));
                a = b = Math.round(e + f);
                f = u = Math.round(v - e - f);
                A(e) ? this.horiz ? (f = h, u = v - this.bottom, a = b = y(a, m, m + this.width)) : (a = m, b = g - this.right, f = u = y(f, h, h + this.height)) : B = !0;
                return B && !d ? null : r.renderer.crispLine(["M", a, f, "L", b, u], c || 1)
            },
            getLinearTickPositions: function (a, c, b) {
                var d, e = g(Math.floor(c / a) * a);
                b = g(Math.ceil(b / a) * a);
                var r = [];
                if (this.single) return [c];
                for (c = e; c <= b;) {
                    r.push(c);
                    c = g(c + a);
                    if (c === d) break;
                    d = c
                }
                return r
            },
            getMinorTickPositions: function () {
                var a = this,
                    c = a.options,
                    b = a.tickPositions,
                    d = a.minorTickInterval,
                    e = [],
                    r = a.pointRangePadding || 0,
                    m = a.min - r,
                    r = a.max + r,
                    f = r - m;
                if (f && f / d < a.len / 3)
                    if (a.isLog) h(this.paddedTicks, function (c, b, x) {
                        b && e.push.apply(e, a.getLogTickPositions(d, x[b - 1], x[b], !0))
                    });
                    else if (a.isDatetimeAxis && "auto" === c.minorTickInterval) e = e.concat(a.getTimeTicks(a.normalizeTimeTickInterval(d), m, r, c.startOfWeek));
                else
                    for (c = m + (b[0] - m) % d; c <= r && c !== e[0]; c += d) e.push(c);
                0 !== e.length && a.trimTicks(e);
                return e
            },
            adjustForMinRange: function () {
                var a = this.options,
                    c = this.min,
                    b = this.max,
                    d, e, r, m, f, u, v;
                this.isXAxis && void 0 === this.minRange && !this.isLog && (l(a.min) || l(a.max) ? this.minRange = null : (h(this.series, function (a) {
                    u = a.xData;
                    for (m = a.xIncrement ? 1 : u.length - 1; 0 < m; m--)
                        if (f = u[m] - u[m - 1], void 0 === r || f < r) r = f
                }), this.minRange = Math.min(5 * r, this.dataMax - this.dataMin)));
                b - c < this.minRange && (e = this.dataMax - this.dataMin >= this.minRange, v = this.minRange, d = (v - b + c) / 2, d = [c - d, w(a.min, c - d)], e && (d[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), c = F(d), b = [c + v, w(a.max, c + v)], e && (b[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), b = D(b), b - c < v && (d[0] = b - v, d[1] = w(a.min, b - v), c = F(d)));
                this.min = c;
                this.max = b
            },
            getClosest: function () {
                var a;
                this.categories ? a = 1 : h(this.series, function (c) {
                    var b = c.closestPointRange,
                        d = c.visible || !c.chart.options.chart.ignoreHiddenSeries;
                    !c.noSharedTooltip && l(b) && d && (a = l(a) ? Math.min(a, b) : b)
                });
                return a
            },
            nameToX: function (a) {
                var c = m(this.categories),
                    b = c ? this.categories : this.names,
                    d = a.options.x,
                    e;
                a.series.requireSorting = !1;
                l(d) || (d = !1 === this.options.uniqueNames ? a.series.autoIncrement() : y(a.name, b)); - 1 === d ? c || (e = b.length) : e = d;
                void 0 !== e && (this.names[e] = a.name);
                return e
            },
            updateNames: function () {
                var a = this;
                0 < this.names.length && (this.names.length = 0, this.minRange = this.userMinRange, h(this.series || [], function (c) {
                    c.xIncrement = null;
                    if (!c.points || c.isDirtyData) c.processData(), c.generatePoints();
                    h(c.points, function (b, d) {
                        var e;
                        b.options && (e = a.nameToX(b), void 0 !== e && e !== b.x && (b.x = e, c.xData[d] = e))
                    })
                }))
            },
            setAxisTranslation: function (a) {
                var c = this,
                    b = c.max - c.min,
                    d = c.axisPointRange || 0,
                    e, r = 0,
                    m = 0,
                    f = c.linkedParent,
                    u = !!c.categories,
                    v = c.transA,
                    g = c.isXAxis;
                if (g || u || d) e = c.getClosest(), f ? (r = f.minPointOffset, m = f.pointRangePadding) : h(c.series, function (a) {
                    var p = u ? 1 : g ? w(a.options.pointRange, e, 0) : c.axisPointRange || 0;
                    a = a.options.pointPlacement;
                    d = Math.max(d, p);
                    c.single || (r = Math.max(r, H(a) ? 0 : p / 2), m = Math.max(m, "on" === a ? 0 : p))
                }), f = c.ordinalSlope && e ? c.ordinalSlope / e : 1, c.minPointOffset = r *= f, c.pointRangePadding = m *= f, c.pointRange = Math.min(d, b), g && (c.closestPointRange = e);
                a && (c.oldTransA = v);
                c.translationSlope = c.transA = v = c.options.staticScale || c.len / (b + m || 1);
                c.transB = c.horiz ? c.left : c.bottom;
                c.minPixelPadding = v * r
            },
            minFromRange: function () {
                return this.max - this.range
            },
            setTickInterval: function (p) {
                var b = this,
                    d = b.chart,
                    e = b.options,
                    r = b.isLog,
                    m = b.log2lin,
                    u = b.isDatetimeAxis,
                    v = b.isXAxis,
                    B = b.isLinked,
                    y = e.maxPadding,
                    k = e.minPadding,
                    G = e.tickInterval,
                    t = e.tickPixelInterval,
                    H = b.categories,
                    q = b.threshold,
                    n = b.softThreshold,
                    K, I, z, C;
                u || H || B || this.getTickAmount();
                z = w(b.userMin, e.min);
                C = w(b.userMax, e.max);
                B ? (b.linkedParent = d[b.coll][e.linkedTo], d = b.linkedParent.getExtremes(), b.min = w(d.min, d.dataMin), b.max = w(d.max, d.dataMax), e.type !== b.linkedParent.options.type && a.error(11, 1)) : (!n && l(q) && (b.dataMin >= q ? (K = q, k = 0) : b.dataMax <= q && (I = q, y = 0)), b.min = w(z, K, b.dataMin), b.max = w(C, I, b.dataMax));
                r && (b.positiveValuesOnly && !p && 0 >= Math.min(b.min, w(b.dataMin, b.min)) && a.error(10, 1), b.min = g(m(b.min), 15), b.max = g(m(b.max), 15));
                b.range && l(b.max) && (b.userMin = b.min = z = Math.max(b.dataMin, b.minFromRange()), b.userMax = C = b.max, b.range = null);
                f(b, "foundExtremes");
                b.beforePadding && b.beforePadding();
                b.adjustForMinRange();
                !(H || b.axisPointRange || b.usePercentage || B) && l(b.min) && l(b.max) && (m = b.max - b.min) && (!l(z) && k && (b.min -= m * k), !l(C) && y && (b.max += m * y));
                A(e.softMin) && (b.min = Math.min(b.min, e.softMin));
                A(e.softMax) && (b.max = Math.max(b.max, e.softMax));
                A(e.floor) && (b.min = Math.max(b.min, e.floor));
                A(e.ceiling) && (b.max = Math.min(b.max, e.ceiling));
                n && l(b.dataMin) && (q = q || 0, !l(z) && b.min < q && b.dataMin >= q ? b.min = q : !l(C) && b.max > q && b.dataMax <= q && (b.max = q));
                b.tickInterval = b.min === b.max || void 0 === b.min || void 0 === b.max ? 1 : B && !G && t === b.linkedParent.options.tickPixelInterval ? G = b.linkedParent.tickInterval : w(G, this.tickAmount ? (b.max - b.min) / Math.max(this.tickAmount - 1, 1) : void 0, H ? 1 : (b.max - b.min) * t / Math.max(b.len, t));
                v && !p && h(b.series, function (a) {
                    a.processData(b.min !== b.oldMin || b.max !== b.oldMax)
                });
                b.setAxisTranslation(!0);
                b.beforeSetTickPositions && b.beforeSetTickPositions();
                b.postProcessTickInterval && (b.tickInterval = b.postProcessTickInterval(b.tickInterval));
                b.pointRange && !G && (b.tickInterval = Math.max(b.pointRange, b.tickInterval));
                p = w(e.minTickInterval, b.isDatetimeAxis && b.closestPointRange);
                !G && b.tickInterval < p && (b.tickInterval = p);
                u || r || G || (b.tickInterval = E(b.tickInterval, null, c(b.tickInterval), w(e.allowDecimals, !(.5 < b.tickInterval && 5 > b.tickInterval && 1E3 < b.max && 9999 > b.max)), !!this.tickAmount));
                this.tickAmount || (b.tickInterval = b.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function () {
                var a = this.options,
                    b, c = a.tickPositions,
                    d = a.tickPositioner,
                    e = a.startOnTick,
                    r = a.endOnTick;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === a.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : a.minorTickInterval;
                this.single = this.min === this.max && l(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);
                this.tickPositions = b = c && c.slice();
                !b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()]), this.tickPositions = b, d && (d = d.apply(this, [this.min, this.max]))) && (this.tickPositions = b = d);
                this.paddedTicks = b.slice(0);
                this.trimTicks(b, e, r);
                this.isLinked || (this.single && 2 > b.length && (this.min -= .5, this.max += .5), c || d || this.adjustTickAmount())
            },
            trimTicks: function (a, b, c) {
                var d = a[0],
                    e = a[a.length - 1],
                    r = this.minPointOffset || 0;
                if (!this.isLinked) {
                    if (b && -Infinity !== d) this.min = d;
                    else
                        for (; this.min - r > a[0];) a.shift();
                    if (c) this.max = e;
                    else
                        for (; this.max + r < a[a.length - 1];) a.pop();
                    0 === a.length && l(d) && a.push((e + d) / 2)
                }
            },
            alignToOthers: function () {
                var a = {},
                    b, c = this.options;
                !1 === this.chart.options.chart.alignTicks || !1 === c.alignTicks || this.isLog || h(this.chart[this.coll], function (c) {
                    var d = c.options,
                        d = [c.horiz ? d.left : d.top, d.width, d.height, d.pane].join();
                    c.series.length && (a[d] ? b = !0 : a[d] = 1)
                });
                return b
            },
            getTickAmount: function () {
                var a = this.options,
                    b = a.tickAmount,
                    c = a.tickPixelInterval;
                !l(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() && (b = Math.ceil(this.len / c) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount = b
            },
            adjustTickAmount: function () {
                var a = this.tickInterval,
                    b = this.tickPositions,
                    c = this.tickAmount,
                    d = this.finalTickAmt,
                    e = b && b.length;
                if (e < c) {
                    for (; b.length < c;) b.push(g(b[b.length - 1] + a));
                    this.transA *= (e - 1) / (c - 1);
                    this.max = b[b.length - 1]
                } else e > c && (this.tickInterval *= 2, this.setTickPositions());
                if (l(d)) {
                    for (a = c = b.length; a--;)(3 === d && 1 === a % 2 || 2 >= d && 0 < a && a < c - 1) && b.splice(a, 1);
                    this.finalTickAmt = void 0
                }
            },
            setScale: function () {
                var a, b;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                b = this.len !== this.oldAxisLength;
                h(this.series, function (b) {
                    if (b.isDirtyData || b.isDirty || b.xAxis.isDirty) a = !0
                });
                b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
            },
            setExtremes: function (a, c, d, e, r) {
                var m = this,
                    u = m.chart;
                d = w(d, !0);
                h(m.series, function (a) {
                    delete a.kdTree
                });
                r = b(r, {
                    min: a,
                    max: c
                });
                f(m, "setExtremes", r, function () {
                    m.userMin = a;
                    m.userMax = c;
                    m.eventArgs = r;
                    d && u.redraw(e)
                })
            },
            zoom: function (a, b) {
                var c = this.dataMin,
                    d = this.dataMax,
                    e = this.options,
                    r = Math.min(c, w(e.min, c)),
                    e = Math.max(d, w(e.max, d));
                if (a !== this.min || b !== this.max) this.allowZoomOutside || (l(c) && (a < r && (a = r), a > e && (a = e)), l(d) && (b < r && (b = r), b > e && (b = e))), this.displayBtn = void 0 !== a || void 0 !== b, this.setExtremes(a, b, !1, void 0, {
                    trigger: "zoom"
                });
                return !0
            },
            setAxisSize: function () {
                var b = this.chart,
                    c = this.options,
                    d = c.offsets || [0, 0, 0, 0],
                    e = this.horiz,
                    r = this.width = Math.round(a.relativeLength(w(c.width, b.plotWidth - d[3] + d[1]), b.plotWidth)),
                    m = this.height = Math.round(a.relativeLength(w(c.height, b.plotHeight - d[0] + d[2]), b.plotHeight)),
                    f = this.top = Math.round(a.relativeLength(w(c.top, b.plotTop + d[0]), b.plotHeight, b.plotTop)),
                    c = this.left = Math.round(a.relativeLength(w(c.left, b.plotLeft + d[3]), b.plotWidth, b.plotLeft));
                this.bottom = b.chartHeight - m - f;
                this.right = b.chartWidth - r - c;
                this.len = Math.max(e ? r : m, 0);
                this.pos = e ? c : f
            },
            getExtremes: function () {
                var a = this.isLog,
                    b = this.lin2log;
                return {
                    min: a ? g(b(this.min)) : this.min,
                    max: a ? g(b(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function (a) {
                var b = this.isLog,
                    c = this.lin2log,
                    d = b ? c(this.min) : this.min,
                    b = b ? c(this.max) : this.max;
                null === a ? a = d : d > a ? a = d : b < a && (a = b);
                return this.translate(a, 0, 1, 0, 1)
            },
            autoLabelAlign: function (a) {
                a = (w(a, 0) - 90 * this.side + 720) % 360;
                return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
            },
            tickSize: function (a) {
                var b = this.options,
                    c = b[a + "Length"],
                    d = w(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                if (d && c) return "inside" === b[a + "Position"] && (c = -c), [c, d]
            },
            labelMetrics: function () {
                var a = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
            },
            unsquish: function () {
                var a = this.options.labels,
                    b = this.horiz,
                    c = this.tickInterval,
                    d = c,
                    e = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / c),
                    r, m = a.rotation,
                    f = this.labelMetrics(),
                    u, v = Number.MAX_VALUE,
                    g, B = function (a) {
                        a /= e || 1;
                        a = 1 < a ? Math.ceil(a) : 1;
                        return a * c
                    };
                b ? (g = !a.staggerLines && !a.step && (l(m) ? [m] : e < w(a.autoRotationLimit, 80) && a.autoRotation)) && h(g, function (a) {
                    var b;
                    if (a === m || a && -90 <= a && 90 >= a) u = B(Math.abs(f.h / Math.sin(q * a))), b = u + Math.abs(a / 360), b < v && (v = b, r = a, d = u)
                }) : a.step || (d = B(f.h));
                this.autoRotation = g;
                this.labelRotation = w(r, m);
                return d
            },
            getSlotWidth: function () {
                var a = this.chart,
                    b = this.horiz,
                    c = this.options.labels,
                    d = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    e = a.margin[3];
                return b && 2 > (c.step || 0) && !c.rotation && (this.staggerLines || 1) * this.len / d || !b && (e && e - a.spacing[3] || .33 * a.chartWidth)
            },
            renderUnsquish: function () {
                var a = this.chart,
                    b = a.renderer,
                    c = this.tickPositions,
                    d = this.ticks,
                    r = this.options.labels,
                    m = this.horiz,
                    f = this.getSlotWidth(),
                    u = Math.max(1, Math.round(f - 2 * (r.padding || 5))),
                    v = {},
                    g = this.labelMetrics(),
                    B = r.style && r.style.textOverflow,
                    y, k = 0,
                    A, G;
                H(r.rotation) || (v.rotation = r.rotation || 0);
                h(c, function (a) {
                    (a = d[a]) && a.labelLength > k && (k = a.labelLength)
                });
                this.maxLabelLength = k;
                if (this.autoRotation) k > u && k > g.h ? v.rotation = this.labelRotation : this.labelRotation = 0;
                else if (f && (y = {
                        width: u + "px"
                    }, !B))
                    for (y.textOverflow = "clip", A = c.length; !m && A--;)
                        if (G = c[A], u = d[G].label) u.styles && "ellipsis" === u.styles.textOverflow ? u.css({
                            textOverflow: "clip"
                        }) : d[G].labelLength > f && u.css({
                            width: f + "px"
                        }), u.getBBox().height > this.len / c.length - (g.h - g.f) && (u.specCss = {
                            textOverflow: "ellipsis"
                        });
                v.rotation && (y = {
                    width: (k > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight) + "px"
                }, B || (y.textOverflow = "ellipsis"));
                if (this.labelAlign = r.align || this.autoLabelAlign(this.labelRotation)) v.align = this.labelAlign;
                h(c, function (a) {
                    var b = (a = d[a]) && a.label;
                    b && (b.attr(v), y && b.css(e(y, b.specCss)), delete b.specCss, a.rotation = v.rotation)
                });
                this.tickRotCorr = b.rotCorr(g.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function () {
                return this.hasVisibleSeries || l(this.min) && l(this.max) && !!this.tickPositions
            },
            addTitle: function (a) {
                var b = this.chart.renderer,
                    c = this.horiz,
                    d = this.opposite,
                    e = this.options.title,
                    r;
                this.axisTitle || ((r = e.textAlign) || (r = (c ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: d ? "right" : "left",
                    middle: "center",
                    high: d ? "left" : "right"
                })[e.align]), this.axisTitle = b.text(e.text, 0, 0, e.useHTML).attr({
                    zIndex: 7,
                    rotation: e.rotation || 0,
                    align: r
                }).addClass("highcharts-axis-title").css(e.style).add(this.axisGroup), this.axisTitle.isNew = !0);
                e.style.width || this.isRadial || this.axisTitle.css({
                    width: this.len
                });
                this.axisTitle[a ? "show" : "hide"](!0)
            },
            generateTick: function (a) {
                var b = this.ticks;
                b[a] ? b[a].addLabel() : b[a] = new G(this, a)
            },
            getOffset: function () {
                var a = this,
                    b = a.chart,
                    c = b.renderer,
                    d = a.options,
                    e = a.tickPositions,
                    r = a.ticks,
                    m = a.horiz,
                    f = a.side,
                    v = b.inverted && !a.isZAxis ? [1, 0, 3, 2][f] : f,
                    g, B, y = 0,
                    k, A = 0,
                    G = d.title,
                    E = d.labels,
                    t = 0,
                    q = b.axisOffset,
                    b = b.clipOffset,
                    H = [-1, 1, 1, -1][f],
                    n = d.className,
                    K = a.axisParent,
                    I = this.tickSize("tick");
                g = a.hasData();
                a.showAxis = B = g || w(d.showEmpty, !0);
                a.staggerLines = a.horiz && E.staggerLines;
                a.axisGroup || (a.gridGroup = c.g("grid").attr({
                    zIndex: d.gridZIndex || 1
                }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (n || "")).add(K), a.axisGroup = c.g("axis").attr({
                    zIndex: d.zIndex || 2
                }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (n || "")).add(K), a.labelGroup = c.g("axis-labels").attr({
                    zIndex: E.zIndex || 7
                }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (n || "")).add(K));
                g || a.isLinked ? (h(e, function (b, c) {
                    a.generateTick(b, c)
                }), a.renderUnsquish(), !1 === E.reserveSpace || 0 !== f && 2 !== f && {
                    1: "left",
                    3: "right"
                } [f] !== a.labelAlign && "center" !== a.labelAlign || h(e, function (a) {
                    t = Math.max(r[a].getLabelSize(), t)
                }), a.staggerLines && (t *= a.staggerLines, a.labelOffset = t * (a.opposite ? -1 : 1))) : u(r, function (a, b) {
                    a.destroy();
                    delete r[b]
                });
                G && G.text && !1 !== G.enabled && (a.addTitle(B), B && !1 !== G.reserveSpace && (a.titleOffset = y = a.axisTitle.getBBox()[m ? "height" : "width"], k = G.offset, A = l(k) ? 0 : w(G.margin, m ? 5 : 10)));
                a.renderLine();
                a.offset = H * w(d.offset, q[f]);
                a.tickRotCorr = a.tickRotCorr || {
                    x: 0,
                    y: 0
                };
                c = 0 === f ? -a.labelMetrics().h : 2 === f ? a.tickRotCorr.y : 0;
                A = Math.abs(t) + A;
                t && (A = A - c + H * (m ? w(E.y, a.tickRotCorr.y + 8 * H) : E.x));
                a.axisTitleMargin = w(k, A);
                q[f] = Math.max(q[f], a.axisTitleMargin + y + H * a.offset, A, g && e.length && I ? I[0] + H * a.offset : 0);
                e = 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                0 < d.offset && (e -= 2 * d.offset);
                b[v] = Math.max(b[v] || e, e)
            },
            getLinePath: function (a) {
                var b = this.chart,
                    c = this.opposite,
                    d = this.offset,
                    e = this.horiz,
                    r = this.left + (c ? this.width : 0) + d,
                    d = b.chartHeight - this.bottom - (c ? this.height : 0) + d;
                c && (a *= -1);
                return b.renderer.crispLine(["M", e ? this.left : r, e ? d : this.top, "L", e ? b.chartWidth - this.right : r, e ? d : b.chartHeight - this.bottom], a)
            },
            renderLine: function () {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                }))
            },
            getTitlePosition: function () {
                var a = this.horiz,
                    b = this.left,
                    c = this.top,
                    d = this.len,
                    e = this.options.title,
                    r = a ? b : c,
                    m = this.opposite,
                    f = this.offset,
                    h = e.x || 0,
                    u = e.y || 0,
                    v = this.axisTitle,
                    g = this.chart.renderer.fontMetrics(e.style && e.style.fontSize, v),
                    v = Math.max(v.getBBox(null, 0).height - g.h - 1, 0),
                    d = {
                        low: r + (a ? 0 : d),
                        middle: r + d / 2,
                        high: r + (a ? d : 0)
                    } [e.align],
                    b = (a ? c + this.height : b) + (a ? 1 : -1) * (m ? -1 : 1) * this.axisTitleMargin + [-v, v, g.f, -v][this.side];
                return {
                    x: a ? d + h : b + (m ? this.width : 0) + f + h,
                    y: a ? b + u - (m ? this.height : 0) + f : d + u
                }
            },
            renderMinorTick: function (a) {
                var b = this.chart.hasRendered && A(this.oldMin),
                    c = this.minorTicks;
                c[a] || (c[a] = new G(this, a, "minor"));
                b && c[a].isNew && c[a].render(null, !0);
                c[a].render(null, !1, 1)
            },
            renderTick: function (a, b) {
                var c = this.isLinked,
                    d = this.ticks,
                    e = this.chart.hasRendered && A(this.oldMin);
                if (!c || a >= this.min && a <= this.max) d[a] || (d[a] = new G(this, a)), e && d[a].isNew && d[a].render(b, !0, .1), d[a].render(b)
            },
            render: function () {
                var b = this,
                    c = b.chart,
                    d = b.options,
                    e = b.isLog,
                    r = b.lin2log,
                    m = b.isLinked,
                    f = b.tickPositions,
                    v = b.axisTitle,
                    g = b.ticks,
                    y = b.minorTicks,
                    k = b.alternateBands,
                    w = d.stackLabels,
                    l = d.alternateGridColor,
                    E = b.tickmarkOffset,
                    t = b.axisLine,
                    H = b.showAxis,
                    q = z(c.renderer.globalAnimation),
                    n, K;
                b.labelEdge.length = 0;
                b.overlap = !1;
                h([g, y, k], function (a) {
                    u(a, function (a) {
                        a.isActive = !1
                    })
                });
                if (b.hasData() || m) b.minorTickInterval && !b.categories && h(b.getMinorTickPositions(), function (a) {
                    b.renderMinorTick(a)
                }), f.length && (h(f, function (a, c) {
                    b.renderTick(a, c)
                }), E && (0 === b.min || b.single) && (g[-1] || (g[-1] = new G(b, -1, null, !0)), g[-1].render(-1))), l && h(f, function (d, m) {
                    K = void 0 !== f[m + 1] ? f[m + 1] + E : b.max - E;
                    0 === m % 2 && d < b.max && K <= b.max + (c.polar ? -E : E) && (k[d] || (k[d] = new a.PlotLineOrBand(b)), n = d + E, k[d].options = {
                        from: e ? r(n) : n,
                        to: e ? r(K) : K,
                        color: l
                    }, k[d].render(), k[d].isActive = !0)
                }), b._addedPlotLB || (h((d.plotLines || []).concat(d.plotBands || []), function (a) {
                    b.addPlotBandOrLine(a)
                }), b._addedPlotLB = !0);
                h([g, y, k], function (a) {
                    var b, d = [],
                        e = q.duration;
                    u(a, function (a, b) {
                        a.isActive || (a.render(b, !1, 0), a.isActive = !1, d.push(b))
                    });
                    B(function () {
                        for (b = d.length; b--;) a[d[b]] && !a[d[b]].isActive && (a[d[b]].destroy(), delete a[d[b]])
                    }, a !== k && c.hasRendered && e ? e : 0)
                });
                t && (t[t.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(t.strokeWidth())
                }), t.isPlaced = !0, t[H ? "show" : "hide"](!0));
                v && H && (d = b.getTitlePosition(), A(d.y) ? (v[v.isNew ? "attr" : "animate"](d), v.isNew = !1) : (v.attr("y", -9999), v.isNew = !0));
                w && w.enabled && b.renderStackTotals();
                b.isDirty = !1
            },
            redraw: function () {
                this.visible && (this.render(), h(this.plotLinesAndBands, function (a) {
                    a.render()
                }));
                h(this.series, function (a) {
                    a.isDirty = !0
                })
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function (a) {
                var b = this,
                    c = b.stacks,
                    d = b.plotLinesAndBands,
                    e;
                a || I(b);
                u(c, function (a, b) {
                    t(a);
                    c[b] = null
                });
                h([b.ticks, b.minorTicks, b.alternateBands], function (a) {
                    t(a)
                });
                if (d)
                    for (a = d.length; a--;) d[a].destroy();
                h("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "), function (a) {
                    b[a] && (b[a] = b[a].destroy())
                });
                for (e in b.plotLinesAndBandsGroups) b.plotLinesAndBandsGroups[e] = b.plotLinesAndBandsGroups[e].destroy();
                u(b, function (a, c) {
                    -1 === y(c, b.keepProps) && delete b[c]
                })
            },
            drawCrosshair: function (a, b) {
                var c, d = this.crosshair,
                    e = w(d.snap, !0),
                    r, m = this.cross;
                a || (a = this.cross && this.cross.e);
                this.crosshair && !1 !== (l(b) || !e) ? (e ? l(b) && (r = this.isXAxis ? b.plotX : this.len - b.plotY) : r = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos), l(r) && (c = this.getPlotLinePath(b && (this.isXAxis ? b.x : w(b.stackY, b.y)), null, null, null, r) || null), l(c) ? (b = this.categories && !this.isRadial, m || (this.cross = m = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (b ? "category " : "thin ") + d.className).attr({
                    zIndex: w(d.zIndex, 2)
                }).add(), m.attr({
                    stroke: d.color || (b ? n("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                    "stroke-width": w(d.width, 1)
                }), d.dashStyle && m.attr({
                    dashstyle: d.dashStyle
                })), m.show().attr({
                    d: c
                }), b && !d.width && m.attr({
                    "stroke-width": this.transA
                }), this.cross.e = a) : this.hideCrosshair()) : this.hideCrosshair()
            },
            hideCrosshair: function () {
                this.cross && this.cross.hide()
            }
        });
        return a.Axis = K
    }(M);
    (function (a) {
        var C = a.Axis,
            z = a.Date,
            F = a.dateFormat,
            D = a.defaultOptions,
            n = a.defined,
            g = a.each,
            k = a.extend,
            l = a.getMagnitude,
            q = a.getTZOffset,
            t = a.normalizeTickInterval,
            h = a.pick,
            b = a.timeUnits;
        C.prototype.getTimeTicks = function (a, d, c, v) {
            var y = [],
                m = {},
                A = D.global.useUTC,
                l, e = new z(d - Math.max(q(d), q(c))),
                E = z.hcMakeTime,
                u = a.unitRange,
                w = a.count,
                t, r;
            if (n(d)) {
                e[z.hcSetMilliseconds](u >= b.second ? 0 : w * Math.floor(e.getMilliseconds() / w));
                if (u >= b.second) e[z.hcSetSeconds](u >= b.minute ? 0 : w * Math.floor(e.getSeconds() / w));
                if (u >= b.minute) e[z.hcSetMinutes](u >= b.hour ? 0 : w * Math.floor(e[z.hcGetMinutes]() / w));
                if (u >= b.hour) e[z.hcSetHours](u >= b.day ? 0 : w * Math.floor(e[z.hcGetHours]() / w));
                if (u >= b.day) e[z.hcSetDate](u >= b.month ? 1 : w * Math.floor(e[z.hcGetDate]() / w));
                u >= b.month && (e[z.hcSetMonth](u >= b.year ? 0 : w * Math.floor(e[z.hcGetMonth]() / w)), l = e[z.hcGetFullYear]());
                if (u >= b.year) e[z.hcSetFullYear](l - l % w);
                if (u === b.week) e[z.hcSetDate](e[z.hcGetDate]() - e[z.hcGetDay]() + h(v, 1));
                l = e[z.hcGetFullYear]();
                v = e[z.hcGetMonth]();
                var B = e[z.hcGetDate](),
                    G = e[z.hcGetHours]();
                if (z.hcTimezoneOffset || z.hcGetTimezoneOffset) r = (!A || !!z.hcGetTimezoneOffset) && (c - d > 4 * b.month || q(d) !== q(c)), e = e.getTime(), t = q(e), e = new z(e + t);
                A = e.getTime();
                for (d = 1; A < c;) y.push(A), A = u === b.year ? E(l + d * w, 0) : u === b.month ? E(l, v + d * w) : !r || u !== b.day && u !== b.week ? r && u === b.hour ? E(l, v, B, G + d * w, 0, 0, t) - t : A + u * w : E(l, v, B + d * w * (u === b.day ? 1 : 7)), d++;
                y.push(A);
                u <= b.hour && 1E4 > y.length && g(y, function (a) {
                    0 === a % 18E5 && "000000000" === F("%H%M%S%L", a) && (m[a] = "day")
                })
            }
            y.info = k(a, {
                higherRanks: m,
                totalRange: u * w
            });
            return y
        };
        C.prototype.normalizeTimeTickInterval = function (a, d) {
            var c = d || [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1, 2]],
                ["week", [1, 2]],
                ["month", [1, 2, 3, 4, 6]],
                ["year", null]
            ];
            d = c[c.length - 1];
            var h = b[d[0]],
                g = d[1],
                m;
            for (m = 0; m < c.length && !(d = c[m], h = b[d[0]], g = d[1], c[m + 1] && a <= (h * g[g.length - 1] + b[c[m + 1][0]]) / 2); m++);
            h === b.year && a < 5 * h && (g = [1, 2, 5]);
            a = t(a / h, g, "year" === d[0] ? Math.max(l(a / h), 1) : 1);
            return {
                unitRange: h,
                count: a,
                unitName: d[0]
            }
        }
    })(M);
    (function (a) {
        var C = a.Axis,
            z = a.getMagnitude,
            F = a.map,
            D = a.normalizeTickInterval,
            n = a.pick;
        C.prototype.getLogTickPositions = function (a, k, l, q) {
            var t = this.options,
                h = this.len,
                b = this.lin2log,
                f = this.log2lin,
                d = [];
            q || (this._minorAutoInterval = null);
            if (.5 <= a) a = Math.round(a), d = this.getLinearTickPositions(a, k, l);
            else if (.08 <= a)
                for (var h = Math.floor(k), c, v, y, m, A, t = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; h < l + 1 && !A; h++)
                    for (v = t.length, c = 0; c < v && !A; c++) y = f(b(h) * t[c]), y > k && (!q || m <= l) && void 0 !== m && d.push(m), m > l && (A = !0), m = y;
            else k = b(k), l = b(l), a = t[q ? "minorTickInterval" : "tickInterval"], a = n("auto" === a ? null : a, this._minorAutoInterval, t.tickPixelInterval / (q ? 5 : 1) * (l - k) / ((q ? h / this.tickPositions.length : h) || 1)), a = D(a, null, z(a)), d = F(this.getLinearTickPositions(a, k, l), f), q || (this._minorAutoInterval = a / 5);
            q || (this.tickInterval = a);
            return d
        };
        C.prototype.log2lin = function (a) {
            return Math.log(a) / Math.LN10
        };
        C.prototype.lin2log = function (a) {
            return Math.pow(10, a)
        }
    })(M);
    (function (a, C) {
        var z = a.arrayMax,
            F = a.arrayMin,
            D = a.defined,
            n = a.destroyObjectProperties,
            g = a.each,
            k = a.erase,
            l = a.merge,
            q = a.pick;
        a.PlotLineOrBand = function (a, h) {
            this.axis = a;
            h && (this.options = h, this.id = h.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function () {
                var g = this,
                    h = g.axis,
                    b = h.horiz,
                    f = g.options,
                    d = f.label,
                    c = g.label,
                    v = f.to,
                    k = f.from,
                    m = f.value,
                    A = D(k) && D(v),
                    H = D(m),
                    e = g.svgElem,
                    E = !e,
                    u = [],
                    w = f.color,
                    n = q(f.zIndex, 0),
                    r = f.events,
                    u = {
                        "class": "highcharts-plot-" + (A ? "band " : "line ") + (f.className || "")
                    },
                    B = {},
                    G = h.chart.renderer,
                    K = A ? "bands" : "lines",
                    p = h.log2lin;
                h.isLog && (k = p(k), v = p(v), m = p(m));
                H ? (u = {
                    stroke: w,
                    "stroke-width": f.width
                }, f.dashStyle && (u.dashstyle = f.dashStyle)) : A && (w && (u.fill = w), f.borderWidth && (u.stroke = f.borderColor, u["stroke-width"] = f.borderWidth));
                B.zIndex = n;
                K += "-" + n;
                (w = h.plotLinesAndBandsGroups[K]) || (h.plotLinesAndBandsGroups[K] = w = G.g("plot-" + K).attr(B).add());
                E && (g.svgElem = e = G.path().attr(u).add(w));
                if (H) u = h.getPlotLinePath(m, e.strokeWidth());
                else if (A) u = h.getPlotBandPath(k, v, f);
                else return;
                E && u && u.length ? (e.attr({
                    d: u
                }), r && a.objectEach(r, function (a, b) {
                    e.on(b, function (a) {
                        r[b].apply(g, [a])
                    })
                })) : e && (u ? (e.show(), e.animate({
                    d: u
                })) : (e.hide(), c && (g.label = c = c.destroy())));
                d && D(d.text) && u && u.length && 0 < h.width && 0 < h.height && !u.flat ? (d = l({
                    align: b && A && "center",
                    x: b ? !A && 4 : 10,
                    verticalAlign: !b && A && "middle",
                    y: b ? A ? 16 : 10 : A ? 6 : -4,
                    rotation: b && !A && 90
                }, d), this.renderLabel(d, u, A, n)) : c && c.hide();
                return g
            },
            renderLabel: function (a, h, b, f) {
                var d = this.label,
                    c = this.axis.chart.renderer;
                d || (d = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (b ? "band" : "line") + "-label " + (a.className || "")
                }, d.zIndex = f, this.label = d = c.text(a.text, 0, 0, a.useHTML).attr(d).add(), d.css(a.style));
                f = [h[1], h[4], b ? h[6] : h[1]];
                h = [h[2], h[5], b ? h[7] : h[2]];
                b = F(f);
                c = F(h);
                d.align(a, !1, {
                    x: b,
                    y: c,
                    width: z(f) - b,
                    height: z(h) - c
                });
                d.show()
            },
            destroy: function () {
                k(this.axis.plotLinesAndBands, this);
                delete this.axis;
                n(this)
            }
        };
        a.extend(C.prototype, {
            getPlotBandPath: function (a, h) {
                var b = this.getPlotLinePath(h, null, null, !0),
                    f = this.getPlotLinePath(a, null, null, !0),
                    d = this.horiz,
                    c = 1;
                a = a < this.min && h < this.min || a > this.max && h > this.max;
                f && b ? (a && (f.flat = f.toString() === b.toString(), c = 0), f.push(d && b[4] === f[4] ? b[4] + c : b[4], d || b[5] !== f[5] ? b[5] : b[5] + c, d && b[1] === f[1] ? b[1] + c : b[1], d || b[2] !== f[2] ? b[2] : b[2] + c)) : f = null;
                return f
            },
            addPlotBand: function (a) {
                return this.addPlotBandOrLine(a, "plotBands")
            },
            addPlotLine: function (a) {
                return this.addPlotBandOrLine(a, "plotLines")
            },
            addPlotBandOrLine: function (g, h) {
                var b = (new a.PlotLineOrBand(this, g)).render(),
                    f = this.userOptions;
                b && (h && (f[h] = f[h] || [], f[h].push(g)), this.plotLinesAndBands.push(b));
                return b
            },
            removePlotBandOrLine: function (a) {
                for (var h = this.plotLinesAndBands, b = this.options, f = this.userOptions, d = h.length; d--;) h[d].id === a && h[d].destroy();
                g([b.plotLines || [], f.plotLines || [], b.plotBands || [], f.plotBands || []], function (b) {
                    for (d = b.length; d--;) b[d].id === a && k(b, b[d])
                })
            },
            removePlotBand: function (a) {
                this.removePlotBandOrLine(a)
            },
            removePlotLine: function (a) {
                this.removePlotBandOrLine(a)
            }
        })
    })(M, R);
    (function (a) {
        var C = a.dateFormat,
            z = a.each,
            F = a.extend,
            D = a.format,
            n = a.isNumber,
            g = a.map,
            k = a.merge,
            l = a.pick,
            q = a.splat,
            t = a.syncTimeout,
            h = a.timeUnits;
        a.Tooltip = function () {
            this.init.apply(this, arguments)
        };
        a.Tooltip.prototype = {
            init: function (a, f) {
                this.chart = a;
                this.options = f;
                this.crosshairs = [];
                this.now = {
                    x: 0,
                    y: 0
                };
                this.isHidden = !0;
                this.split = f.split && !a.inverted;
                this.shared = f.shared || this.split
            },
            cleanSplit: function (a) {
                z(this.chart.series, function (f) {
                    var d = f && f.tt;
                    d && (!d.isActive || a ? f.tt = d.destroy() : d.isActive = !1)
                })
            },
            getLabel: function () {
                var a = this.chart.renderer,
                    f = this.options;
                this.label || (this.split ? this.label = a.g("tooltip") : (this.label = a.label("", 0, 0, f.shape || "callout", null, null, f.useHTML, null, "tooltip").attr({
                    padding: f.padding,
                    r: f.borderRadius
                }), this.label.attr({
                    fill: f.backgroundColor,
                    "stroke-width": f.borderWidth
                }).css(f.style).shadow(f.shadow)), this.label.attr({
                    zIndex: 8
                }).add());
                return this.label
            },
            update: function (a) {
                this.destroy();
                k(!0, this.chart.options.tooltip.userOptions, a);
                this.init(this.chart, k(!0, this.options, a))
            },
            destroy: function () {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                clearTimeout(this.hideTimer);
                clearTimeout(this.tooltipTimeout)
            },
            move: function (a, f, d, c) {
                var h = this,
                    g = h.now,
                    m = !1 !== h.options.animation && !h.isHidden && (1 < Math.abs(a - g.x) || 1 < Math.abs(f - g.y)),
                    k = h.followPointer || 1 < h.len;
                F(g, {
                    x: m ? (2 * g.x + a) / 3 : a,
                    y: m ? (g.y + f) / 2 : f,
                    anchorX: k ? void 0 : m ? (2 * g.anchorX + d) / 3 : d,
                    anchorY: k ? void 0 : m ? (g.anchorY + c) / 2 : c
                });
                h.getLabel().attr(g);
                m && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
                    h && h.move(a, f, d, c)
                }, 32))
            },
            hide: function (a) {
                var f = this;
                clearTimeout(this.hideTimer);
                a = l(a, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = t(function () {
                    f.getLabel()[a ? "fadeOut" : "hide"]();
                    f.isHidden = !0
                }, a))
            },
            getAnchor: function (a, f) {
                var d, c = this.chart,
                    h = c.inverted,
                    k = c.plotTop,
                    m = c.plotLeft,
                    A = 0,
                    l = 0,
                    e, E;
                a = q(a);
                d = a[0].tooltipPos;
                this.followPointer && f && (void 0 === f.chartX && (f = c.pointer.normalize(f)), d = [f.chartX - c.plotLeft, f.chartY - k]);
                d || (z(a, function (a) {
                    e = a.series.yAxis;
                    E = a.series.xAxis;
                    A += a.plotX + (!h && E ? E.left - m : 0);
                    l += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!h && e ? e.top - k : 0)
                }), A /= a.length, l /= a.length, d = [h ? c.plotWidth - l : A, this.shared && !h && 1 < a.length && f ? f.chartY - k : h ? c.plotHeight - A : l]);
                return g(d, Math.round)
            },
            getPosition: function (a, f, d) {
                var c = this.chart,
                    h = this.distance,
                    g = {},
                    m = d.h || 0,
                    k, q = ["y", c.chartHeight, f, d.plotY + c.plotTop, c.plotTop, c.plotTop + c.plotHeight],
                    e = ["x", c.chartWidth, a, d.plotX + c.plotLeft, c.plotLeft, c.plotLeft + c.plotWidth],
                    E = !this.followPointer && l(d.ttBelow, !c.inverted === !!d.negative),
                    u = function (a, b, c, d, e, r) {
                        var f = c < d - h,
                            u = d + h + c < b,
                            k = d - h - c;
                        d += h;
                        if (E && u) g[a] = d;
                        else if (!E && f) g[a] = k;
                        else if (f) g[a] = Math.min(r - c, 0 > k - m ? k : k - m);
                        else if (u) g[a] = Math.max(e, d + m + c > b ? d : d + m);
                        else return !1
                    },
                    w = function (a, b, c, d) {
                        var e;
                        d < h || d > b - h ? e = !1 : g[a] = d < c / 2 ? 1 : d > b - c / 2 ? b - c - 2 : d - c / 2;
                        return e
                    },
                    n = function (a) {
                        var b = q;
                        q = e;
                        e = b;
                        k = a
                    },
                    r = function () {
                        !1 !== u.apply(0, q) ? !1 !== w.apply(0, e) || k || (n(!0), r()) : k ? g.x = g.y = 0 : (n(!0), r())
                    };
                (c.inverted || 1 < this.len) && n();
                r();
                return g
            },
            defaultFormatter: function (a) {
                var f = this.points || q(this),
                    d;
                d = [a.tooltipFooterHeaderFormatter(f[0])];
                d = d.concat(a.bodyFormatter(f));
                d.push(a.tooltipFooterHeaderFormatter(f[0], !0));
                return d
            },
            refresh: function (a, f) {
                var d, c = this.options,
                    h, g = a,
                    m, k = {},
                    n = [];
                d = c.formatter || this.defaultFormatter;
                var k = this.shared,
                    e;
                c.enabled && (clearTimeout(this.hideTimer), this.followPointer = q(g)[0].series.tooltipOptions.followPointer, m = this.getAnchor(g, f), f = m[0], h = m[1], !k || g.series && g.series.noSharedTooltip ? k = g.getLabelConfig() : (z(g, function (a) {
                    a.setState("hover");
                    n.push(a.getLabelConfig())
                }), k = {
                    x: g[0].category,
                    y: g[0].y
                }, k.points = n, g = g[0]), this.len = n.length, k = d.call(k, this), e = g.series, this.distance = l(e.tooltipOptions.distance, 16), !1 === k ? this.hide() : (d = this.getLabel(), this.isHidden && d.attr({
                    opacity: 1
                }).show(), this.split ? this.renderSplit(k, a) : (c.style.width || d.css({
                    width: this.chart.spacingBox.width
                }), d.attr({
                    text: k && k.join ? k.join("") : k
                }), d.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + l(g.colorIndex, e.colorIndex)), d.attr({
                    stroke: c.borderColor || g.color || e.color || "#666666"
                }), this.updatePosition({
                    plotX: f,
                    plotY: h,
                    negative: g.negative,
                    ttBelow: g.ttBelow,
                    h: m[2] || 0
                })), this.isHidden = !1))
            },
            renderSplit: function (b, f) {
                var d = this,
                    c = [],
                    h = this.chart,
                    g = h.renderer,
                    m = !0,
                    k = this.options,
                    q = 0,
                    e = this.getLabel();
                z(b.slice(0, f.length + 1), function (a, b) {
                    if (!1 !== a) {
                        b = f[b - 1] || {
                            isHeader: !0,
                            plotX: f[0].plotX
                        };
                        var w = b.series || d,
                            n = w.tt,
                            r = b.series || {},
                            B = "highcharts-color-" + l(b.colorIndex, r.colorIndex, "none");
                        n || (w.tt = n = g.label(null, null, null, "callout").addClass("highcharts-tooltip-box " + B).attr({
                            padding: k.padding,
                            r: k.borderRadius,
                            fill: k.backgroundColor,
                            stroke: k.borderColor || b.color || r.color || "#333333",
                            "stroke-width": k.borderWidth
                        }).add(e));
                        n.isActive = !0;
                        n.attr({
                            text: a
                        });
                        n.css(k.style).shadow(k.shadow);
                        a = n.getBBox();
                        r = a.width + n.strokeWidth();
                        b.isHeader ? (q = a.height, r = Math.max(0, Math.min(b.plotX + h.plotLeft - r / 2, h.chartWidth - r))) : r = b.plotX + h.plotLeft - l(k.distance, 16) - r;
                        0 > r && (m = !1);
                        a = (b.series && b.series.yAxis && b.series.yAxis.pos) + (b.plotY || 0);
                        a -= h.plotTop;
                        c.push({
                            target: b.isHeader ? h.plotHeight + q : a,
                            rank: b.isHeader ? 1 : 0,
                            size: w.tt.getBBox().height + 1,
                            point: b,
                            x: r,
                            tt: n
                        })
                    }
                });
                this.cleanSplit();
                a.distribute(c, h.plotHeight + q);
                z(c, function (a) {
                    var b = a.point,
                        c = b.series;
                    a.tt.attr({
                        visibility: void 0 === a.pos ? "hidden" : "inherit",
                        x: m || b.isHeader ? a.x : b.plotX + h.plotLeft + l(k.distance, 16),
                        y: a.pos + h.plotTop,
                        anchorX: b.isHeader ? b.plotX + h.plotLeft : b.plotX + c.xAxis.pos,
                        anchorY: b.isHeader ? a.pos + h.plotTop - 15 : b.plotY + c.yAxis.pos
                    })
                })
            },
            updatePosition: function (a) {
                var h = this.chart,
                    d = this.getLabel(),
                    d = (this.options.positioner || this.getPosition).call(this, d.width, d.height, a);
                this.move(Math.round(d.x), Math.round(d.y || 0), a.plotX + h.plotLeft, a.plotY + h.plotTop)
            },
            getDateFormat: function (a, f, d, c) {
                var g = C("%m-%d %H:%M:%S.%L", f),
                    k, m, A = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    },
                    l = "millisecond";
                for (m in h) {
                    if (a === h.week && +C("%w", f) === d && "00:00:00.000" === g.substr(6)) {
                        m = "week";
                        break
                    }
                    if (h[m] > a) {
                        m = l;
                        break
                    }
                    if (A[m] && g.substr(A[m]) !== "01-01 00:00:00.000".substr(A[m])) break;
                    "week" !== m && (l = m)
                }
                m && (k = c[m]);
                return k
            },
            getXDateFormat: function (a, h, d) {
                h = h.dateTimeLabelFormats;
                var c = d && d.closestPointRange;
                return (c ? this.getDateFormat(c, a.x, d.options.startOfWeek, h) : h.day) || h.year
            },
            tooltipFooterHeaderFormatter: function (a, h) {
                var d = h ? "footer" : "header";
                h = a.series;
                var c = h.tooltipOptions,
                    g = c.xDateFormat,
                    k = h.xAxis,
                    m = k && "datetime" === k.options.type && n(a.key),
                    d = c[d + "Format"];
                m && !g && (g = this.getXDateFormat(a, c, k));
                m && g && (d = d.replace("{point.key}", "{point.key:" + g + "}"));
                return D(d, {
                    point: a,
                    series: h
                })
            },
            bodyFormatter: function (a) {
                return g(a, function (a) {
                    var b = a.series.tooltipOptions;
                    return (b.pointFormatter || a.point.tooltipFormatter).call(a.point, b.pointFormat)
                })
            }
        }
    })(M);
    (function (a) {
        var C = a.addEvent,
            z = a.attr,
            F = a.charts,
            D = a.color,
            n = a.css,
            g = a.defined,
            k = a.each,
            l = a.extend,
            q = a.find,
            t = a.fireEvent,
            h = a.isObject,
            b = a.offset,
            f = a.pick,
            d = a.removeEvent,
            c = a.splat,
            v = a.Tooltip,
            y = a.win;
        a.Pointer = function (a, b) {
            this.init(a, b)
        };
        a.Pointer.prototype = {
            init: function (a, b) {
                this.options = b;
                this.chart = a;
                this.runChartClick = b.chart.events && !!b.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                v && (a.tooltip = new v(a, b.tooltip), this.followTouchMove = f(b.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            },
            zoomOption: function (a) {
                var b = this.chart,
                    c = b.options.chart,
                    d = c.zoomType || "",
                    b = b.inverted;
                /touch/.test(a.type) && (d = f(c.pinchType, d));
                this.zoomX = a = /x/.test(d);
                this.zoomY = d = /y/.test(d);
                this.zoomHor = a && !b || d && b;
                this.zoomVert = d && !b || a && b;
                this.hasZoom = a || d
            },
            normalize: function (a, c) {
                var d, e;
                a = a || y.event;
                a.target || (a.target = a.srcElement);
                e = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                c || (this.chartPosition = c = b(this.chart.container));
                void 0 === e.pageX ? (d = Math.max(a.x, a.clientX - c.left), c = a.y) : (d = e.pageX - c.left, c = e.pageY - c.top);
                return l(a, {
                    chartX: Math.round(d),
                    chartY: Math.round(c)
                })
            },
            getCoordinates: function (a) {
                var b = {
                    xAxis: [],
                    yAxis: []
                };
                k(this.chart.axes, function (c) {
                    b[c.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: c,
                        value: c.toValue(a[c.horiz ? "chartX" : "chartY"])
                    })
                });
                return b
            },
            findNearestKDPoint: function (a, b, c) {
                var d;
                k(a, function (a) {
                    var m = !(a.noSharedTooltip && b) && 0 > a.options.findNearestPointBy.indexOf("y");
                    a = a.searchPoint(c, m);
                    if ((m = h(a, !0)) && !(m = !h(d, !0))) var m = d.distX - a.distX,
                        f = d.dist - a.dist,
                        g = (a.series.group && a.series.group.zIndex) - (d.series.group && d.series.group.zIndex),
                        m = 0 < (0 !== m && b ? m : 0 !== f ? f : 0 !== g ? g : d.series.index > a.series.index ? -1 : 1);
                    m && (d = a)
                });
                return d
            },
            getPointFromEvent: function (a) {
                a = a.target;
                for (var b; a && !b;) b = a.point, a = a.parentNode;
                return b
            },
            getChartCoordinatesFromPoint: function (a, b) {
                var c = a.series,
                    d = c.xAxis,
                    c = c.yAxis;
                if (d && c) return b ? {
                    chartX: d.len + d.pos - a.clientX,
                    chartY: c.len + c.pos - a.plotY
                } : {
                    chartX: a.clientX + d.pos,
                    chartY: a.plotY + c.pos
                }
            },
            getHoverData: function (b, c, d, e, g, u) {
                var v, y = [];
                e = !(!e || !b);
                var r = c && !c.stickyTracking ? [c] : a.grep(d, function (a) {
                    return a.visible && !(!g && a.directTouch) && f(a.options.enableMouseTracking, !0) && a.stickyTracking
                });
                c = (v = e ? b : this.findNearestKDPoint(r, g, u)) && v.series;
                v && (g && !c.noSharedTooltip ? (r = a.grep(d, function (a) {
                    return a.visible && !(!g && a.directTouch) && f(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
                }), k(r, function (a) {
                    a = q(a.points, function (a) {
                        return a.x === v.x
                    });
                    h(a) && !a.isNull && y.push(a)
                })) : y.push(v));
                return {
                    hoverPoint: v,
                    hoverSeries: c,
                    hoverPoints: y
                }
            },
            runPointActions: function (b, c) {
                var d = this.chart,
                    e = d.tooltip,
                    h = e ? e.shared : !1,
                    g = c || d.hoverPoint,
                    v = g && g.series || d.hoverSeries,
                    v = this.getHoverData(g, v, d.series, !!c || v && v.directTouch && this.isDirectTouch, h, b),
                    y, g = v.hoverPoint;
                y = v.hoverPoints;
                c = (v = v.hoverSeries) && v.tooltipOptions.followPointer;
                h = h && v && !v.noSharedTooltip;
                if (g && (g !== d.hoverPoint || e && e.isHidden)) {
                    k(d.hoverPoints || [], function (b) {
                        -1 === a.inArray(b, y) && b.setState()
                    });
                    k(y || [], function (a) {
                        a.setState("hover")
                    });
                    if (d.hoverSeries !== v) v.onMouseOver();
                    d.hoverPoint && d.hoverPoint.firePointEvent("mouseOut");
                    g.firePointEvent("mouseOver");
                    d.hoverPoints = y;
                    d.hoverPoint = g;
                    e && e.refresh(h ? y : g, b)
                } else c && e && !e.isHidden && (g = e.getAnchor([{}], b), e.updatePosition({
                    plotX: g[0],
                    plotY: g[1]
                }));
                this.unDocMouseMove || (this.unDocMouseMove = C(d.container.ownerDocument, "mousemove", function (b) {
                    var c = F[a.hoverChartIndex];
                    if (c) c.pointer.onDocumentMouseMove(b)
                }));
                k(d.axes, function (c) {
                    var d = f(c.crosshair.snap, !0),
                        e = d ? a.find(y, function (a) {
                            return a.series[c.coll] === c
                        }) : void 0;
                    e || !d ? c.drawCrosshair(b, e) : c.hideCrosshair()
                })
            },
            reset: function (a, b) {
                var d = this.chart,
                    e = d.hoverSeries,
                    h = d.hoverPoint,
                    f = d.hoverPoints,
                    g = d.tooltip,
                    v = g && g.shared ? f : h;
                a && v && k(c(v), function (b) {
                    b.series.isCartesian && void 0 === b.plotX && (a = !1)
                });
                if (a) g && v && (g.refresh(v), h && (h.setState(h.state, !0), k(d.axes, function (a) {
                    a.crosshair && a.drawCrosshair(null, h)
                })));
                else {
                    if (h) h.onMouseOut();
                    f && k(f, function (a) {
                        a.setState()
                    });
                    if (e) e.onMouseOut();
                    g && g.hide(b);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    k(d.axes, function (a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = d.hoverPoints = d.hoverPoint = null
                }
            },
            scaleGroups: function (a, b) {
                var c = this.chart,
                    d;
                k(c.series, function (h) {
                    d = a || h.getPlotBox();
                    h.xAxis && h.xAxis.zoomEnabled && h.group && (h.group.attr(d), h.markerGroup && (h.markerGroup.attr(d), h.markerGroup.clip(b ? c.clipRect : null)), h.dataLabelsGroup && h.dataLabelsGroup.attr(d))
                });
                c.clipRect.attr(b || c.clipBox)
            },
            dragStart: function (a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            },
            drag: function (a) {
                var b = this.chart,
                    c = b.options.chart,
                    d = a.chartX,
                    h = a.chartY,
                    f = this.zoomHor,
                    g = this.zoomVert,
                    k = b.plotLeft,
                    r = b.plotTop,
                    v = b.plotWidth,
                    y = b.plotHeight,
                    l, p = this.selectionMarker,
                    x = this.mouseDownX,
                    q = this.mouseDownY,
                    n = c.panKey && a[c.panKey + "Key"];
                p && p.touch || (d < k ? d = k : d > k + v && (d = k + v), h < r ? h = r : h > r + y && (h = r + y), this.hasDragged = Math.sqrt(Math.pow(x - d, 2) + Math.pow(q - h, 2)), 10 < this.hasDragged && (l = b.isInsidePlot(x - k, q - r), b.hasCartesianSeries && (this.zoomX || this.zoomY) && l && !n && !p && (this.selectionMarker = p = b.renderer.rect(k, r, f ? 1 : v, g ? 1 : y, 0).attr({
                    fill: c.selectionMarkerFill || D("#335cad").setOpacity(.25).get(),
                    "class": "highcharts-selection-marker",
                    zIndex: 7
                }).add()), p && f && (d -= x, p.attr({
                    width: Math.abs(d),
                    x: (0 < d ? 0 : d) + x
                })), p && g && (d = h - q, p.attr({
                    height: Math.abs(d),
                    y: (0 < d ? 0 : d) + q
                })), l && !p && c.panning && b.pan(a, c.panning)))
            },
            drop: function (a) {
                var b = this,
                    c = this.chart,
                    d = this.hasPinched;
                if (this.selectionMarker) {
                    var h = {
                            originalEvent: a,
                            xAxis: [],
                            yAxis: []
                        },
                        f = this.selectionMarker,
                        v = f.attr ? f.attr("x") : f.x,
                        y = f.attr ? f.attr("y") : f.y,
                        r = f.attr ? f.attr("width") : f.width,
                        B = f.attr ? f.attr("height") : f.height,
                        G;
                    if (this.hasDragged || d) k(c.axes, function (c) {
                        if (c.zoomEnabled && g(c.min) && (d || b[{
                                xAxis: "zoomX",
                                yAxis: "zoomY"
                            } [c.coll]])) {
                            var p = c.horiz,
                                f = "touchend" === a.type ? c.minPixelPadding : 0,
                                k = c.toValue((p ? v : y) + f),
                                p = c.toValue((p ? v + r : y + B) - f);
                            h[c.coll].push({
                                axis: c,
                                min: Math.min(k, p),
                                max: Math.max(k, p)
                            });
                            G = !0
                        }
                    }), G && t(c, "selection", h, function (a) {
                        c.zoom(l(a, d ? {
                            animation: !1
                        } : null))
                    });
                    this.selectionMarker = this.selectionMarker.destroy();
                    d && this.scaleGroups()
                }
                c && (n(c.container, {
                    cursor: c._cursor
                }), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            },
            onContainerMouseDown: function (a) {
                a = this.normalize(a);
                this.zoomOption(a);
                a.preventDefault && a.preventDefault();
                this.dragStart(a)
            },
            onDocumentMouseUp: function (b) {
                F[a.hoverChartIndex] && F[a.hoverChartIndex].pointer.drop(b)
            },
            onDocumentMouseMove: function (a) {
                var b = this.chart,
                    c = this.chartPosition;
                a = this.normalize(a, c);
                !c || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
            },
            onContainerMouseLeave: function (b) {
                var c = F[a.hoverChartIndex];
                c && (b.relatedTarget || b.toElement) && (c.pointer.reset(), c.pointer.chartPosition = null)
            },
            onContainerMouseMove: function (b) {
                var c = this.chart;
                g(a.hoverChartIndex) && F[a.hoverChartIndex] && F[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = c.index);
                b = this.normalize(b);
                b.returnValue = !1;
                "mousedown" === c.mouseIsDown && this.drag(b);
                !this.inClass(b.target, "highcharts-tracker") && !c.isInsidePlot(b.chartX - c.plotLeft, b.chartY - c.plotTop) || c.openMenu || this.runPointActions(b)
            },
            inClass: function (a, b) {
                for (var c; a;) {
                    if (c = z(a, "class")) {
                        if (-1 !== c.indexOf(b)) return !0;
                        if (-1 !== c.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            },
            onTrackerMouseOut: function (a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                this.isDirectTouch = !1;
                if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
            },
            onContainerClick: function (a) {
                var b = this.chart,
                    c = b.hoverPoint,
                    d = b.plotLeft,
                    h = b.plotTop;
                a = this.normalize(a);
                b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (t(c.series, "click", l(a, {
                    point: c
                })), b.hoverPoint && c.firePointEvent("click", a)) : (l(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - d, a.chartY - h) && t(b, "click", a)))
            },
            setDOMEvents: function () {
                var b = this,
                    c = b.chart.container,
                    d = c.ownerDocument;
                c.onmousedown = function (a) {
                    b.onContainerMouseDown(a)
                };
                c.onmousemove = function (a) {
                    b.onContainerMouseMove(a)
                };
                c.onclick = function (a) {
                    b.onContainerClick(a)
                };
                C(c, "mouseleave", b.onContainerMouseLeave);
                1 === a.chartCount && C(d, "mouseup", b.onDocumentMouseUp);
                a.hasTouch && (c.ontouchstart = function (a) {
                    b.onContainerTouchStart(a)
                }, c.ontouchmove = function (a) {
                    b.onContainerTouchMove(a)
                }, 1 === a.chartCount && C(d, "touchend", b.onDocumentTouchEnd))
            },
            destroy: function () {
                var b = this,
                    c = this.chart.container.ownerDocument;
                b.unDocMouseMove && b.unDocMouseMove();
                d(b.chart.container, "mouseleave", b.onContainerMouseLeave);
                a.chartCount || (d(c, "mouseup", b.onDocumentMouseUp), a.hasTouch && d(c, "touchend", b.onDocumentTouchEnd));
                clearInterval(b.tooltipTimeout);
                a.objectEach(b, function (a, c) {
                    b[c] = null
                })
            }
        }
    })(M);
    (function (a) {
        var C = a.charts,
            z = a.each,
            F = a.extend,
            D = a.map,
            n = a.noop,
            g = a.pick;
        F(a.Pointer.prototype, {
            pinchTranslate: function (a, g, q, n, h, b) {
                this.zoomHor && this.pinchTranslateDirection(!0, a, g, q, n, h, b);
                this.zoomVert && this.pinchTranslateDirection(!1, a, g, q, n, h, b)
            },
            pinchTranslateDirection: function (a, g, q, n, h, b, f, d) {
                var c = this.chart,
                    v = a ? "x" : "y",
                    y = a ? "X" : "Y",
                    m = "chart" + y,
                    A = a ? "width" : "height",
                    H = c["plot" + (a ? "Left" : "Top")],
                    e, E, u = d || 1,
                    w = c.inverted,
                    I = c.bounds[a ? "h" : "v"],
                    r = 1 === g.length,
                    B = g[0][m],
                    G = q[0][m],
                    K = !r && g[1][m],
                    p = !r && q[1][m],
                    x;
                q = function () {
                    !r && 20 < Math.abs(B - K) && (u = d || Math.abs(G - p) / Math.abs(B - K));
                    E = (H - G) / u + B;
                    e = c["plot" + (a ? "Width" : "Height")] / u
                };
                q();
                g = E;
                g < I.min ? (g = I.min, x = !0) : g + e > I.max && (g = I.max - e, x = !0);
                x ? (G -= .8 * (G - f[v][0]), r || (p -= .8 * (p - f[v][1])), q()) : f[v] = [G, p];
                w || (b[v] = E - H, b[A] = e);
                b = w ? 1 / u : u;
                h[A] = e;
                h[v] = g;
                n[w ? a ? "scaleY" : "scaleX" : "scale" + y] = u;
                n["translate" + y] = b * H + (G - b * B)
            },
            pinch: function (a) {
                var l = this,
                    q = l.chart,
                    t = l.pinchDown,
                    h = a.touches,
                    b = h.length,
                    f = l.lastValidTouch,
                    d = l.hasZoom,
                    c = l.selectionMarker,
                    v = {},
                    y = 1 === b && (l.inClass(a.target, "highcharts-tracker") && q.runTrackerClick || l.runChartClick),
                    m = {};
                1 < b && (l.initiated = !0);
                d && l.initiated && !y && a.preventDefault();
                D(h, function (a) {
                    return l.normalize(a)
                });
                "touchstart" === a.type ? (z(h, function (a, b) {
                    t[b] = {
                        chartX: a.chartX,
                        chartY: a.chartY
                    }
                }), f.x = [t[0].chartX, t[1] && t[1].chartX], f.y = [t[0].chartY, t[1] && t[1].chartY], z(q.axes, function (a) {
                    if (a.zoomEnabled) {
                        var b = q.bounds[a.horiz ? "h" : "v"],
                            c = a.minPixelPadding,
                            d = a.toPixels(g(a.options.min, a.dataMin)),
                            h = a.toPixels(g(a.options.max, a.dataMax)),
                            f = Math.max(d, h);
                        b.min = Math.min(a.pos, Math.min(d, h) - c);
                        b.max = Math.max(a.pos + a.len, f + c)
                    }
                }), l.res = !0) : l.followTouchMove && 1 === b ? this.runPointActions(l.normalize(a)) : t.length && (c || (l.selectionMarker = c = F({
                    destroy: n,
                    touch: !0
                }, q.plotBox)), l.pinchTranslate(t, h, v, c, m, f), l.hasPinched = d, l.scaleGroups(v, m), l.res && (l.res = !1, this.reset(!1, 0)))
            },
            touch: function (k, l) {
                var q = this.chart,
                    n;
                if (q.index !== a.hoverChartIndex) this.onContainerMouseLeave({
                    relatedTarget: !0
                });
                a.hoverChartIndex = q.index;
                1 === k.touches.length ? (k = this.normalize(k), q.isInsidePlot(k.chartX - q.plotLeft, k.chartY - q.plotTop) && !q.openMenu ? (l && this.runPointActions(k), "touchmove" === k.type && (l = this.pinchDown, n = l[0] ? 4 <= Math.sqrt(Math.pow(l[0].chartX - k.chartX, 2) + Math.pow(l[0].chartY - k.chartY, 2)) : !1), g(n, !0) && this.pinch(k)) : l && this.reset()) : 2 === k.touches.length && this.pinch(k)
            },
            onContainerTouchStart: function (a) {
                this.zoomOption(a);
                this.touch(a, !0)
            },
            onContainerTouchMove: function (a) {
                this.touch(a)
            },
            onDocumentTouchEnd: function (g) {
                C[a.hoverChartIndex] && C[a.hoverChartIndex].pointer.drop(g)
            }
        })
    })(M);
    (function (a) {
        var C = a.addEvent,
            z = a.charts,
            F = a.css,
            D = a.doc,
            n = a.extend,
            g = a.noop,
            k = a.Pointer,
            l = a.removeEvent,
            q = a.win,
            t = a.wrap;
        if (!a.hasTouch && (q.PointerEvent || q.MSPointerEvent)) {
            var h = {},
                b = !!q.PointerEvent,
                f = function () {
                    var b = [];
                    b.item = function (a) {
                        return this[a]
                    };
                    a.objectEach(h, function (a) {
                        b.push({
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.target
                        })
                    });
                    return b
                },
                d = function (b, d, h, m) {
                    "touch" !== b.pointerType && b.pointerType !== b.MSPOINTER_TYPE_TOUCH || !z[a.hoverChartIndex] || (m(b), m = z[a.hoverChartIndex].pointer, m[d]({
                        type: h,
                        target: b.currentTarget,
                        preventDefault: g,
                        touches: f()
                    }))
                };
            n(k.prototype, {
                onContainerPointerDown: function (a) {
                    d(a, "onContainerTouchStart", "touchstart", function (a) {
                        h[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.currentTarget
                        }
                    })
                },
                onContainerPointerMove: function (a) {
                    d(a, "onContainerTouchMove", "touchmove", function (a) {
                        h[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY
                        };
                        h[a.pointerId].target || (h[a.pointerId].target = a.currentTarget)
                    })
                },
                onDocumentPointerUp: function (a) {
                    d(a, "onDocumentTouchEnd", "touchend", function (a) {
                        delete h[a.pointerId]
                    })
                },
                batchMSEvents: function (a) {
                    a(this.chart.container, b ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, b ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(D, b ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            t(k.prototype, "init", function (a, b, d) {
                a.call(this, b, d);
                this.hasZoom && F(b.container, {
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                })
            });
            t(k.prototype, "setDOMEvents", function (a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(C)
            });
            t(k.prototype, "destroy", function (a) {
                this.batchMSEvents(l);
                a.call(this)
            })
        }
    })(M);
    (function (a) {
        var C = a.addEvent,
            z = a.css,
            F = a.discardElement,
            D = a.defined,
            n = a.each,
            g = a.isFirefox,
            k = a.marginNames,
            l = a.merge,
            q = a.pick,
            t = a.setAnimation,
            h = a.stableSort,
            b = a.win,
            f = a.wrap;
        a.Legend = function (a, b) {
            this.init(a, b)
        };
        a.Legend.prototype = {
            init: function (a, b) {
                this.chart = a;
                this.setOptions(b);
                b.enabled && (this.render(), C(this.chart, "endResize", function () {
                    this.legend.positionCheckboxes()
                }))
            },
            setOptions: function (a) {
                var b = q(a.padding, 8);
                this.options = a;
                this.itemStyle = a.itemStyle;
                this.itemHiddenStyle = l(this.itemStyle, a.itemHiddenStyle);
                this.itemMarginTop = a.itemMarginTop || 0;
                this.padding = b;
                this.initialItemY = b - 5;
                this.itemHeight = this.maxItemWidth = 0;
                this.symbolWidth = q(a.symbolWidth, 16);
                this.pages = []
            },
            update: function (a, b) {
                var h = this.chart;
                this.setOptions(l(!0, this.options, a));
                this.destroy();
                h.isDirtyLegend = h.isDirtyBox = !0;
                q(b, !0) && h.redraw()
            },
            colorizeItem: function (a, b) {
                a.legendGroup[b ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                var h = this.options,
                    f = a.legendItem,
                    g = a.legendLine,
                    k = a.legendSymbol,
                    l = this.itemHiddenStyle.color,
                    h = b ? h.itemStyle.color : l,
                    e = b ? a.color || l : l,
                    q = a.options && a.options.marker,
                    u = {
                        fill: e
                    };
                f && f.css({
                    fill: h,
                    color: h
                });
                g && g.attr({
                    stroke: e
                });
                k && (q && k.isMarker && (u = a.pointAttribs(), b || (u.stroke = u.fill = l)), k.attr(u))
            },
            positionItem: function (a) {
                var b = this.options,
                    h = b.symbolPadding,
                    b = !b.rtl,
                    f = a._legendItemPos,
                    g = f[0],
                    f = f[1],
                    k = a.checkbox;
                (a = a.legendGroup) && a.element && a.translate(b ? g : this.legendWidth - g - 2 * h - 4, f);
                k && (k.x = g, k.y = f)
            },
            destroyItem: function (a) {
                var b = a.checkbox;
                n(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (b) {
                    a[b] && (a[b] = a[b].destroy())
                });
                b && F(a.checkbox)
            },
            destroy: function () {
                function a(b) {
                    this[b] && (this[b] = this[b].destroy())
                }
                n(this.getAllItems(), function (b) {
                    n(["legendItem", "legendGroup"], a, b)
                });
                n("clipRect up down pager nav box title group".split(" "), a, this);
                this.display = null
            },
            positionCheckboxes: function (a) {
                var b = this.group && this.group.alignAttr,
                    h, f = this.clipHeight || this.legendHeight,
                    g = this.titleHeight;
                b && (h = b.translateY, n(this.allItems, function (k) {
                    var l = k.checkbox,
                        e;
                    l && (e = h + g + l.y + (a || 0) + 3, z(l, {
                        left: b.translateX + k.checkboxOffset + l.x - 20 + "px",
                        top: e + "px",
                        display: e > h - 6 && e < h + f - 6 ? "" : "none"
                    }))
                }))
            },
            renderTitle: function () {
                var a = this.options,
                    b = this.padding,
                    h = a.title,
                    f = 0;
                h.text && (this.title || (this.title = this.chart.renderer.label(h.text, b - 3, b - 4, null, null, null, a.useHTML, null, "legend-title").attr({
                    zIndex: 1
                }).css(h.style).add(this.group)), a = this.title.getBBox(), f = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
                    translateY: f
                }));
                this.titleHeight = f
            },
            setText: function (b) {
                var c = this.options;
                b.legendItem.attr({
                    text: c.labelFormat ? a.format(c.labelFormat, b) : c.labelFormatter.call(b)
                })
            },
            renderItem: function (a) {
                var b = this.chart,
                    h = b.renderer,
                    f = this.options,
                    g = "horizontal" === f.layout,
                    k = this.symbolWidth,
                    n = f.symbolPadding,
                    e = this.itemStyle,
                    t = this.itemHiddenStyle,
                    u = this.padding,
                    w = g ? q(f.itemDistance, 20) : 0,
                    I = !f.rtl,
                    r = f.width,
                    B = f.itemMarginBottom || 0,
                    G = this.itemMarginTop,
                    K = a.legendItem,
                    p = !a.series,
                    x = !p && a.series.drawLegendSymbol ? a.series : a,
                    O = x.options,
                    L = this.createCheckboxForItem && O && O.showCheckbox,
                    O = k + n + w + (L ? 20 : 0),
                    N = f.useHTML,
                    z = a.options.className;
                K || (a.legendGroup = h.g("legend-item").addClass("highcharts-" + x.type + "-series highcharts-color-" + a.colorIndex + (z ? " " + z : "") + (p ? " highcharts-series-" + a.index : "")).attr({
                    zIndex: 1
                }).add(this.scrollGroup), a.legendItem = K = h.text("", I ? k + n : -n, this.baseline || 0, N).css(l(a.visible ? e : t)).attr({
                    align: I ? "left" : "right",
                    zIndex: 2
                }).add(a.legendGroup), this.baseline || (k = e.fontSize, this.fontMetrics = h.fontMetrics(k, K), this.baseline = this.fontMetrics.f + 3 + G, K.attr("y", this.baseline)), this.symbolHeight = f.symbolHeight || this.fontMetrics.f, x.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, K, N), L && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                e.width || K.css({
                    width: (f.itemWidth || f.width || b.spacingBox.width) - O
                });
                this.setText(a);
                h = K.getBBox();
                e = a.checkboxOffset = f.itemWidth || a.legendItemWidth || h.width + O;
                this.itemHeight = h = Math.round(a.legendItemHeight || h.height || this.symbolHeight);
                g && this.itemX - u + e > (r || b.spacingBox.width - 2 * u - f.x) && (this.itemX = u, this.itemY += G + this.lastLineHeight + B, this.lastLineHeight = 0);
                this.maxItemWidth = Math.max(this.maxItemWidth, e);
                this.lastItemY = G + this.itemY + B;
                this.lastLineHeight = Math.max(h, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                g ? this.itemX += e : (this.itemY += G + h + B, this.lastLineHeight = h);
                this.offsetWidth = r || Math.max((g ? this.itemX - u - (a.checkbox ? 0 : w) : e) + u, this.offsetWidth)
            },
            getAllItems: function () {
                var a = [];
                n(this.chart.series, function (b) {
                    var h = b && b.options;
                    b && q(h.showInLegend, D(h.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === h.legendType ? b.data : b)))
                });
                return a
            },
            adjustMargins: function (a, b) {
                var h = this.chart,
                    f = this.options,
                    g = f.align.charAt(0) + f.verticalAlign.charAt(0) + f.layout.charAt(0);
                f.floating || n([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function (l, n) {
                    l.test(g) && !D(a[n]) && (h[k[n]] = Math.max(h[k[n]], h.legend[(n + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][n] * f[n % 2 ? "x" : "y"] + q(f.margin, 12) + b[n]))
                })
            },
            render: function () {
                var a = this,
                    b = a.chart,
                    f = b.renderer,
                    g = a.group,
                    m, k, q, e, t = a.box,
                    u = a.options,
                    w = a.padding;
                a.itemX = w;
                a.itemY = a.initialItemY;
                a.offsetWidth = 0;
                a.lastItemY = 0;
                g || (a.group = g = f.g("legend").attr({
                    zIndex: 7
                }).add(), a.contentGroup = f.g().attr({
                    zIndex: 1
                }).add(g), a.scrollGroup = f.g().add(a.contentGroup));
                a.renderTitle();
                m = a.getAllItems();
                h(m, function (a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                u.reversed && m.reverse();
                a.allItems = m;
                a.display = k = !!m.length;
                a.lastLineHeight = 0;
                n(m, function (b) {
                    a.renderItem(b)
                });
                q = (u.width || a.offsetWidth) + w;
                e = a.lastItemY + a.lastLineHeight + a.titleHeight;
                e = a.handleOverflow(e);
                e += w;
                t || (a.box = t = f.rect().addClass("highcharts-legend-box").attr({
                    r: u.borderRadius
                }).add(g), t.isNew = !0);
                t.attr({
                    stroke: u.borderColor,
                    "stroke-width": u.borderWidth || 0,
                    fill: u.backgroundColor || "none"
                }).shadow(u.shadow);
                0 < q && 0 < e && (t[t.isNew ? "attr" : "animate"](t.crisp({
                    x: 0,
                    y: 0,
                    width: q,
                    height: e
                }, t.strokeWidth())), t.isNew = !1);
                t[k ? "show" : "hide"]();
                a.legendWidth = q;
                a.legendHeight = e;
                n(m, function (b) {
                    a.positionItem(b)
                });
                k && g.align(l(u, {
                    width: q,
                    height: e
                }), !0, "spacingBox");
                b.isResizing || this.positionCheckboxes()
            },
            handleOverflow: function (a) {
                var b = this,
                    h = this.chart,
                    f = h.renderer,
                    g = this.options,
                    k = g.y,
                    l = this.padding,
                    h = h.spacingBox.height + ("top" === g.verticalAlign ? -k : k) - l,
                    k = g.maxHeight,
                    e, t = this.clipRect,
                    u = g.navigation,
                    w = q(u.animation, !0),
                    I = u.arrowSize || 12,
                    r = this.nav,
                    B = this.pages,
                    G, K = this.allItems,
                    p = function (a) {
                        "number" === typeof a ? t.attr({
                            height: a
                        }) : t && (b.clipRect = t.destroy(), b.contentGroup.clip());
                        b.contentGroup.div && (b.contentGroup.div.style.clip = a ? "rect(" + l + "px,9999px," + (l + a) + "px,0)" : "auto")
                    };
                "horizontal" !== g.layout || "middle" === g.verticalAlign || g.floating || (h /= 2);
                k && (h = Math.min(h, k));
                B.length = 0;
                a > h && !1 !== u.enabled ? (this.clipHeight = e = Math.max(h - 20 - this.titleHeight - l, 0), this.currentPage = q(this.currentPage, 1), this.fullHeight = a, n(K, function (a, b) {
                    var c = a._legendItemPos[1];
                    a = Math.round(a.legendItem.getBBox().height);
                    var d = B.length;
                    if (!d || c - B[d - 1] > e && (G || c) !== B[d - 1]) B.push(G || c), d++;
                    b === K.length - 1 && c + a - B[d - 1] > e && B.push(c);
                    c !== G && (G = c)
                }), t || (t = b.clipRect = f.clipRect(0, l, 9999, 0), b.contentGroup.clip(t)), p(e), r || (this.nav = r = f.g().attr({
                    zIndex: 1
                }).add(this.group), this.up = f.symbol("triangle", 0, 0, I, I).on("click", function () {
                    b.scroll(-1, w)
                }).add(r), this.pager = f.text("", 15, 10).addClass("highcharts-legend-navigation").css(u.style).add(r), this.down = f.symbol("triangle-down", 0, 0, I, I).on("click", function () {
                    b.scroll(1, w)
                }).add(r)), b.scroll(0), a = h) : r && (p(), this.nav = r.destroy(), this.scrollGroup.attr({
                    translateY: 1
                }), this.clipHeight = 0);
                return a
            },
            scroll: function (a, b) {
                var h = this.pages,
                    f = h.length;
                a = this.currentPage + a;
                var g = this.clipHeight,
                    k = this.options.navigation,
                    l = this.pager,
                    e = this.padding;
                a > f && (a = f);
                0 < a && (void 0 !== b && t(b, this.chart), this.nav.attr({
                    translateX: e,
                    translateY: g + this.padding + 7 + this.titleHeight,
                    visibility: "visible"
                }), this.up.attr({
                    "class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                }), l.attr({
                    text: a + "/" + f
                }), this.down.attr({
                    x: 18 + this.pager.getBBox().width,
                    "class": a === f ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                }), this.up.attr({
                    fill: 1 === a ? k.inactiveColor : k.activeColor
                }).css({
                    cursor: 1 === a ? "default" : "pointer"
                }), this.down.attr({
                    fill: a === f ? k.inactiveColor : k.activeColor
                }).css({
                    cursor: a === f ? "default" : "pointer"
                }), b = -h[a - 1] + this.initialItemY, this.scrollGroup.animate({
                    translateY: b
                }), this.currentPage = a, this.positionCheckboxes(b))
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function (a, b) {
                var h = a.symbolHeight,
                    f = a.options.squareSymbol;
                b.legendSymbol = this.chart.renderer.rect(f ? (a.symbolWidth - h) / 2 : 0, a.baseline - h + 1, f ? h : a.symbolWidth, h, q(a.options.symbolRadius, h / 2)).addClass("highcharts-point").attr({
                    zIndex: 3
                }).add(b.legendGroup)
            },
            drawLineMarker: function (a) {
                var b = this.options,
                    h = b.marker,
                    f = a.symbolWidth,
                    g = a.symbolHeight,
                    k = g / 2,
                    n = this.chart.renderer,
                    e = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var t;
                t = {
                    "stroke-width": b.lineWidth || 0
                };
                b.dashStyle && (t.dashstyle = b.dashStyle);
                this.legendLine = n.path(["M", 0, a, "L", f, a]).addClass("highcharts-graph").attr(t).add(e);
                h && !1 !== h.enabled && (b = Math.min(q(h.radius, k), k), 0 === this.symbol.indexOf("url") && (h = l(h, {
                    width: g,
                    height: g
                }), b = 0), this.legendSymbol = h = n.symbol(this.symbol, f / 2 - b, a - b, 2 * b, 2 * b, h).addClass("highcharts-point").add(e), h.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(b.navigator.userAgent) || g) && f(a.Legend.prototype, "positionItem", function (a, b) {
            var h = this,
                f = function () {
                    b._legendItemPos && a.call(h, b)
                };
            f();
            setTimeout(f)
        })
    })(M);
    (function (a) {
        var C = a.addEvent,
            z = a.animate,
            F = a.animObject,
            D = a.attr,
            n = a.doc,
            g = a.Axis,
            k = a.createElement,
            l = a.defaultOptions,
            q = a.discardElement,
            t = a.charts,
            h = a.css,
            b = a.defined,
            f = a.each,
            d = a.extend,
            c = a.find,
            v = a.fireEvent,
            y = a.getStyle,
            m = a.grep,
            A = a.isNumber,
            H = a.isObject,
            e = a.isString,
            E = a.Legend,
            u = a.marginNames,
            w = a.merge,
            I = a.objectEach,
            r = a.Pointer,
            B = a.pick,
            G = a.pInt,
            K = a.removeEvent,
            p = a.seriesTypes,
            x = a.splat,
            O = a.svg,
            L = a.syncTimeout,
            N = a.win,
            P = a.Renderer,
            Q = a.Chart = function () {
                this.getArgs.apply(this, arguments)
            };
        a.chart = function (a, b, c) {
            return new Q(a, b, c)
        };
        d(Q.prototype, {
            callbacks: [],
            getArgs: function () {
                var a = [].slice.call(arguments);
                if (e(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1])
            },
            init: function (b, c) {
                var d, e, r = b.series,
                    h = b.plotOptions || {};
                b.series = null;
                d = w(l, b);
                for (e in d.plotOptions) d.plotOptions[e].tooltip = h[e] && w(h[e].tooltip) || void 0;
                d.tooltip.userOptions = b.chart && b.chart.forExport && b.tooltip.userOptions || b.tooltip;
                d.series = b.series = r;
                this.userOptions = b;
                b = d.chart;
                e = b.events;
                this.margin = [];
                this.spacing = [];
                this.bounds = {
                    h: {},
                    v: {}
                };
                this.callback = c;
                this.isResizing = 0;
                this.options = d;
                this.axes = [];
                this.series = [];
                this.hasCartesianSeries = b.showAxes;
                var f = this;
                f.index = t.length;
                t.push(f);
                a.chartCount++;
                e && I(e, function (a, b) {
                    C(f, b, a)
                });
                f.xAxis = [];
                f.yAxis = [];
                f.pointCount = f.colorCounter = f.symbolCounter = 0;
                f.firstRender()
            },
            initSeries: function (b) {
                var c = this.options.chart;
                (c = p[b.type || c.type || c.defaultSeriesType]) || a.error(17, !0);
                c = new c;
                c.init(this, b);
                return c
            },
            orderSeries: function (a) {
                var b = this.series;
                for (a = a || 0; a < b.length; a++) b[a] && (b[a].index = a, b[a].name = b[a].name || "Series " + (b[a].index + 1))
            },
            isInsidePlot: function (a, b, c) {
                var d = c ? b : a;
                a = c ? a : b;
                return 0 <= d && d <= this.plotWidth && 0 <= a && a <= this.plotHeight
            },
            redraw: function (b) {
                var c = this.axes,
                    e = this.series,
                    r = this.pointer,
                    h = this.legend,
                    p = this.isDirtyLegend,
                    g, m, k = this.hasCartesianSeries,
                    u = this.isDirtyBox,
                    B, l = this.renderer,
                    G = l.isHidden(),
                    x = [];
                this.setResponsive && this.setResponsive(!1);
                a.setAnimation(b, this);
                G && this.temporaryDisplay();
                this.layOutTitles();
                for (b = e.length; b--;)
                    if (B = e[b], B.options.stacking && (g = !0, B.isDirty)) {
                        m = !0;
                        break
                    }
                if (m)
                    for (b = e.length; b--;) B = e[b], B.options.stacking && (B.isDirty = !0);
                f(e, function (a) {
                    a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), p = !0);
                    a.isDirtyData && v(a, "updatedData")
                });
                p && h.options.enabled && (h.render(), this.isDirtyLegend = !1);
                g && this.getStacks();
                k && f(c, function (a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                k && (f(c, function (a) {
                    a.isDirty && (u = !0)
                }), f(c, function (a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b, x.push(function () {
                        v(a, "afterSetExtremes", d(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (u || g) && a.redraw()
                }));
                u && this.drawChartBox();
                v(this, "predraw");
                f(e, function (a) {
                    (u || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1
                });
                r && r.reset(!0);
                l.draw();
                v(this, "redraw");
                v(this, "render");
                G && this.temporaryDisplay(!0);
                f(x, function (a) {
                    a.call()
                })
            },
            get: function (a) {
                function b(c) {
                    return c.id === a || c.options && c.options.id === a
                }
                var d, e = this.series,
                    r;
                d = c(this.axes, b) || c(this.series, b);
                for (r = 0; !d && r < e.length; r++) d = c(e[r].points || [], b);
                return d
            },
            getAxes: function () {
                var a = this,
                    b = this.options,
                    c = b.xAxis = x(b.xAxis || {}),
                    b = b.yAxis = x(b.yAxis || {});
                f(c, function (a, b) {
                    a.index = b;
                    a.isX = !0
                });
                f(b, function (a, b) {
                    a.index = b
                });
                c = c.concat(b);
                f(c, function (b) {
                    new g(a, b)
                })
            },
            getSelectedPoints: function () {
                var a = [];
                f(this.series, function (b) {
                    a = a.concat(m(b.data || [], function (a) {
                        return a.selected
                    }))
                });
                return a
            },
            getSelectedSeries: function () {
                return m(this.series, function (a) {
                    return a.selected
                })
            },
            setTitle: function (a, b, c) {
                var d = this,
                    e = d.options,
                    r;
                r = e.title = w({
                    style: {
                        color: "#333333",
                        fontSize: e.isStock ? "16px" : "18px"
                    }
                }, e.title, a);
                e = e.subtitle = w({
                    style: {
                        color: "#666666"
                    }
                }, e.subtitle, b);
                f([
                    ["title", a, r],
                    ["subtitle", b, e]
                ], function (a, b) {
                    var c = a[0],
                        e = d[c],
                        r = a[1];
                    a = a[2];
                    e && r && (d[c] = e = e.destroy());
                    a && a.text && !e && (d[c] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({
                        align: a.align,
                        "class": "highcharts-" + c,
                        zIndex: a.zIndex || 4
                    }).add(), d[c].update = function (a) {
                        d.setTitle(!b && a, b && a)
                    }, d[c].css(a.style))
                });
                d.layOutTitles(c)
            },
            layOutTitles: function (a) {
                var b = 0,
                    c, e = this.renderer,
                    r = this.spacingBox;
                f(["title", "subtitle"], function (a) {
                    var c = this[a],
                        h = this.options[a];
                    a = "title" === a ? -3 : h.verticalAlign ? 0 : b + 2;
                    var f;
                    c && (f = h.style.fontSize, f = e.fontMetrics(f, c).b, c.css({
                        width: (h.width || r.width + h.widthAdjust) + "px"
                    }).align(d({
                        y: a + f
                    }, h), !1, "spacingBox"), h.floating || h.verticalAlign || (b = Math.ceil(b + c.getBBox(h.useHTML).height)))
                }, this);
                c = this.titleOffset !== b;
                this.titleOffset = b;
                !this.isDirtyBox && c && (this.isDirtyBox = c, this.hasRendered && B(a, !0) && this.isDirtyBox && this.redraw())
            },
            getChartSize: function () {
                var c = this.options.chart,
                    d = c.width,
                    c = c.height,
                    e = this.renderTo;
                b(d) || (this.containerWidth = y(e, "width"));
                b(c) || (this.containerHeight = y(e, "height"));
                this.chartWidth = Math.max(0, d || this.containerWidth || 600);
                this.chartHeight = Math.max(0, a.relativeLength(c, this.chartWidth) || this.containerHeight || 400)
            },
            temporaryDisplay: function (b) {
                var c = this.renderTo;
                if (b)
                    for (; c && c.style;) c.hcOrigStyle && (a.css(c, c.hcOrigStyle), delete c.hcOrigStyle), c.hcOrigDetached && (n.body.removeChild(c), c.hcOrigDetached = !1), c = c.parentNode;
                else
                    for (; c && c.style;) {
                        n.body.contains(c) || (c.hcOrigDetached = !0, n.body.appendChild(c));
                        if ("none" === y(c, "display", !1) || c.hcOricDetached) c.hcOrigStyle = {
                            display: c.style.display,
                            height: c.style.height,
                            overflow: c.style.overflow
                        }, b = {
                            display: "block",
                            overflow: "hidden"
                        }, c !== this.renderTo && (b.height = 0), a.css(c, b), c.offsetWidth || c.style.setProperty("display", "block", "important");
                        c = c.parentNode;
                        if (c === n.body) break
                    }
            },
            setClassName: function (a) {
                this.container.className = "highcharts-container " + (a || "")
            },
            getContainer: function () {
                var b, c = this.options,
                    r = c.chart,
                    h, f;
                b = this.renderTo;
                var p = a.uniqueKey(),
                    g;
                b || (this.renderTo = b = r.renderTo);
                e(b) && (this.renderTo = b = n.getElementById(b));
                b || a.error(13, !0);
                h = G(D(b, "data-highcharts-chart"));
                A(h) && t[h] && t[h].hasRendered && t[h].destroy();
                D(b, "data-highcharts-chart", this.index);
                b.innerHTML = "";
                r.skipClone || b.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                h = this.chartWidth;
                f = this.chartHeight;
                g = d({
                    position: "relative",
                    overflow: "hidden",
                    width: h + "px",
                    height: f + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                }, r.style);
                this.container = b = k("div", {
                    id: p
                }, g, b);
                this._cursor = b.style.cursor;
                this.renderer = new(a[r.renderer] || P)(b, h, f, null, r.forExport, c.exporting && c.exporting.allowHTML);
                this.setClassName(r.className);
                this.renderer.setStyle(r.style);
                this.renderer.chartIndex = this.index
            },
            getMargins: function (a) {
                var c = this.spacing,
                    d = this.margin,
                    e = this.titleOffset;
                this.resetMargins();
                e && !b(d[0]) && (this.plotTop = Math.max(this.plotTop, e + this.options.title.margin + c[0]));
                this.legend.display && this.legend.adjustMargins(d, c);
                this.extraMargin && (this[this.extraMargin.type] = (this[this.extraMargin.type] || 0) + this.extraMargin.value);
                this.extraTopMargin && (this.plotTop += this.extraTopMargin);
                a || this.getAxisMargins()
            },
            getAxisMargins: function () {
                var a = this,
                    c = a.axisOffset = [0, 0, 0, 0],
                    d = a.margin;
                a.hasCartesianSeries && f(a.axes, function (a) {
                    a.visible && a.getOffset()
                });
                f(u, function (e, r) {
                    b(d[r]) || (a[e] += c[r])
                });
                a.setChartSize()
            },
            reflow: function (a) {
                var c = this,
                    d = c.options.chart,
                    e = c.renderTo,
                    r = b(d.width) && b(d.height),
                    h = d.width || y(e, "width"),
                    d = d.height || y(e, "height"),
                    e = a ? a.target : N;
                if (!r && !c.isPrinting && h && d && (e === N || e === n)) {
                    if (h !== c.containerWidth || d !== c.containerHeight) clearTimeout(c.reflowTimeout), c.reflowTimeout = L(function () {
                        c.container && c.setSize(void 0, void 0, !1)
                    }, a ? 100 : 0);
                    c.containerWidth = h;
                    c.containerHeight = d
                }
            },
            initReflow: function () {
                var a = this,
                    b;
                b = C(N, "resize", function (b) {
                    a.reflow(b)
                });
                C(a, "destroy", b)
            },
            setSize: function (b, c, d) {
                var e = this,
                    r = e.renderer;
                e.isResizing += 1;
                a.setAnimation(d, e);
                e.oldChartHeight = e.chartHeight;
                e.oldChartWidth = e.chartWidth;
                void 0 !== b && (e.options.chart.width = b);
                void 0 !== c && (e.options.chart.height = c);
                e.getChartSize();
                b = r.globalAnimation;
                (b ? z : h)(e.container, {
                    width: e.chartWidth + "px",
                    height: e.chartHeight + "px"
                }, b);
                e.setChartSize(!0);
                r.setSize(e.chartWidth, e.chartHeight, d);
                f(e.axes, function (a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                e.isDirtyLegend = !0;
                e.isDirtyBox = !0;
                e.layOutTitles();
                e.getMargins();
                e.redraw(d);
                e.oldChartHeight = null;
                v(e, "resize");
                L(function () {
                    e && v(e, "endResize", null, function () {
                        --e.isResizing
                    })
                }, F(b).duration)
            },
            setChartSize: function (a) {
                function b(a) {
                    a = g[a] || 0;
                    return Math.max(l || a, a) / 2
                }
                var c = this.inverted,
                    d = this.renderer,
                    e = this.chartWidth,
                    r = this.chartHeight,
                    h = this.options.chart,
                    p = this.spacing,
                    g = this.clipOffset,
                    m, k, u, B, l;
                this.plotLeft = m = Math.round(this.plotLeft);
                this.plotTop = k = Math.round(this.plotTop);
                this.plotWidth = u = Math.max(0, Math.round(e - m - this.marginRight));
                this.plotHeight = B = Math.max(0, Math.round(r - k - this.marginBottom));
                this.plotSizeX = c ? B : u;
                this.plotSizeY = c ? u : B;
                this.plotBorderWidth = h.plotBorderWidth || 0;
                this.spacingBox = d.spacingBox = {
                    x: p[3],
                    y: p[0],
                    width: e - p[3] - p[1],
                    height: r - p[0] - p[2]
                };
                this.plotBox = d.plotBox = {
                    x: m,
                    y: k,
                    width: u,
                    height: B
                };
                l = 2 * Math.floor(this.plotBorderWidth / 2);
                c = Math.ceil(b(3));
                d = Math.ceil(b(0));
                this.clipBox = {
                    x: c,
                    y: d,
                    width: Math.floor(this.plotSizeX - b(1) - c),
                    height: Math.max(0, Math.floor(this.plotSizeY - b(2) - d))
                };
                a || f(this.axes, function (a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                })
            },
            resetMargins: function () {
                var a = this,
                    b = a.options.chart;
                f(["margin", "spacing"], function (c) {
                    var d = b[c],
                        e = H(d) ? d : [d, d, d, d];
                    f(["Top", "Right", "Bottom", "Left"], function (d, r) {
                        a[c][r] = B(b[c + d], e[r])
                    })
                });
                f(u, function (b, c) {
                    a[b] = B(a.margin[c], a.spacing[c])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = []
            },
            drawChartBox: function () {
                var a = this.options.chart,
                    b = this.renderer,
                    c = this.chartWidth,
                    d = this.chartHeight,
                    e = this.chartBackground,
                    r = this.plotBackground,
                    h = this.plotBorder,
                    f, p = this.plotBGImage,
                    g = a.backgroundColor,
                    m = a.plotBackgroundColor,
                    k = a.plotBackgroundImage,
                    u, B = this.plotLeft,
                    l = this.plotTop,
                    G = this.plotWidth,
                    v = this.plotHeight,
                    x = this.plotBox,
                    w = this.clipRect,
                    n = this.clipBox,
                    q = "animate";
                e || (this.chartBackground = e = b.rect().addClass("highcharts-background").add(), q = "attr");
                f = a.borderWidth || 0;
                u = f + (a.shadow ? 8 : 0);
                g = {
                    fill: g || "none"
                };
                if (f || e["stroke-width"]) g.stroke = a.borderColor, g["stroke-width"] = f;
                e.attr(g).shadow(a.shadow);
                e[q]({
                    x: u / 2,
                    y: u / 2,
                    width: c - u - f % 2,
                    height: d - u - f % 2,
                    r: a.borderRadius
                });
                q = "animate";
                r || (q = "attr", this.plotBackground = r = b.rect().addClass("highcharts-plot-background").add());
                r[q](x);
                r.attr({
                    fill: m || "none"
                }).shadow(a.plotShadow);
                k && (p ? p.animate(x) : this.plotBGImage = b.image(k, B, l, G, v).add());
                w ? w.animate({
                    width: n.width,
                    height: n.height
                }) : this.clipRect = b.clipRect(n);
                q = "animate";
                h || (q = "attr", this.plotBorder = h = b.rect().addClass("highcharts-plot-border").attr({
                    zIndex: 1
                }).add());
                h.attr({
                    stroke: a.plotBorderColor,
                    "stroke-width": a.plotBorderWidth || 0,
                    fill: "none"
                });
                h[q](h.crisp({
                    x: B,
                    y: l,
                    width: G,
                    height: v
                }, -h.strokeWidth()));
                this.isDirtyBox = !1
            },
            propFromSeries: function () {
                var a = this,
                    b = a.options.chart,
                    c, d = a.options.series,
                    e, r;
                f(["inverted", "angular", "polar"], function (h) {
                    c = p[b.type || b.defaultSeriesType];
                    r = b[h] || c && c.prototype[h];
                    for (e = d && d.length; !r && e--;)(c = p[d[e].type]) && c.prototype[h] && (r = !0);
                    a[h] = r
                })
            },
            linkSeries: function () {
                var a = this,
                    b = a.series;
                f(b, function (a) {
                    a.linkedSeries.length = 0
                });
                f(b, function (b) {
                    var c = b.options.linkedTo;
                    e(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = B(b.options.visible, c.options.visible, b.visible))
                })
            },
            renderSeries: function () {
                f(this.series, function (a) {
                    a.translate();
                    a.render()
                })
            },
            renderLabels: function () {
                var a = this,
                    b = a.options.labels;
                b.items && f(b.items, function (c) {
                    var e = d(b.style, c.style),
                        r = G(e.left) + a.plotLeft,
                        h = G(e.top) + a.plotTop + 12;
                    delete e.left;
                    delete e.top;
                    a.renderer.text(c.html, r, h).attr({
                        zIndex: 2
                    }).css(e).add()
                })
            },
            render: function () {
                var a = this.axes,
                    b = this.renderer,
                    c = this.options,
                    d, e, r;
                this.setTitle();
                this.legend = new E(this, c.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                c = this.plotWidth;
                d = this.plotHeight -= 21;
                f(a, function (a) {
                    a.setScale()
                });
                this.getAxisMargins();
                e = 1.1 < c / this.plotWidth;
                r = 1.05 < d / this.plotHeight;
                if (e || r) f(a, function (a) {
                    (a.horiz && e || !a.horiz && r) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && f(a, function (a) {
                    a.visible && a.render()
                });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({
                    zIndex: 3
                }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            },
            addCredits: function (a) {
                var b = this;
                a = w(!0, this.options.credits, a);
                a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
                    a.href && (N.location.href = a.href)
                }).attr({
                    align: a.position.align,
                    zIndex: 8
                }).css(a.style).add().align(a.position), this.credits.update = function (a) {
                    b.credits = b.credits.destroy();
                    b.addCredits(a)
                })
            },
            destroy: function () {
                var b = this,
                    c = b.axes,
                    d = b.series,
                    e = b.container,
                    r, h = e && e.parentNode;
                v(b, "destroy");
                b.renderer.forExport ? a.erase(t, b) : t[b.index] = void 0;
                a.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                K(b);
                for (r = c.length; r--;) c[r] = c[r].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (r = d.length; r--;) d[r] = d[r].destroy();
                f("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function (a) {
                    var c = b[a];
                    c && c.destroy && (b[a] = c.destroy())
                });
                e && (e.innerHTML = "", K(e), h && q(e));
                I(b, function (a, c) {
                    delete b[c]
                })
            },
            isReadyToRender: function () {
                var a = this;
                return O || N != N.top || "complete" === n.readyState ? !0 : (n.attachEvent("onreadystatechange", function () {
                    n.detachEvent("onreadystatechange", a.firstRender);
                    "complete" === n.readyState && a.firstRender()
                }), !1)
            },
            firstRender: function () {
                var a = this,
                    b = a.options;
                if (a.isReadyToRender()) {
                    a.getContainer();
                    v(a, "init");
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    f(b.series || [], function (b) {
                        a.initSeries(b)
                    });
                    a.linkSeries();
                    v(a, "beforeRender");
                    r && (a.pointer = new r(a, b));
                    a.render();
                    if (!a.renderer.imgCount && a.onload) a.onload();
                    a.temporaryDisplay(!0)
                }
            },
            onload: function () {
                f([this.callback].concat(this.callbacks), function (a) {
                    a && void 0 !== this.index && a.apply(this, [this])
                }, this);
                v(this, "load");
                v(this, "render");
                b(this.index) && !1 !== this.options.chart.reflow && this.initReflow();
                this.onload = null
            }
        })
    })(M);
    (function (a) {
        var C, z = a.each,
            F = a.extend,
            D = a.erase,
            n = a.fireEvent,
            g = a.format,
            k = a.isArray,
            l = a.isNumber,
            q = a.pick,
            t = a.removeEvent;
        a.Point = C = function () {};
        a.Point.prototype = {
            init: function (a, b, f) {
                this.series = a;
                this.color = a.color;
                this.applyOptions(b, f);
                a.options.colorByPoint ? (b = a.options.colors || a.chart.options.colors, this.color = this.color || b[a.colorCounter], b = b.length, f = a.colorCounter, a.colorCounter++, a.colorCounter === b && (a.colorCounter = 0)) : f = a.colorIndex;
                this.colorIndex = q(this.colorIndex, f);
                a.chart.pointCount++;
                return this
            },
            applyOptions: function (a, b) {
                var f = this.series,
                    d = f.options.pointValKey || f.pointValKey;
                a = C.prototype.optionsToObject.call(this, a);
                F(this, a);
                this.options = this.options ? F(this.options, a) : a;
                a.group && delete this.group;
                d && (this.y = this[d]);
                this.isNull = q(this.isValid && !this.isValid(), null === this.x || !l(this.y, !0));
                this.selected && (this.state = "select");
                "name" in this && void 0 === b && f.xAxis && f.xAxis.hasNames && (this.x = f.xAxis.nameToX(this));
                void 0 === this.x && f && (this.x = void 0 === b ? f.autoIncrement(this) : b);
                return this
            },
            optionsToObject: function (a) {
                var b = {},
                    f = this.series,
                    d = f.options.keys,
                    c = d || f.pointArrayMap || ["y"],
                    g = c.length,
                    n = 0,
                    m = 0;
                if (l(a) || null === a) b[c[0]] = a;
                else if (k(a))
                    for (!d && a.length > g && (f = typeof a[0], "string" === f ? b.name = a[0] : "number" === f && (b.x = a[0]), n++); m < g;) d && void 0 === a[n] || (b[c[m]] = a[n]), n++, m++;
                else "object" === typeof a && (b = a, a.dataLabels && (f._hasPointLabels = !0), a.marker && (f._hasPointMarkers = !0));
                return b
            },
            getClassName: function () {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
            },
            getZone: function () {
                var a = this.series,
                    b = a.zones,
                    a = a.zoneAxis || "y",
                    f = 0,
                    d;
                for (d = b[f]; this[a] >= d.value;) d = b[++f];
                d && d.color && !this.options.color && (this.color = d.color);
                return d
            },
            destroy: function () {
                var a = this.series.chart,
                    b = a.hoverPoints,
                    f;
                a.pointCount--;
                b && (this.setState(), D(b, this), b.length || (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel) t(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (f in this) this[f] = null
            },
            destroyElements: function () {
                for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], b, f = 6; f--;) b = a[f], this[b] && (this[b] = this[b].destroy())
            },
            getLabelConfig: function () {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            },
            tooltipFormatter: function (a) {
                var b = this.series,
                    f = b.tooltipOptions,
                    d = q(f.valueDecimals, ""),
                    c = f.valuePrefix || "",
                    k = f.valueSuffix || "";
                z(b.pointArrayMap || ["y"], function (b) {
                    b = "{point." + b;
                    if (c || k) a = a.replace(b + "}", c + b + "}" + k);
                    a = a.replace(b + "}", b + ":,." + d + "f}")
                });
                return g(a, {
                    point: this,
                    series: this.series
                })
            },
            firePointEvent: function (a, b, f) {
                var d = this,
                    c = this.series.options;
                (c.point.events[a] || d.options && d.options.events && d.options.events[a]) && this.importEvents();
                "click" === a && c.allowPointSelect && (f = function (a) {
                    d.select && d.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                n(this, a, b, f)
            },
            visible: !0
        }
    })(M);
    (function (a) {
        var C = a.addEvent,
            z = a.animObject,
            F = a.arrayMax,
            D = a.arrayMin,
            n = a.correctFloat,
            g = a.Date,
            k = a.defaultOptions,
            l = a.defaultPlotOptions,
            q = a.defined,
            t = a.each,
            h = a.erase,
            b = a.extend,
            f = a.fireEvent,
            d = a.grep,
            c = a.isArray,
            v = a.isNumber,
            y = a.isString,
            m = a.merge,
            A = a.objectEach,
            H = a.pick,
            e = a.removeEvent,
            E = a.splat,
            u = a.SVGElement,
            w = a.syncTimeout,
            I = a.win;
        a.Series = a.seriesType("line", null, {
            lineWidth: 2,
            allowPointSelect: !1,
            showCheckbox: !1,
            animation: {
                duration: 1E3
            },
            events: {},
            marker: {
                lineWidth: 0,
                lineColor: "#ffffff",
                radius: 4,
                states: {
                    hover: {
                        animation: {
                            duration: 50
                        },
                        enabled: !0,
                        radiusPlus: 2,
                        lineWidthPlus: 1
                    },
                    select: {
                        fillColor: "#cccccc",
                        lineColor: "#000000",
                        lineWidth: 2
                    }
                }
            },
            point: {
                events: {}
            },
            dataLabels: {
                align: "center",
                formatter: function () {
                    return null === this.y ? "" : a.numberFormat(this.y, -1)
                },
                style: {
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "contrast",
                    textOutline: "1px contrast"
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                padding: 5
            },
            cropThreshold: 300,
            pointRange: 0,
            softThreshold: !0,
            states: {
                hover: {
                    animation: {
                        duration: 50
                    },
                    lineWidthPlus: 1,
                    marker: {},
                    halo: {
                        size: 10,
                        opacity: .25
                    }
                },
                select: {
                    marker: {}
                }
            },
            stickyTracking: !0,
            turboThreshold: 1E3,
            findNearestPointBy: "x"
        }, {
            isCartesian: !0,
            pointClass: a.Point,
            sorted: !0,
            requireSorting: !0,
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            coll: "series",
            init: function (a, c) {
                var d = this,
                    e, h = a.series,
                    f;
                d.chart = a;
                d.options = c = d.setOptions(c);
                d.linkedSeries = [];
                d.bindAxes();
                b(d, {
                    name: c.name,
                    state: "",
                    visible: !1 !== c.visible,
                    selected: !0 === c.selected
                });
                e = c.events;
                A(e, function (a, b) {
                    C(d, b, a)
                });
                if (e && e.click || c.point && c.point.events && c.point.events.click || c.allowPointSelect) a.runTrackerClick = !0;
                d.getColor();
                d.getSymbol();
                t(d.parallelArrays, function (a) {
                    d[a + "Data"] = []
                });
                d.setData(c.data, !1);
                d.isCartesian && (a.hasCartesianSeries = !0);
                h.length && (f = h[h.length - 1]);
                d._i = H(f && f._i, -1) + 1;
                a.orderSeries(this.insert(h))
            },
            insert: function (a) {
                var b = this.options.index,
                    c;
                if (v(b)) {
                    for (c = a.length; c--;)
                        if (b >= H(a[c].options.index, a[c]._i)) {
                            a.splice(c + 1, 0, this);
                            break
                        } - 1 === c && a.unshift(this);
                    c += 1
                } else a.push(this);
                return H(c, a.length - 1)
            },
            bindAxes: function () {
                var b = this,
                    c = b.options,
                    d = b.chart,
                    e;
                t(b.axisTypes || [], function (h) {
                    t(d[h], function (a) {
                        e = a.options;
                        if (c[h] === e.index || void 0 !== c[h] && c[h] === e.id || void 0 === c[h] && 0 === e.index) b.insert(a.series), b[h] = a, a.isDirty = !0
                    });
                    b[h] || b.optionalAxis === h || a.error(18, !0)
                })
            },
            updateParallelArrays: function (a, b) {
                var c = a.series,
                    d = arguments,
                    e = v(b) ? function (d) {
                        var e = "y" === d && c.toYData ? c.toYData(a) : a[d];
                        c[d + "Data"][b] = e
                    } : function (a) {
                        Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(d, 2))
                    };
                t(c.parallelArrays, e)
            },
            autoIncrement: function () {
                var a = this.options,
                    b = this.xIncrement,
                    c, d = a.pointIntervalUnit,
                    b = H(b, a.pointStart, 0);
                this.pointInterval = c = H(this.pointInterval, a.pointInterval, 1);
                d && (a = new g(b), "day" === d ? a = +a[g.hcSetDate](a[g.hcGetDate]() + c) : "month" === d ? a = +a[g.hcSetMonth](a[g.hcGetMonth]() + c) : "year" === d && (a = +a[g.hcSetFullYear](a[g.hcGetFullYear]() + c)), c = a - b);
                this.xIncrement = b + c;
                return b
            },
            setOptions: function (a) {
                var b = this.chart,
                    c = b.options,
                    d = c.plotOptions,
                    e = (b.userOptions || {}).plotOptions || {},
                    h = d[this.type];
                this.userOptions = a;
                b = m(h, d.series, a);
                this.tooltipOptions = m(k.tooltip, k.plotOptions.series && k.plotOptions.series.tooltip, k.plotOptions[this.type].tooltip, c.tooltip.userOptions, d.series && d.series.tooltip, d[this.type].tooltip, a.tooltip);
                this.stickyTracking = H(a.stickyTracking, e[this.type] && e[this.type].stickyTracking, e.series && e.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : b.stickyTracking);
                null === h.marker && delete b.marker;
                this.zoneAxis = b.zoneAxis;
                a = this.zones = (b.zones || []).slice();
                !b.negativeColor && !b.negativeFillColor || b.zones || a.push({
                    value: b[this.zoneAxis + "Threshold"] || b.threshold || 0,
                    className: "highcharts-negative",
                    color: b.negativeColor,
                    fillColor: b.negativeFillColor
                });
                a.length && q(a[a.length - 1].value) && a.push({
                    color: this.color,
                    fillColor: this.fillColor
                });
                return b
            },
            getCyclic: function (a, b, c) {
                var d, e = this.chart,
                    h = this.userOptions,
                    f = a + "Index",
                    g = a + "Counter",
                    m = c ? c.length : H(e.options.chart[a + "Count"], e[a + "Count"]);
                b || (d = H(h[f], h["_" + f]), q(d) || (e.series.length || (e[g] = 0), h["_" + f] = d = e[g] % m, e[g] += 1), c && (b = c[d]));
                void 0 !== d && (this[f] = d);
                this[a] = b
            },
            getColor: function () {
                this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || l[this.type].color, this.chart.options.colors)
            },
            getSymbol: function () {
                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
            setData: function (b, d, e, h) {
                var f = this,
                    g = f.points,
                    m = g && g.length || 0,
                    k, u = f.options,
                    l = f.chart,
                    w = null,
                    n = f.xAxis,
                    q = u.turboThreshold,
                    E = this.xData,
                    A = this.yData,
                    I = (k = f.pointArrayMap) && k.length;
                b = b || [];
                k = b.length;
                d = H(d, !0);
                if (!1 !== h && k && m === k && !f.cropped && !f.hasGroupedData && f.visible) t(b, function (a, b) {
                    g[b].update && a !== u.data[b] && g[b].update(a, !1, null, !1)
                });
                else {
                    f.xIncrement = null;
                    f.colorCounter = 0;
                    t(this.parallelArrays, function (a) {
                        f[a + "Data"].length = 0
                    });
                    if (q && k > q) {
                        for (e = 0; null === w && e < k;) w = b[e], e++;
                        if (v(w))
                            for (e = 0; e < k; e++) E[e] = this.autoIncrement(), A[e] = b[e];
                        else if (c(w))
                            if (I)
                                for (e = 0; e < k; e++) w = b[e], E[e] = w[0], A[e] = w.slice(1, I + 1);
                            else
                                for (e = 0; e < k; e++) w = b[e], E[e] = w[0], A[e] = w[1];
                        else a.error(12)
                    } else
                        for (e = 0; e < k; e++) void 0 !== b[e] && (w = {
                            series: f
                        }, f.pointClass.prototype.applyOptions.apply(w, [b[e]]), f.updateParallelArrays(w, e));
                    y(A[0]) && a.error(14, !0);
                    f.data = [];
                    f.options.data = f.userOptions.data = b;
                    for (e = m; e--;) g[e] && g[e].destroy && g[e].destroy();
                    n && (n.minRange = n.userMinRange);
                    f.isDirty = l.isDirtyBox = !0;
                    f.isDirtyData = !!g;
                    e = !1
                }
                "point" === u.legendType && (this.processData(), this.generatePoints());
                d && l.redraw(e)
            },
            processData: function (b) {
                var c = this.xData,
                    d = this.yData,
                    e = c.length,
                    h;
                h = 0;
                var f, g, m = this.xAxis,
                    k, u = this.options;
                k = u.cropThreshold;
                var l = this.getExtremesFromAll || u.getExtremesFromAll,
                    v = this.isCartesian,
                    u = m && m.val2lin,
                    w = m && m.isLog,
                    n, q;
                if (v && !this.isDirty && !m.isDirty && !this.yAxis.isDirty && !b) return !1;
                m && (b = m.getExtremes(), n = b.min, q = b.max);
                if (v && this.sorted && !l && (!k || e > k || this.forceCrop))
                    if (c[e - 1] < n || c[0] > q) c = [], d = [];
                    else if (c[0] < n || c[e - 1] > q) h = this.cropData(this.xData, this.yData, n, q), c = h.xData, d = h.yData, h = h.start, f = !0;
                for (k = c.length || 1; --k;) e = w ? u(c[k]) - u(c[k - 1]) : c[k] - c[k - 1], 0 < e && (void 0 === g || e < g) ? g = e : 0 > e && this.requireSorting && a.error(15);
                this.cropped = f;
                this.cropStart = h;
                this.processedXData = c;
                this.processedYData = d;
                this.closestPointRange = g
            },
            cropData: function (a, b, c, d) {
                var e = a.length,
                    h = 0,
                    f = e,
                    g = H(this.cropShoulder, 1),
                    m;
                for (m = 0; m < e; m++)
                    if (a[m] >= c) {
                        h = Math.max(0, m - g);
                        break
                    }
                for (c = m; c < e; c++)
                    if (a[c] > d) {
                        f = c + g;
                        break
                    }
                return {
                    xData: a.slice(h, f),
                    yData: b.slice(h, f),
                    start: h,
                    end: f
                }
            },
            generatePoints: function () {
                var a = this.options,
                    b = a.data,
                    c = this.data,
                    d, e = this.processedXData,
                    h = this.processedYData,
                    f = this.pointClass,
                    g = e.length,
                    m = this.cropStart || 0,
                    k, u = this.hasGroupedData,
                    a = a.keys,
                    l, v = [],
                    w;
                c || u || (c = [], c.length = b.length, c = this.data = c);
                a && u && (this.options.keys = !1);
                for (w = 0; w < g; w++) k = m + w, u ? (l = (new f).init(this, [e[w]].concat(E(h[w]))), l.dataGroup = this.groupMap[w]) : (l = c[k]) || void 0 === b[k] || (c[k] = l = (new f).init(this, b[k], e[w])), l && (l.index = k, v[w] = l);
                this.options.keys = a;
                if (c && (g !== (d = c.length) || u))
                    for (w = 0; w < d; w++) w !== m || u || (w += g), c[w] && (c[w].destroyElements(), c[w].plotX = void 0);
                this.data = c;
                this.points = v
            },
            getExtremes: function (a) {
                var b = this.yAxis,
                    d = this.processedXData,
                    e, h = [],
                    f = 0;
                e = this.xAxis.getExtremes();
                var g = e.min,
                    m = e.max,
                    k, u, l, w;
                a = a || this.stackedYData || this.processedYData || [];
                e = a.length;
                for (w = 0; w < e; w++)
                    if (u = d[w], l = a[w], k = (v(l, !0) || c(l)) && (!b.positiveValuesOnly || l.length || 0 < l), u = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (d[w] || u) >= g && (d[w] || u) <= m, k && u)
                        if (k = l.length)
                            for (; k--;) null !== l[k] && (h[f++] = l[k]);
                        else h[f++] = l;
                this.dataMin = D(h);
                this.dataMax = F(h)
            },
            translate: function () {
                this.processedXData || this.processData();
                this.generatePoints();
                var a = this.options,
                    b = a.stacking,
                    c = this.xAxis,
                    d = c.categories,
                    e = this.yAxis,
                    h = this.points,
                    f = h.length,
                    g = !!this.modifyValue,
                    k = a.pointPlacement,
                    m = "between" === k || v(k),
                    u = a.threshold,
                    l = a.startFromThreshold ? u : 0,
                    w, y, t, E, A = Number.MAX_VALUE;
                "between" === k && (k = .5);
                v(k) && (k *= H(a.pointRange || c.pointRange));
                for (a = 0; a < f; a++) {
                    var I = h[a],
                        z = I.x,
                        C = I.y;
                    y = I.low;
                    var F = b && e.stacks[(this.negStacks && C < (l ? 0 : u) ? "-" : "") + this.stackKey],
                        D;
                    e.positiveValuesOnly && null !== C && 0 >= C && (I.isNull = !0);
                    I.plotX = w = n(Math.min(Math.max(-1E5, c.translate(z, 0, 0, 0, 1, k, "flags" === this.type)), 1E5));
                    b && this.visible && !I.isNull && F && F[z] && (E = this.getStackIndicator(E, z, this.index), D = F[z], C = D.points[E.key], y = C[0], C = C[1], y === l && E.key === F[z].base && (y = H(u, e.min)), e.positiveValuesOnly && 0 >= y && (y = null), I.total = I.stackTotal = D.total, I.percentage = D.total && I.y / D.total * 100, I.stackY = C, D.setOffset(this.pointXOffset || 0, this.barW || 0));
                    I.yBottom = q(y) ? e.translate(y, 0, 1, 0, 1) : null;
                    g && (C = this.modifyValue(C, I));
                    I.plotY = y = "number" === typeof C && Infinity !== C ? Math.min(Math.max(-1E5, e.translate(C, 0, 1, 0, 1)), 1E5) : void 0;
                    I.isInside = void 0 !== y && 0 <= y && y <= e.len && 0 <= w && w <= c.len;
                    I.clientX = m ? n(c.translate(z, 0, 0, 0, 1, k)) : w;
                    I.negative = I.y < (u || 0);
                    I.category = d && void 0 !== d[I.x] ? d[I.x] : I.x;
                    I.isNull || (void 0 !== t && (A = Math.min(A, Math.abs(w - t))), t = w);
                    I.zone = this.zones.length && I.getZone()
                }
                this.closestPointRangePx = A
            },
            getValidPoints: function (a, b) {
                var c = this.chart;
                return d(a || this.points || [], function (a) {
                    return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : !a.isNull
                })
            },
            setClip: function (a) {
                var b = this.chart,
                    c = this.options,
                    d = b.renderer,
                    e = b.inverted,
                    h = this.clipBox,
                    f = h || b.clipBox,
                    g = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, f.height, c.xAxis, c.yAxis].join(),
                    k = b[g],
                    m = b[g + "m"];
                k || (a && (f.width = 0, b[g + "m"] = m = d.clipRect(-99, e ? -b.plotLeft : -b.plotTop, 99, e ? b.chartWidth : b.chartHeight)), b[g] = k = d.clipRect(f), k.count = {
                    length: 0
                });
                a && !k.count[this.index] && (k.count[this.index] = !0, k.count.length += 1);
                !1 !== c.clip && (this.group.clip(a || h ? k : b.clipRect), this.markerGroup.clip(m), this.sharedClipKey = g);
                a || (k.count[this.index] && (delete k.count[this.index], --k.count.length), 0 === k.count.length && g && b[g] && (h || (b[g] = b[g].destroy()), b[g + "m"] && (b[g + "m"] = b[g + "m"].destroy())))
            },
            animate: function (a) {
                var b = this.chart,
                    c = z(this.options.animation),
                    d;
                a ? this.setClip(c) : (d = this.sharedClipKey, (a = b[d]) && a.animate({
                    width: b.plotSizeX
                }, c), b[d + "m"] && b[d + "m"].animate({
                    width: b.plotSizeX + 99
                }, c), this.animate = null)
            },
            afterAnimate: function () {
                this.setClip();
                f(this, "afterAnimate");
                this.finishedAnimating = !0
            },
            drawPoints: function () {
                var a = this.points,
                    b = this.chart,
                    c, d, e, h, f = this.options.marker,
                    g, k, m, u, l = this[this.specialGroup] || this.markerGroup,
                    w = H(f.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx >= 2 * f.radius);
                if (!1 !== f.enabled || this._hasPointMarkers)
                    for (d = 0; d < a.length; d++) e = a[d], c = e.plotY, h = e.graphic, g = e.marker || {}, k = !!e.marker, m = w && void 0 === g.enabled || g.enabled, u = e.isInside, m && v(c) && null !== e.y ? (c = H(g.symbol, this.symbol), e.hasImage = 0 === c.indexOf("url"), m = this.markerAttribs(e, e.selected && "select"), h ? h[u ? "show" : "hide"](!0).animate(m) : u && (0 < m.width || e.hasImage) && (e.graphic = h = b.renderer.symbol(c, m.x, m.y, m.width, m.height, k ? g : f).add(l)), h && h.attr(this.pointAttribs(e, e.selected && "select")), h && h.addClass(e.getClassName(), !0)) : h && (e.graphic = h.destroy())
            },
            markerAttribs: function (a, b) {
                var c = this.options.marker,
                    d = a.marker || {},
                    e = H(d.radius, c.radius);
                b && (c = c.states[b], b = d.states && d.states[b], e = H(b && b.radius, c && c.radius, e + (c && c.radiusPlus || 0)));
                a.hasImage && (e = 0);
                a = {
                    x: Math.floor(a.plotX) - e,
                    y: a.plotY - e
                };
                e && (a.width = a.height = 2 * e);
                return a
            },
            pointAttribs: function (a, b) {
                var c = this.options.marker,
                    d = a && a.options,
                    e = d && d.marker || {},
                    h = this.color,
                    f = d && d.color,
                    g = a && a.color,
                    d = H(e.lineWidth, c.lineWidth);
                a = a && a.zone && a.zone.color;
                h = f || a || g || h;
                a = e.fillColor || c.fillColor || h;
                h = e.lineColor || c.lineColor || h;
                b && (c = c.states[b], b = e.states && e.states[b] || {}, d = H(b.lineWidth, c.lineWidth, d + H(b.lineWidthPlus, c.lineWidthPlus, 0)), a = b.fillColor || c.fillColor || a, h = b.lineColor || c.lineColor || h);
                return {
                    stroke: h,
                    "stroke-width": d,
                    fill: a
                }
            },
            destroy: function () {
                var a = this,
                    b = a.chart,
                    c = /AppleWebKit\/533/.test(I.navigator.userAgent),
                    d, g, k = a.data || [],
                    m, l;
                f(a, "destroy");
                e(a);
                t(a.axisTypes || [], function (b) {
                    (l = a[b]) && l.series && (h(l.series, a), l.isDirty = l.forceRedraw = !0)
                });
                a.legendItem && a.chart.legend.destroyItem(a);
                for (g = k.length; g--;)(m = k[g]) && m.destroy && m.destroy();
                a.points = null;
                clearTimeout(a.animationTimeout);
                A(a, function (a, b) {
                    a instanceof u && !a.survive && (d = c && "group" === b ? "hide" : "destroy", a[d]())
                });
                b.hoverSeries === a && (b.hoverSeries = null);
                h(b.series, a);
                b.orderSeries();
                A(a, function (b, c) {
                    delete a[c]
                })
            },
            getGraphPath: function (a, b, c) {
                var d = this,
                    e = d.options,
                    h = e.step,
                    f, g = [],
                    k = [],
                    m;
                a = a || d.points;
                (f = a.reversed) && a.reverse();
                (h = {
                    right: 1,
                    center: 2
                } [h] || h && 3) && f && (h = 4 - h);
                !e.connectNulls || b || c || (a = this.getValidPoints(a));
                t(a, function (f, u) {
                    var l = f.plotX,
                        w = f.plotY,
                        v = a[u - 1];
                    (f.leftCliff || v && v.rightCliff) && !c && (m = !0);
                    f.isNull && !q(b) && 0 < u ? m = !e.connectNulls : f.isNull && !b ? m = !0 : (0 === u || m ? u = ["M", f.plotX, f.plotY] : d.getPointSpline ? u = d.getPointSpline(a, f, u) : h ? (u = 1 === h ? ["L", v.plotX, w] : 2 === h ? ["L", (v.plotX + l) / 2, v.plotY, "L", (v.plotX + l) / 2, w] : ["L", l, v.plotY], u.push("L", l, w)) : u = ["L", l, w], k.push(f.x), h && k.push(f.x), g.push.apply(g, u), m = !1)
                });
                g.xMap = k;
                return d.graphPath = g
            },
            drawGraph: function () {
                var a = this,
                    b = this.options,
                    c = (this.gappedPath || this.getGraphPath).call(this),
                    d = [
                        ["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]
                    ];
                t(this.zones, function (c, e) {
                    d.push(["zone-graph-" + e, "highcharts-graph highcharts-zone-graph-" + e + " " + (c.className || ""), c.color || a.color, c.dashStyle || b.dashStyle])
                });
                t(d, function (d, e) {
                    var h = d[0],
                        f = a[h];
                    f ? (f.endX = c.xMap, f.animate({
                        d: c
                    })) : c.length && (a[h] = a.chart.renderer.path(c).addClass(d[1]).attr({
                        zIndex: 1
                    }).add(a.group), f = {
                        stroke: d[2],
                        "stroke-width": b.lineWidth,
                        fill: a.fillGraph && a.color || "none"
                    }, d[3] ? f.dashstyle = d[3] : "square" !== b.linecap && (f["stroke-linecap"] = f["stroke-linejoin"] = "round"), f = a[h].attr(f).shadow(2 > e && b.shadow));
                    f && (f.startX = c.xMap, f.isArea = c.isArea)
                })
            },
            applyZones: function () {
                var a = this,
                    b = this.chart,
                    c = b.renderer,
                    d = this.zones,
                    e, h, f = this.clips || [],
                    g, k = this.graph,
                    m = this.area,
                    u = Math.max(b.chartWidth, b.chartHeight),
                    l = this[(this.zoneAxis || "y") + "Axis"],
                    w, v, n = b.inverted,
                    q, y, E, A, I = !1;
                d.length && (k || m) && l && void 0 !== l.min && (v = l.reversed, q = l.horiz, k && k.hide(), m && m.hide(), w = l.getExtremes(), t(d, function (d, t) {
                    e = v ? q ? b.plotWidth : 0 : q ? 0 : l.toPixels(w.min);
                    e = Math.min(Math.max(H(h, e), 0), u);
                    h = Math.min(Math.max(Math.round(l.toPixels(H(d.value, w.max), !0)), 0), u);
                    I && (e = h = l.toPixels(w.max));
                    y = Math.abs(e - h);
                    E = Math.min(e, h);
                    A = Math.max(e, h);
                    l.isXAxis ? (g = {
                        x: n ? A : E,
                        y: 0,
                        width: y,
                        height: u
                    }, q || (g.x = b.plotHeight - g.x)) : (g = {
                        x: 0,
                        y: n ? A : E,
                        width: u,
                        height: y
                    }, q && (g.y = b.plotWidth - g.y));
                    n && c.isVML && (g = l.isXAxis ? {
                        x: 0,
                        y: v ? E : A,
                        height: g.width,
                        width: b.chartWidth
                    } : {
                        x: g.y - b.plotLeft - b.spacingBox.x,
                        y: 0,
                        width: g.height,
                        height: b.chartHeight
                    });
                    f[t] ? f[t].animate(g) : (f[t] = c.clipRect(g), k && a["zone-graph-" + t].clip(f[t]), m && a["zone-area-" + t].clip(f[t]));
                    I = d.value > w.max
                }), this.clips = f)
            },
            invertGroups: function (a) {
                function b() {
                    t(["group", "markerGroup"], function (b) {
                        c[b] && (d.renderer.isVML && c[b].attr({
                            width: c.yAxis.len,
                            height: c.xAxis.len
                        }), c[b].width = c.yAxis.len, c[b].height = c.xAxis.len, c[b].invert(a))
                    })
                }
                var c = this,
                    d = c.chart,
                    e;
                c.xAxis && (e = C(d, "resize", b), C(c, "destroy", e), b(a), c.invertGroups = b)
            },
            plotGroup: function (a, b, c, d, e) {
                var h = this[a],
                    f = !h;
                f && (this[a] = h = this.chart.renderer.g().attr({
                    zIndex: d || .1
                }).add(e));
                h.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series highcharts-color-" + this.colorIndex + " " + (this.options.className || ""), !0);
                h.attr({
                    visibility: c
                })[f ? "attr" : "animate"](this.getPlotBox());
                return h
            },
            getPlotBox: function () {
                var a = this.chart,
                    b = this.xAxis,
                    c = this.yAxis;
                a.inverted && (b = c, c = this.xAxis);
                return {
                    translateX: b ? b.left : a.plotLeft,
                    translateY: c ? c.top : a.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            },
            render: function () {
                var a = this,
                    b = a.chart,
                    c, d = a.options,
                    e = !!a.animate && b.renderer.isSVG && z(d.animation).duration,
                    h = a.visible ? "inherit" : "hidden",
                    f = d.zIndex,
                    g = a.hasRendered,
                    k = b.seriesGroup,
                    m = b.inverted;
                c = a.plotGroup("group", "series", h, f, k);
                a.markerGroup = a.plotGroup("markerGroup", "markers", h, f, k);
                e && a.animate(!0);
                c.inverted = a.isCartesian ? m : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels && a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(m);
                !1 === d.clip || a.sharedClipKey || g || c.clip(b.clipRect);
                e && a.animate();
                g || (a.animationTimeout = w(function () {
                    a.afterAnimate()
                }, e));
                a.isDirty = !1;
                a.hasRendered = !0
            },
            redraw: function () {
                var a = this.chart,
                    b = this.isDirty || this.isDirtyData,
                    c = this.group,
                    d = this.xAxis,
                    e = this.yAxis;
                c && (a.inverted && c.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), c.animate({
                    translateX: H(d && d.left, a.plotLeft),
                    translateY: H(e && e.top, a.plotTop)
                }));
                this.translate();
                this.render();
                b && delete this.kdTree
            },
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function (a, b) {
                var c = this.xAxis,
                    d = this.yAxis,
                    e = this.chart.inverted;
                return this.searchKDTree({
                    clientX: e ? c.len - a.chartY + c.pos : a.chartX - c.pos,
                    plotY: e ? d.len - a.chartX + d.pos : a.chartY - d.pos
                }, b)
            },
            buildKDTree: function () {
                function a(c, d, e) {
                    var h, f;
                    if (f = c && c.length) return h = b.kdAxisArray[d % e], c.sort(function (a, b) {
                        return a[h] - b[h]
                    }), f = Math.floor(f / 2), {
                        point: c[f],
                        left: a(c.slice(0, f), d + 1, e),
                        right: a(c.slice(f + 1), d + 1, e)
                    }
                }
                this.buildingKdTree = !0;
                var b = this,
                    c = -1 < b.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                delete b.kdTree;
                w(function () {
                    b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c);
                    b.buildingKdTree = !1
                }, b.options.kdNow ? 0 : 1)
            },
            searchKDTree: function (a, b) {
                function c(a, b, g, k) {
                    var m = b.point,
                        r = d.kdAxisArray[g % k],
                        u, l, w = m;
                    l = q(a[e]) && q(m[e]) ? Math.pow(a[e] - m[e], 2) : null;
                    u = q(a[h]) && q(m[h]) ? Math.pow(a[h] - m[h], 2) : null;
                    u = (l || 0) + (u || 0);
                    m.dist = q(u) ? Math.sqrt(u) : Number.MAX_VALUE;
                    m.distX = q(l) ? Math.sqrt(l) : Number.MAX_VALUE;
                    r = a[r] - m[r];
                    u = 0 > r ? "left" : "right";
                    l = 0 > r ? "right" : "left";
                    b[u] && (u = c(a, b[u], g + 1, k), w = u[f] < w[f] ? u : m);
                    b[l] && Math.sqrt(r * r) < w[f] && (a = c(a, b[l], g + 1, k), w = a[f] < w[f] ? a : w);
                    return w
                }
                var d = this,
                    e = this.kdAxisArray[0],
                    h = this.kdAxisArray[1],
                    f = b ? "distX" : "dist";
                b = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree || this.buildKDTree();
                if (this.kdTree) return c(a, this.kdTree, b, b)
            }
        })
    })(M);
    (function (a) {
        var C = a.Axis,
            z = a.Chart,
            F = a.correctFloat,
            D = a.defined,
            n = a.destroyObjectProperties,
            g = a.each,
            k = a.format,
            l = a.objectEach,
            q = a.pick,
            t = a.Series;
        a.StackItem = function (a, b, f, d, c) {
            var g = a.chart.inverted;
            this.axis = a;
            this.isNegative = f;
            this.options = b;
            this.x = d;
            this.total = null;
            this.points = {};
            this.stack = c;
            this.rightCliff = this.leftCliff = 0;
            this.alignOptions = {
                align: b.align || (g ? f ? "left" : "right" : "center"),
                verticalAlign: b.verticalAlign || (g ? "middle" : f ? "bottom" : "top"),
                y: q(b.y, g ? 4 : f ? 14 : -6),
                x: q(b.x, g ? f ? -6 : 6 : 0)
            };
            this.textAlign = b.textAlign || (g ? f ? "right" : "left" : "center")
        };
        a.StackItem.prototype = {
            destroy: function () {
                n(this, this.axis)
            },
            render: function (a) {
                var b = this.options,
                    f = b.format,
                    f = f ? k(f, this) : b.formatter.call(this);
                this.label ? this.label.attr({
                    text: f,
                    visibility: "hidden"
                }) : this.label = this.axis.chart.renderer.text(f, null, null, b.useHTML).css(b.style).attr({
                    align: this.textAlign,
                    rotation: b.rotation,
                    visibility: "hidden"
                }).add(a)
            },
            setOffset: function (a, b) {
                var f = this.axis,
                    d = f.chart,
                    c = f.translate(f.usePercentage ? 100 : this.total, 0, 0, 0, 1),
                    f = f.translate(0),
                    f = Math.abs(c - f);
                a = d.xAxis[0].translate(this.x) + a;
                c = this.getStackBox(d, this, a, c, b, f);
                if (b = this.label) b.align(this.alignOptions, null, c), c = b.alignAttr, b[!1 === this.options.crop || d.isInsidePlot(c.x, c.y) ? "show" : "hide"](!0)
            },
            getStackBox: function (a, b, f, d, c, g) {
                var k = b.axis.reversed,
                    m = a.inverted;
                a = a.plotHeight;
                b = b.isNegative && !k || !b.isNegative && k;
                return {
                    x: m ? b ? d : d - g : f,
                    y: m ? a - f - c : b ? a - d - g : a - d,
                    width: m ? g : c,
                    height: m ? c : g
                }
            }
        };
        z.prototype.getStacks = function () {
            var a = this;
            g(a.yAxis, function (a) {
                a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks)
            });
            g(a.series, function (b) {
                !b.options.stacking || !0 !== b.visible && !1 !== a.options.chart.ignoreHiddenSeries || (b.stackKey = b.type + q(b.options.stack, ""))
            })
        };
        C.prototype.buildStacks = function () {
            var a = this.series,
                b = q(this.options.reversedStacks, !0),
                f = a.length,
                d;
            if (!this.isXAxis) {
                this.usePercentage = !1;
                for (d = f; d--;) a[b ? d : f - d - 1].setStackedPoints();
                if (this.usePercentage)
                    for (d = 0; d < f; d++) a[d].setPercentStacks()
            }
        };
        C.prototype.renderStackTotals = function () {
            var a = this.chart,
                b = a.renderer,
                f = this.stacks,
                d = this.stackTotalGroup;
            d || (this.stackTotalGroup = d = b.g("stack-labels").attr({
                visibility: "visible",
                zIndex: 6
            }).add());
            d.translate(a.plotLeft, a.plotTop);
            l(f, function (a) {
                l(a, function (a) {
                    a.render(d)
                })
            })
        };
        C.prototype.resetStacks = function () {
            var a = this,
                b = a.stacks;
            a.isXAxis || l(b, function (b) {
                l(b, function (d, c) {
                    d.touched < a.stacksTouched ? (d.destroy(), delete b[c]) : (d.total = null, d.cum = null)
                })
            })
        };
        C.prototype.cleanStacks = function () {
            var a;
            this.isXAxis || (this.oldStacks && (a = this.stacks = this.oldStacks), l(a, function (a) {
                l(a, function (a) {
                    a.cum = a.total
                })
            }))
        };
        t.prototype.setStackedPoints = function () {
            if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var h = this.processedXData,
                    b = this.processedYData,
                    f = [],
                    d = b.length,
                    c = this.options,
                    g = c.threshold,
                    k = c.startFromThreshold ? g : 0,
                    m = c.stack,
                    c = c.stacking,
                    l = this.stackKey,
                    n = "-" + l,
                    e = this.negStacks,
                    t = this.yAxis,
                    u = t.stacks,
                    w = t.oldStacks,
                    I, r, B, G, z, p, x;
                t.stacksTouched += 1;
                for (z = 0; z < d; z++) p = h[z], x = b[z], I = this.getStackIndicator(I, p, this.index), G = I.key, B = (r = e && x < (k ? 0 : g)) ? n : l, u[B] || (u[B] = {}), u[B][p] || (w[B] && w[B][p] ? (u[B][p] = w[B][p], u[B][p].total = null) : u[B][p] = new a.StackItem(t, t.options.stackLabels, r, p, m)), B = u[B][p], null !== x && (B.points[G] = B.points[this.index] = [q(B.cum, k)], D(B.cum) || (B.base = G), B.touched = t.stacksTouched, 0 < I.index && !1 === this.singleStacks && (B.points[G][0] = B.points[this.index + "," + p + ",0"][0])), "percent" === c ? (r = r ? l : n, e && u[r] && u[r][p] ? (r = u[r][p], B.total = r.total = Math.max(r.total, B.total) + Math.abs(x) || 0) : B.total = F(B.total + (Math.abs(x) || 0))) : B.total = F(B.total + (x || 0)), B.cum = q(B.cum, k) + (x || 0), null !== x && (B.points[G].push(B.cum), f[z] = B.cum);
                "percent" === c && (t.usePercentage = !0);
                this.stackedYData = f;
                t.oldStacks = {}
            }
        };
        t.prototype.setPercentStacks = function () {
            var a = this,
                b = a.stackKey,
                f = a.yAxis.stacks,
                d = a.processedXData,
                c;
            g([b, "-" + b], function (b) {
                for (var g = d.length, k, l; g--;)
                    if (k = d[g], c = a.getStackIndicator(c, k, a.index, b), k = (l = f[b] && f[b][k]) && l.points[c.key]) l = l.total ? 100 / l.total : 0, k[0] = F(k[0] * l), k[1] = F(k[1] * l), a.stackedYData[g] = k[1]
            })
        };
        t.prototype.getStackIndicator = function (a, b, f, d) {
            !D(a) || a.x !== b || d && a.key !== d ? a = {
                x: b,
                index: 0,
                key: d
            } : a.index++;
            a.key = [f, b, a.index].join();
            return a
        }
    })(M);
    (function (a) {
        var C = a.addEvent,
            z = a.animate,
            F = a.Axis,
            D = a.createElement,
            n = a.css,
            g = a.defined,
            k = a.each,
            l = a.erase,
            q = a.extend,
            t = a.fireEvent,
            h = a.inArray,
            b = a.isNumber,
            f = a.isObject,
            d = a.isArray,
            c = a.merge,
            v = a.objectEach,
            y = a.pick,
            m = a.Point,
            A = a.Series,
            H = a.seriesTypes,
            e = a.setAnimation,
            E = a.splat;
        q(a.Chart.prototype, {
            addSeries: function (a, b, c) {
                var d, e = this;
                a && (b = y(b, !0), t(e, "addSeries", {
                    options: a
                }, function () {
                    d = e.initSeries(a);
                    e.isDirtyLegend = !0;
                    e.linkSeries();
                    b && e.redraw(c)
                }));
                return d
            },
            addAxis: function (a, b, d, e) {
                var f = b ? "xAxis" : "yAxis",
                    h = this.options;
                a = c(a, {
                    index: this[f].length,
                    isX: b
                });
                b = new F(this, a);
                h[f] = E(h[f] || {});
                h[f].push(a);
                y(d, !0) && this.redraw(e);
                return b
            },
            showLoading: function (a) {
                var b = this,
                    c = b.options,
                    d = b.loadingDiv,
                    e = c.loading,
                    f = function () {
                        d && n(d, {
                            left: b.plotLeft + "px",
                            top: b.plotTop + "px",
                            width: b.plotWidth + "px",
                            height: b.plotHeight + "px"
                        })
                    };
                d || (b.loadingDiv = d = D("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, b.container), b.loadingSpan = D("span", {
                    className: "highcharts-loading-inner"
                }, null, d), C(b, "redraw", f));
                d.className = "highcharts-loading";
                b.loadingSpan.innerHTML = a || c.lang.loading;
                n(d, q(e.style, {
                    zIndex: 10
                }));
                n(b.loadingSpan, e.labelStyle);
                b.loadingShown || (n(d, {
                    opacity: 0,
                    display: ""
                }), z(d, {
                    opacity: e.style.opacity || .5
                }, {
                    duration: e.showDuration || 0
                }));
                b.loadingShown = !0;
                f()
            },
            hideLoading: function () {
                var a = this.options,
                    b = this.loadingDiv;
                b && (b.className = "highcharts-loading highcharts-loading-hidden", z(b, {
                    opacity: 0
                }, {
                    duration: a.loading.hideDuration || 100,
                    complete: function () {
                        n(b, {
                            display: "none"
                        })
                    }
                }));
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions tooltip".split(" "),
            update: function (a, d, e) {
                var f = this,
                    m = {
                        credits: "addCredits",
                        title: "setTitle",
                        subtitle: "setSubtitle"
                    },
                    l = a.chart,
                    n, p, q = [];
                if (l) {
                    c(!0, f.options.chart, l);
                    "className" in l && f.setClassName(l.className);
                    if ("inverted" in l || "polar" in l) f.propFromSeries(), n = !0;
                    "alignTicks" in l && (n = !0);
                    v(l, function (a, b) {
                        -1 !== h("chart." + b, f.propsRequireUpdateSeries) && (p = !0); - 1 !== h(b, f.propsRequireDirtyBox) && (f.isDirtyBox = !0)
                    });
                    "style" in l && f.renderer.setStyle(l.style)
                }
                a.colors && (this.options.colors = a.colors);
                a.plotOptions && c(!0, this.options.plotOptions, a.plotOptions);
                v(a, function (a, b) {
                    if (f[b] && "function" === typeof f[b].update) f[b].update(a, !1);
                    else if ("function" === typeof f[m[b]]) f[m[b]](a);
                    "chart" !== b && -1 !== h(b, f.propsRequireUpdateSeries) && (p = !0)
                });
                k("xAxis yAxis zAxis series colorAxis pane".split(" "), function (b) {
                    a[b] && (k(E(a[b]), function (a, c) {
                        (c = g(a.id) && f.get(a.id) || f[b][c]) && c.coll === b && (c.update(a, !1), e && (c.touched = !0));
                        if (!c && e)
                            if ("series" === b) f.addSeries(a, !1).touched = !0;
                            else if ("xAxis" === b || "yAxis" === b) f.addAxis(a, "xAxis" === b, !1).touched = !0
                    }), e && k(f[b], function (a) {
                        a.touched ? delete a.touched : q.push(a)
                    }))
                });
                k(q, function (a) {
                    a.remove(!1)
                });
                n && k(f.axes, function (a) {
                    a.update({}, !1)
                });
                p && k(f.series, function (a) {
                    a.update({}, !1)
                });
                a.loading && c(!0, f.options.loading, a.loading);
                n = l && l.width;
                l = l && l.height;
                b(n) && n !== f.chartWidth || b(l) && l !== f.chartHeight ? f.setSize(n, l) : y(d, !0) && f.redraw()
            },
            setSubtitle: function (a) {
                this.setTitle(void 0, a)
            }
        });
        q(m.prototype, {
            update: function (a, b, c, d) {
                function e() {
                    h.applyOptions(a);
                    null === h.y && k && (h.graphic = k.destroy());
                    f(a, !0) && (k && k.element && a && a.marker && void 0 !== a.marker.symbol && (h.graphic = k.destroy()), a && a.dataLabels && h.dataLabel && (h.dataLabel = h.dataLabel.destroy()));
                    m = h.index;
                    g.updateParallelArrays(h, m);
                    n.data[m] = f(n.data[m], !0) || f(a, !0) ? h.options : a;
                    g.isDirty = g.isDirtyData = !0;
                    !g.fixedBox && g.hasCartesianSeries && (l.isDirtyBox = !0);
                    "point" === n.legendType && (l.isDirtyLegend = !0);
                    b && l.redraw(c)
                }
                var h = this,
                    g = h.series,
                    k = h.graphic,
                    m, l = g.chart,
                    n = g.options;
                b = y(b, !0);
                !1 === d ? e() : h.firePointEvent("update", {
                    options: a
                }, e)
            },
            remove: function (a, b) {
                this.series.removePoint(h(this, this.series.data), a, b)
            }
        });
        q(A.prototype, {
            addPoint: function (a, b, c, d) {
                var e = this.options,
                    f = this.data,
                    h = this.chart,
                    g = this.xAxis,
                    g = g && g.hasNames && g.names,
                    k = e.data,
                    m, l, n = this.xData,
                    v, q;
                b = y(b, !0);
                m = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(m, [a]);
                q = m.x;
                v = n.length;
                if (this.requireSorting && q < n[v - 1])
                    for (l = !0; v && n[v - 1] > q;) v--;
                this.updateParallelArrays(m, "splice", v, 0, 0);
                this.updateParallelArrays(m, v);
                g && m.name && (g[q] = m.name);
                k.splice(v, 0, a);
                l && (this.data.splice(v, 0, null), this.processData());
                "point" === e.legendType && this.generatePoints();
                c && (f[0] && f[0].remove ? f[0].remove(!1) : (f.shift(), this.updateParallelArrays(m, "shift"), k.shift()));
                this.isDirtyData = this.isDirty = !0;
                b && h.redraw(d)
            },
            removePoint: function (a, b, c) {
                var d = this,
                    f = d.data,
                    h = f[a],
                    g = d.points,
                    k = d.chart,
                    m = function () {
                        g && g.length === f.length && g.splice(a, 1);
                        f.splice(a, 1);
                        d.options.data.splice(a, 1);
                        d.updateParallelArrays(h || {
                            series: d
                        }, "splice", a, 1);
                        h && h.destroy();
                        d.isDirty = !0;
                        d.isDirtyData = !0;
                        b && k.redraw()
                    };
                e(c, k);
                b = y(b, !0);
                h ? h.firePointEvent("remove", null, m) : m()
            },
            remove: function (a, b, c) {
                function d() {
                    e.destroy();
                    f.isDirtyLegend = f.isDirtyBox = !0;
                    f.linkSeries();
                    y(a, !0) && f.redraw(b)
                }
                var e = this,
                    f = e.chart;
                !1 !== c ? t(e, "remove", null, d) : d()
            },
            update: function (a, b) {
                var d = this,
                    e = d.chart,
                    f = d.userOptions,
                    h = d.oldType || d.type,
                    g = a.type || f.type || e.options.chart.type,
                    m = H[h].prototype,
                    l, n = ["group", "markerGroup", "dataLabelsGroup", "navigatorSeries", "baseSeries"],
                    v = d.finishedAnimating && {
                        animation: !1
                    };
                if (Object.keys && "data" === Object.keys(a).toString()) return this.setData(a.data, b);
                if (g && g !== h || void 0 !== a.zIndex) n.length = 0;
                k(n, function (a) {
                    n[a] = d[a];
                    delete d[a]
                });
                a = c(f, v, {
                    index: d.index,
                    pointStart: d.xData[0]
                }, {
                    data: d.options.data
                }, a);
                d.remove(!1, null, !1);
                for (l in m) d[l] = void 0;
                q(d, H[g || h].prototype);
                k(n, function (a) {
                    d[a] = n[a]
                });
                d.init(e, a);
                d.oldType = h;
                e.linkSeries();
                y(b, !0) && e.redraw(!1)
            }
        });
        q(F.prototype, {
            update: function (a, b) {
                var d = this.chart;
                a = d.options[this.coll][this.options.index] = c(this.userOptions, a);
                this.destroy(!0);
                this.init(d, q(a, {
                    events: void 0
                }));
                d.isDirtyBox = !0;
                y(b, !0) && d.redraw()
            },
            remove: function (a) {
                for (var b = this.chart, c = this.coll, e = this.series, f = e.length; f--;) e[f] && e[f].remove(!1);
                l(b.axes, this);
                l(b[c], this);
                d(b.options[c]) ? b.options[c].splice(this.options.index, 1) : delete b.options[c];
                k(b[c], function (a, b) {
                    a.options.index = b
                });
                this.destroy();
                b.isDirtyBox = !0;
                y(a, !0) && b.redraw()
            },
            setTitle: function (a, b) {
                this.update({
                    title: a
                }, b)
            },
            setCategories: function (a, b) {
                this.update({
                    categories: a
                }, b)
            }
        })
    })(M);
    (function (a) {
        var C = a.color,
            z = a.each,
            F = a.map,
            D = a.pick,
            n = a.Series,
            g = a.seriesType;
        g("area", "line", {
            softThreshold: !1,
            threshold: 0
        }, {
            singleStacks: !1,
            getStackPoints: function (g) {
                var l = [],
                    n = [],
                    t = this.xAxis,
                    h = this.yAxis,
                    b = h.stacks[this.stackKey],
                    f = {},
                    d = this.index,
                    c = h.series,
                    v = c.length,
                    y, m = D(h.options.reversedStacks, !0) ? 1 : -1,
                    A;
                g = g || this.points;
                if (this.options.stacking) {
                    for (A = 0; A < g.length; A++) f[g[A].x] = g[A];
                    a.objectEach(b, function (a, b) {
                        null !== a.total && n.push(b)
                    });
                    n.sort(function (a, b) {
                        return a - b
                    });
                    y = F(c, function () {
                        return this.visible
                    });
                    z(n, function (a, c) {
                        var g = 0,
                            k, w;
                        if (f[a] && !f[a].isNull) l.push(f[a]), z([-1, 1], function (h) {
                            var g = 1 === h ? "rightNull" : "leftNull",
                                l = 0,
                                t = b[n[c + h]];
                            if (t)
                                for (A = d; 0 <= A && A < v;)(k = t.points[A]) || (A === d ? f[a][g] = !0 : y[A] && (w = b[a].points[A]) && (l -= w[1] - w[0])), A += m;
                            f[a][1 === h ? "rightCliff" : "leftCliff"] = l
                        });
                        else {
                            for (A = d; 0 <= A && A < v;) {
                                if (k = b[a].points[A]) {
                                    g = k[1];
                                    break
                                }
                                A += m
                            }
                            g = h.translate(g, 0, 1, 0, 1);
                            l.push({
                                isNull: !0,
                                plotX: t.translate(a, 0, 0, 0, 1),
                                x: a,
                                plotY: g,
                                yBottom: g
                            })
                        }
                    })
                }
                return l
            },
            getGraphPath: function (a) {
                var g = n.prototype.getGraphPath,
                    q = this.options,
                    t = q.stacking,
                    h = this.yAxis,
                    b, f, d = [],
                    c = [],
                    v = this.index,
                    y, m = h.stacks[this.stackKey],
                    A = q.threshold,
                    H = h.getThreshold(q.threshold),
                    e, q = q.connectNulls || "percent" === t,
                    E = function (b, e, f) {
                        var g = a[b];
                        b = t && m[g.x].points[v];
                        var l = g[f + "Null"] || 0;
                        f = g[f + "Cliff"] || 0;
                        var n, q, g = !0;
                        f || l ? (n = (l ? b[0] : b[1]) + f, q = b[0] + f, g = !!l) : !t && a[e] && a[e].isNull && (n = q = A);
                        void 0 !== n && (c.push({
                            plotX: y,
                            plotY: null === n ? H : h.getThreshold(n),
                            isNull: g,
                            isCliff: !0
                        }), d.push({
                            plotX: y,
                            plotY: null === q ? H : h.getThreshold(q),
                            doCurve: !1
                        }))
                    };
                a = a || this.points;
                t && (a = this.getStackPoints(a));
                for (b = 0; b < a.length; b++)
                    if (f = a[b].isNull, y = D(a[b].rectPlotX, a[b].plotX), e = D(a[b].yBottom, H), !f || q) q || E(b, b - 1, "left"), f && !t && q || (c.push(a[b]), d.push({
                        x: b,
                        plotX: y,
                        plotY: e
                    })), q || E(b, b + 1, "right");
                b = g.call(this, c, !0, !0);
                d.reversed = !0;
                f = g.call(this, d, !0, !0);
                f.length && (f[0] = "L");
                f = b.concat(f);
                g = g.call(this, c, !1, q);
                f.xMap = b.xMap;
                this.areaPath = f;
                return g
            },
            drawGraph: function () {
                this.areaPath = [];
                n.prototype.drawGraph.apply(this);
                var a = this,
                    g = this.areaPath,
                    q = this.options,
                    t = [
                        ["area", "highcharts-area", this.color, q.fillColor]
                    ];
                z(this.zones, function (h, b) {
                    t.push(["zone-area-" + b, "highcharts-area highcharts-zone-area-" + b + " " + h.className, h.color || a.color, h.fillColor || q.fillColor])
                });
                z(t, function (h) {
                    var b = h[0],
                        f = a[b];
                    f ? (f.endX = g.xMap, f.animate({
                        d: g
                    })) : (f = a[b] = a.chart.renderer.path(g).addClass(h[1]).attr({
                        fill: D(h[3], C(h[2]).setOpacity(D(q.fillOpacity, .75)).get()),
                        zIndex: 0
                    }).add(a.group), f.isArea = !0);
                    f.startX = g.xMap;
                    f.shiftUnit = q.step ? 2 : 1
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(M);
    (function (a) {
        var C = a.pick;
        a = a.seriesType;
        a("spline", "line", {}, {
            getPointSpline: function (a, F, D) {
                var n = F.plotX,
                    g = F.plotY,
                    k = a[D - 1];
                D = a[D + 1];
                var l, q, t, h;
                if (k && !k.isNull && !1 !== k.doCurve && !F.isCliff && D && !D.isNull && !1 !== D.doCurve && !F.isCliff) {
                    a = k.plotY;
                    t = D.plotX;
                    D = D.plotY;
                    var b = 0;
                    l = (1.5 * n + k.plotX) / 2.5;
                    q = (1.5 * g + a) / 2.5;
                    t = (1.5 * n + t) / 2.5;
                    h = (1.5 * g + D) / 2.5;
                    t !== l && (b = (h - q) * (t - n) / (t - l) + g - h);
                    q += b;
                    h += b;
                    q > a && q > g ? (q = Math.max(a, g), h = 2 * g - q) : q < a && q < g && (q = Math.min(a, g), h = 2 * g - q);
                    h > D && h > g ? (h = Math.max(D, g), q = 2 * g - h) : h < D && h < g && (h = Math.min(D, g), q = 2 * g - h);
                    F.rightContX = t;
                    F.rightContY = h
                }
                F = ["C", C(k.rightContX, k.plotX), C(k.rightContY, k.plotY), C(l, n), C(q, g), n, g];
                k.rightContX = k.rightContY = null;
                return F
            }
        })
    })(M);
    (function (a) {
        var C = a.seriesTypes.area.prototype,
            z = a.seriesType;
        z("areaspline", "spline", a.defaultPlotOptions.area, {
            getStackPoints: C.getStackPoints,
            getGraphPath: C.getGraphPath,
            drawGraph: C.drawGraph,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(M);
    (function (a) {
        var C = a.animObject,
            z = a.color,
            F = a.each,
            D = a.extend,
            n = a.isNumber,
            g = a.merge,
            k = a.pick,
            l = a.Series,
            q = a.seriesType,
            t = a.svg;
        q("column", "line", {
            borderRadius: 0,
            crisp: !0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {
                    halo: !1,
                    brightness: .1,
                    shadow: !1
                },
                select: {
                    color: "#cccccc",
                    borderColor: "#000000",
                    shadow: !1
                }
            },
            dataLabels: {
                align: null,
                verticalAlign: null,
                y: null
            },
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {
                distance: 6
            },
            threshold: 0,
            borderColor: "#ffffff"
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function () {
                l.prototype.init.apply(this, arguments);
                var a = this,
                    b = a.chart;
                b.hasRendered && F(b.series, function (b) {
                    b.type === a.type && (b.isDirty = !0)
                })
            },
            getColumnMetrics: function () {
                var a = this,
                    b = a.options,
                    f = a.xAxis,
                    d = a.yAxis,
                    c = f.reversed,
                    g, l = {},
                    m = 0;
                !1 === b.grouping ? m = 1 : F(a.chart.series, function (b) {
                    var c = b.options,
                        e = b.yAxis,
                        f;
                    b.type !== a.type || !b.visible && a.chart.options.chart.ignoreHiddenSeries || d.len !== e.len || d.pos !== e.pos || (c.stacking ? (g = b.stackKey, void 0 === l[g] && (l[g] = m++), f = l[g]) : !1 !== c.grouping && (f = m++), b.columnIndex = f)
                });
                var n = Math.min(Math.abs(f.transA) * (f.ordinalSlope || b.pointRange || f.closestPointRange || f.tickInterval || 1), f.len),
                    q = n * b.groupPadding,
                    e = (n - 2 * q) / (m || 1),
                    b = Math.min(b.maxPointWidth || f.len, k(b.pointWidth, e * (1 - 2 * b.pointPadding)));
                a.columnMetrics = {
                    width: b,
                    offset: (e - b) / 2 + (q + ((a.columnIndex || 0) + (c ? 1 : 0)) * e - n / 2) * (c ? -1 : 1)
                };
                return a.columnMetrics
            },
            crispCol: function (a, b, f, d) {
                var c = this.chart,
                    g = this.borderWidth,
                    k = -(g % 2 ? .5 : 0),
                    g = g % 2 ? .5 : 1;
                c.inverted && c.renderer.isVML && (g += 1);
                this.options.crisp && (f = Math.round(a + f) + k, a = Math.round(a) + k, f -= a);
                d = Math.round(b + d) + g;
                k = .5 >= Math.abs(b) && .5 < d;
                b = Math.round(b) + g;
                d -= b;
                k && d && (--b, d += 1);
                return {
                    x: a,
                    y: b,
                    width: f,
                    height: d
                }
            },
            translate: function () {
                var a = this,
                    b = a.chart,
                    f = a.options,
                    d = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
                    d = a.borderWidth = k(f.borderWidth, d ? 0 : 1),
                    c = a.yAxis,
                    g = a.translatedThreshold = c.getThreshold(f.threshold),
                    n = k(f.minPointLength, 5),
                    m = a.getColumnMetrics(),
                    q = m.width,
                    t = a.barW = Math.max(q, 1 + 2 * d),
                    e = a.pointXOffset = m.offset;
                b.inverted && (g -= .5);
                f.pointPadding && (t = Math.ceil(t));
                l.prototype.translate.apply(a);
                F(a.points, function (d) {
                    var f = k(d.yBottom, g),
                        m = 999 + Math.abs(f),
                        m = Math.min(Math.max(-m, d.plotY), c.len + m),
                        l = d.plotX + e,
                        r = t,
                        B = Math.min(m, f),
                        z, C = Math.max(m, f) - B;
                    Math.abs(C) < n && n && (C = n, z = !c.reversed && !d.negative || c.reversed && d.negative, B = Math.abs(B - g) > n ? f - n : g - (z ? n : 0));
                    d.barX = l;
                    d.pointWidth = q;
                    d.tooltipPos = b.inverted ? [c.len + c.pos - b.plotLeft - m, a.xAxis.len - l - r / 2, C] : [l + r / 2, m + c.pos - b.plotTop, C];
                    d.shapeType = "rect";
                    d.shapeArgs = a.crispCol.apply(a, d.isNull ? [l, g, r, 0] : [l, B, r, C])
                })
            },
            getSymbol: a.noop,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawGraph: function () {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            pointAttribs: function (a, b) {
                var f = this.options,
                    d, c = this.pointAttrToOptions || {};
                d = c.stroke || "borderColor";
                var k = c["stroke-width"] || "borderWidth",
                    l = a && a.color || this.color,
                    m = a[d] || f[d] || this.color || l,
                    n = a[k] || f[k] || this[k] || 0,
                    c = f.dashStyle;
                a && this.zones.length && (l = a.getZone(), l = a.options.color || l && l.color || this.color);
                b && (a = g(f.states[b], a.options.states && a.options.states[b] || {}), b = a.brightness, l = a.color || void 0 !== b && z(l).brighten(a.brightness).get() || l, m = a[d] || m, n = a[k] || n, c = a.dashStyle || c);
                d = {
                    fill: l,
                    stroke: m,
                    "stroke-width": n
                };
                c && (d.dashstyle = c);
                return d
            },
            drawPoints: function () {
                var a = this,
                    b = this.chart,
                    f = a.options,
                    d = b.renderer,
                    c = f.animationLimit || 250,
                    k;
                F(a.points, function (l) {
                    var m = l.graphic;
                    if (n(l.plotY) && null !== l.y) {
                        k = l.shapeArgs;
                        if (m) m[b.pointCount < c ? "animate" : "attr"](g(k));
                        else l.graphic = m = d[l.shapeType](k).add(l.group || a.group);
                        f.borderRadius && m.attr({
                            r: f.borderRadius
                        });
                        m.attr(a.pointAttribs(l, l.selected && "select")).shadow(f.shadow, null, f.stacking && !f.borderRadius);
                        m.addClass(l.getClassName(), !0)
                    } else m && (l.graphic = m.destroy())
                })
            },
            animate: function (a) {
                var b = this,
                    f = this.yAxis,
                    d = b.options,
                    c = this.chart.inverted,
                    g = {};
                t && (a ? (g.scaleY = .001, a = Math.min(f.pos + f.len, Math.max(f.pos, f.toPixels(d.threshold))), c ? g.translateX = a - f.len : g.translateY = a, b.group.attr(g)) : (g[c ? "translateX" : "translateY"] = f.pos, b.group.animate(g, D(C(b.options.animation), {
                    step: function (a, c) {
                        b.group.attr({
                            scaleY: Math.max(.001, c.pos)
                        })
                    }
                })), b.animate = null))
            },
            remove: function () {
                var a = this,
                    b = a.chart;
                b.hasRendered && F(b.series, function (b) {
                    b.type === a.type && (b.isDirty = !0)
                });
                l.prototype.remove.apply(a, arguments)
            }
        })
    })(M);
    (function (a) {
        a = a.seriesType;
        a("bar", "column", null, {
            inverted: !0
        })
    })(M);
    (function (a) {
        var C = a.Series;
        a = a.seriesType;
        a("scatter", "line", {
            lineWidth: 0,
            findNearestPointBy: "xy",
            marker: {
                enabled: !0
            },
            tooltip: {
                headerFormat: '<span style="color:{point.color}">●</span> <span style="font-size: 0.85em"> {series.name}</span><br/>',
                pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            drawGraph: function () {
                this.options.lineWidth && C.prototype.drawGraph.call(this)
            }
        })
    })(M);
    (function (a) {
        var C = a.pick,
            z = a.relativeLength;
        a.CenteredSeriesMixin = {
            getCenter: function () {
                var a = this.options,
                    D = this.chart,
                    n = 2 * (a.slicedOffset || 0),
                    g = D.plotWidth - 2 * n,
                    D = D.plotHeight - 2 * n,
                    k = a.center,
                    k = [C(k[0], "50%"), C(k[1], "50%"), a.size || "100%", a.innerSize || 0],
                    l = Math.min(g, D),
                    q, t;
                for (q = 0; 4 > q; ++q) t = k[q], a = 2 > q || 2 === q && /%$/.test(t), k[q] = z(t, [g, D, l, k[2]][q]) + (a ? n : 0);
                k[3] > k[2] && (k[3] = k[2]);
                return k
            }
        }
    })(M);
    (function (a) {
        var C = a.addEvent,
            z = a.defined,
            F = a.each,
            D = a.extend,
            n = a.inArray,
            g = a.noop,
            k = a.pick,
            l = a.Point,
            q = a.Series,
            t = a.seriesType,
            h = a.setAnimation;
        t("pie", "line", {
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                distance: 30,
                enabled: !0,
                formatter: function () {
                    return this.point.isNull ? void 0 : this.point.name
                },
                x: 0
            },
            ignoreHiddenPoint: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {
                followPointer: !0
            },
            borderColor: "#ffffff",
            borderWidth: 1,
            states: {
                hover: {
                    brightness: .1,
                    shadow: !1
                }
            }
        }, {
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            axisTypes: [],
            pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
            animate: function (a) {
                var f = this,
                    d = f.points,
                    c = f.startAngleRad;
                a || (F(d, function (a) {
                    var b = a.graphic,
                        d = a.shapeArgs;
                    b && (b.attr({
                        r: a.startR || f.center[3] / 2,
                        start: c,
                        end: c
                    }), b.animate({
                        r: d.r,
                        start: d.start,
                        end: d.end
                    }, f.options.animation))
                }), f.animate = null)
            },
            updateTotals: function () {
                var a, f = 0,
                    d = this.points,
                    c = d.length,
                    g, h = this.options.ignoreHiddenPoint;
                for (a = 0; a < c; a++) g = d[a], f += h && !g.visible ? 0 : g.isNull ? 0 : g.y;
                this.total = f;
                for (a = 0; a < c; a++) g = d[a], g.percentage = 0 < f && (g.visible || !h) ? g.y / f * 100 : 0, g.total = f
            },
            generatePoints: function () {
                q.prototype.generatePoints.call(this);
                this.updateTotals()
            },
            translate: function (a) {
                this.generatePoints();
                var f = 0,
                    d = this.options,
                    c = d.slicedOffset,
                    g = c + (d.borderWidth || 0),
                    h, m, l, n = d.startAngle || 0,
                    e = this.startAngleRad = Math.PI / 180 * (n - 90),
                    n = (this.endAngleRad = Math.PI / 180 * (k(d.endAngle, n + 360) - 90)) - e,
                    q = this.points,
                    u, w = d.dataLabels.distance,
                    d = d.ignoreHiddenPoint,
                    t, r = q.length,
                    B;
                a || (this.center = a = this.getCenter());
                this.getX = function (c, d, e) {
                    l = Math.asin(Math.min((c - a[1]) / (a[2] / 2 + e.labelDistance), 1));
                    return a[0] + (d ? -1 : 1) * Math.cos(l) * (a[2] / 2 + e.labelDistance)
                };
                for (t = 0; t < r; t++) {
                    B = q[t];
                    B.labelDistance = k(B.options.dataLabels && B.options.dataLabels.distance, w);
                    this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, B.labelDistance);
                    h = e + f * n;
                    if (!d || B.visible) f += B.percentage / 100;
                    m = e + f * n;
                    B.shapeType = "arc";
                    B.shapeArgs = {
                        x: a[0],
                        y: a[1],
                        r: a[2] / 2,
                        innerR: a[3] / 2,
                        start: Math.round(1E3 * h) / 1E3,
                        end: Math.round(1E3 * m) / 1E3
                    };
                    l = (m + h) / 2;
                    l > 1.5 * Math.PI ? l -= 2 * Math.PI : l < -Math.PI / 2 && (l += 2 * Math.PI);
                    B.slicedTranslation = {
                        translateX: Math.round(Math.cos(l) * c),
                        translateY: Math.round(Math.sin(l) * c)
                    };
                    m = Math.cos(l) * a[2] / 2;
                    u = Math.sin(l) * a[2] / 2;
                    B.tooltipPos = [a[0] + .7 * m, a[1] + .7 * u];
                    B.half = l < -Math.PI / 2 || l > Math.PI / 2 ? 1 : 0;
                    B.angle = l;
                    h = Math.min(g, B.labelDistance / 5);
                    B.labelPos = [a[0] + m + Math.cos(l) * B.labelDistance, a[1] + u + Math.sin(l) * B.labelDistance, a[0] + m + Math.cos(l) * h, a[1] + u + Math.sin(l) * h, a[0] + m, a[1] + u, 0 > B.labelDistance ? "center" : B.half ? "right" : "left", l]
                }
            },
            drawGraph: null,
            drawPoints: function () {
                var a = this,
                    f = a.chart.renderer,
                    d, c, g, h, k = a.options.shadow;
                k && !a.shadowGroup && (a.shadowGroup = f.g("shadow").add(a.group));
                F(a.points, function (l) {
                    if (!l.isNull) {
                        c = l.graphic;
                        h = l.shapeArgs;
                        d = l.getTranslate();
                        var n = l.shadowGroup;
                        k && !n && (n = l.shadowGroup = f.g("shadow").add(a.shadowGroup));
                        n && n.attr(d);
                        g = a.pointAttribs(l, l.selected && "select");
                        c ? c.setRadialReference(a.center).attr(g).animate(D(h, d)) : (l.graphic = c = f[l.shapeType](h).setRadialReference(a.center).attr(d).add(a.group), l.visible || c.attr({
                            visibility: "hidden"
                        }), c.attr(g).attr({
                            "stroke-linejoin": "round"
                        }).shadow(k, n));
                        c.addClass(l.getClassName())
                    }
                })
            },
            searchPoint: g,
            sortByAngle: function (a, f) {
                a.sort(function (a, b) {
                    return void 0 !== a.angle && (b.angle - a.angle) * f
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            getCenter: a.CenteredSeriesMixin.getCenter,
            getSymbol: g
        }, {
            init: function () {
                l.prototype.init.apply(this, arguments);
                var a = this,
                    f;
                a.name = k(a.name, "Slice");
                f = function (d) {
                    a.slice("select" === d.type)
                };
                C(a, "select", f);
                C(a, "unselect", f);
                return a
            },
            isValid: function () {
                return a.isNumber(this.y, !0) && 0 <= this.y
            },
            setVisible: function (a, f) {
                var d = this,
                    c = d.series,
                    g = c.chart,
                    h = c.options.ignoreHiddenPoint;
                f = k(f, h);
                a !== d.visible && (d.visible = d.options.visible = a = void 0 === a ? !d.visible : a, c.options.data[n(d, c.data)] = d.options, F(["graphic", "dataLabel", "connector", "shadowGroup"], function (c) {
                    if (d[c]) d[c][a ? "show" : "hide"](!0)
                }), d.legendItem && g.legend.colorizeItem(d, a), a || "hover" !== d.state || d.setState(""), h && (c.isDirty = !0), f && g.redraw())
            },
            slice: function (a, f, d) {
                var c = this.series;
                h(d, c.chart);
                k(f, !0);
                this.sliced = this.options.sliced = z(a) ? a : !this.sliced;
                c.options.data[n(this, c.data)] = this.options;
                this.graphic.animate(this.getTranslate());
                this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
            },
            getTranslate: function () {
                return this.sliced ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }
            },
            haloPath: function (a) {
                var f = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(f.x, f.y, f.r + a, f.r + a, {
                    innerR: this.shapeArgs.r,
                    start: f.start,
                    end: f.end
                })
            }
        })
    })(M);
    (function (a) {
        var C = a.addEvent,
            z = a.arrayMax,
            F = a.defined,
            D = a.each,
            n = a.extend,
            g = a.format,
            k = a.map,
            l = a.merge,
            q = a.noop,
            t = a.pick,
            h = a.relativeLength,
            b = a.Series,
            f = a.seriesTypes,
            d = a.stableSort;
        a.distribute = function (a, b) {
            function f(a, b) {
                return a.target - b.target
            }
            var g, h = !0,
                l = a,
                e = [],
                n;
            n = 0;
            for (g = a.length; g--;) n += a[g].size;
            if (n > b) {
                d(a, function (a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (n = g = 0; n <= b;) n += a[g].size, g++;
                e = a.splice(g - 1, a.length)
            }
            d(a, f);
            for (a = k(a, function (a) {
                    return {
                        size: a.size,
                        targets: [a.target]
                    }
                }); h;) {
                for (g = a.length; g--;) h = a[g], n = (Math.min.apply(0, h.targets) + Math.max.apply(0, h.targets)) / 2, h.pos = Math.min(Math.max(0, n - h.size / 2), b - h.size);
                g = a.length;
                for (h = !1; g--;) 0 < g && a[g - 1].pos + a[g - 1].size > a[g].pos && (a[g - 1].size += a[g].size, a[g - 1].targets = a[g - 1].targets.concat(a[g].targets), a[g - 1].pos + a[g - 1].size > b && (a[g - 1].pos = b - a[g - 1].size), a.splice(g, 1), h = !0)
            }
            g = 0;
            D(a, function (a) {
                var b = 0;
                D(a.targets, function () {
                    l[g].pos = a.pos + b;
                    b += l[g].size;
                    g++
                })
            });
            l.push.apply(l, e);
            d(l, f)
        };
        b.prototype.drawDataLabels = function () {
            var b = this,
                d = b.options,
                f = d.dataLabels,
                h = b.points,
                k, n, e = b.hasRendered || 0,
                q, u, w = t(f.defer, !!d.animation),
                z = b.chart.renderer;
            if (f.enabled || b._hasPointLabels) b.dlProcessOptions && b.dlProcessOptions(f), u = b.plotGroup("dataLabelsGroup", "data-labels", w && !e ? "hidden" : "visible", f.zIndex || 6), w && (u.attr({
                opacity: +e
            }), e || C(b, "afterAnimate", function () {
                b.visible && u.show(!0);
                u[d.animation ? "animate" : "attr"]({
                    opacity: 1
                }, {
                    duration: 200
                })
            })), n = f, D(h, function (e) {
                var h, m = e.dataLabel,
                    w, p, x = e.connector,
                    C = !m,
                    D;
                k = e.dlOptions || e.options && e.options.dataLabels;
                if (h = t(k && k.enabled, n.enabled) && null !== e.y) f = l(n, k), w = e.getLabelConfig(), q = f.format ? g(f.format, w) : f.formatter.call(w, f), D = f.style, w = f.rotation, D.color = t(f.color, D.color, b.color, "#000000"), "contrast" === D.color && (e.contrastColor = z.getContrast(e.color || b.color), D.color = f.inside || 0 > t(e.labelDistance, f.distance) || d.stacking ? e.contrastColor : "#000000"), d.cursor && (D.cursor = d.cursor), p = {
                    fill: f.backgroundColor,
                    stroke: f.borderColor,
                    "stroke-width": f.borderWidth,
                    r: f.borderRadius || 0,
                    rotation: w,
                    padding: f.padding,
                    zIndex: 1
                }, a.objectEach(p, function (a, b) {
                    void 0 === a && delete p[b]
                });
                !m || h && F(q) ? h && F(q) && (m ? p.text = q : (m = e.dataLabel = z[w ? "text" : "label"](q, 0, -9999, f.shape, null, null, f.useHTML, null, "data-label"), m.addClass("highcharts-data-label-color-" + e.colorIndex + " " + (f.className || "") + (f.useHTML ? "highcharts-tracker" : ""))), m.attr(p), m.css(D).shadow(f.shadow), m.added || m.add(u), b.alignDataLabel(e, m, f, null, C)) : (e.dataLabel = m = m.destroy(), x && (e.connector = x.destroy()))
            })
        };
        b.prototype.alignDataLabel = function (a, b, d, f, g) {
            var h = this.chart,
                e = h.inverted,
                k = t(a.plotX, -9999),
                l = t(a.plotY, -9999),
                q = b.getBBox(),
                z, r = d.rotation,
                B = d.align,
                C = this.visible && (a.series.forceDL || h.isInsidePlot(k, Math.round(l), e) || f && h.isInsidePlot(k, e ? f.x + 1 : f.y + f.height - 1, e)),
                D = "justify" === t(d.overflow, "justify");
            if (C && (z = d.style.fontSize, z = h.renderer.fontMetrics(z, b).b, f = n({
                    x: e ? this.yAxis.len - l : k,
                    y: Math.round(e ? this.xAxis.len - k : l),
                    width: 0,
                    height: 0
                }, f), n(d, {
                    width: q.width,
                    height: q.height
                }), r ? (D = !1, k = h.renderer.rotCorr(z, r), k = {
                    x: f.x + d.x + f.width / 2 + k.x,
                    y: f.y + d.y + {
                        top: 0,
                        middle: .5,
                        bottom: 1
                    } [d.verticalAlign] * f.height
                }, b[g ? "attr" : "animate"](k).attr({
                    align: B
                }), l = (r + 720) % 360, l = 180 < l && 360 > l, "left" === B ? k.y -= l ? q.height : 0 : "center" === B ? (k.x -= q.width / 2, k.y -= q.height / 2) : "right" === B && (k.x -= q.width, k.y -= l ? 0 : q.height)) : (b.align(d, null, f), k = b.alignAttr), D ? a.isLabelJustified = this.justifyDataLabel(b, d, k, q, f, g) : t(d.crop, !0) && (C = h.isInsidePlot(k.x, k.y) && h.isInsidePlot(k.x + q.width, k.y + q.height)), d.shape && !r)) b[g ? "attr" : "animate"]({
                anchorX: e ? h.plotWidth - a.plotY : a.plotX,
                anchorY: e ? h.plotHeight - a.plotX : a.plotY
            });
            C || (b.attr({
                y: -9999
            }), b.placed = !1)
        };
        b.prototype.justifyDataLabel = function (a, b, d, f, g, h) {
            var e = this.chart,
                k = b.align,
                l = b.verticalAlign,
                n, q, r = a.box ? 0 : a.padding || 0;
            n = d.x + r;
            0 > n && ("right" === k ? b.align = "left" : b.x = -n, q = !0);
            n = d.x + f.width - r;
            n > e.plotWidth && ("left" === k ? b.align = "right" : b.x = e.plotWidth - n, q = !0);
            n = d.y + r;
            0 > n && ("bottom" === l ? b.verticalAlign = "top" : b.y = -n, q = !0);
            n = d.y + f.height - r;
            n > e.plotHeight && ("top" === l ? b.verticalAlign = "bottom" : b.y = e.plotHeight - n, q = !0);
            q && (a.placed = !h, a.align(b, null, g));
            return q
        };
        f.pie && (f.pie.prototype.drawDataLabels = function () {
            var c = this,
                d = c.data,
                f, g = c.chart,
                h = c.options.dataLabels,
                k = t(h.connectorPadding, 10),
                e = t(h.connectorWidth, 1),
                l = g.plotWidth,
                n = g.plotHeight,
                q, C = c.center,
                r = C[2] / 2,
                B = C[1],
                G, K, p, x, M = [
                    [],
                    []
                ],
                L, N, P, Q, J = [0, 0, 0, 0];
            c.visible && (h.enabled || c._hasPointLabels) && (D(d, function (a) {
                a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({
                    width: "auto"
                }).css({
                    width: "auto",
                    textOverflow: "clip"
                }), a.dataLabel.shortened = !1)
            }), b.prototype.drawDataLabels.apply(c), D(d, function (a) {
                a.dataLabel && a.visible && (M[a.half].push(a), a.dataLabel._pos = null)
            }), D(M, function (b, d) {
                var e, q, w = b.length,
                    v = [],
                    z;
                if (w)
                    for (c.sortByAngle(b, d - .5), 0 < c.maxLabelDistance && (e = Math.max(0, B - r - c.maxLabelDistance), q = Math.min(B + r + c.maxLabelDistance, g.plotHeight), D(b, function (a) {
                            0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, B - r - a.labelDistance), a.bottom = Math.min(B + r + a.labelDistance, g.plotHeight), z = a.dataLabel.getBBox().height || 21, a.positionsIndex = v.push({
                                target: a.labelPos[1] - a.top + z / 2,
                                size: z,
                                rank: a.y
                            }) - 1)
                        }), a.distribute(v, q + z - e)), Q = 0; Q < w; Q++) f = b[Q], q = f.positionsIndex, p = f.labelPos, G = f.dataLabel, P = !1 === f.visible ? "hidden" : "inherit", e = p[1], v && F(v[q]) ? void 0 === v[q].pos ? P = "hidden" : (x = v[q].size, N = f.top + v[q].pos) : N = e, delete f.positionIndex, L = h.justify ? C[0] + (d ? -1 : 1) * (r + f.labelDistance) : c.getX(N < f.top + 2 || N > f.bottom - 2 ? e : N, d, f), G._attr = {
                        visibility: P,
                        align: p[6]
                    }, G._pos = {
                        x: L + h.x + ({
                            left: k,
                            right: -k
                        } [p[6]] || 0),
                        y: N + h.y - 10
                    }, p.x = L, p.y = N, t(h.crop, !0) && (K = G.getBBox().width, e = null, L - K < k ? (e = Math.round(K - L + k), J[3] = Math.max(e, J[3])) : L + K > l - k && (e = Math.round(L + K - l + k), J[1] = Math.max(e, J[1])), 0 > N - x / 2 ? J[0] = Math.max(Math.round(-N + x / 2), J[0]) : N + x / 2 > n && (J[2] = Math.max(Math.round(N + x / 2 - n), J[2])), G.sideOverflow = e)
            }), 0 === z(J) || this.verifyDataLabelOverflow(J)) && (this.placeDataLabels(), e && D(this.points, function (a) {
                var b;
                q = a.connector;
                if ((G = a.dataLabel) && G._pos && a.visible && 0 < a.labelDistance) {
                    P = G._attr.visibility;
                    if (b = !q) a.connector = q = g.renderer.path().addClass("highcharts-data-label-connector highcharts-color-" + a.colorIndex).add(c.dataLabelsGroup), q.attr({
                        "stroke-width": e,
                        stroke: h.connectorColor || a.color || "#666666"
                    });
                    q[b ? "attr" : "animate"]({
                        d: c.connectorPath(a.labelPos)
                    });
                    q.attr("visibility", P)
                } else q && (a.connector = q.destroy())
            }))
        }, f.pie.prototype.connectorPath = function (a) {
            var b = a.x,
                d = a.y;
            return t(this.options.dataLabels.softConnector, !0) ? ["M", b + ("left" === a[6] ? 5 : -5), d, "C", b, d, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" === a[6] ? 5 : -5), d, "L", a[2], a[3], "L", a[4], a[5]]
        }, f.pie.prototype.placeDataLabels = function () {
            D(this.points, function (a) {
                var b = a.dataLabel;
                b && a.visible && ((a = b._pos) ? (b.sideOverflow && (b._attr.width = b.getBBox().width - b.sideOverflow, b.css({
                    width: b._attr.width + "px",
                    textOverflow: "ellipsis"
                }), b.shortened = !0), b.attr(b._attr), b[b.moved ? "animate" : "attr"](a), b.moved = !0) : b && b.attr({
                    y: -9999
                }))
            }, this)
        }, f.pie.prototype.alignDataLabel = q, f.pie.prototype.verifyDataLabelOverflow = function (a) {
            var b = this.center,
                d = this.options,
                f = d.center,
                g = d.minSize || 80,
                k, e = null !== d.size;
            e || (null !== f[0] ? k = Math.max(b[2] - Math.max(a[1], a[3]), g) : (k = Math.max(b[2] - a[1] - a[3], g), b[0] += (a[3] - a[1]) / 2), null !== f[1] ? k = Math.max(Math.min(k, b[2] - Math.max(a[0], a[2])), g) : (k = Math.max(Math.min(k, b[2] - a[0] - a[2]), g), b[1] += (a[0] - a[2]) / 2), k < b[2] ? (b[2] = k, b[3] = Math.min(h(d.innerSize || 0, k), k), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : e = !0);
            return e
        });
        f.column && (f.column.prototype.alignDataLabel = function (a, d, f, g, h) {
            var k = this.chart.inverted,
                e = a.series,
                n = a.dlBox || a.shapeArgs,
                q = t(a.below, a.plotY > t(this.translatedThreshold, e.yAxis.len)),
                w = t(f.inside, !!this.options.stacking);
            n && (g = l(n), 0 > g.y && (g.height += g.y, g.y = 0), n = g.y + g.height - e.yAxis.len, 0 < n && (g.height -= n), k && (g = {
                x: e.yAxis.len - g.y - g.height,
                y: e.xAxis.len - g.x - g.width,
                width: g.height,
                height: g.width
            }), w || (k ? (g.x += q ? 0 : g.width, g.width = 0) : (g.y += q ? g.height : 0, g.height = 0)));
            f.align = t(f.align, !k || w ? "center" : q ? "right" : "left");
            f.verticalAlign = t(f.verticalAlign, k || w ? "middle" : q ? "top" : "bottom");
            b.prototype.alignDataLabel.call(this, a, d, f, g, h);
            a.isLabelJustified && a.contrastColor && a.dataLabel.css({
                color: a.contrastColor
            })
        })
    })(M);
    (function (a) {
        var C = a.Chart,
            z = a.each,
            F = a.objectEach,
            D = a.pick,
            n = a.addEvent;
        C.prototype.callbacks.push(function (a) {
            function k() {
                var k = [];
                z(a.yAxis || [], function (a) {
                    a.options.stackLabels && !a.options.stackLabels.allowOverlap && F(a.stacks, function (a) {
                        F(a, function (a) {
                            k.push(a.label)
                        })
                    })
                });
                z(a.series || [], function (a) {
                    var g = a.options.dataLabels,
                        h = a.dataLabelCollections || ["dataLabel"];
                    (g.enabled || a._hasPointLabels) && !g.allowOverlap && a.visible && z(h, function (b) {
                        z(a.points, function (a) {
                            a[b] && (a[b].labelrank = D(a.labelrank, a.shapeArgs && a.shapeArgs.height), k.push(a[b]))
                        })
                    })
                });
                a.hideOverlappingLabels(k)
            }
            k();
            n(a, "redraw", k)
        });
        C.prototype.hideOverlappingLabels = function (a) {
            var k = a.length,
                l, n, t, h, b, f, d, c, v, y = function (a, b, c, d, f, g, h, k) {
                    return !(f > a + c || f + h < a || g > b + d || g + k < b)
                };
            for (n = 0; n < k; n++)
                if (l = a[n]) l.oldOpacity = l.opacity, l.newOpacity = 1, l.width || (t = l.getBBox(), l.width = t.width, l.height = t.height);
            a.sort(function (a, b) {
                return (b.labelrank || 0) - (a.labelrank || 0)
            });
            for (n = 0; n < k; n++)
                for (t = a[n], l = n + 1; l < k; ++l)
                    if (h = a[l], t && h && t !== h && t.placed && h.placed && 0 !== t.newOpacity && 0 !== h.newOpacity && (b = t.alignAttr, f = h.alignAttr, d = t.parentGroup, c = h.parentGroup, v = 2 * (t.box ? 0 : t.padding || 0), b = y(b.x + d.translateX, b.y + d.translateY, t.width - v, t.height - v, f.x + c.translateX, f.y + c.translateY, h.width - v, h.height - v)))(t.labelrank < h.labelrank ? t : h).newOpacity = 0;
            z(a, function (a) {
                var b, c;
                a && (c = a.newOpacity, a.oldOpacity !== c && a.placed && (c ? a.show(!0) : b = function () {
                    a.hide()
                }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)), a.isOld = !0)
            })
        }
    })(M);
    (function (a) {
        var C = a.addEvent,
            z = a.Chart,
            F = a.createElement,
            D = a.css,
            n = a.defaultOptions,
            g = a.defaultPlotOptions,
            k = a.each,
            l = a.extend,
            q = a.fireEvent,
            t = a.hasTouch,
            h = a.inArray,
            b = a.isObject,
            f = a.Legend,
            d = a.merge,
            c = a.pick,
            v = a.Point,
            y = a.Series,
            m = a.seriesTypes,
            A = a.svg,
            H;
        H = a.TrackerMixin = {
            drawTrackerPoint: function () {
                var a = this,
                    b = a.chart.pointer,
                    c = function (a) {
                        var c = b.getPointFromEvent(a);
                        void 0 !== c && (b.isDirectTouch = !0, c.onMouseOver(a))
                    };
                k(a.points, function (a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a)
                });
                a._hasTracking || (k(a.trackerGroups, function (d) {
                    if (a[d]) {
                        a[d].addClass("highcharts-tracker").on("mouseover", c).on("mouseout", function (a) {
                            b.onTrackerMouseOut(a)
                        });
                        if (t) a[d].on("touchstart", c);
                        a.options.cursor && a[d].css(D).css({
                            cursor: a.options.cursor
                        })
                    }
                }), a._hasTracking = !0)
            },
            drawTrackerGraph: function () {
                var a = this,
                    b = a.options,
                    c = b.trackByArea,
                    d = [].concat(c ? a.areaPath : a.graphPath),
                    f = d.length,
                    g = a.chart,
                    h = g.pointer,
                    l = g.renderer,
                    m = g.options.tooltip.snap,
                    n = a.tracker,
                    q, v = function () {
                        if (g.hoverSeries !== a) a.onMouseOver()
                    },
                    y = "rgba(192,192,192," + (A ? 1E-4 : .002) + ")";
                if (f && !c)
                    for (q = f + 1; q--;) "M" === d[q] && d.splice(q + 1, 0, d[q + 1] - m, d[q + 2], "L"), (q && "M" === d[q] || q === f) && d.splice(q, 0, "L", d[q - 2] + m, d[q - 1]);
                n ? n.attr({
                    d: d
                }) : a.graph && (a.tracker = l.path(d).attr({
                    "stroke-linejoin": "round",
                    visibility: a.visible ? "visible" : "hidden",
                    stroke: y,
                    fill: c ? y : "none",
                    "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * m),
                    zIndex: 2
                }).add(a.group), k([a.tracker, a.markerGroup], function (a) {
                    a.addClass("highcharts-tracker").on("mouseover", v).on("mouseout", function (a) {
                        h.onTrackerMouseOut(a)
                    });
                    b.cursor && a.css({
                        cursor: b.cursor
                    });
                    if (t) a.on("touchstart", v)
                }))
            }
        };
        m.column && (m.column.prototype.drawTracker = H.drawTrackerPoint);
        m.pie && (m.pie.prototype.drawTracker = H.drawTrackerPoint);
        m.scatter && (m.scatter.prototype.drawTracker = H.drawTrackerPoint);
        l(f.prototype, {
            setItemEvents: function (a, b, c) {
                var f = this,
                    g = f.chart.renderer.boxWrapper,
                    h = "highcharts-legend-" + (a.series ? "point" : "series") + "-active";
                (c ? b : a.legendGroup).on("mouseover", function () {
                    a.setState("hover");
                    g.addClass(h);
                    b.css(f.options.itemHoverStyle)
                }).on("mouseout", function () {
                    b.css(d(a.visible ? f.itemStyle : f.itemHiddenStyle));
                    g.removeClass(h);
                    a.setState()
                }).on("click", function (b) {
                    var c = function () {
                        a.setVisible && a.setVisible()
                    };
                    b = {
                        browserEvent: b
                    };
                    a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : q(a, "legendItemClick", b, c)
                })
            },
            createCheckboxForItem: function (a) {
                a.checkbox = F("input", {
                    type: "checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                C(a.checkbox, "click", function (b) {
                    q(a.series || a, "checkboxClick", {
                        checked: b.target.checked,
                        item: a
                    }, function () {
                        a.select()
                    })
                })
            }
        });
        n.legend.itemStyle.cursor = "pointer";
        l(z.prototype, {
            showResetZoom: function () {
                var a = this,
                    b = n.lang,
                    c = a.options.chart.resetZoomButton,
                    d = c.theme,
                    f = d.states,
                    g = "chart" === c.relativeTo ? null : "plotBox";
                this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function () {
                    a.zoomOut()
                }, d, f && f.hover).attr({
                    align: c.position.align,
                    title: b.resetZoomTitle
                }).addClass("highcharts-reset-zoom").add().align(c.position, !1, g)
            },
            zoomOut: function () {
                var a = this;
                q(a, "selection", {
                    resetSelection: !0
                }, function () {
                    a.zoom()
                })
            },
            zoom: function (a) {
                var d, f = this.pointer,
                    g = !1,
                    h;
                !a || a.resetSelection ? (k(this.axes, function (a) {
                    d = a.zoom()
                }), f.initiated = !1) : k(a.xAxis.concat(a.yAxis), function (a) {
                    var b = a.axis;
                    f[b.isXAxis ? "zoomX" : "zoomY"] && (d = b.zoom(a.min, a.max), b.displayBtn && (g = !0))
                });
                h = this.resetZoomButton;
                g && !h ? this.showResetZoom() : !g && b(h) && (this.resetZoomButton = h.destroy());
                d && this.redraw(c(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            },
            pan: function (a, b) {
                var c = this,
                    d = c.hoverPoints,
                    f;
                d && k(d, function (a) {
                    a.setState()
                });
                k("xy" === b ? [1, 0] : [1], function (b) {
                    b = c[b ? "xAxis" : "yAxis"][0];
                    var d = b.horiz,
                        g = a[d ? "chartX" : "chartY"],
                        d = d ? "mouseDownX" : "mouseDownY",
                        h = c[d],
                        k = (b.pointRange || 0) / 2,
                        l = b.getExtremes(),
                        m = b.toValue(h - g, !0) + k,
                        k = b.toValue(h + b.len - g, !0) - k,
                        n = k < m,
                        h = n ? k : m,
                        m = n ? m : k,
                        k = Math.min(l.dataMin, b.toValue(b.toPixels(l.min) - b.minPixelPadding)),
                        n = Math.max(l.dataMax, b.toValue(b.toPixels(l.max) + b.minPixelPadding)),
                        q;
                    q = k - h;
                    0 < q && (m += q, h = k);
                    q = m - n;
                    0 < q && (m = n, h -= q);
                    b.series.length && h !== l.min && m !== l.max && (b.setExtremes(h, m, !1, !1, {
                        trigger: "pan"
                    }), f = !0);
                    c[d] = g
                });
                f && c.redraw(!1);
                D(c.container, {
                    cursor: "move"
                })
            }
        });
        l(v.prototype, {
            select: function (a, b) {
                var d = this,
                    f = d.series,
                    g = f.chart;
                a = c(a, !d.selected);
                d.firePointEvent(a ? "select" : "unselect", {
                    accumulate: b
                }, function () {
                    d.selected = d.options.selected = a;
                    f.options.data[h(d, f.data)] = d.options;
                    d.setState(a && "select");
                    b || k(g.getSelectedPoints(), function (a) {
                        a.selected && a !== d && (a.selected = a.options.selected = !1, f.options.data[h(a, f.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                    })
                })
            },
            onMouseOver: function (a) {
                var b = this.series.chart,
                    c = b.pointer;
                a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted);
                c.runPointActions(a, this)
            },
            onMouseOut: function () {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                k(a.hoverPoints || [], function (a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint = null
            },
            importEvents: function () {
                if (!this.hasImportedEvents) {
                    var b = this,
                        c = d(b.series.options.point, b.options).events;
                    b.events = c;
                    a.objectEach(c, function (a, c) {
                        C(b, c, a)
                    });
                    this.hasImportedEvents = !0
                }
            },
            setState: function (a, b) {
                var d = Math.floor(this.plotX),
                    f = this.plotY,
                    h = this.series,
                    k = h.options.states[a] || {},
                    m = g[h.type].marker && h.options.marker,
                    n = m && !1 === m.enabled,
                    q = m && m.states && m.states[a] || {},
                    p = !1 === q.enabled,
                    t = h.stateMarkerGraphic,
                    v = this.marker || {},
                    y = h.chart,
                    z = h.halo,
                    A, C = m && h.markerAttribs;
                a = a || "";
                if (!(a === this.state && !b || this.selected && "select" !== a || !1 === k.enabled || a && (p || n && !1 === q.enabled) || a && v.states && v.states[a] && !1 === v.states[a].enabled)) {
                    C && (A = h.markerAttribs(this, a));
                    if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state), a && this.graphic.addClass("highcharts-point-" + a), this.graphic.animate(h.pointAttribs(this, a), c(y.options.chart.animation, k.animation)), A && this.graphic.animate(A, c(y.options.chart.animation, q.animation, m.animation)), t && t.hide();
                    else {
                        if (a && q) {
                            m = v.symbol || h.symbol;
                            t && t.currentSymbol !== m && (t = t.destroy());
                            if (t) t[b ? "animate" : "attr"]({
                                x: A.x,
                                y: A.y
                            });
                            else m && (h.stateMarkerGraphic = t = y.renderer.symbol(m, A.x, A.y, A.width, A.height).add(h.markerGroup), t.currentSymbol = m);
                            t && t.attr(h.pointAttribs(this, a))
                        }
                        t && (t[a && y.isInsidePlot(d, f, y.inverted) ? "show" : "hide"](), t.element.point = this)
                    }(d = k.halo) && d.size ? (z || (h.halo = z = y.renderer.path().add((this.graphic || t).parentGroup)), z[b ? "animate" : "attr"]({
                        d: this.haloPath(d.size)
                    }), z.attr({
                        "class": "highcharts-halo highcharts-color-" + c(this.colorIndex, h.colorIndex)
                    }), z.point = this, z.attr(l({
                        fill: this.color || h.color,
                        "fill-opacity": d.opacity,
                        zIndex: -1
                    }, d.attributes))) : z && z.point && z.point.haloPath && z.animate({
                        d: z.point.haloPath(0)
                    });
                    this.state = a
                }
            },
            haloPath: function (a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        l(y.prototype, {
            onMouseOver: function () {
                var a = this.chart,
                    b = a.hoverSeries;
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver && q(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            },
            onMouseOut: function () {
                var a = this.options,
                    b = this.chart,
                    c = b.tooltip,
                    d = b.hoverPoint;
                b.hoverSeries = null;
                if (d) d.onMouseOut();
                this && a.events.mouseOut && q(this, "mouseOut");
                !c || this.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
                this.setState()
            },
            setState: function (a) {
                var b = this,
                    d = b.options,
                    f = b.graph,
                    g = d.states,
                    h = d.lineWidth,
                    d = 0;
                a = a || "";
                if (b.state !== a && (k([b.group, b.markerGroup, b.dataLabelsGroup], function (c) {
                        c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a))
                    }), b.state = a, !g[a] || !1 !== g[a].enabled) && (a && (h = g[a].lineWidth || h + (g[a].lineWidthPlus || 0)), f && !f.dashstyle))
                    for (h = {
                            "stroke-width": h
                        }, f.animate(h, c(b.chart.options.chart.animation, g[a] && g[a].animation)); b["zone-graph-" + d];) b["zone-graph-" + d].attr(h), d += 1
            },
            setVisible: function (a, b) {
                var c = this,
                    d = c.chart,
                    f = c.legendItem,
                    g, h = d.options.chart.ignoreHiddenSeries,
                    l = c.visible;
                g = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !l : a) ? "show" : "hide";
                k(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function (a) {
                    if (c[a]) c[a][g]()
                });
                if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut();
                f && d.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking && k(d.series, function (a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                k(c.linkedSeries, function (b) {
                    b.setVisible(a, !1)
                });
                h && (d.isDirtyBox = !0);
                !1 !== b && d.redraw();
                q(c, g)
            },
            show: function () {
                this.setVisible(!0)
            },
            hide: function () {
                this.setVisible(!1)
            },
            select: function (a) {
                this.selected = a = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                q(this, a ? "select" : "unselect")
            },
            drawTracker: H.drawTrackerGraph
        })
    })(M);
    (function (a) {
        var C = a.Chart,
            z = a.each,
            F = a.inArray,
            D = a.isArray,
            n = a.isObject,
            g = a.pick,
            k = a.splat;
        C.prototype.setResponsive = function (g) {
            var k = this.options.responsive,
                n = [],
                h = this.currentResponsive;
            k && k.rules && z(k.rules, function (b) {
                void 0 === b._id && (b._id = a.uniqueKey());
                this.matchResponsiveRule(b, n, g)
            }, this);
            var b = a.merge.apply(0, a.map(n, function (b) {
                    return a.find(k.rules, function (a) {
                        return a._id === b
                    }).chartOptions
                })),
                n = n.toString() || void 0;
            n !== (h && h.ruleIds) && (h && this.update(h.undoOptions, g), n ? (this.currentResponsive = {
                ruleIds: n,
                mergedOptions: b,
                undoOptions: this.currentOptions(b)
            }, this.update(b, g)) : this.currentResponsive = void 0)
        };
        C.prototype.matchResponsiveRule = function (a, k) {
            var n = a.condition;
            (n.callback || function () {
                return this.chartWidth <= g(n.maxWidth, Number.MAX_VALUE) && this.chartHeight <= g(n.maxHeight, Number.MAX_VALUE) && this.chartWidth >= g(n.minWidth, 0) && this.chartHeight >= g(n.minHeight, 0)
            }).call(this) && k.push(a._id)
        };
        C.prototype.currentOptions = function (g) {
            function q(g, b, f, d) {
                var c;
                a.objectEach(g, function (a, l) {
                    if (!d && -1 < F(l, ["series", "xAxis", "yAxis"]))
                        for (g[l] = k(g[l]), f[l] = [], c = 0; c < g[l].length; c++) b[l][c] && (f[l][c] = {}, q(a[c], b[l][c], f[l][c], d + 1));
                    else n(a) ? (f[l] = D(a) ? [] : {}, q(a, b[l] || {}, f[l], d + 1)) : f[l] = b[l] || null
                })
            }
            var t = {};
            q(g, this.options, t, 0);
            return t
        }
    })(M);
    return M
});
