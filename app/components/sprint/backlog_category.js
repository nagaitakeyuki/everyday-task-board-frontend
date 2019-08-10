import React from 'react'

import Story from './story'

export default ({backlogCategory}) => (
  <div style={{border: "1px solid lightgray", borderRadius: "5px", margin: "5px", background: "lightgray"}}>
    <div style={{margin: "2px", cursor: "move"}}>
      <img src="../resource/plus.png" style={{cursor: "pointer", verticalAlign: "middle"}}/>
      <span style={{verticalAlign: "middle"}}>{backlogCategory.backlogCategoryName}</span>
    </div>

    {backlogCategory.stories ?
        Array.from(backlogCategory.stories.values()).map(story => (
          <Story story={story} key={story.storyId} />
        ))
        : null}
  </div>
)