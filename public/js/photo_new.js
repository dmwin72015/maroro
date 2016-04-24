"use strict";
(function(jQuery) {
    jQuery.easing.jswing = jQuery.easing.swing;
    jQuery.extend(jQuery.easing, {
        def: "easeOutQuad",
        swing: function(e, f, a, h, g) {
            return jQuery.easing[jQuery.easing.def](e, f, a, h, g)
        },
        easeInQuad: function(e, f, a, h, g) {
            return h * (f /= g) * f + a
        },
        easeOutQuad: function(e, f, a, h, g) {
            return -h * (f /= g) * (f - 2) + a
        },
        easeInOutQuad: function(e, f, a, h, g) {
            if ((f /= g / 2) < 1) {
                return h / 2 * f * f + a
            }
            return -h / 2 * ((--f) * (f - 2) - 1) + a
        },
        easeInCubic: function(e, f, a, h, g) {
            return h * (f /= g) * f * f + a
        },
        easeOutCubic: function(e, f, a, h, g) {
            return h * ((f = f / g - 1) * f * f + 1) + a
        },
        easeInOutCubic: function(e, f, a, h, g) {
            if ((f /= g / 2) < 1) {
                return h / 2 * f * f * f + a
            }
            return h / 2 * ((f -= 2) * f * f + 2) + a
        },
        easeInQuart: function(e, f, a, h, g) {
            return h * (f /= g) * f * f * f + a
        },
        easeOutQuart: function(e, f, a, h, g) {
            return -h * ((f = f / g - 1) * f * f * f - 1) + a
        },
        easeInOutQuart: function(e, f, a, h, g) {
            if ((f /= g / 2) < 1) {
                return h / 2 * f * f * f * f + a
            }
            return -h / 2 * ((f -= 2) * f * f * f - 2) + a
        },
        easeInQuint: function(e, f, a, h, g) {
            return h * (f /= g) * f * f * f * f + a
        },
        easeOutQuint: function(e, f, a, h, g) {
            return h * ((f = f / g - 1) * f * f * f * f + 1) + a
        },
        easeInOutQuint: function(e, f, a, h, g) {
            if ((f /= g / 2) < 1) {
                return h / 2 * f * f * f * f * f + a
            }
            return h / 2 * ((f -= 2) * f * f * f * f + 2) + a
        },
        easeInSine: function(e, f, a, h, g) {
            return -h * Math.cos(f / g * (Math.PI / 2)) + h + a
        },
        easeOutSine: function(e, f, a, h, g) {
            return h * Math.sin(f / g * (Math.PI / 2)) + a
        },
        easeInOutSine: function(e, f, a, h, g) {
            return -h / 2 * (Math.cos(Math.PI * f / g) - 1) + a
        },
        easeInExpo: function(e, f, a, h, g) {
            return (f == 0) ? a : h * Math.pow(2, 10 * (f / g - 1)) + a
        },
        easeOutExpo: function(e, f, a, h, g) {
            return (f == g) ? a + h : h * (-Math.pow(2, -10 * f / g) + 1) + a
        },
        easeInOutExpo: function(e, f, a, h, g) {
            if (f == 0) {
                return a
            }
            if (f == g) {
                return a + h
            }
            if ((f /= g / 2) < 1) {
                return h / 2 * Math.pow(2, 10 * (f - 1)) + a
            }
            return h / 2 * (-Math.pow(2, -10 * --f) + 2) + a
        },
        easeInCirc: function(e, f, a, h, g) {
            return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + a
        },
        easeOutCirc: function(e, f, a, h, g) {
            return h * Math.sqrt(1 - (f = f / g - 1) * f) + a
        },
        easeInOutCirc: function(e, f, a, h, g) {
            if ((f /= g / 2) < 1) {
                return -h / 2 * (Math.sqrt(1 - f * f) - 1) + a
            }
            return h / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + a
        },
        easeInElastic: function(f, h, e, l, k) {
            var i = 1.70158;
            var j = 0;
            var g = l;
            if (h == 0) {
                return e
            }
            if ((h /= k) == 1) {
                return e + l
            }
            if (!j) { j = k * 0.3 }
            if (g < Math.abs(l)) {
                g = l;
                var i = j / 4
            } else {
                var i = j / (2 * Math.PI) * Math.asin(l / g)
            }
            return -(g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e
        },
        easeOutElastic: function(f, h, e, l, k) {
            var i = 1.70158;
            var j = 0;
            var g = l;
            if (h == 0) {
                return e
            }
            if ((h /= k) == 1) {
                return e + l
            }
            if (!j) { j = k * 0.3 }
            if (g < Math.abs(l)) {
                g = l;
                var i = j / 4
            } else {
                var i = j / (2 * Math.PI) * Math.asin(l / g)
            }
            return g * Math.pow(2, -10 * h) * Math.sin((h * k - i) * (2 * Math.PI) / j) + l + e
        },
        easeInOutElastic: function(f, h, e, l, k) {
            var i = 1.70158;
            var j = 0;
            var g = l;
            if (h == 0) {
                return e
            }
            if ((h /= k / 2) == 2) {
                return e + l
            }
            if (!j) { j = k * (0.3 * 1.5) }
            if (g < Math.abs(l)) {
                g = l;
                var i = j / 4
            } else {
                var i = j / (2 * Math.PI) * Math.asin(l / g)
            }
            if (h < 1) {
                return -0.5 * (g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e
            }
            return g * Math.pow(2, -10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j) * 0.5 + l + e
        },
        easeInBack: function(e, f, a, i, h, g) {
            if (g == undefined) { g = 1.70158 }
            return i * (f /= h) * f * ((g + 1) * f - g) + a
        },
        easeOutBack: function(e, f, a, i, h, g) {
            if (g == undefined) { g = 1.70158 }
            return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a
        },
        easeInOutBack: function(e, f, a, i, h, g) {
            if (g == undefined) { g = 1.70158 }
            if ((f /= h / 2) < 1) {
                return i / 2 * (f * f * (((g *= (1.525)) + 1) * f - g)) + a
            }
            return i / 2 * ((f -= 2) * f * (((g *= (1.525)) + 1) * f + g) + 2) + a
        },
        easeInBounce: function(e, f, a, h, g) {
            return h - jQuery.easing.easeOutBounce(e, g - f, 0, h, g) + a
        },
        easeOutBounce: function(e, f, a, h, g) {
            if ((f /= g) < (1 / 2.75)) {
                return h * (7.5625 * f * f) + a
            } else {
                if (f < (2 / 2.75)) {
                    return h * (7.5625 * (f -= (1.5 / 2.75)) * f + 0.75) + a
                } else {
                    if (f < (2.5 / 2.75)) {
                        return h * (7.5625 * (f -= (2.25 / 2.75)) * f + 0.9375) + a
                    } else {
                        return h * (7.5625 * (f -= (2.625 / 2.75)) * f + 0.984375) + a
                    }
                }
            }
        },
        easeInOutBounce: function(e, f, a, h, g) {
            if (f < g / 2) {
                return jQuery.easing.easeInBounce(e, f * 2, 0, h, g) * 0.5 + a
            }
            return jQuery.easing.easeOutBounce(e, f * 2 - g, 0, h, g) * 0.5 + h * 0.5 + a
        }
    });
    jQuery.fn.extend({
        "myMousewheel": function(fn, opts) {
            opts = opts || {};
            var preventDefault = (opts.preventDefault === void 0) ? !0 : !!0;
            var stopPropagation = (opts.stopPropagation === void 0) ? !0 : !!0;
            this.each(function(ele, index) {
                var sEvent = (window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1 ? !0 : !!0) ? "DOMMouseScroll" : "mousewheel";
                this.addEventListener(sEvent, function(ev) {
                    if (preventDefault) { ev.preventDefault() }
                    var oEv = ev || window.event;
                    if (preventDefault) {
                        if (oEv.preventDefault) { oEv.preventDefault() } else { oEv.returnValue = false }
                    }
                    if (stopPropagation) {
                        if (oEv.stopPropagation) { oEv.stopPropagation() } else { oEv.cancelBubble = true }
                    }
                    var direct = oEv.detail ? (oEv.detail > 0 ? !0 : !!0) : (oEv.wheelDelta > 0 ? !!0 : !0);
                    fn.call(this, direct)
                }, false)
            });
            return this
        }
    })
}(jQuery));
(function($) {
    function isFF() {
        return window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1 ? !0 : !!0
    }
    function isIE() {
        return window.navigator.userAgent.toLowerCase().indexOf("msie") > -1 ? !0 : !!0
    }
    document.onkeydown = function(ev){
        var oEv = ev || window.event;
        if(oEv.keyCode == 123 ||(oEv.keyCode==73 && oEv.ctrlKey &&oEv.shiftKey)){
           return false;
        }
    };
    document.oncontextmenu=function(){
        return false;
    };
    $(function() {
        $(".tabs-content-container").on({
            "mouseenter": function(ev) {
                var _this = this;
                _this.currBox = $(this).find(".contentBox:visible").get(0);
                _this.oDragBlock = $("#barBlcok").get(0);
                var curBox = $(this).find(".contentBox:visible"),
                    dragBlock = $(_this.oDragBlock),
                    dragWaper = $("#draggerBar");
                var h_this = curBox.outerHeight(),
                    h_parent = curBox.parent().outerHeight(),
                    minBoxTop = _this.currBox.minBoxTop = h_parent - h_this;
                if (h_this > h_parent) {
                    _this.isScroll = true;
                    var dragh = dragWaper.show().innerHeight();
                    var maxDragTop = _this.oDragBlock.maxDragTop = dragh - dragh * h_parent / h_this;
                    $(_this.oDragBlock).css("height", dragh * h_parent / h_this + "px").on({
                        "mousedown": function(ev) {
                            var $this = $(this);
                            var disY = ev.pageY - $this.offset().top;
                            document.onmousemove = function(ev) {
                                var oEv = ev || window.event;
                                var top = oEv.clientY - disY - $this.offsetParent().offset().top;
                                if (top >= maxDragTop) { top = maxDragTop + 0.5 } else {
                                    if (top <= 0) { top = 0 }
                                }
                                curBox.css("top", top / maxDragTop * minBoxTop + "px");
                                $this.css("top", top + 1 + "px");
                                dragWaper.show()
                            };
                            document.onmouseup = function(ev) {
                                document.onmousemove = null;
                                document.onmouseup = null
                            };
                            return false
                        }
                    })
                }
            },
            "mouseleave": function(ev) {
                $("#draggerBar").hide();
                this.currBox = null;
                this.oDragBlock = null;
                this.isScroll = null
            },
        }).myMousewheel(function(direct) {
            if (this.isScroll) {
                var minBoxTop = this.currBox.minBoxTop;
                var maxDragTop = this.oDragBlock.maxDragTop;
                var top = this.oDragBlock.offsetTop;
                if (direct) { top += 20 } else { top -= 20 }
                if (top >= maxDragTop) { top = maxDragTop + 0.5 } else {
                    if (top <= 0) { top = 0 }
                }
                this.currBox.style.top = top / maxDragTop * minBoxTop + "px";
                this.oDragBlock.style.top = top + "px"
            }
        });
        $(".productItem-wapper").on({
            "mouseenter": function() {
                $(this).find("img").eq(0).stop().animate({ top: "-20px" }, 220);
                $(this).find(".product-label").stop().animate({ "bottom": 0 }, 220, "easeOutExpo")
            },
            "mouseleave": function() {
                $(this).find("img").eq(0).stop().animate({ top: "0" }, 220);
                $(this).find(".product-label").stop().animate({ "bottom": "-40px" }, 220, "easeInQuint")
            }
        });
        (function() {
            var aImg = $("#cycleImg img");
            aImg.eq(0).css("opacity", "1");
            var timer = null;
            var index = 0;
            timer = setInterval(function() {
                index++;
                index = index > 3 ? 0 : index;
                aImg.eq(index % 3).animate({ "opacity": "1" }, 820).siblings().animate({ "opacity": "0" }, 520)
            }, 3000)
        })();
        $(".wordbox img").mouseover(function() {});
        var $cont = $(".tabs-content-container");
        var CHANGTYPE = { "left": { "start": { left: "-50px", "opacity": 0 }, "end": { left: 0, opacity: 1 }, "time": 620 }, "right": { "start": { left: "50px", "opacity": 0 }, "end": { left: 0, opacity: 1 }, "time": 620 }, "up": { "start": { top: "-50px", "opacity": 0 }, "end": { top: 0, opacity: 1 }, "time": 620 }, "down": { "start": { top: "50px", "opacity": 0 }, "end": { top: 0, opacity: 1 }, "time": 620 }, "center": { "start": { "width": "0", "height": "0", "margin-left": "0", "top": $cont.outerWidth() / 2 + "px", "left": $cont.outerHeight() / 2 + "px" }, "end": { width: $cont.outerWidth() + "px", height: $cont.outerHeight() + "px", top: "0", left: "0", "margin-left": "15px" }, "time": 620 }, type: "easeInExpo" };
        var currType = CHANGTYPE["right"];
        var EASING = "easeInCubic";
        var BARLENGTH = ["80%", "75%", "95%", "30%", "25%", "25%"];
        $("#tabs-list > li").click(function(ev) {
            var _this = $(this);
            var sConid = _this.attr("data-content");
            var $bar = $(".progressbar-bar");
            var $pro_desc = $(".pro-desc-txt");
            var $pro_item = $(".pro-item");
            var aBgMove = $(".pro-bgmoving");
            $pro_item.removeClass("show");
            $bar.css("width", 0);
            $pro_desc.removeClass("show");
            aBgMove.css('height', '0');
            _this.siblings().removeClass("pers-tabs-active").find("i").removeClass("icon_menu_active");
            _this.addClass("pers-tabs-active").find("i").addClass("icon_menu_active");
            $("#" + sConid).show().siblings().hide();
            $cont.css(currType["start"]).stop().animate(currType["end"], currType["time"], EASING, function() {
                switch (sConid) {
                    case "":
                        break;
                    case "jobresume":
                        for (var i = 0; i < BARLENGTH.length; i++) { $bar.eq(i).stop().animate({ "width": BARLENGTH[i] }, 1220, "easeInQuad") }
                        break;
                    case "":
                        break;
                    case "project":
                        aBgMove.css('height', '0');
                        var num = 0;
                        ! function moving() {
                            aBgMove.eq(num).stop().animate({ height: "100%" }, (1 - num % 2) * 400 + 200, function() {
                                if (num > aBgMove.length) {
                                    return
                                }
                                if (num % 2 == 0) {
                                    $pro_item.eq(Math.floor(num / 2)).addClass("show");
                                    $pro_desc.eq(Math.floor(num / 2)).addClass("show")
                                }
                                moving(num++)
                            })
                        }();
                        $(".pro-month-Txt").on({
                            "mouseover": function(ev) {
                                ev.data.div = $("<div></div>");
                                var $pro = $("#project");
                                var left = ev.pageX - $pro.offset().left + 20;
                                var top = ev.pageY - $pro.offset().top;
                                var index = $(this).parent().index();
                                ev.data.div.css({ position: "absolute", top: (top + 110 > 580 ? 460 : top) + "px", left: left + "px", width: "200px", height: "110px", background: ev.data.images[index > 2 ? "none" : index] }).appendTo($pro)
                            },
                            "mouseout": function(ev) { ev.data.div.remove() }
                        }, { "name": "save", images: ['url("../images/abchina.jpg")', 'url("../images/cssn.jpg")', 'url("../images/cnta.jpg")'] });
                        break;
                    case "":
                        break
                }
            });
            $(".contentBox:visible").css("top", "0");
            $("#barBlcok").css("top", "0")
        });
        $("#changeSkin").click(function() { $(".bgImgBox").animate({ "top": "0", "opacity": 1 }, 200) });
        $("#closetop").click(function() { $(".bgImgBox").animate({ "top": "-100px", "opacity": 0 }, 200) });
        $(".bgImglist").click(function(ev) {
            if (ev.target.tagName.toLowerCase() != "ul") {
                var target = $(ev.target).parent();
                target.addClass("select").siblings().removeClass("select");
                $("#page-bg").attr("class", "page-bg " + target.attr("data-page"));
                $("#page-bg").css('background-image','url('+target.find('img').eq(0).attr("src")+')')
                console.log(target.find('img').eq(0).attr("src"));
            }
        }).css("width", $(".bgImglist").find("li").length * 135 - 15 + "px");
        $("#left-arrow,#right-arrow").click(function(ev) {
            var $imgList = $(".bgImglist");
            var this_w = $imgList.outerWidth();
            var parent_w = $imgList.parent().outerWidth();
            var son_w = $imgList.find("li:eq(2)").outerWidth(true);
            var curLeft = $imgList.get(0).offsetLeft;
            var minLeft = parent_w - this_w;
            if (ev.target.id == "left-arrow") {
                $imgList.stop().animate({ "left": curLeft <= minLeft ? curLeft + "px" : curLeft - son_w + "px" }, 420)
            } else { $imgList.stop().animate({ "left": curLeft >= 0 ? 0 : curLeft + 135 + "px" }, 420) }
        });
        $("#sendMsg").click(function() {
            alert("别点了！这个功能还没做呢！！！");
            return false
        })
        $('.change-direct-waper>span').on('click',function(){
            var _this = $(this);
            currType = CHANGTYPE[_this.attr('data-direct')];
            _this.addClass('active').siblings().removeClass('active');
        });
        var oHead = $('#myhead');
        $(document).on('mousemove',function(ev){
            var x = ev.pageX;
            var y = ev.pageY;
            if(x<oHead.offset().left){
                var sSrc = '../images/my_l.jpg';
            }else if(x>oHead.offset().left+oHead.outerWidth()){
                var sSrc = '../images/my_r.jpg';
            }else{
                var sSrc = '../images/my_c.jpg';
            }
            oHead.find('img').attr('src',sSrc);
        })
    });
})(jQuery);
