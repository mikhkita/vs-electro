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
        $("#bg-img").css("background-image",$(this).parents("li").css("background-image"));
        $("#bg-img a").attr("href",$(this).attr("href"));
        return false;
    });

    $(".fancy-img-big").click(function(){
        $(".fancy-img[href='"+$(this).attr("href")+"']").click();
        return false;
    });

    $('.count-cont input,.min-val,.max-val').bind("change keyup input click", function() {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }
    });
    $(".count-cont input").keyup(function(){
        if($(this).val()=='0') $(this).val("1");
    });
    $(".count-cont input").focusout(function(){
        if($(this).val()=='') $(this).val("1");
    });
    $(".plus").click(function(){
        var input = $(this).closest(".count-cont").find("input");
        count = input.val()*1;
        if(count<999) {
            input.val(count+1);
        }
    });
    $(".minus").click(function(){
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
        
        
    });

    $("#window-view").click(function(){
        $(this).addClass("active");
        $("#category-list").removeClass("list-view");
        $("#list-view").removeClass("active");
    });

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

    $("#basket-open").click(function(){
        $(".basket-small-cont").slideDown();
        $("#basket-open").hide();
        $("#minimize-basket").show();
        $("#basket-show-all").css("display","block");
        return false;
    });

    $("#minimize-basket").click(function(){
        $(".basket-small-cont").slideUp();
        $("#basket-open").show();
        $("#basket-show-all,#minimize-basket").css("display","none");
        return false;
    });

    $("#close-basket").click(function(){
        $(".b-basket-small").slideUp();
        return false;
    });

});