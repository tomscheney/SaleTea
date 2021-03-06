let telephone = window.localStorage.getItem("telephone");
console.log(telephone);
let desc = window.localStorage.getItem("recommendDesc");
console.log(desc);
let search = location.search;
console.log(search);
let list = search.split("&");
console.log(list);
let product = list[0];
console.log(product);
let productId = product.split("=")[1];
console.log(productId);
let openId = window.localStorage.getItem("openId");
console.log(openId);
let href = window.location.href;
console.log(href);
let hrefDemo = window.location.href.split("#")[0];
console.log(hrefDemo);

var linkUrl = "";
var descList = null;

// 点击立即购买
function buyNow(productId) {
  var ua = navigator.userAgent.toLowerCase();
  var isWeixin = ua.indexOf("micromessenger") != -1;
  if (isWeixin) {
    location.href = "confirmOrder.html?productId=" + productId;
  } else {
    if (
      window.localStorage.getItem("telephone") == "" ||
      window.localStorage.getItem("telephone") == null ||
      window.localStorage.getItem("telephone") == undefined
    ) {
      location.href = "phoneChecking.html?";
    } else {
      location.href = "confirmOrder.html?productId=" + productId;
    }
  }
}

// 点击购物车图标
function shopCart() {
  location.href =
    "shopCar.html?openId=" + window.localStorage.getItem("openId");
}

// 点击加入购物车 调addToShopCart接口
function addShopCart() {
  window.location.reload();
  // $("#spanNum").html(window.localStorage.getItem("Length"));

  let params = location.search.split("=");
  let productId = params[1];
  $.ajax({
    url: "https://zhixianzhai.com/addToShopCart",
    type: "post",
    dataType: "json",
    data: {
      openId: window.localStorage.getItem("openId"),
      // productId:location.search.substr(1, 8)
      productId: productId.substr(0, 8)
    },
    success: function(res) {
      if (res.code === "200") {
      }
    }
  });
}

// 点击购物车获取所有商品  调queryShopCart接口
function getList() {
  let openId = localStorage.getItem("openId");
  // 获取数据渲染数据到页面
  $.ajax({
    url: "https://zhixianzhai.com/queryShopCart",
    type: "post",
    dataType: "json",
    data: {
      openId: openId
    },
    success: function(res) {
      if (res.code == "200") {
        console.log(res);
        var result = res.data.productList;
        console.log(result);

        // 数组长度
        function getJsonLength() {
          var jsonLength = 0;
          for (var jsonLength in result) {
            jsonLength++;
          }
          return jsonLength;
        }
        let Length = getJsonLength();
        console.log(Length);
        window.localStorage.setItem("Length", Length);
      }
    }
  });
}

// 调用轮播图
function swiper_init() {
  var mySwiper = new Swiper(".swiper-container", {
    observer: true, //修改swiper自己或子元素时，自动初始化swiper
    observeParents: true, //修改swiper的父元素时，自动初始化swiper
    loop: true, // 循环模式选项
    autoplay: true, //等同于以下设置
    pagination: {
      el: ".swiper-pagination" // 分页器
    }
  });
}

// 点击显示 添加数据到接口
$("#btn-car2").click(function() {
  AddShop(); //添加产品
  $(".yuan").show();
  $("#num").show();
  $(".jia1").show(100);
  $(".jia1")
    .show()
    .delay(1000)
    .fadeOut();
});

