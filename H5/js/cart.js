let openId = window.localStorage.getItem("openId");
console.log(openId);
let params = location.search.split("=");
let productId = params[1];

$(function() {
  //加的效果
  $(".product-add").click(function() {
    var n = $(this)
      .prev()
      .val();
    var num = parseInt(n) + 1;
    if (num == 99) {
      return;
    }
    $(this)
      .prev()
      .val(num);
    TotalPrice();
  });
  //减的效果
  $(".product-jian").click(function() {
    var n = $(this)
      .next()
      .val();
    var num = parseInt(n) - 1;
    if (num == 0) {
      return;
    }
    $(this)
      .next()
      .val(num);
    TotalPrice();
  });

  $(".product-ckb").click(function() {
    $(this)
      .children("em")
      .toggleClass("product-xz");
    TotalPrice();
    productxz();
  });
  //全选产品
  $(".product-al").click(function() {
    var fxk = $(".product-em");
    var qx = $(".product-all em");
    qx.toggleClass("product-all-on");
    if (
      $(this)
        .find(".product-all em")
        .is(".product-all-on")
    ) {
      fxk.addClass("product-xz");
    } else {
      fxk.removeClass("product-xz");
    }
    TotalPrice();
    shuliang();
  });
  //删除产品
  // $(".product-del").click(function() {
  //   if (confirm("您确定要删除当前商品？")) {
  //     $(this)
  //       .closest(".product-box")
  //       .remove();
  //   }

  //   koncat();
  //   TotalPrice();
  //   shuliang();
  // });

  TotalPrice();
  shuliang();
  koncat();
});
//选中产品
function productxz() {
  var xz = $(".product-em");
  var xz1 = $(".product-xz");
  if (xz1.length == xz.length) {
    $(".product-all em").addClass("product-all-on");
  } else {
    $(".product-all em").removeClass("product-all-on");
  }
  shuliang();
  TotalPrice();
}
//计算产品价格
function TotalPrice() {
  //总价
  var total = 0;
  $(".product-em").each(function() {
    if ($(this).is(".product-xz")) {
      var price = parseInt(
        $(this)
          .parents(".product-ckb")
          .siblings()
          .find(".price")
          .text()
      ); //得到产品单价
      var slproice = parseInt(
        $(this)
          .parents(".product-ckb")
          .siblings()
          .find(".product-num")
          .val()
      ); //得到产品数量
      var dgtotal = price * slproice;
      total += dgtotal;
    }
    $(".all-price").text(total.toFixed(2)); //输出全部总价
  });
}
//获取选择产品数量
function shuliang() {
  $(".product-all-sl").text("");
  var cd = $(".product-xz").length;
  $(".product-all-sl").text(cd);

  if (cd > 0) {
    $(".product-all-qx").text("已选");
    $(".all-sl").css("display", "inline-block");
    $(".product-sett").removeClass("product-sett-a");
  } else {
    $(".product-all-qx").text("全选");
    $(".all-sl").css("display", "none");
    $(".product-sett").addClass("product-sett-a");
  }
}
//购物车空
function koncat() {
  var pic = $(".product-box").length;
  if (pic <= 0) {
    $(".all-price").text("0.00");
    $(".product-all-qx").text("全选");
    $(".all-sl").css("display", "none");
    $(".product-sett").addClass("product-sett-a");
    $(".product-all em").removeClass("product-all-on");
    $(".kon-cat").css("display", "block");
  } else {
    $(".kon-cat").css("display", "none");
  }
}

// 删除接口 deleteProduct数据
// 利用事件委托选择到删除按钮所在ul
function dels(productId) {
  $(".address-box  .product-box .product-del").on(
    "click",
    ".deletedImg ",
    function() {
      confirm("您确定要删除当前商品？", function(s) {
        if (s == true) {
          $.ajax({
            url: "https://kidstoms.com/deleteProduct",
            type: "post",
            dataType: "json",
            data: {
              openId: localStorage.getItem("openId"),
              productId: productId
            },
            success: function(res) {
              console.log(res);
              if (res.code == "200") {
                alert(res.data.msg);
              }
            }
          });
          // remove();
        } else {
          // closest(".product-box");
        }
      });
      // if (confirm("您确定要删除当前商品？")) {
      //   $(this)
      //     .closest(".product-box")
      //     .remove();
      // }
      // $.ajax({
      //   url: "https://kidstoms.com/deleteProduct",
      //   type: "post",
      //   dataType: "json",
      //   data: {
      //     openId: localStorage.getItem("openId"),
      //     productId: productId
      //   },
      //   success: function(res) {
      //     // res就是后台接口返回的数据
      //     console.log(res);
      //     if(res.code == "200") {

      //     }
      //   }
      // });
    }
  );
}

