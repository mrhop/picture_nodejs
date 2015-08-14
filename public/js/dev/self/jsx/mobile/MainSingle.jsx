/**
 * Created by Donghui Huo on 2015/7/16.
 */
module.exports = React.createClass({
    getInitialState: function () {
        $picture.picSingleMain = this;
        return {data: $picture.dataPic};
    },
    componentDidMount: function () {
        $picture.swipeImgEventAdd(document.querySelector(".main-img"));
    },
    handleTap:function(){
        $picture.showHideBar();
    },
    render: function () {
        var index = $picture.currentPictureIndex;
        var imgCurrent = <img className="main-img animated-fast" draggable="false"
                              src={$picture.dataPic[index].img_url}/>;
        var imgPrev = null;
        var imgNext = null;
        if (index != 0) {
            imgPrev = <img className="main-img-left animated-fast" draggable="false"
                           src={$picture.dataPic[index-1].img_url}/>;
        }
        if (index + 1 < $picture.dataPicId.length) {
            imgNext = <img className="main-img-right animated-fast" draggable="false"
                           src={$picture.dataPic[index+1].img_url}/>;
        }
        return (
            <global.Hammer onTap={this.handleTap} component="div" className="main">
                {imgPrev}
                {imgCurrent}
                {imgNext}
            </global.Hammer>
        );
    }
});