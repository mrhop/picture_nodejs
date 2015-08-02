/**
 * Created by Donghui Huo on 2015/7/7.
 */

    var $picture = new $.Picture();
//--------------------------------HEADER部分处理-------------------------------------------
    var GlyphiconLink = React.createClass({
        render: function () {
            return (
                <a {...this.props}

                    className={'glyphicon '+(this.props.className || '')}/>
            );
        }
    });


    var GlyphiconGroup = React.createClass({
        handleRequest: function (type) {
            if (type == 'eye') {
                //进行发现的请求、响应以及渲染
                $picture.urlNow = "/pictures/eye"
                $.post("/pictures/eye", $picture.getKeywords(), function (data) {
                    $picture.dataPic = data;
                    $picture.picContainer.setState({data: data});
                    $picture.init();
                });
            } else if (type == 'leaf') {
                //进行最新的请求、响应以及渲染
                $picture.urlNow = "/pictures/new"
                $.post("/pictures/new", $picture.getKeywords(), function (data) {
                    $picture.dataPic = data;
                    $picture.picContainer.setState({data: data});
                    $picture.init();
                });
            } else if (type == 'fire') {
                //进行最火的请求，响应以及渲染
                $picture.urlNow = "/pictures/hot"
                $.post("/pictures/hot", $picture.getKeywords(), function (data) {
                    $picture.dataPic = data;
                    $picture.picContainer.setState({data: data});
                    $picture.init();
                });
            } else if (type == 'heart') {
                //进行红心的请求，响应以及渲染
                $picture.urlNow = "/pictures/heart"
                $.post("/pictures/heart", $picture.getKeywords(), function (data) {
                    $picture.dataPic = data;
                    $picture.picContainer.setState({data: data});
                    $picture.init();
                });
            }
        },
        render: function () {
            return (
                <div>
                    <a href="/"><h3>PicLogo</h3></a>
                    &nbsp;|&nbsp;
                    <GlyphiconLink
                        onClick={this.handleRequest.bind(this,'eye')}
                        title="发现"
                        className="glyphicon-eye-open">
                    </GlyphiconLink>
                    &nbsp;|&nbsp;
                    <GlyphiconLink
                        onClick={this.handleRequest.bind(this,'leaf')}
                        title="最新"
                        className="glyphicon-leaf">
                    </GlyphiconLink>
                    &nbsp;|&nbsp;
                    <GlyphiconLink
                        onClick={this.handleRequest.bind(this,'fire')}
                        title="最火"
                        className="glyphicon-fire">
                    </GlyphiconLink>
                    &nbsp;|&nbsp;
                    <GlyphiconLink
                        onClick={this.handleRequest.bind(this,'heart')}
                        title="我喜欢的"
                        className="glyphicon-heart">
                    </GlyphiconLink>
                </div>
            );
        }
    });
    var GlyphiconGroupRight = React.createClass({
        handleRequest: function (type, value) {
            var dateType = cookie.get("dateType");
            if (dateType != type) {
                cookie.set("dateType", type,{ path: '/',maxAge:7200, secure: false,httpOnly:false});
                if ((dateType == null || dateType == "init") && type == "init") {
                    //不进行post操作
                } else {
                    //进行post操作
                    $(".dropdown .btn").text(value);
                    $.post($picture.urlNow, $picture.getKeywords(), function (data) {
                        $picture.dataPic = data;
                        $picture.picContainer.setState({data: data});
                        $picture.reload();
                    });
                }
            }
        }, componentDidMount: function () {
            var dateType = cookie.get("dateType");
            if (dateType == null || dateType == "init") {
                $(".dropdown .btn").text("选择时间");
            } else if (dateType == "amonth") {
                $(".dropdown .btn").text("最近一个月");
            } else if (dateType == "threemonth") {
                $(".dropdown .btn").text("最近三个月");
            } else if (dateType == "halfyear") {
                $(".dropdown .btn").text("最近半年");
            } else if (dateType == "ayear") {
                $(".dropdown .btn").text("最近一年");
            } else if (dateType == "lastyear") {
                $(".dropdown .btn").text("上一年");
            } else if (dateType == "all") {
                $(".dropdown .btn").text("不限时间");
            }

        },
        render: function () {
            return (
                <div>
                    <div className="dropdown">
                        <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            选择时间
                            <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                            <li><a   onClick={this.handleRequest.bind(this,'init','选择时间')}>选择时间</a>
                            </li>
                            <li><a
                                   onClick={this.handleRequest.bind(this,'amonth','最近一个月')}>最近一个月</a>
                            </li>
                            <li><a
                                   onClick={this.handleRequest.bind(this,'threemonth','最近三个月')}>最近三个月</a></li>
                            <li><a
                                   onClick={this.handleRequest.bind(this,'halfyear','最近半年')}>最近半年</a>
                            </li>
                            <li><a   onClick={this.handleRequest.bind(this,'ayear','最近一年')}>最近一年</a>
                            </li>
                            <li><a   onClick={this.handleRequest.bind(this,'lastyear','上一年')}>上一年</a>
                            </li>
                            <li><a   onClick={this.handleRequest.bind(this,'all','不限时间')}>不限时间</a>
                            </li>
                        </ul>
                    </div>
                    &nbsp;|&nbsp;
                    <GlyphiconLink
                        title="扫一扫"
                        className="glyphicon-qrcode">
                    </GlyphiconLink>
                </div>
            );
        }
    });

    React.render(<GlyphiconGroup />, $(".header .left")[0]);
    React.render(<GlyphiconGroupRight/>, $(".header .right")[0]);


    var FormHead = React.createClass({
        handleSubmit: function () {
            //获取输入
            //进行后台处理
            $.post($picture.urlNow, $picture.getKeywords(), function (data) {
                $picture.dataPic = data;
                $picture.picContainer.setState({data: data});
            });
            return false;
        },
        render: function () {
            return (
                <form onSubmit={this.handleSubmit}>
                    <input type="text" id="header-search" className="form-control" placeholder="输入您感兴趣的......"/>
                    <a   className="glyphicon glyphicon-search" onClick={this.handleSubmit}/>
                </form>
            );
        }
    });
    React.render(<FormHead />, $(".header div.center")[0]);

