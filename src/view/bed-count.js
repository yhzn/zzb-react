import React, { Component } from 'react';
import {Collapse,Table} from 'element-react'

import {Header} from '../component/header';
import {SelectBar} from "../component/search-bar";
import BScroll from "better-scroll";

export class BedCount extends Component {
    constructor (props) {
        super(props);
        this.state={
            title:null,
            selectData:{
                options: [{
                    value: 0,
                    label: '空床统计'
                },{
                    value: 1,
                    label: '床位统计'
                }],
                value: 0
            },
            activeName:null,
            columns: [
                {
                    label: "",
                    prop: "bed",
                },
                {
                    label: "男床",
                    prop: "manBed",
                    width:"60"
                },
                {
                    label: "女床",
                    prop: "womanBed",
                    width:"60"

                },
                {
                    label: "不限",
                    prop: "noLimit",
                    width:"60"

                },
                {
                    label: "小计",
                    prop: "count",
                    width:"60"

                }
            ],
            tableList:[]


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
    getData = () => {
        fetch("bed-count.json",{
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
                    tableList:data
                })
            })
            .catch(()=>{
            })
    }
    scrollRefresh = () => {
        this.timer=setTimeout(()=>{
            this.scroll.refresh();
            clearTimeout(this.timer);
        },600)

    }
    selected = (value) => {
        console.log(value)
    }
    getSelectData = () => {
        console.log("获取数据")
    }
    render () {
        const {title,selectData,activeName,columns,tableList} = this.state;
        return (
            <section className="bed-count">
                <Header title={`${title}床位统计报表`}/>
                <section className="container" ref="scroll">
                    <section>
                        <SelectBar
                            selectData={selectData}
                            onSelectValue={this.selected}
                            onGetData={this.getSelectData}
                        />
                            <ul className="table-head">
                                <li>科室名称</li>
                                <li>序号</li>
                            </ul>
                            <Collapse value={activeName} onChange={this.scrollRefresh}>
                                {
                                    tableList.map((item,index) => (
                                        <Collapse.Item title={<section><span>{item.title}</span><span>1</span></section>} name={index+""} key={index}>
                                            <Table
                                                style={{width: '100%'}}
                                                columns={columns}
                                                data={item.table}
                                            />
                                        </Collapse.Item>
                                    ))
                                }
                            </Collapse>
                    </section>
                </section>
            </section>
        )
    }
}