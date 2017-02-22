<?php
	include 'page_foot.php'; //include pagination file
	include '../dbHelper.php';
?>
<?php 
	$action = (isset($_REQUEST['action'])&& $_REQUEST['action'] !=NULL)?$_REQUEST['action']:'';
	if($action == 'ajax'){
	/* Connect To Database*/
	

	
	//pagination variables
	$page = (isset($_REQUEST['page']) && !empty($_REQUEST['page']))?$_REQUEST['page']:1;
	$per_page = 4; //how much records you want to show
	$adjacents  = 4; //gap between pages after number of adjacents
	$offset = ($page - 1) * $per_page;
	
	//query data from mysql
	$querySqlCount = "SELECT COUNT(*) AS numrows FROM devapp";
	$count_query = executeQuerySql($querySqlCount);
	$numrowsResult = $count_query->fetch_array(MYSQLI_BOTH);
	$numrows = $numrowsResult[0];

	$total_pages = ceil($numrows/$per_page);
	
	$reload = 'page_util.php';
	
	$queryContentSql = "SELECT * FROM devapp ORDER BY title  LIMIT $offset,$per_page";
	//main query to fetch the data
	$queryContentResult = executeQuerySql($queryContentSql);
	
	/*
	<section class="innerBlock">
			<h3 class="dzbt"><?php echo $row['title']; ?></h3>
			<span class="dzmo"><a href="#" class="showa" name="a_showmore">更多详细内容</a></span>
			<div class="clear"></div>
			<div name="box" class="list_content">
				<p><?php echo $row['content']; ?></p>
			</div>
	 <?php
		}
	 ?>
	*/
	

	//loop through fetched data
	while($row = $queryContentResult->fetch_array(MYSQLI_BOTH)){
		$itemCountent = '<section class="innerBlock"><h3 class="dzbt">'.$row['title'].'</h3>'.'<span class="dzmo"><a href="#"class="showa" name="a_showmore">更多详细内容</a></span>'.'<div class="clear"></div>'.'<div name="box" class="list_content">'.'<p>'.$row['content'].'</p>'.'</div></section>';

		echo $itemCountent;
							
		//echo '<div class="content">'.$row['title'].'</div>';
	}
	echo paginate($reload, $page, $total_pages, $adjacents);
	} else{
	?>

	<?php }?>