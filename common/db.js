/**
 * Created by Donghui Huo on 2015/7/6.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://album:album@182.92.83.169/album');
Array.prototype.getMongoUnique = function(){
    var u = {}, a = [];
    for(var i = 0, l = this.length; i < l; ++i){
        if(u.hasOwnProperty(this[i]._id)) {
            continue;
        }
        a.push(this[i]);
        u[this[i]._id] = 1;
    }
    return a;
}
var Picture = mongoose.model('pictureTab', {
    code: String,
    title: String,
    tag: [{type: String}],
    desc: String,
    img_url: String,
    thumb_big_url:String,
    thumb_url:String,
    up_users:[{type: String}],
    up_times: Number,
    heart_users:[{type: String}],
    heart_times: Number,
    create_user: String,
    capture_date: {type: Date, default: new Date()},
    is_recommend: Boolean,
    is_hide: Boolean
}, "picture_tab");
var User = mongoose.model('userTab', {
    user_name: String,
    user_password: String,
    user_tags: [{type: String}],
    is_hide: Boolean
}, 'user_tab');

exports.mongoose = mongoose;
exports.Picture = Picture;
exports.User = User;
