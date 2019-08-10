import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'

import SprintColumn from './sprint_column'
import BacklogColumn from './backlog_column'
import Actions from '../../actions'


class SprintBacklog extends Component {
  componentDidMount() {
    this.props.dispatch(Actions.getSprints())
  }

  render() {
    const {sprints, backlogCategories} = this.props

    return (
      <div className="container" style={{marginTop: "10px"}}>
        <div style={{display: "flex"}}>
          <SprintColumn sprints={sprints}/>
          <BacklogColumn backlogCategories={backlogCategories}/>
        </div>
      </div>
    )
  }

}

export default connect(state => {
  return {
    sprints: state.sprint.sprints,
    backlogCategories: state.sprint.backlogCategories
  }
})(SprintBacklog)