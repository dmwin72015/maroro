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

    ! function(root, doc, $) {
        // 全局变量、参数
        root = root ? root : window;
        doc = doc ? doc : window.document;
        var config = {
                autoPlay: true,
                time: 1500,
                aEvents :['click', 'hover', 'mouseover'],
                currEv: 'click',
                defaultIndex:3
            },
            eleClass  = ['flip-item', 'unshow', 'past', 'prev', 'current', 'next', 'future'],
            fnClass   = eleClass.slice(1),//用到的五个功能类名
            sAllClass = '.' + eleClass[0],//.flip-item
            sfnClass  = '.' + fnClass.join(',.');//.past,.prev,.current,.next,.future

        // 插件调用名称
        $.fn.DmCarousel = function(opt) {
            // alias 设置 这里的 that(this) 调用这个方法的jQuery对象（可能是多个，也可能是一个）
            /*
              that      调用此方法的jQuery对象
              eleClass  默认的类名称
              fnClass   默认显示元素的类名  
            **/
            var 
                that        = this,
                eleConfig   = $.extend({}, config, opt);

            // console.log(that);

            function init(opt) {
                // 遍历调用这个方法的jQuery对象，取得其中的每个元素。
                var arr = [];
                that.each(function(i, e) {
                    // 这里的this就是每一个DOM对象（原生）

                    // 初始化参数、配置信息
                    this.jConfig     = $.extend({},eleConfig),
                    this.aAllSon     = $(this).find(sAllClass),
                    this.nAllSonLen  = this.aAllSon.length,
                    this.aFnSon      = $(this).find(sfnClass),
                    this.DM          = {};


                    // 取别名       
                    var             
                        $this       = $(this),          //this的jQuery对象
                        _opt        = this.jConfig,     //参数
                        _aAllSon    = this.aAllSon,     //子元素几个
                        _nlen       = this.nAllSonLen,  //子元素长度
                        _aFnSon     = this.aFnSon,      //显示元素集合
                        _event      = _opt.currEv,      //触发事件
                        _DM         = this.DM;          //返回的对象
                        
                    console.log(_nlen+'子元素个数');
                    //每个元素的返回对象 
                    // fnClass   'unshow', 'past', 'prev', 'current', 'next', 'future'
                    _DM = {
                        srcEle: this,
                        config: this.jConfig,
                        go: function(index) {
                            if(index>_nlen-1) return;
                            _aFnSon.removeClass(fnClass.join(' '));
                            console.log(index);
                            switch (index) {
                                case 0:
                                    _aAllSon.eq(_nlen-2).addClass(fnClass[1]);
                                    _aAllSon.eq(_nlen-1).addClass(fnClass[2]);
                                    _aAllSon.eq(index).addClass(fnClass[3]);
                                    _aAllSon.eq(1).addClass(fnClass[4]);
                                    _aAllSon.eq(2).addClass(fnClass[5]);
                                    for(var i=0;i<_nlen;i++){
                                        if(i!=1 && i!=2 && i!= _nlen-1 && i!=_nlen-2 && i!=index){
                                            _aAllSon.eq(i).addClass(fnClass[0])
                                        }
                                    }
                                    break;
                                case 1:
                                    _aAllSon.eq(_nlen-1).addClass(fnClass[1]);
                                    _aAllSon.eq(0).addClass(fnClass[2]);
                                    _aAllSon.eq(index).addClass(fnClass[3]);
                                    _aAllSon.eq(2).addClass(fnClass[4]);
                                    _aAllSon.eq(3).addClass(fnClass[5]);
                                    for(var i=0;i<_nlen;i++){
                                        if(i!=0 && i!=2 && i!=3 && i!= _nlen-1 && i!=index){
                                            _aAllSon.eq(i).addClass(fnClass[0])
                                        }
                                    }
                                    break;
                                case _nlen-1:
                                    _aAllSon.eq(_nlen-3).addClass(fnClass[1]);
                                    _aAllSon.eq(_nlen-2).addClass(fnClass[2]);
                                    _aAllSon.eq(index).addClass(fnClass[3]);
                                    _aAllSon.eq(0).addClass(fnClass[4]);
                                    _aAllSon.eq(1).addClass(fnClass[5]);

                                    for(var i=0;i<_nlen;i++){
                                        if(i!=1 && i!=0 && i!= _nlen-2 && i!=_nlen-3 && i!=index){
                                            _aAllSon.eq(i).addClass(fnClass[0])
                                        }
                                    }
                                    break;
                                case _nlen-2:
                                    _aAllSon.eq(_nlen-4).addClass(fnClass[1]);
                                    _aAllSon.eq(_nlen-3).addClass(fnClass[2]);
                                    _aAllSon.eq(index).addClass(fnClass[3]);
                                    _aAllSon.eq(_nlen-1).addClass(fnClass[4])
                                    _aAllSon.eq(0).addClass(fnClass[5]);
                                    for(var i=0;i<_nlen;i++){
                                        if(i!=0 && i!=_nlen-1 && i!=_nlen-4  && i!=_nlen-3 && i!=index){
                                            _aAllSon.eq(i).addClass(fnClass[0])
                                        }
                                    }
                                    break;
                                default:
                                    _aAllSon.eq(index-2).addClass(fnClass[1]);
                                    _aAllSon.eq(index-1).addClass(fnClass[2]);
                                    _aAllSon.eq(index).addClass(fnClass[3]);
                                    _aAllSon.eq(index+1).addClass(fnClass[4]);
                                    _aAllSon.eq(index+2).addClass(fnClass[5]);
                                    for(var i=0;i<_nlen;i++){
                                        if(i!=index-2 && i!=index-1 && i!=index+1 && i!=index+2 && i!=index) {
                                            _aAllSon.eq(i).addClass(fnClass[0]);
                                        }
                                    }
                                    break;
                            }
                        }
                    };

                    // 绑定事件
                    $(this).on(_event, sfnClass, function(ev) {
                        if(!$(this).hasClass(fnClass[3]))
                            _DM.go($(this).index())
                    });
                    arr[i] = _DM;
                });
                return arr;
            };
            return init();
        };
    }(window, document, $)
    var carouse = $('#DmCarousel').DmCarousel();

    console.log(carouse);
});
