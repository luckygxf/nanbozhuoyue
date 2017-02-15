
/*
 * baigiejob package
 * core functions with jQuery
 */
 
var baigiejob = (function() {
	return {
		initialize : function() {
			baigiejob.global.showDebugger();
			if (baigiejob.complete) {
				baigiejob.complete();
				baigiejob.complete = null;
			}
		},
		
		global : {} 
	};
})();

/*
Firefox super responsive scroll (c) Keith Clark - MIT Licensed
*/
/*(function(doc) {
 
  var root = doc.documentElement;
 
  // Not ideal, but better than UA sniffing.
  if ("MozAppearance" in root.style) {
 
    // determine the vertical scrollbar width
    var scrollbarWidth = root.clientWidth;
    root.style.overflow = "scroll";
    scrollbarWidth -= root.clientWidth;
    root.style.overflow = "";
 
    // create a synthetic scroll event
    var scrollEvent = doc.createEvent("UIEvent")
    scrollEvent.initEvent("scroll", true, true);
 
    // event dispatcher
    function scrollHandler() {
      doc.dispatchEvent(scrollEvent)
    }
 
    // detect mouse events in the document scrollbar track
    doc.addEventListener("mousedown", function(e) {
      if (e.clientX > root.clientWidth - scrollbarWidth) {
        doc.addEventListener("mousemove", scrollHandler, false);
        doc.addEventListener("mouseup", function() {
          doc.removeEventListener("mouseup", arguments.callee, false);
          doc.removeEventListener("mousemove", scrollHandler, false);
        }, false)
      }
    }, false)
 
    // override mouse wheel behaviour.
    doc.addEventListener("DOMMouseScroll", function(e) {
      // Don't disable hot key behaviours
      if (!e.ctrlKey && !e.shiftKey) {
        root.scrollTop += e.detail * 16;
        scrollHandler.call(this, e);
        e.preventDefault()
      }
    }, false)
 
  }
})(document);*/


//------------------------------------------------------------------------------------------
// baigiejob.global

