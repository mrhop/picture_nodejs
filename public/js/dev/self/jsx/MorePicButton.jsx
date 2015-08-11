/**
 * Created by Donghui Huo on 2015/7/16.
 */
var $picture = require("../picture");
module.exports = React.createClass({
    componentDidMount: function () {
        $(".bottom .more-pic").click(function () {
            if ($picture.loaded == true) {
                $picture.loadImage();
            }
            return false;
        })
    },
    render: function () {
        return (
            <div>
                <a className="more-pic"  >
                    <h4>加载更多......</h4>
                </a>
            </div>);
    }
});