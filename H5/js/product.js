// 获取后台数据
		$(document).ready(function() {
			// 获取地址栏中的字符串，并将其转化为对象
			function addr_obj() {
			 var search = location.search;
			 var obj = {};
			 var keyValues = search.slice(1).split("&");
			 keyValues.forEach(function(keyValue) {
			  var tempArr = keyValue.split("=");
			  var key = tempArr[0];
			  // var value = tempArr[1].indexOf("|") > 0 ? tempArr[1].split("|") : tempArr[1];
			  var value = tempArr[1];
			  obj[key] = value;
			 });
			 return obj;
			}
			var obj = addr_obj()
			
			 console.log(obj.code)
			if(obj.code == ''|| obj.code == undefined || obj.code == 'null') {
				console.log("123")
				var Jumpurl = encodeURIComponent(window.location.href);
				var appid = 'wx3837a50ccd30cf87';
				window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' 
				+ appid + '&redirect_uri=' + Jumpurl + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
			}
			console.log(obj.code)
			
			var Fee = parseInt(Math.random() * (50 - 0 + 1) + 50);
			var orde = parseInt(Math.random() * (80 - 0 + 1) + 80);
			
			$.ajax({
				url: "http://47.112.98.24:8090/getPayInfo",
				type: "post",
				dataType: "json",
				contentType: "application/json",
				data:{
					code:obj.code,
					totalFee:'101',
					orderNo:orde,
				},
				success: function(res) { // res就是后台接口返回的数据
					console.log(res.obj.code)
				},
			})
			error: function data() {
				console.log("dataerro", data);
				console.log(111)
			}
		});
		


		function adCar() {
			location.href = "adress.html";
			
		}

		function addCar() {
			location.href = "shop-car.html?userId=665466";
		}
		