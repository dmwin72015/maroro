/**
 * Created by admin on 2016/4/1.
 * 做一个弹出层的小插件
 */
;
(function(factory) {
    'use strict';
    if (typeof define == 'function' && define.amd) {
        //amd

    } else if (typeof exports == 'object') {
        //cmd
        module.exports = function(root, $) {
            if (!root) {
                root = window;
            }
            if (!$) {
                $ = typeof window !== 'undefined' ?
                    require('jquery') :
                    require('jquery')(root);
            }
            return factory($, root, root.document);
        };
    } else {
        factory(jQuery, window, document);
    }

}(function($, window, document, undefined) {
    "use strict";
    var DmLayers = {}
        /**默认参数
         * 参数说明：
         * width:    宽度 String
         * height：  高度 String
         * position: 位置 String、JSON；默认：center，垂直左右居中。
         * schame:   主题风格 String
         * type：    类型  String
         *          目前提供：
         *              alert 提示信息框，
         *              prompt 输入内容的确认提示框,
         *              confirm 确认框，
         *              page 仿页面 ，
         *              tips 旁边的小提示框
         *              load 加载
         *              tab  tab层，可以切换内容
         *              photo 相册，图片轮播功能
         * showText：显示的内容 String；
         * showTitle 显示内容标题 string；不写的画默认为空
         * btn ：    按钮  Array  ；存放按钮上面的文字，例如['确认'，'取消']。
         * time:     关闭时间  number 单位是秒；只有tips，alert，page，load有效果
         * shape:    设置背景 JSON ; 例如：默认{background:#333,opcatiy:0.4}
         * event     触发事件 string；例如：默认 click事件 不传的话\
         * area:    自定义样式;例如：可传入高度、宽度等等属性。
         * shadeClose：  点击任意地方关闭遮罩 ； true 、false
         * content：自定义的内容；例如：
         *           '\<\div style="padding:20px;">自定义内容\<\/div>'
         * */

    /*
     * 私有方法，内部使用
     * */
    function _getBrowerSize() {
        //获取浏览器可视窗口的大小
        var w = document.documentElement.clientWidth;
        var h = document.documentElement.clientHeight;
        return { width: w, height: h };
    };

    function _getDocumentSize() {
        //获取文档的高度
        var w = document.body.scrollWidth;
        var h = document.body.scrollHeight;
        return { width: w, height: h };
    };

    function _str2U(str) {
        // 字符串转成unicode码
        if (!str || str.length < 0) return;
        var arr = [];
        for (var i = 0; i < str.length; i++) {
            arr[arr.length] = '\\u' + str.charCodeAt(i).toString(16);
        }
        return arr;
    }

    function _U2str(str) {
        // unicode码转成符串 {【4E00-9FA5中文基本汉字范围】
        if (!str || str.length < 0) return;
        if (str.indexOf('\\u') == 0) {
            str = str.slice(2)
        }
        return String.fromCharCode(parseInt('0x' + str, 16));
    }
    //默认配置
    var default_options = {
        width: 260,
        height: 'auto',
        position: 'center',
        type: 'alert',
        schame: 'grey',
        infoText: '你在干什么？',
        titleText: '提示信息',
        showinput: '',
        btn: ['\u786e\u5b9a', '\u53d6\u6d88'], //确定、取消
        time: 1500,
        shape: {
            background: '#333',
            opacity: 0.4
        },
        event: 'click',
        shadeClose: 'true',
        content: ''
    };
    //常用字符串
    var aType = ['alert', 'confirm', 'prompt', 'tips', 'load'];
    var aClass = ['layer_wrap', 'layer_content_box', 'inner_content_box', 'layer_title', 'layer_close', 'showText', 'prompt_input_box', 'prompt_input', 'btn_box', 'layer_btn', 'btn0', 'btn1'];
    var sLayerBg = '<div class="layer_bg"></div>';
    var sBtn = '<a href="javascript:;" class="layer_btn btn0"></a>';
    //初始化轮廓
    var oWrap = $('<div class="layer_wrap"/>');


    //初始化
    var _init = function(options) {
        createShade(options);
        createContent(options);
        bindClose(options);
    }
    var fn = _init.fn = _init.prototype;
    fn.config = $.extend({}, default_options);
    // 初始内容
    function createShade() {
        $('body').eq(0).append(oWrap.css('display', 'none'));
    }

    function createContent(options) {
        var that = this,
            config = $.extend({}, default_options, options);
        var str = '<div class="layer_content_box ' + ('layer_' + config.type) + ' ' + (
            config.type == 'alert' || config.type == 'confirm' && !config.titleText ? 'no-title"' : '"') + '>' + (config.titleText ? '<h3 class="layer_title">' + config.titleText + '<span class="layer_close" id="layer_close"></span></h3>' : '') + '<div class="inner_content_box"><p class="showText">' + config.infoText + '</p>' + (config.btn.length <= 0 ? '' : '<div class="btn_box">' + (function() {
            var button = '';
            for (var i = 0; i < config.btn.length; i++) {
                button += '<a href="javascript:;" class="layer_btn btn'+i+'" id="layer_btn'+i+'">' + config.btn[i] + '</a>';
            }
            return button;
        }())) + '</div></div>';
        oWrap.html(sLayerBg + str);
    };

    function bindClose() {
        oWrap.on('click', '#layer_close', function() {
            oWrap.hide().find('.layer_content_box').remove();
        });
    };

    function bindFn(fn0, fn1) {
        oWrap.one('click', '#layer_btn0,#layer_btn1', function(ev) {
            this.id == 'layer_btn0' ? fn0 && fn0(ev) : fn1 && fn1(ev);
            oWrap.hide().find('.layer_content_box').remove();
        });
    };

    function bindEvent() {

    }
    function bindHide(){
        setTimeout(function(){
            $('#layer_close').trigger('click');
        }, 2000);
    }

    /*
     * 暴露方法，外部调用
     * */

    DmLayers.tab = function() {
        //TODO tab窗口模式
    };
    DmLayers.confirm = function(msg,options,fn0, fn1) {
        //基本的弹窗
        oWrap.show();
        createContent($.extend(default_options, {
            type: 'confirm',
            infoText: msg || options.infoText,
            titleText: options.title || !!0
        }))
        bindFn(fn0, fn1);
    };
    DmLayers.alert = function(msg, options, fn0) {
        //基本的弹窗
        oWrap.show();
        createContent($.extend(default_options, {
            type: 'alert',
            infoText: msg || options.infoText,
            titleText: options.title || !!0
        }));
    };
    DmLayers.tips = function(msg,o){
        if(o || $.isEmpty(o)) return;
        var l = $(o).offset().left,
            t = $(o).offset().top;

    };
    $.Layers = $.fn.Layers = function(options) {
        if (this === $) {
            console.log('直接调用');
        } else {
            console.log('绑定元素');
            console.log(this);
        }
        new _init(options);
        return DmLayers;
    };
}));
