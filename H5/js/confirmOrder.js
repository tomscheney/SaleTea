let telephone = window.localStorage.getItem("telephone");
let search = location.search;
let list = search.split("=");
let productId = list[1];
console.log(telephone);
console.log(search);
console.log(list);
console.log(productId);

var numList = null;
console.log(numList);

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

      numList = res.data.productList[0];
      console.log(numList);

      var menu = res.data.productList[0];
      console.log(menu);

      // 名字
      $(".productName").html(menu.productName);
      // 价格
      $(".productPrice").html(menu.productPrice);
    }
  });
}

function ex() {
  location.href = "exchange.html";
}

function adda() {
  location.href = "addAddress.html";
}

// 点击去支付 跳转页面
function goPay() {
  // console.log(numList);
  // $.ajax({
  //   url: "https://kidstoms.com/getPayInfo",
  //   type: "post",
  //   dataType: "json",
  //   data: {
  //     openId: window.localStorage.getItem("openId"),
  //     orderNo: 333300001,
  //     totalFee: numList.productPrice,
  //     body: numList.productName,
  //     notifyUrl: "https://kidstoms.com/tea/H5/payResult.html"
  //   },
  //   success: function(res) {
  //     console.log(res);
      location.href = "payResult.html";
  //   }
  // });
}

// function goPay() {
//   $("#btn-car3").click(function() {
//     var istrue = false;
//     var inp = $(".checkbox-list-input");
//     for (var i = 0; i < inp.length; i++) {
//       if (inp.eq(i).prop("checked")) {
//         istrue = true;
//         break;
//       }
//     }
//     if (!istrue) {
//       alert(
//         "该笔订单内包含不可退换货/款的商品。付款前请务必详阅并知晓相关政策，并勾选确认"
//       );
//       return;
//     }
//     // orderNo
//     location.href =
//       "payResult.html?totalFee=" + totalFee + "&orderNo=" + orderNo;
//   });
// }

$(document).ready(function() {
  buyNow();
});
