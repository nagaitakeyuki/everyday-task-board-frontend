import React, { Component } from "react"
import PropTypes from "prop-types"
import { Row, Col, Input, Button } from "antd"

class TaskAddForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      names: ""
    }
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  render() {
    return (
      <div>
        <Col>
          <Row style={{ marginBottom: "10px" }}>
            <div>
              タスクを追加する
            </div>
          </Row>
          <Row>
            <Row>
              タスク名（１行に１タスク名）:
            </Row>
            <Row>
              <Input.TextArea
                autoFocus={true}
                value={this.state.names}
                onChange={(e) => this.handleTextChange(e, "names")}
                autosize={{minRows: 7}}
              />
            </Row>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Button
              type="default"
              onClick={
                () => {
                  this.props.onSaveButtonClick({sprintId: this.props.sprintId,
                                                storyId: this.props.storyId,
                                                taskNames: this.state.names.split("\n")})
                }
              }
              style={{ float: "right" }}
            >
              追加する
            </Button>
          </Row>
        </Col>
      </div >
    )
  }

  handleTextChange(e, key) {
    this.setState({ [key]: e.target.value })
  }

}

TaskAddForm.propTypes = {
  sprintId: PropTypes.string.isRequired,
  storyId: PropTypes.string.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired
}

export default TaskAddForm
