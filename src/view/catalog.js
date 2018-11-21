import React, { Component } from 'react';
import {Header} from "../component/header";
import phone from "../image/phone.png"
import phoneBanner from "../image/phone-banner.png"
import BScroll from "better-scroll";
export class Catalog extends Component {
    componentDidMount () {
        this.scroll=new BScroll(this.refs.scroll,{
            scrollY:true,
            click:true,
            probeType:3,
        });
    }
    jumpTo = (url) => {
        this.props.history.push(url)

    }
    render () {
        return (
            <section className="catalog">
                <Header title="中层及以上干部通讯录"/>
                <section className="container" ref="scroll">
                    <section>
                        <section className="banner">
                            <img src={phoneBanner} alt=""/>
                        </section>
                        <ul>
                            <li onClick={this.jumpTo.bind(this,'/phone/1')}>
                                <img src={phone} alt=""/><span>行政医技通讯录</span>
                            </li>
                            <li onClick={this.jumpTo.bind(this,'/phone/2')}>
                                <img src={phone} alt=""/><span>临床通讯录</span>
                            </li>
                            <li onClick={this.jumpTo.bind(this,'/phone/3')}>
                                <img src={phone} alt=""/><span>护理部通讯录（本部）</span>
                            </li>
                            <li onClick={this.jumpTo.bind(this,'/phone/4')}>
                                <img src={phone} alt=""/><span>护理部通讯录（南院）</span>
                            </li>
                        </ul>
                    </section>
                </section>
            </section>
        )
    }
}