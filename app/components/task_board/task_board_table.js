import React, { Fragment } from 'react'

import { DragDropContext } from 'react-beautiful-dnd'

import Actions from '../../actions'
import TaskBoardStoryRow from './task_board_story_row'
import { connect } from 'react-redux';

export default connect()(({ stories, dispatch }) => {

  const onDragEnd = result => {
    const { destination, source, draggableId } = result

    const isUnvalidDrop = !destination ||
                         (destination.droppableId === source.droppableId
                           && destination.index === source.index)

    if (isUnvalidDrop) return
    
    const isStatusChanged = destination.droppableId !== source.droppableId
    if (isStatusChanged) {
      const [sprintId, storyId, newStatus] = destination.droppableId.split("#")
  
      dispatch(Actions.changeTaskStatus({ sprintId,
                                          storyId,
                                          taskId: draggableId,
                                          newStatus,
                                          newIndex: destination.index }))
      
      return
    }

    const isSortOrderChanged = destination.index !== source.index
    if (isSortOrderChanged) {
      const [sprintId, storyId] = destination.droppableId.split("#")

      dispatch(Actions.changeSortOrder({ sprintId,
                                         storyId,
                                         taskId: draggableId,
                                         newIndex: destination.index }))

      return
    }
  }

  return (
    <Fragment>
      <table className="table table-bordered" style={{ marginTop: "10px" }}>
        <thead className="thead-light">
          <tr>
            <th style={{ width: "13%" }}>ストーリー</th>
            <th style={{ width: "29%" }}>タスク</th>
            <th style={{ width: "29%" }}>進行中</th>
            <th style={{ width: "29%" }}>完了</th>
          </tr>
        </thead>
        <tbody>
          <DragDropContext onDragEnd={onDragEnd}>
            {stories ?
              Array.from(stories.values())
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map(story => (
                  <TaskBoardStoryRow story={story} key={story.storyId} />
                ))
              : null}
          </DragDropContext>
        </tbody>
      </table>
    </Fragment>
  )
})
