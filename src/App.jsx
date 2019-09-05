import React from 'react'
import {HashRouter as Router, Redirect} from 'react-router-dom'
import {Route, Switch} from 'react-router'
import "antd/dist/antd.css"

import ApiCommon from './common/utils/api/apiCommon'
import LoginCheck from './login/component/LoginCheck'
import LoginPage from './login/component/LoginPage'
import SprintBacklogPageTemplate from './task_management/sprint_backlog/component/SprintBacklogPageTemplate'
import TaskBoardPageTemplate from './task_management/task_board/component/TaskBoardPageTemplate'
import './App.css'

ApiCommon.init()

export default () => (
  <Router>
    <div style={{width: "100%", height: "100vh", padding: "10px"}}>
      <Switch>
        <Route path={'/'} exact={true} render={() => <LoginCheck><Redirect to="/running" /></LoginCheck>}/>
        <Route path={'/login'} exact={true} component={LoginPage}/>
        <Route path={'/running'} exact={true} render={() => <SprintBacklogPageTemplate isClosedView={false}/>} />
        <Route path={'/closed'} exact={true} render={() => <SprintBacklogPageTemplate isClosedView={true}/>} />
        <Route path={'/sprints/:sprintId/task_board'} exact={true}render={(props) => <TaskBoardPageTemplate {...props}/>} />
      </Switch>
    </div>
  </Router>
)
