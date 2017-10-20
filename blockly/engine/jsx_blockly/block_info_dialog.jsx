var React = require('react');
var BlockInputTitleBar1 = require('./block_input_titlebar.jsx');
var BlockInputBottom = require('./block_input_bottom.jsx');
var BlockInfoDialog = React.createClass({

    getInitialState : function() {
        return null;
    },
    componentDidMount: function() {
        this.state = {
        };
        return this.setState(this.state);
    },
    onContinue: function() {
        return this.props.onRemove();
    },
    render: function() {
        if(this.state === null) {
            return <div></div>;
        } else {
            return <div className="blockly_background flex message_tip" onBackgroundTouched={this.onContinue}>
                        <div className="blockly_popup">
                            <BlockInputTitleBar1 showInfo={MSG['porject_alert_tips']}>
                            </BlockInputTitleBar1>
                            <div className="blockly_popupbody row">                             
                                   <div className="popup_content">{this.props.data}</div>                       
                            </div>
                            <BlockInputBottom onBackgroundTouched={this.onContinue}/> 
                        </div>
                   </div>;
        }
    }
});
module.exports = BlockInfoDialog;