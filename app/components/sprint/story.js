import React from 'react'

export default ({story}) => (
  <div style={{border: "1px solid whitesmoke", borderRadius: "5px", margin: "3px", background: "whitesmoke", cursor: "move"}}>
    {story.storyName}
  </div>
)