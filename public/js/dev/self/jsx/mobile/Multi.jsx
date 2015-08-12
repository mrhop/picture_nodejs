/**
 * Created by Donghui Huo on 2015/7/16.
 */
var Head = require("./Head.jsx");
var Left = require("./Left.jsx");
var Main = require("./Main.jsx");
module.exports = React.createClass({
    getInitialState: function () {
        //将数据进行初始化

    },
    componentDidMount:function(){
        global.$picture.showHideLeftBind();
    },
    render: function () {
        return (
            <div>
                <Head />
                <div className="page">
                    <Left />
                    <Main/>
                </div>
            </div>
        );
    }
});