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
            <div className="header">
                <a className="left-a animated-fast">
                    <span className="glyphicon glyphicon-th-list"></span>&nbsp;
                    <img className="top-logo" src="images/logo.png" />
                </a>
                    <form id="header-form" onSubmit ={this.handleSubmit}>
                        <input type="text" placeholder="输入您感兴趣的......"/>
                        <a className="glyphicon glyphicon-remove"></a>
                        <a className="glyphicon glyphicon-search"></a>
                    </form>
            </div>
        );
    }
});