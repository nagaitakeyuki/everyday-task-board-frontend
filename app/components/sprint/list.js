import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import ReactModal from 'react-modal'
import {connect} from 'react-redux'

import Actions from '../../actions'

// TODO: 最終的には削除する
export default connect(state => {
  return {
    sprints: state.sprint.sprints,
    isSprintAddOpening: state.screen.isSprintAddOpening
  }
})(
  class extends Component {
    componentDidMount() {
      this.props.dispatch(Actions.getSprints())
    }

    render() {
      const { sprints, isSprintAddOpening, dispatch } = this.props


      const openSprintAdd = () => {
        dispatch(Actions.openSprintAdd())
      }
    
      const closeSprintAdd = () => {
        dispatch(Actions.closeSprintAdd())
      }
  
  
      let sprintNameEl
      const autofocus = () => {
        sprintNameEl.focus()
      }
  
      const addSprint = () => {
        dispatch(Actions.addSprint({sprintName: sprintNameEl.value}))
        closeSprintAdd()
      }
  
      
      return (
        <div className="container" style={{ paddingTop: "5px" }}>
          <h3 style={{display: "inline"}}>スプリント一覧</h3>
          <img src="../resource/plus.png"
            onClick={() => openSprintAdd()}
            style={{ cursor: "pointer" }} />

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

          <ReactModal 
            isOpen={isSprintAddOpening}
            onAfterOpen={autofocus}
            onRequestClose={closeSprintAdd}
            style={{content: {marginLeft: "auto", marginRight: "auto",  width: "600px", height: "200px"}}}>

            <img src="../resource/cross.png"
                        onClick={() => closeSprintAdd()}
                        style={{ position: "absolute", right: "10px", top: "10px", cursor: "pointer" }} />

            <p>スプリントを追加する </p>
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
)
