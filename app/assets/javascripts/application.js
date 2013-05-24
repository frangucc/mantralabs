//= require jquery
//= require jquery.easing.1.3
//= require jquery-ui-1.8.22.custom.min
//= require jquery.imagesloaded.min
//= require jquery.scrollTo
//= require jquery.easing.1.3
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
    
    $(document).ready(function(){
    
	var tour = function(i) {
	    var url = '/assets/bgs/t' + i + '.jpg';
	    $.fadeBg(url,1000,'easeInOutExpo');
	    //$('body').css('background-image', 'url(/assets/bgs/t' + i + '.jpg)');
		    
	}
	
	
	$('.tour-menu td').click(function(){
	    var t = $(this);
	    var index = $('.tour-menu td').index(this) + 1;
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
    })


})(jQuery);