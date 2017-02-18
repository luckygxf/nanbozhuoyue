baigiejob.global.addPackage("sub");

//------------------------------------------------------------------------------------------
// baigiejob.sub

var TABLE_WIDTH = 760;

(function() {
	console.log('start');
	//import classes
	var EventDispatcher = baigiejob.base.EventDispatcher;
	var Sprite = baigiejob.motion.Sprite;
	var Tween = baigiejob.motion.Tween;
	var GNavi = baigiejob.motion.GNavi;
	var EntryButton = baigiejob.motion.EntryButton;
	
	var getRequest = baigiejob.util.getRequest;
	
	//ページ切替時の各要素の遅延処理の係数
	//最初のフェード時は増やしといて出現時の差をつける
	var globalDelayTime = 0;
	
	
	/*******************************************
	 * メインビジュアルのテキスト（サブ和文）
	 *******************************************/
	this.TextMain = function(element, motion_prop) {
		
		//this.element = $(element);
		this.spt = new Sprite($(element));
		this.sptMain = new Sprite($($(element).find(".mainText")));
		this.sptSub = new Sprite($($(element).find(".subText")));
		this.motionProp = motion_prop;
		this.reset();
		
		this.isShow = false;
	};
	
	extend(this.TextMain, EventDispatcher);
	
	/*
	 * 
	 */
	this.TextMain.prototype.show = function(delay, is_fade) {
		
		if (this.isShow) return;
		
		var scope = this;
		
		this.sptMain.alpha = 0;
		this.sptMain.scale = 1.15;
		this.sptMain.update();
		
		Tween.motion(this.sptMain, [ "alpha", "scale" ], [ 1, 1 ], 0.0075, null, null, 0.0001);
		
		this.sptSub.alpha = 0;
		this.sptSub.y = 15;
		this.sptSub.update();
		
		Tween.motion(this.sptSub, [ "alpha", "y" ], [ 1, 0 ], 0.0075, null, 5, 0.0001);
		
		/*Tween.fadeIn(this.spt, function() {
	
		}, 0.05);*/
		
		this.isShow = true;
	};
	
	/*
	 * 
	 */
	this.TextMain.prototype.hide = function(cb_func) {
		
		if (!this.isShow) return;
		
		Tween.motion(this.sptMain, [ "alpha", "scale" ], [ 0, 0.85 ], 0.008, null, null, 0.0001);
		
		Tween.motion(this.sptSub, [ "alpha" ], [ 0 ], 0.008, null, null, 0.0001);
		
		/*Tween.fadeOut(this.spt, function() {
	
		}, 0.05);*/
		
		this.isShow = false;
	};
	
	/*
	 * 
	 */
	this.TextMain.prototype.reset = function() {
		this.sptMain.alpha = 0;
		this.sptMain.update();
		this.sptSub.alpha = 0;
		this.sptSub.update();
	};
	
	var TextMain = this.TextMain;
	
	
	/*******************************************
	 * サブナビのcurrent時のアンダーライン
	 *******************************************/
	this.CurrentLine = function() {
		
		this.currLine = $("nav.lnav div.currentLine");
		this.currLine.css("top", $("nav.lnav").height());
		this.currLine.css("display", "block");
		
		this.currX = 0;
		this.currWidth = 0;
	};
	
	extend(this.CurrentLine, EventDispatcher);
	
	/*
	 * 指定位置まで移動(幅も変わる)
	 */
	this.CurrentLine.prototype.motionTo = function(target) {
		var end_w = $(target).width();
		var x = $(target).offset().left;
		var offset = $("nav.lnav ul").offset().left;
		var end_x = x - offset + 30;
		
		//trace("w = " + width + ", x = " + (x - offset));
		//trace(offset);
		//trace(x);
		
		var currLine = this.currLine;
		var sa = 0;
		var tmp_x = 0, tmp_w = 0;
		var scope = this;
		var sp1 = 8;
		var sp2 = 0.59;
		
		this.onEnterFrame(function() {
			sa += 0.015;
			scope.currX += tmp_x = (end_x - scope.currX) * sa;
			scope.currWidth += tmp_w = (end_w - scope.currWidth) * sa;
			//scope.currX += tmp_x = (end_x - scope.currX) / sp1 + tmp_x * sp2;
			//scope.currWidth += tmp_w = (end_w - scope.currWidth) / sp1 + tmp_w * sp2;
			
			currLine.css("left", scope.currX);
			currLine.css("width", scope.currWidth);
			
			if ((Math.abs(tmp_x) < 0.002) && (Math.abs(tmp_w) < 0.002)) {
				scope.currX = end_x;
				scope.currWidth = end_w;
				currLine.css("left", scope.currX);
				currLine.css("width", scope.currWidth);
				scope.deleteEnterFrame();
			}
		});
	};
	
	var CurrentLine = this.CurrentLine;
	
	
	/*******************************************
	 * スクロールでフェードする基本エレメント
	 *******************************************/
	this.Element = function(spt) {
		
		//モーションタイプ
		//0:ヘッダ(h1), 1:見出し(hx), 2:その他
		this.type = 0;
		
		/*if ($(spt.element).prop("tagName").toLowerCase() == "h1") {
			this.type = 0;
			spt.x = 30;
		} else if ($(spt.element).prop("tagName").toLowerCase().indexOf("h") == 0) {
			this.type = 1;
			spt.x = 10;
		} else {
			this.type = 2;
			spt.y = 20;
		}*/
		
		this.isH2 = $(spt.element).prop("tagName").toLowerCase() == "h2";
		
		this.type = 2;
		//spt.y = 20;
		
		spt.update();
		
		this.spt = spt;
		this.isShown = false;
	};
	
	extend(this.Element, EventDispatcher);
	
	/*
	 * コンテンツ切替時に必ず表示する
	 */
	this.Element.prototype.showEnd = function(hh) {
		
		this.isShown = true;
		var elm = this.spt;
		elm.x = 0;
		elm.y = 0;
		elm.alpha = 1;
		elm.update();
		
		if (this.isH2) {
			elm.element.css("background-size", "800px 1px");
		}
	};
	
	/*
	 * 
	 */
	this.Element.prototype.showInit = function(hh) {
		
		var elm = this.spt;
		var top = $(elm.element).offset().top;
		var is_cutin = top < hh;
		
		if (is_cutin) {
			if (!this.isShown) {
				this.isShown = true;
				var elm = this.spt;
				elm.x = 0;
				elm.y = 0;
				elm.alpha = 1;
				elm.update();
				
				if (this.isH2) {
					elm.element.css("background-size", "800px 1px");
				}
			}
		} else {
			this.isShown = false;
			var elm = this.spt;
			//elm.y = 20;
			elm.alpha = 0;
			if (this.isH2) {
				elm.element.css("background-size", "1px 1px");
			}
			elm.update();
		}
	};
	
	/*
	 * 
	 */
	this.Element.prototype.update = function(hh) {
		
		var elm = this.spt;
		var top = $(elm.element).offset().top;
		var is_cutin = top < hh;
		
		if (is_cutin) {
			if (!this.isShown) {
				this.show(top);
			}
		} else {
			
		}
		/*
		if ($(elm.element).offset().top < hh) {
					elm.alpha = 1;
					elm.update();
				} else {
					elm.alpha = 0;
					elm.update();
				}
		*/
	};
	
	/*
	 * 
	 */
	this.Element.prototype.show = function(top_h) {
		this.isShown = true;
		var elm = this.spt;
		elm.y = 20;
		
		var delay = top_h / 100;
		var scope = this;
		
		switch(this.type) {
			/*case 0:
				Tween.motion(elm, [ "x", "alpha" ], [ 0, 1 ], 0.015, null, delay * globalDelayTime);
				break;
			case 1:
				Tween.motion(elm, [ "x", "alpha" ], [ 0, 1 ], 0.015, null, delay * globalDelayTime);
				break;*/
			case 2:
				Tween.motion(elm, [ "y", "alpha" ], [ 0, 1 ], 0.015, function() {
					if (scope.isH2) {
						var h2 = elm.element;
						var sa = 0;
						var tmp;
						var w = 0;
						var end_w = 800;
						
						elm.onEnterFrame(function() {
							sa += 0.0025;
							w += tmp = (end_w - w) * sa;
							h2.css("background-size", w + "px 1px");
							
							if (Math.abs(tmp) < 0.02) {
								elm.deleteEnterFrame();
							}
						});
					}
				}, delay * globalDelayTime);
				break;
			default:break;
		}
		
		//elm.alpha = 1;
		//elm.update();
	};
	
	var Element = this.Element;
	
	
	/*******************************************
	 * サブナビゲーション
	 *******************************************/
	this.Navigation = function() {
		
	};
	
	extend(this.Navigation, EventDispatcher);
	
	/*
	 * 初期化
	 */
	this.Navigation.prototype.initialize = function(initialIndex, useEffect) {
		
		this.btnPrev = $("div.lnavInner div.pagePrev");
		this.btnNext = $("div.lnavInner div.pageNext");
		
		//前後の大カテゴリのURL
		this.prevHref = $(this.btnPrev.find("a")).attr("href");
		this.nextHref = $(this.btnNext.find("a")).attr("href");
		
		if (!useEffect) {
			
			var litag = $("div.lnavInner li");
			$(litag[initialIndex]).addClass("current");
			
			var subs = $("div.cloneContainer div.subInner");
			
			var categories = [];
			
			for (var i = 0, ln = subs.length; i < ln; i++) {
				var cl = $(subs[i]).attr("class").replace("subInner ", "");
				categories[i] = cl;
				$($(litag[i]).find("a")).attr("href", "index.html?c=" + cl);
			}
			
			this.atag2 = $("a.link2Foot");
			
			for (var i = 0, ln = this.atag2.length; i < ln; i++) {
				var atag = this.atag2[i];
				var category = $(atag).attr("tid");//.replace("link2_", "");
				$(atag).attr("href", "index.html?c=" + category);
			}
			
			trace("initialIndex " + initialIndex + " " + categories.length);
			
			if (initialIndex != 0) {
				$(this.btnPrev.find("a")).attr("href", "index.html?c=" + categories[initialIndex - 1]);
			}
			
			if (initialIndex < (categories.length - 1)) {
				$(this.btnNext.find("a")).attr("href", "index.html?c=" + categories[initialIndex + 1]);
			}
			
			return;
		}
		
		this.litag = $("div.lnavInner li");
		this.atag = $("div.lnavInner li a");
		
		var scope = this;
		
		this.atag .bind("click", function() {
			//var category = $(this).attr("href").replace("#", "");
			var category = $(this).attr("tid");//.replace("link_", "");
			scope.dispatchEvent({type:"clickDirect", args:{category:category}});
		});
		
		$(this.btnPrev.find("a")).attr("href", "javascript:void(0)");
		$(this.btnPrev.find("a")).bind("click", function() {
			scope.dispatchEvent({type:"clickPrev"});
		});
		
		$(this.btnNext.find("a")).attr("href", "javascript:void(0)");
		$(this.btnNext.find("a")).bind("click", function() {
			scope.dispatchEvent({type:"clickNext"});
		});
		
		this.currLine = new CurrentLine();
		this.changeCategory(initialIndex);
		
		this.atag2 = $("a.link2Foot");
		
		this.atag2 .bind("click", function() {
			var category = $(this).attr("tid");//.replace("link2_", "");
			scope.dispatchEvent({type:"clickDirect", args:{category:category}});
		});
	};
	
	/*
	 * 次カテゴリへリンク
	 */
	this.Navigation.prototype.linkToNext = function() {
		location.href = this.nextHref;
	};
	
	/*
	 * 前カテゴリへリンク
	 */
	this.Navigation.prototype.linkToPrev = function() {
		location.href = this.prevHref;
	};
	
	
	/*
	 * カテゴリの切替
	 */
	this.Navigation.prototype.changeCategory = function(index) {
		
		for (var i = 0, ln = this.litag.length; i < ln; i++) {
			var li = $(this.litag[i]);
			
			if (i == index) {
				li.addClass("current");
				this.currLine.motionTo(this.atag[i]);
			} else {
				li.removeClass("current");
			}
			//this.changeColor(a, (i == index) ? "#afa86f" : "#333333");
		}
		
		if (index == 0) {
			//prevを非表示
			
		} else if (index == (this.litag.length - 1)) {
			//nextを非表示
			
		} else {
			//両方とも表示
			
		}
	};
	
	/*
	 * フォントカラーの変更アニメ
	 */
	this.Navigation.prototype.changeColor = function(target, col) {
		
		target.css("color", col);
	};
	
	var Navigation = this.Navigation;
	
	
	/*******************************************
	 * サブコンテンツ共通処理
	 *******************************************/
	this.SubMain = function() {
		
	
		//デフォルトのインデックス
		this.currentIndex = 0;
		
		//var hash = window.location.hash.replace("#","");
		var param = getRequest();
		
		var inners = $("div.cloneContainer div.subInner");
		
		this.navi = new Navigation();
		
		//オフィス＞アクセス用
		this.gmapTag = $('<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3241.5510889441243!2d139.66535414999998!3d35.6634303!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018f36ca8db4bdf%3A0x4a76e9760de187ee!2z44CSMTU1LTAwMzMg5p2x5Lqs6YO95LiW55Sw6LC35Yy65Luj55Sw77yW5LiB55uu77yW4oiS77yRIO-8pu-8rO-8pe-8uu-8qe-8r-S4i-WMl-ayog!5e0!3m2!1sja!2sjp!4v1412081873505" width="758" height="498" frameborder="0" style="border:0"></iframe>');
		
		
		//コンテンツ切替時のウィンドウスクロール用
		this.enterFrame2 = new EventDispatcher();
		
		//演出なしの場合 ///////////////////////////////////////////////////////
		
		if (!useEffect()) {
			
			//trace("no effect");
			
			if (!param || !param.c) {
				param = { c:"index" };
			}
			
			$("div.loadingCover").css("display", "none");
			$("body").addClass("noEffect");
			$("div.mainVisualCopy").append($("div.mainVisual"));
			$("div.mainVisual").append($("div.mainVisualCopyInner"));
			
			for (var i = 0, ln = inners.length; i < ln; i++) {
			
				var inner = $(inners[i]);
				var cl = inner.attr("class").replace("subInner ", "");
				
				var inner = this.getCategoryInner(cl);
				
				if (cl == param.c) {
					$("section.mainBlock").append(inner);
					this.currentIndex = i;
					
					
					this.setAnchorScroll(inner);
					
					var gmap = $(inner.find("div.boxGoogleMaps"));
					
					if (gmap.length > 0) {
						if (gmap.children().length == 0) {
							$(inner.find("div.boxGoogleMaps")).append(this.gmapTag);
						}
					}
				}
			}
			
			this.navi.initialize(this.currentIndex, false);
			
			return;
		}
		
		//演出なしの場合 END ///////////////////////////////////////////////////////
		
		new GNavi();
		
		
		//現在のスクロール位置
		this.currentScrollPos = 0;
		
		//カテゴリ名の配列
		this.categorys = [];
		
		//サブカテ切替中フラグ。trueの時は操作を受け付けない
		this.locked = false;
		
		//インナーの要素配列(個別にフェードする)
		this.innerElementsArray = [];
		
		//インナーの要素配列(個別にフェードする)
		this.currentInnerElements = [];
		
		//要素ずらし係数の変更用
		this.enterFrame1 = new EventDispatcher();
		
		//コンテンツ切替時の横移動用
		this.enterFrame3 = new EventDispatcher();
		
		this.visual = new Sprite("div.mainVisual");
		
		this.mainBlock = new Sprite($("section.mainBlock"));
		
		this.inners = [];
		
		this.currenState = 0;
		
		var table1 = this.mainBlock.element.append($("<table><tbody><tr></tr></tbody></table>"));
		var table2 = $(table1.find("table"));
		table2.addClass("subContentsTable");
		table2.attr("width", TABLE_WIDTH * inners.length + "px");
		table2.attr("cellspacing", 0);
		table2.attr("cellpadding", 0);
		//var tr = $(table1.find("tr"));
		var tr = $(table2.find("tbody tr"));
		//var tr = $("<tr></tr>");
		//table.append(tr);
		
		this.innerTable = new Sprite(table2);
		
		for (var i = 0, ln = inners.length; i < ln; i++) {
			
			var inner = $(inners[i]);
			var cl = inner.attr("class").replace("subInner ", "");
			this.categorys[i] = cl;
			//if (cl == hash) {
			if (cl == param.c) {
				this.currentIndex = i;
			}
			
			var inner = this.getCategoryInner(this.categorys[i]);
			
			var td = $("<td></td>");
			td.attr("width", TABLE_WIDTH + "px");
			td.append(inner);
			
			tr.append(td);
			
			this.inners[i] = new Sprite(td);
			this.inners[i].displayName = "table-cell";
			this.inners[i].child = $(this.inners[i].element.find("div.subInner"));	//独自プロパティ
			this.inners[i].child.css("display", "none");
			
			this.setAnchorScroll(this.inners[i].child);
			
			var elements = $(this.inners[i].child.find("h1,h2,h3,p,ul,div"));
			var innerElements = [];
			
			for (var j = 0, ln2 = elements.length; j < ln2; j++) {
				var elm = new Element(new Sprite(elements[j], { alpha : 0 }));
				innerElements[j] = elm;
				
			}
			
			this.innerElementsArray[i] = innerElements;
		}
		
		new EntryButton();
		
		var backTop = $('#goToPageTop a');
		var anchorName = backTop.attr("href");
		backTop.attr("href", "javascript:void(0)");
		this.setAnchorEvent(backTop, anchorName/*, {
			sp : 0.008,
			min_sp : 0.0005,
			diff_sp : 0.0008,
			lim_tmp : 0.001
		}*/);
		
		var scope = this;
		
		
		//ナビ
		this.navi.addEventListener("clickPrev", function(args) {
			var next = scope.currentIndex - 1;
			
			if (scope.currentIndex != next) {
				if (next >= 0) {
					scope.changeCategory(next);
				} else {
					scope.navi.linkToPrev();
				}
			}
		});
		this.navi.addEventListener("clickNext", function(args) {
			var next = scope.currentIndex + 1;
			
			if (scope.currentIndex != next) {
				if (next < scope.categorys.length) {
					scope.changeCategory(next);
				} else {
					scope.navi.linkToNext();
				}
			}
		});
		this.navi.addEventListener("clickDirect", function(args) {
			var next = 0;
			for (var i = 0, ln = scope.categorys.length; i < ln; i++) {
				if (args.category == scope.categorys[i]) {
					next = i;
					break;
				}
			}
			
			scope.changeCategory(next);
		});
		this.navi.initialize(this.currentIndex, true);
		
		this.text = new TextMain("div.mainVisualCopyInner");
		this.visualText = this.text.spt;//new Sprite("div.mainVisualCopyInner");
		
		this.changeCategory(this.currentIndex, true);
		
		this.startScrollEffect();
		
		var scope = this;
		
		$("div.loadingCover").fadeOut(1000, null, function() {
			scope.text.show(1, false);
		});
		
		//this.initialize();
		
		//Chrome用に戻る・前への場合、一定時間スクロール位置を強制固定するフラグ
		this.forcedScrollLock = false;
		
		this.forcedScrollCount = 0;
		
    $(window).on("popstate", function(ev) {
			
    //$(window).hashchange(function(){
			//clearTrace();
			
			trace(" history.state " + history.state);
			//if (location.hash == "#pageHeader") return;
			if (location.hash.indexOf("#") >= 0) return;
			
			//trace("popstate " + location.hash);
			//trace("state is " + history.state + " pos " + scope.currentScrollPos);
			
			//ページバック時にスクロール位置が戻るのをキャンセル
			scope.forcedScrollLock = true;
			scope.forcedScrollCount = 0;
			
			$(window).scrollTop(scope.currentScrollPos);
			
			//return;
			
      var state = history.state;//location.hash;
			
			var next = 0;
			
			for (var i = 0, ln = scope.categorys.length; i < ln; i++) {
				if (scope.categorys[i] == state) {
					next = i;
					break;
				}
			}
			
			if ((scope.currentIndex != next) && (next < scope.categorys.length)) {
				
				if (scope.locked) return;
				scope.locked = true;
				var prevIndex = scope.currentIndex;
				scope.currentIndex = next;
				scope.removeCurrent(scope.currentIndex, prevIndex, false);
				scope.navi.changeCategory(scope.currentIndex);
			}
    });
   	// $(window).hashchange();
		
		scope.locked = true;
				
		var prevIndex = scope.currentIndex;
		
		scope.removeCurrent(scope.currentIndex, prevIndex, true);
		
		scope.navi.changeCategory(scope.currentIndex);
	};
	
	extend(this.SubMain, EventDispatcher);
	
	/*
	 * アンカーリンクをＪＳ版に変更
	 */
	this.SubMain.prototype.setAnchorScroll = function(target, args) {
		
		var links = $(target).find("a");
		var scope = this;
		
		for (var i = 0, ln = links.length; i < ln; i++) {
			var a = $(links[i]);
			
			if (a.attr("href").indexOf("#") == 0) {
		
				var anchorName = a.attr("href");
				a.attr("href", "javascript:void(0)");
				scope.setAnchorEvent(a, anchorName, args);
			}
		}
	};
	
	/*
	 * アンカーリンクをＪＳ版に変更
	 */
	this.SubMain.prototype.setAnchorEvent = function(atag, anchorName, args) {
		var scope = this;
		console.log(1);
		atag.bind("click", function() {
			if($(anchorName).offset()){
				var position = $(anchorName).offset().top;
				scope.doAnchorScroll(position, args);
			}
			
		});
	};
	
	/*
	 * アンカーリンククリック時のスムーズスクロール処理
	 */
	this.SubMain.prototype.doAnchorScroll = function(target_pos, args) {
		
		var sp = 0.008;
		var min_sp = 0.002;
		var diff_sp = 0.0005;
		var lim_tmp = 0.001;
		
		if (args != null) {
			sp = args.sp;
			min_sp = args.min_sp;
			diff_sp = args.diff_sp;
			lim_tmp = args.lim_tmp;
		}
		
		var sa = 0;
		var h = document.documentElement.scrollTop || document.body.scrollTop;
		var lnavHeight = $('.lnav').height() + 76;
		var end = target_pos - lnavHeight;//footerPos - wH;//$("#pageHeader").height() - 55;
		
		if (end < 0) {
			end = 0;
		}
		//var sp = 0.008;
		var cc = 0;
		var tmp;
		var scope = this;
		
		scope.enterFrame2.onEnterFrame(function() {
			//sp = Math.min(0.015, sp + 0.002);
			sp = Math.max(min_sp, sp - diff_sp);
			sa += sp;
			h += tmp = (end - h) * sa;
			$("html,body").scrollTop(h);
			
			if (++cc > 15 && Math.abs(tmp) < lim_tmp) {
				scope.enterFrame2.deleteEnterFrame();
			}
		});
	};
	
	
	/*
	 * カテゴリの切替
	 */
	this.SubMain.prototype.changeCategory = function(index, is_initial) {
		
		//location.hash = "#" + this.categorys[index];
		
		trace(this.categorys[index] + " is " + this.categorys[index] + "?c=" + this.categorys[index]);
		history.pushState(this.categorys[index], ">> " + this.categorys[index], "?c=" + this.categorys[index]);
		
		if (this.locked) return;
		
		this.locked = true;
		
		var prevIndex = this.currentIndex;
		
		this.currentIndex = index;
		
		this.removeCurrent(this.currentIndex, prevIndex, is_initial);
		
		this.navi.changeCategory(this.currentIndex);
	};
	
	
	/*
	 * 現在表示中のコンテンツを削除
	 */
	this.SubMain.prototype.removeCurrent = function(nextInnerIndex, prevIndex, is_initial) {
		var scope = this;
		
		//$("div.rootContainer").css("height", "100%");
		//$("html").css("overflow", "hidden");
		
		var h = document.documentElement.scrollTop || document.body.scrollTop;
		var wH = $(window).height();
		var footerPos = ($("article.boxArticleEntry").offset().top >> 0);
		
		if (footerPos > (h + wH)) {
			//trace("hide");
			//フッタが隠れている位置なので、いきなり横移動
			scope.changeCurrent(nextInnerIndex, prevIndex, is_initial);
			
		} else {
			//trace("show");
			//フッタが見えている位置なので、見えない位置まで縦移動してから横移動
			
			var sa = 0;
			var end = footerPos - wH;//$("#pageHeader").height() - 55;
			var sp = 0.005;
			var cc = 0;
			var tmp;
			
			if (!is_initial) {
				scope.enterFrame2.onEnterFrame(function() {
					//sa += 0.025;
					sp = Math.min(0.035, sp + 0.002);
					sa += sp;
					h += tmp = (end - h) * sa;
					$("html,body").scrollTop(h);
					
					if (++cc > 15 && Math.abs(tmp) < 0.01) {
						scope.enterFrame2.deleteEnterFrame();
						scope.changeCurrent(nextInnerIndex, prevIndex, is_initial);
					}
				});
			} else {
				scope.changeCurrent(nextInnerIndex, prevIndex);
			}
		}
	};
	
	
	/*
	 * コンテンツを切替える（左右モーションと上下モーション）
	 */
	this.SubMain.prototype.changeCurrent = function(nextInnerIndex, prevIndex, is_initial) {
		
		var scope = this;
		var inners = this.inners;
		
		if (is_initial) {
			
			//初回は横スクロールなしでいきなり登場
			
			for (var i = 0, ln = inners.length; i < ln; i++) {
				var inner = inners[i];
				inner.y = 0;
				inner.update();
				
				if (nextInnerIndex == i) {
					inner.child.css("display", "block");
					
					var gmap = $(inner.child.find("div.boxGoogleMaps"));
					
					if (gmap.length > 0) {
						if (gmap.children().length == 0) {
							$(inner.child.find("div.boxGoogleMaps")).append(scope.gmapTag);
						}
					}
					//$(inner.child.find("div.boxGoogleMaps")).append(scope.gmapTag);
					
					scope.currentInnerElements = scope.innerElementsArray[nextInnerIndex];
					
					var h = window.innerHeight ? window.innerHeight: $(window).height();
					var currTop = document.documentElement.scrollTop || document.body.scrollTop;
					var hh = currTop + h;// - 100;
					var innerElements = scope.currentInnerElements;
						
					for (var j = 0, ln2 = innerElements.length; j < ln2; j++) {
						var elm = innerElements[j];
						elm.showInit(hh);
					}
				} else {
					inner.child.css("display", "none");
				}
			}
			
			var end = -nextInnerIndex * TABLE_WIDTH;
			
			this.innerTable.x = end;
			this.innerTable.update();
			this.locked = false;
			
			return;
		}
		
		//2回目以降は横スクロールモーション有
		
		var end_pos = $("#pageHeader").height();
		var curr_pos = document.documentElement.scrollTop || document.body.scrollTop;
		
		var diff_margin = 0;
		
		if (curr_pos > end_pos) {
			diff_margin = curr_pos - end_pos;
		}
		
		for (var i = 0, ln = this.inners.length; i < ln; i++) {
			var inner = this.inners[i];
			inner.child.css("display", "block");
			
			if (i != prevIndex) {
				inner.y = diff_margin;
				inner.update();
				//inner.child.css("margin-top", diff_margin);
			}
			
			for (var j = 0, ln2 = this.innerElementsArray[i].length; j < ln2; j++) {
				var elm = this.innerElementsArray[i][j];
				elm.showEnd();
			}
		}
		
		
		var curr = this.innerTable.x;
		var end = -nextInnerIndex * TABLE_WIDTH;
		var sa = 0;
		var sp = 0.005;
		var tmp;
		
		var ccc = 0;
		
		this.enterFrame3.onEnterFrame(function() {
			
			//if (++ccc > 10) {
				//ccc = 0;
				
				//sa += 0.0085;
			sp = Math.min(0.01, sp + 0.0005);
			sa += sp;
			curr += tmp = (end - curr) * sa;
			scope.innerTable.x = curr;
			scope.innerTable.update();
			
			for (var i = 0, ln = inners.length; i < ln; i++) {
				var inner = inners[i];
				var ab_x = i * TABLE_WIDTH + curr;
				var alpha = 0;
				
				if (ab_x > -TABLE_WIDTH && ab_x < TABLE_WIDTH) {
					alpha = (TABLE_WIDTH - Math.abs(ab_x)) / TABLE_WIDTH;
				}
				
				inner.alpha = alpha;
				inner.update();
			}
			
			if (Math.abs(tmp) < 0.003) {
				
				scope.enterFrame3.deleteEnterFrame();
				scope.innerTable.x = end;
				scope.innerTable.update();
				scope.locked = false;
				
				for (var i = 0, ln = inners.length; i < ln; i++) {
					var inner = inners[i];
					inner.y = 0;
					inner.update();
					//inner.visible(nextInnerIndex == i);
					
					if (nextInnerIndex == i) {
						inner.child.css("display", "block");
						
					var gmap = $(inner.child.find("div.boxGoogleMaps"));
					
					if (gmap.length > 0) {
						if (gmap.children().length == 0) {
							$(inner.child.find("div.boxGoogleMaps")).append(scope.gmapTag);
						}
					}
						
						//if (gmap.children().length == 0
						
						//$(inner.child.find("div.boxGoogleMaps")).append(scope.gmapTag);
						
						scope.currentInnerElements = scope.innerElementsArray[nextInnerIndex];
						
						var h = window.innerHeight ? window.innerHeight: $(window).height();
						var currTop = document.documentElement.scrollTop || document.body.scrollTop;
						var hh = currTop + h;// - 100;
						var innerElements = scope.currentInnerElements;
							
						for (var j = 0, ln2 = innerElements.length; j < ln2; j++) {
							var elm = innerElements[j];
							elm.showInit(hh);
						}
						
					} else {
						inner.child.css("display", "none");
					}
				}
		
				if (curr_pos > end_pos) {
					$("html,body").scrollTop(end_pos);
				}
				//$("div.rootContainer").css("height", "auto");
				//$("html").css("overflow", "auto");
			}
		//	}
			
		});
	};
	
	
	/*
	 * スクロール時の処理開始(要素のフェード管理)
	 */
	this.SubMain.prototype.startScrollEffect = function() {
		
		
		//////////////////////////////////////////////////////////////
		// マウスホイール処理の上書き
		
		var acc = 0;
		var maxAcc = 15;
		
		var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
		
		if (userAgent.isMac) {
			
			maxAcc = 50;
			
			$(window).bind(mousewheelevent, function(e) {
			
				e.preventDefault();
				
				var delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
				
				acc -= delta;// * 15;
				
				if (acc < -maxAcc) {
					acc = -maxAcc;
				} else if (acc > maxAcc) {
					acc = maxAcc;
				}
			});
			
		} else {
			
			$(window).bind(mousewheelevent, function(e) {
			
				e.preventDefault();
				
				var delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
				
				acc -= delta * 15;
				
				if (acc < -maxAcc) {
					acc = -maxAcc;
				} else if (acc > maxAcc) {
					acc = maxAcc;
				}
			});
		}
		
		var tmp;
		
		var currSc = $(window).scrollTop();
		
		//////////////////////////////////////////////////////////////
		
		var scope = this;
		
		//trace("wh = " + h + ", curr = " + curr);
		
		this.onEnterFrame(function() {
			
			//$("div.debugText p.t1").text(scope.currentScrollPos);
			
			//前へ・戻るでスクロール位置がずれるのを防ぐ用
			if (scope.forcedScrollLock) {
				$(window).scrollTop(scope.currentScrollPos);
				if (++scope.forcedScrollCount > 5) {
					scope.forcedScrollLock = false;
				}
			}
			
			if (scope.locked) return;
			
			if (acc != 0) {
				currSc = $(window).scrollTop();
				
				currSc += acc;
				$(window).scrollTop(currSc >> 0);
				
				if (userAgent.isMac) {
					acc = 0;
				} else {
					if (Math.abs(acc *= 0.9) < 0.3) {
						acc = 0;
					}
				}
				
				if ($(window).scrollTop() == 0) {
					currSc = 0;
					acc = 0;
				}
			}
			
			scope.currentScrollPos = $(window).scrollTop();
			
			var h = window.innerHeight ? window.innerHeight: $(window).height();
			var curr = document.documentElement.scrollTop || document.body.scrollTop;
			var hh = curr + h - 100;
			
			//trace(curr);
			//$("div.dummyLine").css("top", hh);
			
			var end_y = -(curr+30) * 0.6;
			scope.visual.y = end_y;//+= (end_y - scope.visual.y) / 4;
			scope.visual.update();
			
			var text_top = (-curr * 0.5) + 160;
			scope.visualText.y = text_top;
			scope.visualText.update();
			
			var elements = scope.currentInnerElements;
			
			for (var i = 0, ln = elements.length; i < ln; i++) {
				var elm = elements[i];
				elm.update(hh);
			}
			
			if (curr < 100) {
				scope.text.show();
			} else {
				scope.text.hide();
			}
		});
	};
	
	/*
	 * スクロール時の処理停止
	 */
	this.SubMain.prototype.stopScrollEffect = function() {
		
		this.deleteEnterFrame();
	};
	
	/*
	 * 指定カテゴリのインナー要素を(複製して)取得
	 */
	this.SubMain.prototype.getCategoryInner = function(name) {
		 return $("div.cloneContainer div." + name).clone();
	};
	
	
}).apply(baigiejob.sub);



