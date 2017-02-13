//根据浏览器滚动条自动缩小和放大div大小
/*
	设置div transition all 1s属性
	设置window.onscroll监听函数
	menu height 60px
	topPic height 250px;
	scrollTop
*/
jQuery(document).ready(function(){
	window.onscroll=function(){
		var picInitHeight = 250;
		var menuHeight = 60;
		var scrollTop = document.body.scrollTop;
		if(scrollTop >= menuHeight && screenTop <= (menuHeight + picInitHeight)){
			var topPicElement = document.getElementById('resourceManageTopPic');
			
			//topPicElement.style.height = (picInitHeight - (screenTop - menuHeight)) + 'px';
			var newHeight = picInitHeight - (scrollTop - menuHeight);
			console.log('newHeight = ' + newHeight);
			document.getElementById('resourceManageTopPic').style.height = newHeight + 'px';
		}//if
		//console.log('scrollTop = ' + scrollTop);
	}//function
})