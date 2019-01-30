import React, { Component } from 'react';
import {Header} from '../component/header'
import {SearchBar} from "../component/search-bar";
import {Tabs, Table, MessageBox,Loading} from 'element-react'
import BScroll from "better-scroll";
import 'whatwg-fetch'
import moment from "moment/moment";
import {baseUrl} from "../tools/environment";
import {homeInit} from "../store/data";

export class WaitQuery extends Component {
    constructor (props) {
        super(props);
        this.state={
            title:null,
            columns: [
                {
                    label: "门诊科室",
                    prop: "KSMC",
                    width:"138"

                },
                {
                    label: "挂号人次",
                    prop: "MZRC",

                },
                {
                    label: "等待人次",
                    prop: "DDRC"
                }
            ],
            tableData: [],
            emData: [],
            startDateValue:null,
            endDateValue:null,
            loading:true,
            yq:"ZY"

        }
    }
    componentDidMount () {
        this.setState({DateValue: homeInit.time});
        this.scroll=new BScroll(this.refs.scroll,{
            scrollY:true,
            click:true,
            probeType:3,
        });
        switch(this.props.match.params.id){
            case "1":
                this.setState({title:"总院",yq:"ZY"});
                this.getData(moment(homeInit.time).format('YYYY/MM/DD'),"ZY");
                break;
            case "2":
                this.setState({title:"南院",yq:"NY"});
                this.getData(moment(homeInit.time).format('YYYY/MM/DD'),"NY");
                break;
            default:
                this.setState({title:"吉安",yq:"JA"});
                this.getData(moment(homeInit.time).format('YYYY/MM/DD'),"JA");

        }
    }
    scrollRefresh = () => {
        this.timer=setTimeout(()=>{
            this.scroll.refresh();
            clearTimeout(this.timer);
        },600)
    }
    getData = (time,yq="ZY") => {
        fetch(`${baseUrl}ghao/ddbr?timeStart=${time} 00:00:00&&timeEnd=${time} 23:59:59&&yq=${yq}`,{
            method:"get",
            headers:{
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
            .then((response) => {
                this.setState({loading:false});
                if(response.status===200){
                    return response.json()
                }else {
                    MessageBox.alert("数据加载异常");
                }
            })
            .then((data) => {
                this.setState({
                    tableData:data.mzks,
                    emData:data.jzks
                });
            })
            .catch(()=>{
                this.setState({loading:false});
                MessageBox.alert("数据加载失败");

            })
    }
    setTime = (time) =>{
        this.setState({
            DateValue:time,
        })
    }
    getSelectData = ()=> {
        this.getData(moment(this.state.DateValue).format('YYYY/MM/DD'),this.state.yq);
    }
    render () {
        const {title,columns,tableData,emData,DateValue,loading} = this.state;
        return (
            <section className="wait-query">
                <Header title={`${title}等待病人查询`}/>
                <section className="container" ref="scroll">
                    <Tabs activeName="1" onTabClick={this.scrollRefresh}>
                        <Tabs.Pane label="门诊各科室等待人次" name="1">
                            <SearchBar
                                DateValue={DateValue}
                                onGetSelectData={this.getSelectData}
                                onSetTime={this.setTime}
                            />
                            <Table
                                columns={columns}
                                data={tableData}
                            />
                        </Tabs.Pane>
                        <Tabs.Pane label="急诊各科室等待人次" name="2">
                            <SearchBar
                                DateValue={DateValue}
                                onGetSelectData={this.getSelectData}
                                onSetTime={this.setTime}
                            />
                            <Table
                                columns={columns}
                                data={emData}
                            />
                        </Tabs.Pane>
                    </Tabs>
                </section>
                {
                    loading && <Loading text="数据加载中" loading={loading} fullscreen={true}/>
                }
            </section>
        )
    }

}