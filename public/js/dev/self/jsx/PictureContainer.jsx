/**
 * Created by Donghui Huo on 2015/7/16.
 */
var cookie = require('cookie-dough')();
var $picture = require("../picture");
var upInterval = 10000;
module.exports = React.createClass({
    handleHeart:function(event){
        if(!cookie.get("username")){
            alert("请登录后操作");
            return;
        }
        var data = {};
        if($(event.target).hasClass("true")){
            data = {id:$(event.target).data("id"),heartFlag:false}
            $(event.target).removeClass("true")
        }else{
            data = {id:$(event.target).data("id"),heartFlag:true}
            $(event.target).addClass("true")
        }
        $.post("/heart", data, function (data) {
            if(!data.success){
                alert("请登录后操作");
            }
            $picture.postRequest();
        });
    },
    handleUp:function(){
        if(!cookie.get("dateUp")||new Date().valueOf()-new Date(cookie.get("dateUp")).valueOf()>upInterval){
            var _this = $(event.target);
            var data = {id:_this.data("id")}
            $.post("/up", data, function (data) {
                if(!data.success){
                    $picture.postRequest();
                }else{
                    _this.data("uptimes",(Number(_this.data("uptimes"))+1));
                    _this.attr("title","已有"+_this.data("uptimes")+"赞");
                    cookie.set("dateUp",new Date(),{ maxAge:7200, secure: false,httpOnly:false});
                }
            });
        }else{
            alert("点赞时隔5分钟，请稍后操作");
        }

    },
    render: function () {
        var username = cookie.get("username");
        var heart = "";
        var thumbsup = "";
        var thumbsupTitle = "还没有人点赞";
        if (this.props.heartusers && this.props.heartusers.indexOf(username) > -1) {
            heart = "like glyphicon glyphicon-heart true";
        } else {
            heart = "like glyphicon glyphicon-heart";
        }
        thumbsup = "up glyphicon glyphicon-thumbs-up";
        /*if (this.props.upusers && this.props.upusers.indexOf(username) > -1) {
            thumbsup = "up glyphicon glyphicon-thumbs-up true";
        } else {
            thumbsup = "up glyphicon glyphicon-thumbs-up";
        }*/
        if (this.props.uptimes>0) {
            thumbsupTitle = "已有"+this.props.uptimes+"赞";
         }

        var date = new Date(this.props.capturedate)
        var title = this.props.title + " 由 " + this.props.createuser + " 拍摄于 " + date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();

        var spanStr = this.props.tag.map(function (tag) {
            return (
                <span key={tag} className='clip'>{tag}</span>
            );
        });

        return (
            <div className="pic-container">
                <a className="pic-container-a" title={title} href={this.props.imgurl}>
                    <img src={this.props.thumbbigurl}/>
                </a>

                <div className="desc">
                    <p>
                        <span className="glyphicon glyphicon-tag" title="标签"/>
                        {spanStr}
                    </p>

                    <p className="desc-p">
                        <span className="glyphicon glyphicon-comment" title="描述"/>{this.props.desc}
                    </p>
                </div>

                <span className={heart} data-id={this.props.id} onClick={this.handleHeart}/>
                <span className={thumbsup} title={thumbsupTitle} data-id={this.props.id} data-uptimes={this.props.uptimes} onClick={this.handleUp}/>
            </div>);
    }
})