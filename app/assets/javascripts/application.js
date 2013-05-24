//= require jquery
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

    $(document).ready(function(){
    
	$('.tour-menu td').click(function(){
	    var t = $(this);
	    t.addClass('clicked').siblings().removeClass('clicked');	
	    var offset = t.position().left + t.width()/2;
	    var arrow = $('.tour-arrow');
	    arrow.animate({
		'left': offset - arrow.width() / 2 + 'px'
		});
	});
	$('.tour-menu td').eq(0).trigger('click');
    
	//keyboard support (left/right arrow nav)
	$(document).keyup(function(e){			
	    if ( $('.tour-arrow').is(':animated') ) { return; }
	    if(e.keyCode == 37 || e.keyCode == 38) {//left
		$('.tour-menu td.clicked').prevOrLast('td').trigger('click');
	    }	
	    if(e.keyCode == 39 || e.keyCode == 40) {//right
		$('.tour-menu td.clicked').nextOrFirst('td').trigger('click');
	    }	
	});	    
    })


})(jQuery);