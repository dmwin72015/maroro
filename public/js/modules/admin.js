$(function() {
    // body...
    $('.sub-menu>a').on('click', function() {
        if ($(this).parent().hasClass('open')) {
            $(this).next().hide();
        }else{
        	$(this).next().show();
        }
        $(this).parent().toggleClass('open');
    });

    
})
