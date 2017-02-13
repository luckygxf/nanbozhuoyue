<?php 
	session_start(); 
	$_SESSION['views']+=1;
?>
<html>
	<head>
		<title>统计pv</title>
	</head>
	<body>
		<h1>统计pv</h1>
		pv = 
		<?php 
			echo $_SESSION['views'];
		?>
		<?php 
			session_destroy();
		?>
	</body>
</html>