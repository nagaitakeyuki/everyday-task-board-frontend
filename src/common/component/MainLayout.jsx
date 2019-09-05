import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import LoginCheck from '../../login/component/LoginCheck'
import { statement } from '@babel/template'

const MainLayout = (props) => (
  <Fragment>
    <div>
      <a href="/">
        <img src="imgs/logo.png" />
      </a>
      &nbsp;&nbsp;
      <Link to={'/running'} style={{verticalAlign: "middle"}}>進行中</Link>
      &nbsp;&nbsp;
      <Link to={'/closed'} style={{verticalAlign: "middle"}}>完了分</Link>

      <div style={{float: "right"}}>{props.loginUser.userName}</div>
    </div>

    <LoginCheck>
      {props.children}
    </LoginCheck>
  </Fragment>
)

export default connect(state => ({
  loginUser: state.login
}))(MainLayout)
