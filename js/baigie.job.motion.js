baigiejob.global.addPackage("motion");

//------------------------------------------------------------------------------------------
// baigiejob.motion

(function() {
	
	var EventDispatcher = baigiejob.base.EventDispatcher;
	
	
	/*******************************************
	 * アニメ用Spriteクラス
	 * xy移動、scaleXY伸縮、アルファ制御
	 * スケーリング時のアンカー指定など(デフォルトは50% 50%)
	 *******************************************/
	this.Sprite = function(target, def_props) {
		
		var tg = jQuery(target);
		
		//各種プロパティを動かす対象
		this.element = tg;
		
		//this.setAnchor(0, 0);
		
		//アンカーが0以外の場合、ずらす分の位置
		//this.anchorDiffPos = { x : 0, y : 0 };
		
		this.useDigit = false;
		
		//モーションプロパティ
		this.x = 0;
		this.y = 0;
		this.alpha = 1;
		this.scale = 1;
		this.rotation = 1;
		
		if (def_props != null) {
			for (var prop in def_props) {
				this[prop] = def_props[prop];
			}
		}
		
		//スケール固定にするか
		this.fixedScaleX = false;
		this.fixedScaleY = false;
		this.currAlpha = null;
		
		//display表示時のプロパティ名
		this.displayName = "block";
		
		this.update();
	};
	
	extend(this.Sprite, EventDispatcher);
	
	/*
	 * スケール時のアンカー位置セット
	 */
	this.Sprite.prototype.setAnchor = function(x, y) {
		var sx = x + ((x != 0) ? "%" : "");
		var sy = y + ((y != 0) ? "%" : "");
		this.element.css("transformOrigin", sx + " " + sy);
	};
	
	/*
	 * 描画の更新
	 */
	this.Sprite.prototype.update = function(use_digit) {
		
		var sc_x = (this.fixedScaleX) ? 1 : this.scale;
		var sc_y = (this.fixedScaleY) ? 1 : this.scale;
		
		if (this.useDigit) {
			//var mtx = 'matrix(' + sc_x + ', 0, 0, ' + sc_y + ', ' + (this.x) + ', ' + (this.y) + ')';
			var mtx = 'matrix3d(' + sc_x + ', 0, 0, 0,       0, ' + sc_y + ', 0, 0,       0, 0, 1, 0,          ' + (this.x) + ', ' + (this.y) + ', 0, 1)';
		} else {
			//var mtx = 'matrix(' + sc_x + ', 0, 0, ' + sc_y + ', ' + (this.x >> 0) + ', ' + (this.y >> 0) + ')';
			var mtx = 'matrix3d(' + sc_x + ', 0, 0, 0,       0, ' + sc_y + ', 0, 0,       0, 0, 1, 0,          ' + (this.x >> 0) + ', ' + (this.y >> 0) + ', 0, 1)';
		}
		
		this.element.css("transform", mtx);
		
		 
		//this.element.css("transform", "translate3d(" + (this.x >> 0) + "px, " + (this.y >> 0) + "px, 0) rotateZ(" + this.rotation + "deg) scale(" + sc_x + ", " + sc_y + ")");
		
		if (this.alpha != this.currAlpha) {
			this.element.css("opacity", this.alpha);
			this.currAlpha = this.alpha;
		}
	};
	
	/*
	 * 描画の更新
	 */
	this.Sprite.prototype.visible = function(flag) {
		this.element.css("display", (flag) ? this.displayName : "none");
	};
	
	
	/*******************************************
	 * Sprite用トゥイーンクラス(Singleton)
	 *******************************************/
	var Tween = function() {
		
	};
	
	/*
	 * フェードイン処理
	 */
	Tween.prototype.fadeIn = function(spt, cb_func, sp) {
		
		var sp = (sp != null) ? sp : 0.1;
		
		spt.onEnterFrame(function() {
			if ((spt.alpha += sp) >= 0.9) {
				spt.alpha = 1;
				spt.deleteEnterFrame();
				
				if (cb_func) {
					cb_func();
				}
			}
			
			spt.update();
		});
	};
	
	/*
	 * フェードアウト処理
	 */
	Tween.prototype.fadeOut = function(spt, cb_func, sp) {
		
		var sp = (sp != null) ? sp : 0.1;
		
		spt.onEnterFrame(function() {
			if ((spt.alpha -= sp) <= 0.1) {
				spt.alpha = 0;
				spt.deleteEnterFrame();
				
				if (cb_func) {
					cb_func();
				}
			}
			
			spt.update();
		});
	};
	
	/*
	 * モーション処理
	 */
	Tween.prototype.motion = function(spt, prop_array, end_array, sp, cb_func, delay, threshold) {
		var sa = 0;
		var curr = {};//spt[prop];
		var tmps = {};//spt[prop];
		var end = {};
		var ln = prop_array.length;
		
		var diff = (threshold) ? threshold : 0.002;
		
		for (var i = 0; i < ln; i++) {
			var prop = prop_array[i];
			curr[prop] = spt[prop];
			tmps[prop] = 0;
			end[prop] = end_array[i];
			
			/*if (prop == "y") {
				trace(curr[prop] + " " + tmps[prop] + " " + end[prop]);
			}*/
		}
		
		var flag = true;
		
		var cc = 0;
		
		if (delay != null) {
			cc = delay;
		}
		
		var func = function() {
			spt.onEnterFrame(function() {
					sa += sp;
					flag = true;
					for (var prop in curr) {
						curr[prop] += tmps[prop] = (end[prop] - curr[prop]) * sa;
						
						if (Math.abs(tmps[prop]) < diff) {
							curr[prop] = end[prop];
						}
						else {
							flag = false;
						}
						
						spt[prop] = curr[prop];
						spt.update();
					}
					
					if (flag) {
						spt.deleteEnterFrame();
						
						if (cb_func) {
							cb_func();
						}
					}
				});
		};
		//func();
		//return;
		spt.onEnterFrame(function() {
			if (--cc <= 0) {
				spt.deleteEnterFrame();
				spt.onEnterFrame(function() {
					sa += sp;
					flag = true;
					for (var prop in curr) {
						curr[prop] += tmps[prop] = (end[prop] - curr[prop]) * sa;
						
						if (Math.abs(tmps[prop]) < diff) {
							curr[prop] = end[prop];
						}
						else {
							flag = false;
						}
						
						spt[prop] = curr[prop];
						spt.update();
					}
					
					if (flag) {
						spt.deleteEnterFrame();
						
						if (cb_func) {
							cb_func();
						}
					}
				});
			}
		});
	};
	
	/*
	 * モーション処理
	 */
	Tween.prototype.motionSpring = function(spt, prop_array, end_array, sp1, sp2, cb_func, limit) {
		
		var curr = {};//spt[prop];
		var tmps = {};//spt[prop];
		var end = {};
		var ln = prop_array.length;
		
		var lim = (limit) ? limit : 0.006;
		
		for (var i = 0; i < ln; i++) {
			var prop = prop_array[i];
			curr[prop] = spt[prop];
			tmps[prop] = 0;
			end[prop] = end_array[i];
			
			/*if (prop == "y") {
				trace(curr[prop] + " " + tmps[prop] + " " + end[prop]);
			}*/
		}
		
		var flag = true;
		
		spt.onEnterFrame(function() {
			flag = true;
			for (var prop in curr) {
				curr[prop] += tmps[prop] = (end[prop] - curr[prop]) / sp1 + tmps[prop] * sp2;
				
				if (Math.abs(tmps[prop]) < lim) {
					curr[prop] = end[prop];
				}
				else {
					flag = false;
				}
				
				spt[prop] = curr[prop];
				spt.update();
			}
			
			if (flag) {
				spt.deleteEnterFrame();
				
				if (cb_func) {
					cb_func();
				}
			}
		});
	};
	
	/*
	 * モーション処理
	 */
	Tween.prototype.delay = function(spt, time, cb_func) {
		
		spt.onEnterFrame(function() {
			if (--time <= 0) {
				spt.deleteEnterFrame();
				if (cb_func != null) {
					cb_func();
				}
			}
		});
	};
	
	this.Tween = new Tween();
	
	
	var Tween = this.Tween;
	var Sprite = this.Sprite;
	
	
	/*******************************************
	 * グロナビのマウスオーバー処理用
	 *******************************************/
	this.GNavi = function() {
		var atags = $("div.gnav a");
		
		var toggleOn = function(index) {
			for (var i = 0, ln = atags.length; i < ln; i++) {
				if (i != index) {
					$(atags[i]).addClass("hover");
				} else {
					$(atags[i]).removeClass("hover");
				}
			}
		};
		
		var clear = function() {
			for (var i = 0, ln = atags.length; i < ln; i++) {
				$(atags[i]).removeClass("hover");
			}
		};
		
		var func = function(atag, index) {
			$(atag).bind("mouseover", function() {
				toggleOn(index);
			});
			
			$(atag).bind("mouseout", function() {
				clear();
			});
		};
		
		for (var i = 0, ln = atags.length; i < ln; i++) {
			var atag = atags[i];
			func(atag, i);
		}
	};
	
	extend(this.GNavi, EventDispatcher);
	
	
	
	
	
	/*******************************************
	 * 応募ボタンオーバー処理用
	 *******************************************/
	this.EntryButton = function() {
		
		var scope = this;
		
		this.element = new Sprite($("ul.ulBtnEntry li"));
		
		$("ul.ulBtnEntry li").bind("mouseenter", function() {
			scope.over();
		});
		
		$("ul.ulBtnEntry li").bind("mouseleave", function() {
			scope.out();
		});
		
		this.currWidth = 7;
	};
	
	extend(this.EntryButton, EventDispatcher);
	
	this.EntryButton.prototype.over = function() {
		
		var scope = this;
		var end = 16;
		var sa = 0;
		var tmp;
		
		this.onEnterFrame(function() {
			sa += 0.055;
			
			scope.currWidth += tmp = (end - scope.currWidth) * sa;
			$("ul.ulBtnEntry li").css("padding", scope.currWidth);
			$("ul.ulBtnEntry li a").css("padding", (40 - scope.currWidth + 7) + "px 0");
			
			if (Math.abs(tmp) < 0.005) {
				scope.deleteEnterFrame();
			}
		});
	};
	
	this.EntryButton.prototype.out = function() {
		
		var scope = this;
		var end = 7;
		var sa = 0;
		var tmp;
		
		this.onEnterFrame(function() {
			sa += 0.055;
			scope.currWidth += tmp = (end - scope.currWidth) * sa;
			$("ul.ulBtnEntry li").css("padding", scope.currWidth);
			$("ul.ulBtnEntry li a").css("padding", (40 - scope.currWidth + 7) + "px 0");
			
			if (Math.abs(tmp) < 0.005) {
				scope.deleteEnterFrame();
			}
		});
	};
	
}).apply(baigiejob.motion);

