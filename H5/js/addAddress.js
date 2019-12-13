let search = location.search;
let list = search.split("=");
let productId = list[1];
let openId = window.localStorage.getItem("openId");
let addressId = window.localStorage.getItem("addressId");
console.log(search);
console.log(list);
console.log(productId);
console.log(openId);

var userName = "";

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
      var addressList = res.data;
      console.log(addressList);
      for (var i = 0; i < addressList.length; i++) {
        // 地址的id
        var addressId = res.data[i].addressId;
        console.log(addressId);
        // 姓名
        userName = res.data[i].userName;
        console.log(userName);
      }

      var result = res.data;
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
  location.href = "enter-address.html?userName=" + userName;
}

$(document).ready(function() {
  getAllAddressByOpenId();
});
