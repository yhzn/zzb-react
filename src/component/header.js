import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
class HeaderC extends Component {
    constructor (props) {
        super(props);
        this.state={}
    }
    componentDidMount () {

    }
    goback = () => {
        this.props.history.goBack()
    }
    render () {
        return (
            <header>
                    <i className="el-icon-arrow-left" onClick={()=>this.goback()}/>
                    <section>
                        {
                            this.props.title?this.props.title:"总值班系统"
                        }
                    </section>
            </header>
        )
    }
}
export let Header = withRouter(HeaderC);