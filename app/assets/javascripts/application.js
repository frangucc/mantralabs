//= require jquery
(function($) {



$(document).ready(function(){
    
    $('.tour-menu td').click(function(){
	var t = $(this);	
	var offset = t.position().left + t.width()/2;
	var arrow = $('.tour-arrow');
	arrow.animate({'left': offset - arrow.width() / 2 + 'px'});
    });
    $('.tour-menu td').eq(0).trigger('click');
})


})(jQuery);