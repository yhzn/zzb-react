import React, { Component } from 'react';
import BScroll from 'better-scroll'
import {Tabs} from 'element-react'
import moment from 'moment'
import {Header} from '../component/header'
import eCharts from 'echarts'
import {ClassifyComponent} from '../component/classifyComponent'
export class Classify extends Component {
    constructor (props) {
        super(props);
        this.state={
            title:null,
            startTimeValue:null,
            endTimeValue:null,
            option_1:{},
            option_2:{},
            option_3:{},
            tableData_1:[],
            tableData_2:[],
            tableData_3:[]
        }
        this.chartDom=[]
    }
    componentDidMount () {
        this.setState({startDateValue: new Date(moment().format('YYYY/MM/DD'))});
        this.setState({endDateValue:new Date()});

        let option_1 = {
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            title:{
                text:"TOP 10 门诊科室",
                left:'center',

            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top:26,
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['心血管内科', '消化内科', '内分泌', '空腔科', '神经内科', '呼吸内科', '耳鼻喉科', '妇产科（妇科）', '泌尿外科', '眼科'],
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel:{
                        rotate: 90,
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    // axisLabel:{formatter:'{value} %'}
                    name:"单位：（人次）",


                }
            ],
            series : [
                {
                    name:'',
                    type:'bar',
                    barWidth: '60%',
                    data:[10, 52, 200, 334, 390, 330, 220, 52, 200, 334]
                }
            ]
        };
        let option_2 = {
            title : {
                text: '挂号分类统计',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['普通门诊','专家门诊','专科门诊','急诊门诊']
            },
            series : [
                {
                    name: '挂号分类统计',
                    type: 'pie',
                    radius : '80%',
                    center: ['50%', '56%'],
                    data:[
                        {value:935, name:'普通门诊'},
                        {value:610, name:'专家门诊'},
                        {value:334, name:'专科门诊'},
                        {value:135, name:'急诊门诊'}

                    ],
                    label: {
                        normal: {
                            show: true,
                            position: 'inside',
                            formatter: '{c}',//模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比

                            textStyle : {
                                align : 'center',
                                baseline : 'middle',
                                fontFamily : '微软雅黑',
                                fontSize : 15,
                                fontWeight : 'bolder'
                            }
                        },
                    },
                    itemStyle: {
                        // emphasis: {
                        //     shadowBlur: 10,
                        //     shadowOffsetX: 0,
                        //     shadowColor: 'rgba(0, 0, 0, 0.5)'
                        // }
                    }
                }
            ]
        };
        let option_3 = {
            color:["#4a7cca"],
            title: {
                text: '24小时门诊人数分布',
                x:'center'
            },
            tooltip : {
                trigger: 'axis',
                position: function(point, params, dom) {
                    return [point[1], '20%'];
                },
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                show:false,
                data:[{name: '用水量',
                    textStyle:{color:"#25c36c"}
                }]
            },
            toolbox: {
                show:false,
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '2%',
                right: '2%',
                bottom: '15%',
                top:'18%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    // boundaryGap : false,
                    name:"时间段",
                    nameLocation:'middle',
                    nameGap:"32",
                    nameTextStyle:{
                        // fontSize:16,
                        fontWeight:"bold"
                    },
                    axisTick: {
                        alignWithLabel: true
                    },
                    data : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
                }
            ],
            yAxis : [
                {
                    type : 'value',

                }
            ],
            series : [
                {
                    name:'人次',
                    type:'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            color:"#000000"
                        }
                    },
                    areaStyle: {normal: {
                            color: new eCharts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#82b0fd'},
                                    {offset: 0.7, color: '#d8e7fe'},
                                    {offset: 1, color: '#ffffff'}
                                ]
                            )
                        }},
                    data:[820, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330,820, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330]
                }
            ]
        };
        this.setState({option_1,option_2,option_3});
        this.scroll=new BScroll(this.refs.scroll,{
            scrollY:true,
            click:true,
            probeType:3,
        });
        switch(this.props.match.params.id){
            case "1":
                this.setState({title:"总院"});
                break;
            case "2":
                this.setState({title:"南院"});
                break;
            default:
                this.setState({title:"吉安"});
        }
        this.getData();

    }
    getData = () => {
        fetch("classify.json",{
            method:"get",
            headers:{
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
            .then((response) => {
                if(response.status===200){
                    return response.json()
                }
            })
            .then((data)=>{
                this.setState({tableData_1:data,tableData_2:data,tableData_3:data})
            })
            .catch(()=>{
            })
    }
    scrollRefresh = (tab) => {
        this.chartDom[Number(tab.props.name)-1].resize();
        this.timer=setTimeout(()=>{
            this.scroll.refresh();
            clearTimeout(this.timer);
        },600)
    }
    getChartDom = (index,obj) => {
        if(!this.chartDom[index]){
            this.chartDom[index]=obj;
        }
    }
    setTime = (start,end) => {
        this.setState({
            startDateValue:start,
            endDateValue:end,

        })
    }
    getSelectData = () => {
        console.log(moment(this.state.startDateValue).format("YYYY-MM-DD HH:mm:ss"));
        console.log(moment(this.state.endDateValue).format("YYYY-MM-DD HH:mm:ss"));
    }
    selectValue = (value) => {
       console.log(value)
    }
    render () {
        const {title,option_1,option_2,option_3,tableData_1,tableData_2,tableData_3,startDateValue,endDateValue} = this.state;
        return (
            <section className="classify">
                <Header title={`${title}挂号分类系统`}/>
                <section className="container" ref="scroll">
                       <Tabs onTabClick={this.scrollRefresh}>
                           <Tabs.Pane label="按科室统计" name="1">
                               <ClassifyComponent name="1" tableData={tableData_1} option={option_1} selected={true}
                                                  startDateValue={startDateValue}
                                                  endDateValue={endDateValue}
                                                  onGetChartDom={this.getChartDom}
                                                  onSetTime={this.setTime}
                                                  onGetSelectData={this.getSelectData}
                                                  onSelectValue={this.selectValue}/>
                           </Tabs.Pane>
                           <Tabs.Pane label="按挂号分类统计" name="2">
                               <ClassifyComponent name="2" tableData={tableData_2} option={option_2}
                                                  startDateValue={startDateValue}
                                                  endDateValue={endDateValue}
                                                  onGetChartDom={this.getChartDom}
                                                  onSetTime={this.setTime}
                                                  onGetSelectData={this.getSelectData}/>
                           </Tabs.Pane>
                           <Tabs.Pane label="按挂号时间统计" name="3">
                               <ClassifyComponent name="3" tableData={tableData_3} option={option_3}
                                                  startDateValue={startDateValue}
                                                  endDateValue={endDateValue}
                                                  onGetChartDom={this.getChartDom}
                                                  onSetTime={this.setTime}
                                                  onGetSelectData={this.getSelectData}/>
                           </Tabs.Pane>
                       </Tabs>
                </section>
            </section>
        )
    }
}