/**
 * Created by Donghui Huo on 2015/7/16.
 */
var Head = require("./Head.jsx");
var Left = require("./Left.jsx");
var Main = require("./Main.jsx");
module.exports = React.createClass({
    getInitialState: function () {
        return null;
    },
    handleSwipe: function () {
        if ($("div.left-back-mask").css("display") == "none") {
            $picture.showOrHideLeftMenu();
        }
        return false;
    },
    render: function () {
        return (
            <div>
                <Head />
                <global.Hammer onSwipe={this.handleSwipe} options ={{recognizers:{swipe:{direction:4}}}}  component="div"  className="page" >
                    <Left />
                    <Main/>
                </global.Hammer>
            </div> 
        );
    }
});