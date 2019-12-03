// 方法
function first() {
  // 获取地址栏中的字符串，并将其转化为对象
  function addr_obj() {
    let search = location.search;
    cosnole.log(search);
    let obj = {};
    cnsole.log(obj);
    let keyValues = search.slice(1).split("&");
    console.log(keyValues);
    keyValues.forEach(function(keyValue) {
      let tempArr = keyValue.split("=");
      let key = tempArr[0];
      // var value = tempArr[1].indexOf("|") > 0 ? tempArr[1].split("|") : tempArr[1];
      let value = tempArr[1];
      obj[key] = value;
    });
    return obj;
  }
  let obj = addr_obj();
  console.log(obj.code);
  //code 无值，
  if (obj.code == "" || obj.code == undefined || obj.code == "null") {
    console.log("123");
    let appid = "wx6e974f12e898a2ee";
    let redirect_uri = "https://kidstoms.com/tea/index.html";
    let response_type = "code";
    let state = "STATE#wechat_redirect";
    let scope = "snsapi_base";
    let result =
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
      appid +
      "&redirect_uri=" +
      redirect_uri +
      "&response_type=" +
      response_type +
      "&scope=" +
      scope +
      "&state=" +
      state;
    window.location.href = result;
    return;
  }
  console.log(obj.code);
  let code = obj.code;
  // 获取
  let openId = window.localStorage.getItem("openId");

  // 判断openId是否存在
  if (openId == "" || openId == undefined || openId == "null") {
    openId();
  } else {
    window.location.href = "H5/home.html";
  }
  console.log(code);

  function getopenId() {
    console.log(code);
    // 查询openId
    $.ajax({
      url: "https://kidstoms.com/getOpenIdByCode",
      type: "get",
      dataType: "json",
      data: {
        code: code
      },
      success: function(res) {
        if (res.code === 200) {
          // alert("openid" + JSON.stringify(res.data.openId));
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
}

// 获取全部数据
function getProductList() {
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
      console.log(products);
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

$(document).ready(function() {
  console.log("所有chanp!");
  getProductList();
});
