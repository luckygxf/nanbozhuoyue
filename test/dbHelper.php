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
		global $dbName, $condb;
		mysql_select_db($dbName, $condb);
		mysql_query($sql);
	}	
	
?>