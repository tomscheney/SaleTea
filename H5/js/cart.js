// 获取地址栏中的字符串，并将其转化为对象
function addr_obj() {
	var search = location.search;
	var obj = {};
	var keyValues = search.slice(1).split("&");
	keyValues.forEach(function(keyValue) {
		var tempArr = keyValue.split("=");
		var key = tempArr[0];
		// var value = tempArr[1].indexOf("|") > 0 ? tempArr[1].split("|") : tempArr[1];
		var value = tempArr[1];
		obj[key] = value;
	});
	return obj;
}
var obj = addr_obj()
var openId = obj.openId;
console.log(openId)
var that;

//取消删除
$('.cancle').on('click', function() {
	$('.jd_win').hide();
	$('.delete_up').css('transform', 'none')
})
//确认删除
$('.submit').on('click', function() {
	that.parent().parent().parent().parent().remove();
	$('.jd_win').hide();
	DelShop();
})


$('.delete').click(function() {
	var t = $(this).parent('td').parent('tr');
	var tt = $(this).parent('td').find('input[class*=text_box]');
	tt.val(0);

	setTotal();
	t.hide();
});

// 数量减
$(".minus").click(function() {
	var t = $(this).parent().find('.am-num-text');
	t.val(parseInt(t.val()) - 1);
	if (t.val() <= 1) {
		t.val(1);
	}
	TotalPrice();
});
// 数量加
$(".plus").click(function() {
	var t = $(this).parent().find('.am-num-text');
	t.val(parseInt(t.val()) + 1);
	if (t.val() <= 1) {
		t.val(1);
	}
	TotalPrice();
});

// background-size: 47px 100px;
// background-position: 25px 0;
// 点击商品按钮
$(".GoodsCheck").click(function() {
	var goods = $(this).closest(".one-shop").find(".GoodsCheck"); //获取本店铺的所有商品
	var goodsC = $(this).closest(".one-shop").find(".GoodsCheck:checked"); //获取本店铺所有被选中的商品
	var Shops = $(this).closest(".one-shop").find(".ShopCheck"); //获取本店铺的全选按钮
	if (goods.length == goodsC.length) { //如果选中的商品等于所有商品
		Shops.prop('checked', true); //店铺全选按钮被选中
		if ($(".ShopCheck").length == $(".ShopCheck:checked").length) { //如果店铺被选中的数量等于所有店铺的数量
			$("#AllCheck").prop('checked', true); //全选按钮被选中
			TotalPrice();
		} else {
			$("#AllCheck").prop('checked', false); //else全选按钮不被选中
			TotalPrice();
		}
	} else { //如果选中的商品不等于所有商品
		Shops.prop('checked', false); //店铺全选按钮不被选中
		$("#AllCheck").prop('checked', false); //全选按钮也不被选中
		// 计算
		TotalPrice();
		// 计算
	}
});
// 点击店铺按钮
$(".ShopCheck").change(function() {
	if ($(this).prop("checked") == true) { //如果店铺按钮被选中
		$(this).parents(".one-shop").find(".goods-check").prop('checked', true); //店铺内的所有商品按钮也被选中
		if ($(".ShopCheck").length == $(".ShopCheck:checked").length) { //如果店铺被选中的数量等于所有店铺的数量
			$("#AllCheck").prop('checked', true); //全选按钮被选中
			TotalPrice();
		} else {
			$("#AllCheck").prop('checked', false); //else全选按钮不被选中
			TotalPrice();
		}
	} else { //如果店铺按钮不被选中
		$(this).parents(".one-shop").find(".goods-check").prop('checked', false); //店铺内的所有商品也不被全选
		$("#AllCheck").prop('checked', false); //全选按钮也不被选中
		TotalPrice();
	}
});
// 点击全选按钮
$("#AllCheck").click(function() {
	if ($(this).prop("checked") == true) { //如果全选按钮被选中
		$(".goods-check").prop('checked', true); //所有按钮都被选中
		TotalPrice();
	} else {
		$(".goods-check").prop('checked', false); //else所有按钮不全选
		TotalPrice();
	}
	$(".ShopCheck").change(); //执行店铺全选的操作
});

