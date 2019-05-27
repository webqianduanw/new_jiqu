var urlBase = "http://tinterest.lechuangtec.com";

//正式
// var requestUrl = 'http://zq.janesi.com';
// 预发
// var requestUrl = 'http://pre.zq.janesi.com'

// 测试
var requestUrl ="http://tinterest.lechuangtec.com";
// var requestUrl = 'http://10.10.11.41:8090';
// var requestUrl = 'http://10.10.10.81:8090';
    var appId='10010';
    // var userId='247322';  //41
    var userId='1338';
    // var osType='ANDORID';
    // var apiVersion = '2.1.0';
var headers = {
  "Content-Type": "application/x-www-form-urlencoded"
};
var reqParams = {
        'appId':'10010',
        // 'userId':'247322',
        'userId':'1336',
        'apiVersion':'2.3.1',
        'osType':'ANDROID'
}
// 默认图片
var baseImg = 'http://tinterest.lechuangtec.com/janesi-headline/ZQFL/img/userPhoto.png'


// 获取从原生App传过来的数据
// app打开先调用此方法 传递各种参数
window.nativeApiData = {} //API数据
window.nativePublicData = {} //调取接口的公共数据
window.getConfigFromApp = function (value){
    // let objs = window.b64DecodeUnicode(value);
    let obgOri;
    if (typeof value == "string") {
        obgOri = JSON.parse(value);
        // alert("1111"+JSON.stringify(obgOri));
    } else {
        obgOri = value;
        // alert("222222"+JSON.stringify(obgOri));
    }
    window.nativeApiData = obgOri;
    window.nativePublicData = {

    //  apiVersion: obgOri && obgOri.apiVersion || "",
    //  appVersion: obgOri && obgOri.appVersion || "",
    //  apiTime: obgOri && obgOri.apiTime || "",
    //  appId: obgOri && obgOri.appId || "",
    //  udid: obgOri && obgOri.udid || "",
    //  userId: obgOri && obgOri.userId || "",
    //  osType: obgOri && obgOri.osType || "",
    //  appKey: obgOri && obgOri.appKey || "",
    //  signature: obgOri && obgOri.signature || "",
    //  channelFrom: obgOri && obgOri.channelFrom || "",

       apiVersion: "2.3.2",
       appVersion: "2.3.0",
       apiTime: "20190426145014",
       appId: "10010",
       udid: "c844187d72b0ee6f",
       userId: "85",
       osType: "ANDROID",
       appKey: "android05100100820180323",
       signature: "ee3fd739349ea14b8226be63260e2ff110",
       channelFrom: "default"
    };
    //  window.configCallBack();
};
   getConfigFromApp();
//url地址解析
window.urlAnalytical = function () {
    var urlObj = {};
    var url = window.location.search;
    if (url != '') {
        var urlArr = url.substring(1).split("&");
        for (var i = 0; i < urlArr.length; i++) {
            urlArr[i] = urlArr[i].split("=");
            urlObj[urlArr[i][0]] = urlArr[i][1];
        }
    }
    return urlObj;
};
// 判断手机系统，1为android，2为ios
window.getOsFrom = function () {
    let u = navigator.userAgent;
    // let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf("Linux") > -1; //android终端
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf("iPhone") > -1; //ios终端
    if (isiOS) {
        // 返回2是ios
        return 2;
    } else {
        // 返回1是android
        return 1;
    }
}
//调用原生方法
window.nativeAppFun = function (str, dataStr, method) {
    let osFrom = getOsFrom();
    // let agent = userAgent();
    let jsonStr = JSON.stringify({
        method: str,
        params: !dataStr ? "" : JSON.stringify(dataStr),
        callbackfunction: method || ""
    });
    if (osFrom === 1) {
        android.invokeNative(jsonStr);
    } else if (osFrom === 2) {
        window.webkit.messageHandlers.invokeNative.postMessage(jsonStr);
    } else if (!!dataStr && dataStr.url) {
        location.href = dataStr.url;
    }
}
