function commitData(){
	//1 获取身高和体重
	//当html加载完毕后会自动生成一个document对象
	var height=document.getElementById("heig").value;
	var weight=document.getElementById("weig").value;
	if (height==""||weight=="") {
		alert("不能为空");
	}
	//2 进行计算 bmi=w[kg]/h^2[m]
	console.log("h:"+height);
	console.log("w:"+weight);
	var bmiNum=weight/((height/100)*(height/100));
	bmiNum=Math.round(bmiNum*100)/100;
	console.log("bmi:"+bmiNum);
	
	//建议体重 w=bmi*h*h
	var weiMin=18.5*(height/100)*(height/100);
	weiMin=Math.round(weiMin*100)/100;
	var weiMax=23.9*(height/100)*(height/100);
	weiMax=Math.round(weiMax*100)/100;
	//显示到当前界面
	document.getElementById("bmi").innerHTML="您的bmi值："+bmiNum;
	document.getElementById("weigh").innerHTML="您建议体重："+weiMin+"~"+weiMax;
	if(bmiNum<=18.5)
		alert("偏瘦");
	else if(bmiNum>18.5 && bmiNum<23.9)
		alert("正常");
	else if(bmiNum>24.0 && bmiNum<27.9)
		alert("过量");
	else
		alert("肥胖");	
		
	var date=new Date();
	var dateTime=date.getMonth()+"-"+date.getDay();
	//获取时间戳
	console.log(dateTime);
	//4提交到后台
	$.ajax({
		type:"post",//请求方式 post/get
		url:"http://127.0.0.1:8080/ajax_test/AjaxServlet?method=login", //请求地址
		data:{height:height,weight:weight,bmi:bmiNum,dateTime:dateTime},//参数传递到后台
		
		async:false, //是否同步
		
		
		timeout:5000, //设置超时时间
		dataType:"json",
		
		success:function(data){
			//data:后台打印回来的数据
			//alert(data);
			//判断data是否为空
			if (!jQuery.isEmptyObject(data)) {	
					alert(data);
					addBmiHistory(data[data.length-1]);
			}
		},
		error:function(xhr,textState){
			alert("数据请求失败");
		}
	});
}
//当页面加载完毕后，会执行此方法
$(document).ready(function(e){
	$.ajax({
		type:"post",
		url:"http://127.0.0.1:8080/my_second/bmi?method=start_bmi",
		async:false,
		timeout:5000,
		dataType:"json",
		
		success:function(data){
			alert(data);
			alert(typeof data);
			//data:后台打印回来的数据
			//alert(data);
			
			for (var i in data) {
				
				addBmiHistory(data[i]);
			}
		},
		error:function(xhr,textState){
			alert("数据请求失败");
		}	
	});
})
function addBmiHistory(data){
	var table2=document.getElementById("tab2");
	var tr1=document.createElement("tr");
	table2.appendChild(tr1);
	tr1.innerHTML="<td>"+data.id+"</td><td>"+data.date+"</td><td>"+data.height+"</td><td>"+data.weight
	+"</td><td>"+data.bmi+"</td><td><a href='#' onclick='deleteData("+data.id+")'>删除</a></td>"
}

function deleteData(sign){
	$.ajax({
		type:"post",
		url:"http://127.0.0.1:8080/my_second/bmi?method=delete_bmi",
		data:{sign:sign},
		async:false,
		timeout:5000,
		dataType:"json", 
		//根据id移除
		success:function(data){
			if (data==1||data=='1') {
				$("#"+sign).remove();				 
			}else{
				alert("删除失败");
			}
		},
		
		error:function(xhr,textState){
			alert("数据请求失败11111");
		}
	});
	
}