(function() {
	
	var scope = this;
	
	//デバッグモードフラグ
	var debugMode = true;
	
	//trace出力テキスト
	var traceText = "";
	
	//デバッガのインスタンス
	this.deb;
	
	this.stage = null;
	
	this.initDebugger = function() {
		if (debugMode) scope.deb = new baigiejob.debug.Debugger();
	};
	
	this.showDebugger = function() {
		if (debugMode) {
			scope.deb.show();
		}
	};
	
	this.trace = function(value) {
		if (debugMode) {
			scope.deb.trace(value);
		}
	};
	
	this.clearTrace = function() {
		if (debugMode) {
			scope.deb.clear();
		}
	};
	
	this.isDebugger = function() {
		return debugMode;
	};

	var agent = navigator.userAgent;
	var appVersion = navigator.appVersion.toLowerCase();
	
	this.userAgent = {
		isIE : /MSIE/.test(agent),
		isFireFox : /FireFox/.test(agent),
		isChrome : /Chrome/.test(agent),
		isIPad : /iPad/.test(agent)
	};
	
	if (this.userAgent.isIE) {
		var ieversion;
		if (appVersion.indexOf('msie 6.') != -1) {
			ieversion = 6;
		} else if (appVersion.indexOf('msie 7.') != -1) {
			ieversion = 7;
		} else if (appVersion.indexOf('msie 8.') != -1) {
			ieversion = 8;
		} else if (appVersion.indexOf('msie 9.') != -1) {
			ieversion = 9;
		} else if (appVersion.indexOf('msie 10.') != -1) {
			ieversion = 10;
		} else {
			ieversion = 0;
		}
		
		this.userAgent.underIE8 = ieversion < 9;
		this.userAgent.isIE9 = ieversion == 9;
	} else {
		this.userAgent.underIE8 = false;
		this.userAgent.isIE9 = false;
	}
	
	this.userAgent.isMac = agent.indexOf('Mac') >= 0;
	
	this.userAgent.isIOS = agent.indexOf('iPhone') > -1 || agent.indexOf('iPod')  > -1 || agent.indexOf('iPad')  > -1;
	this.userAgent.isAndroid = agent.indexOf('Android')  > -1;
	this.userAgent.isMobile = this.userAgent.isIOS || this.userAgent.isAndroid;
	
	//Android Tabletの判定追加
	if (this.userAgent.isAndroid) {
		this.userAgent.isAndroidTablet = agent.indexOf('Mobile')  < 0;
		this.userAgent.isAndroidMobile = !this.userAgent.isAndroidTablet;
	} else {
		this.userAgent.isAndroidTablet = false;
		this.userAgent.isAndroidMobile = false;
	}
	
	this.userAgent.isSmartPhone = false;
	
	if (this.userAgent.isMobile) {
		if ((agent.indexOf('iPhone') > -1) || (this.userAgent.isAndroid && !this.userAgent.isAndroidTablet)) {
			this.userAgent.isSmartPhone = true;
		}
	}
	
	this.userAgent.isSafari = /Safari/.test(agent) && !this.userAgent.isChrome;
	
	
	
	if (this.userAgent.isIOS || this.userAgent.isAndroid) {
		this.useEffect = false;
	}
	
	//requestAnimFrame使用フラグ
	this.useRequestAnimFrame = false;
	
	this.eventType = {};
	
	if (this.userAgent.isMobile || this.userAgent.isIPad) {
		this.eventType["down"] = "touchstart";
		this.eventType["move"] = "touchmove";
		this.eventType["up"] = "touchend";
	} else {
		this.eventType["down"] = "mousedown";
		this.eventType["move"] = "mousemove";
		this.eventType["up"] = "mouseup";
	}
	
	if (!window.addEventListener) {
		window.addEventListener = function(evt, func) {
			window.attachEvent("on" + evt, func);
		};
		
		window.removeEventListener = function(evt, func) {
			window.detachEvent("on" + evt, func);
		};
	}
	
	// setInterval高速化
	//////////////////////////////////////////////////////
	var si_CC = 0;
	var si_BD = 10;//(this.userAgent.isAndroid) ? 10 : 10;
	var si_FA = [];
	var si_DA = [];
	var si_IA = [];
	var gSetInterval = window.setInterval;
	
	gSetInterval(function() {
		si_CC++;
		for (var i = 0, l = si_IA.length; i < l; i++) {
			if (!((si_CC * si_BD) % si_DA[si_IA[i]]) && si_FA[si_IA[i]]) {
				si_FA[si_IA[i]]();
			}
		}
	}, si_BD);
	
	window.setInterval = function(func, delay) {
		if (delay < si_BD) delay = si_BD;
		var id = si_FA.length;
		var _fn = delay % si_BD;
		var _in = delay / si_BD >> 0;
		
		si_FA.push(func);
		si_DA.push((_in + Math.round(_fn/si_BD)) * si_BD);
		si_IA.push(id);
		
		return id;
	}
	
	window.clearInterval = function(id) {
		var tmp = si_IA.slice(0);
		
		si_IA = [];
		si_FA[id] = undefined;
		si_DA[id] = undefined;
		
		for (var i = 0, l = tmp.length; i < l; i++) if (tmp[i] != id) si_IA.push(tmp[i]);
	}
	//////////////////////////////////////////////////////
	
	
	window.requestAnimFrame = (function()
	{
		if (scope.userAgent.isSafari)
		{
			//SafariでwebkitRequestAnimationFrameがきかない為
			return function( callback ){
				window.setTimeout(callback, 1000 / 30);
			};
		}
		
		return  window.requestAnimationFrame       || 
						window.webkitRequestAnimationFrame || 
						window.mozRequestAnimationFrame    || 
						window.oRequestAnimationFrame      || 
						window.msRequestAnimationFrame     || 
						function( callback ){
							window.setTimeout(callback, 5);
						};
	})();
	
	window.cancelAnimationFrame = (function()
	{
		return  window.cancelAnimationFrame       || 
						window.webkitCancelAnimationFrame || 
						window.mozCancelAnimationFrame    || 
						window.oCancelAnimationFrame      || 
						window.msCancelAnimationFrame     || 
						function( timer ){
							window.clearTimeout(timer);
						};
	})();
	
	
	this.debug = function(flag) {
		debugMode = flag;
	};
	
	this.addPackage = function(pkg) {
		if (!pkg) return;
		var pass = baigiejob;
		var array = pkg.split(".");
		var n = 0;
		var ln = array.length;
		
		do {
			if (!pass[array[n]]) pass[array[n]] = {};
			pass = pass[array[n]];
		} while (++n < ln);
	};
	
	this.extend = function (subClass, superClass) {
		var Temp = new Function();
    Temp.prototype = superClass.prototype;
    subClass.prototype = new Temp;
    subClass.prototype.constructor = subClass;
    subClass.prototype.__super__ = function () {
			var originalSuper = this.__super__;
			this.__super__ = superClass.prototype.__super__ || null;
			
			superClass.apply(this, arguments);
			
			if (this.constructor == subClass) {
				delete this.__super__;
			} else {
				this.__super__ = originalSuper;
			}
    };
	};
	
	
	this.useEffect = function() {
		
		//エフェクトのオンオフ
		var useEffect = true;
		
		var hasTransform;
			
		$.support.transform  = typeof $("body").css("transform") === "string";
		$.support.transition = typeof $("body").css("transitionProperty") === "string";
		
		if ($.support.transition) {
			hasTransform = true;
		} else {
			hasTransform = false;
		}
		
		var userAgent = baigiejob.global.userAgent;
		
		if (userAgent.isIOS || userAgent.isAndroid || !hasTransform) {
			useEffect = false;
		}
		
		return useEffect;
	};
	
}).apply(baigiejob.global);

