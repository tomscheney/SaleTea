var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount; //当前剩余秒数
var code = ""; //验证码
var codeLength = 6; //验证码长度

let telephone = window.localStorage.getItem("telephone");
let search = location.search;
let list = search.split("=");
let productId = list[1];
console.log(telephone);
console.log(productId);

function sendMessage() {
  curCount = count;
  var telephone = $("#add_phone").val();
  var code = $("#code").val();
  console.log(telephone);
  console.log(code);

  //产生验证码
  for (var i = 0; i < codeLength; i++) {
    code += parseInt(Math.random() * 9).toString();
  }

  //设置button效果，开始计时
  $("#btnSendCode").attr("disabled", "true");
  $("#btnSendCode").val(+curCount + "秒再获取");
  InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次

  $.ajax({
    url: "https://kidstoms.com/getSecurityCode",
    type: "post",
    dataType: "json",
    data: {
      openId: window.localStorage.getItem("openId"),
      telephone: telephone,
      code: code
    },
    success: function(res) {
      if (res.code == "200") {
        SetRemainTime();
        window.localStorage.setItem("telephone", telephone);
      }
    }
  });
}

//timer处理函数
function SetRemainTime() {
  if (curCount == 0) {
    window.clearInterval(InterValObj); //停止计时器
    $("#btnSendCode").removeAttr("disabled"); //启用按钮
    $("#btnSendCode").val("重新发送验证码");
    code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效
  } else {
    curCount--;
    $("#btnSendCode").val(+curCount + "秒再获取");
  }
}
// 点击绑定手机号按钮跳转页面
function btns(productId) {
  if (
    window.localStorage.getItem("telephone") == "" ||
    window.localStorage.getItem("telephone") == null ||
    window.localStorage.getItem("telephone") == undefined
  ) {
    alert("手机号错误");
  } else {
    // window.location.href = " confirmOrder.html?productId=" + productId;
    window.history.go(-1);
  }
}
