// 获取后台数据
		// $(document).ready(function() {
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
			var openId = obj.openId;
			console.log(openId)

		function adCar() {
			location.href = "address.html?openId="+openId;
		}

		function addCar() {
			location.href = "shopCar.html?openId="+openId;
		}
		function AddShop() {
			$.ajax({
				url: "https://kidstoms.com/addToShopCart",
				type: "post",
				dataType: "json",
				data: {
					openId:openId,
					productId: '88880001',
				},
				success: function(res) { // res就是后台接口返回的数据
					console.log(res)
				},
			})
		}