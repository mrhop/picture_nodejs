var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var db = require('../common/db');
var fs = require('fs');
var md5 = require('md5');
var extend = require('util')._extend
var concat = require('unique-concat');
var mobileRegex = /(Android|iPhone|iPod|iPad|Windows Phone|MQQBrowser)+/gi;
require('date-utils');
var array = require("array-extended");
var pic_select = {
    title: 1,
    tag: 1,
    desc: 1,
    up_users: 1,
    heart_users: 1,
    img_url: 1,
    create_user: 1,
    capture_date: 1,
    up_times: 1
};
function handleError(res, err) {
    res.send("Sth wrong" + err);
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.clearCookie("dateType", {maxAge: -1, httpOnly: false});
    res.clearCookie("limitnum", {maxAge: -1, httpOnly: false});
    res.clearCookie("start", {maxAge: -1, httpOnly: false});
    var userAgent = req.get('User-Agent');
    if (mobileRegex.test(userAgent)) {
        res.render('mobile');
    } else {
        res.render('index');
    }
});

/* GET home page. */
router.get('/mobile', function (req, res, next) {
    res.clearCookie("dateType", {maxAge: -1, httpOnly: false});
    res.clearCookie("limitnum", {maxAge: -1, httpOnly: false});
    res.clearCookie("start", {maxAge: -1, httpOnly: false});
    res.cookie('username', "abc", {maxAge: 7200000, httpOnly: false});
    //res.clearCookie("single", {maxAge: -1, httpOnly: false});
    res.cookie('single', "abc", {maxAge: 7200000, httpOnly: false});
    res.render('mobile');
});
//慢慢需要加上每年年表
function getDateScope(req, defaultBegin, defaultEnd) {
    var dateType = req.cookies.dateType;
    if (dateType == 'null' || dateType == "init" || !dateType) {
        return {
            capture_date: {
                $gte: defaultBegin,
                $lte: defaultEnd
            }
        };
    } else if (dateType == "amonth") {
        return {
            capture_date: {
                $gte: Date.today().add({days: -29}),
                $lte: Date.tomorrow()
            }
        };
    } else if (dateType == "threemonth") {
        return {
            capture_date: {
                $gte: Date.today().add({days: -89}),
                $lte: Date.tomorrow()
            }
        };
    } else if (dateType == "halfyear") {
        return {
            capture_date: {
                $gte: Date.today().add({days: -179}),
                $lte: Date.tomorrow()
            }
        };
    } else if (dateType == "ayear") {
        return {
            capture_date: {
                $gte: Date.today().add({days: -364}),
                $lte: Date.tomorrow()
            }
        };
    } else if (dateType == "lastyear") {
        return {
            capture_date: {
                $gte: Date.today().add({days: -729}),
                $lte: Date.today().add({days: -364})
            }
        };
    } else if (dateType == "all") {
        return {};
    }
    //慢慢需要加上每年年表
}

function getKeyFilter(req, res) {
    var findKeyFilter = {};
    if (req.body.keywords != null) {
        var keywords = req.body.keywords;
        var keyFilterArr = new Array();
        keyFilterArr.push({tag: {$in: keywords}})
        keywords.forEach(function (element) {
            keyFilterArr.push({title: {$regex: '.*' + element + '.*', $options: 'i'}});
        })
        findKeyFilter = {$or: keyFilterArr}
    }
    return findKeyFilter;
}

function getUserFilter(req, res) {
    var sess = req.session;
    var userLimit = {};
    if (sess.user) {
        userLimit = {heart_users: sess.user.user_name};
    }
    return userLimit;
}


