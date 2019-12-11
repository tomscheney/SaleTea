let telephone = window.localStorage.getItem("telephone");
let search = location.search;
let list = search.split("=");
let productId = list[1];
console.log(telephone);
console.log(search);
console.log(list);
console.log(productId);
var totalFee = 0;
var orderNo = 0;
// 进去立即购买页面 调buyNow接口
function buyNow() {
  $.ajax({
    url: "https://kidstoms.com/buyNow",
    type: "post",
    dataType: "json",
    data: {
      openId: window.localStorage.getItem("openId"),
      productId: productId
    },
    success: function(res) {
      console.log(res);

      // 订单编号
      var orderNo = res.data.orderNo;
      orderNo = orderNo;
      totalFee = res.data.totalFee;
      console.log(orderNo);

      var menu = res.data.productList[0];
      console.log(menu);

      // 名字
      $(".productName").html(menu.productName);
      // 价格
      $(".productPrice").html(menu.productPrice);
    }
  });
}

// 点击进入退换货政策
function ex() {
  location.href = "exchange.html";
}

// 点击收货地址
function adda() {
  location.href = "addAddress.html";
}

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
      var html = template("addressTemplate", { result: result });
      console.log(html);
      $(".address-box").html(html);
    }
  });
}

// 点击去支付 跳转页面
function goPay() {
  $("#btn-car3").click(function() {
    var istrue = false;
    var inp = $(".checkbox-list-input");
    for (var i = 0; i < inp.length; i++) {
      if (inp.eq(i).prop("checked")) {
        istrue = true;
        break;
      }
    }
    if (!istrue) {
      alert(
        "该笔订单内包含不可退换货/款的商品。付款前请务必详阅并知晓相关政策，并勾选确认"
      );
      return;
    }
    location.href =
      "payResult.html?totalFee=" + totalFee + "&orderNo=" + orderNo;
  });
}

$(document).ready(function() {
  getAllAddressByOpenId();

  if (productId === undefined || productId === null){//来自立即购买
    buyNow();

  } else {//来自购物车结算

  }
});

function settleAccounts() {
  function buyNow() {
    $.ajax({
      url: "https://kidstoms.com/buyNow",
      type: "post",
      dataType: "json",
      data: {
        openId: window.localStorage.getItem("openId"),
      },
      success: function(res) {
        console.log(res);

        // 订单编号
         orderNo = res.data.orderNo;
         totalFee = res.data.totalFee;

        var menu = res.data.productList[0];
        console.log(menu);

        // 名字
        $(".productName").html(menu.productName);
        // 价格
        $(".productPrice").html(menu.productPrice);
      }
    });
  }
}
