$(document).ready(function(){
	var count = $(".main-contentSlider>div").length,
		nowItem = 0,
		items = new Array(),
		inter,
		blocked = false,
		mouseon = false;

	$(".main-contentSlider>div").each(function(){
		items.push($(this));
		$(this).hide();
	});
	items[0].show();

	$(".b-main-contentSlider-nav .left-arrow").click(function(){
		goTo( ( nowItem > 0 )?(nowItem-1):(count-1), -1 );
		setTimeout(function(){
			$(".left-arrow-back").click();
		},300);
		// clearInterval(inter);
		return false;
	});
	$(".b-main-contentSlider-nav .right-arrow").click(function(){
		goTo( ( nowItem < count-1 )?(nowItem+1):0, 1 );
		setTimeout(function(){
			$(".right-arrow-back").click();
		},300);
		// clearInterval(inter);
		return false;
	});

	function goTo(next,side){
		if( blocked ) return false;
		blocked = true;
		TweenLite.to(items[nowItem], 0.3, { "left" : -1*side*50, ease : Quad.easeInOut } );
		items[nowItem].fadeOut(300);
		setTimeout(function(){
			items[next].css("left",1*side*50);
			TweenLite.to(items[next], 0.3, { "left" : 0, ease : Quad.easeInOut } );
			items[next].fadeIn(300);
			nowItem = next;
			setTimeout(function(){
				blocked = false;
			},500);
		},300);
	}

	$(".b-main-slider-cont").hover(function(){
		mouseon = true;
	},function(){
		mouseon = false;
	});

	$("body").on("click",".slick-dots button",function(){
		var cur = $(this).text()*1-1;
		if( cur != nowItem ) goTo(cur, (nowItem > cur)?-1:1 );
	});

	var swipeh = new MobiSwipe("b-main-slider-cont");
        swipeh.direction = swipeh.HORIZONTAL;
    	swipeh.onswiperight = function() { $(".b-main-contentSlider-nav .left-arrow").click(); };
    	swipeh.onswipeleft = function() { $(".b-main-contentSlider-nav .right-arrow").click(); };

	inter = setInterval(function(){
		if( mouseon ) return false;
		$(".b-main-contentSlider-nav .right-arrow").click();
	},5000);

});