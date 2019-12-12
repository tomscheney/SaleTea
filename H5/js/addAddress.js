let search = location.search;
let list = search.split("=");
let productId = list[1];
let openId = window.localStorage.getItem("openId");
console.log(search);
console.log(list);
console.log(productId);
console.log(openId);

// 获取指定用户所有地址 调getAllAddressByOpenId接口
function getAllAddressByOpenId() {
  $.ajax({
    url: "https://kidstoms.com/getAllAddressByOpenId",
    type: "post",
    dataType: "json",
    data: {
      openId: window.localStorage.getItem("openId")
    },
    success: function(res) {
      console.log(res);
      var result = res.data;
      window.localStorage.setItem(result);
      var html = template("addressTemplate", { result: result });
      $(".address-box").html(html);
    }
  });
}

// 点击添加新地址按钮跳转页面
function add() {
  location.href = "ReceivingAddress.html";
}

// 点击地址列表的时候进入列表详情 进行修改
function enter() {
  location.href = "enter-address.html";
}

$(document).ready(function() {
  getAllAddressByOpenId();
});
