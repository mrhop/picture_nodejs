/**
 * Created by Donghui Huo on 2015/7/16.
 */
var React = require('react');
var $ = require('jquery');
var cookie = require('cookie-dough')();
module.exports = React.createClass({
    handleDelTag: function () {
        if ($("input[name='tag']").is(':checked')) {
            $('#addTag .glyphicon-trash').show();
            $('#addTagInput').hide();
        } else {
            $('#addTag .glyphicon-trash').hide();
        }
    },
    render: function () {
        return (
            <label className="checkbox-inline control-label tag-small">
                <input {...this.props} type="checkbox" name="tag" onClick={this.handleDelTag}/>{this.props.value}
            </label>
        );
    }
});