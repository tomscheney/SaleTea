// 获取后台数据

let notifyUrl = "http://kidstoms.com/H5/payResult.html";

function pay() {
  if (typeof WeixinJSBridge == "undefined") {
    if (document.addEventListener) {
      document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
    } else if (document.attachEvent) {
      document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
      document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
    }
  } else {
    onBridgeReady();
  }
}
// 支付调用
function onBridgeReady() {
  let search = location.search;
  let list = search.split("&");
  let totalFee = list[0].split("=")[1];
  let orderNo = list[1].split("=")[1];
  console.log(search);
  console.log(list);
  console.log(totalFee);
  console.log(orderNo);

  $.ajax({
    url: "https://kidstoms.com/getPayInfo",
    type: "post",
    dataType: "json",
    data: {
      openId: localStorage.getItem("openId"),
      totalFee: totalFee,
      orderNo: orderNo,
      notifyUrl: notifyUrl,
      body: "芷贤斋订单结算"
    },
    success: function(res) {
      let resPay = res.data;

      if (res.code !== 200) {
        return;
      }
      // 支付
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: resPay.appId, //公众号名称，由商户传入
          timeStamp: resPay.timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: resPay.nonceStr, //随机串
          package: resPay.package,
          signType: resPay.signType, //微信签名方式：
          paySign: resPay.paySign //微信签名
        },
        function(response) {
          if (response.err_msg == "get_brand_wcpay_request:ok") {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          }
        }
      );
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      alert("pay fail");
      console.log(111);
      alert("textStatus", textStatus); //
      alert(JSON.stringify(textStatus)); //error
      alert("XMLHttpRequest", XMLHttpRequest); //
      alert(JSON.stringify(XMLHttpRequest)); //"readyState":0,"status":0,"statusText":"error"
      alert("errorThrown", errorThrown);
      alert(JSON.stringify(errorThrown)); //""
    }
  });
}

$(document).ready(function() {
  pay();
});
