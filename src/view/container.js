import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Route } from 'react-router-dom';
import {Department} from "./department";
import style from "../sass/container.scss";
import {EmOperation} from "./em-operation";
import {Duty} from "./duty";
import {Page} from "./page";
import {Operation} from "./operation";
import {Catalog} from "./catalog";
import {Phone} from "./phone";
import {Ani} from "./ani";
import {BedCount} from "./bed-count";
import {Summary} from "./summary";
import {WaitQuery} from "./wait-query";
import {Classify} from "./classify";
import {Imperil} from "./imperil";
// const Message = ({ match }) => (
//     <div>
//         <h3>new messages</h3>
//         <h3>{match.params.id}</h3>
//     </div>
// )

export class Container extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        console.log(this.props.match.path);

        document.body.style.margin = "0px";
        // 这是防止页面被拖拽
        document.body.addEventListener('touchmove', (ev) => {
            ev.preventDefault();
        });
    }

    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName="transitionWrapper"
                component="div"
                className={style.transitionWrapper}
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
                <div key={this.props.location.pathname}
                     style={{position:"absolute", width: "100%"}}>
                    <Route  path={`${this.props.match.path}/department`} component={Department}/>
                    <Route  path={`${this.props.match.path}/page/:id`} component={Page}/>
                    <Route  path={`${this.props.match.path}/classify/:id`} component={Classify}/>
                    <Route  path={`${this.props.match.path}/waitquery/:id`} component={WaitQuery}/>
                    <Route  path={`${this.props.match.path}/bedcount/:id`} component={BedCount}/>
                    <Route  path={`${this.props.match.path}/operation/:id`} component={Operation}/>
                    <Route  path={`${this.props.match.path}/emoperation/:id`} component={EmOperation}/>
                    <Route  path={`${this.props.match.path}/summary/:id`} component={Summary}/>
                    <Route  path={`${this.props.match.path}/imperil/:id`} component={Imperil}/>
                    <Route  path={`${this.props.match.path}/duty/:id`} component={Duty}/>
                    <Route  path={`${this.props.match.path}/catalog`} component={Catalog}/>
                    <Route  path={`${this.props.match.path}/phone/:id`} component={Phone}/>
                    <Route  path={`${this.props.match.path}/a`} component={Ani}/>
                </div>
            </ReactCSSTransitionGroup>
        );
    }

}