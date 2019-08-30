import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"
import { Spin } from 'antd'

import Actions from '../task_management/sprint_backlog/sprintBacklogActions'


class InitalLoadPage extends Component {
  componentDidMount() {
    this.props.dispatch(Actions.getSprints())
  }

  render() {
    return (
      <Fragment>
        {this.props.isLoaded
          ? <Redirect to={"/running"} />
          : <div><Spin tip="Loading..."/></div>}
      </Fragment>
    )
  }

}

export default connect(state => {
  return {
    isLoaded: state.sprint.sprints !== undefined
  }
})(InitalLoadPage)