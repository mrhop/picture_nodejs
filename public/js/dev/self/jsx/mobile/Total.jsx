/**
 * Created by Donghui Huo on 2015/8/5.
 */
var React = global.React = require('react');
var Zepto = global.$ = $ = require('zepto-browserify').Zepto;
var hammer =  global.hammer = require('hammerjs');
var $picture = global.$picture = require("../../picture-mobile.js");
var cookie = require('cookie-dough')();
$(document).ready(function () {
    if (!cookie.get("single")) {
        if (cookie.get("username")) {
            $(document.body).addClass("login");
        }
        var Multi = require("./Multi.jsx");
        React.render(<Multi />,document.body);
    } else {
        var Single = require("./Single.jsx");
        $(document.body).addClass("single");
        React.render(<Single />,document.body);
    }
});