import React, { Component } from 'react'
import {connect} from 'react-redux'

import Actions from '../loginActions'
import LoginForm from './LoginForm'


class LoginPage extends Component {

  render() {
    return (
        <div style={{marginTop: "10px", margin: "0 auto", width: "300px"}}>
          <LoginForm onLoginButtonClick={this.login} />
        </div>
    )
  }

  login = (param) => {
    this.props.dispatch(Actions.login(param))
  }

}

export default connect()(LoginPage)