
// // 保存并返回
// function newAdd() {
//   var userName = $("#name").val(); // 都按这获取
//   var telephone = $("#phone").val();
//   var address = $("#address").val();
//   console.log("用户名", userName);
//   console.log("手机号", telephone);
//   console.log("地址", address);

//   $.ajax({
//     url: "https://47.112.98.24:8090/saveUser",
//     type: "post",
//     // processData: false,
//     dataType: "json",
//     contentType: "application/json",
//     data: JSON.stringify({
//       userName: userName,
//       telephone: telephone,
//       address: address
//     }),
//     success: function(data) {
//       console.log(2);
//       if (userName != "" && telephone != "" && address != "") {
//         console.log(data);
//         console.log(1);
//         // location.href = "new-add.html";
//       }
//     },
//     error: function(data) {
//       console.log(103);
//       // $('#serverResponse').html(data.userName + " : " + data.telephone + " : " + data.address);
//     }
//   });
// }
// function newADd() {
//   location.href = "add-address.html";
// }
