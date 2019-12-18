$(document).ready(function() {
  $("#name").val(addressObject.userName);
  $("#phone").val(addressObject.telephone);
  $("#postcode").val(addressObject.postcode);
  $("#address").val(addressObject.addressDetail);
});

let addressString = localStorage.getItem("addressObject");
let addressObject = JSON.parse(addressString);
var userName = $("#name").val(addressObject.userName);
var telephone = $("#phone").val();
var postcode = $("#postcode").val();
var addressDetail = $("#address").val();
console.log("用户名", addressObject.userName);
console.log("手机号", telephone);
console.log("邮编", postcode);
console.log("具体地址", addressDetail);
// var province = $("#select-province").val();
// var city = $("#select-city").val();
// var area = $("#select-area").val();
// let addressDetail = province + city + area + address;
// console.log("省", province);
// console.log("市", city);
// console.log("区", area);
// console.log("地址", address);

// 保存并返回的时候 调saveAddress接口
function newAdd() {
  var userName = $("#name").val();
  var telephone = $("#phone").val();
  var postcode = $("#postcode").val();
  var addressDetail = $("#address").val();
  console.log("用户名", userName);
  console.log("手机号", telephone);
  console.log("邮编", postcode);
  console.log("具体地址", addressDetail);
  // var province = $("#select-province").val();
  // var city = $("#select-city").val();
  // var area = $("#select-area").val();
  // let addressDetail = province + city + area + address;
  // console.log("省", province);
  // console.log("市", city);
  // console.log("区", area);
  // console.log("地址", address);

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
      console.log(res);
      if (res.code == "200") {
        location.href = "addAddress.html";
      }
    }
  });

  // if (
  //   this.userName == "" ||
  //   this.userName == null ||
  //   this.userName == undefined
  // ) {
  //   alert("请输入收货人姓名");
  //   return;
  // } else if (
  //   this.telephone == "" ||
  //   this.telephone == null ||
  //   this.telephone == undefined
  // ) {
  //   alert("请输入收货人手机号");
  //   return;
  // } else if (
  //   this.address == "" ||
  //   this.address == null ||
  //   this.address == undefined
  // ) {
  //   alert("请输入收货人手机号");
  //   return;
  // } else {
  //   $.ajax({
  //     url: "https://kidstoms.com/saveAddress",
  //     type: "post",
  //     dataType: "json",
  //     data: {
  //       userName: userName,
  //       telephone: telephone,
  //       addressDetail: newAddtess,
  //       postcode: postcode,
  //       openId: localStorage.getItem("openId")
  //     },
  //     success: function(res) {
  //       console.log(res);
  //       location.href = "addAddress.html";
  //     }
  //   });
  // }
}

// 点击返回按钮
function deletes() {
  location.href = "addAddress.html";
}

// 点击返回按钮
function returns() {
  location.href = "addAddress.html";
}
