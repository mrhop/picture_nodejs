/**
 * Created by Donghui Huo on 2015/7/16.
 */
var $picture = require("../picture");
var cookie = require('cookie-dough')();
var GlyphiconLink = require("./GlyphiconLink.jsx");
module.exports = React.createClass({
    handleRequest: function (type, value) {
        var dateType = cookie.get("dateType");
        if (dateType != type) {
            cookie.set("dateType", type,{ maxAge:7200, secure: false,httpOnly:false});
            if ((dateType == null || dateType == "init") && type == "init") {
                //不进行post操作
            } else {
                //进行post操作
                cookie.set("start",  '', { maxAge:-1 });
                cookie.set("limitnum",  '', { maxAge:-1 });
                $(".dropdown .btn").text(value);
                $picture.postRequest();
            }
        }
    }, handleLogin: function () {
        var data = $picture.getLoginData();
        if (data) {
            $.post("/login", data, function (data) {
                if (data.success) {
                    //登陆成功，隐藏登录按钮，补充注销按钮
                    $(".glyphicon-log-in").hide();
                    $(".glyphicon-log-out").show();
                    $('#loginModal').modal('hide');
                    $("#addPic").show();
                    $picture.dataTag =data.user_tags;
                    $picture.tagContainer.setState({data: $picture.dataTag});
                    $picture.postRequest();
                } else {
                    //
                    alert("用户名或密码错误，请重新输入！");
                    $('#username').focus();
                }
            });
        }
    }, handleLogout: function () {
        $.get("/logout", function (data) {
            if (data.success) {
                $(".glyphicon-log-in").show();
                $(".glyphicon-log-out").hide();
                $("#addPic").hide();
            } else {
                //
                alert("登出失败,请检查网络！");
            }
        })
    }, handleKeyPress: function (event) {
        var e = e || window.event;
        if (e.keyCode == 13) {
            this.handleLogin();
        }
    }, componentDidMount: function () {
        var username =  cookie.get("username");
        if(username&&username!='null'){
            $(".glyphicon-log-in").hide();
            $(".glyphicon-log-out").show();
        }
        var dateType = cookie.get("dateType");
        if (!dateType || dateType == 'null' || dateType == "init") {
            $(".dropdown .btn").text("选择时间");
        } else if (dateType == "amonth") {
            $(".dropdown .btn").text("最近一个月");
        } else if (dateType == "threemonth") {
            $(".dropdown .btn").text("最近三个月");
        } else if (dateType == "halfyear") {
            $(".dropdown .btn").text("最近半年");
        } else if (dateType == "ayear") {
            $(".dropdown .btn").text("最近一年");
        } else if (dateType == "lastyear") {
            $(".dropdown .btn").text("上一年");
        } else if (dateType == "all") {
            $(".dropdown .btn").text("不限时间");
        }
        $("#loginModal").on('show.bs.modal', function (event) {
            $('#addModal').modal('hide');
        });
        $("#password").on('keydown', this.handleKeyPress);
    },
    render: function () {
        return (
            <div>
                <div className="dropdown">
                    <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        选择时间
                        <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li><a onClick={this.handleRequest.bind(this,'init','选择时间')}>选择时间</a>
                        </li>
                        <li><a
                            onClick={this.handleRequest.bind(this,'amonth','最近一个月')}>最近一个月</a>
                        </li>
                        <li><a
                            onClick={this.handleRequest.bind(this,'threemonth','最近三个月')}>最近三个月</a></li>
                        <li><a
                            onClick={this.handleRequest.bind(this,'halfyear','最近半年')}>最近半年</a>
                        </li>
                        <li><a onClick={this.handleRequest.bind(this,'ayear','最近一年')}>最近一年</a>
                        </li>
                        <li><a onClick={this.handleRequest.bind(this,'lastyear','上一年')}>上一年</a>
                        </li>
                        <li><a onClick={this.handleRequest.bind(this,'all','不限时间')}>不限时间</a>
                        </li>
                    </ul>
                </div>
                &nbsp;|&nbsp;
                <GlyphiconLink
                    title="登录/扫一扫"
                    className="glyphicon-log-in" data-toggle="modal" data-target="#loginModal">
                </GlyphiconLink>
                <GlyphiconLink
                    title="登出"
                    className="glyphicon-log-out" onClick={this.handleLogout}>
                </GlyphiconLink>

                <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="left">
                                <form id="login-form" className="form-horizontal">
                                    <div>
                                        <h4>用户名/密码登陆</h4>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="title" className="col-xs-2 control-label">用户名</label>

                                        <div className="col-xs-8">
                                            <input type="text" id="username" name="username" className="form-control"
                                                   placeholder="用户名"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="title" className="col-xs-2 control-label">密 码</label>

                                        <div className="col-xs-8">
                                            <input type="password" id="password" name="password" className="form-control"
                                                   placeholder="密 码"/>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="col-xs-8"></span>

                                        <div className="col-xs-2">
                                            <button type="button" id="button_login" onClick={this.handleLogin}
                                                    className="btn btn-primary">登录
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="right">
                                <div>
                                    <h4>扫一扫登录</h4>
                                </div>
                                <img src="/images/login.jpg"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});