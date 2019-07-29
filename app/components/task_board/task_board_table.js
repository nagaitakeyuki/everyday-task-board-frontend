import React, { Fragment } from 'react'

import { DragDropContext } from 'react-beautiful-dnd'

import Actions from '../../actions'
import TaskBoardStoryRow from './task_board_story_row'
import { connect } from 'react-redux';

export default connect()(({ stories, dispatch }) => {

  const onDragEnd = result => {
    const { destination, source, draggableId } = result

    if (!destination
      || (destination.droppableId === source.droppableId && destination.index === source.index)) return
    
    const isStatusChanged = destination.droppableId !== source.droppableId
    if (isStatusChanged) {
      const [sprintId, storyId, newStatus] = destination.droppableId.split("#")
  
      dispatch(Actions.changeTaskStatus(
        { sprintId, storyId, taskId: draggableId, newStatus, newIndex: destination.index }))
    }

    const isSortOrderChanged = destination.index !== source.index
    if (isSortOrderChanged) {
      const [sprintId, storyId] = destination.droppableId.split("#")

      dispatch(Actions.changeSortOrder(
        { sprintId, storyId, taskId: draggableId, newIndex: destination.index }))
    }
  }

  return (
    <Fragment>
      <table className="table table-bordered" style={{ marginTop: "10px" }}>
        <thead className="thead-light">
          <tr>
            <th style={{ width: "20%" }}>ストーリー</th>
            <th style={{ width: "25%" }}>タスク</th>
            <th style={{ width: "27%" }}>進行中</th>
            <th style={{ width: "28%" }}>完了</th>
          </tr>
        </thead>
        <tbody>
          <DragDropContext onDragEnd={onDragEnd}>
            {stories ?
              Array.from(stories.values()).map(story => (
                <TaskBoardStoryRow story={story} key={story.storyId} />
              ))
              : null}
          </DragDropContext>
        </tbody>
      </table>
    </Fragment>
  )
})