function findAllPictures(req, res) {
    var findKeyFilter = getKeyFilter(req, res);
    var docWrap = [];
    var capture_date = getDateScope(req, Date.today(), Date.tomorrow());
    var capture_date_up = getDateScope(req, Date.today().add({days: -29}), Date.tomorrow());
    var capture_date_heart = getDateScope(req, Date.today().add({days: -89}), Date.tomorrow());
    var capture_date_new = getDateScope(req, Date.today().add({days: -179}), Date.tomorrow());

    var limitnum = 5;
    db.Picture.find(extend(extend({is_recommend: true, is_hide: false}, capture_date), findKeyFilter)).
        limit(limitnum).sort({capture_date: -1}).select(pic_select).exec(function (e, docs) {
            if (e) {
                return handleError(res, error);
            }
            docWrap = docWrap.concat(docs);
            db.Picture.find(extend(extend({is_hide: false}, capture_date_up), findKeyFilter)).
                limit(limitnum).sort({up_times: -1, capture_date: -1}).select(pic_select).exec(function (e, docs) {
                    if (e) {
                        return handleError(res, error);
                    }
                    docWrap = docWrap.concat(docs);
                    db.Picture.find(extend(extend(extend({is_hide: false}, getUserFilter(req, res)), capture_date_heart), findKeyFilter)).
                        limit(limitnum).sort({
                            heart_times: -1,
                            capture_date: -1
                        }).select(pic_select).exec(function (e, docs) {
                            if (e) {
                                return handleError(res, error);
                            }
                            docWrap = docWrap.concat(docs);
                            db.Picture.find(extend(extend({is_hide: false}, capture_date_new), findKeyFilter)).
                                limit(limitnum + 10).sort({capture_date: -1}).select(pic_select).exec(function (e, docs) {
                                    if (e) {
                                        return handleError(res, error);
                                    }
                                    docWrap = docWrap.concat(docs).getMongoUnique();
                                    var sess = req.session;
                                    sess.initDocId = [];
                                    for (var i = 0; i < docWrap.length; i++) {
                                        sess.initDocId = sess.initDocId.concat(docWrap[i]._id);
                                    }
                                    res.send(docWrap);
                                });
                        });
                });
        })
}

function findEyePictures(req, res) {
    var findKeyFilter = getKeyFilter(req, res);
    var docWrap = [];
    var capture_date = getDateScope(req, Date.today().add({days: -29}), Date.tomorrow());
    var limitnum = (req.cookies.limitnum == 'null' || !req.cookies.limitnum) ? 20 : req.cookies.limitnum;
    var start = (req.cookies.start == 'null' || !req.cookies.start) ? 0 : req.cookies.start;
    db.Picture.find(extend(extend({
        is_recommend: true,
        is_hide: false
    }, capture_date), findKeyFilter)).skip(start).
        limit(limitnum).sort({capture_date: -1}).select(pic_select).exec(function (e, docs) {
            if (e) {
                return handleError(res, error);
            }
            docWrap = docWrap.concat(docs);
            res.send(docWrap);
        })
}

function findNewPictures(req, res) {
    var findKeyFilter = getKeyFilter(req, res);
    var docWrap = [];
    var capture_date = getDateScope(req, Date.today().add({days: -179}), Date.tomorrow());
    var limitnum = (req.cookies.limitnum == 'null' || !req.cookies.limitnum) ? 20 : req.cookies.limitnum;
    var start = (req.cookies.start == 'null' || !req.cookies.start) ? 0 : req.cookies.start;
    var notid = {};
    var sess = req.session;
    if (sess.initDocId.length > 0) {
        notid = {
            _id: {
                $nin: sess.initDocId
            }
        };
    }
    db.Picture.find(extend(extend(extend({is_hide: false}, notid), capture_date), findKeyFilter)).skip(start).
        limit(limitnum).sort({capture_date: -1}).select(pic_select).exec(function (e, docs) {
            if (e) {
                return handleError(res, error);
            }
            docWrap = docWrap.concat(docs);
            res.send(docWrap);
        })
}

function findHotPictures(req, res) {
    var findKeyFilter = getKeyFilter(req, res);
    var docWrap = [];
    var capture_date = getDateScope(req, Date.today().add({days: -29}), Date.tomorrow());
    var limitnum = (req.cookies.limitnum == 'null' || !req.cookies.limitnum) ? 20 : req.cookies.limitnum;
    var start = (req.cookies.start == 'null' || !req.cookies.start) ? 0 : req.cookies.start;
    db.Picture.find(extend(extend({is_hide: false}, capture_date), findKeyFilter)).skip(start).
        limit(limitnum).sort({up_times: -1, capture_date: -1}).select(pic_select).exec(function (e, docs) {
            if (e) {
                return handleError(res, error);
            }
            docWrap = docWrap.concat(docs);
            res.send(docWrap);
        })
}

