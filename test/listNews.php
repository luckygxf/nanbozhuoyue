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
	$index = 0;
	//遍历所有条目并输出
	while($row = mysql_fetch_array($queryResult)){
?>
	<div id="item<?php echo $index ?>" name='item'>
		<h1>
			<?php echo $row['title'];?>
		</h1>
		<div id="item_content<?php echo $index ?>" name="item_content">
			<?php echo $row['content'] ?>
		</div>
	</div>
<?php	
	$index++;
	}
?>
<div>

<script type="text/javascript">
	var items = document.getElementsByName("item_content");
	var box = new Array();
	var text = new Array();
	var newBox = new Array();
	var btn = new Array();
	
	for(var i = 0; i < items.length; i++){
		box[i] = items[i];
		text[i] = box[i].innerHTML;
		
		newBox[i] = document.createElement("div");
		btn[i] = document.createElement("a");
		newBox[i].innerHTML = text[i].substring(0,200);
		btn[i].innerHTML = text[i].length > 200 ? "...显示全部" : "";
		btn[i].href = "###";
		btn[i].index = i;
		//console.log('i = ' + i);
		btn[i].onclick = function(event){
			var btnIndex =event.target.index;
			
			//console.log('btn.index = ' + btn[i].index);
			if (btn[btnIndex].innerHTML == "...显示全部"){ 
				btn[btnIndex].innerHTML = "收起"; 
				newBox[btnIndex].innerHTML = text[btnIndex]; 
			}else{ 
				btn[btnIndex].innerHTML = "...显示全部"; 
				newBox[btnIndex].innerHTML = text[btnIndex].substring(0,200); 
			} 
		}
		box[i].innerHTML = ""; 
		box[i].appendChild(newBox[i]); 
		box[i].appendChild(btn[i]); 
		
	}
	
</script>