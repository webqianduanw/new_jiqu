(function () {
  var downBtnId = "down-201840406-646534823742987593453";
  function osType() {
    var u = navigator.userAgent;
    var type = { //绉诲姩缁堢娴忚鍣ㄧ増鏈俊鎭�
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios缁堢
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android缁堢鎴杣c娴忚鍣�
      iPhone: u.indexOf('iPhone') > -1, //鏄惁涓篿Phone鎴栬€匭QHD娴忚鍣�
      iPad: u.indexOf('iPad') > -1, //鏄惁iPad
      weixin: u.indexOf('MicroMessenger') > -1,
      qq: u.indexOf('MQQBrowser') > -1 && u.lastIndexOf('QQ/') > -1,
      ali: u.indexOf('AliApp') > -1,
      weibo: u.indexOf('Weibo') > -1
    };
    type.inner = type.weixin || type.ali || type.weibo;
    return type;
  }



  function down(downUrl, callAppStore) {
    if (!window.osType.android) {
      if (typeof callAppStore === "function") {
        callAppStore(openInstallObject);
      } else if (typeof callAppStore === "string") {
        window.location.href = callAppStore;
      }
      return;
    }
    var a = document.createElement("a");
    a.style.width = 0;
    a.style.height = 0;
    a.style.visibility = "visible";
    a.style.display = "block";
    a.href = downUrl;
    setTimeout(function () {
      a.click();
    }, 0);
  }

  function wakeOrDown(config) {
    var callAppStore;
    var btn;
    var downUrl;
    var appKey;
    if (arguments.length == 1) {
      callAppStore = config["callAppStore"];
      btn = config["btn"];
      downUrl = config["downUrl"];
      appKey = config["appKey"];
    } else {
      for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (arg instanceof HTMLElement && !btn) {
          btn = arg;
        } else if (typeof arg === "function" && !callAppStore) {
          callAppStore = arg;
        } else if (typeof arg === "string") {
          if (!downUrl) {
            downUrl = arg;
          } else if (!callAppStore) {
            callAppStore = arg;
          }
        }
      }
    }

    if (!callAppStore) {
      callAppStore = defaultCallAppStore;
    }
    if (!appKey) {
      appKey = "dq90r1";
    }
    tryWake(btn, downUrl, callAppStore, appKey);
  }

  function defaultCallAppStore() {
    window.alert("IOS杩樻湭涓婄嚎锛屾暚璇锋湡寰�");
  }
  var openInstallObject;
  function tryWake(btn, downUrl, callAppStore, appKey) {
    if (openInstallObject) {
      if (!window.osType.android) {
        down(downUrl, callAppStore);
      } else if (window.osType.inner) {
        openInstallObject.wakeupOrInstall();
      } else if (window.osType.qq) {
        btn.click();
      } else {
        openInstallObject.schemeWakeup();
      }
      return;
    }
    if (!window.OpenInstall) {
      loadOpenInstall(btn, downUrl, callAppStore, tryWake);
      return;
    }
    var data = OpenInstall.parseUrlParams();
    openInstallObject = new OpenInstall({
      appKey: appKey,
      preferWakeup: true,
      onready: function () {

        btn.addEventListener("click", function () {
          if (!window.osType.android) {
            down(downUrl, callAppStore);
          } else if (window.osType.inner) {
            openInstallObject.wakeupOrInstall();
            if (!window.osType.weixin) {
              down(downUrl, callAppStore);
            }
          } else if (window.osType.qq) {
            down(downUrl, callAppStore);
            openInstallObject.schemeWakeup();
          } else {
            openInstallObject.schemeWakeup();
            down(downUrl, callAppStore);
          }
          return false;
        });
        if (!window.osType.android) {
          down(downUrl, callAppStore);
        } else if (window.osType.inner) {
          openInstallObject.wakeupOrInstall();
        } else if (window.osType.qq) {

        } else {
          openInstallObject.schemeWakeup();
        }
      }
    }, data);
  }

  function loadOpenInstall(btn, downUrl, callAppStore, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://res.cdn.openinstall.io/openinstall.js";
    if (typeof (callback) == 'function') {
      script.onload = script.onreadystatechange = function () {
        if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
          callback(btn, downUrl, callAppStore);
          script.onload = script.onreadystatechange = null;
        }
      };
    }
    document.querySelector("html").appendChild(script);
  }
  window.wakeOrDown = wakeOrDown;
  window.osType = osType();

})();
