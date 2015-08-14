/**
 * Created by Donghui Huo on 2015/7/16.
 */
var upInterval = 10000;
module.exports = React.createClass({
    handleHeart: function (event) {
        if ($picture.heart_animate_finish_flag) {
            $picture.heart_animate_finish_flag = false;
            $("#errormessage").text("");
            if (!cookie.get("username")) {
                $("#errormessage").text("请登录后操作");
                $picture.heart_animate_finish_flag = true;
                return;
            }
            var data = {};
            if ($(event.target).hasClass("selected")) {
                data = {id: $(".main-img").attr("data-id"), heartFlag: false}
                $(event.target).removeClass("selected")
            } else {
                data = {id: $(".main-img").attr("data-id"), heartFlag: true}
                $(event.target).addClass("selected")
            }
            $.post("/heart", data, function (data) {
                if (!data.success) {
                    $("#errormessage").text("请登录后操作");
                } else {
                    var pic = $picture.dataPic[$picture.currentPictureIndex];
                    var username = cookie.get("username");
                    pic.heart_users.indexOf(username);
                    var index = pic.heart_users.indexOf(username);
                    if (index > -1) {
                        pic.heart_users.splice(index, 1);
                        pic.heart_times = pic.heart_times - 1;
                    } else {
                        pic.heart_users[pic.heart_users.length] = cookie.get("username");
                        pic.heart_times = pic.heart_times + 1;
                    }
                }
                $picture.heart_animate_finish_flag = true;
            });
        }
    },
    handleUp: function () {
        $("#errormessage").text("");
        if (!cookie.get("dateUp") || new Date().valueOf() - new Date(cookie.get("dateUp")).valueOf() > upInterval) {
            var data = {id: $(".main-img").attr("data-id")}
            $.post("/up", data, function (data) {
                if (!data.success) {
                    $picture.postRequest();
                } else {
                    var pic = $picture.dataPic[$picture.currentPictureIndex];
                    cookie.set("dateUp", new Date(), {maxAge: 7200, secure: false, httpOnly: false});
                    pic.up_times = pic.up_times + 1;
                }
            });
        } else {
            $("#errormessage").text("请等待5分钟后操作");
        }

    },
    handleBack: function () {
        $(document.body).removeClass("single");
        if (cookie.get("username")) {
            $(document.body).addClass("login");
        } else {
            $(document.body).removeClass("login");
        }
        if (!$picture.MultiPage) {
            var Multi = require("./Multi.jsx");
            $picture.MultiPage = <Multi />;
        }
        React.render($picture.MultiPage, document.body);
    },
    render: function () {
        var pic = $picture.dataPic[$picture.currentPictureIndex];
        var username = cookie.get("username");
        var heartClass = "glyphicon glyphicon-heart";
        if (pic.heart_users.indexOf(username) > -1) {
            heartClass = "glyphicon glyphicon-heart selected"
        }
        var date = new Date(pic.capture_date);
        var title = pic.title + " 由 " + pic.create_user + " 拍摄于 " + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        return (
            <div className="bottom animated-fast">
                <div className="desc">
                    <p id="bottomTitle">{title}</p>

                    <p id="bottomDesc">{pic.desc}</p>
                </div>
                <p className="bottom-tool">
                    <span className="left"><global.Hammer onTap={this.handleBack} component="a">返回相册
                    </global.Hammer></span>
                    <span className="right">
                        <span id="errormessage"></span>&nbsp;
                        <global.Hammer onTap={this.handleHeart} component="a" className={heartClass}/>
                        <global.Hammer onTap={this.handleUp} component="a" className="glyphicon glyphicon-thumbs-up"/>
                    </span>
                </p>
            </div>
        );
    }
});