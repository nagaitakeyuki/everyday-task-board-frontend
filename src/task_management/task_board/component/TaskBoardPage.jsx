import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import TaskBoardTitle from './TaskBoardTitle'
import TaskBoardTable from './TaskBoardTable'
import Actions from '../taskBoardActions'


export default connect(state => (
  { sprint: state.sprint.currentSprint }
))(
  class extends Component {

    componentDidMount() {
      const { sprintId } = this.props.match.params
      this.props.dispatch(Actions.swithSprint({ sprintId }))
    }

    render() {
      const sprint = this.props.sprint

      return (
        <div style={{ paddingTop: "5px", fontSize: "0.8rem"}}>
          {sprint ? (
            <Fragment>
              <TaskBoardTitle sprintName={sprint.sprintName} />
              <TaskBoardTable stories={sprint.stories} />
            </Fragment>
          ): null}
        </div>
      )
    }
  }
)
