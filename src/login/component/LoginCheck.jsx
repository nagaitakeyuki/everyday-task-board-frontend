import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'

import Spin from '../../common/component/Spin'
import Actions from '../loginActions'
import LoginPage from './LoginPage'

class LoginCheck extends Component {

  componentDidMount() {
    if (this.props.isLoggedIn === undefined) {
      this.props.dispatch(Actions.getLoginUser())
    }
  }

  render() {
    return (
      <Fragment>
        {this.props.isLoggedIn === undefined
          ?
            <Spin />
          :
            this.props.isLoggedIn
              ?
                <Fragment>
                  {this.props.children}
                </Fragment>
              :
                <LoginPage />
        }
      </Fragment>
    )
  }
}

export default connect(state => ({
    isLoggedIn: state.login.isLoggedIn
  }))(LoginCheck)