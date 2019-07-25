import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import Actions from '../../actions'
import TaskBoardTitle from './task_board_title'
import TaskBoardTable from './task_board_table'


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
        <div className="container" style={{ paddingTop: "5px" }}>
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
