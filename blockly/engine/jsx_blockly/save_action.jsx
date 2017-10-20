var React = require('react');
var ReactDOM = require('react-dom');
var SwitchComponent = require('./switch.jsx');
var InputComponent = require('./inputComponent.jsx');
var $ = require('jquery');
var blocklyDatas = require('../service/blockly_datas');
var RobatCommand = require('../service/robat_command');

var SaveActionComponent = React.createClass({
    getInitialState: function() {
        return {
            classname: 'content_mainbox flex box_diabled',
            arrMultiServoToPopup:this.props.data,
            callback:this.props.callback,
            switch:false,
            pettyTitle:MSG.posture_set_desc,
            postureName:"",
            maxInputLength:16
        };
    },
    componentDidMount: function() {
        $(".switch_box")[0].style.top="0px";
    },
    goCancel:function(e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }else{
            window.event.returnValue = false;
            window.event.cancelBubble = true;
        }
        //舵机全部掉电
        var servoArr = blocklyDatas.getServoIds();
        var servoStr = servoArr.join(',');
        var pwerOnCommand = new RobatCommand('servoPowerOn|'+servoStr);
        pwerOnCommand.send();
        return this.props.onRemove();
    },
    goSure:function(e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }else{
            window.event.returnValue = false;
            window.event.cancelBubble = true;
        }
        if(this.refs.getInputValue !== undefined){
            var actionName = this.refs.getInputValue.outPutValue();
            console.log("当前输入值信息:"+actionName);
            this.state.callback({name:actionName});
        }
        return this.props.onRemove();
    },
    onSwitchchange:function(type){
        console.log("parent switch type "+type);
        var className = type?'content_mainbox flex':'content_mainbox flex box_diabled';
        var title = type?MSG.posture_ok_desc:MSG.posture_set_desc;
        this.setState({
            switch:type,
            classname: className,
            pettyTitle:title
        });
         var cmd = "servoPowerOff";
         if(type){
            cmd = "servoPowerOff";
         }else{
             cmd = "servoPowerOn";
         }
         var servoArr = blocklyDatas.getServoIds();
         var servoStr = servoArr.join(',');
         var pwerCommand = new RobatCommand(cmd+'|'+servoStr);
         pwerCommand.send();
    },
    generateHtml:function(){ /*html构建*/
        if(!this.state.switch){
            return <div className="tip_img"><img src="images/popup/posture/posture.png"></img></div>;
        }else{
            return <InputComponent ref="getInputValue" placeholder={MSG.posture_named_popup_placeholder} inputTips={MSG.variable_inputrule_msg.replace('%1', this.state.maxInputLength).replace('%2', this.state.maxInputLength/2)} maxInputLength={this.state.maxInputLength} ></InputComponent>;
        }
    },
    render: function(){
        var contentHtml = this.generateHtml();
        return  <div className="blockly_background flex">
                    <div className="blockly_popup">
                        <div className="blockly_popuphead flex">
                            <div className="model_title">
                                {MSG.posture_named_popup_title}
                            </div>
                        </div>
                        <div  className="blockly_popupbody flex">
                            <span className="petty_title">{this.state.pettyTitle}</span>
                            <SwitchComponent isClose={this.state.switch} callbackParent={this.onSwitchchange}></SwitchComponent>
                            {contentHtml}
                        </div>
                        <div className="blockly_popupfooter flex">
                            <div className="btn_cancel flex" onClick={this.goCancel}>{MSG.project_pop_cancel_btn}</div> 
                            <div className="btn_ok flex" onClick={this.goSure}>{MSG.project_pop_ok_btn}</div> 
                        </div>
                    </div>
                </div>;
    }
});
module.exports = SaveActionComponent;