baigiejob.complete = function() {
	new baigiejob.sub.SubMain();
	console.log('complete');
	showMore();
};
function showMore(){
	console.log('showMore1.');
	
}
//自定义函数执行
function showMore(){
	var styleTextOld = '<p style="transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); opacity: 1;">';					
	var styleTextNew = '<p style="transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); opacity: 1;">';			
	var length = styleTextOld.length;
	var box = document.getElementById("box");
    var text = box.innerHTML;
	var indexOfCh = findCharInStr(text, '>');	
	var textContent = text.substr(indexOfCh + 1);
	text = styleTextNew + textContent;
    var newBox = document.createElement("div");
    //var btn = document.createElement("a");
	var btn = document.getElementById('a_showmore');
    newBox.innerHTML = text.substring(0,200);
    btn.innerHTML = text.length > 200 ? "显示全部" : "";
    btn.href = "###";
    btn.onclick = function(){
        if (btn.innerHTML == "显示全部"){ 
            btn.innerHTML = "收起"; 
            newBox.innerHTML = text; 
        }else{ 
            btn.innerHTML = "显示全部"; 
            newBox.innerHTML = text.substring(0,200); 
        } 
    }
    box.innerHTML = ""; 
    box.appendChild(newBox); 
    //box.appendChild(btn); 
}
function findCharInStr(str, ch){
	
	for(var i = 0; i < str.length; i++){
		if(ch == str.charAt(i))
			return i;
	}
	
	return -1;
}


