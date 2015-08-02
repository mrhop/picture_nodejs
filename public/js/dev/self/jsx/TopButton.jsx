/**
 * Created by Donghui Huo on 2015/7/16.
 */
var React = require('react');
var $ = require('jquery');
module.exports = React.createClass({
    componentDidMount: function () {
        $(".bottom-tool .top").click(function () {
            $("html,body").animate({scrollTop: 0}, 300);
            return false;
        });
    },
    render: function () {
        return (
            <a className="top"   styleName="display: none;" title="回到顶部"></a>
        );
    }
});