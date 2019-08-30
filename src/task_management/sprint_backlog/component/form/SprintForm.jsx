import React, { Component } from "react"
import PropTypes from "prop-types"
import { Row, Col, Input, Button, DatePicker } from "antd"
import moment from 'moment'

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
      name: sprint ? sprint.sprintName : "",
      startDate: sprint ? sprint.startDate : "",
      endDate: sprint ? sprint.endDate : ""
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
          <Row style={{ marginTop: "10px" }}>
            <Button
              type="default"
              onClick={
                () => {
                  this.props.onSaveButtonClick({sprintId: this.props.sprint ? this.props.sprint.sprintId : null,
                                                sprintName: this.state.name,
                                                startDate: this.state.startDate,
                                                endDate: this.state.endDate})
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
}

SprintForm.propTypes = {
  mode: PropTypes.string.isRequired,
  sprint: PropTypes.object,
  onSaveButtonClick: PropTypes.func.isRequired
}

export default SprintForm
