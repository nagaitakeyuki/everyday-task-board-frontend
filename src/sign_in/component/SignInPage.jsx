import React, { Component } from 'react'
import {connect} from 'react-redux'

import Actions from '../signInActions'
import SignInForm from './SignInForm'


class SignInPage extends Component {

  render() {
    return (
      <div style={{margin: "20px auto 0", width: "350px"}}>
        <h2>Everyday Task Board へようこそ！</h2>
        <p>新規登録（無料）をして、利用を開始しましょう。</p>
        <SignInForm onSignInButtonClick={this.signIn} />
      </div>
    )
  }

  signIn = (param) => {
    this.props.dispatch(Actions.signIn(param))
  }

}

export default connect()(SignInPage)