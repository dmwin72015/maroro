define(function(require, exports, module) {
    var $ = require('jquery');
    var $datatable = require('datatable')($);
    var $easing = require('easing')($);
    $(function() {
        var nav = $('#nav');
        var oBgBlock = $('#textbg');
        var timer = null;
        $('.nav>ul>li').on({
            'mouseover': function(ev) {
                var _this = $(this);
                timer = setTimeout(function() {
                    oBgBlock.stop().animate({
                        width: _this.outerWidth(),
                        left: _this.position().left
                    }, 300);
                }, 200);
            },
            'mouseout': function(ev) {
                if (!$.contains(nav[0], oBgBlock[0])) {
                    var oCurr = $('li.cuurent');
                    oBgBlock.stop().animate({
                        width: oCurr.outerWidth(),
                        left: oCurr.position().left
                    }, 300);
                }
                clearTimeout(timer);
            }
        });
    });
    //判断某一个元素实在包含另一个元素
    function isContains(o1, o2) {
        if (o1.compareDocumentPosition) {
            //TODO compareDocumentPosition返回值有点意思
            return o1 === o2 || !!(o1.compareDocumentPosition(o2) & 16);
        }
        if (o1.contains && o1.nodeType === 1) {
            return o1.contains(o2) && o1 !== o2;
        }
        while (o1 = o1.parentNode) {
            if (o1 === o2) {
                return true;
            }
            return false;
        }
    };

    ! function($) {
        var config = {};
        $.fn.DmCarousel = function(opt) {
            var that = this;
            var DM = {};
            var eleClass = ['flip-item', 'past', 'prev', 'current', 'next', 'future'],
                tiggerEvent = ['click', 'hover', 'mouseover'];
            config = {
                autoPlay: true,
                time: 1500,
                sEv: 'click'
            }
            DM.global = {};

            function init(opt) {
                var _this = this;
                that.each(function(i, e) {

                    this.config = $.extend({}, DM.global, config, opt),
                        this.aSon = $(this).find('.' + eleClass[0]),
                        this.nSonLen = this.aSon.length;

                    var
                        _opt = this.config,
                        _nSon = this.aSon,
                        _event = _opt.sEv;
                        
                    $(this).on(_event, '.' + eleClass.slice(1).join(',.'), function(ev) {
                        var sClass = ev.cuurentTarget.className.split(' ')[1];
                        switch (sClass) {
                            case eleClass[1]:
                                
                                break;
                            case eleClass[1]:
                                break;
                            case eleClass[1]:
                                break;
                            case eleClass[1]:
                                break;
                            case eleClass[1]:
                                break;
                        }
                    });
                });
            };

            function turn(ev) {
                console.log(this);
            }

            function prevGo(ev) {
                var target = ev.currentTarget.className;
                console.log(ev);
            };

            function nextGo(ev) {
                var target = ev.currentTarget.className;
                console.log(ev);
            };

            function pastGo(ev) {
                var target = ev.currentTarget.className;
                console.log(ev);
            };

            function futuGo(ev) {
                var target = ev.currentTarget.className;
                console.log(ev);
            };

            return init(), DM;
        };
    }($)
    var carouse = $('#DmCarousel').DmCarousel();
    console.log(carouse);
    // $('#DmCarousel').on('click','.current',function(){
    //     alert('a');
    // });
});
