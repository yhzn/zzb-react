import React, { Component } from 'react';
import {Header} from "../component/header";
import {SelectTime} from "../component/search-bar";
import {Collapse, MessageBox,Loading} from "element-react"
import BScroll from "better-scroll";
import moment from "moment/moment";
import {baseUrl} from "../tools/environment";
import {homeInit} from "../store/data";

export class Imperil extends Component {
    constructor (props) {
        super(props);
        this.state={
            title:null,
            activeName:null,
            data:[],
            loading:true,
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
        let selectYq=this.state.yq;
        if(!!yq){
            selectYq=yq;
        }
        console.log(moment(time).format('YYYY-MM-DD'))

         console.log(yq)
        fetch(`${baseUrl}wzbr/index?time=${moment(time).format('YYYY-MM-DD')}&&yq=${selectYq}`,{
            method:"get",
            headers:{
                "Content-Type": "application/x-www-form-urlencoded",

            }
        })
            .then((response) => {
                this.setState({loading:false});
                if(response.status===200){
                    return response.json()
                }else{
                    MessageBox.alert("数据加载异常");
                }
            })
            .then((data) => {
                this.setState({data})
            })
            .catch(()=>{
                this.setState({loading:false});
                MessageBox.alert("数据加载失败");
            })
    }
    render () {
        const {title,data,loading} = this.state;
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
                                data.length!==0?
                                    <Collapse value={this.state.activeName} onChange={this.scrollRefresh}>
                                        {
                                            data.map((item,index) => (
                                                <Collapse.Item title={
                                                    <ul className="collapse">
                                                        <li>{item.BRXM}</li>
                                                        <li>{item.BRXB===1?"男":"女"}</li>
                                                        <li>{item.ZYHM}</li>
                                                        <li>{item.BRSK}</li>
                                                        <li>{index+1}</li>
                                                    </ul>
                                                } name={index+""}  key={index}>
                                                    <ul>
                                                        <li><span>床号：</span><span>{item.BRCH}</span></li>
                                                        <li><span>年龄：</span><span>{item.NL}</span></li>
                                                        <li><span>病人科室：</span><span>{item.BRSK}</span></li>
                                                        <li><span>告病危病区：</span><span>{item.KSMC}</span></li>
                                                        <li><span>诊断：</span><span>{item.ZD}</span></li>
                                                        <li><span>入院时间：</span><span>{item.RYRQ}</span></li>
                                                        <li><span>告病危时间：</span><span>{item.KSSJ}</span></li>
                                                        <li><span>告病危天数：</span><span>{item.BWTS}</span></li>
                                                    </ul>
                                                </Collapse.Item>
                                            ))
                                        }
                                    </Collapse>
                                :
                                    <section className="data-empty">无数据......</section>
                            }

                        </section>
                    </section>
                </section>
                {
                    loading && <Loading text="数据加载中......" loading={true} fullscreen={true}/>
                }
            </section>
        )
    }
}