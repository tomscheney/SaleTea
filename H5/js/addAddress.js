let search = location.search;
let list = search.split("=");
let productId = list[1];
let openId = window.localStorage.getItem("openId");
console.log(search);
console.log(list);
console.log(productId);
console.log(openId);

// 获取指定用户所有地址 调getAllAddressByOpenId接口
$(function() {
  $.ajax({
    url: "https://kidstoms.com/getAllAddressByOpenId",
    type: "post",
    dataType: "json",
    data: {
      openId: window.localStorage.getItem("openId"),
    },
    success: function(res) {
      console.log(res);
      if (res.code === "200") {
        console.log(123)
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

