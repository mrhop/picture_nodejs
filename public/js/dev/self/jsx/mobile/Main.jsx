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
            <div className="main">
                <div className="picture-container">
                    <img src="pictures/1.jpg" draggable="false"/>
                    <a className="glyphicon glyphicon-heart"><span>12</span></a>
                    <a className="glyphicon glyphicon-thumbs-up"><span>12</span></a>
                </div>
                <div className="picture-container"><img src="pictures/1.jpg" draggable="false"/></div>
                <div className="picture-container"><img src="pictures/1.jpg" draggable="false"/></div>
            </div>
        );
    }
});