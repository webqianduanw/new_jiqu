
(function (window) {
	function JanesiBridge() {
		this._init();
	}

	JanesiBridge.prototype = {
		_init: function _init(options) {
			var userAgentInfo = navigator.userAgent;
			var isAndroid = userAgentInfo.indexOf('Android') > -1 || userAgentInfo.indexOf('Linux') > -1;
			var isiOS = userAgentInfo.indexOf('iPhone') > -1;
			var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
			var isPc = true;

			for (var v = 0; v < Agents.length; v++) {
				if (userAgentInfo.indexOf(Agents[v]) > 0) {
					isPc = false;
					break;
				}
			}

			this.isPc = isPc;
			this.isAndroid = isAndroid;
			this.isiOS = isiOS;
			this.eventCallBackMap = {};
			this.tCallId = 0;
		},
		callNative: function callNative(functionName, params) {
			// functionName 是字符串 params 是对象  eg：{'wecart':'wechat'}
			if (this.isPc) { } else {
				var result = {};
				result.action = functionName;
				result.params = params;

				if (result.action == 'open') {
					if (result.params.url) {
						result.params.type = 2;
					} else if (result.params.recommendInfo) {
						result.params.type = 3;
					} else {
						result.params.type = 1;
					}
				}

				var paramString = JSON.stringify(result);

				if (this.isiOS) {
					var name = 'window.webkit.messageHandlers.invoke.postMessage' + '(' + 'paramString' + ')';
					eval(name);
				} else {
					var name = 'window.android.invoke' + '(' + 'paramString' + ')';
					eval(name);
				}
			}
		},
		callNativeWithCallBack: function callNativeWithCallBack(functionName, params, callBack) {
			if (this.isPc) { } else {
				var callId = this.getCallId();
				this.eventCallBackMap[callId] = callBack;
				var dic = {};
				dic.callId = callId;
				dic.action = functionName;
				dic.params = params;
				var tParams = JSON.stringify(dic);

				if (this.isiOS) {
					var name = 'window.webkit.messageHandlers.invoke.postMessage' + '(' + 'tParams' + ')';
					eval(name);
				} else {
					var name = 'window.android.invoke' + '(' + 'tParams' + ')';
					eval(name);
				}
			}
		},
		getCallId: function getCallId() {
			var tId = this.tCallId++;
			return tId.toString();
		}
	};

	function JanesiApi() {
		this._init();
	}

	JanesiApi.prototype = {
		_init: function _init(options) {
			var userAgentInfo = navigator.userAgent;
			var isNative = userAgentInfo.indexOf('js_nativeApp') > -1;
			var isAndroid = userAgentInfo.indexOf('Android') > -1 || userAgentInfo.indexOf('Linux') > -1;
			var isiOS = userAgentInfo.indexOf('iPhone') > -1;
			var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
			this.isAndroid = isAndroid;
			this.isiOS = isiOS;
			this.isNative = isNative;
			this.apiCallBackMap = {};
			this.tCallId = 0;
			this.reqUrl = 'http://tinterest.lechuangtec.com';
		},
		sendApi: function sendApi(api, type, params, callBack) {
			var callId = this.getCallId();
			this.apiCallBackMap[callId] = callBack; // if (this.isNative) {

			var dic = {
				'api': api,
				'type': type,
				'params': params,
				'action': 'sendApi',
				'callId': callId
			};
			var tParams = JSON.stringify(dic);

			if (this.isiOS) {
				window.webkit.messageHandlers.invoke.postMessage(tParams);
			} else {
				window.android.invoke(tParams);
			} // } else {
			// 	var that = this;
			// 	var reqType = type;
			// 	var reqPath = api;
			// 	$.ajax({
			// 		type: reqType,
			// 		data: params,
			// 		url: that.reqUrl + reqPath,
			// 		success: function (result) {
			// 			var func = that.apiCallBackMap[callId];
			// 			func(result);
			// 		}
			// 	})
			// }

		},
		trackApi: function trackApi(api, type, params) {
			// if (this.isNative) {
			var dic = {
				'api': api,
				'type': type,
				'params': params,
				'action': 'trackApi'
			};
			var tParams = JSON.stringify(dic);

			if (this.isiOS) {
				window.webkit.messageHandlers.invoke.postMessage(tParams);
			} else {
				window.android.invoke(tParams);
			} // }

		},
		getCallId: function getCallId() {
			var tId = this.tCallId++;
			return tId.toString();
		}
	};
	var ja = new JanesiApi();
	window.JanesiApi = ja;
	var jb = new JanesiBridge();
	window.JanesiBridge = jb;
})(window);

function nativeCallBack(callId, action, result) {
	// result = result.replace('"coins"','"$fb_coins"')
	if (action != 'sendApi') {
		var func = window.JanesiBridge.eventCallBackMap[callId];
		var res = JSON.parse(result);
		func(res, result);
	} else {
		var func = window.JanesiApi.apiCallBackMap[callId];
		var res = JSON.parse(result);
		func(res, result);
	}
}

function nativeCallJS(params) {
	var res = JSON.parse(params);
	window.JanesiBridge.commonNativeCallJS(res);
}
