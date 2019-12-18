let search = location.search;
let list = search.split("=");
let productId = list[1];
let openId = window.localStorage.getItem("openId");
let telephone = window.localStorage.getItem("telephone");

console.log(search);
console.log(list);
console.log(openId);
console.log(telephone);

var userName = "";
var addressList = "";

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
      addressList = res.data;
      console.log(addressList);
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
function enter(i) {
  let addressObject = addressList[i];
  window.localStorage.setItem("addressObject", JSON.stringify(addressObject));
  console.log("aaaaa:" + addressList[i].userName);
  location.href = "enter-address.html?userName=" + userName;
}

// 点击列表的某一个单元格
function clickCell(i) {
  let addressObject = addressList[i];
  window.localStorage.setItem("addressObject", JSON.stringify(addressObject));
  console.log("aaaaa:" + addressList[i].userName);
  location.href = "confirmOrder.html";
}

// 点击删除按钮 调deleteAddressByTelephone接口
function deleteBox(i) {
  let addressObject = addressList[i];
  console.log(addressObject);
  let addressString = localStorage.getItem("addressObject");
  console.log(addressString);
  let phone = addressObject.telephone;
  console.log(phone);
  // window.localStorage.setItem("addressObject", JSON.stringify(addressObject));
  var r = confirm("您确定要删除当前商品？");
  if (r === true) {
    $.ajax({
      url: "https://kidstoms.com/deleteAddressByTelephone",
      type: "post",
      dataType: "json",
      data: {
        telephone: window.localStorage.getItem("telephone")
      },
      success: function(res) {
        console.log(res);
      }
    });
  }
}

$(document).ready(function() {
  getAllAddressByOpenId();
});
