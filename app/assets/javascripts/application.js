//= require modernizr
//= require jquery
//= require jquery.easing.1.3
//= require jquery-ui-1.8.22.custom.min
//= require jquery.imagesloaded.min
//= require jquery.scrollTo
//= require jquery.easing.1.3
//= require video
//= require jquery.fitvids
//= require jquery.mCustomScrollbar.min
//= require jquery.reveal
//= require jquery.hoverIntent.minified
//= require bigvideo



(function($) {

    $.fn.prevOrLast = function(selector)
    {
	var prev = this.prev(selector);
	return (prev.length) ? prev : this.nextAll(selector).last();
    };

    $.fn.nextOrFirst = function(selector)
    {
	var next = this.next(selector);
	return (next.length) ? next : this.prevAll(selector).last();
    };
    $.fadeBg = function(url,time,easing) {
	var fader = $('#bgfader');
	var fader2 = $('#bgfader2');
	 
	if (!fader.is(':visible')) {
	    fader.css('background-image','url(' + url + ')');
	    fader.delay(800).fadeIn(time,easing);
	} else {
	    fader2.css('background-image','url(' + url + ')');
	    fader.delay(800).fadeOut(time,easing);
	}
    }
    $.fn.fadeSlideIn = function(time,easing,cb){
	$(this).each(function(){
	    var left = parseInt($(this).css('left'));
	    left = isNaN(left) ? 0 : left;
	    $(this).css({
		'opacity':0,
		left: left+80+'px'
	    }).animate({
		'left':left+'px',
		'opacity':1
	    },time,easing,cb);	    
	})
    }
    $.fn.cascade = function(time,easing) {
	var t = $(this);
	var child = $('> *', this);
	child.each(function(i){
	    $(this).css('position','relative').delay(i*40+100).fadeSlideIn(time,easing);
	})
    }
    
    $.fn.strethDown = function(marginDown)
    {	
	var t = $(this);
	if ( !t.length) {
	    return $();
	}
	var streth = function() {			
	    var height=$(window).height() - t.offset().top - marginDown;		
	    t.height(height);			
	}
	
	streth();
	$(window).resize(function(){
	    streth();
	})
	return t;

    } 
    
    $.classObjToJQuery = function(classes,dataLabel) {
	var elems = $();
	
	for(var one in classes) {
	    if(classes.hasOwnProperty(one)) {		
		elems = elems.add('.' + one);
		$('.' + one).attr(dataLabel,classes[one])
	    } 
	}
	return elems;	
    }
    
    $.keepRatio = function(classes) {
	
	var setRatio = function(){
	    var elems = $.classObjToJQuery(classes,'ratio');
	    
	    elems.each(function(){
		var t = $(this);
		var ratio = t.attr('ratio');
		t.attr('ratio',ratio);
		t.css('width','');		
		t.height(t.width()/ratio);
		t.width(t.height()*ratio);		
	    })	    
	}
	setRatio();
	$(window).resize(function(){	    
	    setRatio();
	});
    //$(this).resize(function(){setRatio()});
    //$(this).parent().resize(function(){setRatio()});
	

	
    }
    
    $.fn.vCenter = function(minus) {
	var minus = minus || 0;
	var t = $(this);
	var p = t.parent();
	var marg = ((p.height() - t.height()) / 2);	 
	t.css('margin-top',marg);
	$(window).resize(function(){	    
	    setTimeout(function(){
		var marg = (p.height() - t.height()) / 2;	 
		t.css('margin-top',marg);		
	    },200);
	});
	return $(this);
    }
    
    $.fn.sliding = function(nav,slides,time) {
	time = time || 5000;
	return $(this).each(function(){
	    var t = $(this);
	    var n = $('.' + nav,t);
	    var s = $('.' + slides,t);
	
	    n.eq(0).addClass('active');
	    s.eq(0).addClass('active');
	    
	    s.css('opacity',0).filter(function(){
		return $(this).hasClass('active')
		}).css('opacity',1);
	
	    var interval = setInterval(function(){
		n.filter(function(){
		    return $(this).hasClass('active')
		    }).nextOrFirst('.' + nav,t).trigger('click');
	    },time);
	
	    n.click(function(){
		n.removeClass('active');
		$(this).addClass('active');		
		var index = $('.' + nav,t).index(this);
		
		s.filter(function(){return $(this).hasClass('active')}).stop().animate({opacity:0},800,'easeInOutExpo');	
		
		s.removeClass('active');
		
		s.eq(index).addClass('active').stop().animate({
		    opacity:1
		},800,'easeInOutExpo');

		clearInterval(interval);
		interval = setInterval(function(){
		    n.filter(function(){
			return $(this).hasClass('active')
			}).nextOrFirst('.' + nav,t).trigger('click');
		},time);		
	    });
	    
	    
	//n.trigger('click').eq(0).trigger('click');
	})

    }
    
    
    $(document).ready(function(){
 
	$('.strethdown,.ux-slide-right').strethDown(0);
        $('.cascade-container').cascade();
	$('#a-offerings').hoverIntent(function(){
	    $('.offerings').stop().animate({
		top:'52px'
	    },400,'easeInOutExpo').addClass('opened');
	},function(){
	    $(this).stop().animate({
		top:'-100%'
	    },400,'easeInOutExpo').removeClass('opened');
	});

	$('.offerings').mouseleave(function(){
	    $(this).stop().animate({
		top:'-100%'
	    },400,'easeInOutExpo').removeClass('opened');
	});
	$('body').click(function(){
	    $('.offerings,#a-offerings').trigger('mouseleave');
	})
	$('.offerings,#a-offerings').click(function(e){
	    e.stopPropagation();
	})
	
	$('.embed-vid').fitVids();
	$.keepRatio({
	    'ux-vid' : 16/10
	});	
	
    });
    
    $('.ux-vid').vCenter(52);
    
    $(window).load(function(){
	$(window).resize();
    });


})(jQuery);