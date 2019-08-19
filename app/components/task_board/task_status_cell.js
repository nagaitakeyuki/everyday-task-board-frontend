import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { Droppable } from 'react-beautiful-dnd'

import Task from './task'


export default connect()(({ statusOfCell, story }) =>
  (
    <Fragment> 
      <Droppable
        droppableId={story.baseSprintId + "#" + story.storyId + "#" + statusOfCell}
        direction="horizontal">
        
        {provided => (
          <td 
            ref={provided.innerRef}
            {...provided.droppableProps}>
              {story.tasks ?
              <div style={{display: "flex", flexWrap: "wrap"}}>
                {Array.from(story.tasks.values())
                  .filter(task => task.taskStatus === statusOfCell)
                  .sort((a, b) => a.sortOrder - b.sortOrder)
                  .map(task => (
                        <Task task={task} status={statusOfCell}
                          sprintId={story.baseSprintId} key={task.taskId + task.taskStatus}/>
                      ))}
              </div>
                : null
              }
            {provided.placeholder}
          </td>
        )}
        
      </Droppable>
    </Fragment>
  )
)
