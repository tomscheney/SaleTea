let search = location.search;
let list = search.split("=");
let productId = list[1];
console.log(search);
console.log(list);
console.log(productId);

// 进去立即购买页面 调buyNow接口
function buyNow(productId) {
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
      if (res.code === "200") {
        // template("", { res });
        // console.log(13121212);
        // location.href =
        //   "confirmOrder.html?totalFee=" +
        //   res.data.orderAmount +
        //   "&orderId=" +
        //   res.data.orderId;
      }
    }
  });
}

function ex() {
  location.href = "exchange.html";
}

function adda() {
  location.href = "addAddress.html";
}

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
    // orderNo
    location.href =
      "payResult.html?totalFee=" + totalFee + "&orderNo=" + orderNo;
  });
}

$(document).ready(function() {
  buyNow();
});
