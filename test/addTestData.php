<?php
	include 'dbHelper.php'
?>
<?php
	$title = $_POST['title'];
	$content = $_POST['content'];
	echo $title."<br/>";
	echo $content."<br/>";
	
	$title = 1;
	$content = 'guanxiangfei';
	
	echo $title."<br/>";
	echo $content."<br/>";
	
	//insert data to mysql
	//executeChangeDataSql()
	
	//echo $insertSql.'<br/>';
	//插入200条数据
	$count = 100;
	for($i = 1; $i < $count; $i++){
		
		$title = $title;
		$content = 'guanxiangfei'.$i;
		$insertSql = 'insert into test(id, name) values("'.$title.'","'.$content.'");';
		echo $insertSql.'<br/>';
		$title+=1;
		executeChangeDataSql($insertSql);
	}
	
?>