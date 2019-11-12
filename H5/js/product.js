// 获取后台数据
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
		var mySwiper = new Swiper('.swiper-container', {
			loop: true, // 循环模式选项
			autoplay: true, //等同于以下设置
			pagination: {
				el: '.swiper-pagination' // 分页器
			}
		})

		

		function adCar() {
			location.href = "adress.html";
		}

		function addCar() {
			location.href = "shop-car.html?userId=665466";
		}
		