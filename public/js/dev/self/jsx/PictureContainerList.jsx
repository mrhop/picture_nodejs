/**
 * Created by Donghui Huo on 2015/7/16.
 */
var React = require('react');
var $ = require('jquery');
var $picture = require("../picture");
var PictureContainer = require("./PictureContainer.jsx");
var MasonryMixin = require('react-masonry-mixin');
var masonryOptions = {
    transitionDuration: 0
};
module.exports = React.createClass({
    mixins: [MasonryMixin('masonryContainer', masonryOptions)],
    getInitialState: function () {
        $(window).scroll(this.handleScroll);
        $picture.picContainer = this;
        return {data: $picture.dataPic};
    },
    handleScroll: function (e) {
        var scrollValue = Math.ceil($(window).scrollTop());
        scrollValue > 60 ? $(".bottom-tool .top").fadeIn() : $(".bottom-tool .top").fadeOut();
        if (Math.abs( $(document).height() - $(window).height()-scrollValue)<=1) {
            if ($picture.loaded == true) {
                $picture.loadImage();
            }
        }
    },
    componentDidMount: function () {
        $picture.init();
    },
    render: function () {
        var pictureContainers = this.state.data.map(function (picture) {
            return (
                <PictureContainer key={picture._id} title={picture.title} createuser={picture.create_user}
                                  capturedate={picture.capture_date} tag={picture.tag} desc={picture.desc}
                                  imgurl={picture.img_url}
                                  heartusers={picture.heart_users}
                                  upusers={picture.up_users} uptimes={picture.up_times} id={picture._id} />
            );
        });
        return (
            <div ref="masonryContainer">
                {pictureContainers}
            </div>
        );
    }
})