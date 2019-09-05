import React, { Component } from 'react'
import {connect} from 'react-redux'

import Actions from '../loginActions'
import LoginForm from './LoginForm'


class LoginPage extends Component {

  render() {
    return (
        <div style={{margin: "20px auto 0", width: "350px"}}>
          <h2>Everyday Task Board　ログイン</h2>
          <LoginForm onLoginButtonClick={this.login} />
        </div>
    )
  }

  login = (param) => {
    this.props.dispatch(Actions.login(param))
  }

}

export default connect()(LoginPage)