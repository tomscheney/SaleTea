let telephone = window.localStorage.getItem("telephone");
let desc = window.localStorage.getItem("recommendDesc");
let search = location.search;
let list = search.split("=");
let productId = list[1];
let openId = window.localStorage.getItem("openId");
console.log(telephone);
console.log(search);
console.log(list);
console.log(productId);
console.log(openId);
var linkUrl = ''
var descList = null;

// 点击立即购买
function buyNow(productId) {
    if (
        window.localStorage.getItem("telephone") == "" ||
        window.localStorage.getItem("telephone") == null ||
        window.localStorage.getItem("telephone") == undefined
    ) {
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
        success: function (res) {
            if (res.code === "200") {
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
$("#btn-car2").click(function () {
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
        success: function (res) {
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
            var featur = "";
            for (var i = 0; i < fea.length; i++) {
                var feaI = fea[i];
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
            var recomend = "<";
            for (var index = 0; index < recom.length; index++) {
                var recomI = recom[index];
                recomend +=
                    "<div class='like-1' onclick='getRecommendProductId(index)'" +
                    '<div class="like-1-img">' +
                    "<img src=" +
                    recomI.recommendCover +
                    "/>" +
                    "</div>" +
                    "<p class='recommendDesc'>" +
                    recomI.recommendDesc +
                    "</p>" +
                    '<p style="color: red;">' +
                    recomI.recommendPrice +
                    "元/份" +
                    "</p>" +
                    "</div>";
            }
            $(".like-spot").after(recomend);

        }
    });
}


$(document).ready(function () {

  getProductDetail();


});

// 点击猜你喜欢按钮 调getProductByDesc接口
function getRecommendProductId(index) {

  let  recommendDesc = descList[index].recommendDesc;
    $.ajax({
        url: "https://kidstoms.com/getProductByDesc",
        type: "post",
        dataType: "json",
        data: {
            desc: recommendDesc
        },
        success: function (res) {
            if (res.code == "200") {
                var productIdDesc = res.data.productId;
                window.localStorage.setItem("productIdDesc", productIdDesc);
                location.href = "product.html?productIdDesc=" + productIdDesc;
            }
        }
    });
}

$(function () {
    wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
        wx.updateAppMessageShareData({
            title: '芷贤斋精选', // 分享标题
            desc: '芷贤斋精选礼品,精心为您呈上', // 分享描述
            link: 'https://kidstoms.com/tea/H5/product.html?productId=' + productId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: linkUrl, // 分享图标
            success: function () {
                // 设置成功
                alert('分享成功')
            },
            cancel: function () {
                alert('分享取消')

            },
            fail: function () {
                alert('分享失败')

            },
            complete: function () {
                alert('分享完成')

            },
            trigger: function () {
                alert('点击了分享菜单')

            }
        })
    });

    wx.ready(function () {      //需在用户可能点击分享按钮前就先调用
        wx.updateTimelineShareData({
            title: '芷贤斋精选', // 分享标题
            link: 'https://kidstoms.com/tea/H5/product.html?productId=' + productId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: linkUrl, // 分享图标
            success: function () {
                // 设置成功
                alert('分享成功')
            },
            cancel: function () {
                alert('分享取消')

            },
            fail: function () {
                alert('分享失败')

            },
            complete: function () {
                alert('分享完成')

            },
            trigger: function () {
                alert('点击了分享菜单')

            }
        })
    });
})
