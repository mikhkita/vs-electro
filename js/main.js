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

    $('#count').bind("change keyup input click", function() {
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

    slider_init("price",0,15000);
    
    function slider_init(name,min,max) {
        $( "#"+name+"-slider" ).slider({
            range: true,
            min: min,
            max: max,
            values: [ min, max ],
            slide: function( event, ui ) {
                $( "."+name+"-min" ).val( ui.values[ 0 ] );
                $( "."+name+"-max" ).val( ui.values[ 1 ] );
                $( "#"+name+"-l" ).text( ui.values[ 0 ] );
                $( "#"+name+"-r" ).text( ui.values[ 1 ] );
            },
            change: function( event, ui ) {
               
            }
        });
        $( "."+name+"-min" ).val( $( "#"+name+"-slider" ).slider( "values", 0 ) );
        $( "."+name+"-max" ).val( $( "#"+name+"-slider" ).slider( "values", 1 ) );
        $( "#"+name+"-l" ).text( $( "#"+name+"-slider" ).slider( "values", 0 ) );
        $( "#"+name+"-r" ).text( $( "#"+name+"-slider" ).slider( "values", 1 ) );
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