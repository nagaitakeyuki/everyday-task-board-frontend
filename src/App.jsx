import React, {Fragment} from 'react'
import {Link, HashRouter as Router} from 'react-router-dom'
import Routes from './common/routes'
import "antd/dist/antd.css"

export default () => (
  <Router>
    <Fragment>
      <div className="container-fluid" style={{ marginTop: "10px" }}>
        <Link to={'/'}>Top</Link>
        <Routes />
      </div>
    </Fragment>
  </Router>
)