function findHeartPictures(req, res) {
    //需要结合用户，就如收藏
    var findKeyFilter = getKeyFilter(req, res);
    var username = req.cookies.username;
    var docWrap = [];
    var capture_date = getDateScope(req, Date.today().add({days: -89}), Date.tomorrow());
    var limitnum = (req.cookies.limitnum == 'null' || !req.cookies.limitnum) ? 20 : req.cookies.limitnum;
    var start = (req.cookies.start == 'null' || !req.cookies.start) ? 0 : req.cookies.start;
    db.Picture.find(extend(extend(extend({is_hide: false}, getUserFilter(req, res)), capture_date), findKeyFilter)).skip(start).
        limit(limitnum).sort({heart_times: -1, capture_date: -1}).select(pic_select).exec(function (e, docs) {
            if (e) {
                return handleError(res, error);
            }
            docWrap = docWrap.concat(docs);
            res.send(docWrap);
        })
}

router.get('/pictures', function (req, res, next) {
    res.clearCookie("dateType", {maxAge: -1, httpOnly: false});
    res.clearCookie("limitnum", {maxAge: -1, httpOnly: false});
    res.clearCookie("start", {maxAge: -1, httpOnly: false});
    findAllPictures(req, res);
// res.send("pictures all first time");
});

router.post('/pictures', function (req, res, next) {
    if (req.cookies.limitnum == 'null' || !req.cookies.limitnum) {
        findAllPictures(req, res);
    } else {
        findNewPictures(req, res)
    }
});

router.get('/pictures/eye', function (req, res, next) {
    res.clearCookie("dateType", {maxAge: -1, httpOnly: false});
    res.clearCookie("limitnum", {maxAge: -1, httpOnly: false});
    res.clearCookie("start", {maxAge: -1, httpOnly: false});
    findEyePictures(req, res);
// res.send("pictures all first time");
});

router.post('/pictures/eye', function (req, res, next) {
    findEyePictures(req, res);
});

router.get('/pictures/new', function (req, res, next) {
    res.clearCookie("dateType", {maxAge: -1, httpOnly: false});
    res.clearCookie("limitnum", {maxAge: -1, httpOnly: false});
    res.clearCookie("start", {maxAge: -1, httpOnly: false});
    var sess = req.session;
    sess.initDocId = [];
    findNewPictures(req, res);
// res.send("pictures all first time");
});

router.post('/pictures/new', function (req, res, next) {
    var sess = req.session;
    sess.initDocId = [];
    findNewPictures(req, res);
});

router.get('/pictures/hot', function (req, res, next) {
    res.clearCookie("dateType", {maxAge: -1, httpOnly: false});
    res.clearCookie("limitnum", {maxAge: -1, httpOnly: false});
    res.clearCookie("start", {maxAge: -1, httpOnly: false});
    findHotPictures(req, res);
// res.send("pictures all first time");
});

router.post('/pictures/hot', function (req, res, next) {
    findHotPictures(req, res);
});

router.get('/pictures/heart', function (req, res, next) {
    res.clearCookie("dateType", {maxAge: -1, httpOnly: false});
    res.clearCookie("limitnum", {maxAge: -1, httpOnly: false});
    res.clearCookie("start", {maxAge: -1, httpOnly: false});
    findHeartPictures(req, res);
// res.send("pictures all first time");
});

router.post('/pictures/heart', function (req, res, next) {
    findHeartPictures(req, res);
});

