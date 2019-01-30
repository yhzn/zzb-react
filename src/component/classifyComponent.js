import React, { Component } from 'react';
import eCharts from 'echarts'
import {Select,Table} from 'element-react'
import {SearchBar} from "./search-bar";

export class ClassifyComponent extends Component {
    constructor (props) {
        super(props);
        this.state={
            selectData:{
                options: [{
                    value: 0,
                    label: '全部'
                }, {
                    value: 1,
                    label: '普通门诊'
                }, {
                    value: 2,
                    label: '专科门诊'
                }, {
                    value: 3,
                    label: '专家门诊'
                }, {
                    value: 4,
                    label: '急诊门诊'
                }],
                value: 0
            },
            columns: [

            ],
        }
        this.chart={}
    }
    componentWillReceiveProps () {
        this.chart.setOption(this.props.option)
    }
    componentDidMount () {
        this.chart = eCharts.init(this.refs.chart);
        let columns=[
            {
                label: "科室名称",
                prop: "KSMC",
                width:"138"

            },
            {
                label: "人次",
                prop: "GHRC",

            },
            {
                label: "百分比%",
                prop: "BFB"
            }
        ]
       switch (this.props.name){
           case "2":
               this.props.onGetChartDom(1,this.chart);
               columns[0].label="挂号类别";
               this.setState({columns});
               break;
           case "3":
               this.props.onGetChartDom(2,this.chart);
               columns[0].label="挂号时间";
               this.setState({columns});
               break;
           default :
               this.props.onGetChartDom(0,this.chart);
               columns[0].label="科室名称";
               this.setState({columns});
       }
    }
    selected = (value) => {
        this.props.onSelectValue(value);
    }
    getSelectData = () => {
        this.props.onGetSelectData();
    }
    setTime = (time) => {
        this.props.onSetTime(time);
    }
    render () {
        const {selectData,columns} = this.state;
        return (
            <section>
                <SearchBar
                    startDateValue={this.props.startDateValue}
                    endDateValue={this.props.endDateValue}
                    DateValue={this.props.DateValue}
                    onGetSelectData={this.getSelectData}
                    onSetTime={this.setTime}
                />
                <section className="chart-container">
                    {
                        this.props.selected?
                            <section className="cleanfix">
                                <Select value={selectData.value} placeholder="请选择" className="select" onChange={this.selected}>
                                    {
                                        selectData.options.map(el => {
                                            return <Select.Option key={el.value} label={el.label} value={el.value} />
                                        })
                                    }
                                </Select>
                            </section>
                            :
                            null
                    }
                    <section className="chart" ref="chart">

                    </section>
                </section>
                <section>
                    <Table
                        columns={columns}
                        data={this.props.tableData}
                    />
                </section>
            </section>
        )
    }

}