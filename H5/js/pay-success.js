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
				var appid = 'wx6e974f12e898a2ee';
				// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6e974f12e898a2ee&redirect_uri=http://zxz.kidstoms.com/H5/product.html
				// &response_type=code&scope=snsapi_base&state=STATE#wechat_redirect
				window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' 
				+ appid + '&redirect_uri=https://zxz.kidstoms.com/H5/pay-success.html&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
			
			}
			console.log(obj.code)
			function generate(){
			    for(var j=0;j<10;j++){
			        var randStr = "";
			        for (var i = 0; i < 10; i++) {//此处的12为生成12位数字，可随即更改
			            var randItem = Math.floor(Math.random() * 1000);
			            randStr += randItem;
			        }
			        // var value="766"+randStr;//此处的766是要求必须已766开头，如果不需要可以去掉并在for循环中填入你要的位数
			        // document.getElementById("generateCom").value=(value);
			    }
			}generate()
			
			var Fee = parseInt(Math.random() * (50 - 0 + 1) + 50);
			var orde = generate();
			
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
				    console.log(res)
					console.log(res.code)
					console.log(res.data.appId)
					console.log(res.data.package)
					function onBridgeReady() {
								   WeixinJSBridge.invoke(
								       'getBrandWCPayRequest', {
								           "appId" : "wx6e974f12e898a2ee",     //公众号名称，由商户传入     
								           "timeStamp": res.timeStamp,         //时间戳，自1970年以来的秒数     
								           "nonceStr" : res.randomString(), //随机串     
								           "package" : package,     
								           "signType" : signType,         //微信签名方式:     
								           "paySign" : paySign    //微信签名 
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