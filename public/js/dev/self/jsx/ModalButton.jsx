/**
 * Created by Donghui Huo on 2015/7/16.
 */
var React = require('react');
var $ = require('jquery');
var $picture = require("../picture");
var cookie = require('cookie-dough')();
module.exports = React.createClass({
    componentDidMount: function () {
        if (!cookie.get("username")) {
            $("#addPic").hide();
        }
    },
    render: function () {
        return (
            <a className="add" id="addPic" title="添加图片" data-toggle="modal" data-target="#addModal"></a>
        );
    }
});