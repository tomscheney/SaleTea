// let search = location.search;
// let list = search.split("=");
// let productId = list[1];
// let openId = window.localStorage.getItem("openId");
// console.log(search);
// console.log(list);
// console.log(productId);
// console.log(openId);

// // 进入添加地址列表页面就 调getAllAddressByOpenId接口
// $(function() {
//   let params = location.search.split("=");
//   let productId = params[1];
//   $.ajax({
//     url: "https://kidstoms.com/getAllAddressByOpenId",
//     type: "post",
//     dataType: "json",
//     data: {
//       openId: window.localStorage.getItem("openId"),
//       // productId:location.search.substr(1, 8)
//     //   productId: productId.substr(0, 8)
//     },
//     success: function(res) {
//       console.log(res);
//       if (res.code === "200") {

//       }
//     }
//   });
// });

// function ad() {
//   location.href = "address.html";
// }

// function add() {
//   location.href = "ReceivingAddress.html";
// }

$(function() {
  // 获取指定用户所有地址 调getAllAddressByOpenId接口
  $.ajax({
    url: "https://kidstoms.com/getAllAddressByOpenId",
    type: "post",
    dataType: "json",
    data: {
      openId: localStorage.getItem("openId")
    },
    success: function(res) {
      console.log(res);
      if (res.code == "200") {
        // var result = res.data.productList;
        // var amounts = res.data.amounts;
        // console.log(amounts);
        // var htmls = template("addressTpl", {
        //   result: result,
        //   amounts: amounts
        // });
        // $(".address-box").html(htmls);
      }
    }
  });
});
