import React, { Component } from 'react';
import {Collapse} from 'element-react'
export class DetailsComponent extends Component {
    constructor (props) {
        super(props);
        this.state={
            activeName:null
        }
    }
    componentDidMount () {

    }
    scrollRefresh = () => {
        this.props.onScrollRefresh();
    }
    render () {
        const {data} = this.props;
        return (
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
                                    <li><span>科&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;室：</span><span>{item.department}</span></li>
                                    <li><span>手术名称：</span><span>{item.operationName}</span></li>
                                    <li><span>手术级别：</span><span>3</span></li>
                                    <li><span>申请时间：</span><span>{item.applicationTime}</span></li>
                                    <li><span>安排时间：</span><span>{item.executionTime}</span></li>
                                    <li><span>手术医生：</span><span>{item.doctor}</span></li>
                                    <li><span>手术医助：</span><span>{item.assistantDoctor}</span></li>
                                    <li><span>麻醉方式：</span><span>{item.anaesthesia}</span></li>
                                </ul>
                            </Collapse.Item>
                        </Collapse>

                    ))
                }
            </section>
        )
    }
}