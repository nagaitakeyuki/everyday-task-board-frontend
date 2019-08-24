import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'

import Sprint from "./sprint"
import Actions from '../sprint_backlog_actions'
import SprintForm from './SprintForm'
import Modal from '../../../common/component/Modal'

class SprintColumn extends Component {

  state = {
    isOpenSprintAdd: false
  }

  render() {
    const {sprints, dispatch} = this.props

    const addSprint = (param) => {
      dispatch(Actions.addSprint(param))
      closeAddSprint()
    }

    const closeAddSprint = () => {
      this.setState({isOpenSprintAdd: false})
    }

    return (
      <div style={{display: "flex", flexDirection: "column", width: "50%" }}>
        <div style={{margin: "8px"}}>
            <img src="imgs/plus.png" style={{cursor: "pointer"}}
                onClick={() => this.setState({isOpenSprintAdd: true})}/>
            <span style={{verticalAlign: "middle"}}>スプリント</span>
        </div>
    
        {sprints.size > 0 ? (
            <Fragment >
              {
                Array.from(sprints.values())
                  .sort((a, b) => a.sortOrder - b.sortOrder)
                  .map(sprint => (
                    <Sprint sprint={sprint} key={sprint.sprintId}/>
                  ))
              }
            </Fragment>
          ) : null}

          <Modal
            visible={this.state.isOpenSprintAdd}
            onCancel={closeAddSprint}
            footer={null}
            destroyOnClose
            width={500}>
            <SprintForm onSaveButtonClick={addSprint}/>
          </Modal>
    
      </div>
    )
  }
} 

export default connect()(SprintColumn)
