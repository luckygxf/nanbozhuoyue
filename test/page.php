＜html＞
＜head＞
＜title＞php分页示例＜/title＞
＜meta http-equiv="Content-Type" content="text/html; charset=gb2312"＞ 
＜/head＞

＜body＞
＜?php
　$conn=mysql_connect("localhost","root","");
　//设定每一页显示的记录数
　$pagesize=1;
　mysql_select_db("mydata",$conn);
　//取得记录总数$rs，计算总页数用
　$rs=mysql_query("select count(*) from tb_product",$conn);
　$myrow = mysql_fetch_array($rs);
　$numrows=$myrow[0];
　//计算总页数

　$pages=intval($numrows/$pagesize);
　if ($numrows%$pagesize)
　　$pages++;
　//设置页数
　if (isset($_GET['page'])){
　　$page=intval($_GET['page']);
　}
　else{
　　//设置为第一页 
　　$page=1;
　}
　//计算记录偏移量
　$offset=$pagesize*($page - 1);
　//读取指定记录数
　$rs=mysql_query("select * from myTable order by id desc limit $offset,$pagesize",$conn);
　if ($myrow = mysql_fetch_array($rs))
　{
　　$i=0;
　　?＞
　　＜table border="0" width="80%"＞
　　＜tr＞
　　　＜td width="50%" bgcolor="#E0E0E0"＞
　　　　＜p align="center"＞标题＜/td＞
　　　　＜td width="50%" bgcolor="#E0E0E0"＞
　　　　＜p align="center"＞发布时间＜/td＞
　　＜/tr＞
　　＜?php
　　　do {
　　　　$i++;
　　　　?＞
　　＜tr＞
　　　＜td width="50%"＞＜?=$myrow["news_title"]?＞＜/td＞
　　　＜td width="50%"＞＜?=$myrow["news_cont"]?＞＜/td＞
　　＜/tr＞
　　　＜?php
　　　}
　　　while ($myrow = mysql_fetch_array($rs));
　　　　echo "＜/table＞";
　　}
　　echo "＜div align='center'＞共有".$pages."页(".$page."/".$pages.")";
　　for ($i=1;$i＜ $page;$i++)
　　　echo "＜a href='fenye.php?page=".$i."'＞[".$i ."]＜/a＞ ";
　　　echo "[".$page."]";
　　　for ($i=$page+1;$i＜=$pages;$i++)
　　　　echo "＜a href='fenye.php?page=".$i."'＞[".$i ."]＜/a＞ ";
　　　　echo "＜/div＞";
　　　?＞
　　＜/body＞
　　＜/html＞