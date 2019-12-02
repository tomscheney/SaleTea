function ex(){
    location.href="exchange.html"
}
function adda(){
    location.href="addAddress.html"
}
function wed(){
    $("#btn-car3").click(function(){
        var istrue=false;
        var inp=$(".checkbox-list-input");
        for(var i=0;i<inp.length;i++){
            if(inp.eq(i).prop("checked")){
                istrue=true;
                break;
            }
        }
        if(!istrue){
            alert('该笔订单内包含不可退换货/款的商品。付款前请务必详阅并知晓相关政策，并勾选确认');
            return;
        }
        window.location.href="payResult.html";
        // window.open("product.html")
    })
};

$("#liquan").click(function(){
    if ($(".vou>span:nth-of-type(2)>img:nth-of-type(2)").is(':hidden')) {
        $(".vou>span:nth-of-type(2)>img:nth-of-type(2)").show();
        $(".inp").show();
        $(".vou>span:nth-of-type(2)>img:nth-of-type(1)").hide();

    } else{
        $(".vou>span:nth-of-type(2)>img:nth-of-type(2)").hide();
        $(".vou>span:nth-of-type(2)>img:nth-of-type(1)").show();
        $(".inp").hide();
    }

})
