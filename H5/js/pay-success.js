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
				+ appid + '&redirect_uri=http://zxz.kidstoms.com/H5/product.html&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
			
			}
			console.log(obj.code)
			
			var Fee = parseInt(Math.random() * (50 - 0 + 1) + 50);
			var orde = parseInt(Math.random() * (80 - 0 + 1) + 80);
			
			$.ajax({
				url: "https://47.112.98.24/getPayInfo",
				type: "post",
				// contentType: "application/json",
				dataType: "json",
				data:{
					code:obj.code,
					totalFee:Fee,
					orderNo:orde,
				},
				success: function(res) { // res就是后台接口返回的数据
					console.log(res.code)
					console.log(res.appId)
					function onBridgeReady() {
								   WeixinJSBridge.invoke(
								       'getBrandWCPayRequest', {
								           "appId" : "wx6e974f12e898a2ee",     //公众号名称，由商户传入     
								           "timeStamp": timeStamp,         //时间戳，自1970年以来的秒数     
								           "nonceStr" : randomString(), //随机串     
								           "package" : "prepay_id=wx20191114165321515089",     
								           "signType" : "MD5",         //微信签名方式:     
								           "paySign" : wxSignFunc()    //微信签名 
								       },
								       
								       function(res){     
								           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
								        	   alert("支付成功");
								           }  
									   }
								   ); 
								}
					  function pay(){
									if (typeof WeixinJSBridge == "undefined"){
									   if( document.addEventListener ){
									       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
									   }else if (document.attachEvent){
									       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
									       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
									   }
									}else{
									   onBridgeReady();
									} 	
					  }
				},
			})
			error: function data() {
				console.log("dataerro", data);
				console.log(111)
			}
		});