baigiejob.global.addPackage("util");
baigiejob.global.addPackage("base");
baigiejob.global.addPackage("view");
baigiejob.global.addPackage("motion");
baigiejob.global.addPackage("debug");

//global function and property
var extend = baigiejob.global.extend;
var trace = baigiejob.global.trace;
var clearTrace = baigiejob.global.clearTrace;
var userAgent = baigiejob.global.userAgent;
var eventType = baigiejob.global.eventType;
var useEffect = baigiejob.global.useEffect;



//------------------------------------------------------------------------------------------
// baigiejob.base

(function() {
	
	/*******************************************
	 * EventDispatcherクラス
	 *******************************************/
	this.EventDispatcher = function() {
		this.listeners = [];
		this.enterFrameTimer;
		
		this.requestFrameId;
		
		//デルタタイム使用する場合はtrue(コマ落ちしても速度落としたくない場合)
		this.useDeltaTime = false;
		//this.enterFrameFunc;
	};
		
	this.EventDispatcher.prototype.addEventListener = function(type, func) {
		if (!this.listeners) {
			this.listeners = [];
		}
		
		this.listeners.push({type:type, func:func});
	};

	this.EventDispatcher.prototype.removeEventListener = function(type, func) {
		var ls = this.listeners;
		var tmp = [];
		for (var i = 0, ln = ls.length; i < ln; i++) {
			var ob = ls[i];
			if (ob.type != type || ob.func != func) {
				tmp.push(ob);
			}
		}

		this.listeners = tmp;
	};

	this.EventDispatcher.prototype.dispatchEvent = function(evt) {
		var ls = this.listeners;
		if (!ls) return;
		for (var i = 0, ln = ls.length; i < ln; i++) {
			var ob = ls[i];
			if (ob.type == evt.type) {
				ob.func(evt.args);
			}
		}
	};
	
	
	if (baigiejob.global.useRequestAnimFrame) {
		
		//requestAnimFrameを使ってenterFrame
		this.EventDispatcher.prototype.onEnterFrame = function(func) {
			
			if (this.enterFrameFunc) {
				this.deleteEnterFrame();
			}
			
			this.enterFrameFunc = func;
			var scope = this;
			
			if (this.useDeltaTime) {
				
				//デルタタイムあり
				var now = window.performance && (
					performance.now || 
					performance.mozNow || 
					performance.msNow || 
					performance.oNow || 
					performance.webkitNow );
				
				var getTime = function() {
					return ( now && now.call( performance ) ) || ( new Date().getTime() );
				};
				
				var tm = getTime();
				
				(function animloop() {
					if (!scope.enterFrameFunc) return;
					var tm2 = getTime();
					var deltaTime = tm2 - tm;
					if (deltaTime <= 0) {
						deltaTime = 1;
					}
					scope.enterFrameFunc(deltaTime);
					tm = tm2;
					this.requestFrameId = requestAnimFrame(animloop);
				})();
				
			} else {
				
				//デルタタイムなし
				(function animloop() {
					if (!scope.enterFrameFunc) return;
					scope.enterFrameFunc(0);
					this.requestFrameId = requestAnimFrame(animloop);
				})();
			}
		};
		
		this.EventDispatcher.prototype.deleteEnterFrame = function() {
			this.enterFrameFunc = null;
			cancelAnimationFrame(this.requestFrameId);
			this.requestFrameId = null;
		};
	} else {
		
		//setTimeoutを使ってenterFrame
		this.EventDispatcher.prototype.onEnterFrame = function(func) {
			if (this.enterFrameTimer) {
				this.deleteEnterFrame();
			}
			
			if (this.useDeltaTime) {
				
				//デルタタイムあり
				var now = window.performance && (
					performance.now || 
					performance.mozNow || 
					performance.msNow || 
					performance.oNow || 
					performance.webkitNow );
				
				var getTime = function() {
					return ( now && now.call( performance ) ) || ( new Date().getTime() );
					//return ( new Date().getTime() );
				};
				
				var tm = getTime();
				
				this.enterFrameTimer = window.setInterval(function() {
					var tm2 = getTime();
					var deltaTime = tm2 - tm;
					if (deltaTime <= 0) {
						deltaTime = 1;
					}
					func(deltaTime);
					tm = tm2;
				}, 10);
			} else {
				
				//デルタタイムなし
				this.enterFrameTimer = window.setInterval(function() {
					func();
				}, 10);
			}
		};
		
		this.EventDispatcher.prototype.deleteEnterFrame = function() {
			window.clearInterval(this.enterFrameTimer);
			this.enterFrameTimer = null;
		};
	}
	
	this.EventDispatcher.prototype.onEnterFrame2 = function(func) {
		if (this.enterFrameTimer) {
			this.deleteEnterFrame2();
		}
		
		this.enterFrameTimer = window.setInterval(function() {
			func();
		}, 1000 / 60);
	};
	
	this.EventDispatcher.prototype.deleteEnterFrame2 = function() {
		window.clearInterval(this.enterFrameTimer);
		this.enterFrameTimer = null;
	};

	var EventDispatcher = baigiejob.base.EventDispatcher;
	
	
	
	/*******************************************
	 * 複数画像ロードクラス
	 *******************************************/
	this.MultipleLoader = function() {
		this.percent = 0;
		this.loadIndex = 0;
		this.imageRequestNum = 0;
		this.imageRequests = {};
		this.imageRequestsArray = [];
	};
	
	extend(this.MultipleLoader, EventDispatcher);
	
	this.MultipleLoader.prototype.addImageRequest = function(url) {
		if (url != null && url != "") {
			this.imageRequests[url] = url;
			this.imageRequestsArray.push(url);
			this.imageRequestNum++;
		}
	};
	
	this.MultipleLoader.prototype.load = function() {
		if (this.imageRequestsArray.length > 0) {
			this.loadImage();
		}
	};
	
	this.MultipleLoader.prototype.loadImage = function() {
		var scope = this;
		var url = this.imageRequestsArray[this.loadIndex];
		var img = new Image();
		img.onload = function() {
			img.onload = null;
			scope.completeHandler(url, img);
		};
		img.src = url;// + "?" + (Math.random()*10000 >> 0);	//IE7,8でリロード後、正しくロードできないので乱数つける
	};
	
	this.MultipleLoader.prototype.completeHandler = function(url, obj) {
		this.imageRequests[url] = obj;
		
		++this.loadIndex;
		
		this.percent = this.loadIndex / this.imageRequestNum;
		
		if (this.loadIndex >= this.imageRequestNum) {
			this.dispatchEvent({type:"complete"});
		} else {
			this.loadImage();
		}
	};
	
	
}).apply(baigiejob.base);


	
//------------------------------------------------------------------------------------------
// baigiejob.util