//---------------------------BODY部分处理------------------------------------------------
//首先是pic-container class化
    var PictureContainer = React.createClass({
        render: function () {
            var username = cookie.get("username");
            var heart = "";
            var thumbsup = "";
            if (this.props.heartusers && this.props.heartusers.indexOf(username) > -1) {
                heart = "like glyphicon glyphicon-heart true";
            } else {
                heart = "like glyphicon glyphicon-heart";
            }
            if (this.props.upusers && this.props.upusers.indexOf(username) > -1) {
                thumbsup = "up glyphicon glyphicon-thumbs-up true";
            } else {
                thumbsup = "up glyphicon glyphicon-thumbs-up";
            }
            var date = new Date(this.props.capturedate)
            var title = this.props.title + " 由 " + this.props.createuser + " 拍摄于 " + date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

            var spanStr = this.props.tag.map(function (tag) {
                return (
                    <span key={tag} className='clip'>{tag}</span>
                );
            });

            return (
                <div className="pic-container">
                    <a className="pic-container-a" title={title} href={this.props.imgurl}>
                        <img src={this.props.imgurl}/>
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

                    <span className={heart}/>
                    <span className={thumbsup}/>
                </div>);
        }
    })
    var PictureContainerList = React.createClass({
        getInitialState: function () {
            $(window).scroll(this.handleScroll);
            $picture.picContainer = this;
            return {data: $picture.dataPic};
        },
        handleScroll: function (e) {
            var scrollValue = $(window).scrollTop();
            scrollValue > 60 ? $(".bottom-tool .top").fadeIn() : $(".bottom-tool .top").fadeOut();
            if (Math.ceil(scrollValue) == $(document).height() - $(window).height()) {
                if ($picture.loaded == true) {
                    $picture.loadImage();
                }
            }
        },
        componentDidMount: function () {
            $picture.init();
        },
        render: function () {
            var pictureContainers = this.state.data.map(function (picture) {
                return (
                    <PictureContainer key={picture.id} title={picture.title} createuser={picture.create_user}
                                      capturedate={picture.capture_date} tag={picture.tag} desc={picture.desc}
                                      imgurl={picture.img_url}
                                      heartusers={picture.heart_users}
                                      upusers={picture.up_users}/>
                );
            });
            return (
                <div>
                    {pictureContainers}
                </div>
            );
        }
    })

    React.render(<PictureContainerList />, $("#fall")[0]);
    var MorePicButton = React.createClass({
        componentDidMount: function () {
            $(".bottom .more-pic").click(function () {
                if ($picture.loaded == true) {
                    $picture.loadImage();
                }
                return false;
            })
        },
        render: function () {
            return (
                <div>
                    <a className="more-pic"  >
                        <h4>加载更多......</h4>
                    </a>
                </div>);
        }
    });

    React.render(<MorePicButton />, $(".main .bottom")[0]);

