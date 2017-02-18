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
	<?php include 'utils/dbhelper.php';?>
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
				  <li><span><a href="javascript:void(0)" tid="index">大型活动策划与执行</a></span></li>
				  <li><span><a href="javascript:void(0)" tid="workers">国际商务对接</a></span></li>
				  <li><span><a href="javascript:void(0)" tid="voice">NGO支持</a></span></li>
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
			<!-- 大型活动策划与执行 -->
			<div class="subInner index">	  
				<section class="innerBlock">
					<p>从公关创意到媒介传播，从策划管理到活动执行，我们为客户提供高度专业和不断创新的系统服务，为客户完成在国外从商务活动策划、渠道公关、媒介传播、公关活动、会议会展等一系列旨在提升企业品牌知名度、美誉度一整套市场行为。
					</p>
				</section>
				<!--大型活动策划与执行 -->
				<?php 
					$querySql = "select * from bigactivity";
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
				<!-- end 大型活动策划与执行-->	
			</div>	
			<!-- 国际商务对接 -->
			<div class="subInner workers">	
				<section class="innerBlock">
					<p>公司多年来一直扎根于非洲大陆。从母公司到投资人，数十年来累积的人脉与资源从方方面面渗透于非洲大陆的多个国家与地区。自公司成立以来，帮助多个中国市级政府、企业等机构与非洲当地政府、企业等进行了高品质、精准的商务对接。
					</p>
				</section>
				<!--国际商务对接 -->
				<?php 
					$querySql = "select * from internationalbusiness";
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
				<!-- end 国际商务对接-->					
			</div>		
			<!-- NGO支持 -->
			<div class="subInner voice">
				<header class="mainBlockHeader">
					<p>扎根于非洲，回报于非洲。非洲大陆的很多地方仍旧是世界上最贫穷与落后的地区。公司秉承着母公司一贯的文化沿革，在自己的能力范围内一直尽力的回馈非洲，并为世界NGO组织在当地的慈善活动提供相应的支持，尽自己的一份力量。
					</p>		
				</header>
				<!--NGO支持 -->
				<?php 
					$querySql = "select * from ngosupport";
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
				<!-- end NGO支持-->				
			</div>	
		</div>
		<article class="boxArticleEntry"></article>  
	</div>
	</div>
	<div class="mainVisualCopyInner">
		<span class="mainText">国际商务</span>
		<span class="subText"></span>
	</div>
	<div class="scrollVisualWrapper">
		<div class="mainVisual mainvMerit"></div>
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
