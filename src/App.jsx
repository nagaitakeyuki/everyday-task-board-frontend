import React, {Fragment} from 'react'
import {Link, HashRouter as Router} from 'react-router-dom'
import {Route, Switch} from 'react-router'
import "antd/dist/antd.css"

import InitalLoadPage from './entire_load/InitalLoadPage'
import SprintBacklogPage from './task_management/sprint_backlog/component/SprintBacklogPage'
import TaskBoardPage from './task_management/task_board/component/TaskBoardPage'
import './App.css'

export default () => (
  <Router>
    <div style={{width: "100%", height: "100vh", padding: "10px"}}>
      <a href="/">
        <img src="imgs/logo.png" />
      </a>
      &nbsp;&nbsp;
      <Link to={'/running'}>進行中</Link>
      &nbsp;&nbsp;
      <Link to={'/closed'}>完了分</Link>
      <Switch>
        <Route path={'/'} component={InitalLoadPage} exact={true} />
        <Route path={'/running'} render={() => <SprintBacklogPage isClosedView={false}/>} exact={true} />
        <Route path={'/closed'} render={() => <SprintBacklogPage isClosedView={true}/>} exact={true} />
        <Route path={'/sprints/:sprintId/task_board'} component={TaskBoardPage} exact={true} />
      </Switch>
    </div>
  </Router>
)
