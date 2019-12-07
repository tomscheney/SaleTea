// $(function() {
//   $(".selectList").each(function() {
//     var url = "address.json";
//     var addressJson;
//     var temp_html;
//     var oProvince = $(this).find(".province");
//     var oCity = $(this).find(".city");
//     var oDistrict = $(this).find(".district");
//     //初始化省
//     var province = function() {
//       $.each(addressJson, function(i, province) {
//         temp_html +=
//           "<option value='" + province.p + "'>" + province.p + "</option>";
//       });
//       oProvince.html(temp_html);
//       city();
//     };
//     //赋值市
//     var city = function() {
//       temp_html = "";
//       var n = oProvince.get(0).selectedIndex;
//       $.each(addressJson[n].c, function(i, city) {
//         temp_html += "<option value='" + city.ct + "'>" + city.ct + "</option>";
//       });
//       oCity.html(temp_html);
//       district();
//     };
//     //赋值县
//     var district = function() {
//       temp_html = "";
//       var m = oProvince.get(0).selectedIndex;
//       var n = oCity.get(0).selectedIndex;
//       if (typeof addressJson[m].c[n].d == "undefined") {
//         oDistrict.css("display", "none");
//       } else {
//         oDistrict.css("display", "inline");
//         $.each(addressJson[m].c[n].d, function(i, district) {
//           temp_html +=
//             "<option value='" + district.dt + "'>" + district.dt + "</option>";
//         });
//         oDistrict.html(temp_html);
//       }
//     };
//     //选择省改变市
//     oProvince.change(function() {
//       city();
//     });
//     //选择市改变县
//     oCity.change(function() {
//       district();
//     });
//     //获取json数据
//     $.getJSON(url, function(data) {
//       addressJson = data;
//       province();
//     });
//   });
// });

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
