var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var SoundOperationBtn = React.createClass({
    getInitialState: function() {
        return {
            isDelete :this.props.isDelete
        };
    },
    componentDidMount: function() {
    },
    addRecord:function(e){
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }else{
            window.event.returnValue = false;
            window.event.cancelBubble = true;
        }
        this.props.goHidden();
    },
    delteRecord:function(e){
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }else{
            window.event.returnValue = false;
            window.event.cancelBubble = true;
        }
        this.props.callbackParent(2);
    },
    render: function(){
        var _dele_class = this.props.isDelete?"fa fa-check del_recordbtn flex":"fa fa-trash-o del_recordbtn flex";
        return  <div className="sound_opbtn_box flex">
                    <i className="fa fa-microphone add_recordbtn flex" onTouchEnd={this.addRecord}></i>
                    <i className={_dele_class} onTouchEnd={this.delteRecord}></i>
                </div>;
    }
});
module.exports = SoundOperationBtn;





