<?php
	//-------------------------provide some db method---------------------
	$dbUrl = "localhost:3306";
	$dbPort = "3306";
	$dbUser = "root";
	$dbPassword = "";
	$dbName = "nbzy";
	$condb = mysql_connect($dbUrl, $dbUser, $dbPassword);
	if(!$condb){
		echo "connect mysql failed.<br/>";
		//die('Could not connect: ' . mysql_error());
	} 
	//执行查询sql语句
	function executeQuerySql($sql){
		//echo 'start execute executeQuerySql<br>';
		//echo 'sql = '.$sql.'<br/>';
		global $dbName, $condb;
		mysql_select_db($dbName, $condb);
		$result = mysql_query($sql);
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
		//echo 'start execute executeChangeDataSql<br>';
		global $dbName, $condb;
		//echo 'start execute executeChangeDataSql<br>';
		mysql_select_db($dbName, $condb);
		//echo 'start execute executeChangeDataSql<br>';
		mysql_query($sql);
		//echo 'start execute executeChangeDataSql<br>';
	}	
	
	//显示数据库查询结果,用于测试查询
	function listAllQueryResult($queryResult){
		//echo 'start execute listAllQueryResult';
		while($row = mysql_fetch_array($queryResult)){
			echo $row[0]." ".$row[1];
			echo "<br/>";
		}
	}
	
	$sqlQuery = 'select * from test';
	
	$sql = 'insert into news(title, content) values("aaa","dddd");';
	//executeChangeDataSql(sql);
	
?>