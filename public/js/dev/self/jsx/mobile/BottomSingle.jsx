/**
 * Created by Donghui Huo on 2015/7/16.
 */
module.exports = React.createClass({
    handleSubmit: function () {
        console.log("right");
        return false;
    },
    handleBack: function () {
        $(document.body).removeClass("single");
        if (cookie.get("username")) {
            $(document.body).addClass("login");
        } else {
            $(document.body).removeClass("login");
        }
        if(!$picture.MultiPage){
            var Multi = require("./Multi.jsx");
            $picture.MultiPage = <Multi />;
        }
        React.render($picture.MultiPage, document.body);
    },
    render: function () {
        var pic = $picture.dataPic[$picture.currentPictureIndex];
        var date = new Date(pic.capture_date);
        var title = pic.title + " 由 " + pic.create_user + " 拍摄于 " + date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();

        return (
            <div className="bottom animated-fast">
                <div className="desc">
                    <p id="bottomTitle">{title}</p>
                    <p id="bottomDesc">{pic.desc}</p>
                </div>
                <p className="bottom-tool">
                    <span className="left"><global.Hammer onTap={this.handleBack} component="a">返回相册</global.Hammer></span>
                    <span className="right">
                        <a className="glyphicon glyphicon-heart"></a><a className="glyphicon glyphicon-thumbs-up"></a>
                    </span>
                </p>
            </div>
        );
    }
});