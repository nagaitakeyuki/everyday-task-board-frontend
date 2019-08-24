import React from 'react'
import {Route, Switch} from 'react-router'

import Backlog from '../sprint_backlog/component/index'
import TaskBoard from '../task_board/component/task_board'

export default () => (
  <Switch>
    <Route path={'/'} component={Backlog} exact={true} />
    <Route path={'/sprints/:sprintId/task_board'} component={TaskBoard} exact={true} />
  </Switch>
)
