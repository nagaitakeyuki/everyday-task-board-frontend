import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"
import Spin from '../common/component/Spin'

import Actions from '../task_management/sprint_backlog/sprintBacklogActions'


class InitalLoadPage extends Component {
  componentDidMount() {
    if (this.props.isLogined) {
      this.props.dispatch(Actions.getSprints())
    }
  }

  render() {
    return (
      <Fragment>
        {this.props.isLogined 
          ? this.props.isLoaded
            ? <Redirect to={"/running"} />
            : <Spin />
          : <Redirect to={"/login"} />
        }
      </Fragment>
    )
  }

}

export default connect(state => {
  return {
    isLogined: state.login.jwt !== undefined,
    isLoaded: state.sprint.sprints !== undefined
  }
})(InitalLoadPage)