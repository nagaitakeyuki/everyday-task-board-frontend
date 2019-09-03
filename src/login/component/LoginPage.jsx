import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom"

import Actions from '../loginActions'
import LoginForm from './LoginForm'


class LoginPage extends Component {

  render() {
    return (
      <Fragment>
        {this.props.isLogined ? 
          <Redirect to="/init" />
        :
          <div style={{marginTop: "10px", display: "flex"}}>
            <LoginForm onLoginButtonClick={this.login} />
          </div>
        }
      </Fragment>
    )
  }

  login = (param) => {
    this.props.dispatch(Actions.login(param))
  }

}

export default connect(state => {
  return {
    isLogined: state.login.jwt !== undefined
  }
})(LoginPage)