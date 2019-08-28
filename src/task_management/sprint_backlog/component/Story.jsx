import React, {Component} from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { Input, Button, Popconfirm} from "antd"

import Actions from '../sprintBacklogActions'

class Story extends Component {

  state = {
    isEditing: false,
    storyName: this.props.story.storyName
  }

  render() {
    const {story} = this.props

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

                <Input
                  size="small"
                  autoFocus={true}
                  value={this.state.storyName}
                  onChange={(e) => this.handleTextChange(e, "storyName")}
                />
                <Button
                  size="small"
                  type="default"
                  onClick={
                    () => {
                      this.changeStoryName({storyId: story.storyId, storyName: this.state.storyName})
                    }
                  }
                >
                  変更
                </Button>
                <Button
                  size="small"
                  type="default"
                  onClick={() => { this.setState({...this.state, isEditing: false})}}
                >
                  キャンセル
                </Button>
              </div>
              ) : (
              <div style={{border: "1px solid whitesmoke", borderRadius: "5px", margin: "3px",
                           background: "whitesmoke", cursor: "move", position: "relative"}}>
                <div style={{textDecoration: story.storyStatus === "end" ? "line-through" : "", width: "90%"}}
                      onClick={() => {this.setState({isEditing: true})}}>
                  {story.storyName}
                </div>
                <Popconfirm
                  title="ストーリーを削除しますか？紐づくタスクも併せて削除されます。"
                  onConfirm={this.deleteStory}
                  okText="削除"
                  cancelText="キャンセル"
                >
                  <img src="imgs/trash-can.png"
                        style={{position: "absolute", right: "2px", top: "4px", cursor: "pointer"}} />
                </Popconfirm>
              </div>
              )
          }
          </div>
        )}
    
      </Draggable>
    )

  }

  handleTextChange(e, key) {
    this.setState({ [key]: e.target.value })
  }

  changeStoryName = (param) => {
    // TODO: 変更前の内容が一瞬表示されてしまう。他に方法ないのか。
    this.props.dispatch(Actions.changeStoryName(param))
    this.setState({isEditing: false})
  }

  deleteStory = () => {
    this.props.dispatch(Actions.deleteStory({story: this.props.story}))
  }


}

export default connect()(Story)