let telephone = window.localStorage.getItem("telephone");
let search = location.search;
let list = search.split("=");
let productId = list[1];
let openId = window.localStorage.getItem("openId");
console.log(telephone);
console.log(search);
console.log(list);
console.log(productId);
console.log(openId);

var descList = null;
console.log(descList);

// 点击立即购买
function buyNow(productId) {
  if (this.telephone == "" || this.telephone == null) {
    location.href = "phoneChecking.html?productId=" + productId;
  } else {
    location.href = "confirmOrder.html?productId=" + productId;
  }
}

// 点击购物车图标
function shopCart() {
  location.href =
    "shopCar.html?openId=" + window.localStorage.getItem("openId");
  // location.href = "shopCar.html";
}

// 点击加入购物车 调addToShopCart接口
function addShopCart() {
  let params = location.search.split("=");
  let productId = params[1];
  $.ajax({
    url: "https://kidstoms.com/addToShopCart",
    type: "post",
    dataType: "json",
    data: {
      openId: window.localStorage.getItem("openId"),
      // productId:location.search.substr(1, 8)
      productId: productId.substr(0, 8)
    },
    success: function(res) {
      console.log(res);
      // res就是后台接口返回的数据
      if (res.code === "200") {
        // alert(res.data.msg);
        console.log(13121212);
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
    url: "https://kidstoms.com/getProductDetail",
    type: "post",
    dataType: "json",
    data: {
      productId: productId
    },
    success: function(res) {
      descList = res;
      console.log(res);
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
      // console.log(len)
      for (var i = 0; i < len.length; i++) {
        var imgI = len[i];
        html +=
          '<div class="swiper-slide">' + "<img src=" + imgI + "/>" + "</div>";
      }
      $(".swiper-wrapper").html(html);
      // 动态获取数据后 渲染插件
      swiper_init();
      // console.log($(".swiper-wrapper").html(html));
      $(".qualityPeriod").text(res.data.productDetail.qualityPeriod);
      $(".standards").text(res.data.productDetail.standards);
      // 产品亮点
      var fea = [];
      fea = res.data.productFeatures;
      var featur = "";
      // console.log(fea)
      for (var i = 0; i < fea.length; i++) {
        var feaI = fea[i];
        // console.log(feaI);
        featur +=
          ' <div class="Bright-spot-1">' +
          ' <div class="Bright-spot-1-l">' +
          "<img src=" +
          feaI.featureImg +
          "/>" +
          "</div>" +
          ' <div class="Bright-spot-1-r">' +
          "<span>" +
          feaI.featureDesc +
          "</span>" +
          "</div>" +
          "</div>";
      }
      $(".bling-spot").after(featur);

      // 猜你喜欢
      var recom = [];
      recom = res.data.productRecommend;
      var recomend = "";
      // console.log(recom)
      for (var i = 0; i < recom.length; i++) {
        var recomI = recom[i];
        // console.log(recomI);
        recomend +=
          '<div class="like-1" onclick="imgbtn()">' +
          '<div class="like-1-img">' +
          "<img src=" +
          recomI.recommendCover +
          "/>" +
          "</div>" +
          "<p>" +
          recomI.recommendDesc +
          "</p>" +
          '<p style="color: red;">' +
          recomI.recommendPrice +
          "元/份" +
          "</p>" +
          "</div>";
      }
      $(".like-spot").after(recomend);
      // console.log(recomend)
    }
  });
}
$(document).ready(function() {
  getProductDetail();
});

// 点击猜你喜欢按钮 调getProductByDesc接口
function imgbtn() {
  console.log(descList);
  $.ajax({
    url: "https://kidstoms.com/getProductByDesc",
    type: "post",
    dataType: "json",
    data: {
      desc: res.data.productDesc
    },
    success: function(res) {
      console.log(res);
      if (res.code == "200") {
        window.location.href = "product.html";
        swiper_init();
        getProductDetail();
      }
    }
  });
}
