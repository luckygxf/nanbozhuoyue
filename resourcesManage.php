<html>
	<head>
		<title>资源管理与旅游定制</title>
		<link rel="shortcut icon" href="pictures/favicon.ico">
		<link rel="stylesheet" href="css/resourcesManage.css" type="text/css" />
		<link rel="stylesheet" href="css/resourceManageTopPic.css" type="text/css" />
		<link rel="stylesheet" href="css/main.css" type="text/css" />
		<link rel="stylesheet" href="css/secondMenu.css" type="text/css" />
		<script src="js/jquery-1.7.1.min.js" type="text/javascript"></script>
		<script src="js/secondMenu.js" type="text/javascript"></script>
		<script type="text/javascript">
			//second menu add ajax
			jQuery(document).ready(function(){
				sendRequestByAjax(null);
				jQuery('#menu li a').click(function(){
						//alert(this.getAttribute('nav_url'));
						//ajax
						sendRequestByAjax(this.getAttribute('nav_url'));
					}
				);
				}
			);
			
			function sendRequestByAjax(nav_url){
				if(null == nav_url){
					nav_url = 'consumTravelService';
				}
				var newSrc = 'travelResourceManage/' + nav_url + '.php';
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
		</script>
	</head>
<body>
	
	<?php include 'menu.php';?>
	<div class="resourceManageTopPic">	
		<!--
			<div class="text">
			visions
		</div>
		-->
	</div>
	<!--sencod menu -->
	<div id="menu">
	  <ul>
		<li><a href="javascript:void(0);" nav_url='consumTravelService'>旅游制定服务</a></li>
		<li><a href="javascript:void(0);" nav_url='manageTravelDestination'>旅游目的管理</a></li>
		<li><a href="javascript:void(0);" nav_url='travelAppDevelop'>旅游APP研发</a></li>
		<li><a href="javascript:void(0);" nav_url='filmMake'>影视APD海外公关</a></li>
	  </ul>
	  <!--
		<div class="cls"></div>
	  -->
	</div>
	<div id="menuContent">
		
	</div>
	
	<?php include 'foot.php'?>

</body>

</html>