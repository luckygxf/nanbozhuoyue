<?php
	include 'dbHelper.php'
?>

<?php
	/*
		查询所有的列表
	*/
	$querySql = 'select * from news;';
	$queryResult = executeQuerySql($querySql);
	//listAllQueryResult($queryResult);
?>
<div id="list">
<?php
	//遍历所有条目并输出
	while($row = mysql_fetch_array($queryResult)){
?>
	<div id="item" name='item'>
		<h1>
			<?php echo $row['title'];?>
		</h1>
		<div id="item_content">
			<?php echo $row['content'] ?>
		</div>
	</div>
<?php	
	}
?>
<div>

<script type="text/javascript">
	var items = document.getElementsByName("item");
	for(var i = 0; i < items.length; i++){
		var box = items[i];
		var text = box.innerHTML;
		var newBox = document.createElement("div");
		var btn = document.createElement("a");
		newBox.innerHTML = text.substring(0,200);
		btn.innerHTML = text.length > 200 ? "...显示全部" : "";
		btn.href = "###";
		btn.onclick = function(){
			if (btn.innerHTML == "...显示全部"){ 
				btn.innerHTML = "收起"; 
				newBox.innerHTML = text; 
			}else{ 
				btn.innerHTML = "...显示全部"; 
				newBox.innerHTML = text.substring(0,200); 
			} 
		}
		box.innerHTML = ""; 
		box.appendChild(newBox); 
		box.appendChild(btn); 
		
	}
	
</script>