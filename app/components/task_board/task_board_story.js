import React, {Fragment} from 'react'

export default ({story}) => (
  <Fragment>
    <td>
      <div style={{width: "100%",  height: "100px", background: "#0099cc", borderRadius: "5px", position: "relative"}}>
        <div style={{ width: "80%" }}>{story.storyName}</div>
        <img src="../resource/plus.png" style={{ position: "absolute", right: "5px", top: "5px" }} />
      </div>
    </td>
  </Fragment>
)
