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
            <div className="left">
                <div className="left-menu animated-fast">
                    <div className="left-inner">
                        <div className="login-user">
                            <p><span className="glyphicon glyphicon-user"></span> <a className="glyphicon glyphicon-log-out"></a></p>
                            <p><span>huodh</span></p>
                        </div>
                        <form className="not-login-form" onSubmit={this.handleSubmit}>
                            <p>用户登录</p>
                            <p><input type="txt" placeholder="用户名" /></p>
                            <p><input type="password" placeholder="密 码" /></p>
                            <p className="login-p"><button onClick={this.handleSubmit} >登录</button></p>
                        </form>
                        <a><span className="glyphicon glyphicon-eye-open"></span><span style={{paddingLeft:"5px"}}>发现</span></a>
                        <a><span className="glyphicon glyphicon-leaf"></span><span style={{paddingLeft:"5px"}}>最新</span></a>
                        <a><span className="glyphicon glyphicon-fire"></span><span style={{paddingLeft:"5px"}}>最火</span></a>
                        <a><span className="glyphicon glyphicon-heart"></span><span style={{paddingLeft:"5px"}}>收藏</span></a>
                    </div>
                </div>
                <div className="left-back-mask animated"></div>
            </div>
        );
    }
});