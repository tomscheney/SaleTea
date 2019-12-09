// 保存并返回的时候 调saveAddress接口
function newAdd() {
  var userName = $("#name").val();
  var telephone = $("#phone").val();
  var postcode = $("#postcode").val();
  var province = $("#select-province").val();
  var city = $("#select-city").val();
  var area = $("#select-area").val();
  var address = $("#address").val();
  let newAddtess = "province" + "city" + "area" + "address";
  console.log("用户名", userName);
  console.log("手机号", telephone);
  console.log("邮编", postcode);
  console.log("省", province);
  console.log("市", city);
  console.log("区", area);
  console.log("地址", address);
  console.log(newAddtess);

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
  // }

  $.ajax({
    url: "https://kidstoms.com/saveAddress",
    type: "post",
    dataType: "json",
    // data: JSON.stringify({
    //   userName: userName,
    //   telephone: telephone,
    //   addressDetail: newAddtess,
    //   postcode: postcode,
    //   openId: localStorage.getItem("openId")
    // }),
    data: {
      userName: userName,
      telephone: telephone,
      addressDetail: newAddtess,
      postcode: postcode,
      openId: localStorage.getItem("openId")
    },
    success: function(res) {
      console.log(res);
      // location.href = "addAddress.html";
    },
    error: function(res) {
      console.log(res);
    }
  });
}

function newADd() {
  location.href = "addAddress.html";
}
