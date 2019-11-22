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
				// var Jumpurl = encodeURIComponent(window.location.href);
				var appid = 'wx6e974f12e898a2ee';
				// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6e974f12e898a2ee&redirect_uri=http://zxz.kidstoms.com/H5/product.html
				// &response_type=code&scope=snsapi_base&state=STATE#wechat_redirect
				window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' 
				+ appid + '&redirect_uri=https://z.kidstoms.com/H5/product.html&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
			
			}
			console.log(obj.code)
			
			var Fee = parseInt(Math.random() * (50 - 0 + 1) + 50);
			var orde = parseInt(Math.random() * (80 - 0 + 1) + 80);
			var notifyUrl = "https://kidstoms.com/H5/product.html";
			console.log("notifyUrl",notifyUrl)
			$.ajax({
				url: "https://kidstoms.com/getPayInfo",
				type: "post",
				// contentType: "application/json",
				dataType: "json",
				data:{
					code:obj.code,
					totalFee:Fee,
					orderNo:orde,
					notifyUrl:notifyUrl,
				},
				success: function(res) { // res就是后台接口返回的数据
					console.log(res.code)
					console.log(res)
					alert(1);
					wx.config({
					  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					  appId: 'res.data.appId', // 必填，公众号的唯一标识
					  timestamp: , // 必填，生成签名的时间戳
					  nonceStr: '', // 必填，生成签名的随机串
					  signature: '',// 必填，签名
					  jsApiList: ["https://kidstoms.com/getAllProduct"] // 必填，需要使用的JS接口列表
					});
				},
			})
			error: function data() {
				console.log("dataerro", data);
				console.log(111)
			}
		});
		


		function adCar() {
			location.href = "address.html";
		}

		function addCar() {
			location.href = "shopCar.html";
		}
		
