import React, { Component } from 'react';
import {Header} from '../component/header'
import {DatePicker} from 'element-react'
import BScroll from 'better-scroll'
import 'whatwg-fetch'

import chest from '../image/chest.png'
import jzIcon from '../image/jz-icon.png'
import tjIcon from '../image/tj-icon.png'
import doctor from '../image/doctor.png'
import healthy from '../image/healthy.png'
import heartbeat from '../image/heartbeat.png'
import hospital from '../image/hospital.png'
import treatment from '../image/treatment.png'
import register from '../image/register.png'
import wait from '../image/wait.png'
import empty from '../image/empty.png'
import choice from '../image/choice.png'
import call from '../image/call.png'
import summary from '../image/summary.png'
import drug from '../image/drug.png'
import {transferData} from "../tools/transfer";
import moment from "moment/moment";

export class Home extends Component {
    constructor (props) {
        super(props);
        this.state={
            dateValue:new Date(),
            clinicTotal:null,
            inHospitalTotal:null,
        }
    }
    componentDidMount () {
        this.getData();
        new BScroll(this.refs.scroll,{
            scrollY:true,
            click:true,
            probeType:3,
        });
    }
    getData = (time) => {
        if(time){
            this.setState({dateValue:time})
            console.log(moment(time).format('YYYY-MM-DD'))
        }
        fetch("index.json",{
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
                    clinicTotal:data.clinicTotal,
                    inHospitalTotal:data.inHospitalTotal
                })
            })
            .catch(()=>{
            })
    }
    jumpTo = (par,f=true) => {
        if(f){
            if(transferData.swiper.page!==par){
                transferData.swiper.page=par;
            }
            this.props.history.push('/department')
        }else{
            this.props.history.push(par)
        }
    }
    render () {
        const {dateValue,clinicTotal} = this.state;
        return (
            <section className="home">
                <Header />
                <section className="container" ref="scroll">
                    <section>
                        <section className="total-people">
                            <ul>
                                <li>
                                    <p>门诊总人数</p>
                                    <strong>{clinicTotal}</strong>
                                </li>
                                <li>
                                    <p>在院病人总人数</p>
                                    <strong>12312</strong>
                                </li>
                            </ul>
                            <section>
                                <DatePicker
                                    value={dateValue}
                                    placeholder="请选择日期"
                                    isReadOnly={true}
                                    onChange={this.getData}
                                    disabledDate={
                                        time =>time.getTime() > Date.now()
                                    }
                                />
                            </section>
                        </section>
                        <section className="departments cleanfix">
                            <dl onClick={this.jumpTo.bind(this,0)}>
                                <dt>
                                    <img src={chest} alt=""/>
                                </dt>
                                <dd>
                                    急诊（儿科）
                                </dd>
                            </dl>
                            <dl onClick={this.jumpTo.bind(this,1)}>
                                <dt>
                                    <img src={treatment} alt=""/>
                                </dt>
                                <dd>
                                    门诊（儿科）
                                </dd>
                            </dl>
                            <dl onClick={this.jumpTo.bind(this,2)}>
                                <dt>
                                    <img src={hospital} alt=""/>
                                </dt>
                                <dd>
                                    在院病人
                                </dd>
                            </dl>
                            <dl onClick={this.jumpTo.bind(this,3)}>
                                <dt className="revise">
                                    <img src={tjIcon} alt=""/>
                                </dt>
                                <dd>
                                    体检人数
                                </dd>
                            </dl>
                            <dl onClick={this.jumpTo.bind(this,4)}>
                                <dt>
                                    <img src={heartbeat} alt=""/>
                                </dt>
                                <dd>
                                    择期手术
                                </dd>
                            </dl>
                            <dl onClick={this.jumpTo.bind(this,5)}>
                                <dt className="revise">
                                    <img src={jzIcon} alt=""/>
                                </dt>
                                <dd>
                                    急诊手术
                                </dd>
                            </dl>
                            <dl onClick={this.jumpTo.bind(this,6)}>
                                <dt>
                                    <img src={doctor} alt=""/>
                                </dt>
                                <dd>
                                    危重病人
                                </dd>
                            </dl>
                            <dl onClick={this.jumpTo.bind(this,7)}>
                                <dt>
                                    <img src={healthy} alt=""/>
                                </dt>
                                <dd>
                                    手术汇总
                                </dd>
                            </dl>
                        </section>
                        <section className="data-count">
                            <h3>
                                数据统计
                            </h3>
                            <ul className="cleanfix">
                               <li onClick={this.jumpTo.bind(this,"/page/1",false)}><img src={register} alt=""/><p>挂号分类统计</p></li>
                               <li onClick={this.jumpTo.bind(this,"/page/2",false)}><img src={wait} alt=""/><p>等待病人查询</p></li>
                               <li onClick={this.jumpTo.bind(this,"/page/3",false)}><img src={empty} alt=""/><p>空床/床位统计</p></li>
                               <li onClick={this.jumpTo.bind(this,"/page/4",false)}><img src={choice} alt=""/><p>择期手术人数</p></li>
                               <li onClick={this.jumpTo.bind(this,"/page/5",false)}><img src={call} alt=""/><p>急诊手术人数</p></li>
                               <li onClick={this.jumpTo.bind(this,"/page/6",false)}><img src={summary} alt=""/><p>手术汇总</p></li>
                               <li onClick={this.jumpTo.bind(this,"/page/7",false)}><img src={drug} alt=""/><p>住院危重病人</p></li>
                            </ul>
                        </section>
                        <section className="duty cleanfix">
                            <section onClick={this.jumpTo.bind(this,"/duty/1",false)}>
                                <p>今日值班</p>
                                <strong>
                                    本院
                                </strong>
                            </section>
                            <section onClick={this.jumpTo.bind(this,"/duty/2",false)}>
                                <p>今日值班</p>
                                <strong>
                                    南院
                                </strong>
                            </section>
                        </section>
                        <footer>
                            <section onClick={this.jumpTo.bind(this,"/catalog",false)}>
                                <strong>
                                    中层及以上干部通讯录
                                </strong>
                            </section>
                        </footer>
                    </section>
                </section>
            </section>
        )
    }
}
