import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Input, Button } from 'antd'

import { Story } from '../../../taskManagementModel'

class StoryForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ""
    }
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  render() {
    return (
      <div>
        <Col>
          <Row style={{ marginBottom: "10px" }}>
            <div>
              ストーリーを追加する
            </div>
          </Row>
          <Row>
            <Row>
              名前:
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
            <Button
              type="default"
              onClick={
                () => {
                  const story = new Story (
                    null,
                    this.state.name,
                    null,
                    this.props.sprintId,
                    this.props.backlogCategoryId,
                    null,
                    null
                  )

                  this.props.onSaveButtonClick(story)
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

StoryForm.propTypes = {
  sprintId: PropTypes.string,
  backlogCategoryId: PropTypes.string,
  onSaveButtonClick: PropTypes.func.isRequired
}

export default StoryForm
