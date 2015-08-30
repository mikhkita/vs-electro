var progress = new KitProgress("#f98411",2);

progress.endDuration = 0.1;

$(document).ready(function(){   
    function resize(){
       if( typeof( window.innerWidth ) == 'number' ) {
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || 
        document.documentElement.clientHeight ) ) {
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }
        $(".b-catalog").css("min-height",myHeight-$(".b-footer").height());
    }
    $(window).resize(resize);
    resize();

    $(".b-detail-buy-butt").click(function(){
        $(this).attr("href",$(this).attr("href")+"&"+$("input[name='quantity']").val());
        return false;
    });

    $("body").on("click",".cart-ajax",function(){
        var data = $(this).attr("href").split("?");
        console.log(data[0]);
        console.log(data[1]);

        progress.setColor("#f98411");
        progress.start(1.5);

        $.ajax({
            type: "GET",
            url: data[0],
            dataType: "html",
            data: data[1],
            success: function(msg){
                progress.end();
                var html = getBasketHTML(msg);
                $(".b-basket-small").html(html[0]);
                $(".b-cart-info").html(html[1]);
            }
        });

        return false;
    });

    function getBasketHTML(html){
        txt = html.split('<!--start-small-cart-->');
        txt = txt[1].split('<!--end-small-cart-->');
        txt2 = txt[1].split('<!--start-cart-info-->');
        txt2 = txt2[1].split('<!--end-cart-info-->');
        return [txt[0],txt2[0]];
    }

    var max = 0;
    $(".tabs a").each(function(){
        if( max < $(this).height() ){
            max = $(this).height();
        } 
    });
    $(".tabs li").css("height",max+35);

    $(".order-button").click(function(){
        $("#sort-field").val($(this).attr("data-field"));
        $("#sort-order").val($(this).attr("data-order"));
        $("#left-filter").submit();
        return false;
    });

   $('.partners-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        easing: 'ease-out',
        speed: 300,
        autoplay: true,
        prevArrow: '<span class="left-arrow arrow"></span>',
        nextArrow: '<span class="right-arrow arrow"></span>'
    });
     $('.main-backSlider').slick({
        dots: true,
        swipe: false,
        fade: true,
        cssEase: 'linear',
        prevArrow: '<span class="left-arrow-back"></span>',
        nextArrow: '<span class="right-arrow-back"></span>'
    });

    $(window).load(function() {
        var h1,h2,h3,height,
        catalog = $(".catalog-cont ul");
        for (var i = 0; i < catalog.length; i=i+3) {
            h1 = catalog.eq(i).height();
            h2 = catalog.eq(i+1).height();
            h3 = catalog.eq(i+2).height();
            if(h1>=h2 && h1>=h3) height = h1;
            if(h2>=h1 && h2>=h3) height = h2;
            if(h3>=h1 && h3>=h2) height = h3;
            for (var j = i; j <= (i+2); j++) {
                catalog.eq(j).height(height);
            };
        };
        $(".main-backSlider").fadeTo(300,1);
    });
    $("#search").keyup(function(){
        if($("#search").val()!='') {
            $("#search-btn").show();
        } else {
            $("#search-btn").hide();
        }
    });

    $(".fancy-img").fancybox({
        padding : 0,
        nextEffect : ( device.mobile() || device.tablet() )?"fade":"elastic",
        prevEffect : ( device.mobile() || device.tablet() )?"fade":"elastic"
    });
    $("body").on("click",".fancy-img-thumb", function(){
        $("#bg-img").css("background-image","url('"+$(this).attr("href")+"')");
        $("#bg-img a").attr("href",$(this).parents("li").find(".fancy-img").attr("href"));
        return false;
    });

    $(".fancy-img-big").click(function(){
        $(".fancy-img[href='"+$(this).attr("href")+"']").click();
        return false;
    });

    $('.count-cont-1 input,.min-val,.max-val').bind("change keyup input click", function() {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }
    });
    $(".count-cont-1 input").keyup(function(){
        if($(this).val()=='0') $(this).val("1");
    });
    $(".count-cont-1 input").focusout(function(){
        if($(this).val()=='') $(this).val("1");
    });
    $(".count-cont-1 .plus").click(function(){
        var input = $(this).closest(".count-cont").find("input");
        count = input.val()*1;
        if(count<999) {
            input.val(count+1);
        }
    });
    $(".count-cont-1 .minus").click(function(){
        var input = $(this).closest(".count-cont").find("input");
        count = input.val()*1;
        if(count>1) {
            input.val(count-1);
        }
    });
    
    $("#list-view").click(function(){
        $("#category-list").addClass("list-view");
        $("#window-view").removeClass("active");
        $(this).addClass("active");   
        $.cookie('category','list', { expires: 7, path: '/' });  
    });

    $("#window-view").click(function(){
        $(this).addClass("active");
        $("#category-list").removeClass("list-view");
        $("#list-view").removeClass("active");
        $.cookie('category','window', { expires: 7, path: '/' });
    });

    if($("#category-list").length && $.cookie('category') ) {
        if($.cookie('category')=="list") {
            $("#category-list").addClass("list-view");
            $("#window-view").removeClass("active");
            $("#list-view").addClass("active");  
        } else {
            $("#window-view").addClass("active");
            $("#category-list").removeClass("list-view");
            $("#list-view").removeClass("active");
        }
    }
    if($("#category-list").length && $("#category-list").hasClass("list-view")) {
        $.cookie('category','list', { expires: 7, path: '/' });
    } else {
        $.cookie('category','window', { expires: 7, path: '/' });
    }
    

    function range_init() {
        $.each($(".slider-range"),function(){
            var obj = $(this),
            min_input = $(this).closest(".slide-type").find(".min-val"),
            max_input = $(this).closest(".slide-type").find(".max-val"),
            min_text = $(this).closest(".slide-type").find(".min-text"),
            max_text = $(this).closest(".slide-type").find(".max-text"),
            min_val = $(this).attr("data-min")*1,
            max_val = $(this).attr("data-max")*1,
            cur_min_val = $(this).attr("data-min-cur") ? $(this).attr("data-min-cur")*1 : min_val,
            cur_max_val = $(this).attr("data-max-cur") ? $(this).attr("data-max-cur")*1 : max_val,
            data_step = $(this).attr("data-step") ? $(this).attr("data-step")*1 : 1;
            obj.slider({
                step: data_step,
                range: true,
                min: min_val,
                max: max_val,
                values: [ cur_min_val, cur_max_val ],
                slide: function( event, ui ) {
                    (ui.values[ 0 ] == min_val) ? min_input.val('') : min_input.val( ui.values[ 0 ] );
                    (ui.values[ 1 ] == max_val) ? max_input.val('') : max_input.val( ui.values[ 1 ] );  
                    min_text.text( ui.values[ 0 ] );
                    max_text.text( ui.values[ 1 ] );

                },
                change: function( event, ui ) {  
                    (ui.values[ 0 ] == min_val) ? min_input.val('') : min_input.val( ui.values[ 0 ] );
                    (ui.values[ 1 ] == max_val) ? max_input.val('') : max_input.val( ui.values[ 1 ] );       
                    min_text.text( ui.values[ 0 ] );
                    max_text.text( ui.values[ 1 ] );
                }
            });
            (cur_min_val == min_val) ? min_input.val('') : min_input.val( cur_min_val );
            (cur_max_val == max_val) ? max_input.val('') : max_input.val( cur_max_val );
            min_text.text( cur_min_val );
            max_text.text( cur_max_val );

            min_input.change(function() {
            if($(this).val()=='' || (($(this).val()*1) <= min_val) )  {
                $(this).val('');
                obj.slider( "values", 0, min_val );
                return true;
            }
            if(max_input.val()=="" && (($(this).val()*1) > max_val) ) {
                $(this).val(max_val);
                obj.slider( "values", 0, max_val );
                return true;
            }
            if(max_input.val()!="" && (($(this).val()*1) > max_input.val()*1) ) {
                $(this).val(max_input.val());       
            }
            obj.slider( "values", 0, $(this).val()*1 );
            
            });
            max_input.change(function() {
                if($(this).val()=='' || (($(this).val()*1) >= max_val) ) {
                    $(this).val('');
                    obj.slider( "values", 1, max_val );
                    return true;
                }
                if(min_input.val()=="" && (($(this).val()*1) < min_val) ) {
                    $(this).val(min_val);
                    obj.slider( "values", 1, min_val );
                    return true;
                }
                if(min_input.val()!="" && (($(this).val()*1) < min_input.val()*1) ) {
                    $(this).val(min_input.val());    
                }
                obj.slider( "values", 1, $(this).val()*1 );
            });
        });
        
    }
    if ($(".slider-range").length) range_init();

    $(".b-category .filter .filter-item-cont h3").click(function(){
        var obj = $(this).closest(".filter-item-cont");
        if(obj.hasClass("active")) {
            obj.removeClass("active").find(".filter-item").slideUp();
        } else {
            obj.addClass("active").find(".filter-item").slideDown();
        }

    });
    $(".b-category .filter .filter-item-cont .filter-item").hide();
    $(".b-category .filter .filter-item-cont.active .filter-item").show();

    $("body").on("click","#basket-open,.basket-open",function(){
        $(".basket-small-cont").slideDown();
        $(".b-basket-small").slideDown();
        $("#basket-open").hide();
        $("#minimize-basket").show();
        $("#basket-show-all").css("display","block");
        $.cookie('basket','full', { expires: 7, path: '/' });
        return false;
    });

    $("body").on("click","#minimize-basket",function(){
        $(".basket-small-cont").slideUp();
        $("#basket-open").show();
        $("#basket-show-all,#minimize-basket").css("display","none");
        $.removeCookie('basket', { path: '/' });
        return false;
    });

    $("body").on("click","#close-basket",function(){
        $(".b-basket-small").slideUp();
        $.cookie('basket','close', { expires: 7, path: '/' });
        return false;
    });

    function basket_cookie() {
        if($(".b-basket-small").length && $.cookie('basket') ) {
            if($.cookie('basket')=="close") {
                $(".b-basket-small").hide(); 
            } else if($.cookie('basket')=="full"){
                $(".basket-small-cont").show();           
            }
        }
    }

    basket_cookie();

    
    $(".scrollable-link").click(function(){
        var href = $(this).attr("href"),
            arr = href.split("#");

        $(this).attr("href",arr[0]+"#"+$("body").scrollTop());
    });

    if(window.location.hash && window.location.hash!= "#") {
        var hash = window.location.hash.substr(1);

        if( hash != "" ){
            $("body, html").animate({
                scrollTop : hash*1
            },0);
        }

        history.pushState('',document.title,window.location.pathname);
    } else {
        $(".tabs li").eq(0).click();
    }
    

});