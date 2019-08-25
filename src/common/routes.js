import React from 'react'
import {Route, Switch} from 'react-router'

import SprintBacklogPage from '../task_management/sprint_backlog/component/SprintBacklogPage'
import TaskBoardPage from '../task_management/task_board/component/TaskBoardPage'

export default () => (
  <Switch>
    <Route path={'/'} component={SprintBacklogPage} exact={true} />
    <Route path={'/sprints/:sprintId/task_board'} component={TaskBoardPage} exact={true} />
  </Switch>
)
