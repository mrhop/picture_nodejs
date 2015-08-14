/**
 * Created by Donghui Huo on 2015/8/5.
 */
'use strict';
var cookie = require('cookie-dough')();
module.exports = (function ($, window, undefined) {
    $.Picture = function () {
        //进行图片数据的初始化
        var _this = this;
        $.ajax({
            url: "/pictures",
            async: false,
            dataType: 'json',
            success: function (data) {
                _this.setData(data);
            }
        });
    };
    $.Picture.prototype = {
        left_menu_animate_finish_flag: true,
        bar_animate_finish_flag: true,
        ticking: true,
        direction: 'left',
        pfx: ["webkit", "moz", "MS", "o", ""],
        pic_index: 0,
        //前后台交互所用数据
        urlNow: "/pictures",
        dataPic: [],
        dataPicId: [],
        picContainer: null,
        currentPictureIndex: null,
        MultiPage: null,
        SinglePage: null,
        loaded: true,
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
        showOrHideSearch: function () {
            if ($("#header-form .glyphicon-search").css("display") != "none") {
                $("#header-form .glyphicon-search").hide();
                $('#header-form input').show().focus();
                $('#header-form .glyphicon-remove').show();
            } else {
                $('#header-form .glyphicon-remove').hide();
                $('#header-form input').hide();
                $('#header-form .glyphicon-search').show();
            }
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
        switchPicLeft: function (ev) {
            if (this.currentPictureIndex + 1 < this.dataPicId.length) {
                if (this.ticking) {
                    this.ticking = false;
                    $(ev.target).addClass("slideOutLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        //$(this).removeClass("main-img-right");
                        $(this).addClass("main-img-left").removeClass("main-img").removeClass("slideOutLeft");
                    });
                    $(ev.target).next().addClass("slideInRight").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $(this).removeClass("main-img-right").removeClass("slideInRight").addClass("main-img");
                        $(this).attr("data-id", $picture.dataPic[$picture.currentPictureIndex]._id);
                        var username = cookie.get("username");
                        if ($picture.dataPic[$picture.currentPictureIndex].heart_users.indexOf(username) > -1) {
                            $(".glyphicon-heart").addClass("selected");
                        }
                        $picture.currentPictureIndex = $picture.currentPictureIndex + 1;
                        //此处需要将页面上的内容进行替换，当前页码数等
                        var pic = $picture.dataPic[$picture.currentPictureIndex];
                        $("#picCount").text(($picture.currentPictureIndex + 1) + "/" + $picture.dataPic.length);
                        var img_urls = pic.img_url.split("/");
                        var imgName = img_urls[img_urls.length - 1];
                        $(".glyphicon-download-alt").attr("href", pic.img_url).attr("download", imgName);
                        var date = new Date(pic.capture_date);
                        var title = pic.title + " 由 " + pic.create_user + " 拍摄于 " + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                        $("#bottomTitle").text(title);
                        $("#bottomDesc").text(pic.desc);
                        if ($picture.currentPictureIndex + 1 < $picture.dataPicId.length) {
                            $('<img class="main-img-right animated-fast" draggable="false" src="' + $picture.dataPic[$picture.currentPictureIndex + 1].img_url + '">').insertAfter($(this));
                        } else {
                            //进行pic的后续获取操作
                            $picture.loadImage();//放置其内
                        }
                        $("#picCount").text(($picture.currentPictureIndex + 1) + "/" + $picture.dataPic.length);
                        $picture.swipeImgEventAdd(this);
                    });
                }
            }
        },
        switchPicRight: function (ev) {
            if (this.currentPictureIndex > 0) {
                //需要改变图片的样式
                if (this.ticking) {
                    this.ticking = false;
                    $(ev.target).addClass("slideOutRight").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $(this).addClass("main-img-right").removeClass("main-img").removeClass("slideOutRight");
                    });
                    $(ev.target).prev().addClass("slideInLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $(this).removeClass("main-img-left").removeClass("slideInLeft").addClass("main-img");
                        $(this).attr("data-id", $picture.dataPic[$picture.currentPictureIndex]._id);
                        var username = cookie.get("username");
                        if ($picture.dataPic[$picture.currentPictureIndex].heart_users.indexOf(username) > -1) {
                            $(".glyphicon-heart").addClass("selected");
                        }
                        $picture.currentPictureIndex = $picture.currentPictureIndex - 1;
                        //此处需要将页面上的内容进行替换，当前页码数等
                        var pic = $picture.dataPic[$picture.currentPictureIndex];
                        $("#picCount").text(($picture.currentPictureIndex + 1) + "/" + $picture.dataPic.length);
                        var img_urls = pic.img_url.split("/");
                        var imgName = img_urls[img_urls.length - 1];
                        $(".glyphicon-download-alt").attr("href", pic.img_url).attr("download", imgName);
                        var date = new Date(pic.capture_date);
                        var title = pic.title + " 由 " + pic.create_user + " 拍摄于 " + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                        $("#bottomTitle").text(title);
                        $("#bottomDesc").text(pic.desc);
                        if ($picture.currentPictureIndex > 0) {
                            $('<img class="main-img-left animated-fast" draggable="false" src="' + $picture.dataPic[$picture.currentPictureIndex - 1].img_url + '">').insertBefore($(this));
                        }
                        $picture.swipeImgEventAdd(this);
                    });
                }
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
        },
        //数据交互处理
        setData: function (dataInsert) {
            this.dataPic = dataInsert;
            this.dataPicId = [];
            if (dataInsert != null) {
                for (var i = 0; i < dataInsert.length; i++) {
                    this.dataPicId = this.dataPicId.concat(dataInsert[i]._id);
                }
            }

        },
        //获取关键字内容
        getKeywords: function () {
            var keywords = $("#header-search").val();
            var keywordFilter = null;
            if (keywords != null && keywords.trim() != "") {
                keywordFilter = {keywords: keywords.split(" ")};
            }
            return keywordFilter;
        },
        postRequest: function () {
            var _this = this;
            $.post(_this.urlNow, _this.getKeywords(), function (data) {
                _this.setData(data);
                if (!$("body").hasClass("single")) {
                    _this.picContainer.setState({data: _this.dataPic}, function () {
                        //_this.reload();
                    });
                }
                if (!cookie.get("username")) {
                    $(document.body).removeClass("login");
                }
            });
        },
        getLoginData: function () {
            var username = $("#username").val();
            var password = $("#password").val();
            if (username == null || username.trim() == "") {
                $("#username").focus();
                $("#errormessage").text("用户名不能为空");
                return false;
            }
            if (password == null || password.trim() == "") {
                $("#password").focus();
                $("#errormessage").text("密码不能为空");
                return false;
            }
            $("#errormessage").text("");
            return {"username": username, "password": password};
        },
        loadImage: function () {
            this.loaded = false;
            var start = cookie.get('start');
            if (!start || start == 'null') {
                if (this.urlNow == "/pictures" || !this.urlNow) {
                    cookie.set("start", 0, {maxAge: 7200, secure: false, httpOnly: false});
                } else {
                    cookie.set("start", (!this.dataPic || this.dataPic.length == 0) ? 0 : this.dataPic.length - 1, {
                        maxAge: 7200,
                        secure: false,
                        httpOnly: false
                    });
                }
            } else {
                cookie.set("start", Number(start) + 5, {maxAge: 7200, secure: false, httpOnly: false});
            }
            var limitnum = cookie.get("limitnum");
            if (limitnum == 'null' || !limitnum) {
                cookie.set("limitnum", 5, {maxAge: 7200, secure: false, httpOnly: false});
            }
            var _this = this;
            $.post(this.urlNow, this.getKeywords(), function (data) {
                _this.appendData(data);
                _this.loaded = true;
                if ($picture.dataPic.length > $picture.currentPictureIndex + 1) {
                    if ($("body").hasClass("single")) {
                        $("#picCount").text(($picture.currentPictureIndex + 1) + "/" + $picture.dataPic.length);
                        $('<img class="main-img-right animated-fast" draggable="false" src="' + $picture.dataPic[$picture.currentPictureIndex + 1].img_url + '">').insertAfter($("img.main-img"));
                    } else {
                        _this.picContainer.setState({data: _this.dataPic}, function () {
                            if (cookie.get("username")) {
                                $(document.body).addClass("login");
                            } else {
                                $(document.body).removeClass("login");
                            }
                        });
                    }
                }
            });
        },
        appendData: function (dataInsert) {
            if (dataInsert != null) {
                if (this.dataPic.length == 0) {
                    this.dataPic = dataInsert;
                    for (var i = 0; i < dataInsert.length; i++) {
                        this.dataPicId = this.dataPicId.concat(dataInsert[i]._id);
                    }
                } else {
                    for (var i = 0; i < dataInsert.length; i++) {
                        if (!RegExp("\\b" + dataInsert[i]._id + "\\b").test(this.dataPicId)) {
                            this.dataPic = this.dataPic.concat(dataInsert[i]);
                            this.dataPicId = this.dataPicId.concat(dataInsert[i]._id);
                        }
                    }
                }
            }
        }
    }
    return new $.Picture();
})(global.$, window);
