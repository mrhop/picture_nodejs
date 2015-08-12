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
            <div className="header animated-fast">
                <a className="glyphicon glyphicon-arrow-left"></a>
                <span>1/2</span>
                <span style={{float:"right"}}>
                    <a className="glyphicon glyphicon-download-alt" href="pictures/big.jpg" download="big.jpg"></a>
                </span>
            </div>
        );
    }
});