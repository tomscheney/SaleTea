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
    url: "https://zhixianzhai.com/buyNow",
    type: "post",
    dataType: "json",
    data: {
      openId: window.localStorage.getItem("openId"),
      productId: productId
    },
    success: function(res) {
      if (res.code === 200) {
        // 订单编号
        orderNo = res.data.orderNo;
        totalFee = res.data.totalFee;
        console.log(orderNo);

        var menu = res.data.productList[0];
        console.log(menu);

        var htmls = template("productTemplate", {
          result: res.data.productList,
          amounts: res.data.amounts
        });
        $(".product-box").html(htmls);
        // 价格
        $(".pay-money").html("合计：" + menu.productPrice + "元");
      }
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
    url: "https://zhixianzhai.com/getAllAddressByOpenId",
    type: "post",
    dataType: "json",
    data: {
      openId: window.localStorage.getItem("openId")
    },
    success: function(res) {
      if (res.code === 200 && res.data.length > 0) {
        let result = res.data[0];
        console.log(result);
        // 姓名
        $(".address-name").html(result.userName);
        // 手机号
        $(".address-tel").html(result.telephone);
        // 地址
        $(".address-detail").html(result.addressDetail);
      }
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
    } else if (
      window.localStorage.getItem(
        "addressObject"
      ) == "" ||
      window.localStorage.getItem(
        "addressObject"
      ) == null ||
      window.localStorage.getItem(
        "addressObject"
      ) == undefined
    ) {
      alert("请添加地址");
    } else {
      location.href =
        "payResult.html?totalFee=" + totalFee + "&orderNo=" + orderNo;
    }
  });
}

$(document).ready(function() {
  if (productId === undefined || productId === null) {
    //来自购物车结算
    settleAccounts();
  } else {
    //来自立即购买

    buyNow();
  }

  let addressString = localStorage.getItem("addressObject");
  if (addressString === undefined || addressString === null) {
    getAllAddressByOpenId();
  } else {
    let addressObject = JSON.parse(addressString);
    $(".address-name").html(addressObject.userName);
    $(".address-tel").html(addressObject.telephone);
    $(".address-detail").html(addressObject.addressDetail);
  }
});

function settleAccounts() {
  $.ajax({
    url: "https://zhixianzhai.com/settleAccounts",
    type: "post",
    dataType: "json",
    data: {
      openId: window.localStorage.getItem("openId")
    },
    success: function(res) {
      if (res.code === 200) {
        // 订单编号
        orderNo = res.data.orderNo;
        totalFee = res.data.totalFee;

        var htmls = template("productTemplate", {
          result: res.data.productList,
          amounts: res.data.amounts
        });
        $(".product-box").html(htmls);
        $(".pay-money").html("合计：" + totalFee + "元");
      }
    }
  });
}
