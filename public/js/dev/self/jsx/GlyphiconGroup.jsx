/**
 * Created by Donghui Huo on 2015/7/16.
 */
var React = require('react');
var $ = require('jquery');
var $picture = require("../picture");
var cookie = require('cookie-dough')();
var GlyphiconLink = require("./GlyphiconLink.jsx");
module.exports = React.createClass({
    handleRequest: function (type) {
        cookie.set("start", '', { maxAge:-1 });
        cookie.set("limitnum", '', { maxAge:-1 });
        if (type == 'eye') {
            //进行发现的请求、响应以及渲染
            $picture.urlNow = "/pictures/eye"
            $(".header a").removeClass("selected");
            $(".header a.glyphicon-eye-open").addClass("selected");
            $picture.postRequest();
        } else if (type == 'leaf') {
            //进行最新的请求、响应以及渲染
            $picture.urlNow = "/pictures/new";
            $(".header a").removeClass("selected");
            $(".header a.glyphicon-leaf").addClass("selected");
            $picture.postRequest();
        } else if (type == 'fire') {
            //进行最火的请求，响应以及渲染
            $picture.urlNow = "/pictures/hot";
            $(".header a").removeClass("selected");
            $(".header a.glyphicon-fire").addClass("selected");
            $picture.postRequest();
        } else if (type == 'heart') {
            //进行红心的请求，响应以及渲染
            $picture.urlNow = "/pictures/heart";
            $(".header a").removeClass("selected");
            $(".header a.glyphicon-heart").addClass("selected");
            $picture.postRequest();
        }
    },
    render: function () {
        return (
            <div>
                <a href="/"><img className="top-logo" src="images/logo.png" /></a>
                &nbsp;|&nbsp;
                <GlyphiconLink
                    onClick={this.handleRequest.bind(this,'eye')}
                    title="发现"
                    className="glyphicon-eye-open">
                </GlyphiconLink>
                &nbsp;|&nbsp;
                <GlyphiconLink
                    onClick={this.handleRequest.bind(this,'leaf')}
                    title="最新"
                    className="glyphicon-leaf">
                </GlyphiconLink>
                &nbsp;|&nbsp;
                <GlyphiconLink
                    onClick={this.handleRequest.bind(this,'fire')}
                    title="最火"
                    className="glyphicon-fire">
                </GlyphiconLink>
                &nbsp;|&nbsp;
                <GlyphiconLink
                    onClick={this.handleRequest.bind(this,'heart')}
                    title="我喜欢的"
                    className="glyphicon-heart">
                </GlyphiconLink>
            </div>
        );
    }
});