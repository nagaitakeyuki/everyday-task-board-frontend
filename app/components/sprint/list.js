import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import Actions from '../../actions'
import {connect} from 'react-redux'

export default connect(state => {
  return {
    sprints: state.sprint.sprints
  }
})(
  class extends Component {
    componentDidMount() {
      this.props.dispatch(Actions.getSprints())
    }

    render() {
      const { sprints } = this.props
      
      return (
        <div className="container" style={{ paddingTop: "5px" }}>
          <h3>スプリント一覧</h3>
          {sprints.size > 0 ? (
            <ul>
              {
                Array.from(sprints.values()).map(sprint => (
                <li key={sprint.sprintId}>
                  {sprint.sprintName}
                    <Link to={`/sprints/${sprint.sprintId}/task_board`}>[Task Board]</Link>
                </li>
                ))
              }
            </ul>
          ) : null}
        </div>
      )
    }
  }
)
