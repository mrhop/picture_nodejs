/**
 * Created by Donghui Huo on 2015/7/16.
 */
var PictureContainer = require("./PictureContainer.jsx");
module.exports = React.createClass({
    getInitialState: function () {
        $picture.picContainer = this;
        return {data: $picture.dataPic};
    },
    getMorePic: function (e) {
        if ($picture.loaded == true) {
            $picture.loadImage();
        }
        e.preventDefault();
    },
    render: function () {
        var pictureContainers = this.state.data.map(function (picture) {
            return (
                <PictureContainer key={picture._id}
                                  thumburl={picture.thumb_url}
                                  hearttimes={picture.heart_times} uptimes={picture.up_times} id={picture._id}/>
            );
        });
        return (
            <div className="main">
                {pictureContainers}
                <div className="bottom">
                    <div className="showMorePic">
                        <global.Hammer onTap={this.getMorePic} component="a" className="more-pic"><h4>加载更多......</h4></global.Hammer>
                    </div>
                </div>
            </div>
        );
    }
});