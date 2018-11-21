import React, { Component } from 'react';
import {Button,DatePicker,Select} from 'element-react'
export class SearchBar extends Component {
    getSelectData = () => {
        this.props.onGetSelectData();
    }
    setTime = (f,time) => {
        if(f){
            this.props.onSetTime(time,this.props.endDataValue);
        }else{
            this.props.onSetTime(this.props.startValuetime,time);
        }
    }
    render () {
        return (
            <ul className="search-bar cleanfix">
                <li>
                    <DatePicker
                        value={this.props.startDateValue}
                        isShowTime={true}
                        placeholder="选择开始日期"
                        format="yyyy-MM-dd HH:mm:ss"
                        isReadOnly={true}
                        onChange={this.setTime.bind(this,true)}
                        disabledDate={time=>time.getTime() > this.props.endDateValue}

                    />
                </li>
                <li><span>--</span></li>
                <li>
                    <DatePicker
                        value={this.props.endDateValue}
                        isShowTime={true}
                        placeholder="选择结束日期"
                        format="yyyy-MM-dd HH:mm:ss"
                        isReadOnly={true}
                        onChange={this.setTime.bind(this,false)}
                        disabledDate={time=>time.getTime() > Date.now()}
                    />
                </li>
                <li>
                    <Button type="info" onClick={this.getSelectData}>统计时间查询</Button>
                </li>
            </ul>
        )
    }
}
export class SelectBar extends Component {
    selected = (value)=> {
       this.props.onSelectValue(value);
    }
    getData = () => {
        this.props.onGetData();
    }
    render () {
        const {selectData} = this.props;
        return (
            <ul className="select-bar">
               <li>
                   <span>床位类别：</span>
               </li>
                <li>
                    <Select value={selectData.value} placeholder="请选择" className="select" onChange={this.selected}>
                        {
                            selectData.options.map(el => {
                                return <Select.Option key={el.value} label={el.label} value={el.value} />
                            })
                        }
                    </Select>
                </li>
                <li>
                    <Button type="info" onClick={this.getData}>查询</Button>
                </li>
            </ul>
        )
    }
}
export class SelectTime extends Component {
    constructor (props) {
        super(props);
        this.state={
            dateValue:new Date()
        }
    }
    componentDidMount () {

    }
    getData = () => {
        this.props.onGetData(this.state.dateValue);
    }
    render () {
        const {dateValue} = this.state;
        return (
            <ul className="select-time">
                <li><span>时间：</span></li>
                <li>
                    <DatePicker
                        value={dateValue}
                        placeholder="选择日期"
                        isReadOnly={true}
                        onChange={date=>{
                            this.setState({dateValue: date})
                        }}
                        disabledDate={time=>time.getTime() > Date.now()}
                    />
                </li>
                <li><Button type="info" onClick={this.getData}>查询</Button></li>
            </ul>
        )
    }
}