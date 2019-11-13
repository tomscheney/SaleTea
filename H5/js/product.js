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
				// contentType: "application/json",
				data:{
					code:code,
					totalFee:Fee,
					orderNo:orde,
				},
				success: function(res) { // res就是后台接口返回的数据
					console.log(res.code)
				},
			})
			error: function data() {
				console.log("dataerro", data);
				console.log(111)
			}
		});
		$(document).ready(function() {
			// function myFunction(){
			console.log("dianji le ")
			$.ajax({
				url: "http://47.112.98.24:8090/getProductDetail",
				type: "post",
				dataType: "json",
				data: {
					'productId': '88880001', 
				},
				success: function(res) { // res就是后台接口返回的数据
				console.log(res)
					// 标题 价格
					$(".tit-name").text(res.data.productDesc);
					$(".tit-price").text(res.data.salePrice + '元 / 份');
					// 产品信息
					$(".productPlace").text(res.data.productDetail.productPlace);
					$(".wrapping").text(res.data.productDetail.wrapping);
					$(".brand").text(res.data.productDetail.brand);
					$(".qualityPeriod").text(res.data.productDetail.qualityPeriod);
					$(".standards").text(res.data.productDetail.standards);
					// 产品亮点
					$(".Bright-spot-1-r>span").text(res.data.productFeatures.featureDesc)
				},
			})
			error: function data() {
				console.log("dataerro", data);
			}
		});
	
	

		function adCar() {
			location.href = "adress.html";
			
		}

		function addCar() {
			location.href = "shop-car.html?userId=665466";
		}
		