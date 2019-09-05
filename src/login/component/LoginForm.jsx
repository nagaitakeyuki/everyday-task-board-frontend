import React, { Component } from "react"
import PropTypes from "prop-types"
import { Row, Col, Input, Button } from "antd"

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  render() {
    return (
      <div>
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
                  this.props.onLoginButtonClick({email: this.state.email,
                                                  pass: this.state.password})
                }
              }
              style={{ float: "right" }}
            >
              ログイン
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

LoginForm.propTypes = {
  onLoginButtonClick: PropTypes.func.isRequired
}

export default LoginForm
