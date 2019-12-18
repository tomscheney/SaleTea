var userName = $("#name").val();
var telephone = $("#phone").val();
var postcode = $("#postcode").val();
var addressDetail = $("#address").val();
console.log("用户名", userName);
console.log("手机号", telephone);
console.log("邮编", postcode);
console.log("地址", addressDetail);

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

  if (
    this.userName == "" ||
    this.userName == null ||
    this.userName == undefined
  ) {
    alert("请添加收货人姓名");
  } else if (
    this.telephone == "" ||
    this.telephone == null ||
    this.telephone == undefined
  ) {
    alert("请添加收货人手机号");
  } else if (
    this.postcode == "" ||
    this.postcode == null ||
    this.postcode == undefined
  ) {
    alert("请添加收货人邮编");
  } else if (
    this.addressDetail == "" ||
    this.addressDetail == null ||
    this.addressDetail == undefined
  ) {
    alert("请添加收货人详细地址");
  } else {
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
        location.href = "addAddress.html";
      }
    });
  }
}

// 点击返回按钮
function returns() {
  location.href = "addAddress.html";
}
