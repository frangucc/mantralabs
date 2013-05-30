
$(document).ready(function(){
 		BV = new $.BigVideo({useFlashForFirefox:true});
		BV.init();
		BV.show('https://s3.amazonaws.com/mantralabs/videos/v1.mp4', {
		    altSource:'vids/river.ogv'
		});

        var body = $('body');
	
		var tour = function(i) {
		    var url = '/assets/bgs/v' + i + '.jpg';
		    $.fadeBg(url,1000,'easeInOutExpo'); 
		}
	

	
	$('.tour-menu td.tour-nav-title').click(function(){
	    if ( window.blockTourSlide ) {
		return;
	    }
            window.blockTourSlide = true;	
	    clearTimeout(window.slideTO);
	    var t = $(this);
	    var index = $('.tour-menu td.tour-nav-title').index(this) + 1;
	    $('.tour-single-slogan').hide().eq(index).stop().delay(300).show().fadeSlideIn();
	    tour(index);
	    t.addClass('clicked').siblings().removeClass('clicked');	
	    var offset = t.position().left + t.width()/2;
	    var arrow = $('.tour-arrow');
	    arrow.stop().animate({
		'left': offset - arrow.width() / 2 + 'px'
	    },600,'easeOutExpo');
	    
	    
	    
	    var fill = $('.filldiv');
	    var bgUrl = '/assets/bgs/v' + index + '.jpg';
	    //body.css('background-image','url(' + bgUrl + ')');
	    fill.css('opacity',0).css('background-image','url(' + bgUrl + ')').stop().fadeSlideIn(null,null,function(){
		body.css('background-image','url(' + bgUrl + ')');
		
		BV.show('https://s3.amazonaws.com/mantralabs/videos/v' + index + '.mp4', {
		    altSource:'vids/river.ogv'
		});
		setTimeout(function(){window.blockTourSlide = false;},100);
		window.slideTO = setTimeout(function(){
		    fill.stop().delay(500).animate({'opacity':0},300,null,function(){
		},500);
		
		        
		});
		
	    });	    
	    
	    
	});
	
	$('.tour-menu td.tour-nav-title').eq(0).trigger('click').promise().done(function(){
	    $('.tour-arrow').fadeIn();
	});
        
	$('.tour-next').click(function(){
	    $('.tour-menu td.clicked').nextOrFirst('td.tour-nav-title').trigger('click');
	})
	$('.tour-prev').click(function(){
	    $('.tour-menu td.clicked').prevOrLast('td.tour-nav-title').trigger('click');
	})	
	//keyboard support (left/right arrow nav)
	$(document).keyup(function(e){			

	    if(e.keyCode == 37 || e.keyCode == 38) {//left
		$('.tour-menu td.clicked').prevOrLast('td.tour-nav-title').trigger('click');
	    }	
	    if(e.keyCode == 39 || e.keyCode == 40) {//right
		$('.tour-menu td.clicked').nextOrFirst('td.tour-nav-title').trigger('click');
	    }	
	});
    });