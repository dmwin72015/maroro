$(function() {
    // body...
    $('.sub-menu>a').on('click', function() {
        if ($(this).parent().hasClass('open')) {
            $(this).next().hide();
        } else {
            $(this).next().show();
        }
        $(this).parent().toggleClass('open');
    });

    //dataTable demo
    $(function() {
        var oTable = $('#china_area').dataTable({
            // ajax: 'data/data.json', //数据源,也可以使用data属性来指定数据源。
            columns: [ //列定义，对应的数据源中的json的value（切记不是key，key都是规定的值:data）。
                { data: 'indexNum' },
                { data: 'country' },
                { data: 'country_code' },
                { data: 'name1' },
                { data: 'code1' },
                { data: 'name2' },
                { data: 'code2' },
                { data: 'name3' },
                { data: 'code3' },
                { data: 'name4' },
                { data: 'code4' }
            ],
            displayLength: 15, //设置每页的数量
            lengthMenu: [
                [15, 30, 45, -1],
                ["15条", "30条", "45条", "所有"]
            ], //设置翻页选项的条数，第一个是数量，第二个是对应的名字（可不写）
            dom: '<"onTableTop"lf>rt<"afterTableBot"pi><"clear">',
            //dom:'<"toolbar">frtip',
            language: {
                url: '../../js/i18n/zh_CN.json'
            },
            columnDefs: [{ 
            	//列渲染，针对于每一列的操作，例如数据处理，修改样式等等。
                'render': function(data, type, row) {
                    // return data + '(' + row['money'] + ')';
                    return data;
                },
                'targets': 0
            }],
            createdRow: function(row, data, index) { 
            	//创建行回调，就是针对每一行进行操作，例如数据处理，修改样式等等。
                //row 每行dom元素
                //data 所有数据
                //index 行号
                // if (data['money'].replace(/\$|\,/g, '') > 500) {
                //     $('td', row).eq(2).css({
                //         'color': 'red',
                //         'font-weight': 'bold'
                //     })
                // }
            },
            //当处理大数据时，延迟渲染数据，有效提高Datatables处理能力
            "deferRender": true
        });
    });
})
