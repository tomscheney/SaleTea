// 获取后台数据
		$(document).ready(function() {
			var Fee = parseInt(Math.random() * (50 - 0 + 1) + 50);
			var orde = parseInt(Math.random() * (80 - 0 + 1) + 80);
			var Jumpurl = encodeURIComponent(window.location.href);
			var appid = 'wx3837a50ccd30cf87';
			window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' 
			+ appid + '&redirect_uri=' + Jumpurl + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
			var code = decodeURIComponent(Jumpurl);
			console.log("zhifu")
			$.ajax({
				url: "http://47.112.98.24:8090/getPayInfo",
				type: "post",
				dataType: "json",
				// contentType: "application/json",
				data:{
					code:'',
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
		