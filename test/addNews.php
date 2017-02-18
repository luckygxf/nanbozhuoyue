<?php
	include 'dbHelper.php'
?>
<?php
	$title = $_POST['title'];
	$content = $_POST['content'];
	echo $title."<br/>";
	echo $content."<br/>";
	
	//insert data to mysql
	//executeChangeDataSql()
	
	//echo $insertSql.'<br/>';
	//插入200条数据
	$count = 10;
	for($i = 1; $i < $count; $i++){
		$title = $_POST['title'];
		$content = $_POST['content'];
		$title = $title.$i;
		$content = $content.$i;
		$insertSql = 'insert into mediaspread(title, content) values("'.$title.'","'.$content.'");';
		executeChangeDataSql($insertSql);
	}
	
?>