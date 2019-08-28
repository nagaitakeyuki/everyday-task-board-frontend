import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { Droppable } from 'react-beautiful-dnd'

import Modal from '../../../common/component/Modal'
import Story from "./Story"
import StoryForm from './form/StoryForm'
import Actions from '../sprintBacklogActions'

class Sprint extends Component {

  state = {
    isOpenStoryAdd: false
  }

  render() {
    const {sprint, dispatch} = this.props

    const addStory = (param) => {
      dispatch(Actions.addStory(param))
      closeAddStory()
    }

    const closeAddStory = () => {
      this.setState({isOpenStoryAdd: false})
    }

    return (
      <Droppable
        droppableId={sprint.sprintId}>
        
        {provided => (
          <div ref={provided.innerRef}
              {...provided.droppableProps}
              style={{border: "1px solid lightgray", borderRadius: "5px", marginTop: "5px", background: "lightgray"}}>

            <div style={{position: "relative", margin: "2px", cursor: "move"}}>
              <img src="imgs/plus.png" style={{cursor: "pointer", verticalAlign: "middle"}}
                  onClick={() => this.setState({isOpenStoryAdd: true})}/>
              <span style={{verticalAlign: "middle", marginLeft: "3px"}}>
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

            {provided.placeholder}
        
            <Modal
              visible={this.state.isOpenStoryAdd}
              onCancel={closeAddStory}
              footer={null}
              destroyOnClose
              width={500}>
              <StoryForm sprintId={sprint.sprintId} onSaveButtonClick={addStory}/>
            </Modal>

          </div>
        )}
      </Droppable>
        
    )
  }
}

export default connect()(Sprint)
