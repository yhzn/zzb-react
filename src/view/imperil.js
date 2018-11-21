import React, { Component } from 'react';
import {Header} from "../component/header";
import {SelectTime} from "../component/search-bar";
import {Collapse} from "element-react"
import BScroll from "better-scroll";
import moment from "moment/moment";

export class Imperil extends Component {
    constructor (props) {
        super(props);
        this.state={
            title:null,
            activeName:null,
            data:[]
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
        fetch("imperil.json",{
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
        const {title,data} = this.state;
        return (
            <section>
                <Header title={`${title}住院危重病人`}/>
                <section className="container" ref="scroll">
                    <section>
                        <SelectTime onGetData={this.getData}/>
                        <section className="details-component">
                            <ul className="collapse header">
                                <li>病人姓名</li>
                                <li>性别</li>
                                <li>住院号</li>
                                <li>科室</li>
                                <li>序号</li>
                            </ul>
                            {
                                data.map((item,index) => (
                                    <Collapse value={this.state.activeName} onChange={this.scrollRefresh} key={index}>
                                        <Collapse.Item title={
                                            <ul className="collapse">
                                                <li>{item.name}</li>
                                                <li>{item.gender}</li>
                                                <li>{item.num}</li>
                                                <li>{item.department}</li>
                                                <li>{index+1}</li>
                                            </ul>
                                        } name={index+""}>
                                            <ul>
                                                <li><span>床号：</span><span>{item.bedNum}</span></li>
                                                <li><span>年龄：</span><span>{item.age}</span></li>

                                                <li><span>病人科室：</span><span>{item.department}</span></li>
                                                <li><span>告病危病区：</span><span>{item.wing}</span></li>
                                                <li><span>诊断：</span><span>{item.diagnosis}</span></li>
                                                <li><span>入院时间：</span><span>{item.inHospitalTime}</span></li>
                                                <li><span>告病危时间：</span><span>{item.woTime}</span></li>
                                                <li><span>告病危天数：</span><span>{item.woDay}</span></li>
                                            </ul>
                                        </Collapse.Item>
                                    </Collapse>

                                ))
                            }
                        </section>
                    </section>
                </section>
            </section>
        )
    }
}