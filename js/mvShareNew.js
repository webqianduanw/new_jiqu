//	itemId地址栏获取
function getRequest() {
	var url = location.href; //获取整个地址栏地址
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.split('?')[1];//截取？之后的所有参数
		str = str.split("&");  //将每个参数截取放置到数组
		for (var i = 0; i < str.length; i++) {
			theRequest[str[i].split("=")[0]] = unescape(str[i].split("=")[1]);//将属性及属性值分别归属到数组
		}
	}
	return theRequest;
}
var url = window.reqUrl;
var itemId = getRequest()['itemId']||getRequest()['itemid']
	userId = getRequest()['userId']||getRequest()['userid']

		mui.plusReady(
				mui('.link').on('tap','#openApp',function(e){
                    location.href='http://yun.janesi.net/web/NEWS/kandianDown.html'
				})
			)

			//增加金币
			var param = {
				userId:userId,
				appId:10010,
				content:itemId,
				code:"share"
			}
			$.ajax({
				type:"POST",
				url:url+"/app/interest/task/add_coin",
				data:param,
				success:function(data){}
			});

			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

			let img_box  = document.querySelector('.img_box')
			if(isAndroid){

				console.log(11)
				img_box.lastChild.src = '.com/janesi-headline/ZQFL/img/appLogo.png'
			}else{
				console.log(img_box.lastChild.src)
				img_box.lastChild.src = '.com/janesi-headline/ZQFL/img/appLogo1.png'

			}
