/**
 * Created by Donghui Huo on 2015/7/16.
 */
module.exports = React.createClass({
    render: function () {
        return (
            <a {...this.props}

                className={'glyphicon '+(this.props.className || '')}/>
        );
    }
});