(function() {
	
	/*
	 * URLパラメータを取得
	 */
	this.getRequest = function() {
		if(location.search.length > 1) {
			var get = new Object();
			var ret = location.search.substr(1).split("&");
			for (var i = 0; i < ret.length; i++) {
				var r = ret[i].split("=");
				get[r[0]] = r[1];
			}
			
			return get;
		} else {
			return false;
		}
	};
	
	
	/*
	 * 指定領域いっぱいに画像が配置されるよう計算する
	 */
	this.getFlexibleRect = function(stageWidth, stageHeight, imgWidth, imgHeight) {
		var per = stageWidth / stageHeight;
		var per_hd = imgWidth / imgHeight;
		var sc;
		var width;
		var height;
		var pos_x;
		var pos_y;
		
		if (!isNaN(per)) {
			if (stageWidth == imgWidth && stageHeight == imgHeight) {
				//trace("フルHDジャストフィット");
				width = stageWidth;
				height = stageHeight;
				pos_x = 0;
				pos_y = 0;
			} else if (per > per_hd) {
				sc = stageWidth / imgWidth;
				width = sc * imgWidth;
				height = sc * imgHeight;
				//trace("横に長い（上下がはみ出る）", videoWidth, videoHeight);
				pos_x = 0;
				pos_y = -(height - stageHeight) / 2;
			} else {
				sc = stageHeight / imgHeight;
				//trace("縦に長い（左右がはみ出る）");
				width = sc * imgWidth;
				height = sc * imgHeight;
				pos_x = -(width - stageWidth) / 2;
				pos_y = 0;
			}
		}
		
		return { x : pos_x, y : pos_y, width : width, height : height };
	};
	
	
	if (userAgent.isMobile || userAgent.isIPad) {
		this.getMousePosition = function(e) {
			var obj = {};
			var touch = e.originalEvent.touches[0];
			obj.x = touch.pageX;
			obj.y = touch.pageY;
			return obj;
		};
	} else {
		this.getMousePosition = function(e) {
			var obj = {};
			// trace(e);
			// trace(e.pageX);
			if	(e) {
				if (e.pageX) {
					obj.x = e.pageX;
					obj.y = e.pageY;
				} else {
					
				}
			} else {
				obj.x = document.body.scrollLeft + event.clientX;
				obj.y = document.body.scrollTop + event.clientY;
				trace("ie?");
			}
			 
			return obj;
		};
	}
	
	this.distance = function(v1, v2) {
		var xx = v1.x - v2.x;
		var yy = v1.y - v2.y;
		return Math.sqrt(xx * xx + yy * yy);
	};

}).apply(baigiejob.util);

	
//------------------------------------------------------------------------------------------
// baigiejob.debug

