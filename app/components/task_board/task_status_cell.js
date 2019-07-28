import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { Droppable } from 'react-beautiful-dnd'

import Task from './task'


export default connect()(({ statusOfCell, story }) =>
  (
    <Fragment> 
      <Droppable
        droppableId={story.baseSprintId + "#" + story.storyId + "#" + statusOfCell}>
        
        {provided => (
          <td
            ref={provided.innerRef}
            {...provided.droppableProps}>
              {story.tasks ?
                Array.from(story.tasks.values())
                  .filter(task => task.taskStatus === statusOfCell)
                .map((task, index) => (<div key={task.taskId + task.taskStatus}><Task task={task} index={index} status={statusOfCell} /></div>))
                : null
              }
            {provided.placeholder}
          </td>
        )}
        
      </Droppable>
    </Fragment>
  )
)
