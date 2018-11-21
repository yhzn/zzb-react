import React, { Component } from 'react';
import {Button,Input,Table} from 'element-react'
import {Header} from "../component/header";
import BScroll from "better-scroll";

export class Phone extends Component {
    constructor (props) {
        super(props);
        this.state={
            title:null,
            searchValue:"",
            columns: [
                {
                    label: "部门",
                    prop: "department",
                    width: 100
                },
                {
                    label: "姓名",
                    prop: "name",
                    width: 80
                },
                {
                    label: "手机号",
                    prop: "phone",
                    render: function(data){
                        return <a href={`tel:${data.phone}`}>{data.phone}</a>
                    }
                }
            ],
            data: [{
                department: '地图和儿童',
                name: '王小虎',
                phone: '18888888888'
            }]
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
                this.setState({title:"行政医技通讯录"});
                break;
            case "2":
                this.setState({title:"临床通讯录"});
                break;
            case "3":
                this.setState({title:"护理部通讯录（本部）"});
                break;
            default:
                this.setState({title:"护理部技通讯录（南院）"});
        }
    }
    getData = () => {

    }
    setSearchValue = (value) => {
        this.setState({searchValue:value})
    }
    search = () => {

    }
    render () {
        const {title,searchValue,columns,data} = this.state;
        return (
            <section className="phone">
                <Header title={title}/>
                <section className="container" ref="scroll">
                    <section className="search">
                        <Input placeholder="请输入部门名称或姓名" value={searchValue} onChange={this.setSearchValue} append={<Button type="info" icon="search" onClick={this.search}>搜索</Button>}/>
                    </section>
                    <Table
                        style={{width: '100%'}}
                        columns={columns}
                        maxHeight={200}
                        data={data}
                    />
                </section>

            </section>
        )
    }
}