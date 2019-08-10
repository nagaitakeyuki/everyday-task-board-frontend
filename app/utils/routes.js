import React from 'react'
import {Route, Switch} from 'react-router'

import Home from '../components/home'
import Backlog from '../components/sprint/index'
import TaskBoard from '../components/task_board/task_board'

export default () => (
  <Switch>
    <Route path={'/'} component={Home} exact={true} />
    <Route path={'/backlog'} component={Backlog} exact={true} />
    <Route path={'/sprints/:sprintId/task_board'} component={TaskBoard} exact={true} />
  </Switch>
)
