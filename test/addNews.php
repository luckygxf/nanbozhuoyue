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
	$insertSql = 'insert into news(title, content) values("'.$title.'","'.$content.'");';
	echo $insertSql.'<br/>';
	//插入200条数据
	$count = 10;
	for($i = 0; $i < $count; $i++){
		executeChangeDataSql($insertSql);
	}
	
?>