import React, { Component } from 'react';
import {Header} from "../component/header";
import {SelectTime} from "../component/search-bar";
import {DetailsComponent} from "../component/detailsComponent";
import moment from 'moment'
import BScroll from "better-scroll";

export class Operation extends Component {
    constructor (props) {
        super(props);
        this.state={
            title:null,
            data:[]
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
        this.getData("2018");
    }
    getData = (time) => {
        if(time){
            console.log(moment(time).format('YYYY-MM-DD'))
        }
        fetch("operation.json",{
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
                this.setState({data})
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
    render () {
        const {title,data} = this.state;
        return (
            <section>
               <Header title={`${title}择期手术人数`}/>
                <section className="container" ref="scroll">
                    <section>
                        <SelectTime onGetData={this.getData}/>
                        <DetailsComponent onScrollRefresh={this.scrollRefresh} data={data}/>
                    </section>
                </section>
            </section>
        )
    }
}