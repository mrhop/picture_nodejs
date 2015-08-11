/**
 * Created by Donghui Huo on 2015/7/16.
 */
var $picture = require("../picture");
var ModalTag = require("./ModalTag.jsx");
var maxFilesize = 102400;
var reader = new FileReader();
var output_format = "jpg";
module.exports = React.createClass({
    getInitialState:function(){
        $picture.tagContainer = this;
        $.get("/tag",function(data){
            $picture.dataTag =data;
            $picture.tagContainer.setState({data: $picture.dataTag});
        })
        return {data: $picture.dataTag};
    },
    handleRequest: function () {
        var fileelement = document.getElementById("filename");
        if ((fileelement.value == null || fileelement.value == "") && $picture.fileDataFinal == null) {
            alert("请上传图片文件");
            return;
        }
        $("#button_add").attr("disabled", "disabled");
        //formDate
        var formElement = document.getElementById("pic-upload");
        if ($picture.fileDataFinal) {
            document.getElementById("filename").value = "";
        }
        var formData = new FormData(formElement);
        if ($picture.fileDataFinal != null) {
            formData.append("piccompress", $picture.fileDataFinal);
        }
        $picture.uploadFile(formData, "/pictures/upload");
    },
    handleFileChange: function (e) {
        var file = e.target.files[0];
        if (!file || !file.type.match(/image\/.*$/)) {
            e.target.value = "";
            $picture.fileDataFinal = null;
            alert("请上传图片文件");
        }
        /* else {
         if (file.type == "image/png") {
         output_format = "png";
         }
         }*/
        if (file.size > 102400) {
            //进行压缩
            $("#button_add").attr("disabled", "disabled");
            var compressRate = 50;
            var rate = 102400 / file.size;
            if (rate > 0.5) {
                compressRate = parseInt(rate * 100);
            }
            reader.onload = function (event) {
                var image = new Image();
                image.src = event.target.result;
                image.onload = function () {
                    var imageTarget = $picture.compressImg(image, compressRate, output_format);
                    $picture.fileDataFinal = $picture.dataURItoBlob(imageTarget.src);
                    $("#button_add").removeAttr("disabled");
                }
                if ($picture.fileDataFinal == null) {
                    var imageTarget = $picture.compressImg(image, compressRate, output_format);
                    $picture.ileDataFinal = $picture.dataURItoBlob(imageTarget.src);
                    $("#button_add").removeAttr("disabled");
                }
            };
            reader.readAsDataURL(file);
        } else {
            $picture.fileDataFinal = null;
        }
    },
    handleAddTag: function () {
        if ($('#addTagInput').is(":hidden")) {
            $('#addTagInput').show();
        } else {
            if (!$('#addTagInput').val() || !$('#addTagInput').val().trim()) {
                alert("请填写标签后保存")
            } else {
                //进行存储
                $.post("/tag/add",{tag:$('#addTagInput').val()},function(data){
                    $picture.dataTag =data;
                    $picture.tagContainer.setState({data: $picture.dataTag});
                    $('#addTagInput').val("");
                })
            }
        }
    },
    handleDelTagAction: function () {
        $.post("/tag/delete",{tag:$("input[name='tag']:checked").map(function () {
            return this.value;
        }).get()},function(data){
            $picture.dataTag =data;
            $picture.tagContainer.setState({data: $picture.dataTag});
            $('#addTag .glyphicon-trash').hide();
        })
    },
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
        $('#addTagInput').hide();
    },
    render: function () {
        var tagContainers = this.state.data.map(function (tag) {
            return (
                <ModalTag value ={tag}/>
            );
        });
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
                        <form id="pic-upload" encType="multipart/form-data" className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="title" className="col-xs-2 control-label">标题</label>

                                <div className="col-xs-8">
                                    <input type="text" id="title" name="title" className="form-control"
                                           placeholder="标题"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="filename" className="col-xs-2 control-label">图片</label>

                                <div className="col-xs-8">
                                    <input type="file" id="filename" name="file" onChange={this.handleFileChange}
                                           className="form-control" placeholder="图片"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="capture-date" className="col-xs-2 control-label">拍摄日期</label>

                                <div className="col-xs-8">
                                    <input type="text" id="capture-date" name="capturedate" className="form-control"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-xs-2 control-label">标签</label>

                                <div className="col-xs-8">
                                    {tagContainers}
                                    <label id="addTag" className="control-label"><a title="删除标签"
                                                                                    className="glyphicon glyphicon-trash" onClick = {this.handleDelTagAction}>&nbsp;</a><input
                                        id="addTagInput" type="text" className="form-control"/><a title="添加标签"
                                                                                                  onClick={this.handleAddTag}
                                                                                                  className="glyphicon glyphicon-plus"></a>
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="desc" className="col-xs-2 control-label">描述</label>

                                <div className="col-xs-8">
                                    <textarea id="desc" name="desc" className="form-control"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-xs-2 control-label">推荐给大家</label>

                                <div className="col-xs-8">
                                    <label className="checkbox-inline control-label">
                                        <input type="checkbox" name="isrecommend" id="inlineCheckbox4"
                                               value="true"/>&nbsp;
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" id="button_add" onClick={this.handleRequest} className="btn btn-primary">
                            添加
                        </button>
                    </div>
                </div>
            </div>
        )
    }
})