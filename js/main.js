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
        autoplay: true,
        arrows: false,
        swipe: false,
        fade: true,
        cssEase: 'linear'
    });
    $('.main-contentSlider').slick({
        autoplay: true,
        fade: true,
        cssEase: 'linear',
        asNavFor: '.main-backSlider',
        prevArrow: '<span class="left-arrow arrow"></span>',
        nextArrow: '<span class="right-arrow arrow"></span>'
    });
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