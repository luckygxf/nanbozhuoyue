<?php
	include 'dbHelper.php';
?>

<?php
	/*
		后台用户登录
	*/
	function login($userName, $password){
		$querySql = 'select count(*) from users where username="'.$userName.'"and password="'.$password.'";';
		echo "querySql = ".$querySql."<br/>";
		$queryResult = executeQuerySql($querySql);
		$row = mysql_fetch_array($queryResult, MYSQL_NUM);
		echo 'row[0] = '.$row[0].'<br/>';
		if($row[0] == 1)
			return true;
		return false;
	}
	
	$username='guanxiangfei';
	$password='luckygxf';
	$validResult = login($username, $password);
	if($validResult)
		echo 'valid user.'.'<br/>';
	else
		echo 'not valid user.'.'<br/>';
?>