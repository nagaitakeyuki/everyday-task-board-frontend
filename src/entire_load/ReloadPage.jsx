import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"
import { Spin } from 'antd'

import Actions from '../task_management/sprint_backlog/sprintBacklogActions'


class ReloadPage extends Component {
  componentDidMount() {
    this.props.dispatch(Actions.resetSprints())
  }

  render() {
    return (
      <Fragment>
        {this.props.isReset
          ? <Redirect to={"/"} />
          : <div><Spin tip="Loading..."/></div>}
      </Fragment>
    )
  }

}

export default connect(state => {
  return {
    isReset: state.sprint.sprints === undefined
  }
})(ReloadPage)