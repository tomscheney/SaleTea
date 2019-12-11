$(function() {
  // 存储totalFee orderNo
  var totalFee = null;
  var orderNo = null;

  // 进去立即购买页面 调buyNow接口
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

      // 价格
      totalFee = res.data.totalFee;
      console.log(totalFee);

      // 订单编号
      orderNo = res.data.orderNo;
      console.log(orderNo);

      var menu = res.data.productList[0];
      console.log(menu);

      // 名字
      $(".productName").html(menu.productName);
      // 价格
      $(".productPrice").html(menu.productPrice);
    }
  });

  console.log(totalFee);
  console.log(orderNo);

  // 点击去支付 跳转页面
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
});
