//= require jquery
//= require jquery.easing.1.3
//= require jquery-ui-1.8.22.custom.min
//= require jquery.imagesloaded.min
//= require jquery.scrollTo
//= require jquery.easing.1.3
//= require jquery.fitvids
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
	if ( !t.length) { return $(); }
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
	    console.log(elems);
	    elems.each(function(){
		var t = $(this);
		var ratio = t.attr('ratio');
		t.attr('ratio',ratio);
		t.height(t.width()/ratio);	    
	    })	    
	}
	setRatio();
	$(window).resize(function(){	    
	    setRatio();
	});
	//$(this).resize(function(){setRatio()});
	//$(this).parent().resize(function(){setRatio()});
	

	
    }
    
    $.fn.vCenter = function() {
         var t = $(this);
	 var p = t.parent();
	 var marg = (p.height() - t.height()) / 2;
	 console.log('p' + p.height() + 't' + t.height());
	 t.css('margin-top',marg);
	$(window).resize(function(){	    
	 var marg = (p.height() - t.height()) / 2;
	 t.css('margin-top',marg);
	});	 
    }
    
    
    $(document).ready(function(){
 

	
	var tour = function(i) {
	    var url = '/assets/bgs/t' + i + '.jpg';
	    $.fadeBg(url,1000,'easeInOutExpo');
	    //$('body').css('background-image', 'url(/assets/bgs/t' + i + '.jpg)');
		    
	}
	
	$('.strethdown,.ux-slide-right').strethDown(0);
	
	$('.tour-menu td').click(function(){
	    var t = $(this);
	    var index = $('.tour-menu td').index(this) + 1;
	    $('.tour-single-slogan').hide().eq(index).delay(100).show().fadeSlideIn();
	    tour(index);
	    t.addClass('clicked').siblings().removeClass('clicked');	
	    var offset = t.position().left + t.width()/2;
	    var arrow = $('.tour-arrow');
	    arrow.animate({
		'left': offset - arrow.width() / 2 + 'px'
	    },600,'easeOutExpo');
	    
	});
	
	$('.tour-menu td').eq(0).trigger('click').promise().done(function(){
	    $('.tour-arrow').fadeIn();
	});
    
	//keyboard support (left/right arrow nav)
	$(document).keyup(function(e){			
	    if ( $('.tour-arrow:animated,#bgfader:animated,#bgfader2:animated').length ) {
		return;
	    }
	    if(e.keyCode == 37 || e.keyCode == 38) {//left
		$('.tour-menu td.clicked').prevOrLast('td').trigger('click');
	    }	
	    if(e.keyCode == 39 || e.keyCode == 40) {//right
		$('.tour-menu td.clicked').nextOrFirst('td').trigger('click');
	    }	
	});
	
	$('#a-offerings').mouseenter(function(){
	    $('.offerings').stop().animate({top:'52px'},400,'easeInOutExpo').addClass('opened');
	});
	$('.offerings,#a-offerings').mouseleave(function(){
	    $(this).stop().animate({top:'-100%'},400,'easeInOutExpo').removeClass('opened');
	});
	
	$('.embed-vid').fitVids();
 $.keepRatio({
	    'ux-vid' : 16/10});	
	
    });
    
    $('.ux-vid').vCenter();
    
    $(window).load(function(){
	$(window).resize();
    });


})(jQuery);