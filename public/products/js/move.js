/**
 *  Set Order By strive.
 *  copyright by other.
 **/
//t  当前时间
//b  初始值
//c  总距离
//d  总时间
//var cur=fx(t, b, c, d)
var Tween = {
    Linear: function(t, b, c, d) {
        return c * t / d + b
    },
    Quad: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t + b
        },
        easeOut: function(t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t + b
            }
            return -c / 2 * ((--t) * (t - 2) - 1) + b
        }
    },
    Cubic: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t + b
        },
        easeOut: function(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t + b
            }
            return c / 2 * ((t -= 2) * t * t + 2) + b
        }
    },
    Quart: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t * t + b
        },
        easeOut: function(t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t * t + b
            }
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b
        }
    },
    Quint: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b
        },
        easeOut: function(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t * t * t + b
            }
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b
        }
    },
    Sine: {
        easeIn: function(t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b
        },
        easeOut: function(t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b
        },
        easeInOut: function(t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b
        }
    },
    Expo: {
        easeIn: function(t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
        },
        easeOut: function(t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
        },
        easeInOut: function(t, b, c, d) {
            if (t == 0) {
                return b
            }
            if (t == d) {
                return b + c
            }
            if ((t /= d / 2) < 1) {
                return c / 2 * Math.pow(2, 10 * (t - 1)) + b
            }
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b
        }
    },
    Circ: {
        easeIn: function(t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
        },
        easeOut: function(t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b
            }
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
        }
    },
    Elastic: {
        easeIn: function(t, b, c, d, a, p) {
            if (t == 0) {
                return b
            }
            if ((t /= d) == 1) {
                return b + c
            }
            if (!p) { p = d * 0.3 }
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4
            } else {
                var s = p / (2 * Math.PI) * Math.asin(c / a)
            }
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
        },
        easeOut: function(t, b, c, d, a, p) {
            if (t == 0) {
                return b
            }
            if ((t /= d) == 1) {
                return b + c
            }
            if (!p) { p = d * 0.3 }
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4
            } else {
                var s = p / (2 * Math.PI) * Math.asin(c / a)
            }
            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b)
        },
        easeInOut: function(t, b, c, d, a, p) {
            if (t == 0) {
                return b
            }
            if ((t /= d / 2) == 2) {
                return b + c
            }
            if (!p) { p = d * (0.3 * 1.5) }
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4
            } else {
                var s = p / (2 * Math.PI) * Math.asin(c / a)
            }
            if (t < 1) {
                return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
            }
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b
        }
    },
    Back: {
        easeIn: function(t, b, c, d, s) {
            if (s == undefined) { s = 1.70158 }
            return c * (t /= d) * t * ((s + 1) * t - s) + b
        },
        easeOut: function(t, b, c, d, s) {
            if (s == undefined) { s = 1.70158 }
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
        },
        easeInOut: function(t, b, c, d, s) {
            if (s == undefined) { s = 1.70158 }
            if ((t /= d / 2) < 1) {
                return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b
            }
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b
        }
    },
    Bounce: {
        easeIn: function(t, b, c, d) {
            return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b
        },
        easeOut: function(t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b
            } else {
                if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b
                } else {
                    if (t < (2.5 / 2.75)) {
                        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b
                    } else {
                        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b
                    }
                }
            }
        },
        easeInOut: function(t, b, c, d) {
            if (t < d / 2) {
                return Tween.Bounce.easeIn(t * 2, 0, c, d) * 0.5 + b
            } else {
                return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
            }
        }
    }
};

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

function getStyle(obj, sName) {
    return (obj.currentStyle || getComputedStyle(obj, false))[sName];
}

