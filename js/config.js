/*******************
** User Agent
*******************/
var ___ua = {};
var ___agent = navigator.userAgent;
var ___appVersion = navigator.appVersion.toLowerCase();
___ua.isIE = /MSIE/.test(___agent);
___ua.isSafari = ___agent.indexOf('Safari')  > -1 && ___agent.indexOf('Chrome') == -1;
___ua.isIOS = ___agent.indexOf('iPhone') > -1 || ___agent.indexOf('iPad') > -1 || ___agent.indexOf('iPod')  > -1;
___ua.isIPhone = ___agent.indexOf('iPhone') > -1 || ___agent.indexOf('iPod')  > -1;	
___ua.isIPad = ___agent.indexOf('iPad')  > -1;	
___ua.isAndroid = ___agent.indexOf('Android')  > -1;
___ua.isMobile = ___ua.isIOS || ___ua.isAndroid;
___ua.isMac = ___agent.toUpperCase().indexOf("MAC") >= 0;
___ua.isSmartPhone = ___ua.isIPhone || ___ua.isAndroid;
if(___ua.isIE){
	if(___appVersion.indexOf('msie 6.') != -1){
		___ua.ieVersion = 6;
	}else if(___appVersion.indexOf('msie 7.') != -1){
		___ua.ieVersion = 7;
	}else if(___appVersion.indexOf('msie 8.') != -1){
		___ua.ieVersion = 8;
	}else if(___appVersion.indexOf('msie 9.') != -1){
		___ua.ieVersion = 9;
	}else if(___appVersion.indexOf('msie 10.') != -1){
		___ua.ieVersion = 10;
	}
	___ua.ltIE8 = (___ua.ieVersion<=8) ? true:false;
}else{
	___ua.ieVersion = 0;
}

/*******************
** rollover
*******************/
jQuery(document).ready(function($) {
	imgRollover();
});

function imgRollover() {
	var postfix = '_o';
	$('.rollover img').not('[src*="'+ postfix +'."]').each(function() {
		var img = $(this);
		var src = img.attr('src');
		var src_on = src.substr(0, src.lastIndexOf('.'))
				+ postfix
				+ src.substring(src.lastIndexOf('.'));
	$('<img>').attr('src', src_on);
	$(this).parent().hover(
		function() {
			img.attr('src', src_on);
		},
		function() {
		img.attr('src', src);
		}
	);
	});
}

/*******************
** Smooth Scroll
*******************/
if(___ua.isMobile){
	/*document.write('<script type="text/javascript" src="/job/common/js/smoothScroll.js"></script>');*/
}
jQuery(function(){
	/*if(!___ua.isMobile){
		var lnavHeight = $('.lnav').height()+1;//+border
		jQuery("a[href*='#']").easingScroll({
			easing: "easeOutExpo",
			duration: 800,
			marginTop: 75+lnavHeight
		});
	}*/
});

/*******************
** pageTop
*******************/
$(function(){
	$('#goToPageTop').css({right: "-80px"});
	var isVisible = false;
	$(window).scroll(function(){
		if($(this).scrollTop()>200){
			if(!isVisible){
				isVisible = true;
				$('#goToPageTop').stop().animate({right:0},{
					duration: 'fast',
					complete: function(){}
				});
			}
		}else{
			if(isVisible){
				isVisible = false;
				$('#goToPageTop').stop().animate({right:-80},{
					duration: 'fast',
					complete: function(){}
				});
			}
		}
	});
});

/*******************
** Resize
*******************/
$(function(){
	$(window).on('load resize',function(){
		var winHeight = $(window).height();
		var boxHeight = winHeight - 80;
		$('.boxKeyVisual').css('height',boxHeight+'px');
	});
});

/*******************
** Fixed
*******************/
$(function(){
	
	var resize = function() {
		var scrollTop = $(window).scrollTop();
		if(scrollTop<(baseTop-gnavHeight)){
			$('.lnav').css({position:"absolute",top:baseTop+"px",width:"100%"});
			$('.lnav').next().css({height:lnavHeight+"px"});
			//$('.lnav').next().css({marginTop:lnavHeight+"px"});
		}else{
			$('.lnav').css({position:"fixed",top:gnavHeight+"px",width:"100%"});
		}
	};
	
	var gnavHeight = $('.gnav').height()+0;//+padding
	var lnavHeight;//+border
	var baseTop;
	var lnav = $('.lnav');
	
	if (lnav.offset()) {
		
		lnavHeight = $('.lnav').height()+6;//+border
		baseTop = $('.lnav').offset().top;
		
		$('.lnav').css({zIndex:120});
		$(window).on('scroll resize',function(){
			resize();
		});
		
		$(window).bind("load", function() {
			resize();
		});
	}
	
});


