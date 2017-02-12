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