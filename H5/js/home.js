
// 获取全部数据
function getProductList(){
    let openId=window.localStorage.getItem('openId');
    console.log(openId)
    $.ajax({
        url: "https://kidstoms.com/getAllProduct",
        type: "post",
        dataType: "json",
        data: {},
        success: function (res) { // res就是后台接口返回的数据
            console.log(res)
            console.log(res.data)
            console.log(products)
            // 标题
            var products = res.data;
            var html = "";
            for (var i = 0; i < products.length; i++) {
                var product = products[i];
                var imgI = product.productImages[0];

                html += '<li class="tea" id=' + product.productId + '>' +
                    '<div class="tea-img">' +
                    '<img src=' + imgI + '/>' +
                    '</div>' +
                    '<p class="tea_title">' + product.productName + '</p>' +
                    '<p class="tea_contect">' + product.productDesc + '</p>' +
                    '<hr class="hr-1">' +
                    '</li>';
                // for ( k=0;k<proId.length;k++){
                // 	console.log(proId[k])
                // }
            }
            $(".product_list>ul").html(html);
            $('.product_list>ul>li').click(function (e) {
                console.log('qqqqqqqq')
                console.log(e.currentTarget.id)
                window.location.href = "product.html?productId=" + e.currentTarget.id
            });
        },
        error: function data() {
            console.log("dataerro", data);
        }
    })
}

$(document).ready(function () {
    console.log("所有chanp!")
    getProductList();
})
