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

	console.log(obj.code)
	if (obj.code == '' || obj.code == undefined || obj.code == 'null') {
		console.log("123")
		var APPID = 'wx6e974f12e898a2ee';
		// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6e974f12e898a2ee&redirect_uri=http://zxz.kidstoms.com/H5/product.html
		// &response_type=code&scope=snsapi_base&state=STATE#wechat_redirect
		window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
			APPID +
			'&redirect_uri=https://zxz.kidstoms.com/H5/paySuccess.html&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';

	}
	console.log(obj.code)

	var Fee = parseInt(Math.random() * (50 - 0 + 1) + 50);
	function randomn(n) {
		if (n > 10) return null
		return parseInt((Math.random() + 1) * Math.pow(10, n - 1))
	}
	console.log(randomn(10))
	var orderN = randomn(10);
	var notifyUrl = "https://zxz.kidstoms.com/H5/paySuccess.html";
	console.log("notifyUrl", notifyUrl)
	var aPay = "";
	alert(obj.code);
	alert(Fee)
	alert(orderN)
	alert(notifyUrl)
	$.ajax({
			url: "https://47.112.98.24/getPayInfo",
			type: "post",
			async:true,
			// contentType: "application/json",
			// dataType: "json",
			data: {
				code: obj.code,
				totalFee: Fee,
				orderNo: orderN,
				notifyUrl: notifyUrl,
			},
			success: function(res) { // res就是后台接口返回的数据
				console.log(res)
				console.log(res.code)
				aPay = res.data,
				console.log("aPAy", aPay)
		        alert("ajx",JSON.stringify(res.code))
			},
			error: function data() {
				console.log("dataerro", data);
				console.log(111)
				alert("ajaxerro")
			}
		});
		
	console.log(aPay);

// });
	// 支付调用
	function onBridgeReady() {
	
        var Fee = parseInt(Math.random() * (50 - 0 + 1) + 50);
        function randomn(n) {
            if (n > 10) return null
                return parseInt((Math.random() + 1) * Math.pow(10, n - 1))
                }
        console.log(randomn(10))
        var orderN = randomn(10);
        var notifyUrl = "https://zxz.kidstoms.com/H5/paySuccess.html";
        console.log("notifyUrl", notifyUrl)
        var aPay = "";
        $.ajax({
               url: "https://47.112.98.24/getPayInfo",
               type: "post",
               // contentType: "application/json",
               dataType: "json",
               data: {
               code: obj.code,
               totalFee: Fee,
               orderNo: orderN,
               notifyUrl: notifyUrl,
               },
               success: function(res) { // res就是后台接口返回的数据
               console.log(res)
               console.log(res.code)
               aPay = res.data,
               console.log("aPAy", aPay)
               alert("ajx",JSON.stringify(res.code))
               
               alert(aPay.package);
               alert(aPay.appId);
               alert(aPay.timeStamp);
               alert(aPay.nonceStr);
               alert(aPay.signType);
               alert(aPay.paySign);
               WeixinJSBridge.invoke(
                                     'getBrandWCPayRequest', {
                                     "appid":aPay.appId, //公众号名称，由商户传入
                                     "timeStamp": aPay.timeStamp, //时间戳，自1970年以来的秒数
                                     "nonceStr": aPay.nonceStr, //随机串
                                     "package": aPay.package,
                                     "signType": aPay.signType, //微信签名方式:
                                     "paySign": aPay.paySign //微信签名
                                     },
                                     function(res) {
                                     if (res.err_msg == "get_brand_wcpay_request:ok") {
                                     alert("支付成功");
                                     } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                                     }
                                     );
               },
               error: function data() {
               console.log("dataerro", data);
               console.log(111)
               alert("ajaxerro")
               }
               })
        
        
        
		
	}
	
