//显示二级菜单内容
//second menu add ajax
jQuery(document).ready(function(){
	sendRequestByAjax(null);
	jQuery('#menu li a').click(function(){
			//alert(this.getAttribute('nav_url'));
			//ajax
			sendRequestByAjax(this.getAttribute('nav_id'), this.getAttribute('nav_url'));
		}
	);
	}
);

function sendRequestByAjax(nav_id,nav_url){
	if(null == nav_url){
		nav_id = jQuery('#menu li a').first().attr('nav_id');
		nav_url = jQuery('#menu li a').first().attr('nav_url');
		//nav_id = 'travelResourceManage';
		//nav_url = 'consumTravelService';
	}
	var newSrc = nav_id + '/' + nav_url + '.php';
	//alert("newSrc = " + newSrc);
	if (window.XMLHttpRequest)
	{
		// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行的代码
		xmlhttp=new XMLHttpRequest();
	}
	else
	{	
		//IE6, IE5 浏览器执行的代码
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			
			//document.getElementById("menuContentOfIframe").src=newSrc;
			
			document.getElementById('menuContent').innerHTML=xmlhttp.responseText;
			
		}
	}
	xmlhttp.open("GET",newSrc,true);
	xmlhttp.send();
	
}