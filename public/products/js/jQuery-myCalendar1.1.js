(function($) {
    //默认参数
    var default_options = {
        i18n: {
            en: {
                months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                weeks: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            },
            cn: {
                months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                weeks: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
            }
        },
        lang: 'cn',
        formatStr: 'yyyy-MM-dd HH:mm:ss',
        formateDate: 'yyyy-MM-dd',
        formateTime: 'HH:mm:ss',
        minDate: '1990-01-01 00:00:00.000',
        maxDate: '2099-11-31 59:59:59.999',
        hours12: false,
        style: '',
        model: 'day'

    };
    //获取每个月天数
    var getMonthNum = function(year, month) {
            var oDate = new Date();
            year = Number(year) || (Number(year) == 0 ? 0 : oDate.getFullYear());
            month = Number(month) || (Number(month) == 0 ? 0 : oDate.getMonth());
            var d = new Date(year, month + 1, 0);
            return d.getDate();
        },
        getFirstDayWeek = function(year, month) {
            var oDate = new Date();
            year = Number(year) || (Number(year) == 0 ? 0 : oDate.getFullYear());
            month = Number(month) || (Number(month) == 0 ? 0 : oDate.getMonth());
            var d = new Date(year, month, 1);
            return d.getDay();
        };
    $.fn.dmDatePicker = function(opt) {
        var _this = this;
        var options = ($.isPlainObject(opt) || !opt) ? $.extend(true, {}, default_options, opt) : $.extend({}, default_options),
            Models = ['day', 'month', 'year','years'],
            createPicker = function(input) {
                var pickerWapper = $('<div ' + (options.id ? 'id="' + options.id + '"' : '') + ' ' + (options.style ? 'style="' + options.style + '"' : '') + ' class="caleWapper ' + (options.className ? 'style="' + options.className + '"' : '') + '"></div>'),
                    dateBtnPres = $('<span class="dm_date_btn pres"></span>'),
                    dateBtnNext = $('<span class="dm_date_btn next"></span>'),
                    dateBtnBox = $('<div class="date_btn_box"></div>').append(dateBtnPres).append(dateBtnNext),
                    dateCaleBox = $('<div class="date_cale_box"></div>'),
                    dateSection = $('<div class="dm_date_sec"></div>').append(dateBtnBox).append(dateCaleBox),
                    timeBox = $('<div class="dm_time_box"></div>'),
                    timeBtnUp = $('<span class="dm_time_btn up"></span>'),
                    timeBtnDwon = $('<span class="dm_time_btn dwon"></span>'),
                    timeSection = $('<div class="dm_time_sec"></div>').append(timeBtnUp).append(timeBox).append(timeBtnDwon),
                    datetimeArea = $(' <div class="dm_datetime_area"></div>').append(dateSection),
					botBtnToday = $('<span class="botBtn today">今天</span>'),
					bottomArea = $('<div class="dm_bottom_area"></div>').append(botBtnToday),
                    currMonth = new Date().getMonth(),
                    currYear = new Date().getFullYear(),
                    curModel = options.model || Models[0],
                    months = options.i18n[options.lang].months,
                    weeks = options.i18n[options.lang].weeks,


                    init_day = function(year, month) { //初始化天,转换成模式1。
                        var oDate = new Date();
						var cuurDay = oDate.getDate();
                        var year = Number(year) || oDate.getFullYear();
                        var month = Number(month) || (Number(month) == 0 ? 0 : oDate.getMonth());
						var model = $('.date_cale_box').attr('data-type');
						if( model && model == Models[0] ) {
							$('.date_cale_box span').each(function(index, el) {
                                if (el.className != 'week') {
                                    var i = index - 7;
                                    $(el).text(i).attr('class', Models[0]).attr('data-num', i);
                                    if (i >= getFirstDayWeek(year, month)) {
                                        var num = i - getFirstDayWeek(year, month) + 1;
                                        if (num <= getMonthNum(year, month)) {
                                            $(el).text(num).attr({
                                                'class': Models[0],
                                                'data-num': num
                                            });
                                        } else {
                                            $(el).text('').attr({
                                                'class': 'empty',
                                                'data-num': 'empty'
                                            });
                                        }
                                    } else {
                                        $(el).text('').attr({
                                            'class': 'empty',
                                            'data-num': 'empty'
                                        });
                                    }
                                }
                            });
                        } else {
							$('.date_cale_box').html('');	
							for (var i = 0; i < 7; i++) { //添加WEEK
								var span = $('<span></span>'),
									left = (i % 7) * 30, //TODO 盒子的宽度除以7
									top = 0,
									weektxt = (options.lang == 'cn' ? weeks[i % 7].slice(2, 3) : weeks[i % 7].slice(0, 3)),
									className = 'week';
								span.css({
									'left': left,
									'top': top
								}).attr({
									'data-num': weektxt,
									'class': className
								}).text(weektxt);
								$('.date_cale_box').append(span);
							}
							console.log(dateCaleBox.outerWidth());
							for (var i = 0; i < 42; i++) { //添加DAY
								var left = (i % 7) * ((dateCaleBox.outerWidth() - 1) / 7),
									top = (Math.floor(i / 7) + 1) * ((dateCaleBox.outerHeight() - 1) / 6),
									montxt = '',
									className = 'day'									
								if (i >= getFirstDayWeek(year, month)) {
									montxt = i - getFirstDayWeek(year, month) + 1;
									if (montxt > getMonthNum(year, month)) {
										montxt = '';
									}
								}
								montxt == '' && (className = 'empty');
								var span = $('<span></span>');
								span.css({
									'left': left,
									'top': top,
									'width': (dateCaleBox.outerWidth() - 1) / 7 - 1 - 4,
									'height': (dateCaleBox.outerHeight() - 1) / 6 - 1 - 7,
								}).attr({
									'data-num': montxt,
									'class': className
								}).text(montxt);
								dateCaleBox.append(span);
							}	
                        }
						if(oDate.getMonth() == month){
							dateCaleBox.find('.day').each(function(){
								if($(this).attr('data-num') == cuurDay){
									$(this).addClass('current');
								}
							});
						}
						if(dateBtnBox.find('.t_year').length>0){
							dateBtnBox.find('.t_year').text(year).attr('data-num',year);
						}else{
							$('<a class="dm_date_txt t_year"></a>').appendTo(dateBtnBox).attr({
								'data-num':year,
							}).text(year);	
						}
						if(dateBtnBox.find('.t_month').length>0){
							dateBtnBox.find('.t_month').text(months[month]).attr('data-num',month);
						}else{
							$('<a class="dm_date_txt t_month"></a>').insertBefore('.t_year').attr({
								'data-num':month,
							}).text(months[month]);
						}
						curModel = Models[0];
                        dateCaleBox.attr('data-type', Models[0]);
						currMonth =  month;
						currYear = year;
                    },
                    init_month = function(year,month) { //初始化月份
						var model = dateCaleBox.attr('data-type');
						if(model == Models[0] || model == Models[2]){
							dateCaleBox.html('');
							for (var i = 0; i < 12; i++) {
                                var left = (i % 4) * ((dateCaleBox.outerWidth() - 1) / 4),
                                    top = Math.floor(i / 4) * ((dateCaleBox.outerHeight() - 1) / 3),
                                    txt = months[i],
                                    className = 'month';
                                var span = $('<span></span>');
                                span.css({
                                    'left': left,
                                    'top': top,
                                    'width': (dateCaleBox.outerWidth() - 1) / 4 - 1,
                                    'height': (dateCaleBox.outerHeight() - 1) / 3 - 1
                                }).attr({
                                    'data-num': i,
                                    'class': className
                                }).text(txt);
                                $('.date_cale_box').append(span);
                            }
						}
						if(dateBtnBox.find('.t_year').length>0){
							dateBtnBox.find('.t_year').text(year).attr('data-num',year);
						}else{
							$('<a class="dm_date_txt t_year"></a>').appendTo(dateBtnBox).attr({
								'data-num':year,
							}).text(year);	
						}
						curModel = Models[1];
                        dateCaleBox.attr('data-type', Models[1]);
						currYear = year;
                    },
                    init_year = function(year) { //初始化年
						var model = dateCaleBox.attr('data-type');
						
						if(model == Models[0] || model == Models[1]){
							dateCaleBox.html('');
							for (var i = 0; i < 12; i++) {
                                var left = (i % 4) * ((dateCaleBox.outerWidth() - 1) / 4),
                                    top = Math.floor(i / 4) * ((dateCaleBox.outerHeight() - 1) / 3),
                                    txt = year - 6 + i,
                                    className = 'year';
                                var span = $('<span></span>');
                                span.css({
                                    'left': left,
                                    'top': top,
                                    'width': (dateCaleBox.outerWidth() - 1) / 4 - 1,
                                    'height': (dateCaleBox.outerHeight() - 1) / 3 - 1
                                }).attr({
                                    'data-num': txt,
                                    'class': className
                                }).text(txt);
                                dateCaleBox.append(span);
                            }
						}else if(model == Models[2]){
							
                        }
						curModel = Models[2];
						dateCaleBox.attr('data-type', Models[2]);
						dateBtnBox.find('.t_year').text((year-6)+'---'+(Number(year)+5));
						currYear = year;
                    },
                    init_time = function() { //初始化时间
                        //添加时间
                        for (var i = 0; i < 10; i++) {
                            var left = 3;
                            var top = i * 25;
                            var span = $('<span>' + '18:10' + '</span>')
                            span.css({
                                left: left,
                                top: top
                            });
                            timeBox.append(span);
                        }
                    },
                    getDateTime = function(){
                    	var year = $('.t_year').attr('data-num');
                    	var month = $.toDow(Number($('.t_month').attr('data-num'))+1);
                    	var day = $(this).attr('data-num');
                    	_this.val('').val(year+'-'+month+'-'+$.toDow(day));
                    };
                $('body').append(pickerWapper.append(datetimeArea).append(bottomArea));

                //设置当前日期 年，月份
                $('.t_month').text(months[currMonth]).attr('data-num', currMonth);
                $('.t_year').text(currYear).attr('data-num', currYear);

                //设置位置
                pickerWapper.css({
                    display: 'none',
                    left: _this.offset().left,
                    top: _this.offset().top + _this.outerHeight() + 2,
					position:'absolute'
                }).on('mousedown', function() {
                    return false;
                });
                //上一个、下一个按钮
                $('.date_btn_box').on({
                    'mousedown': function() {
                        return false;
                    },
                    'click': function(event) {
                        if ($(this).hasClass('pres')) {
                            switch (curModel) {
                                case Models[0]:
                                    if (--currMonth < 0) {
                                        currMonth = 11;
                                        currYear--;
                                    }
                                    init_day(currYear, currMonth);
                                    break;
                                case Models[1]:
                                    currYear--;
                                    $('.t_year').attr('data-num', currYear);
                                    break;
								case Models[2]:
									
                            }
                        } else {
                            switch (curModel) {
                                case Models[0]:
                                    if (++currMonth > 11) {
                                        currMonth = 0;
                                        currYear++;
                                    }
                                    init_day(currYear, currMonth);
                                    break;
                                case Models[1]:
                                    currYear++;
                                    $('.t_year').attr('data-num', currYear);
                                    break;
                            }
                        }
                        $('.t_month') && $('.t_month').text(months[currMonth]).attr('data-num', currMonth);
                        $('.t_year') && $('.t_year').text(currYear);
                    },
                }, '.dm_date_btn');

                $('.date_btn_box').on({//月份按钮点击，选择月份界面
                    'mousedown': function() {
                        return false;
                    },
                    'click': function() {
                        if ($(this).hasClass('t_month')) {
                            //TODO  点击月份按钮
                            if (curModel == Models[0]) {
                                curModel = Models[1];
                                $('.t_month').remove();
                                init_month($('.t_year').attr('data-num'));
                            }
                        } else {
                            //TODO 点击年按钮
                            if (curModel != Models[2]) {
                                curModel = Models[2];
                                $('.t_month') && $('.t_month').remove();
                                init_year($('.t_year').attr('data-num'));
                            }
                        }
                    }
                }, '.dm_date_txt');
				
                dateCaleBox.on({//选择具体的天、月、年的事件
                    'click': function() {//天
						pickerWapper.hide();
						getDateTime.call(this);
                    }
                }, '.day')
				.on({//月
                    'click': function() {
                        init_day($('.t_year').attr('data-num'), $(this).attr('data-num'));
                    }
                }, '.month')
				.on({//年
					'click':function(){
						init_month($(this).attr('data-num'));
					}
				},'.year');
				
                //选择月份
				botBtnToday.click(function(){
					var oDate = new Date();
					var year = oDate.getFullYear();
					var month = oDate.getMonth();
					init_day(year, month);
				});
                /*选择日期
                dateCaleBox.on('click', 'span', function() {
                    _this.val(currYear + '-' + currMonth + '-' + $(this).attr('data-num'));
                    pickerWapper.hide();
                });
                */
                _this.click(function(event) {
                    pickerWapper.show();
                });
                init_day();
                // init_month();
                init_time();
            };
        createPicker();
        return this;
        
    };

    Date.prototype.getFirstDayWeek = function(year, month) {
        var oDate = new Date();
        year = Number(year) || Number(year) == 0 ? 0 : oDate.getFullYear();
        month = Number(month) || (Number(month) == 0 ? 0 : oDate.getMonth());
        var d = new Date(year, month + 1, 0);
        return d.getDate();
    };

    Date.prototype.getMonthNum = function(year, month) {
        var oDate = new Date();
        year = Number(year) || oDate.getFullYear();
        month = Number(month) || (Number(month) == 0 ? 0 : oDate.getMonth());
        var d = new Date(year, month, 1);
        return d.getDay();
    };

    $.extend({
        //获取某一个月的天数，默认当前月
        getDayNum: function(year, month) {
            var oDate = new Date();
            year = Number(year) || oDate.getFullYear();
            month = Number(month) || (Number(month) == 0 ? 0 : oDate.getMonth());
            var d = new Date(year, month + 1, 0);
            return d.getDate();
        },
        getFirDayWeek: function(year, month) {
            var oDate = new Date();
            year = Number(year) || oDate.getFullYear();
            month = Number(month) || (Number(month) == 0 ? 0 : oDate.getMonth());
            var d = new Date(year, month, 1);
            return d.getDay();
        },
        toDow:function(v){
        	if(Number(v)){
        		if(v>=0 && v<10){
        			v = '0'+v;
        		}
        	}
        	return v;
        }
    });

})(jQuery);
