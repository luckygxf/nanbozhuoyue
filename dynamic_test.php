<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="shortcut icon" href="pictures/favicon.ico">
<title>南博卓越</title>
<SCRIPT language=JavaScript>
<!-- Begin
if (screen.width <= 1440)
{
	document.write('<link href="images/qcss1440.css" rel="stylesheet" type="text/css" />');
} 
else
{
	document.write('<link href="images/qcss.css" rel="stylesheet" type="text/css" />');
} 

</SCRIPT>

<!--导航-->


<link href="css/setting.css" rel="stylesheet" type="text/css" />
<link href="css/common.css" rel="stylesheet" type="text/css" />
<link href="css/dynamic.css" rel="stylesheet" type="text/css" />
<link href="css/style.css" rel="stylesheet" />

<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/jquery.easingscroll.js"></script>
<script type="text/javascript" src="js/history.js"></script>
<script type="text/javascript" src="js/css_browser_selector.js"></script>
<script type="text/javascript" src="js/config.js"></script>
<script type="text/javascript" src="js/baigie.job.core.js"></script>
<script type="text/javascript" src="js/baigie.job.motion.js"></script>
<script type="text/javascript" src="js/baigie.job.sub.js"></script>
<script type="text/javascript" src="js/baigie.job.social.js"></script>

<script type="text/javascript">
$(document).ready(function(){
	console.log("in script");
});
</script>

<style>
	p{
		text-indent:2em;
	}
</style>

</head>

<body>
<!--include php files-->
<div style = "display:none;">
	<?php include 'utils/dbHelper.php';?>
</div>
<div class="rootContainer">
	<div class="wrapper">
		<header id="pageHeader">
			<div class="gnav">
				<div class="gnavInner">
					<div class="hLogo"><img src="images/logo1.jpg"  height="33" /></div>          
					<div>
						<?php include 'menu.php';?>
					</div>
				</div>
			</div>
			<div class="mainVisualCopy scrollChaser"> 
				<!--<div class="mainVisual mainvMessage">
				<div class="mainVisualInner"><span>MESSAGE</span><br />
				応募者へのメッセージ</div>--> 
			</div>
		</header>
	<nav class="lnav">
		<div class="lnavInner">
			<div class="pagePrev"><a href="#">前</a></div>
				<ul>
				  <li><span><a href="javascript:void(0)" tid="index">资讯动态</a></span></li>
				  <li><span><a href="javascript:void(0)" tid="workers">项目合作</a></span></li>
				</ul>
			<div class="pageNext"><a href="#">次</a></div>
			<div class="currentLine"></div>
		</div>
	</nav>
	<div class="lnavBg"></div>
	<div class="wrapper2">
		<main class="mainContents">
		<section class="mainBlock"> </section>
		</main>
  
  <!-- Start all inner contents. modify k.kubonaka -->		
        <div class="cloneContainer">
			<!-- 资讯动态 -->
			<div class="subInner index">
				<!--资讯动态 -->
				<?php 
					$querySql = "select * from news";
					$queryResult = executeQuerySql($querySql);			
					while($row = $queryResult->fetch_array(MYSQLI_BOTH)){
				?>
					<section class="innerBlock">
						<h3 class="dzbt"><?php echo $row['title']; ?></h3>
						<span class="dzmo"><a href="#" class="showa" name="a_showmore">更多详细内容</a></span>
						<div class="clear"></div>
						<div name="box">
							<p><?php echo $row['content']; ?></p>
						</div>
				 <?php
					}
				 ?>
				<!-- end 资讯动态-->	
			</div>        
			<!-- 项目合作 -->
			<div class="subInner workers">       
				<!--项目合作 -->
				<?php 
					$querySql = "select * from cooperateproject";
					$queryResult = executeQuerySql($querySql);			
					while($row = $queryResult->fetch_array(MYSQLI_BOTH)){
				?>
					<section class="innerBlock">
						<h3 class="dzbt"><?php echo $row['title']; ?></h3>
						<span class="dzmo"><a href="#" class="showa" name="a_showmore">更多详细内容</a></span>
						<div class="clear"></div>
						<div name="box">
							<p><?php echo $row['content']; ?></p>
						</div>
				 <?php
					}
				 ?>
				<!-- end 项目合作-->	
			</div>
		</div>
		<article class="boxArticleEntry"></article>  
	</div>
	</div>
	<div class="mainVisualCopyInner">
		<span class="mainText">动态资讯</span>
		<span class="subText"></span>
	</div>
	<div class="scrollVisualWrapper">
		<div class="mainVisual mainvVision"></div>
	</div>
</div>
<div id="goToPageTop">
	<a href="#pageHeader">返回顶部</a>
</div>

<?php include 'foot1.php'?>
<!--
<div class="foot">
	<div class="foot1">
		<div class="lxfs">
			<h3 style="color:#FFFFFF">010-57208195</h3>
			<p>
				<span style="line-height:30px;color:#FFFFFF">邮箱：nbzy@gmmg.com<br />QQ：123456789</span>
			</p>
		</div>
		<div class="djz">
			<p>
				<a href="#">项目合作</a> | 
				<a href="#">人才招聘</a> | 
				<a href="#">联系我们</a>
			</p>
			<div  class="huoban">
				<em>合作伙伴</em>
				<ul>
					<li><a href="#"><img src="images/d1.png"  height="30" /></a></li>
					<li><a href="#"><img src="images/d2.png"  height="30" /></a></li>
					<li><a href="#"><img src="images/d3.png"  height="30" /></a></li>
					<li><a href="#"><img src="images/d4.png"  height="30" /></a></li>
					<li><a href="#"><img src="images/d5.png"  height="30" /></a></li>
				</ul>
			</div>
		</div>
		<div class="erweima">
			<p>关注我们</p>
			<img src="images/erweima.jpg" width="110"/>
		</div>
		<div class="clear"></div>
	</div>
	<div class="foot2">
		京ICP备11017824号-4 / 京ICP证130164号  Copyright © 2006-2016 ZCOOL
	</div>
</div>
-->
</body>
</html>
