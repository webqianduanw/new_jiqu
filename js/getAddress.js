function getRequest() {
  var url = location.href; //鑾峰彇鏁翠釜鍦板潃鏍忓湴鍧€
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.split('?')[1];//鎴彇锛熶箣鍚庣殑鎵€鏈夊弬鏁�
    str = str.split("&");  //灏嗘瘡涓弬鏁版埅鍙栨斁缃埌鏁扮粍
    for (var i = 0; i < str.length; i++) {
      theRequest[str[i].split("=")[0]] = unescape(str[i].split("=")[1]);//灏嗗睘鎬у強灞炴€у€煎垎鍒綊灞炲埌鏁扮粍
    }
  }
  return theRequest;
}
