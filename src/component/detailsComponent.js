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
                    data.length!==0?
                        <Collapse value={this.state.activeName} onChange={this.scrollRefresh}>
                        {
                            data.map((item,index) => (
                                <Collapse.Item title={
                                    <ul className="collapse">
                                        <li>{item.BRXM}</li>
                                        <li>{item.BRXB}</li>
                                        <li>{item.ZYHM}</li>
                                        <li>{item.KSMC}</li>
                                        <li>{index+1}</li>
                                    </ul>
                                } name={index+""} key={index}>
                                    <ul>
                                        <li><span>科&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;室：</span><span>{item.KSMC}</span></li>
                                        <li><span>手术名称：</span><span>{item.SSMC}</span></li>
                                        <li><span>手术级别：</span><span>{item.SSJB}</span></li>
                                        <li><span>安排日期：</span><span>{item.APRQ}</span></li>
                                        <li><span>手术日期：</span><span>{item.SSRQ}</span></li>
                                        <li><span>手术医生：</span><span>{item.SSYS}</span></li>
                                        <li><span>手术医助：</span><span>{item.SSYZ}</span></li>
                                        <li><span>麻醉方式：</span><span>{item.MZFS}</span></li>
                                    </ul>
                                </Collapse.Item>
                            ))
                        }
                    </Collapse>:
                    <section className="data-empty">
                        无数据......
                    </section>
                }

            </section>
        )
    }
}