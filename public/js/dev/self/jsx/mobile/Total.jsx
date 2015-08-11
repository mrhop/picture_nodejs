/**
 * Created by Donghui Huo on 2015/8/5.
 */
var React = global.React = require('react');
var Zepto = global.$ = $ = require('zepto-browserify').Zepto;
var hammer =  global.hammer = require('hammerjs');
var $picture = global.$picture = require("../../picture-mobile.js");
$(document).ready(function () {
    if (!$("body").hasClass("single")) {
        $picture.showHideLeftBind();
    } else {
        $picture.showHideBarBind();
        $picture.swipeImgEventAdd(document.querySelector(".main-img"));
    }
});