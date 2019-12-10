// var view_timer = null;
// function viewPort(userAgent, pageWidth) {
//   var oView = document.getElementById("viewport");
//   if (oView) {
//     document.head.removeChild(oView);
//   }
//   if (!pageWidth) {
//     pageWidth = 750;
//   }
//   var screen_w = parseInt(window.screen.width),
//     scale = screen_w / pageWidth;
//   if (/Android (\d+\.\d+)/.test(userAgent)) {
//     var creat_meta = document.createElement("meta");
//     creat_meta.name = "viewport";
//     creat_meta.id = "viewport";
//     var version = parseFloat(RegExp.$1);
//     if (version > 2.3) {
//       creat_meta.content =
//         "width=" +
//         pageWidth +
//         ", initial-scale = " +
//         scale +
//         ",user-scalable=1, minimum-scale = " +
//         scale +
//         ", maximum-scale = " +
//         scale +
//         ", target-densitydpi=device-dpi";
//     } else {
//       creat_meta.content =
//         '"width=' + pageWidth + ", target-densitydpi=device-dpi";
//     }
//     document.head.appendChild(creat_meta);
//   } else {
//     var creat_meta = document.createElement("meta");
//     creat_meta.name = "viewport";
//     creat_meta.id = "viewport";
//     if (window.orientation == "-90" || window.orientation == "90") {
//       scale = window.screen.height / pageWidth;
//       creat_meta.content =
//         "width=" +
//         pageWidth +
//         ", initial-scale = " +
//         scale +
//         " ,minimum-scale = " +
//         scale +
//         ", maximum-scale = " +
//         scale +
//         ", user-scalable=no, target-densitydpi=device-dpi";
//     } else {
//       creat_meta.content =
//         "width=" +
//         pageWidth +
//         ", initial-scale = " +
//         scale +
//         " ,minimum-scale = " +
//         scale +
//         ", maximum-scale = " +
//         scale +
//         ", user-scalable=no, target-densitydpi=device-dpi";
//     }
//     // document.head.appendChild(creat_meta);
//   }
// }
// viewPort(navigator.userAgent);

// window.onresize = function() {
//   clearTimeout(view_timer);
//   view_timer = setTimeout(function() {
//     viewPort(navigator.userAgent);
//   }, 500);
// };

// // // 点击获取手机验证码 调getSecurityCode接口
// // function sendAddmes() {
// //   var phone = $("#add_phone").val();
// //   $.ajax({
// //     url: "https://kidstoms.com/getSecurityCode",
// //     type: "post",
// //     dataType: "json",
// //     data: {
// //       phone: phone,
// //       openId: localStorage.getItem("openId")
// //     },
// //     success: function(res) {
// //       console.log(res);
// //       window.localStorage.setItem("phone", phone);
// //     }
// //   });
// // }

// // // 点击绑点手机号跳转页面
// // function btn() {
// //   location.href = "confirmOrder.html";
// // }

var InterValObj; //timer变量，控制时间
var count = 30; //间隔函数，1秒执行
var curCount; //当前剩余秒数
var code = ""; //验证码
var codeLength = 6; //验证码长度
function sendMessage() {
  curCount = count;
  var dealType; //验证方式
  var uid = $("#uid").val(); //用户uid
  var phone = $("#add_phone").val();
  if ($("#phone").attr("checked") == true) {
    dealType = "phone";
  } else {
    dealType = "email";
  }
  //产生验证码
  for (var i = 0; i < codeLength; i++) {
    code += parseInt(Math.random() * 9).toString();
  }
  //设置button效果，开始计时
  $("#btnSendCode").attr("disabled", "true");
  $("#btnSendCode").val(+curCount + "秒再获取");
  InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
  //向后台发送处理数据
  $.ajax({
    type: "post", //用post方式传输
    dataType: "JSON", //数据格式:JSON
    url: "https://kidstoms.com/sms/getSecurityCode", //目标地址
    data: {
      openId: window.localStorage.getItem("openId"),
      phone: phone
    },
    success: function(res) {
      alert("验证码:" + res);
    },
    error: function() {}
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
