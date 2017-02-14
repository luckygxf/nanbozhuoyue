jQuery(document).ready(function(){
	//alert("location.href = " + location.href);
	var locationHref = location.href + '/';
	jQuery('.navigation-v3 ul li a').each(function(){
		//alert(this.href);
		
		if(locationHref.indexOf($(this).attr('href')) > -1){
			$(this).addClass('nav-up-selected-inpage');
		}
		else{
			$(this).removeClass('nav-up-selected-inpage');
		}
	});
	var qcloud={};
	$('[_t_nav]').hover(function(){
		//alert(1);
		var _nav = $(this).attr('_t_nav');
		clearTimeout( qcloud[ _nav + '_timer' ] );
		qcloud[ _nav + '_timer' ] = setTimeout(function(){
		$('[_t_nav]').each(function(){
		$(this)[ _nav == $(this).attr('_t_nav') ? 'addClass':'removeClass' ]('nav-up-selected');
		});
		$('#'+_nav).stop(true,true).slideDown(200);
		}, 150);
	},function(){
		var _nav = $(this).attr('_t_nav');
		clearTimeout( qcloud[ _nav + '_timer' ] );
		qcloud[ _nav + '_timer' ] = setTimeout(function(){
		$('[_t_nav]').removeClass('nav-up-selected');
		$('#'+_nav).stop(true,true).slideUp(200);
		}, 150);
	});
	
	
});

//回到顶部
jQuery(document).ready(goTop(50));
function goTop(min_height) {
	$(".goTop").click(
		function() {
			$('html,body').animate({
				scrollTop: 0
			}, 700);
		});
	//获取页面的最小高度，无传入值则默认为600像素
	min_height=min_height?min_height:400;
	//为窗口的scroll事件绑定处理函数
	$(window).scroll(function() {
		//获取窗口的滚动条的垂直位置
		var s = $(window).scrollTop();
		//当窗口的滚动条的垂直位置大于页面的最小高度时，让返回顶部元素渐现，否则渐隐
		if (s > min_height) {
			$(".goTop").fadeIn(100);
		} else {
			$(".goTop").fadeOut(100);
		}
	});
}
 
 
$(function() {
	goTop(50);
});