import React, { Component } from "react"
import PropTypes from "prop-types"
import { Row, Col, Input, Button } from "antd"

class SignInForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      userName: "",
      password: ""
    }
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  render() {
    return (
      <div style={{marginTop: "40px"}}>
        <Col>
          <Row>
            <Row>
              メールアドレス：
            </Row>
            <Row>
              <Input
                autoFocus={true}
                onChange={(e) => this.handleTextChange(e, "email")}
              />
            </Row>
          </Row>
          <Row style={{marginTop: "20px"}}>
            <Row>
              名前：
            </Row>
            <Row>
              <Input
                onChange={(e) => this.handleTextChange(e, "userName")}
              />
            </Row>
          </Row>
          <Row style={{marginTop: "20px"}}>
            <Row>
              パスワード：
            </Row>
            <Row>
              <Input
                type="password"
                onChange={(e) => this.handleTextChange(e, "password")}
              />
            </Row>
          </Row>
          <Row style={{ marginTop: "30px" }}>
            <Button
              type="default"
              onClick={
                () => {
                  this.props.onSignInButtonClick({email: this.state.email,
                                                  userName: this.state.userName,
                                                  pass: this.state.password})
                }
              }
              style={{ float: "right" }}
            >
              サインイン（会員登録）
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

SignInForm.propTypes = {
  onSignInButtonClick: PropTypes.func.isRequired
}

export default SignInForm
