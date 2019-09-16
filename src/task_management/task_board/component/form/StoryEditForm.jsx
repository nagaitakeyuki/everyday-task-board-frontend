import React, { Component } from "react"
import PropTypes from "prop-types"
import { Row, Col, Input, Button, Select } from "antd"

import { Story } from '../../../taskManagementModel'

class StoryEditForm extends Component {
  constructor(props) {
    super(props)
    const story = props.story
    this.state = {
      name: story.name,
      status: story.status
    }
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  render() {
    return (
      <div>
        <Col>
          <Row style={{ marginBottom: "10px" }}>
            <div>
              ストーリーを変更する
            </div>
          </Row>

          <Row>
            <Row>
              ストーリー名:
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
            <Row>
              ステータス:
            </Row>
            <Row>
              <Select
                onChange={(value) => this.handleSelectChange(value, "status")}
                value={`${this.state.status}`}
                dropdownMatchSelectWidth={false}
              >
                <Select.Option key={"new"}>新規</Select.Option>
                <Select.Option key={"running"}>進行中</Select.Option>
                <Select.Option key={"end"}>完了</Select.Option>
              </Select>
            </Row>
          </Row>

          <Row style={{ marginTop: "10px" }}>
            <Button
              type="default"
              onClick={
                () => {
                  const updatedStory = new Story(
                    this.props.story.id,
                    this.state.name,
                    this.state.status,
                    this.props.story.baseSprintId
                  )

                  this.props.onSaveButtonClick(updatedStory)
                }
              }
              style={{ float: "right" }}
            >
              変更する
            </Button>
          </Row>
        </Col>
      </div >
    )
  }

  handleTextChange(e, key) {
    this.setState({ [key]: e.target.value })
  }

  handleSelectChange(value, key) {
    this.setState({ [key]: value })
  }

}

StoryEditForm.propTypes = {
  story: PropTypes.object.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired
}

export default StoryEditForm
