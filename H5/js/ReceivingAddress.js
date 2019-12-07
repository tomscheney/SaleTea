// 保存并返回的时候 调saveAddress接口
function newAdd() {
  var userName = $("#name").val(); // 都按这获取
  var telephone = $("#phone").val();
  var province = $(".select-province").val();
  var city = $(".select-city").val();
  var area = $(".select-area").val();
  var address = $("#address").val();
  let newAddtess = "province + city + area + address";
  console.log("用户名", userName);
  console.log("手机号", telephone);
  console.log("省", province);
  console.log("市", city);
  console.log("区", area);
  console.log("地址", address);
  console.log(newAddtess);

  $.ajax({
    url: "https://47.112.98.24:8090/saveAddress",
    type: "post",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({
      userName: userName,
      telephone: telephone,
      // addressDetail:,
      // postcode:,
      openId: localStorage.getItem("openId")
    }),
    success: function(data) {
      console.log(2);
      if (userName != "" && telephone != "" && address != "") {
        console.log(data);
        console.log(1);
        // location.href = "new-add.html";
      }
    },
    error: function(data) {
      console.log(103);
      // $('#serverResponse').html(data.userName + " : " + data.telephone + " : " + data.address);
    }
  });
}
function newADd() {
  location.href = "add-address.html";
}
