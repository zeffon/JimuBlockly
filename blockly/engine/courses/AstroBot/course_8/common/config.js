if (window.blocklyObj) {
    var commonPath = '../../../courses/'+window.SERIAL_NAME+'/common';
    var imagePath = '../../../courses/'+window.SERIAL_NAME+'/course_8/'+window.LANGUAGE_CODE;
    var bgPath = '../../../courses/'+window.SERIAL_NAME+'/course_8/common';
} else {
    var commonPath = './../engine/courses/'+window.SERIAL_NAME+'/common';
    var imagePath = './../engine/courses/'+window.SERIAL_NAME+'/course_8/'+window.LANGUAGE_CODE;
    var bgPath = './../engine/courses/'+window.SERIAL_NAME+'/course_8/common';
}
var courseData =  {
    courseId : 8,
    courseName : '课程8',
    courseTitle:MSG.course8_title,
    backgroundImg:bgPath+'/bg.jpg',
    startStory : [
                    [
                        {
                            index:0,
                            type:'img',
                            value:commonPath+'/l_xinbao2.png',
                            directioin:'left',
                            x:0,
                            y:50,
                            hide_ele_index:null
                        },
                        {
                            index:1,
                            type:'text',
                            value:MSG.c8_startstory_1,
                            directioin:'left',
                            x:12,
                            y:55,
                            hide_ele_index:null
                        },
                        {
                            index:2,
                            type:'text',
                            value:MSG.c8_startstory_2,
                            directioin:'left',
                            x:12,
                            y:55,
                            hide_ele_index:1
                        }
                    ]
    ],
    endStory:[
                [
                    {
                        index:0,
                        type:'img',
                        value:commonPath+'/l_xinbao1.png',
                        directioin:'left',
                        x:0,
                        y:60,
                        hide_ele_index:null
                    },
                    {
                        index:1,
                        type:'text',
                        value:MSG.c8_endstory_1,
                        directioin:'left',
                        x:12,
                        y:65,
                        hide_ele_index:null
                    }
                ]
    ],
    allStepPage: [
                    [
                        {key:'title',value:[MSG.c8_step_page1_1]},
                        {key:'text',value:  [
                                                {
                                                    desc:MSG.c8_step_page1_2,
                                                    style:{textAlign:'left',margin:'4% 10px',fontSize:'1.1em'}
                                                },
                                                {
                                                    desc:MSG.c8_step_page1_3,
                                                    style:{textAlign:'left',margin:'2% 10px'}
                                                },
                                                {   desc:MSG.c8_step_page1_4,
                                                    style:{textAlign:'left',margin:'2% 10px'}
                                                },
                                                {   desc:MSG.c8_step_page1_5,
                                                    style:{textAlign:'left',margin:'2% 10px'}
                                                },
                                                {
                                                    desc:MSG.c8_step_page1_6,
                                                    style:{textAlign:'left',margin:'2% 10px'}
                                                }                                                
                                            ]
                        }
                    ],
                    [
                        {key:'title',value:[MSG.c8_step_page2_1]},
                        {key:'text',value:  [
                                                {
                                                    desc:MSG.c8_step_page2_2,
                                                    style:{textAlign:'center',margin:'4% 10px',fontSize:'1.1em'}
                                                }
                                            ]
                        },
                        {key:'text',value:  [
                                                {
                                                    desc:MSG.c8_step_page2_3,
                                                    style:{textAlign:'left',margin:'2% 10px',fontSize:'1em',color:'#A1B3B7'}
                                                }
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:imagePath+'/page1_1.png',
                                                style:{textAlign:'center',margin:'4%',height:window.innerHeight>700?'300px':'150px'}
                                            }
                                          ]
                        },
                        {key:'text',value:  [
                                                {
                                                    desc:MSG.c8_step_page2_4,
                                                    style:{textAlign:'left',margin:'2% 10px',fontSize:'1em',color:'#A1B3B7'}
                                                }
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:imagePath+'/page1_2.png',
                                                style:{textAlign:'center',margin:'4%',height:window.innerHeight>700?'300px':'150px'}
                                            }
                                          ]
                        }
                    ],
                    [
                        {key:'title',value:[MSG.c8_step_page3_1]},
                        {key:'text',value:  [
                                                {
                                                    desc:MSG.c8_step_page3_2,
                                                    style:{textAlign:'center',margin:'4% 10px',fontSize:'1.1em'}
                                                }
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:imagePath+'/page2.png',
                                                style:{textAlign:'center',margin:'15% auto',height:window.innerHeight>700?'300px':'100px',margin:'0 2%'}
                                            }
                                          ]
                        },
                        {key:'text',value:  [
                                                {
                                                    desc:MSG.c8_step_page3_3,
                                                    style:{textAlign:'center',margin:'4% 10px',fontSize:'1em',color:'#A1B3B7'}
                                                }
                                            ]
                        }
                    ],
                    [
                        {key:'title',value:[MSG.c8_step_page4_1]},
                        {key:'text',value:  [
                                                {
                                                    desc:MSG.c8_step_page4_2,
                                                    style:{textAlign:'center',margin:'4% 10px',fontSize:'1.1em'}
                                                }
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:imagePath+'/page3.png',
                                                style:{textAlign:'center',margin:'0 2%',height:window.innerHeight>700?'300px':'66px'}
                                            }
                                          ]
                        }
                    ],[
                        {key:'title',value:[MSG.c8_step_page5_1]},
                        {key:'text',value:  [
                                                {
                                                    desc:MSG.c8_step_page5_2,
                                                    style:{textAlign:'center',margin:'4% 10px',fontSize:'1.1em'}
                                                }
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:imagePath+'/page4.png',
                                                style:{textAlign:'center',margin:'20% 0',height:window.innerHeight>700?'280px':'150px'}
                                            }
                                          ]
                        }
                    ],
                    [
                        {key:'title',value:[MSG.see_example]},
                        {key:'text',value:  [
                                                {desc:MSG.course_tips,style:{textAlign:'center',margin:'4% 10px',fontSize:'1.1em'}}
                                            ]
                        },
                        {key:'img',value:[
                                            {
                                                src:commonPath+'/eye_close.png',
                                                style:{height:'197px'}
                                            }
                                        ], 
                                    replaceValue : [
                                            {
                                                src:imagePath+'/answer.png',
                                                style:{height:'197px'}
                                            }
                                    ]
                        },
                        {key:'btn',value:[MSG.course_show], replaceValue:[MSG.course_hide]}
                    ]
                ],
    videoSrc :bgPath+"/course_8.mp4",
    isShowTrash : true,
    toolConfig :'<xml id="toolbox" style="display: none"><category id="id_start" name="'+MSG.id_start+'" colour="#0ae8c0" default="true"><block type="program_goto_start"></block><block type="program_goto_phone_condition"></block><block type="program_goto_touch_condition"></block><block type="program_goto_infrared_condition"></block></category><category id="id_actions" name="'+MSG.id_actions+'" colour="#2dc1ea"><block type="actions_f70e0fd9-1ed8-4fd2-b00c-821ac1e8046c"></block><block type="actions_a182b7de-e32f-4445-8c0f-80b4491082f6"></block></category><category id="id_control" name="'+MSG.id_control+'" colour="#7d94e1"><block type="custom_control_do_while"></block></category><category id="id_events" name="'+MSG.id_events+'" colour="#fda674"><block type="event_infrared_sensor"></block></category><category id="id_show" name="'+MSG.id_show+'" colour="#51da6d"><block type="id_show_play_effects"></block><block type="id_show_emoji"><value name="value_input"><shadow type="custom_math_num"><field  name="NUM">3</field></shadow></value></block></category><category id="id_sensors" name="'+MSG.id_sensors+'" colour="#ffca05" ><block type="sensor_infrared_sensor_distance"></block><block type="sensor_gyroscope_sensor_angle"></block><block type="sensor_servo_angle"></block><block type="sensor_set_gyrocope_to_zero"></block></category><category id="id_math" name="'+MSG.id_math+'" colour="#809395"><block type="custom_math_num"></block><block type="custom_math_variables_get"></block><block type="custom_math_variables_set"><value name="VALUE"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value></block><block type="custom_math_variable_change"><value name="value_input"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value></block><block type="custom_math_add_minus"><value name="FIRST_EXPRESSION"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value><value name="SECOND_EXPRESSION"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value></block><block type="custom_math_random_int"><value name="FROM"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value><value name="TO"><shadow type="custom_math_num"><field  name="NUM">100</field></shadow></value></block><block type="custom_math_constrain"><value name="VALUE"><shadow type="custom_math_num"><field  name="NUM">50</field></shadow></value><value name="LOW"><shadow type="custom_math_num"><field  name="NUM">1</field></shadow></value><value name="HIGH"><shadow type="custom_math_num"><field  name="NUM">100</field></shadow></value></block><block type="custom_math_logic_compare"></block><block type="custom_math_logic_and"></block><block type="custom_math_logic_not"></block></category></xml>',//菜单可配置
    toolConfigShow : [0,1,1,1,1,0,0],//菜单是否锁定
    initProgram : '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="program_start" id="RBpqO=zS:Min@~s1YZVV" deletable="false" x="87" y="38"></block></xml>',//xml字符串
    standardProgram :'<xml xmlns="http://www.w3.org/1999/xhtml"><block type="program_start" id="RBpqO=zS:Min@~s1YZVV" deletable="false" x="87" y="38"><next><block type="custom_control_do_while" id="/ueoTxtfs(GcLoQ%6cxP"><statement name="DO"><block type="actions_f70e0fd9-1ed8-4fd2-b00c-821ac1e8046c" id="=Lt9PK!htP=K3r3ss2^O"></block></statement><value name="BOOL"><block type="event_infrared_sensor" id="Z81;LT~25sa6P#rm^WCm"><field name="SENSOR_ID">1</field><field name="OP">LT</field><field name="DISTANCE">10</field></block></value><next><block type="id_show_play_effects" id="[Y=J)^;FesrD(55vRhXE"><field name="Effect">{"key":"happy","description":"高兴","type":"emotion","isDelay":false}</field><next><block type="id_show_emoji" id="Z5q/*M!!)i.]`@F)nCCZ"><field name="Emotion">{"lightArray":[{"emotionIndex":6,"color":"#01ffff","id":"1"},{"emotionIndex":6,"color":"#01ffff","id":"2"}],"islightLock":true}</field><value name="value_input"><shadow type="custom_math_num" id="2b1{#FNv039A(2;uNE2J"><field name="NUM">3</field></shadow></value><next><block type="actions_a182b7de-e32f-4445-8c0f-80b4491082f6" id="AbVjuL2vnn}9-PX*Em8o"></block></next></block></next></block></next></block></next></block></xml>',//xml字符串
};