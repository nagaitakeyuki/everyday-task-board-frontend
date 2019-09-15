import React, { Component } from "react"
import PropTypes from "prop-types"
import { Row, Col, Input, Button } from "antd"

import { BacklogCategory } from "../../../taskManagementModel"

class BacklogCategoryForm extends Component {
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
              バックログカテゴリーを追加する
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
                  const backlogCategory = new BacklogCategory(
                    null,
                    this.state.name
                  )
                  this.props.onSaveButtonClick(backlogCategory)
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

BacklogCategoryForm.propTypes = {
  onSaveButtonClick: PropTypes.func.isRequired
}

export default BacklogCategoryForm
