//Set Order By strive.copyright by other.t  当前时间;b  初始值;c  总距离;d  总时间;var cur=fx(t,b,c,d)
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
$(function() {
    $('#wea_icon').css('background-image', 'url(https://ss0.bdstatic.com/k4oZeXSm1A5BphGlnYG/icon/weather/aladdin/png_18/a0.png)');
    $(window).scroll(function() {
        var top = document.body.scrollTop || document.documentElement.scrollTop;
        var oToTop = document.getElementById('toTop');
        if (top >= 200) {
            oToTop.style.display = 'block';
            oToTop.style.opacity = '1';
        } else {
            oToTop.style.opacity = '0';
        }
        oToTop.onclick = function() {
            var top = document.body.scrollTop || document.documentElement.scrollTop;
            moveOne({
                start: top,
                end: 0,
                duration: 180,
            });
        };
    });

    function moveOne(options) {
        var options = options || {};
        var duration = options.duration || 1000;
        var easing = Tween['Circ']['easeOut'];
        var count = Math.floor(duration / 30);
        var n = 0;
        clearInterval(timer);
        var timer = setInterval(function() {
            n++;
            var cur = easing(duration * n / count, options.start, options.end - options.start, duration);
            document.body.scrollTop = cur;
            document.documentElement.scrollTop = cur;
            if (n == count) {
                clearInterval(timer);
                options.complete && options.complete();
            }
        }, 30);
    }
});
$(function() {
    showDate($('#weaDate'));
    var timer = null;
    $('.weatherBox').mouseenter(function(ev) {
        timer = setTimeout(function() {
            $('#weatherShow').show();
        }, 1000);
    }).mouseleave(function(ev) {
        clearTimeout(timer);
        $('#weatherShow').hide();
    });
    function getProvince() {
        $.getScript("http://cdn.weather.hao.360.cn/sed_api_area_query.php?grade=province&_jsonp=loadProvince");
    }

    function getCity(pCode) {
        $.getScript("http://cdn.weather.hao.360.cn/sed_api_area_query.php?grade=city&_jsonp=loadCity&code=" + pCode);
    }

    function getTown(cCode) {
        $.getScript("http://cdn.weather.hao.360.cn/sed_api_area_query.php?grade=town&_jsonp=loadTown&code=" + cCode)
    }
    var MyWeather = {
        urlProvince: 'http://cdn.weather.hao.360.cn/sed_api_area_query.php?grade=province&_jsonp=loadProvince',
        urlCity: 'http://cdn.weather.hao.360.cn/sed_api_area_query.php?grade=city&_jsonp=loadCity&code=',
        urlTown: 'http://cdn.weather.hao.360.cn/sed_api_area_query.php?grade=town&_jsonp=loadTown&code=',
        currProvince: '北京',
        currCity: '北京',
        currTown: '昌平',
        pCode: '',
        cCode: '',
        tCode: '',
        init: function(json) {
            json = json || {};
            window.loadProvince = this.loadProvince,
                window.loadCity = this.loadCity,
                window.loadTown = this.loadTown,
                window.getWeather = this.getWeather,
                this.currProvince = json.province || '北京',
                this.currCity = json.city || '北京',
                this.currTown = json.town || '昌平';
            showDate($('#weaDate'));
            getProvince.call(this);
            return this;
        },
        loadProvince: function(data) {
            for (var n = 0; n < data.length; n++) {
                if (MyWeather.currProvince == data[n][0]) {
                    this.pCode = data[n][1];
                    break;
                }
            }
            getCity(this.pCode);
        },
        loadCity: function(data) {
            for (var n = 0; n < data.length; n++) {
                if (MyWeather.currCity == data[n][0]) {
                    this.cCode = data[n][1];
                    break;
                }
            }
            getTown(this.cCode);
        },
        loadTown: function(data) {
            for (var n = 0; n < data.length; n++) {
                if (MyWeather.currTown == data[n][0]) {
                    this.tCode = data[n][1];
                    break;
                }
            }
            getWeather(this.tCode);
        },
        getWeather: function(tCode) {
            var params = codeselect(tCode || this.tCode);
            $.ajax("http://tq.360.cn/api/weatherquery/querys?app=tq360", {
                dataType: "jsonp",
                jsonp: "_jsonp",
                data: {
                    code: tCode,
                    t: params[0],
                    c: params[1]
                },
                success: showWeather,
                error: function() {}
            });
        }
    }
    MyWeather.init({
        province: '北京',
        city:'',
        town:''
    });
});

function codeselect(tCode) {
    var currTime = (new Date).getTime(),
        handTime = parseInt(tCode) + (new Date).getTime(),
        result = [currTime, handTime];
    return result;
}

function showDate(obj) {
    var oDate = new Date,
        nYear = oDate.getFullYear(),
        nMonth = oDate.getMonth() + 1,
        nDay = oDate.getDate(),
        $date = $('#weaDate') || obj;
    $date.html($date.html().replace(/\$\{\s*nongli\s*\}/g, nYear + '年' + nMonth + '月' + nDay + '日').replace(/\$\{\s*yangli\s*\}/g, ' '));
}

function showWeather(data) {
    data = data || {};
    var str = '<div class="day-item ${today}"><a href="../products/360weather.html"><h3>${day_week}</h3><p class="wea-icon"></p><p>${temp}</p><p>${day_to_night_wea}</p><p>${wind}</p></a></div>';
    var arrWea = data.weather;
    var arrDay = $('#recentlyDay');
    if (!!arrDay) {
        for (var n = 0; n < 5; n++) {
            var date = data.weather[n].date,
                weaDay = data.weather[n].info.day,
                weaNight = data.weather[n].info.night,
                weaChange = weaDay[1] == weaNight[1] ? weaDay[1] : weaDay[1] + '转' + weaNight[1],
                res = str.replace(/\$\{\s*day_week\s*\}/g, n == 0 ? '今天(' + getWeekCN(date) + ')' : ((n == 1) ? '明天(' + getWeekCN(date) + ')' : ((n == 2) ? '后天(' + getWeekCN(date) + ')' : getWeekCN(date)))).replace(/\$\{\s*temp\s*\}/g, weaDay[2] + ' ~ ' + weaNight[2] + '℃').replace(/\$\{\s*day_to_night_wea\s*\}/g, weaChange).replace(/\$\{\s*wind\s*\}/g, weaDay[3] + weaDay[4]).replace(/\$\{\s*today\s*\}/g, n == 0 ? 'today' : '').replace('无持续风向','');
            $('#recentlyDay').append($(res));
        }
    }
    $('.temperature').text(data.realtime.weather.temperature+'℃'); 
}
function getWeekCN(date, sep) {
    var oDate = new Date();
    date = date || oDate.getFullYear() + sep + (oDate.getMonth() + 1) + sep + oDate.getDate();
    sep = sep || '-';
    var newArr = date.split(sep);
    var newDate = new Date(parseInt(newArr[0]), parseInt(newArr[1]) - 1, parseInt(newArr[2]));
    return '星期' + '日一二三四五六'.charAt(newDate.getDay());
}

function getWeekEN(date, sep) {
    var oDate = new Date();
    date = date || oDate.getFullYear() + '-' + (oDate.getMonth() + 1) + '-' + oDate.getDate();
    sep = sep || '-';
    var newArr = date.split(sep);
    var newDate = new Date(parseInt(newArr[0]), parseInt(newArr[1]) - 1, parseInt(newArr[2]));
    return '星期' + ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'][newDate.getDay()];
}
