import React, {Fragment} from 'react'

import Sprint from "./sprint"

export default ({sprints}) => (
  <div style={{display: "flex", flexDirection: "column", width: "50%" }}>
    <div style={{margin: "8px"}}>
        <img src="../resource/plus.png" style={{cursor: "pointer"}}/>
        <span style={{verticalAlign: "middle"}}>スプリント</span>
    </div>

    {sprints.size > 0 ? (
        <Fragment >
          {
            Array.from(sprints.values()).map(sprint => (
              <Sprint sprint={sprint} key={sprint.sprintId}/>
            ))
          }
        </Fragment>
      ) : null}
  </div>
)