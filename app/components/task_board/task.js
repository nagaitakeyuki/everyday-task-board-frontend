import React, { Fragment } from 'react'

import { Draggable } from 'react-beautiful-dnd'

export default ({ task }) =>
  (
    <Draggable
      draggableId={task.taskId} index={task.sortOrder}>
      
      {provided => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div style={{ width: "100px", height: "100px", background: "#87cefa", borderRadius: "5px",
            marginRight: "5px", marginBottom: "5px", cursor: 'move', wordWrap: "break-word" }}>
            {task.taskName}
          </div>
          
        </div>
      )}

    </Draggable>
  )
