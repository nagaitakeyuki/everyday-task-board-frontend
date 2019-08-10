import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'

import Actions from '../../actions'

ReactModal.setAppElement('#app')

export default connect(state => (
  {taskAddOpening: state.screen.taskAddOpening}
))(({story, dispatch, taskAddOpening}) => {

  const openTaskAdd = () => {
    dispatch(Actions.openTaskAdd({sprintId: story.baseSprintId, storyId : story.storyId}))
  }

  const closeTaskAdd = () => {
    dispatch(Actions.closeTaskAdd())
  }

  let tasksEl

  const autofocus = () => {
    tasksEl.focus()
  }

  const addTasks = () => {
    const taskNames = tasksEl.value.split("\n")
    dispatch(Actions.addTasks({sprintId: story.baseSprintId, storyId : story.storyId, taskNames}))
    closeTaskAdd()
  }


  return (
    <Fragment>
      <td>
        <div style={{width: "100%",  height: "100px", background: "#0099cc", borderRadius: "5px", position: "relative"}}>
          <div style={{ width: "80%" }}>{story.storyName}</div>
          <img src="../resource/plus.png"
            onClick={() => openTaskAdd()}
            style={{ position: "absolute", right: "5px", top: "5px", cursor: "pointer" }} />

          <ReactModal 
            isOpen={taskAddOpening.sprintId === story.baseSprintId
               && taskAddOpening.storyId === story.storyId}
            onAfterOpen={autofocus}
            onRequestClose={closeTaskAdd}
            style={{content: {marginLeft: "auto", marginRight: "auto",  width: "600px", height: "400px"}}}>

            <img src="../resource/cross.png"
                        onClick={() => closeTaskAdd()}
                        style={{ position: "absolute", right: "10px", top: "10px", cursor: "pointer" }} />

            <p>{story.storyName} </p>
              <div className="form-group">
                  <textarea name="tasks" rows="10" className="form-control" ref={el => tasksEl = el }/>
              </div>
              <div className="form-actions clearfix">
                  <button type="button" className="btn btn-secondary float-right" onClick={() => addTasks()}>登録</button>
              </div>

          </ReactModal>

        </div>
      </td>
    </Fragment>
  )
})
