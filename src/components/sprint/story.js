import React, {Component} from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'

import Actions from '../../actions'

class Story extends Component {

  state = {
    isEditing: false
  }

  render() {
    const {story, dispatch} = this.props

    let storyNameEl
    const changeStoryName = () => {
      // TODO: 変更前の内容が一瞬表示されてしまう。他に方法ないのか。
      dispatch(Actions.changeStoryName({storyId: story.storyId, storyName: storyNameEl.value}))
      this.setState({isEditing: false})
    }

    const deleteStory = () => {
      const doDelete = window.confirm("ストーリーを削除しますか？紐づくタスクも併せて削除されます。")

      if (doDelete) dispatch(Actions.deleteStory({story}))
    }

    return (
      <Draggable
        draggableId={story.storyId} index={story.sortOrder}>
      
        {provided => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {this.state.isEditing ? (
              <div style={{border: "1px solid whitesmoke", borderRadius: "5px", margin: "3px", background: "whitesmoke", cursor: "move"}}>
                <input type="text" name="storyName" defaultValue={story.storyName}
                        className="form-control form-control-sm p-0" 
                        ref={el => { if (el) el.select(); storyNameEl = el }}/>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => changeStoryName()}>変更</button>
                <button type="button" className="btn btn-secondary btn-sm ml-1" onClick={() => this.setState({isEditing: false})}>キャンセル</button>
              </div>
              ) : (
              <div style={{border: "1px solid whitesmoke", borderRadius: "5px", margin: "3px",
                           background: "whitesmoke", cursor: "move", position: "relative"}}>
                <span style={{textDecoration: story.storyStatus === "end" ? "line-through" : ""}}
                      onClick={() => {this.setState({isEditing: true})}}>
                  {story.storyName}
                </span>
                <img src="imgs/trash-can.png"
                      style={{position: "absolute", right: "2px", top: "4px", cursor: "pointer"}}
                      onClick={() => deleteStory()} />
              </div>
              )
          }
          </div>
        )}
    
      </Draggable>
    )

  }
}

export default connect()(Story)