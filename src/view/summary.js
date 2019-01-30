import React, { Component } from 'react';
import {Collapse} from 'element-react'

import {Header} from "../component/header";
import {SelectTime} from "../component/search-bar";
import BScroll from "better-scroll";
import moment from "moment/moment";
import {baseUrl} from "../tools/environment";
import {homeInit} from "../store/data";

export class Summary extends Component{
    constructor (props) {
        super(props);
        this.state={
            activeName:null,
            data:[],
            title:null,
            yq:"ZY"
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
                this.setState({title:"总院",yq:"ZY"});
                this.getData(homeInit.time,"ZY");
                break;
            case "2":
                this.setState({title:"南院",yq:"NY"});
                this.getData(homeInit.time,"NY");
                break;
            default:
                this.setState({title:"吉安",yq:"JA"});
                this.getData(homeInit.time,"JA");
        }
    }
    scrollRefresh = () => {
        this.timer=setTimeout(()=>{
            this.scroll.refresh();
            clearTimeout(this.timer);
        },600)
    }
    getData = (time,yq) => {
        console.log(moment(time).format('YYYY-MM-DD'))
        let selectYq=this.state.yq;
        if(!!yq){
            selectYq=yq;
        }
        fetch(`${baseUrl}sshz/index?time=${moment(time).format('YYYY-MM-DD')}&&yq=${selectYq}`,{
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
                console.log(data)
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
                                    <Collapse.Item title={<section><span>{item.KSMC}</span><span>{index+1}</span></section>} name={index+""}>
                                        <ul className="table-body cleanfix">
                                            <li><span>手术例数：</span><span>{item.SSLS}</span></li>
                                            <li><span>三四级例数：</span><span>{item.SSJLS}</span></li>
                                            <li><span>全年计划累计数：</span><span>{item.YZRC}</span></li>
                                            <li><span>全年累计例数：</span><span>{item.JNSL}</span></li>
                                            <li><span>指标完成：</span><span>{item.YZRC===0?0:(item.JNSL/item.YZRC*100).toFixed(2)}%</span></li>
                                            <li><span>同比增加：</span><span>{item.QNSL===0?0:((item.JNSL-item.QNSL)/item.QNSL*100).toFixed(2)}%</span></li>
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