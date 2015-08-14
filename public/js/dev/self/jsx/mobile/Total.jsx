/**
 * Created by Donghui Huo on 2015/8/5.
 */
var React = global.React = require('react');
var Zepto = global.$ = $ = require('zepto-browserify').Zepto;
var hammer =  global.hammer = require('hammerjs');
var Hammer = global.Hammer =  require('react-hammerjs');
var $picture = global.$picture = require("../../picture-mobile.js");
var cookie = global.cookie = require('cookie-dough')();
$(document).ready(function () {
    if (!cookie.get("single")) {
        $(document.body).removeClass("single");
        if (cookie.get("username")) {
            $(document.body).addClass("login");
        }else{
            $(document.body).removeClass("login");
        }
        var Multi = require("./Multi.jsx");
        $picture.MultiPage = <Multi />;
        React.render($picture.MultiPage,document.body);
    } else {
        $(document.body).addClass("single");
        var Single = require("./Single.jsx");
        $picture.SinglePage = <Single />;
        React.render($picture.SinglePage,document.body);
    }
});