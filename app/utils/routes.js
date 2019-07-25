import React from 'react'
import {Route, Switch} from 'react-router'

import Home from '../components/home'
import SprintList from '../components/sprint/list'
import TaskBoard from '../components/task_board/task_board'

export default () => (
  <Switch>
    <Route path={'/'} component={Home} exact={true} />
    <Route path={'/sprints'} component={SprintList} exact={true} />
    <Route path={'/sprints/:sprintId/task_board'} component={TaskBoard} exact={true} />
  </Switch>
)
