import React, { Component } from 'react'
import {connect} from 'react-redux'

import Actions from '../signInActions'
import SignInForm from './SignInForm'


class SignInPage extends Component {

  render() {
    return (
      <div style={{margin: "20px auto 0", width: "350px"}}>
        <h2>サインイン（会員登録）</h2>
        <SignInForm onSignInButtonClick={this.signIn} />
      </div>
    )
  }

  signIn = (param) => {
    this.props.dispatch(Actions.signIn(param))
  }

}

export default connect()(SignInPage)