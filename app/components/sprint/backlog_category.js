import React, {Component, Fragment} from 'react'
import ReactModal from 'react-modal'
import { connect } from 'react-redux'
import { Droppable } from 'react-beautiful-dnd'

import Story from './story'
import Actions from '../../actions'

class BacklogCategory extends Component{

  state = {
    isOpenStoryAdd: false,
    isEditing: false
  }

  render() {
    const {backlogCategory, dispatch} = this.props

    let storyNameEl
    const autofocus = () => {
      storyNameEl.focus()
    }

    const addStory = () => {
      dispatch(Actions.addStoryToBacklogCategory({backlogCategoryId: backlogCategory.backlogCategoryId, storyName: storyNameEl.value}))
      closeAddStory()
    }

    const closeAddStory = () => {
      this.setState({...this.state, isOpenStoryAdd: false})
    }

    let backlogCategoryNameEl
    const changeBacklogCategoryName = () => {
      dispatch(Actions.changeBacklogCategoryName({backlogCategoryId: backlogCategory.backlogCategoryId, backlogCategoryName: backlogCategoryNameEl.value}))
      this.setState({...this.state, isEditing: false})
    }

    return (

      <Droppable
        droppableId={backlogCategory.backlogCategoryId}>
        
        {provided => (
          <div ref={provided.innerRef}
                {...provided.droppableProps}
                style={{border: "1px solid lightgray", borderRadius: "5px", margin: "5px", background: "lightgray"}}>

            <div style={{position: "relative", margin: "2px", cursor: "move"}}>
              {this.state.isEditing ? (
                  <Fragment>
                    <input type="text" name="backlogCategoryName" defaultValue={backlogCategory.backlogCategoryName} 
                            className="form-control form-control-sm p-0"
                            ref={el => { if (el) el.select(); backlogCategoryNameEl = el }}/>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => changeBacklogCategoryName()}>変更</button>
                    <button type="button" className="btn btn-secondary btn-sm ml-1" onClick={() => this.setState({...this.state, isEditing: false})}>キャンセル</button>
                  </Fragment>
                ) : (
                  <Fragment>
                    <img src="../resource/plus.png" style={{cursor: "pointer", verticalAlign: "middle"}}
                        onClick={() => this.setState({...this.state, isOpenStoryAdd: true})}/>
                    <span style={{verticalAlign: "middle"}}
                        onClick={() => this.setState({...this.state, isEditing: true})}>
                      {backlogCategory.backlogCategoryName}
                    </span>
                    <img src="../resource/triangle-down.png"
                       role="button" className="btn" data-toggle="collapse"
                       data-target={`#stories-${backlogCategory.backlogCategoryId}`} 
                       style={{position: "absolute", right: "0px", cursor: "pointer"}} />
                  </Fragment>
              )}
            </div>

            <div className="collapse" id={`stories-${backlogCategory.backlogCategoryId}`}>
              {backlogCategory.stories ? 
                  Array.from(backlogCategory.stories.values())
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map(story => (
                      <Story story={story} key={story.storyId} />
                  ))
                  : null}

              {provided.placeholder}
            </div>

            <ReactModal 
              isOpen={this.state.isOpenStoryAdd}
              onAfterOpen={autofocus}
              onRequestClose={() => closeAddStory()}
              style={{content: {marginLeft: "auto", marginRight: "auto",  width: "600px", height: "200px"}}}>

              <img src="../resource/cross.png"
                  onClick={() => closeAddStory()}
                  style={{ position: "absolute", right: "10px", top: "10px", cursor: "pointer" }} />

              <p>{backlogCategory.backlogCategoryName}にストーリーを追加する</p>
              <div className="form-group">
                  <input type="text" name="sprintName" className="form-control" ref={el => storyNameEl = el }/>
              </div>
              <div className="form-actions clearfix">
                  <button type="button" className="btn btn-secondary float-right" onClick={() => addStory()}>追加</button>
              </div>

            </ReactModal>

          </div>

        )}
      </Droppable>

    )
  }

}

export default connect()(BacklogCategory)
