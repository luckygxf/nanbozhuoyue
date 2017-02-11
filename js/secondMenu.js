$(document).ready(function() {	

	jQuery.jqsxfg51nav = function(jqsxfg51navhover) {
		$(jqsxfg51navhover).prepend("<span></span>"); //懒人建站 http://www.51xuediannao.com/
		
		$(jqsxfg51navhover).each(function() { 
			var linkText = $(this).find("a").html(); 
			$(this).find("span").show().html(linkText); 
		}); 
		
		$(jqsxfg51navhover).hover(function() {	
			$(this).find("span").stop().animate({ 
				marginTop: "-40" 
			}, 250);
		} , function() { 
			$(this).find("span").stop().animate({
				marginTop: "0" 
			}, 250);
		});	
	};
	//下面是调用方法，一个页面也可以调用很多次
	$.jqsxfg51nav("#menu li");
});