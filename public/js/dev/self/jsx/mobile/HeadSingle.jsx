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
        if (!$picture.MultiPage) {
            var Multi = require("./Multi.jsx");
            $picture.MultiPage = <Multi />;
        }
        React.render($picture.MultiPage, document.body);

    },
    render: function () {
        var picCount = ($picture.currentPictureIndex + 1) + "/" + $picture.dataPic.length;
        var picCurrent = $picture.dataPic[$picture.currentPictureIndex];
        var img_urls = picCurrent.img_url.split("/");
        var imgName = img_urls[img_urls.length - 1];
        return (
            <div className="header animated-fast">
                <global.Hammer onTap={this.handleBack} component="a"
                               className="glyphicon glyphicon-arrow-left"><span id="picCount">{picCount}</span>
                </global.Hammer>
                <span style={{float:"right"}}>
                    <a className="glyphicon glyphicon-download-alt" href={picCurrent.img_url} download={imgName}></a>
                </span>
            </div>
        );
    }
});