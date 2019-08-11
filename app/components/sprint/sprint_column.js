import React, {Component, Fragment} from 'react'
import ReactModal from 'react-modal'
import { connect } from 'react-redux'

import Sprint from "./sprint"
import Actions from '../../actions'

class SprintColumn extends Component {

  state = {
    isOpenSprintAdd: false
  }

  render() {
    const {sprints, dispatch} = this.props

    let sprintNameEl
    const autofocus = () => {
      sprintNameEl.focus()
    }

    const addSprint = () => {
      dispatch(Actions.addSprint({sprintName: sprintNameEl.value}))
      closeAddSprint()
    }

    const closeAddSprint = () => {
      this.setState({isOpenSprintAdd: false})
    }

    return (
      <div style={{display: "flex", flexDirection: "column", width: "50%" }}>
        <div style={{margin: "8px"}}>
            <img src="../resource/plus.png" style={{cursor: "pointer"}}
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

          <ReactModal 
            isOpen={this.state.isOpenSprintAdd}
            onAfterOpen={autofocus}
            onRequestClose={() => closeAddSprint()}
            style={{content: {marginLeft: "auto", marginRight: "auto",  width: "600px", height: "200px"}}}>
    
            <img src="../resource/cross.png"
                onClick={() => closeAddSprint()}
                style={{ position: "absolute", right: "10px", top: "10px", cursor: "pointer" }} />
    
            <p>スプリントを追加する</p>
            <div className="form-group">
                <input type="text" name="sprintName" className="form-control" ref={el => sprintNameEl = el }/>
            </div>
            <div className="form-actions clearfix">
                <button type="button" className="btn btn-secondary float-right" onClick={() => addSprint()}>追加</button>
            </div>
    
          </ReactModal>
    
      </div>
    )
  }
} 

export default connect()(SprintColumn)
