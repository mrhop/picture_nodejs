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
                    <img className="main-img-left animated-fast" draggable="false"  src="pictures/big2.jpg"/>
                    <img className="main-img animated-fast" draggable="false"  src="pictures/big.jpg"/>
                    <img className="main-img-right animated-fast" draggable="false"  src="pictures/big3.jpg"/>
                </div>
        );
    }
});