// 获取产品详情  getProductDetail接口
function getProductDetail() {
  $.ajax({
    url: "https://zhixianzhai.com/getProductDetail",
    type: "post",
    dataType: "json",
    data: {
      productId: productId
    },
    success: function(res) {
      console.log(res);
      // 产品描述
      var productDesc = res.data.productDesc;
      console.log(productDesc);
      window.localStorage.setItem("productDesc", productDesc);

      descList = res.data.productRecommend;
      // 商品简介
      var recommendDesc = res.data.productRecommend[0].recommendDesc;
      window.localStorage.setItem("recommendDesc", recommendDesc);

      linkUrl = res.data.productImages[0];
      // 标题 价格
      $(".tit-name").text(res.data.productDesc);
      $(".tit-price").text(res.data.salePrice + "元 / 份");
      // 产品信息
      $(".productPlace").text(res.data.productDetail.productPlace);
      $(".wrapping").text(res.data.productDetail.wrapping);
      $(".brand").text(res.data.productDetail.brand);
      var len = [];
      len = res.data.productImages;
      var html = "";
      for (var i = 0; i < len.length; i++) {
        var imgI = len[i];
        html +=
          '<div class="swiper-slide">' + "<img src=" + imgI + "/>" + "</div>";
      }
      $(".swiper-wrapper").html(html);
      // 动态获取数据后 渲染插件
      swiper_init();
      $(".qualityPeriod").text(res.data.productDetail.qualityPeriod);
      $(".standards").text(res.data.productDetail.standards);
      // 产品亮点
      var fea = [];
      fea = res.data.productFeatures;
      var featur = template("featureTpl", { result: fea });
      $(".bling-spot").after(featur);

      // 猜你喜欢
      var productRecommend = res.data.productRecommend;
      let recomend = template("recommendTpl", { result: productRecommend });
      $(".like-spot").after(recomend);
    }
  });
}

$(document).ready(function() {
  $("#spanNum").html(window.localStorage.getItem("Length"));
  getList();
  getProductDetail();
});

// 点击猜你喜欢按钮 调getProductByDesc接口
function getRecommendProductId(index) {
  let recommendDesc = descList[index].recommendDesc;
  $.ajax({
    url: "https://zhixianzhai.com/getProductByDesc",
    type: "post",
    dataType: "json",
    data: {
      desc: recommendDesc
    },
    success: function(res) {
      if (res.data != null) {
        var productIdDesc = res.data.productId;
        window.localStorage.setItem("productIdDesc", productIdDesc);
        location.href = "product.html?productIdDesc=" + productIdDesc;
      }
    }
  });
}

// 分享
$(function() {
  $.ajax({
    url: "https://zhixianzhai.com/getShareConfiguration",
    type: "post",
    data: {
      // shareUrl: "https://zhixianzhai.com/tea/H5/product.html?productId=88880008" ,
      shareUrl: href // 获取页面当前链接
    },
    dataType: "json",
    success: function(res) {
      console.log(res);
      let timestamp = res.data.timestamp;
      let nonceStr = res.data.nonceStr;
      let signature = res.data.signature;
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: "wx6e974f12e898a2ee", // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名
        jsapi_ticket: res.data.jsapi_ticket,
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareQQ",
          "onMenuShareAppMessage"
        ] // 必填，需要使用的JS接口列表
      });
    }
  });

  wx.ready(function() {
    //需在用户可能点击分享按钮前就先调用
    wx.onMenuShareAppMessage({
      title: "芷贤斋精选", // 分享标题
      desc: window.localStorage.getItem("productDesc"), // 分享描述
      link: "https://zhixianzhai.com/tea/H5/product.html?productId=" + productId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: linkUrl, // 分享图标
      success: function() {
        // 设置成功
        alert("分享成功");
      },
      cancel: function() {
        alert("分享取消");
      },
      fail: function() {
        alert("分享失败");
      },
      complete: function() {
        alert("分享完成");
      }
      // trigger: function() {
      //   alert("点击了分享菜单");
      // }
    });
  });

  wx.ready(function() {
    //需在用户可能点击分享按钮前就先调用
    wx.onMenuShareTimeline({
      title: "芷贤斋精选", // 分享标题
      link: "https://zhixianzhai.com/tea/H5/product.html?productId=" + productId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: linkUrl, // 分享图标
      success: function() {
        // 设置成功
        alert("分享成功");
      },
      cancel: function() {
        alert("分享取消");
      },
      fail: function() {
        alert("分享失败");
      },
      complete: function() {
        alert("分享完成");
      }
      // trigger: function() {
      //   alert("点击了分享菜单");
      // }
    });
  });
});
