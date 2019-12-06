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
      // res就是后台接口返回的数据
      if (res.code === "200") {
        // alert(res.data.msg);
        console.log(13121212);
        location.href =
          "confirmOrder.html?totalFee=" +
          res.data.orderAmount +
          "&orderId=" +
          res.data.orderId;
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
    window.location.href = "payResult.html?totalFee=";
    // window.open("product.html")
  });
}

// $("#liquan").click(function(){
//     if ($(".vou>span:nth-of-type(2)>img:nth-of-type(2)").is(':hidden')) {
//         $(".vou>span:nth-of-type(2)>img:nth-of-type(2)").show();
//         $(".inp").show();
//         $(".vou>span:nth-of-type(2)>img:nth-of-type(1)").hide();

//     } else{
//         $(".vou>span:nth-of-type(2)>img:nth-of-type(2)").hide();
//         $(".vou>span:nth-of-type(2)>img:nth-of-type(1)").show();
//         $(".inp").hide();
//     }

// })
