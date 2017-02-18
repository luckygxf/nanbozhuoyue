<?php
	//-------------------------provide some db method---------------------
	$dbUrl = "127.0.0.1";
	$dbPort = "3306";
	$dbUser = "root";
	$dbPassword = "";
	$dbName = "nbzy";

	$link = mysqli_connect($dbUrl, $dbUser, $dbPassword, $dbName);

	if(!$link){
		echo "connect mysql failed.<br/>";
	} 
	//执行查询sql语句
	function executeQuerySql($sql){
		global $link;
		//mysql_query("set character set 'utf8'");	
		$link->query("set character set 'utf8'");	
		$result = $link->query($sql);
		/*
		while($row = mysql_fetch_array($result)){
			echo $row['id']." ".$row['name'];
			echo "<br/>";
		}
		*/
		return $result;
	}
	//执行增、删、改sql语句
	function executeChangeDataSql($sql){
		global $link;
		//mysql_query("set names 'utf8'");
		$link->query("set_names 'utf8'");
		$link->query($sql);
	}	
	
	//显示数据库查询结果,用于测试查询
	function listAllQueryResult($queryResult){
		while($row = mysql_fetch_array($queryResult)){
			echo $row[0]." ".$row[1];
			echo "<br/>";
		}
	}
	
	$sqlQuery = 'select * from test';
	
	$sql = 'insert into news(title, content) values("aaa","dddd");';
	//executeChangeDataSql(sql);
	
?>
