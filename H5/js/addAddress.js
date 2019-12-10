let search = location.search;
let list = search.split("=");
let productId = list[1];
let openId = window.localStorage.getItem("openId");
console.log(search);
console.log(list);
console.log(productId);
console.log(openId);

// 获取指定用户所有地址 调getAllAddressByOpenId接口
$(function() {
  $.ajax({
    url: "https://kidstoms.com/getAllAddressByOpenId",
    type: "post",
    dataType: "json",
    data: {
      openId: window.localStorage.getItem("openId")
    },
    success: function(res) {
      console.log(res);
      var result = res.data;
      var html = template("addressTemplate", { result: result });
      console.log(html);
      $(".address-box").html(html);
    }
  });
});

// 点击删除按钮 调deleteAddressByTelephone接口
function deletes() {
  var r = confirm("您确定要删除当前商品？");
  if (r == true) {
    $.ajax({
      url: "https://kidstoms.com/deleteAddressByTelephone",
      type: "post",
      dataType: "json",
      data: {
        openId: window.localStorage.getItem("openId"),
        telephone: window.localStorage.getItem("telephone")
      },
      success: function(res) {
        console.log(res);
        var result = res.data;
        var html = template("addressTemplate", { result: result });
        console.log(html);
        $(".address-box").html(html);
      }
    });
  }

  // $.ajax({
  //   url: "https://kidstoms.com/deleteAddressByTelephone",
  //   type: "post",
  //   dataType: "json",
  //   data: {
  //     openId: window.localStorage.getItem("openId"),
  //     telephone: window.localStorage.getItem("telephone")
  //   },
  //   success: function(res) {
  //     console.log(res);
  //     var result = res.data;
  //     var html = template("addressTemplate", { result: result });
  //     console.log(html);
  //     $(".address-box").html(html);
  //   }
  // });
}

function ad() {
  location.href = "address.html";
}

function add() {
  location.href = "ReceivingAddress.html";
}
