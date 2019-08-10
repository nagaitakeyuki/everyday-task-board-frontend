import React, {Fragment} from 'react'
import {Link, HashRouter as Router} from 'react-router-dom'

import Routes from './utils/routes'

export default () => (
  <Router>
    <Fragment>
      <div className="container" style={{ marginTop: "10px" }}>
        <Link to={'/backlog'}>バックログ</Link>/
        <Link to={'/sprints'}>スプリント一覧</Link>/
        <Routes />
      </div>
    </Fragment>
  </Router>
)
