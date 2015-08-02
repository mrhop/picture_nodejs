/**
 * Created by Donghui Huo on 2015/6/30.
 */
'use strict';
var jQuery = require('jquery');
var cookie = require('cookie-dough')();
module.exports = (function ($, window, undefined) {
    'use strict';
    $.Picture = function () {
        //进行图片数据的初始化
        var _this = this;
        $.ajax({
            url: "/pictures",
            async: false,
            dataType: 'json',
            success: function (data) {
                _this.setData(data);
                if(!cookie.get("username")){
                    $(".glyphicon-log-in").show();
                    $(".glyphicon-log-out").hide();
                    $("#addPic").hide();
                }
            }
        });
    };
    $.Picture.prototype = {
        urlNow: "/pictures",
        dataPic: [],
        dataPicId: [],
        addUpPic: null,
        picContainer: null,
        loaded: true,
        $grid: null,
        xhr: null,
        fileDataFinal: null,
        tagContainer: null,
        dataTag:[],
        init: function () {
            $(".pic-container-a").colorbox({
                rel: 'pic-container-a',
                photoRegex: /(\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg))?((#|\?).*)?$/i,
                current: '{current}/{total}'
            });
        },
        postRequest:function(){
            var _this = this;
            $.post(_this.urlNow, _this.getKeywords(), function (data) {
                _this.setData(data);
                _this.picContainer.setState({data: _this.dataPic},function(){
                    _this.reload();
                });
                if(!cookie.get("username")){
                    $(".glyphicon-log-in").show();
                    $(".glyphicon-log-out").hide();
                    $("#addPic").hide();
                }
            });
        },
        reload: function () {
            $(".pic-container-a").colorbox({
                rel: 'pic-container-a',
                photoRegex: /(\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg))?((#|\?).*)?$/i,
                current: '{current}/{total}'
            });
        },
        setData: function (dataInsert) {
            this.dataPic = dataInsert;
            this.dataPicId = [];
            if (dataInsert != null) {
                for (var i = 0; i < dataInsert.length; i++) {
                    this.dataPicId = this.dataPicId.concat(dataInsert[i]._id);
                }
            }

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
        ,
        loadImage: function () {
            this.loaded = false;
            $(".bottom .more-pic h4").text("加载中......");
            var start = cookie.get('start');
            if (!start || start == 'null') {
                if (this.urlNow == "/pictures" || !this.urlNow) {
                    cookie.set("start", 0,{ maxAge:7200, secure: false,httpOnly:false});
                } else {
                    cookie.set("start", (!this.dataPic || this.dataPic.length == 0) ? 0 : this.dataPic.length - 1,{ maxAge:7200, secure: false,httpOnly:false});
                }
            } else {
                cookie.set("start", Number(start) + 5,{ maxAge:7200, secure: false,httpOnly:false});
            }
            var limitnum = cookie.get("limitnum");
            if (limitnum == 'null' || !limitnum) {
                cookie.set("limitnum", 5,{ maxAge:7200, secure: false,httpOnly:false});
            }
            var _this = this;
            $.post(this.urlNow, this.getKeywords(), function (data) {
                _this.appendData(data);
                _this.picContainer.setState({data: _this.dataPic}, function () {
                    _this.reload();
                    $(".bottom .more-pic h4").text("加载更多......");
                    _this.loaded = true;
                    if(!cookie.get("username")){
                        $(".glyphicon-log-in").show();
                        $(".glyphicon-log-out").hide();
                        $("#addPic").hide();
                    }
                });
            });
        }
        ,
        //获取关键字内容
        getKeywords: function () {
            var keywords = $("#header-search").val();
            var keywordFilter = null;
            if (keywords != null && keywords.trim() != "") {
                keywordFilter = {keywords: keywords.split(" ")};
            }
            return keywordFilter;
        },
        getLoginData: function () {
            var username = $("#username").val();
            var password = $("#password").val();
            if (username==null||username.trim()== "") {
                $("#username").focus();
                alert("用户名不能为空");
                return false;
            }
            if (password==null||password.trim()== "") {
                $("#password").focus();
                alert("密码不能为空");
                return false;
            }
            return {"username":username,"password":password};
        },
        compressImg: function (source_img_obj, quality, output_format) {
            var mime_type = "image/jpeg";
            var cvs = document.createElement('canvas');
            cvs.width = source_img_obj.naturalWidth;
            cvs.height = source_img_obj.naturalHeight;
            if (source_img_obj.naturalWidth / 1024 > source_img_obj.naturalHeight / 768) {
                cvs.width = 1024;
                cvs.height = parseInt(source_img_obj.naturalHeight * 1024 / source_img_obj.naturalWidth);
            } else {
                cvs.height = 768;
                cvs.width = parseInt(source_img_obj.naturalWidth * 768 / source_img_obj.naturalHeight);
            }
            if (typeof output_format !== "undefined" && output_format == "png") {
                mime_type = "image/png";
            }
            var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0, cvs.width, cvs.height);
            var newImageData = cvs.toDataURL(mime_type, quality / 100);
            var result_image_obj = new Image();
            result_image_obj.src = newImageData;
            return result_image_obj;
        },
        dataURItoBlob: function (dataURI) {
            'use strict'
            var byteString,
                mimestring;

            if (dataURI.split(',')[0].indexOf('base64') !== -1) {
                byteString = atob(dataURI.split(',')[1])
            } else {
                byteString = decodeURI(dataURI.split(',')[1])
            }

            mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0]

            var content = new Array();
            for (var i = 0; i < byteString.length; i++) {
                content[i] = byteString.charCodeAt(i)
            }

            return new Blob([new Uint8Array(content)], {type: mimestring});
        },
        uploadFile: function (formData, url) {
            var _this = this;
            if (!this.xhr) {
                this.xhr = new XMLHttpRequest();
            }
            this.xhr.addEventListener('progress', function (e) {
                var done = e.position || e.loaded, total = e.total;
                console.log('xhr progress: ' + (Math.floor(done / total * 1000) / 10) + '%');
            }, false);
            if (this.xhr.upload) {
                this.xhr.upload.onprogress = function (e) {
                    var done = e.loaded, total = e.total;
                    console.log('xhr.upload progress: ' + done + ' / ' + total + ' = ' + (Math.floor(done / total * 1000) / 10) + '%');
                };
                this.xhr.upload.onloadend = function (e) {
                    document.getElementById("filename").value = "";
                    console.log(['xhr upload complete', e]);
                    $("#button_add").removeAttr("disabled");
                    document.getElementById("pic-upload").reset();
                    _this.fileDataFinal = null;
                    $.post(_this.urlNow, _this.getKeywords(), function (data) {
                        _this.setData(data);
                        _this.picContainer.setState({data: _this.dataPic}, function () {
                            _this.reload();
                        });
                    });
                };
            }
            this.xhr.onreadystatechange = function (e) {
                if (4 == this.readyState) {
                    document.getElementById("filename").value = "";
                    console.log(['xhr upload complete', e]);
                    $("#button_add").removeAttr("disabled");
                    document.getElementById("pic-upload").reset();
                    _this.fileDataFinal = null;
                    $.post(_this.urlNow, _this.getKeywords(), function (data) {
                        _this.setData(data);
                        _this.picContainer.setState({data: _this.dataPic}, function () {
                            _this.reload();
                        });
                    });
                }
            };
            this.xhr.open('post', url, true);
            this.xhr.send(formData);
        }
    };
    return new $.Picture();
})(jQuery, window);

