import React, { Fragment } from 'react'

import TaskBoardStoryCell from './task_board_story'
import TaskStatusCell from './task_status_cell'

export default ({ story }) =>
  (
    <Fragment>
      <tr>
        <TaskBoardStoryCell story={story} />
        <TaskStatusCell statusOfCell="new" story={story} />
        <TaskStatusCell statusOfCell="running" story={story} />
        <TaskStatusCell statusOfCell="end" story={story} />
      </tr>
    </Fragment>
  )