//---------------------------BODY部分处理 结束------------------------------------------------
//---------------------------尾部处理 开始------------------------------------------------
    var TopButton = React.createClass({
        componentDidMount: function () {
            $(".bottom-tool .top").click(function () {
                $("html,body").animate({scrollTop: 0}, 300);
                return false;
            });
        },
        render: function () {
            return (
                <a className="top"   styleName="display: none;" title="回到顶部"></a>
            );
        }
    });
    var ModalButton = React.createClass({
        render: function () {
            return (
                <a className="add" title="添加图片" data-toggle="modal" data-target="#addModal"></a>
            );
        }
    });
    React.render(<TopButton />, $(".bottom-tool div:first-child")[0]);
    React.render(<ModalButton />, $(".bottom-tool div:last-child")[0]);

    var ModalWindow = React.createClass({
        componentDidMount: function () {
            $("#addModal").on('show.bs.modal', function (event) {
                var modal = $(this);
                var dialog = modal.find('.modal-dialog');
                dialog.css("margin-top", (modal.height() - 362) / 2 + "px");
            });
            $('#capture-date').datepicker({
                format: "yyyy-mm-dd",
                weekStart: 0,
                todayBtn: "linked",
                language: "zh-CN",
                autoclose: true,
                todayHighlight: true,
                toggleActive: true
            });
            $('#capture-date').datepicker('update', new Date());
        },
        render: function () {
            return (
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                &times;
                            </button>
                            <h4 className="modal-title">添加图片</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="title" className="col-xs-2 control-label">标题</label>

                                    <div className="col-xs-8">
                                        <input type="text" id="title" className="form-control" placeholder="标题"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="filename" className="col-xs-2 control-label">图片</label>

                                    <div className="col-xs-8">
                                        <input type="file" id="filename" className="form-control" placeholder="图片"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="capture-date" className="col-xs-2 control-label">拍摄日期</label>

                                    <div className="col-xs-8">
                                        <input type="text" id="capture-date" className="form-control"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-xs-2 control-label">标签</label>

                                    <div className="col-xs-8">
                                        <label className="checkbox-inline control-label">
                                            <input type="checkbox" id="inlineCheckbox1" value="option1"/>生活
                                        </label>
                                        <label className="checkbox-inline control-label">
                                            <input type="checkbox" id="inlineCheckbox2" value="option1"/>艺术
                                        </label>
                                        <label className="checkbox-inline control-label">
                                            <input type="checkbox" id="inlineCheckbox3" value="option1"/>开心
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="desc" className="col-xs-2 control-label">描述</label>

                                    <div className="col-xs-8">
                                        <textarea id="desc" className="form-control"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-xs-2 control-label">推荐给大家</label>

                                    <div className="col-xs-8">
                                        <label className="checkbox-inline control-label">
                                            <input type="checkbox" id="inlineCheckbox4" value="option1"/>&nbsp;
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">添加</button>
                        </div>
                    </div>
                </div>
            )
        }
    })

    React.render(<ModalWindow />, $("#addModal")[0]);
