import React from 'react'

import Story from "./story"

export default ({sprint}) => (
  <div style={{border: "1px solid lightgray", borderRadius: "5px", margin: "5px", background: "lightgray"}}>
    <div style={{position: "relative", margin: "2px", cursor: "move"}}>
      <img src="../resource/plus.png" style={{cursor: "pointer", verticalAlign: "middle"}}/>
      <span style={{verticalAlign: "middle"}}>{sprint.sprintName}</span>
      <span style={{position: "absolute", right: "5px"}}>2019/7/14 〜 2019/7/28</span>
    </div>

    {sprint.stories ?
        Array.from(sprint.stories.values()).map(story => (
          <Story story={story} key={story.storyId} />
        ))
        : null}

  </div>
)