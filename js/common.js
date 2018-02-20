(function($) {

    var wh = $(window).height(),
        ww = $(window).width();
    // var isIE = document.all && document.querySelector;
    // var isIE2 = document.body.style.msTouchAction !== undefined;

    // $(window).load(function () {
    //     if ( !isIE && !isIE2 && ww > 991 ) {
    //         $.stellar({
    //             horizontalScrolling: false
    //         });
    //     }
    // });

    $('.join_btn').click(function () {
        $('#login_form').css("display","none");
    });
    $('#create_acc').click(function (e) {
        e.preventDefault();
        $('#login_form').css("display","none");
        $('#reg_form').css("display","block");
    });
    $('#authorize').click(function (e) {
        e.preventDefault();
        $('#reg_form').css("display","none");
        $('#login_form').css("display","block");
    });
    $('.authorize').click(function (e) {
        e.preventDefault();
        $('#reg_form').css("display","none");
        $('#login_form').css("display","block");
    });
    $('#loginModal').on('hidden.bs.modal', function () {
        $('#reg_form').css("display","block");
        $('#login_form').css("display","block");
    });

    $('.faqs_links li > a').on('click', function () {
        var currItem = $(this).closest('li'),
            currItemIndex = currItem.index(),
            itemCtn = $('.faqs_content_item');

        $('.faqs_links li').removeClass("active");
        currItem.addClass("active");
        itemCtn.removeClass("active");
        itemCtn.eq(currItemIndex).addClass("active");
    });

    if ( ww < 768 ) {
        $('.faqs_content_item .item_title').on('click', function () {
            var currItem = $(this).next('.item_content');
            currItem.slideToggle(300);
            $('.faqs_content_item .item_content').not(currItem).slideUp(300);
        })
    }

    $("img, a").on("dragstart", function(event) { event.preventDefault(); });




    $('.language-select').click(function(){
        $(this).toggleClass('open');
    })

    $('.language-select li a').click(function(){
        var setLang = $('.language-select').data('location'),
            dataLangSelect = $(this).data('lang')
        $('.language-select').data('location', dataLangSelect);
        $('.language-select li').removeClass('active');
        $(this).toggleClass('active');
    })

})(jQuery);


$(document).ready(function() {

    // if(screen.width >= 1024){
    //     setInterval(function () {
    //
    //         $(".img_hockey").animate({
    //             widthÂ Â  : "936"
    //         }, 5000);
    //         $(".img_hockey").animate({
    //             widthÂ Â  : "900"
    //         }, 10);
    //
    //         $(".img_text").animate({
    //             widthÂ Â  : "1045"
    //         }, 5000);
    //         $(".img_text").animate({
    //             widthÂ Â  : "1100"
    //         }, 10);
    //
    //         $(".par_image").animate({
    //             heightÂ Â  : "528"
    //         }, 5000);
    //         $(".par_image").animate({
    //             heightÂ Â  : "550"
    //         }, 10);
    //
    //     }, 5010);
    // }
    //
    // if(screen.width < 1024 && screen.width > 767){
    //     var main= document.getElementById("banner_image");
    //     var str = '<img src="/img/Banner-tablet.jpg" id="tablet_banner">';
    //
    //     main.innerHTML += str;
    // }
    //
    // if(screen.width <= 767){
    //     var main= document.getElementById("banner_image");
    //     var str = '<img src="/img/Banner-mobile.jpg" id="mobile_banner">';
    //
    //     main.innerHTML += str;
    // }


    // if(screen.width <= 480){
    //     var main= document.getElementById("banner_image");
    //     var str = '<img src="/img/Banner-tablet.jpg" id="tablet_banner">';
    //
    //     main.innerHTML += str;
    // }


    //Range slider

    var set_invest_eth_to_usd = $('.eth_to_usd').html() ;
    set_invest_eth_to_usd = parseFloat(set_invest_eth_to_usd) ;
    var set_invest_btc_to_usd = $('.btc_to_usd').html() ;
    set_invest_btc_to_usd = parseFloat(set_invest_btc_to_usd) ;

    function set_invest (money) {
        var final_money, final_money_eth, final_money_btc ;
        final_money = money * 1.2 ;
        final_money = final_money.toFixed(0) ;

        final_money_eth = final_money / set_invest_eth_to_usd ;
        final_money_eth = final_money_eth.toFixed(4) ;
        final_money_btc = final_money / set_invest_btc_to_usd ;
        final_money_btc = final_money_btc.toFixed(4) ;

        $('.invest_usd_col').html(final_money) ;
        $('.invest_eth_col').html(final_money_eth) ;
        $('.invest_btc_col').html(final_money_btc) ;
    }

    $(function () {
        var slider_value ;
        var slider = $("#slider").slider({
            range: "min",
            value: 169000,
            min: 1,
            max: 500000,
            step: 1,

            slide: function(event, ui) {
                slider_value = ui.value ;

                if (slider_value <= 166667) {
                    slider_value = slider_value / 166667 * 1000 ;
                    slider_value = slider_value.toFixed(0)
                }else if(slider_value > 166667 && slider_value <= 333334) {
                    slider_value = (slider_value - 166667) / 166667 * 100000 + 1000 ;
                    slider_value = slider_value.toFixed(0)
                }else if(slider_value > 333334) {
                    slider_value = (slider_value - 333334) / 166667 * 400000 + 100002;
                    slider_value = slider_value.toFixed(0)
                }

                set_invest(slider_value) ;

                $(ui.handle).find('.tooltip').text(slider_value);
            },
            create: function(event, ui) {
                var tooltip = $('<div class="tooltip" />');

                $(event.target).find('.ui-slider-handle').append(tooltip);

                $('.ui-state-default').animate({opacity:'0.75'},2000);
                setInterval(function () {
                    $('.ui-state-default').animate({opacity:'1'},1000);
                    setTimeout(function () {
                        $('.ui-state-default').animate({opacity:'0.75'},1000);
                    }, 1000) ;
                }, 2000) ;
            },
            change: function(event, ui) {
                $('#hidden').attr('value', ui.value);
            }
        });
    });

});