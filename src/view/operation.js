import React, { Component } from 'react';
import {Header} from "../component/header";
import {SelectTime} from "../component/search-bar";
import {DetailsComponent} from "../component/detailsComponent";
import moment from 'moment'
import BScroll from "better-scroll";
import {MessageBox,Loading} from "element-react";
import {baseUrl} from "../tools/environment";
import {homeInit} from "../store/data";

export class Operation extends Component {
    constructor (props) {
        super(props);
        this.state={
            title:null,
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
                break;
        }

    }
    getData = (time,yq) => {
        let selectYq=this.state.yq;
        if(!!yq){
            selectYq=yq;
        }
        fetch(`${baseUrl}zqss/index?time=${moment(time).format('YYYY-MM-DD')}&&yq=${selectYq}`,{
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
                console.log(data);
                this.setState({data})
            })
            .catch(()=>{
                this.setState({loading:false});
                MessageBox.alert("数据加载失败");

            })
    }

    scrollRefresh = () => {
        this.timer=setTimeout(()=>{
            this.scroll.refresh();
            clearTimeout(this.timer);
        },600)
    }
    render () {
        const {title,data,loading} = this.state;
        return (
            <section>
               <Header title={`${title}择期手术人数`}/>
                <section className="container" ref="scroll">
                    <section>
                        <SelectTime onGetData={this.getData}/>
                        <DetailsComponent onScrollRefresh={this.scrollRefresh} data={data}/>
                    </section>
                </section>
                {
                    loading && <Loading text="数据加载中......" loading={true} fullscreen={true}/>
                }
            </section>
        )
    }
}