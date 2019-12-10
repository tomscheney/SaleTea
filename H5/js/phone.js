var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount; //当前剩余秒数
var code = ""; //验证码
var codeLength = 6; //验证码长度

function sendMessage() {

  curCount = count;
  var dealType; //验证方式
  var telephone = $("#add_phone").val();
  console.log(dealType);
  console.log(telephone);

  if ($("#add_phone").attr("checked") == true) {
    dealType = "telephone";
  }

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
      telephone: telephone
    },
    success: function(res) {
      console.log(res);
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
