import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'

import Actions from '../task_board_actions'
import TaskAddForm from './TaskAddForm'
import Modal from '../../../common/component/Modal'
import StoryEditForm from './StoryEditForm';

ReactModal.setAppElement('#root')

class TaskBoardStoryCell extends Component {

  state = {
    isEditing: false,
    isTaskAdding: false
  }

  render() {

    const {story, dispatch} = this.props

    const addTasks = (param) => {
      dispatch(Actions.addTasks(param))
      closeTaskAdd()
    }

    const closeTaskAdd = () => {
      this.setState({...this.state, isTaskAdding: false})
    }

    const updateStory = (param) => {
      dispatch(Actions.updateStory(param))
      closeStoryEdit()
    }

    const closeStoryEdit = () => {
      this.setState({...this.state, isEditing: false})
    }

    return (
      <td>
        <div style={{width: "100%",  height: "80px", background: "#87cefa",
             borderRadius: "5px", position: "relative"}}>
          <div style={{ width: "80%", height: "100%", textDecoration: story.storyStatus === "end" ? "line-through" : "", cursor: "pointer"}}
              onClick={() => this.setState({...this.state, isEditing: true})}>
            {story.storyName}
          </div>
          <img src="imgs/plus.png"
            onClick={() => this.setState({...this.state, isTaskAdding: true})}
            style={{ position: "absolute", right: "5px", top: "5px", cursor: "pointer"}} />
        </div>

        <Modal
          visible={this.state.isTaskAdding}
          onCancel={closeTaskAdd}
          footer={null}
          destroyOnClose
          width={500}>
          <TaskAddForm 
            sprintId={story.baseSprintId}
            storyId={story.storyId}
            onSaveButtonClick={addTasks}/>
        </Modal>

        <Modal
          visible={this.state.isEditing}
          onCancel={closeStoryEdit}
          footer={null}
          destroyOnClose
          width={500}>
          <StoryEditForm 
            story={story}
            onSaveButtonClick={updateStory}/>
        </Modal>
        
      </td>
    )
  }

}

export default connect()(TaskBoardStoryCell)