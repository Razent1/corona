import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import WorldInfo from "./WorldInfo";
import Countries from "./Countries";
import Graph from "./Graph";
import Search from "./Search";
import IntMap from "./IntMap";


class Main extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/world' component={WorldInfo}></Route>
                    <Route path='/countries' component={Countries}></Route>
                    <Route path='/graph' component={Graph}></Route>
                    <Route path='/search' component={Search}></Route>
                    <Route path='/map' component={IntMap}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Main;