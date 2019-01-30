import React, { Component } from 'react';
import {HashRouter as Router,Route,Switch} from 'react-router-dom'
// import { Provider } from 'react-redux'
import 'element-theme-default';
import 'swiper/dist/css/swiper.css';
import './App.css';
import './sass/App.scss'
import {Home} from './view/home'
import {Department} from "./view/department";
import {Page} from "./view/page";
import {Classify} from "./view/classify";
import {WaitQuery} from "./view/wait-query";
import {BedCount} from "./view/bed-count";
import {Operation} from "./view/operation";
import {EmOperation} from "./view/em-operation";
import {Summary} from "./view/summary";
import {Imperil} from "./view/imperil";
import {Duty} from "./view/duty";
import {Catalog} from "./view/catalog";
import {Phone} from "./view/phone";
import {Ani} from "./view/ani";
import {Container} from "./view/container";
import {Todo} from "./store/todo";

class App extends Component {
  render() {
    return (
            <Router>
                <div>
                    <Switch>
                        <Route  exact path="/" component={Home}/>
                        <Route  path="/department/:date" component={Department}/>
                        <Route  path="/page/:id" component={Page}/>
                        <Route  path="/classify/:id" component={Classify}/>
                        <Route  path="/waitquery/:id" component={WaitQuery}/>
                        <Route  path="/bedcount/:id" component={BedCount}/>
                        <Route  path="/operation/:id" component={Operation}/>
                        <Route  path="/emoperation/:id" component={EmOperation}/>
                        <Route  path="/summary/:id" component={Summary}/>
                        <Route  path="/imperil/:id" component={Imperil}/>
                        <Route  path="/duty/:id" component={Duty}/>
                        <Route  path="/catalog" component={Catalog}/>
                        <Route  path="/phone/:id" component={Phone}/>
                        <Route  path="/a" component={Ani}/>
                        <Route  path="/c" component={Container}/>
                        <Route  path="/todo" component={Todo}/>
                    </Switch>
                </div>
            </Router>
    );
  }
}

export default App;
