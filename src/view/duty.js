import React, { Component } from 'react';
import {DatePicker,Button,Input,Tabs} from 'element-react'
import  {Header} from "../component/header";
import BScroll from "better-scroll";

export class Duty extends Component {
    constructor (props) {
        super(props);
        this.state={
            title:null,
            searchValue:''
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
    }
    search = () => {
        console.log(this.state.searchValue)
    }
    setSearchValue = (value) => {
        this.setState({searchValue:value})
    }
    render () {
        const {title,value1,searchValue} = this.state;
        return (
            <section className="duty">
                <Header title={`${title}今日值班`}/>
                <section className="container" ref="scroll">
                    <section>
                        <nav>
                            <DatePicker
                                value={value1}
                                placeholder="选择日期"
                                onChange={date=>{
                                    console.debug('DatePicker1 changed: ', date)
                                    this.setState({value1: date})
                                }}
                                isReadOnly={true}
                                disabledDate={time=>time.getTime() > Date.now()}
                            />
                        </nav>
                        <section className="search">
                            <Input placeholder="请输入科室名称" value={searchValue} onChange={this.setSearchValue} append={<Button type="info" icon="search" onClick={this.search}>搜索</Button>}/>
                        </section>
                        <Tabs activeName="1" className="tabs" onTabClick={ (tab) => console.log(tab.props.name) }>
                            <Tabs.Pane label="临床科室" name="1">
                                <section className="department-list">
                                    <p>胆石病</p>
                                    <section>值班电话</section>
                                    <ul>
                                        <li className="class-list">
                                            <section>一线班</section>
                                            <ul>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                            </ul>
                                        </li>
                                        <li className="class-list">
                                            <section>一线班</section>
                                            <ul>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                            </ul>
                                        </li>
                                        <li className="class-list">
                                            <section>一线班</section>
                                            <ul>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </section>
                                <section className="department-list">
                                    <p>胆石病</p>
                                    <section>值班电话</section>
                                    <ul>
                                        <li className="class-list">
                                            <section>一线班</section>
                                            <ul>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                            </ul>
                                        </li>
                                        <li className="class-list">
                                            <section>一线班</section>
                                            <ul>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                            </ul>
                                        </li>
                                        <li className="class-list">
                                            <section>一线班</section>
                                            <ul>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </section>
                                <section className="department-list">
                                    <p>胆石病</p>
                                    <section>值班电话</section>
                                    <ul>
                                        <li className="class-list">
                                            <section>一线班</section>
                                            <ul>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                            </ul>
                                        </li>
                                        <li className="class-list">
                                            <section>一线班</section>
                                            <ul>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                            </ul>
                                        </li>
                                        <li className="class-list">
                                            <section>一线班</section>
                                            <ul>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </section>
                            </Tabs.Pane>
                            <Tabs.Pane label="医技科室" name="2">
                                <section className="department-list">
                                    <p>胆石病</p>
                                    <section>值班电话</section>
                                    <ul>
                                        <li className="class-list">
                                            <section>一线班</section>
                                            <ul>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                            </ul>
                                        </li>
                                        <li className="class-list">
                                            <section>一线班</section>
                                            <ul>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                            </ul>
                                        </li>
                                        <li className="class-list">
                                            <section>一线班</section>
                                            <ul>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </section>
                                <section className="department-list">
                                    <p>胆石病</p>
                                    <section>值班电话</section>
                                    <ul>
                                        <li className="class-list">
                                            <section>一线班</section>
                                            <ul>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                            </ul>
                                        </li>
                                        <li className="class-list">
                                            <section>一线班</section>
                                            <ul>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                            </ul>
                                        </li>
                                        <li className="class-list">
                                            <section>一线班</section>
                                            <ul>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                                <li>李丽：<a href="tel:13999999999">13999999999</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </section>
                            </Tabs.Pane>
                        </Tabs>
                    </section>
                </section>

            </section>
        )
    }
}