router.post('/pictures/upload', function (req, res, next) {
    //获取json数据
    //进行数据存储
    //然后还有点赞和红心的处理
    //用户的处理
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {

        /* Object.keys(fields).forEach(function(name) {
         console.log('got field named ' + name);
         });*/

        for (var key in files) {
            if (files[key][0].size > 0) {
                var fileEnd = "jpg"
                var contentType = files[key][0].headers['content-type'];
                if (contentType != null && contentType == "image/png") {
                    fileEnd = "png";
                }
                //进行存储files[key][0].path.replace(/\\/g,"/")
                fs.readFile(files[key][0].path.replace(/\\/g, "/"), function (err, bytesRead) {
                    if (err) throw err;
                    //write
                    //文件名称前面应该加上添加人信息
                    var date = new Date();
                    var filename = date.valueOf() + "-" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getHours() + "-" + bytesRead.length + "." + fileEnd;
                    fs.writeFile("./public/pictures/" + filename, bytesRead, function (err) {
                        if (err) throw err;
                        var picture = new db.Picture();
                        for (var key in fields) {
                            if (key == "capturedate") {
                                if (fields[key][0] != "") {
                                    picture.set("capture_date", new Date(Date.parse(fields[key][0], "yyyy-M-dd")));
                                } else {
                                    picture.set("capture_date", new Date());
                                }
                            } else if (key == "isrecommend") {
                                picture.set("is_recommend", true);
                            } else {
                                picture.set(key, fields[key]);
                            }
                        }
                        if (!picture.get("tag")) {
                            picture.set("tag", []);
                        }
                        if (!picture.get("is_recommend")) {
                            picture.set("is_recommend", false);
                        }
                        picture.set("up_times", 0);
                        picture.set("up_users", []);
                        picture.set("heart_times", 1);
                        picture.set("is_hide", false);
                        //此处需要根据用户进行处理
                        picture.set("heart_users", [req.session.user.user_name]);
                        //此处需要根据用户进行处理
                        picture.set("create_user", req.session.user.user_name);
                        //需要根据图片不同的存储位置进行设置
                        picture.set("img_url", "pictures/" + filename);
                        picture.save();
                        console.log('It\'s saved!');
                        //此处进行数据库的插入操作
                    })
                });
            }
        }
    });

});
router.post('/login', function (req, res, next) {
    //获取json数据
    var username = req.body.username;
    var password = md5(req.body.password);

    db.User.find({is_hide: false, user_name: username, user_password: password}).exec(function (e, docs) {
        if (e) {
            return handleError(res, error);
        }
        if (docs.length > 0) {
            var sess = req.session;
            sess.user = docs[0];
            docs[0]._doc.success = true;
            res.cookie('username', username, {maxAge: 7200000, httpOnly: false})
            res.clearCookie("limitnum", {maxAge: -1, httpOnly: false});
            res.clearCookie("start", {maxAge: -1, httpOnly: false});
            res.send(docs[0]);
        } else {
            res.send({"success": false});
        }
    })
});

router.get('/logout', function (req, res, next) {
    //获取json数据
    var sess = req.session;
    sess.user = null;
    res.clearCookie('username', {maxAge: -1, httpOnly: false});
    res.clearCookie("limitnum", {maxAge: -1, httpOnly: false});
    res.clearCookie("start", {maxAge: -1, httpOnly: false});
    res.send({"success": true});
});
router.get('/tag', function (req, res, next) {
    if (req.cookies.username) {
        db.User.findOne({is_hide: false, user_name: req.cookies.username}).exec(function (e, doc) {
            if (e) {
                return handleError(res, error);
            }
            res.send(doc.user_tags);
        });
    } else {
        res.send([]);
    }
});

router.post('/tag/add', function (req, res, next) {
    if (req.cookies.username) {
        db.User.findOne({is_hide: false, user_name: req.cookies.username}).exec(function (e, doc) {
            if (e) {
                return handleError(res, error);
            }
            doc.user_tags = concat(doc.user_tags, [req.body.tag]);
            doc.save();
            res.send(doc.user_tags);
        });
    } else {
        res.send([]);
    }
});


router.post('/tag/delete', function (req, res, next) {
    if (req.cookies.username) {
        db.User.findOne({is_hide: false, user_name: req.cookies.username}).exec(function (e, doc) {
            if (e) {
                return handleError(res, error);
            }
            for (var key in req.body.tag) {
                doc.user_tags.splice(doc.user_tags.indexOf(key), 1);
            }
            doc.save();
            res.send(doc.user_tags);
        });
    } else {
        res.send([]);
    }
});

router.post('/heart', function (req, res, next) {
    //获取json数据
    var sess = req.session;
    if (sess.user) {
        db.Picture.findOne({_id: req.body.id}).exec(function (e, doc) {
            if (e) {
                return handleError(res, error);
            }
            if (req.body.heartFlag == 'true') {
                doc.heart_users = concat(doc.heart_users, [sess.user.user_name]);
                doc.heart_times = doc.heart_times + 1;
            } else {
                if (doc.heart_users.indexOf(sess.user.user_name) > -1) {
                    doc.heart_users.splice(doc.heart_users.indexOf(sess.user.user_name), 1);
                }
                doc.heart_times = doc.heart_times - 1;
            }
            doc.save();
        });
    } else {
        res.send({"success": false});
    }
    res.send({"success": true});
});

router.post('/up', function (req, res, next) {
    //获取json数据
    db.Picture.findOne({_id: req.body.id}).exec(function (e, doc) {
        if (e) {
            return handleError(res, error);
        }
        var sess = req.session;
        if (sess.user && doc.up_users.indexOf(sess.user.user_name) < 0) {
            doc.up_users = concat(doc.up_users, [sess.user.user_name]);
        }
        doc.up_times = doc.up_times + 1;
        doc.save();
    });
    res.send({"success": true});
})

module.exports = router;
//1.多文件类型的选取，比如gif，video


