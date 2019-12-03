
$(document).ready(function(){
    //mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
    function isWeiXin() {
        let ua = window.navigator.userAgent.toLowerCase();
        console.log(ua);
        if (ua.match(/MicroMessenger/i) === 'micromessenger') {
            return true;
        }
        else {
            return false;
        }
    }
    if(isWeiXin()){
        console.log("是来自微信内置浏览器");
    }
    else{
        console.log("不是来自微信内置浏览器");
        window.location.href="H5/home.html";
        return;
    }


    // 获取地址栏中的字符串，并将其转化为对象
    function getWXCode() {
        let search = location.search;
        cosnole.log(search)
        let obj = {};
        cnsole.log(obj)
        let keyValues = search.slice(1).split("&");
        console.log(keyValues)
        keyValues.forEach(function(keyValue) {
            let tempArr = keyValue.split("=");
            let key = tempArr[0];
            // var value = tempArr[1].indexOf("|") > 0 ? tempArr[1].split("|") : tempArr[1];
            let value = tempArr[1];
            obj[key] = value;
        });
        return obj;
    }
    let obj = getWXCode()
    alert('code'+obj.code);

    console.log('code:'+obj.code)
    //code 无值，
    if(obj.code === ''|| obj.code === undefined || obj.code === null) {
        console.log("123")
        let appid = "wx6e974f12e898a2ee"
        let redirect_uri = "https://kidstoms.com/tea/index.html"
        let response_type = "code"
        let state = "STATE#wechat_redirect"
        let scope = "snsapi_base"
        let result = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
            + appid + '&redirect_uri='+redirect_uri+'&response_type='+response_type+'&scope='+scope+'&state='+state
        window.location.href=result;
        return;
    }
    console.log(obj.code)
    let code = obj.code;
    // 获取
    let openId=window.localStorage.getItem('openId');

    // 判断openId是否存在
    if (openId === '' || openId === undefined || openId === null) {
        getOpenId();
        alert('重新获取openId')
    }else{
        alert('openId已经存在')
        window.location.href = "H5/home.html"
    }
    console.log(code)

    function getOpenId() {
        console.log(code)
        // 查询openId
        $.ajax({
            url: "https://kidstoms.com/getOpenIdByCode",
            type: "get",
            dataType: "json",
            data: {
                "code": code,
            },
            success: function (res) {
                if (res.code === 200) {
                    // alert("openid" + JSON.stringify(res.data.openId));
                    let result = jQuery.parseJSON(res.data)
                    var openId = result.openId;
                    console.log(openId)
                    window.localStorage.setItem('openId', openId);
                    window.location.href = "H5/product.html?openId=" + openId;
                    alert("openid:" + result.openId)
                } else {
                    alert(res.msg);
                }
            },
            error: function () {
                console.log("XMLHttpRequest", XMLHttpRequest)
            }
        })
    }
})
