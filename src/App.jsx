import React, {Fragment} from 'react'
import {Link, HashRouter as Router, Redirect} from 'react-router-dom'
import {Route, Switch} from 'react-router'
import "antd/dist/antd.css"

import ApiCommon from './common/utils/api/apiCommon'
import LoginCheck from './login/component/LoginCheck'
import SprintBacklogPage from './task_management/sprint_backlog/component/SprintBacklogPage'
import TaskBoardPage from './task_management/task_board/component/TaskBoardPage'
import './App.css'

ApiCommon.init()

export default () => (
  <Router>
    <div style={{width: "100%", height: "100vh", padding: "10px"}}>
      <div>
        <a href="/">
          <img src="imgs/logo.png" />
        </a>
        &nbsp;&nbsp;
        <Link to={'/running'} style={{verticalAlign: "middle"}}>進行中</Link>
        &nbsp;&nbsp;
        <Link to={'/closed'} style={{verticalAlign: "middle"}}>完了分</Link>
      </div>
      <Switch>
        <Route path={'/'} exact={true}
          render={() => <LoginCheck><Redirect to="/running" /></LoginCheck>}/>
        <Route path={'/running'} exact={true} 
          render={() => <LoginCheck><SprintBacklogPage isClosedView={false}/></LoginCheck>} />
        <Route path={'/closed'} exact={true}
          render={() => <LoginCheck><SprintBacklogPage isClosedView={true}/></LoginCheck>}/>
        <Route path={'/sprints/:sprintId/task_board'} exact={true}
          render={(props) => <LoginCheck><TaskBoardPage {...props}/></LoginCheck>}/>
      </Switch>
    </div>
  </Router>
)
