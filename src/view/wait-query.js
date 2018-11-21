import React, { Component } from 'react';
import {Header} from '../component/header'
import {SearchBar} from "../component/search-bar";
import {Tabs,Table} from 'element-react'
import BScroll from "better-scroll";
import 'whatwg-fetch'
import moment from "moment/moment";

export class WaitQuery extends Component {
    constructor (props) {
        super(props);
        this.state={
            title:null,
            columns: [
                {
                    label: "门诊科室",
                    prop: "name",
                    width:"138"

                },
                {
                    label: "挂号人次",
                    prop: "data",

                },
                {
                    label: "等待人次",
                    prop: "percent"
                }
            ],
            tableData: [
                {
                    name: '导入天涯海角',
                    data: '3320',
                    percent: '100.33%'
                }
            ],
            emData: [
                {
                    name: '导入天涯海角',
                    data: '3320',
                    percent: '100.33%'
                }
            ],
            startDateValue:null,
            endDateValue:null

        }
    }
    componentDidMount () {
        this.setState({startDateValue: new Date(moment().format('YYYY/MM/DD'))});
        this.setState({endDateValue:new Date()});
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
    scrollRefresh = () => {
        this.timer=setTimeout(()=>{
            this.scroll.refresh();
            clearTimeout(this.timer);
        },600)
    }
    getData = () => {
        fetch("wait-query.json",{
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
                this.setState({
                    tableData:data.tableData,
                    emData:data.emData
                })
            })
            .catch(()=>{
            })
    }
    setTime = (start,end) =>{
        this.setState({
            startDateValue:start,
            endDateValue:end,

        })
    }
    getSelectData = ()=> {
        console.log(moment(this.state.startDateValue).format("YYYY-MM-DD HH:mm:ss"));
        console.log(moment(this.state.endDateValue).format("YYYY-MM-DD HH:mm:ss"));

    }
    render () {
        const {title,columns,tableData,emData,startDateValue,endDateValue} = this.state;
        return (
            <section className="wait-query">
                <Header title={`${title}等待病人查询`}/>
                <section className="container" ref="scroll">
                    <Tabs activeName="1" onTabClick={this.scrollRefresh}>
                        <Tabs.Pane label="门诊各科室等待人次" name="1">
                            <SearchBar
                                startDateValue={startDateValue}
                                endDateValue={endDateValue}
                                onGetSelectData={this.getSelectData}
                                onSetTime={this.setTime}
                            />
                            <Table
                                style={{width: '100%'}}
                                columns={columns}
                                data={tableData}
                            />
                        </Tabs.Pane>
                        <Tabs.Pane label="急诊各科室等待人次" name="2">
                            <SearchBar
                                startDateValue={startDateValue}
                                endDateValue={endDateValue}
                                onGetSelectData={this.getSelectData}
                                onSetTime={this.setTime}
                            />
                            <Table
                                style={{width: '100%'}}
                                columns={columns}
                                data={emData}
                            />
                        </Tabs.Pane>
                    </Tabs>
                </section>
            </section>
        )
    }

}