let openId = window.localStorage.getItem("openId");
console.log(openId);
let params = location.search.split("=");
let productId = params[1];

$(function () {
    //   //加的效果
    $(".product-add").click(function () {
        var n = $(this)
            .prev()
            .val();
        var num = parseInt(n) + 1;
        if (num == 99) {
            return;
        }
        $(this)
            .prev()
            .val(num);
        TotalPrice();
    });

    //减的效果
    $(".product-jian").click(function () {
        var n = $(this)
            .next()
            .val();
        var num = parseInt(n) - 1;
        if (num == 0) {
            return;
        }
        $(this)
            .next()
            .val(num);
        TotalPrice();
    });

    //删除产品
    $(".product-ckb").click(function () {
        $(this)
            .children("em")
            .toggleClass("product-xz");
        TotalPrice();
        productxz();
    });
    //全选产品
    $(".product-al").click(function () {
        var fxk = $(".product-em");
        var qx = $(".product-all em");
        qx.toggleClass("product-all-on");
        if (
            $(this)
                .find(".product-all em")
                .is(".product-all-on")
        ) {
            fxk.addClass("product-xz");
        } else {
            fxk.removeClass("product-xz");
        }
        TotalPrice();
        shuliang();
    });
    //删除产品
    $(".product-del").click(function () {
        if (confirm("您确定要删除当前商品？")) {
            $(this)
                .closest(".product-box")
                .remove();
        }

        koncat();
        TotalPrice();
        shuliang();
    });

    //单选
    $(".product-em").click(function () {
            var xz = $(".product-em");
            var xz1 = $(".product-xz");
            if (xz1.length == xz.length) {
                $(".product-all em").addClass("product-all-on");
            } else {
                $(".product-all em").removeClass("product-all-on");
            }

            if ($(this).hasClass('product-xz')) {
                $(this).removeClass("product-xz")
            } else {
                $(this).addClass("product-xz")
            }

            shuliang();
            TotalPrice();

        }
    );
    TotalPrice();
    shuliang();
    koncat();

});

//选中产品
function selectProduct(index) {
    var list = $(".product-ckb").classList;
    if (
        $(this)
            .find(".product-em .product-xz")
    ) {
        $(".product-em")[index].removeClass("product-xz");

    } else {
        $(".product-em")[index].addClass("product-xz");
    }
    shuliang();
    TotalPrice();
}

//计算产品价格
function TotalPrice() {
    //总价
    var total = 0;
    $(".product-em").each(function () {
        if ($(this).is(".product-xz")) {
            var price = parseInt(
                $(this)
                    .parents(".product-ckb")
                    .siblings()
                    .find(".price")
                    .text()
            ); //得到产品单价
            var slproice = parseInt(
                $(this)
                    .parents(".product-ckb")
                    .siblings()
                    .find(".product-num")
                    .val()
            ); //得到产品数量
            var dgtotal = price * slproice;
            total += dgtotal;
        }
        $(".all-price").text(total.toFixed(2)); //输出全部总价
    });
}

// 选中商品单个选择框
function productxz(index) {
    $(".address-box  .product-box .product-ckb").on(
        "click",
        function () {
            var xz = $(".product-em");
            var xz1 = $(".product-xz");
            if (xz1.length == xz.length) {
                $(".product-all em").addClass("product-all-on");
            } else {
                $(".product-all em").removeClass("product-all-on");
            }

            if($(this).prop("class","product-xz")){
                $(this).prop()
            }else{

            }

            shuliang();
            TotalPrice();



            $('').on('click',function(){

                if($(this).prop()){

                }else{

                }
            })

        }
    );


}

//获取选择产品数量
function shuliang() {
    $(".product-all-sl").text("");
    var cd = $(".product-xz").length;
    $(".product-all-sl").text(cd);

    if (cd > 0) {
        $(".product-all-qx").text("已选");
        $(".all-sl").css("display", "inline-block");
        $(".product-sett").removeClass("product-sett-a");
    } else {
        $(".product-all-qx").text("全选");
        $(".all-sl").css("display", "none");
        $(".product-sett").addClass("product-sett-a");
    }
}

//购物车空
function koncat() {
    var pic = $(".product-box").length;
    if (pic <= 0) {
        $(".all-price").text("0.00");
        $(".product-all-qx").text("全选");
        $(".all-sl").css("display", "none");
        $(".product-sett").addClass("product-sett-a");
        $(".product-all em").removeClass("product-all-on");
        $(".kon-cat").css("display", "block");
    } else {
        $(".kon-cat").css("display", "none");
    }
}

// 删除接口 deleteProduct数据
// 利用事件委托选择到删除按钮所在ul
function dels(productId) {
    var r = confirm("您确定要删除当前商品？");
    if (r == true) {
        $.ajax({
            url: "https://kidstoms.com/deleteProduct",
            type: "post",
            dataType: "json",
            data: {
                openId: localStorage.getItem("openId"),
                productId: productId
            },
            success: function (res) {
                // res就是后台接口返回的数据
                console.log(res);
                if (res.code == "200") {
                    getList();
                }
            }
        });
    }
}

// 点击购物车  调queryShopCart接口
function getList() {
    let openId = localStorage.getItem("openId");
    // 获取数据渲染数据到页面
    $.ajax({
        url: "https://kidstoms.com/queryShopCart",
        type: "post",
        dataType: "json",
        data: {
            openId: openId
        },
        success: function (res) {
            console.log(res);
            if (res.code == "200") {
                // var data = res.data;
                var result = res.data.productList;
                var amounts = res.data.amounts;
                console.log(amounts);
                var htmls = template("addressTpl", {
                    result: result,
                    amounts: amounts
                });
                $(".address-box").html(htmls);
            }
        }
    });
}

// 点击减号（-）的时候 调 reduceProductAmount接口
function reduce(index, productId) {

    let elements = document.getElementsByClassName("product-num");
    let ele = elements[index]
    let value = ele.value

    if (value <= 1) {
        return;
    }
    $.ajax({
        url: "https://kidstoms.com/reduceProductAmount",
        type: "post",
        dataType: "json",
        data: {
            openId: localStorage.getItem("openId"),
            productId: productId
        },
        success: function (res) {

            let num = parseInt(value) - 1;
            ele.value = num;
            TotalPrice()
        }
    });

}

// 点击加号（+）的时候 调 addToShopCart接口
function add(index, productId) {
    $.ajax({
        url: "https://kidstoms.com/addToShopCart",
        type: "post",
        dataType: "json",
        data: {
            openId: localStorage.getItem("openId"),
            productId: productId
        },
        success: function (res) {
            console.log(res);
            if (res.code == "200") {
                let elements = document.getElementsByClassName("product-num");
                let ele = elements[index]
                let value = ele.value
                let num = parseInt(value) + 1;

                ele.value = num;

            }
        }
    });
}

$(document).ready(function () {
    getList();
});