function TotalPrice() {
	var allprice = 0; //总价
	$(".one-shop").each(function() { //循环每个店铺
		var oprice = 0; //店铺总价
		$(this).find(".GoodsCheck").each(function() { //循环店铺里面的商品
			if ($(this).is(":checked")) { //如果该商品被选中
				var num = parseInt($(this).parents(".one-goods").find(".am-num-text").val()); //得到商品的数量
				var price = parseFloat($(this).parents(".one-goods").find(".GoodsPrice").text()); //得到商品的单价
				var total = price * num; //计算单个商品的总价
				oprice += total; //计算该店铺的总价
			}
			$(this).closest(".one-shop").find(".ShopTotal").text(oprice.toFixed(2)); //显示被选中商品的店铺总价
		});
		var oneprice = parseFloat($(this).find(".ShopTotal").text()); //得到每个店铺的总价
		allprice += oneprice; //计算所有店铺的总价
	});
	$("#AllTotal").text(allprice.toFixed(2)); //输出全部总价
}

var allprice = 0; //总价
$(".one-shop").each(function() { //循环每个店铺
	var oprice = 0; //店铺总价
	$(this).find(".img_box").each(function() { //循环店铺里面的商品
		if ($(this).is(":checked")) { //如果该商品被选中
			var num = parseInt($(this).parents(".one-goods").find(".am-num-text").val()); //得到商品的数量
			var price = parseFloat($(this).parents(".one-goods").find(".GoodsPrice").text()); //得到商品的单价
			var total = price * num; //计算单个商品的总价
			oprice += total; //计算该店铺的总价
		}
		$(this).closest(".one-shop").find(".ShopTotal").text(oprice.toFixed(2)); //显示被选中商品的店铺总价
	});
	var oneprice = parseFloat($(this).find(".ShopTotal").text()); //得到每个店铺的总价
	allprice += oneprice; //计算所有店铺的总价
});
$("#AllTotal").text(allprice.toFixed(2)); //输出全部总价
// 页面数据为空时 按钮为不可选中状态
$('.p_name').change(function(event) {
/* Act on the event */
var txtVal=$(this).val();
if (txtVal==='') {
    $('#btn-car3').attr('disabled',"true");
}else{
    $('#btn-car3').attr('disabled',"false");
}
});

// 删除接口数据
function DelShop() {
	$.ajax({
		url: "https://kidstoms.com/deleteProduct",
		type: "post",
		dataType: "json",
		data: {
			openId: "openId",
			productId: '88880001',
		},
		success: function(res) { // res就是后台接口返回的数据
			console.log(res)
		},
	})
}

// 点击购物车  调queryShopCart接口
function getList() {
	let openId= localStorage.getItem("openId");
	// 获取数据渲染数据到页面
	$.ajax({
		url: "https://kidstoms.com/queryShopCart",
		type: "post",
		dataType: "json",
		data: {
			openId:openId,
		},
		success: function(res) { // res就是后台接口返回的数据
			console.log(res)
			var menu = res.data.productList[0];
			// 标题 价格
			$(".p_name").text(menu.productDesc);
			$(".GoodsPrice").text(menu.salePrice);
			var menus = res.data.amounts;
			$(".GoodsAmounts").text(menus);
			var len = [];
			len = menu.productImages;
			var html = "";
			console.log(len)
			for (var i = 0; i < len.length; i++) {
				var imgI = len[i];
				html += '<img src=' + imgI  + '/>';

			}
			console.log(imgI)
			$(".img_box").html(html);
			$(".jd_shop_con").css('display','block');
		},
	})
}

$(document).ready(function() {
	getList();
})
