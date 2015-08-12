/**
 * Created by Donghui Huo on 2015/7/16.
 */
var Head = require("./HeadSingle.jsx");
var Main = require("./MainSingle.jsx");
var Bottom = require("./BottomSingle.jsx");
module.exports = React.createClass({
    handleSubmit: function () {
        console.log("right");
        return false;
    },
    componentDidMount: function () {
        global.$picture.showHideBarBind();
        global.$picture.swipeImgEventAdd(document.querySelector(".main-img"));
    },
    render: function () {
        return (
            <div className="page">
                <Head />
                <Main/>
                <Bottom/>
            </div>
        );
    }
});