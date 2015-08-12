/**
 * Created by Donghui Huo on 2015/7/16.
 */
module.exports = React.createClass({
    handleSubmit: function () {
        console.log("right");
        return false;
    },
    render: function () {
        return (
            <div className="bottom animated-fast">
                <div className="desc">
                    <p>2011/11/11</p>
                    <p>一些介绍，一些说明</p>
                </div>
                <p className="bottom-tool">
                    <span className="left"><a>返回相册</a></span>
                    <span className="right">
                        <a className="glyphicon glyphicon-heart"></a><a className="glyphicon glyphicon-thumbs-up"></a>
                    </span>
                </p>
            </div>
        );
    }
});