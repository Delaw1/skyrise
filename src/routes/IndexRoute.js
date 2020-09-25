import React, { Component, Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AddAttached from "../components/dashboard/AddAttached"
import AddDetached from "../components/dashboard/AddDetached"
import Developer from "../components/dashboard/Developer"
import DeveloperList from "../components/dashboard/DeveloperList"
import DeveloperData from "../components/dashboard/DeveloperData"
import ProjectList from "../components/dashboard/ProjectList"
import Admin from "../components/dashboard/Admin"
import Home from "../components/dashboard/Home"

export class IndexRoute extends Component {
    render() { 
        return (
            <Fragment>
                <Route exact path="/" component={Home}  />
                <Route path="/add-developer" component={Developer}  />
                <Route path="/admin" component={Admin}  />
                <Route path="/developer-list" component={DeveloperList}  />
                <Route path="/project-list" component={ProjectList}  />
                <Route path="/add-attached" component={AddAttached}  />
                <Route path="/add-detached" component={AddDetached}  />
                <Route path="/developer-data" component={DeveloperData}  />
            </Fragment>
        )
    }
}

export default IndexRoute
