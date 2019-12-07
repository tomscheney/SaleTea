// 进去立即购买页面 调buyNow接口
<<<<<<< HEAD
$(document).ready(function() {
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
        template("", { res });

        // console.log(13121212);
        // location.href =
        //   "confirmOrder.html?totalFee=" +
        //   res.data.orderAmount +
        //   "&orderId=" +
        //   res.data.orderId;
      }
    }
  });
});
=======

var totalFee = 0;
var orderNo = 0;

function buyNow() {

    let search = location.search;
    let list = search.split("=");
    let productId = list[1];
    let openId = window.localStorage.getItem("openId");
    $.ajax({
        url: "https://kidstoms.com/buyNow",
        type: "post",
        dataType: "json",
        data: {
            openId: openId,
            productId: productId
        },
        success: function (res) {
            console.log(res);
            // res就是后台接口返回的数据
            if (res.code === 200) {

                totalFee = res.data.totalFee;
                orderNo = res.data.orderNo;
                document.getElementById("pay-money").value = "合计："+res.data.totalFee+"元"

            }
        }
    });
};
>>>>>>> eaa4b107d3bc747f456c7473ef777487e34f398a

function ex() {
    location.href = "exchange.html";
}

function adda() {
    location.href = "addAddress.html";
}

function goPay() {
    $("#btn-car3").click(function () {
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
        location.href = "payResult.html?totalFee=" + totalFee + "&orderNo=" + orderNo;
    });
}

$("#liquan").click(function () {
    if ($(".vou>span:nth-of-type(2)>img:nth-of-type(2)").is(':hidden')) {
        $(".vou>span:nth-of-type(2)>img:nth-of-type(2)").show();
        $(".inp").show();
        $(".vou>span:nth-of-type(2)>img:nth-of-type(1)").hide();

    } else {
        $(".vou>span:nth-of-type(2)>img:nth-of-type(2)").hide();
        $(".vou>span:nth-of-type(2)>img:nth-of-type(1)").show();
        $(".inp").hide();
    }

})

$(document).ready(function () {
    buyNow();
});
