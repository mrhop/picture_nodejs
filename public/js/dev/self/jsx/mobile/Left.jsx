/**
 * Created by Donghui Huo on 2015/7/16.
 */
module.exports = React.createClass({
    handleSubmit: function (e) {
        var data = $picture.getLoginData();
        if (data) {
            $.post("/login", data, function (data) {
                if (data.success) {
                    //登陆成功，隐藏登录按钮，补充注销按钮
                    $(document.body).addClass("login");
                    $picture.postRequest();
                } else {
                    $("#errormessage").text("用户名/密码错误");
                    $('#username').focus();
                }
            });
        }
        e.preventDefault();
    },
    handleLogout: function (e) {
        $.get("/logout", function (data) {
            if (data.success) {
                $(document.body).removeClass("login");
                $picture.postRequest();
            }
            e.preventDefault();
        })
    },
    handleTap: function (e) {
        $picture.showOrHideLeftMenu();
        e.preventDefault();
    },
    handleRequest: function (type) {
        cookie.set("start", '', {maxAge: -1});
        cookie.set("limitnum", '', {maxAge: -1});
        if (type == 'eye') {
            //进行发现的请求、响应以及渲染
            $picture.urlNow = "/pictures/eye"
            $(".left span").parent().removeClass("selected");
            $(".left span.glyphicon-eye-open").parent().addClass("selected");
            $picture.postRequest();
        } else if (type == 'leaf') {
            //进行最新的请求、响应以及渲染
            $picture.urlNow = "/pictures/new";
            $(".left span").parent().removeClass("selected");
            $(".left span.glyphicon-leaf").parent().addClass("selected");
            $picture.postRequest();
        } else if (type == 'fire') {
            //进行最火的请求，响应以及渲染
            $picture.urlNow = "/pictures/hot";
            $(".left span").parent().removeClass("selected");
            $(".left span.glyphicon-fire").parent().addClass("selected");
            $picture.postRequest();
        } else if (type == 'heart') {
            //进行红心的请求，响应以及渲染
            $picture.urlNow = "/pictures/heart";
            $(".left span").parent().removeClass("selected");
            $(".left span.glyphicon-heart").parent().addClass("selected");
            $picture.postRequest();
        }
    },
    render: function () {
        return (
            <div className="left">
                <div className="left-menu animated-fast">
                    <div className="left-inner">
                        <div className="login-user">
                            <p><span className="glyphicon glyphicon-user"></span>
                                <global.Hammer onTap={this.handleLogout} component="a"
                                               className="glyphicon glyphicon-log-out"/>
                            </p>
                            <p><span>huodh</span></p>
                        </div>
                        <form className="not-login-form" onSubmit={this.handleSubmit}>
                            <p>用户登录&nbsp;<span id="errormessage"></span></p>

                            <p><input name="username" id="username" type="txt" placeholder="用户名"/></p>

                            <p><input name="password" id="password" type="password" placeholder="密 码"/></p>

                            <p className="login-p">
                                <button> 登录</button>
                            </p>
                        </form>
                        <global.Hammer onTap={this.handleRequest.bind(this,'eye')} component="a">
                            <span className="glyphicon glyphicon-eye-open"></span><span
                            style={{paddingLeft:"5px"}}>发现</span>
                        </global.Hammer>
                        <global.Hammer onTap={this.handleRequest.bind(this,'leaf')} component="a">
                            <span className="glyphicon glyphicon-leaf"></span><span
                            style={{paddingLeft:"5px"}}>最新</span>
                        </global.Hammer>
                        <global.Hammer onTap={this.handleRequest.bind(this,'fire')} component="a">
                            <span className="glyphicon glyphicon-fire"></span><span
                            style={{paddingLeft:"5px"}}>最火</span>
                        </global.Hammer>
                        <global.Hammer onTap={this.handleRequest.bind(this,'heart')} component="a">
                            <span className="glyphicon glyphicon-heart"></span><span
                            style={{paddingLeft:"5px"}}>收藏</span>
                        </global.Hammer>

                    </div>
                </div>
                <global.Hammer onTap={this.handleTap} component="div" className="left-back-mask animated-fast" />
            </div>
        );
    }
});