(function() {
	
	var _global = baigiejob.global;
	var isIE = _global.userAgent.isIE;
	var isIE8 = _global.userAgent.underIE8;
	
	/*******************************************
	 * デバッガクラス
	 *******************************************/
	this.Debugger = function() {
		this.containerId = "baigiejob_DEBUG_CONTAINER";
		this.innerId = "baigiejob_DEBUG_INNER";
		this.clearBtnId = "baigiejob_DEBUG_CLEARBUTTON";
		this.tags = jQuery('<div id="' + this.containerId + '" style="display:none;"><p id="' + this.innerId + '">traceエリア</p><input id="' + this.clearBtnId + '" type="button" value="クリア" /></div>');
		this.traceText = "clear<br>";
	};
	
	this.Debugger.prototype.clear = function() {
		this.traceText = "";
	};
	
	this.Debugger.prototype.trace = function(value) {
		if (typeof value == "object") {
			for (var i in value) {
				this.traceText += i + " = " + value[i] + "<br>";
			}
		} else {
			this.traceText += value + "<br>";
		}
		
		if (this.inner){
			this.inner.html(this.traceText);
		}
		
		if (!isIE) {
			console.log(value);
		}
	};
	
	this.Debugger.prototype.show = function() {
		jQuery("body").append(this.tags);
	
		var scope = this;
		var container = jQuery("#" + this.containerId);
		var clearBtn = jQuery("#" + this.clearBtnId);
		this.inner = jQuery("#" + this.innerId);
		
		container.css("position", "fixed");
		container.css("zIndex", "99999");
		container.css("right", "50px");
		container.css("bottom", "0px");
		container.css("padding", "10px");
		if (isIE8) {
			container.css("background", "rgb(30, 30, 30)");
		} else {
			container.css("background", "rgba(30, 30, 30, 0.75)");
		}
		container.css("maxWidth", "500px");
		container.css("width", "200px");
		container.css("color", "rgb(255, 255, 255)");
		container.css("fontSize", "11px");
		container.css("display", "block");
		
		clearBtn.bind("click", function() {
			scope.traceText = "";
			if (scope.inner) {
				scope.inner.html(scope.traceText);
			}
		});
	};
}).apply(baigiejob.debug);


//ロード前の初期化
baigiejob.global.debug(false);
baigiejob.global.initDebugger();

(function(func) {
	window.addEventListener("load", func, false);
})(function() {
	baigiejob.initialize();
});

