import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import {Header} from "../component/header";
import partBanner_1 from '../image/part-banner-1.gif'
import partBanner_2 from '../image/part-banner-2.gif'
import partBanner_3 from '../image/part-banner-3.gif'
import partBanner_4 from '../image/part-banner-4.gif'
import partBanner_5 from '../image/part-banner-5.gif'
import partBanner_6 from '../image/part-banner-6.gif'
import partBanner_7 from '../image/part-banner-7.gif'
import part_1 from '../image/part_1.gif'
import part_2 from '../image/part_2.gif'
import part_3 from '../image/part_3.gif'
function SubPage(props) {
    return (
        <section className="container">
            <section>
                <img src={props.banner} alt=""/>
            </section>
            <ul>
                <li>
                    <Link to={props.url+"1"}>
                        <img src={part_1} alt=""/>
                        <strong>总院</strong>
                        <i className="el-icon-arrow-right" />
                    </Link>
                </li>
                <li>
                    <Link to={props.url+"2"}>
                        <img src={part_2} alt=""/>
                        <strong>南院</strong>
                        <i className="el-icon-arrow-right" />
                    </Link>
                </li>
                <li>
                    <Link to={props.url+"3"}>
                        <img src={part_3} alt=""/>
                        <strong>吉安</strong>
                        <i className="el-icon-arrow-right" />
                    </Link>
                </li>
            </ul>
        </section>
    )
}
export class Page extends Component {
    constructor (props) {
        super(props);
        this.state={
           num:1
        }
    }
    componentDidMount () {

    }
    render () {
        let pageComponent = null;
        let title = null;
        switch (Number(this.props.match.params.id)){
            case 1:
                title = "挂号分类统计";
                pageComponent=<SubPage banner={partBanner_1} url="/classify/"/>;
                break;
            case 2:
                title = "等待病人查询";
                pageComponent=<SubPage banner={partBanner_2} url="/waitquery/"/>;
                break;
            case 3:
                title = "空床/床位统计";
                pageComponent=<SubPage banner={partBanner_3} url="/bedcount/"/>;
                break;
            case 4:
                title = "择期手术人数";
                pageComponent=<SubPage banner={partBanner_4} url="/operation/"/>;
                break;
            case 5:
                title = "急诊手术人数";
                pageComponent=<SubPage banner={partBanner_5} url="/emoperation/"/>;
                break;
            case 6:
                title = "手术汇总";
                pageComponent=<SubPage banner={partBanner_6} url="/summary/"/>;
                break;
            default:
                title = "住院危重病人";
                pageComponent=<SubPage banner={partBanner_7} url="/imperil/"/>;

        }
        return (
            <section className="page">
                <Header title={title}/>
                {pageComponent}
            </section>
        )
    }
}