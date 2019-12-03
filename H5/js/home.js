// 获取全部数据
function getProductList() {
  // 获取地址栏中的字符串，并将其转化为对象
  let openId = window.localStorage.getItem("openId");
  $.ajax({
    url: "https://kidstoms.com/getAllProduct",
    type: "post",
    dataType: "json",
    data: {},
    success: function(res) {
      // res就是后台接口返回的数据
      console.log(res);
      console.log(res.data);
      // 标题
      var products = res.data;
      var html = "";
      for (var i = 0; i < products.length; i++) {
        var product = products[i];
        var imgI = product.productImages[0];
        html +=
          '<li class="tea" id=' +
          product.productId +
          ">" +
          '<div class="tea-img">' +
          "<img src=" +
          imgI +
          "/>" +
          "</div>" +
          '<p class="tea_title">' +
          product.productName +
          "</p>" +
          '<p class="tea_contect">' +
          product.productDesc +
          "</p>" +
          '<hr class="hr-1">' +
          "</li>";
        // for ( k=0;k<proId.length;k++){
        // 	console.log(proId[k])
        // }
      }
      $(".product_list>ul").html(html);
      $(".product_list>ul>li").click(function(e) {
        console.log("qqqqqqqq");
        console.log(e.currentTarget.id);
        window.location.href = "product.html?productId=" + e.currentTarget.id;
      });
    },
    error: function data() {
      console.log("dataerro", data);
    }
  });
}

$(document).ready(function () {
    console.log("所有chanp!");
    getProductList();

    let openId =  window.localStorage.getItem("openId");

    if (openId === undefined || openId === null){
        getOpenId()
    }

});


function getOpenId() {

    let search = location.search;
    console.log(search);
    let obj = {};
    console.log(obj);
    let keyValues = search.slice(1).split("&");
    console.log(keyValues);
    keyValues.forEach(function (keyValue) {
        let tempArr = keyValue.split("=");
        let key = tempArr[0];
        let value = tempArr[1];
        obj[key] = value;
    });

    console.log(obj.code);

    //code 无值，
    let code = obj.code;
    // 判断openId是否存在
        $.ajax({
            url: "https://kidstoms.com/getOpenIdByCode",
            type: "get",
            dataType: "json",
            data: {
                code:code
            },
            success: function(res) {
                console.log(res);
                if (res.code === "200") {
                    let result = jQuery.parseJSON(res.data);
                    var openId = result.openId;
                    console.log(openId);
                    window.localStorage.setItem("openId", openId);
                    window.location.href = "H5/product.html?openId=" + openId;
                    alert("openid:" + result.openId);
                } else {
                    alert(res.msg);
                }
            },
            error: function() {
                console.log("XMLHttpRequest", XMLHttpRequest);
            }
        });

}


