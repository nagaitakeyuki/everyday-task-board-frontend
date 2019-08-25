import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'

import Actions from '../task_board_actions'
import TaskForm from './form/TaskForm'
import Modal from '../../../common/component/Modal'


class Task extends Component {

  state = {
    isEditing: false
  }

  render() {
    const {task, sprintId, dispatch} = this.props

    const updateTask = (param) => {
      dispatch(Actions.updateTask(param))
      closeTaskEdit()
    }

    const deleteTask = (param) => {
      dispatch(Actions.deleteTask(param))
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

        <Modal
          visible={this.state.isEditing}
          onCancel={closeTaskEdit}
          footer={null}
          destroyOnClose
          width={500}>
          <TaskForm
            task={task}
            sprintId={sprintId}
            onSaveButtonClick={updateTask}
            onDeleteButtonClick={deleteTask}/>
        </Modal>

      </Fragment>
    )
  }
}

export default connect()(Task)
