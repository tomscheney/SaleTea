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
				var appId = 'wx6e974f12e898a2ee';
				// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6e974f12e898a2ee&redirect_uri=http://zxz.kidstoms.com/H5/product.html
				// &response_type=code&scope=snsapi_base&state=STATE#wechat_redirect
				window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appId=' 
				+ appId + '&redirect_uri=https://zxz.kidstoms.com/H5/pay-success.html&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
			
			}
			console.log(obj.code)
			
			var Fee = parseInt(Math.random() * (50 - 0 + 1) + 50);
			function randomn(n) {
			  if (n > 10) return null
			  return parseInt((Math.random() + 1) * Math.pow(10,n-1))
			} console.log(randomn(10))
			
			var orderN = randomn(10);
			
			$.ajax({
				url: "https://47.112.98.24/getPayInfo",
				type: "post",
				// contentType: "application/json",
				dataType: "json",
				data:{
					code:obj.code,
					totalFee:Fee,
					orderNo:orderN,
				},
				success: function(res) { // res就是后台接口返回的数据
				    console.log(res)
					console.log(res.code)			
				},
			})
			error: function data() {
				console.log("dataerro", data);
				console.log(111)
			}
		});