// function DelShop(productId) {
// let productId = res.data.productList.productId;
// console.log(productId);

// $.ajax({
//   url: "https://kidstoms.com/deleteProduct",
//   type: "post",
//   dataType: "json",
//   data: {
//     openId: localStorage.getItem("openId"),
//     productId: productId.substr(0, 8)
//   },
//   success: function(res) {
//     // res就是后台接口返回的数据
//     console.log(res);

//   }
// });
// }

// 点击购物车  调queryShopCart接口
function getList() {
  let openId = localStorage.getItem("openId");
  // 获取数据渲染数据到页面
  $.ajax({
    url: "https://kidstoms.com/queryShopCart",
    type: "post",
    dataType: "json",
    data: {
      openId: openId
    },
    success: function(res) {
      console.log(res);
      if (res.code == "200") {
        // var data = res.data;
        var result = res.data.productList;
        var amounts = res.data.amounts;
        console.log(amounts);
        var htmls = template("addressTpl", {
          result: result,
          amounts: amounts
        });
        $(".address-box").html(htmls);
      }

      // 列表
      // var menu = res.data.productList;
      // console.log(menu);
      // // 数量
      // var menus = res.data.amounts;
      // console.log('测试',menus);
      // // 图片
      // var len = res.data.productList[0].productImages;
      // console.log(len);
      // for (var i = 0; i < menu.length; i++) {
      //   // 标题 簡介 价格 数量 图片
      //   $(".productName").html(menu[i].productName);
      //   $(".productDesc").html(menu[i].productDesc);
      //   $(".salePrice").html(menu[i].salePrice);
      //   $(".amounts").html(menus,88880001);
      //   // $(".productImages").html(len[i]);
      //   var html = "";
      //   for (var i = 0; i < len.length; i++) {
      //     var imgI = len[i];
      //     html += "<img src=" + imgI + "/>";
      //   }
      //   console.log(imgI);
      //   console.log(html);
      //   var a = $(".productImages").html(html);
      //   console.log(a);
      // }
      // $(".jd_shop_con").css("display", "block");

      // console.log(imgses);
      // let productList = res.data.productList;
      // console.log(productList);
      // let amounts = res.data.amounts;
      // console.log(amounts);
      // var html = "";
      // // 图片
      // var len = res.data.productList[0].productImages;
      // for (var i = 0; i < len.length; i++) {
      //   console.log('图片',len[i]);

      // }
      // $(".productImages").attr(
      //   "src",
      //   "https://kidstoms.com/tea/img/xiaoqinggan-chenpipuer-98/xiaoqinggan_02.jpg"
      // );

      // for (var i = 0; i < productList.length; i++) {
      //   let product = productList[i];
      //   // 标题 簡介 价格 数量 图片
      //   $(".productName").html(product.productName);
      //   $(".productDesc").html(product.productDesc);
      //   $(".salePrice").html(product.salePrice);
      //   // let amount = amounts[i];
      //   // let productId = product.productId;
      //   // $(".amounts").html(amount[productId]);
      //   let productImages = product.productImages;
      //   let imgI = productImages[0];
      //   html += "< img src=" + imgI + "/>";
      //   $(".productImages").html(html);
      //   console.log(html);
      //   // for (var i = 0; i < productImages.length; i++) {
      //   //   let imgI = productImages[i];
      //   // }
      //   // $(".productImages").html(html);
      // }
      // $(".jd_shop_con").css("display", "block");
    }
  });
}

$(document).ready(function() {
  getList();
});
