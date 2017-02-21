<?php 
$action = (isset($_REQUEST['action'])&& $_REQUEST['action'] !=NULL)?$_REQUEST['action']:'';
if($action == 'ajax'){
	/* Connect To Database*/
	$dbname = 'nbzy';
	$link = mysql_connect("localhost","root","") or die("Couldn't make connection.");
	$db = mysql_select_db($dbname, $link) or die("Couldn't select database");
	
	include 'pagination.php'; //include pagination file
	
	//pagination variables
	$page = (isset($_REQUEST['page']) && !empty($_REQUEST['page']))?$_REQUEST['page']:1;
	$per_page = 4; //how much records you want to show
	$adjacents  = 4; //gap between pages after number of adjacents
	$offset = ($page - 1) * $per_page;
	
	//Count the total number of row in your table*/
	$count_query   = mysql_query("SELECT COUNT(id) AS numrows FROM messages");
	$row     = mysql_fetch_array($count_query);
	$numrows = $row['numrows'];
	$total_pages = ceil($numrows/$per_page);
	$reload = 'index.php';
	
	//main query to fetch the data
	$query = mysql_query("SELECT * FROM messages ORDER BY RAND() LIMIT $offset,$per_page");

	//loop through fetched data
while($result = mysql_fetch_array($query)){
	echo '<div class="content">'.$result['message'].'</div>';
}
echo paginate($reload, $page, $total_pages, $adjacents);
} else{
?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>PHP 一个简单但效果非常棒AJAX分页实例 - UncleToo - 专注PHP技术推广</title>
<script type="text/javascript" src="jquery-1.5.2.min.js"></script>
<link media="screen" href="style.css" type="text/css" rel="stylesheet">
<script type="text/javascript">
	$(document).ready(function(){
		load(1);
	});

	function load(page){
		$("#loader").fadeIn('slow');
		$.ajax({
			url:'index.php?action=ajax&page='+page,
			success:function(data){
				$(".outer_div").html(data).fadeIn('slow');
				$("#loader").fadeOut('slow');
			}
		})
	}
</script>
</head>
<body>
	
<div class="outer_div"></div>
</body>
</html>
<?php }?>