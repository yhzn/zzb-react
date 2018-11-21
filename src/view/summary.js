import React, { Component } from 'react';
import {Collapse} from 'element-react'

import {Header} from "../component/header";
import {SelectTime} from "../component/search-bar";
import BScroll from "better-scroll";
import moment from "moment/moment";

export class Summary extends Component{
    constructor (props) {
        super(props);
        this.state={
            activeName:null,
            data:[],
            title:null
        }
    }
    componentDidMount () {
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
    getData = (time) => {
        if(time){
            console.log(moment(time).format('YYYY-MM-DD'))
        }
        fetch("summary.json",{
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
                this.setState({data})
            })
            .catch(()=>{
            })
    }

    render () {
        const {title,activeName,data} = this.state;
        return (
            <section className="summary">
                <Header title={`${title}手术汇总`}/>
                <section className="container" ref="scroll">
                    <section>
                        <SelectTime onGetData={this.getData}/>
                        <ul className="table-head">
                            <li>科室名称</li>
                            <li>序号</li>
                        </ul>
                        {
                            data.map((item,index) => (
                                <Collapse value={activeName} onChange={this.scrollRefresh} key={index}>
                                    <Collapse.Item title={<section><span>{item.department}</span><span>{index+1}</span></section>} name={index+""}>
                                        <ul className="table-body cleanfix">
                                            <li><span>手术例数：</span><span>{item.operationNum}</span></li>
                                            <li><span>三四级例数：</span><span>{item.levelNum}</span></li>
                                            <li><span>全年计划累计数：</span><span>{item.APNum}</span></li>
                                            <li><span>全年累计例数：</span><span>{item.ACNum}</span></li>
                                            <li><span>指标完成：</span><span>{item.target}</span></li>
                                            <li><span>同比增加：</span><span>{item.increase}</span></li>
                                        </ul>
                                    </Collapse.Item>
                                </Collapse>

                            ))
                        }

                    </section>
                </section>
            </section>
        )
    }
}