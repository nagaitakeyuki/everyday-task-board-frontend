import React, {Fragment} from 'react'
import {Link, HashRouter as Router} from 'react-router-dom'
import {Route, Switch} from 'react-router'
import "antd/dist/antd.css"

import SprintBacklogPage from './task_management/sprint_backlog/component/SprintBacklogPage'
import TaskBoardPage from './task_management/task_board/component/TaskBoardPage'

export default () => (
  <Router>
    <Fragment>
      <div className="container-fluid" style={{ marginTop: "10px" }}>
        <Link to={'/'}>Top</Link>
        <Switch>
          <Route path={'/'} component={SprintBacklogPage} exact={true} />
          <Route path={'/sprints/:sprintId/task_board'} component={TaskBoardPage} exact={true} />
        </Switch>
      </div>
    </Fragment>
  </Router>
)