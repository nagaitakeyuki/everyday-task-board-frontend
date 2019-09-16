import React, { Component } from "react"
import PropTypes from "prop-types"
import { Row, Col, Input, Button } from "antd"

import { Task } from '../../../taskManagementModel'

class TaskForm extends Component {
  constructor(props) {
    super(props)
    const task = props.task
    this.state = {
      name: task.name
    }
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  render() {
    return (
      <div>
        <Col>
          <Row style={{ marginBottom: "10px" }}>
            <div>
              タスクを変更する
            </div>
          </Row>
          <Row>
            <Row>
              タスク名:
            </Row>
            <Row>
              <Input.TextArea
                autoFocus={true}
                value={this.state.name}
                onChange={(e) => this.handleTextChange(e, "name")}
                autosize
              />
            </Row>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <div style={{ float: "right" }}>
              <Button
                type="default"
                onClick={
                  () => {
                    const updatedTask = new Task(
                      this.props.task.id,
                      this.state.name,
                      this.props.task.status,
                      this.props.task.baseStoryId,
                      this.props.task.sortOrder
                    )

                    this.props.onSaveButtonClick({task: updatedTask,
                                                  sprintId: this.props.sprintId })
                  }
                }
              >
                変更する
              </Button>
              <Button
                type="default"
                onClick={
                  () => {
                    if (!window.confirm("タスクを削除しますか？")) return

                    this.props.onDeleteButtonClick({taskId: this.props.task.id,
                                                    storyId: this.props.task.baseStoryId,
                                                    sprintId: this.props.sprintId})
                  }
                }
                style={{marginLeft: "2px"}}
              >
                削除する
              </Button>
            </div>
          </Row>
        </Col>
      </div >
    )
  }

  handleTextChange(e, key) {
    this.setState({ [key]: e.target.value })
  }

}

TaskForm.propTypes = {
  task: PropTypes.object.isRequired,
  sprintId: PropTypes.string.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired
}

export default TaskForm
