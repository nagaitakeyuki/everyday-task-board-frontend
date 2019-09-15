import React, { Component } from "react"
import PropTypes from "prop-types"
import { Row, Col, Input, Button, DatePicker, Select } from "antd"
import moment from 'moment'

import { Sprint } from '../../../taskManagementModel'

const dateFormat = 'YYYY/MM/DD'

class SprintForm extends Component {
  static Mode = {
    New: "New",
    Edit: "Edit"
  }

  constructor(props) {
    super(props)
    const {sprint} = props
    this.state = {
      name: sprint ? sprint.name : "",
      startDate: sprint ? sprint.startDate : "",
      endDate: sprint ? sprint.endDate : "",
      status: sprint ? sprint.status : undefined
    }
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  render() {
    return (
      <div>
        <Col>
          <Row style={{ marginBottom: "10px" }}>
            <div>
              {this.props.mode === SprintForm.Mode.New ? "新しいスプリント" : ""}
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
          <Row>
            <Row>
              期間:
            </Row>
            <Row>
              <DatePicker.RangePicker
                value={this.state.startDate && this.state.endDate
                        ? [moment(this.state.startDate, "YYYYMMDD"), moment(this.state.endDate, "YYYYMMDD")]
                        : [null, null]}
                format={dateFormat}
                placeholder=""
                style={{width: "100%"}}
                onChange={(date, dateString) => this.handleDateRangeChange(date, ["startDate", "endDate"])}
              />
            </Row>
          </Row>

          {this.props.mode === SprintForm.Mode.Edit ?
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
           : null}

          <Row style={{ marginTop: "10px" }}>
            <Button
              type="default"
              onClick={
                () => {
                  const sprint = new Sprint(
                    this.props.sprint ? this.props.sprint.id : null,
                    this.state.name,
                    this.state.status,
                    this.state.startDate,
                    this.state.endDate,
                  )

                  this.props.onSaveButtonClick(sprint)
                }
              }
              style={{ float: "right" }}
            >
              {this.props.mode === SprintForm.Mode.New ? "追加する" : "変更する"}
            </Button>
          </Row>
        </Col>
      </div >
    )
  }

  handleTextChange(e, key) {
    this.setState({ [key]: e.target.value })
  }

  handleDateRangeChange(date, keys) {
    this.setState({ [keys[0]]: date[0].format("YYYYMMDD"), [keys[1]]: date[1].format("YYYYMMDD")})
  }

  handleSelectChange(value, key) {
    this.setState({ [key]: value })
  }
  
}

SprintForm.propTypes = {
  mode: PropTypes.string.isRequired,
  sprint: PropTypes.object,
  onSaveButtonClick: PropTypes.func.isRequired
}

export default SprintForm