function isEmpty(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (isArray(obj) || isString(obj) || isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
};
var arr = ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'];
for (var i = 0; i < arr.length; i++) {
    (function(i) {
        window['is' + arr[i]] = function(obj) {
            return toString.call(obj) === '[object ' + arr[i] + ']';
        }
    })(i)
}

function isArrayLike(collection) {
    var length = collection != null && collection.length;
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};
var isArray = Array.isArray || function(obj) {
    return toString.call(obj) === '[object Array]';
};

function collTest(obj1, obj2) {
    var l1 = obj1.offsetLeft;
    var r1 = l1 + obj1.offsetWidth;
    var t1 = obj1.offsetTop;
    var b1 = t1 + obj1.offsetHeight;
    var l2 = obj2.offsetLeft;
    var r2 = l2 + obj2.offsetWidth;
    var t2 = obj2.offsetTop;
    var b2 = t2 + obj2.offsetHeight;
    if (l2 > r1 || l1 > r2 || t2 > b1 || t1 > b2) {
        return false;
    } else {
        return true;
    }
}
/****绑定、解绑事件************/
function addEvent(obj, sEv, fn, f) {
    if (obj.addEventListener) {
        if (f !== true) {
            f = false;
        }
        obj.addEventListener(sEv, fn, false);
    } else {
        obj.attachEvent('on' + sEv, fn);
    }
}

function removeEvent(obj, sEv, fn, f) {
    if (obj.removeEventListener) {
        if (f !== true) {
            f = false;
        }
        obj.removeEventListener(sEv, fn, f);
    } else {
        obj.detachEvent('on' + sEv, fn);
    }
}

/**************************鼠标滚轮事件  添加 移除******************************************************/
// TODO 这样之后怎么解绑？？？
function addWheel(obj, fn, f) {
    if (obj.addEventListener) {
        if (f !== true) {
            f = false;
        }
        obj.addEventListener('DOMMouseScroll', _wheel, f);
    } else {
        obj.onmousewheel = _wheel;
    }

    function _wheel(ev) {
        var oEv = ev || event;
        var down = oEv.detail ? (oEv.detail > 0 ? true : false) : (oEv.wheelDelta > 0 ? false : true);
        fn(down, oEv);
    }
}

function revWheel(obj, fn, f) {
    if (obj.addEventListener) {
        if (f !== true) {
            f = false;
        }
        obj.removeEventListener('DOMMouseScroll', fn, f);
    } else {
        obj.onmousewheel = null;
    }
}

/************鼠标移出、移入事件 考虑在内部移动 *****************/
// TODO 问题：怎么解绑？？？？
function addMouseover(obj, fn) {
    addEvent(obj, 'mouseover', function(ev) {
        var oEv = ev || event;
        var oFrom = oEv.fromElement || oEv.releatedTarget;
        if (oFrom && !obj.contains(oFrom)) {
            fn(oEv);
        }
    });
}

function addMouseout(obj, fn) {
    addEvent(obj, 'mouseout', function(ev) {
        var oEv = ev || event;
        var oTo = oEv.fromElement || oEv.releatedTarget;
        if (oTo && !obj.contains(oTo)) {
            fn(oEv);
        }
    });
}

//获取距离页面的距离
function getPos(obj) {
    var left = 0;
    var top = 0;
    while (obj) {
        left += obj.offsetLeft;
        top += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return {
        left: left,
        top: top
    };
}
//文档加载完成执行，不包括媒体：图片、视频等等。
function readyAll(fn) {
    if (document.addEventListener) {
        // addEvent(document, 'DOMContentLoaded', fn);
        document.addEventListener('DOMContentLoaded', fn, false);
    } else {
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState == 'complete') {
                fn();
            }
        });
    }
}
//中文转换成Unicode码
function strToUnicode(str, separator) {
    var aUnicode = [];
    for (var i = 0; i < str.length; i++) {
        var num = str.charCodeAt(i);
        aUnicode.push(num.toString(16));
    }
    if (separator) {
        return aUnicode.join(separator);
    } else {
        return aUnicode;
    }
}
/**
 *@method    
 *   name: unicodeToStr;
 *   description: unicode 转换成字符;
 *@param 
 *   name：unicode ;
 *   type: Array;
 *   description:传入一个unicode码的数组;
 *
 **/
function unicodeToStr(unicode) {
    var aStr = [];
    for (var i = 0; i < unicode.length; i++) {
        var str = String.fromCharCode(unicode[i]);
        aStr.push(str);
    };
    return aStr;
}
// 移动方法
function moveOne(obj, json, options) {
    var options = options || {};
    var duration = options.duration || 1000;
    var easing = options.easing || Tween['Linear'];
    var start = {};
    var dis = {};
    for (var name in json) {
        start[name] = parseFloat(getStyle(obj, name));
        dis[name] = json[name] - start[name];
    }
    var count = Math.floor(duration / 30);
    var n = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        n++;
        for (var name in json) {
            var cur = easing(duration * n / count, start[name], dis[name], duration);
            if (name == 'opacity') {
                obj.style[name] = cur;
            } else {
                obj.style[name] = cur + 'px';
            }
        }
        if (n == count) {
            clearInterval(obj.timer);
            options.complete && options.complete();
        }
    }, 30);
}
//t  当前时间;b  初始值;c  总距离;d  总时间
function moveMany(objArr, json) {
    if (isEmpty(objArr)) return;
    json = json || {};
    var duration = isNumber(json['duration']) ? json['duration']: 1000;
    var easing = json['easing'] || Tween['Linear'];
    var start = [],
        dis = [],
        target = [];
    for (var i = 0; i < objArr.length; i++) {
        target[i] = {};
        dis[i] = {};
        start[i] = {};
        for (var name in objArr[i]['target']) {
            target[i][name] = parseFloat(objArr[i]['target'][name]);
            start[i][name] = parseFloat(getStyle(objArr[i]['obj'], name));
            dis[i][name] = target[i][name] - start[i][name];
        }
    }
    var count = Math.floor(duration / 30);
    var n = 0;
    clearInterval(objArr.timer);
    objArr.timer = setInterval(function() {
        n++;
        for (var i = 0; i < objArr.length; i++) {
            for (var name in start[i]) {
                var cur = easing(duration * n / count, start[i][name], dis[i][name], duration);
                if (name == 'opacity') {
                    objArr[i]['obj'].style[name] = cur;
                } else {
                    objArr[i]['obj'].style[name] = cur + 'px';
                }
            }
        }
        if (n == count) {
            clearInterval(objArr.timer);
            json.complete && json.complete();
        }
    }, 30);
}
/*
var arrobj = [{
    obj: 'obj',
    target: {}
}, {
    obj: 'obj',
    target: {}
}];
var testObj = {
    duration: 1000,
    easing: 1213,
    complete: function() {
        alert('123');
    }
}*/
