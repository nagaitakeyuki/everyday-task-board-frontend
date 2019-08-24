import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'

import { Draggable } from 'react-beautiful-dnd'

import Actions from '../../actions'

class Task extends Component {

  state = {
    isEditing: false
  }

  render() {
    const {task, sprintId, dispatch} = this.props

    let taskNameEl
    const updateTask = () => {
      dispatch(Actions.updateTask({taskId: task.taskId, taskName: taskNameEl.value,
                                    storyId: task.baseStoryId, sprintId }))
      closeTaskEdit()
    }

    const deleteTask = () => {
      const doDelete = window.confirm("タスクを削除しますか？")

      if (doDelete) dispatch(Actions.deleteTask({taskId: task.taskId, storyId: task.baseStoryId, sprintId}))
    }

    const closeTaskEdit = () => {
      this.setState({...this.state, isEditing: false})
    }

    return (
      <Fragment>
        <Draggable
          draggableId={task.taskId} index={task.sortOrder}>
          
          {provided => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <div style={{ width: "80px", height: "80px", background: "#87cefa", borderRadius: "5px",
                marginRight: "3px", marginBottom: "3px", cursor: 'move', wordWrap: "break-word",
                textDecoration: task.taskStatus === "end" ? "line-through" : "" }}
                onClick={() => this.setState({...this.state, isEditing: true})}>
                {task.taskName}
              </div>
              
            </div>
          )}

        </Draggable>

        <ReactModal 
            isOpen={this.state.isEditing}
            onRequestClose={closeTaskEdit}
            style={{content: {marginLeft: "auto", marginRight: "auto",  width: "600px", height: "170px"}}}>

            <img src="imgs/cross.png"
                onClick={() => closeTaskEdit()}
                style={{ position: "absolute", right: "10px", top: "10px", cursor: "pointer" }} />

            <div className="form-group">
                <label htmlFor={`taskName-${task.taskId}`}>タスク名</label>
                <input type="text" name="taskName" className="form-control"
                  defaultValue={task.taskName}
                  id={`taskName-${task.taskId}`} ref={el => taskNameEl = el }/>
            </div>
            <div className="form-actions clearfix">
                <button type="button" className="btn btn-secondary float-right ml-1" onClick={() => deleteTask()}>削除</button>
                <button type="button" className="btn btn-secondary float-right" onClick={() => updateTask()}>変更</button>
            </div>

          </ReactModal>
      </Fragment>
    )
  }
}

export default connect()(Task)
