/**
 * Created by Donghui Huo on 2015/7/16.
 */
var Head = require("./HeadSingle.jsx");
var Main = require("./MainSingle.jsx");
var Bottom = require("./BottomSingle.jsx");
module.exports = React.createClass({
    render: function () {
        return (
            <div className="page">
                <Head />
                <Main/>
                <Bottom/>
            </div>
        );
    }
});