import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'

import Actions from '../../actions'

ReactModal.setAppElement('#app')

class TaskBoardStoryCell extends Component {

  state = {
    isEditing: false,
    isTaskAdding: false
  }

  render() {

    const {story, dispatch} = this.props

    let tasksEl
    const autofocus = () => {
      tasksEl.focus()
    }
  
    const addTasks = () => {
      const taskNames = tasksEl.value.split("\n")
      dispatch(Actions.addTasks({sprintId: story.baseSprintId, storyId : story.storyId, taskNames}))
      closeTaskAdd()
    }

    const closeTaskAdd = () => {
      this.setState({...this.state, isTaskAdding: false})
    }

    let storyNameEl, storyStatusEl
    const updateStory = () => {
      dispatch(Actions.updateStory({storyId: story.storyId, storyName : storyNameEl.value,
                                     storyStatus: storyStatusEl.value, baseSprintId: story.baseSprintId}))
      closeStoryEdit()
    }

    const closeStoryEdit = () => {
      this.setState({...this.state, isEditing: false})
    }

    return (
      <td>
        <div style={{width: "100%",  height: "80px", background: "#87cefa",
             borderRadius: "5px", position: "relative"}}>
          <div style={{ width: "80%", height: "100%", textDecoration: story.storyStatus === "end" ? "line-through" : "", cursor: "pointer"}}
              onClick={() => this.setState({...this.state, isEditing: true})}>
            {story.storyName}
          </div>
          <img src="../resource/plus.png"
            onClick={() => this.setState({...this.state, isTaskAdding: true})}
            style={{ position: "absolute", right: "5px", top: "5px", cursor: "pointer"}} />
        </div>

        <ReactModal 
          isOpen={this.state.isTaskAdding}
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

        <ReactModal 
          isOpen={this.state.isEditing}
          onRequestClose={closeStoryEdit}
          style={{content: {marginLeft: "auto", marginRight: "auto",  width: "600px", height: "300px"}}}>

          <img src="../resource/cross.png"
              onClick={() => closeStoryEdit()}
              style={{ position: "absolute", right: "10px", top: "10px", cursor: "pointer" }} />

          <p>{story.storyName}</p>
          <div className="form-group">
              <label htmlFor={`storyName-${story.storyId}`}>ストーリー名</label>
              <input type="text" name="storyName" className="form-control"
                defaultValue={story.storyName}
                id={`storyName-${story.storyId}`} ref={el => storyNameEl = el }/>
          </div>
          <div className="form-group">
              <label htmlFor={`storyStatus-${story.storyId}`}>ステータス</label>
              <select name="storyStatus" className="form-control"
                id={`storyStatus-${story.storyId}`} ref={el => storyStatusEl = el } defaultValue={story.storyStatus}>
                <option value="new">新規</option>
                <option value="running">進行中</option>
                <option value="end">完了</option>
              </select>
          </div>
          <div className="form-actions clearfix">
              <button type="button" className="btn btn-secondary float-right" onClick={() => updateStory()}>変更</button>
          </div>

        </ReactModal>
      </td>
    )
  }

}

export default connect()(TaskBoardStoryCell)