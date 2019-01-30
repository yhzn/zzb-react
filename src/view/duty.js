import React, { Component } from 'react';
import {DatePicker, Button, Input, Tabs, MessageBox,Loading} from 'element-react'
import  {Header} from "../component/header";
import BScroll from "better-scroll";
import {baseUrl} from "../tools/environment";
import moment from "moment/moment";

export class Duty extends Component {
    constructor (props) {
        super(props);
        this.state={
            title:null,
            searchValue:'',
            lc:[],
            yj:[],
            loading:true,
            tabName:"1",
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
                this.setState({title:"本院"});
                break;
            default:
                this.setState({title:"南院"});
        }
        this.getDate();
    }
    search = () => {
        if(this.state.tabName==="1"){
            let lc=this.lc.filter((item,index) => {

                return this.state.searchValue.trim()===""||item.ks.indexOf(this.state.searchValue.trim())!==-1;

            });
            this.setState({lc});
        }else{
            let yj=this.yj.filter((item,index) => {

                return this.state.searchValue.trim()===""||item.ks.indexOf(this.state.searchValue.trim())!==-1;

            });
            this.setState({yj});
        }
    }
    setSearchValue = (value) => {
        this.setState({searchValue:value});
    }
    getDate = (time) => {
        console.log(moment(time).format('YYYY-MM-DD'));
        this.setState({searchValue:""});
        fetch(`duty.json`,{
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
            .then((data)=>{
                console.log(data)
                this.lc=data.lc;
                this.yj=data.yj;
                this.setState({lc:data.lc,yj:data.yj});
                if(!!this.scroll){
                    this.scrollRefresh();
                }
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
        const {title,value1,searchValue,lc,yj,loading} = this.state;
        return (
            <section className="duty">
                <Header title={`${title}今日值班`}/>
                <section className="container" ref="scroll">
                    <section>
                        <nav>
                            <DatePicker
                                value={value1}
                                placeholder="选择日期"
                                onChange={this.getDate}
                                isReadOnly={true}
                                disabledDate={time=>time.getTime() > Date.now()}
                            />
                        </nav>
                        <section className="search">
                            <Input
                                placeholder="请输入科室名称"
                                value={searchValue}
                                onChange={this.setSearchValue}
                                append={
                                    <Button type="info" icon="search" onClick={this.search}>搜索</Button>
                                }
                            />
                        </section>
                        <Tabs activeName="1" className="tabs" onTabClick={ (tab) => this.setState({tabName:tab.props.name}) }>
                            <Tabs.Pane label="临床科室" name="1">
                                {
                                   lc.length!==0?
                                       lc.map((item,index)=>(
                                           <section className="department-list" key={index}>
                                               <p>{item.ks}</p>
                                               <section>值班电话:<a href={"tel:"+item.tel}>{item.tel}</a></section>
                                               <ul>
                                                   {
                                                       item.bc.map((subItem,subIndex)=>(
                                                               <li className="class-list" key={subIndex}>
                                                                   <section>{subItem.line}</section>
                                                                   <ul>
                                                                       {
                                                                           subItem.per.map((msg,k)=>(
                                                                               <li key={k}>{msg.name}：<a href={"tel:"+msg.phone}>{msg.phone}</a></li>
                                                                           ))
                                                                       }
                                                                   </ul>
                                                               </li>
                                                           )
                                                       )
                                                   }
                                               </ul>
                                           </section>
                                       ))
                                       :
                                       <section className="data-empty">暂无数据......</section>
                                }
                            </Tabs.Pane>
                            <Tabs.Pane label="医技科室" name="2">
                                {
                                    yj.length!==0?
                                        yj.map((item,index)=>(
                                            <section className="department-list" key={index}>
                                                <p>{item.ks}</p>
                                                <section>值班电话:<a href={"tel:"+item.tel}>{item.tel}</a></section>
                                                <ul>
                                                    {
                                                        item.bc.map((subItem,subIndex)=>(
                                                            <li className="class-list" key={subIndex}>
                                                                <section>{subItem.line}</section>
                                                                <ul>
                                                                    {
                                                                        subItem.per.map((msg,k)=>(
                                                                            <li key={k}>{msg.name}：<a href={"tel:"+msg.phone}>{msg.phone}</a></li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            </li>
                                                            )
                                                        )
                                                    }
                                                </ul>
                                            </section>
                                        ))
                                        :
                                        <section className="data-empty">暂无数据......</section>
                                }

                            </Tabs.Pane>
                        </Tabs>
                    </section>
                </section>
                {
                    loading && <Loading text="加载中......" loading={true} fullscreen={true}/>
                }
            </section>
        )
    }
}