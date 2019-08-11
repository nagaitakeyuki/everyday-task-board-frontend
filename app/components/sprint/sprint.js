import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ReactModal from 'react-modal'
import { connect } from 'react-redux'

import Story from "./story"
import Actions from '../../actions'

class Sprint extends Component {

  state = {
    isOpenStoryAdd: false
  }

  render() {
    const {sprint, dispatch} = this.props

    let storyNameEl
    const autofocus = () => {
      storyNameEl.focus()
    }

    const addStory = () => {
      dispatch(Actions.addStory({sprintId: sprint.sprintId, storyName: storyNameEl.value}))
      closeAddStory()
    }

    const closeAddStory = () => {
      this.setState({isOpenStoryAdd: false})
    }

    return (
      <div style={{border: "1px solid lightgray", borderRadius: "5px", margin: "5px", background: "lightgray"}}>
        <div style={{position: "relative", margin: "2px", cursor: "move"}}>
          <img src="../resource/plus.png" style={{cursor: "pointer", verticalAlign: "middle"}}
              onClick={() => this.setState({isOpenStoryAdd: true})}/>
          <span style={{verticalAlign: "middle"}}>
            <Link to={`/sprints/${sprint.sprintId}/task_board`}>{sprint.sprintName}</Link>
          </span>
          <span style={{position: "absolute", right: "5px"}}>2019/7/14 〜 2019/7/28</span>
        </div>
    
        {sprint.stories.size > 0 ?
            Array.from(sprint.stories.values())
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map(story => (
                <Story story={story} key={story.storyId} />
              ))
            : null}
    
        <ReactModal 
          isOpen={this.state.isOpenStoryAdd}
          onAfterOpen={autofocus}
          onRequestClose={() => closeAddStory()}
          style={{content: {marginLeft: "auto", marginRight: "auto",  width: "600px", height: "200px"}}}>

          <img src="../resource/cross.png"
              onClick={() => closeAddStory()}
              style={{ position: "absolute", right: "10px", top: "10px", cursor: "pointer" }} />

          <p>{sprint.sprintName}にストーリーを追加する</p>
          <div className="form-group">
              <input type="text" name="sprintName" className="form-control" ref={el => storyNameEl = el }/>
          </div>
          <div className="form-actions clearfix">
              <button type="button" className="btn btn-secondary float-right" onClick={() => addStory()}>追加</button>
          </div>

        </ReactModal>
      </div>
    )
  }
}

export default connect()(Sprint)
