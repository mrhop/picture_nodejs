/**
 * Created by Donghui Huo on 2015/7/16.
 */
var React = require('react');
var $ = require('jquery');
var $picture = require("../picture");
var cookie = require('cookie-dough')();
module.exports = React.createClass({
    handleSubmit: function () {
        cookie.set("start", '', {maxAge: -1});
        cookie.set("limitnum", '', {maxAge: -1});
        $picture.postRequest();
        return false;
    },
    render: function () {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" id="header-search" className="form-control" placeholder="输入您感兴趣的......"/>
                <a className="glyphicon glyphicon-search" onClick={this.handleSubmit}/>
            </form>
        );
    }
});