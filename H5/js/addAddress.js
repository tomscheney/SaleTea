// 进入添加地址列表页面就 调getAllAddressByOpenId接口
$(function() {
  let params = location.search.split("=");
  let productId = params[1];
  $.ajax({
    url: "https://kidstoms.com/getAllAddressByOpenId",
    type: "post",
    dataType: "json",
    data: {
      openId: window.localStorage.getItem("openId"),
      // productId:location.search.substr(1, 8)
    //   productId: productId.substr(0, 8)
    },
    success: function(res) {
      console.log(res);
      if (res.code === "200") {

      }
    }
  });
});

function ad() {
  location.href = "address.html";
}

function add() {
  location.href = "ReceivingAddress.html";
}
