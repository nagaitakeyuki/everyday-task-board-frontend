import React, { Component } from "react"
import PropTypes from "prop-types"
import { Form, Input, Button, DatePicker, Select } from "antd"
import moment from 'moment'

import { Sprint } from '../../../taskManagementModel'

const dateFormat = 'YYYY/MM/DD'

class SprintForm extends Component {
  static Mode = {
    New: "New",
    Edit: "Edit"
  }

  state = {
    isStartDateTouched: false,
    isEndDateTouched: false
  }

  componentDidMount() {
    // 描画時にサブミットボタンを非活性にする
    this.props.form.validateFields()
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form

    // componentDidMountでvalidateFieldsしても、エラーメッセージが表示されないようにする
    const sprintNameError = isFieldTouched('sprintName') && getFieldError('sprintName')
    const sprintStatusError = isFieldTouched('sprintStatus') && getFieldError('sprintStatus')
    // DatePickerの場合はフォーカスインしてもisFieldTouchedがtrueにならないため、独自に状態を管理する
    const sprintStartDateError = this.state.isStartDateTouched && getFieldError('sprintStartDate')
    const sprintEndDateError = this.state.isEndDateTouched && getFieldError('sprintEndDate')

    return (
      <Form labelCol={{span: 7}} wrapperCol={{span: 15 }}  onSubmit={this.handleSubmit} >
        <div style={{ marginBottom: "10px" }}>
          {this.props.mode === SprintForm.Mode.New ? "新しいスプリント" : "スプリントの変更"}
        </div>

        <Form.Item
          label="スプリント名" style={{marginBottom: 0}}
          validateStatus={sprintNameError ? 'error' : ''} help={sprintNameError || ''}>
          {
            getFieldDecorator('sprintName', {
              initialValue: this.props.sprint ? this.props.sprint.name : null,
              rules: [
                { required: true, message: '入力してください' },
                { max: 10, message: '10文字以下で入力してください' }
              ],
              validateTrigger: [ "onBlur", "onChange" ]
            })(
                <Input />
              )
          }
        </Form.Item> 

        <Form.Item label="期間" style={{marginBottom: 0}} required>

          <Form.Item
            style={{ display: 'inline-block', width: 'calc(50% - 12px)', marginBottom: 0}}
            validateStatus={sprintStartDateError ? 'error' : ''} help={sprintStartDateError || ''}>
            {
              getFieldDecorator('sprintStartDate', {
                initialValue:
                  this.props.sprint && this.props.sprint.startDate
                    ? moment(this.props.sprint.startDate, "YYYYMMDD")
                    : null,
                rules: [
                  { type: 'date', required: true, message: '入力してください' }
                ]
    
              })(
                  <DatePicker
                    format={dateFormat}
                    placeholder="日付を選択"
                    onBlur={() => this.setState({isStartDateTouched: true})} />
                )
            }
          </Form.Item>

          <span style={{ display: 'inline-block', width: '24px', textAlign: 'center', marginBottom: 0}}>-</span>
  
          <Form.Item
            style={{ display: 'inline-block', width: 'calc(50% - 12px)', marginBottom: 0}}
            validateStatus={sprintEndDateError ? 'error' : ''} help={sprintEndDateError || ''}>
            {
              getFieldDecorator('sprintEndDate', {
                initialValue:
                  this.props.sprint && this.props.sprint.endDate
                    ? moment(this.props.sprint.endDate, "YYYYMMDD")
                    : null,
                rules: [
                  { validator: async (rule, value) => {
                      if (!value) {
                        throw new Error("入力してください")
                      }
                      const sprintStartDate = this.props.form.getFieldValue("sprintStartDate")
                      if (value && sprintStartDate && !value.isAfter(sprintStartDate)) {
                        throw new Error("開始日より後の日を指定してください")
                      }
                  }}
                ]
              })(
                  <DatePicker
                    format={dateFormat}
                    placeholder="日付を選択"
                    onBlur={() => this.setState({isEndDateTouched: true})} />
                )
            }
          </Form.Item>

        </Form.Item>          

        <Form.Item
          label="ステータス" style={{marginBottom: 0}}
          validateStatus={sprintStatusError ? 'error' : ''} help={sprintStatusError || ''}>
          {
            getFieldDecorator('sprintStatus', {
              initialValue: this.props.sprint ? this.props.sprint.status : null,
              rules: [{ required: true, message: '入力してください' }],
              validateTrigger: [ "onBlur", "onChange" ]
            })(
                <Select dropdownMatchSelectWidth={false}>
                  <Select.Option key={"new"}>新規</Select.Option>
                  <Select.Option key={"running"}>進行中</Select.Option>
                  <Select.Option key={"end"}>完了</Select.Option>
                </Select>
              )
          }
        </Form.Item>          

        <Form.Item wrapperCol={{span: 22}} style={{marginTop: "10px", marginBottom: 0}}>
          <Button
            type="default"
            htmlType="submit"
            style={{float: "right"}}
            disabled={this.hasErrors(getFieldsError())}>
            {this.props.mode === SprintForm.Mode.New ? "追加する" : "変更する"}
          </Button>
        </Form.Item>

      </Form >
    )
  }

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  handleSubmit = event => {
    event.preventDefault()

    const values = this.props.form.getFieldsValue()

    const sprint = new Sprint(
      this.props.sprint ? this.props.sprint.id: null,
      values.sprintName,
      values.sprintStatus,
      values.sprintStartDate.format("YYYYMMDD"),
      values.sprintEndDate.format("YYYYMMDD"),
    )

    this.props.onSaveButtonClick(sprint)

  }
  
}

SprintForm.propTypes = {
  mode: PropTypes.string.isRequired,
  sprint: PropTypes.object,
  onSaveButtonClick: PropTypes.func.isRequired
}

export default Form.create({})(SprintForm)
