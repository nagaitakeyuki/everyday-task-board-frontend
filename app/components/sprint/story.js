import React from 'react'
import { Draggable } from 'react-beautiful-dnd'


export default ({story}) => (
  <Draggable
    draggableId={story.storyId} index={story.sortOrder}>
  
    {provided => (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        <div style={{border: "1px solid whitesmoke", borderRadius: "5px", margin: "3px", background: "whitesmoke", cursor: "move"}}>
          {story.storyName}
        </div>
      </div>
    )}

  </Draggable>



)