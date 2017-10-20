var React = require('react');
var ReactDOM = require('react-dom');
var SliderComponent = require('./../jsx_common/slider_component.jsx');
var TplTitle = require('./../jsx_common/tpl_title.jsx');
var TplImg = require('./../jsx_common/tpl_img.jsx');
var TplText = require('./../jsx_common/tpl_text.jsx');
var TplSpecialText = require('./../jsx_common/tpl_special_text.jsx');
var TplBtn = require('./../jsx_common/tpl_btn.jsx');
var CourseData = require('./../service/course_data.js');
var eventsListener = require('./../common/events_listener');
var $ = require('jquery');
var CourseTaskdesc = React.createClass({
    getInitialState : function(){
        var course_index = CourseData.getCourseIndex();
        var data = CourseData.getCourseDataByIndex(course_index);
        console.log("course data--->");
        console.log(data);
        return {
            allStepPage: data.allStepPage //任务描述列表
        };
    },
    componentDidMount: function() {
        eventsListener.on('showCourseTask',this._showCourseTask);
    },
    componentWillUnmount: function() {
        eventsListener.off('showCourseTask');
    },
    _showCourseTask:function(){
        console.log("点击帮助按钮，弹出任务框 收起标题框");
        $("#id_cousetask, #coursetitle_box").addClass("active");
    },
    _closeCourseTask:function (){
        console.log("_closeCourseTask close");
        $("#id_cousetask, #coursetitle_box").removeClass("active");
    },
    _renderContentLi:function(data,ifReRenderImg){
        var _liArr = [];
        data = this.state.allStepPage;
        for(var i=0;i<data.length;i++){
            var item = data[i];
            var Tpl_arr = [];
            for(var j=0;j<item.length;j++){
                var obj = item[j];
                var Tpl_Title = null;
                var Tpl_Img = null;
                var Tpl_Text = null;
                var Tpl_Btn = null;
                if(obj.key=="title"){
                    Tpl_Title = <TplTitle key={"title"+j+obj.key} title={obj.value}></TplTitle>;
                    Tpl_arr.push(Tpl_Title);
                }
                if(obj.key=="img"){
                    //如果是最后一张答案图，则必定重新渲染（因为有个查看按钮）
                    if(i==data.length-1){
                        Tpl_Img = <TplImg ifReRenderImg={true} key={"img"+j+obj.key} img={obj.value} replaceImg ={obj.replaceValue}></TplImg>;
                        Tpl_arr.push(Tpl_Img);
                    }
                    //如果是前面的图则在slider_component的touch_end时重新渲染
                    else{
                        Tpl_Img = <TplImg ifReRenderImg={ifReRenderImg} key={"img"+j+obj.key} img={obj.value} replaceImg ={obj.replaceValue}></TplImg>;
                        Tpl_arr.push(Tpl_Img);
                    }
                }
                if(obj.key=="text"){
                    Tpl_Text = <TplText  key={"text"+j+obj.key} text={obj.value}></TplText>;
                    Tpl_arr.push(Tpl_Text);
                }
                if(obj.key=="btn"){
                    Tpl_Btn = <TplBtn  key={"btn"+j+obj.key} btn={obj.value} replaceBtn ={obj.replaceValue}></TplBtn>;
                    Tpl_arr.push(Tpl_Btn);
                }
            }
            _liArr.push(<li key={"li_"+obj.key+"_"+i} className={i==0?"active":""} data-index={i}>
                            <span>{Tpl_arr}</span>
                        </li>);
        }
        return _liArr;
    },
    _renderOlIndex:function(data){
        var _olArr = [];
        data = this.state.allStepPage;
        for(var i=0;i<data.length;i++){
            var item = data[i];
            _olArr.push(<li key={"ol_"+i} className={i==0?"active":""} data-index={i}><span></span></li>);
        }
        return _olArr;
    },
    render: function(){
        return  <div id="id_cousetask" className="course_container">
                    <div className="course_introbox">
                        <div className="course_btn flex" onTouchEnd={this._closeCourseTask}>
                            <img src="images\/index\/close.png"/>
                        </div>
                        <SliderComponent dataArray={this.state.allStepPage}
                            renderContentLi={this._renderContentLi} 
                            renderOlIndex={this._renderOlIndex}></SliderComponent>
                    </div>
                </div>;
    }
});
module.exports = CourseTaskdesc;