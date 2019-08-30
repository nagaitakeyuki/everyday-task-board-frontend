import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Spin from '../../../common/component/Spin'

import TaskBoardTitle from './TaskBoardTitle'
import TaskBoardTable from './TaskBoardTable'
import sprintBacklogActions from '../../sprint_backlog/sprintBacklogActions'
import taskBoardActions from '../taskBoardActions'


export default connect(state => (
  { sprint: state.sprint.currentSprint,
    isLoaded: state.sprint.sprints !== undefined }
))(
  class extends Component {

    componentDidMount() {
      if (!this.props.isLoaded) 
        this.props.dispatch(sprintBacklogActions.getSprints())
    }

    render() {
      if(this.props.isLoaded && !this.props.sprint) {
        const { sprintId } = this.props.match.params
        this.props.dispatch(taskBoardActions.swithSprint({ sprintId }))
      }

      const sprint = this.props.sprint

      return (
        <Fragment>
          {this.props.isLoaded && sprint
            ? 
              <div style={{ paddingTop: "5px", fontSize: "0.8rem"}}>
                {sprint ? (
                  <Fragment>
                    <TaskBoardTitle sprint={sprint} />
                    <TaskBoardTable stories={sprint.stories} />
                  </Fragment>
                ): null}
              </div>
            : 
              <Spin />}
        </Fragment>
      )
    }
  }
)
