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
    }
    $(window).resize(resize);
    resize();
    $('.partners-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        prevArrow: '<span class="left-arrow arrow"></span>',
        nextArrow: '<span class="right-arrow arrow"></span>'
    });
     $('.main-backSlider').slick({
        dots: true,
        // autoplay: true,
        // arrows: false,
        swipe: false,
        fade: true,
        cssEase: 'linear',
        prevArrow: '<span class="left-arrow-back"></span>',
        nextArrow: '<span class="right-arrow-back"></span>'
    });
    // $('.main-contentSlider').slick({
    //     autoplay: true,
    //     fade: true,
    //     cssEase: 'linear',
    //     asNavFor: '.main-backSlider',
    //     prevArrow: '<span class="left-arrow arrow"></span>',
    //     nextArrow: '<span class="right-arrow arrow"></span>'
    // });
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
        // alert($(".fancy-img[href='"+$(this).attr("href")+"']").attr("href"));
        $(".fancy-img[href='"+$(this).attr("href")+"']").click();
        return false;
    });

    $('#count,.slider-min,.slider-max').bind("change keyup input click", function() {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }
    });
    $("#count").keyup(function(){
        if($("#count").val()=='0') $("#count").val("1");
    });
    $("#count").focusout(function(){
        if($("#count").val()=='') $("#count").val("1");
    });
    $(".plus").click(function(){
        count = $("#count").val()*1;
        if(count<999) {
            $("#count").val(count+1);
        }
    });
    $(".minus").click(function(){
        count = $("#count").val()*1;
        if(count>1) {
            $("#count").val(count-1);
        }
    });
    if($( "#price-slider" ).length>0) {
        slider_init("price",0,15000);
    }
    
    function slider_init(name,min_val,max_val) {
        var  obj = $( "#"+name+"-slider" ),
        visible_min_input = $("#"+name+"-min-l"),
        visible_max_input = $("#"+name+"-max-r"),
        hidden_min_input = $( "."+name+"-min" ),
        hidden_max_input = $( "."+name+"-max" ),
        min_text = $( "#"+name+"-l" ),
        max_text = $( "#"+name+"-r" );
        obj.slider({
            range: true,
            min: min_val,
            max: max_val,
            values: [ min_val, max_val ],
            slide: function( event, ui ) {
                hidden_min_input.val( ui.values[ 0 ] );
                hidden_max_input.val( ui.values[ 1 ] );
                min_text.text( ui.values[ 0 ] );
                max_text.text( ui.values[ 1 ] );
            },
            change: function( event, ui ) {
                hidden_min_input.val( ui.values[ 0 ] );
                hidden_max_input.val( ui.values[ 1 ] );
                min_text.text( ui.values[ 0 ] );
                max_text.text( ui.values[ 1 ] );
            }
        });
        hidden_min_input.val( obj.slider( "values", 0 ) );
        hidden_max_input.val( obj.slider( "values", 1 ) );
        min_text.text( obj.slider( "values", 0 ) );
        max_text.text( obj.slider( "values", 1 ) );

        visible_min_input.change(function() {
            if(($(this).val()*1)<min_val || $(this).val()=='') $(this).val(min_val);
            if(($(this).val()*1)>visible_max_input.val()*1) $(this).val(visible_max_input.val()*1);
            obj.slider( "values", 0, $(this).val() );
        });
        visible_max_input.change(function() {
            if(($(this).val()*1)>max_val || $(this).val()=='') $(this).val(max_val);
            if(($(this).val()*1)<visible_min_input.val()*1) $(this).val(visible_min_input.val()*1);
            obj.slider( "values", 1, $(this).val() );
        });
        $("#"+name+"-min-l").focusout(function(){
            if(($("#"+name+"-min-l").val()*1)<min_val || $("#"+name+"-min-l").val()=='') $("#"+name+"-min-l").val(min_val);
            if(($("#"+name+"-min-l").val()*1)>$("#"+name+"-max-r").val()*1) $("#"+name+"-min-l").val($("#"+name+"-max-r").val()*1);
        });
        $("."+name+"-max").focusout(function(){
            if(($("."+name+"-max").val()*1)>max_val || $("."+name+"-max").val()=='') $("."+name+"-max").val(max_val);
        });
    }
    
    // var $example = $('#slider'),
    // $frame = $('.frame', $example);

    // $frame.mightySlider({
    //     navigation: {
    //         keyboardNavBy: 'slides'
    //     },
    //     commands: {
    //         pages: 1
    //     },
    //     speed: 500,
    //     easing: 'swing',
    //     preloadMode:  'all',
    //     pages: {
    //         activateOn: 'click'
    //     },
    //     cycling: {
    //         cycleBy:       'slides', // Enable automatic cycling by 'slides' or 'pages'.
    //         pauseTime:     5000, // Delay between cycles in milliseconds.
    //         loop:          1,    // Repeat cycling when last slide/page is activated.
    //         pauseOnHover:  1    // Pause cycling when mouse hovers over the FRAME.
    //     }
    // });  

	// var myPlace = new google.maps.LatLng(55.754407, 37.625151);
 //    var myOptions = {
 //        zoom: 16,
 //        center: myPlace,
 //        mapTypeId: google.maps.MapTypeId.ROADMAP,
 //        disableDefaultUI: true,
 //        scrollwheel: false,
 //        zoomControl: true
 //    }
 //    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 

 //    var marker = new google.maps.Marker({
	//     position: myPlace,
	//     map: map,
	//     title: "Ярмарка вакансий и стажировок"
	// });

    //  var options = {
    //     $AutoPlay: true,                                
    //     $SlideDuration: 500,                            

    //     $BulletNavigatorOptions: {                      
    //         $Class: $JssorBulletNavigator$,             
    //         $ChanceToShow: 2,                           
    //         $AutoCenter: 1,                            
    //         $Steps: 1,                                  
    //         $Lanes: 1,                                  
    //         $SpacingX: 10,                              
    //         $SpacingY: 10,                              
    //         $Orientation: 1                             
    //     }
    // };

    // var jssor_slider1 = new $JssorSlider$("slider1_container", options);

});