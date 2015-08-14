/**
 * Created by Donghui Huo on 2015/8/13.
 */
/**
 * Created by Donghui Huo on 2015/7/16.
 */
module.exports = React.createClass({
    handleTap: function (id) {
        $picture.currentPictureIndex = $picture.dataPicId.indexOf(id);
        //进入single页面-获取3张图片前面1张 后面1张
        $(document.body).addClass("single");
        if(! $picture.SinglePage){
            var Single = require("./Single.jsx");
            $picture.SinglePage = <Single/>;
        }
        React.render( $picture.SinglePage,document.body);
    },
    render: function () {
        return (
            <global.Hammer onTap={this.handleTap.bind(this,this.props.id)} component="div" className="picture-container">
                    <img src={this.props.thumburl} draggable="false"/>
                    <a className="glyphicon glyphicon-heart selected"><span>{this.props.hearttimes}</span></a>
                    <a className="glyphicon glyphicon-thumbs-up"><span>{this.props.uptimes}</span></a>
            </global.Hammer>
        );
    }
});