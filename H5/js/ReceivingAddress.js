// 保存并返回的时候 调saveAddress接口
function newAdd() {
  var userName = $("#name").val();
  var telephone = $("#phone").val();
  var postcode = $("#postcode").val();
  var addressDetail = $("#address").val();
  console.log("用户名", userName);
  console.log("手机号", telephone);
  console.log("邮编", postcode);
  console.log("地址", addressDetail);
  // var province = $("#select-province").val();
  // var city = $("#select-city").val();
  // var area = $("#select-area").val();
  // let addressDetail = province + city + area + address;
  // console.log("省", province);
  // console.log("市", city);
  // console.log("区", area);
  // console.log("具体地址", addressDetail);

  $.ajax({
    url: "https://kidstoms.com/saveAddress",
    type: "post",
    dataType: "json",
    data: {
      userName: userName,
      telephone: telephone,
      addressDetail: addressDetail,
      postcode: postcode,
      openId: localStorage.getItem("openId")
    },
    success: function(res) {
        location.href = "addAddress.html";
      
    }
  });
}

// // 点击删除按钮 调deleteAddressByTelephone接口
// function deletes() {
//   var r = confirm("您确定要删除当前商品？");
//   if (r == true) {
//     $.ajax({
//       url: "https://kidstoms.com/deleteAddressByTelephone",
//       type: "post",
//       dataType: "json",
//       data: {
//         openId: window.localStorage.getItem("openId"),
//         telephone: window.localStorage.getItem("telephone")
//       },
//       success: function(res) {
//         if (res.code == "200") {
//           getAllAddressByOpenId();
//         }
//       }
//     });
//   }
// }

// 点击返回按钮
function returns() {
  location.href = "addAddress.html";
}
