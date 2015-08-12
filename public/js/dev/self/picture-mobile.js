/**
 * Created by Donghui Huo on 2015/8/5.
 */
'use strict';
var cookie = require('cookie-dough')();
module.exports = (function ($, window, undefined) {
    $.Picture = function () {
        //进行图片数据的初始化

    };
    $.Picture.prototype = {
        left_menu_animate_finish_flag: true,
        bar_animate_finish_flag: true,
        ticking: true,
        direction: 'left',
        pfx: ["webkit", "moz", "MS", "o", ""],
        pic_index: 0,
        showOrHideLeftMenu: function () {
            var _this = this;
            if (_this.left_menu_animate_finish_flag == true) {
                _this.left_menu_animate_finish_flag = false;
                if ($("div.left-back-mask").css("display") != "none") {
                    $("div.left-menu").removeClass("slideInLeft").addClass("slideOutLeft");
                    $(".header a.left-a").removeClass("slideOutHeaderLeft").addClass("slideInHeaderLeft");
                    $("div.left-back-mask").removeClass("fadeIn").addClass("fadeOut").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $(this).hide();
                        _this.left_menu_animate_finish_flag = true;
                    });
                } else {
                    $("div.left-menu").removeClass("slideOutLeft").addClass("slideInLeft").addClass("left-menu-open");
                    $(".header a.left-a").removeClass("slideInHeaderLeft").addClass("slideOutHeaderLeft");
                    $("div.left-back-mask").show().removeClass("fadeOut").addClass("fadeIn").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        _this.left_menu_animate_finish_flag = true;
                    });
                }
            }
        },
        showLeftMenu: function () {
            var _this = this;
            if (_this.left_menu_animate_finish_flag == true) {
                _this.left_menu_animate_finish_flag = false;
                $("div.left-menu").removeClass("slideOutLeft").addClass("slideInLeft").addClass("left-menu-open");
                $(".header a.left-a").removeClass("slideInHeaderLeft").addClass("slideOutHeaderLeft");
                $("div.left-back-mask").show().removeClass("fadeOut").addClass("fadeIn").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    _this.left_menu_animate_finish_flag = true;
                });
            }
        },
        hideLeftMenu: function () {
            var _this = this;
            if (_this.left_menu_animate_finish_flag == true) {
                _this.left_menu_animate_finish_flag = false;
                $("div.left-menu").removeClass("slideInLeft").addClass("slideOutLeft");
                $(".header a.left-a").removeClass("slideOutHeaderLeft").addClass("slideInHeaderLeft");
                $("div.left-back-mask").removeClass("fadeIn").addClass("fadeOut").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $(this).hide();
                    _this.left_menu_animate_finish_flag = true;
                });
            }
        },
        showHideLeftBind: function () {
            var _this = this;
            $(".left-a").click(function () {
                _this.showOrHideLeftMenu();
                return false;
            });
            $('div.left-back-mask').click(function (e) {
                _this.hideLeftMenu();
            });
            $('#header-form .glyphicon-remove').click(function (e) {
                $(this).hide();
                $('#header-form input').hide();
                $('#header-form .glyphicon-search').show();
            });
            $('#header-form .glyphicon-search').click(function (e) {
                $(this).hide();
                $('#header-form input').show().focus();
                $('#header-form .glyphicon-remove').show();
            });
            var mainPage = document.querySelector(".page");
            var mc = new global.hammer.Manager(mainPage);
            mc.add(new global.hammer.Swipe());
            mc.on("swiperight", function () {
                _this.showLeftMenu();
            });
        },
        showHideBar: function () {
            var _this = this;
            if (_this.bar_animate_finish_flag == true) {
                _this.bar_animate_finish_flag = false;
                if ($("body.single div.header").hasClass("slideOutUp")) {
                    $("body.single div.header").removeClass("slideOutUp").addClass("slideInDown");
                    $("body.single div.bottom").removeClass("slideOutDown").addClass("slideInUp").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        _this.bar_animate_finish_flag = true;
                    });
                } else {
                   $("body.single div.header").removeClass("slideInDown").addClass("slideOutUp");
                    $("body.single div.bottom").removeClass("slideInUp").addClass("slideOutDown").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        _this.bar_animate_finish_flag = true;
                    });
                }
            }
        },
        showHideBarBind: function () {
            var _this = this;
            var mainPage = document.querySelector(".main");
            var mc = new global.hammer.Manager(mainPage);
            mc.add(new global.hammer.Tap());
            mc.on("tap", function () {
                _this.showHideBar();
            });
        },
        switchPicLeft: function (ev) {
            if (this.ticking) {
                this.ticking =false;
                $(ev.target).addClass("slideOutLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    //$(this).removeClass("main-img-right");
                    $(this).addClass("main-img-left").removeClass("main-img").removeClass("slideOutLeft");
                });
                $(ev.target).next().addClass("slideInRight").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $(this).removeClass("main-img-right").removeClass("slideInRight").addClass("main-img");
                    if (!$(this).next()[0]) {
                        $('<img class="main-img-right animated-fast" draggable="false" src="pictures/big4.jpg">').insertAfter($(this));
                    }
                    $picture.swipeImgEventAdd(this);
                });

            }
        },
        switchPicRight: function (ev) {
            //需要改变图片的样式
            if (this.ticking) {
                this.ticking =false;
                $(ev.target).addClass("slideOutRight").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $(this).addClass("main-img-right").removeClass("main-img").removeClass("slideOutRight");
                });
                $(ev.target).prev().addClass("slideInLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $(this).removeClass("main-img-left").removeClass("slideInLeft").addClass("main-img");
                    if (!$(this).prev()[0]) {
                        $('<img class="main-img-left animated-fast" draggable="false" src="pictures/big4.jpg">').insertBefore($(this));
                    }
                    $picture.swipeImgEventAdd(this);
                });
            }
        },

        swipeImgEventAdd: function (element) {
            //var element = _this.currentElement||element;
            var mc = new global.hammer.Manager(element);
            mc.add(new global.hammer.Swipe());
            mc.on("swipeleft", function (ev) {
                $picture.switchPicLeft(ev);
            });
            mc.on("swiperight", function (ev) {
                $picture.switchPicRight(ev);
            });
            $picture.ticking = true;
        },
        prefixedEvent: function (element, type, callback) {
            for (var p = 0; p < this.pfx.length; p++) {
                if (!this.pfx[p]) type = type.toLowerCase();
                element.addEventListener(this.pfx[p] + type, callback, false);
            }
        }
    }
    return new $.Picture();
})(global.$, window);
