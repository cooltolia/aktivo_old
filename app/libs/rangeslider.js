(function (e) {
    "function" === typeof define && define.amd ? define(["jquery"], e) : "object" === typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
})(function (e) {
    function p(a, b) {
        var c = Array.prototype.slice.call(arguments, 2);
        return setTimeout(function () {
            return a.apply(null, c)
        }, b)
    }

    function q(a, b) {
        b = b || 100;
        return function () {
            if (!a.debouncing) {
                var c = Array.prototype.slice.apply(arguments);
                a.lastReturnVal = a.apply(window, c);
                a.debouncing = !0
            }
            clearTimeout(a.debounceTimeout);
            a.debounceTimeout = setTimeout(function () {
                a.debouncing = !1
            }, b);
            return a.lastReturnVal
        }
    }

    function r(a) {
        var b = [];
        for (a = a.parentNode; a && (0 === a.offsetWidth || 0 === a.offsetHeight || !1 === a.open);) b.push(a), a = a.parentNode;
        return b
    }

    function n(a, b) {
        function c(a) {
            "undefined" !== typeof a.open && (a.open = a.open ? !1 : !0)
        }
        var d = r(a),
            e = d.length,
            f = [],
            g = a[b];
        if (e) {
            for (g = 0; g < e; g++) f[g] = d[g].style.cssText, d[g].style.setProperty ? d[g].style.setProperty("display", "block", "important") : d[g].style.cssText += ";display: block !important", d[g].style.height = "0", d[g].style.overflow = "hidden", d[g].style.visibility = "hidden", c(d[g]);
            for (var g = a[b], h = 0; h < e; h++) d[h].style.cssText = f[h], c(d[h])
        }
        return g
    }

    function k(a, b) {
        var c = parseFloat(a);
        return Number.isNaN(c) ? b : c
    }

    function m(a) {
        return a.charAt(0).toUpperCase() + a.substr(1)
    }

    function f(a, b) {
        this.$window = e(window);
        this.$document = e(document);
        this.$element = e(a);
        this.options = e.extend({}, t, b);
        this.polyfill = this.options.polyfill;
        this.orientation = this.$element[0].getAttribute("data-orientation") || this.options.orientation;
        this.onInit = this.options.onInit;
        this.onSlide = this.options.onSlide;
        this.onSlideEnd = this.options.onSlideEnd;
        this.DIMENSION = l.orientation[this.orientation].dimension;
        this.DIRECTION = l.orientation[this.orientation].direction;
        this.DIRECTION_STYLE = l.orientation[this.orientation].directionStyle;
        this.COORDINATE = l.orientation[this.orientation].coordinate;
        if (this.polyfill && u) return !1;
        this.identifier = "js-rangeslider-" + v++;
        this.startEvent = this.options.startEvent.join("." + this.identifier + " ") + "." + this.identifier;
        this.moveEvent = this.options.moveEvent.join("." + this.identifier + " ") + "." + this.identifier;
        this.endEvent = this.options.endEvent.join("." + this.identifier + " ") + "." + this.identifier;
        this.toFixed = (this.step + "").replace(".", "").length - 1;
        this.$fill = e('<div class="' + this.options.fillClass + '" />');
        this.$handle = e('<div class="' + this.options.handleClass + '" />');
        this.$range = e('<div class="' + this.options.rangeClass + " " + this.options[this.orientation + "Class"] + '" id="' + this.identifier + '" />').insertAfter(this.$element).prepend(this.$fill, this.$handle);
        this.$element.css({
            position: "absolute",
            width: "1px",
            height: "1px",
            overflow: "hidden",
            opacity: "0"
        });
        this.handleDown = e.proxy(this.handleDown, this);
        this.handleMove = e.proxy(this.handleMove, this);
        this.handleEnd = e.proxy(this.handleEnd, this);
        this.init();
        var c = this;
        this.$window.on("resize." + this.identifier, q(function () {
            p(function () {
                c.update(!1, !1)
            }, 300)
        }, 20));
        this.$document.on(this.startEvent, "#" + this.identifier + ":not(." + this.options.disabledClass + ")", this.handleDown);
        this.$element.on("change." + this.identifier, function (a, b) {
            if (!b || b.origin !== c.identifier) {
                var e = c.getPositionFromValue(a.target.value);
                c.setPosition(e)
            }
        })
    }
    Number.isNaN = Number.isNaN || function (a) {
        return "number" === typeof a && a !== a
    };
    var v = 0,
        u = function () {
            var a = document.createElement("input");
            a.setAttribute("type", "range");
            return "text" !== a.type
        }(),
        t = {
            polyfill: !0,
            orientation: "horizontal",
            rangeClass: "rangeslider",
            disabledClass: "rangeslider--disabled",
            activeClass: "rangeslider--active",
            horizontalClass: "rangeslider--horizontal",
            verticalClass: "rangeslider--vertical",
            fillClass: "rangeslider__fill",
            handleClass: "rangeslider__handle",
            startEvent: ["mousedown", "touchstart", "pointerdown"],
            moveEvent: ["mousemove", "touchmove", "pointermove"],
            endEvent: ["mouseup", "touchend", "pointerup"]
        },
        l = {
            orientation: {
                horizontal: {
                    dimension: "width",
                    direction: "left",
                    directionStyle: "left",
                    coordinate: "x"
                },
                vertical: {
                    dimension: "height",
                    direction: "top",
                    directionStyle: "bottom",
                    coordinate: "y"
                }
            }
        };
    f.prototype.init = function () {
        this.update(!0, !1);
        if (this.onInit && "function" === typeof this.onInit) this.onInit()
    };
    f.prototype.update = function (a, b) {
        a && (this.min = k(this.$element[0].getAttribute("min"), 0), this.max = k(this.$element[0].getAttribute("max"), 100), this.value = k(this.$element[0].value, Math.round(this.min + (this.max - this.min) / 2)), this.step = k(this.$element[0].getAttribute("step"), 1));
        this.handleDimension = n(this.$handle[0], "offset" + m(this.DIMENSION));
        this.rangeDimension = n(this.$range[0], "offset" + m(this.DIMENSION));
        this.maxHandlePos = this.rangeDimension - this.handleDimension;
        this.grabPos = this.handleDimension / 2;
        this.position = this.getPositionFromValue(this.value);
        this.$element[0].disabled ? this.$range.addClass(this.options.disabledClass) : this.$range.removeClass(this.options.disabledClass);
        this.setPosition(this.position, b)
    };
    f.prototype.handleDown = function (a) {
        a.preventDefault();
        this.$document.on(this.moveEvent, this.handleMove);
        this.$document.on(this.endEvent, this.handleEnd);
        this.$range.addClass(this.options.activeClass);
        if (!(-1 < (" " + a.target.className + " ").replace(/[\n\t]/g, " ").indexOf(this.options.handleClass))) {
            a = this.getRelativePosition(a);
            var b = this.$range[0].getBoundingClientRect()[this.DIRECTION],
                b = this.getPositionFromNode(this.$handle[0]) - b;
            this.setPosition("vertical" === this.orientation ? this.maxHandlePos - (a - this.grabPos) : a - this.grabPos);
            a >= b && a < b + this.handleDimension && (this.grabPos = a - b)
        }
    };
    f.prototype.handleMove = function (a) {
        a.preventDefault();
        a = this.getRelativePosition(a);
        this.setPosition("vertical" === this.orientation ? this.maxHandlePos - (a - this.grabPos) : a - this.grabPos)
    };
    f.prototype.handleEnd = function (a) {
        a.preventDefault();
        this.$document.off(this.moveEvent, this.handleMove);
        this.$document.off(this.endEvent, this.handleEnd);
        this.$range.removeClass(this.options.activeClass);
        this.$element.trigger("change", {
            origin: this.identifier
        });
        if (this.onSlideEnd && "function" === typeof this.onSlideEnd) this.onSlideEnd(this.position, this.value)
    };
    f.prototype.cap = function (a, b, c) {
        return a < b ? b : a > c ? c : a
    };
    f.prototype.setPosition = function (a, b) {
        var c, d;
        void 0 === b && (b = !0);
        c = this.getValueFromPosition(this.cap(a, 0, this.maxHandlePos));
        d = this.getPositionFromValue(c);
        this.$fill[0].style[this.DIMENSION] = d + this.grabPos + "px";
        this.$handle[0].style[this.DIRECTION_STYLE] = d + "px";
        this.setValue(c);
        this.position = d;
        this.value = c;
        if (b && this.onSlide && "function" === typeof this.onSlide) this.onSlide(d, c)
    };
    f.prototype.getPositionFromNode = function (a) {
        for (var b = 0; null !== a;) b += a.offsetLeft, a = a.offsetParent;
        return b
    };
    f.prototype.getRelativePosition = function (a) {
        var b = m(this.COORDINATE),
            c = this.$range[0].getBoundingClientRect()[this.DIRECTION],
            d = 0;
        "undefined" !== typeof a.originalEvent["client" + b] ? d = a.originalEvent["client" + b] : a.originalEvent.touches && a.originalEvent.touches[0] && "undefined" !== typeof a.originalEvent.touches[0]["client" + b] ? d = a.originalEvent.touches[0]["client" + b] : a.currentPoint && "undefined" !== typeof a.currentPoint[this.COORDINATE] && (d = a.currentPoint[this.COORDINATE]);
        return d - c
    };
    f.prototype.getPositionFromValue = function (a) {
        a = (a - this.min) / (this.max - this.min);
        return Number.isNaN(a) ? 0 : a * this.maxHandlePos
    };
    f.prototype.getValueFromPosition = function (a) {
        return Number((this.step * Math.round(a / (this.maxHandlePos || 1) * (this.max - this.min) / this.step) + this.min).toFixed(this.toFixed))
    };
    f.prototype.setValue = function (a) {
        a === this.value && "" !== this.$element[0].value || this.$element.val(a).trigger("input", {
            origin: this.identifier
        })
    };
    f.prototype.destroy = function () {
        this.$document.off("." + this.identifier);
        this.$window.off("." + this.identifier);
        this.$element.off("." + this.identifier).removeAttr("style").removeData("plugin_rangeslider");
        this.$range && this.$range.length && this.$range[0].parentNode.removeChild(this.$range[0])
    };
    e.fn.rangeslider = function (a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            var c = e(this),
                d = c.data("plugin_rangeslider");
            d || c.data("plugin_rangeslider", d = new f(this, a));
            "string" === typeof a && d[a].apply(d, b)
        })
    };
    return "rangeslider.js is available in jQuery context e.g $(selector).rangeslider(options);"
});
