/**
 * Created by Donghui Huo on 2015/7/16.
 */
module.exports = React.createClass({
    handleSubmit: function (e) {
        //变更数据
        cookie.set("start", '', {maxAge: -1});
        cookie.set("limitnum", '', {maxAge: -1});
        $picture.postRequest();
        $picture.showOrHideLeftMenu();
        e.preventDefault();
    },
    handleTap: function () {
        $picture.showOrHideLeftMenu();
        return false;
    },
    handleTapSearch: function () {
        $picture.showOrHideSearch();
        return false;
    },
    componentDidMount: function () {
    },
    render: function () {
        return (
            <div className="header">
                <global.Hammer onTap={this.handleTap} options ={{recognizers:{tap:{time:500,interval:100}}}} component="a" className="left-a animated-fast">
                    <span className="glyphicon glyphicon-th-list"></span>&nbsp;
                    <img className="top-logo" src="images/logo.png" />
                </global.Hammer>
                    <form id="header-form" onSubmit ={this.handleSubmit}>
                        <input id="header-search" type="text" placeholder="输入您感兴趣的......"/>
                        <global.Hammer onTap={this.handleTapSearch} options ={{recognizers:{tap:{time:500,interval:100}}}} component="a" className="glyphicon glyphicon-remove" />
                        <global.Hammer onTap={this.handleTapSearch} options ={{recognizers:{tap:{time:500,interval:100}}}} component="a" className="glyphicon glyphicon-search" />
                    </form>
            </div>
        );
    }
});