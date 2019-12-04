
// 以下方式直接跳转
$(document).ready(function () {

    let wx = (function () {
            return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
        }
    )();
    if (wx) {
        let appid = "wx6e974f12e898a2ee"
        let redirect_uri = "https://kidstoms.com/tea/H5/home.html"
        let response_type = "code"
        let state = "STATE#wechat_redirect"
        let scope = "snsapi_base"
        let result = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
            + appid + '&redirect_uri=' + redirect_uri + '&response_type=' + response_type + '&scope=' + scope + '&state=' + state
        window.location.href = result;
    } else {
        window.location.href = "H5/home.html";
    }

})
