import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'

import SprintColumn from './sprint_column'
import BacklogColumn from './backlog_column'
import Actions from '../../actions'


class SprintBacklog extends Component {
  componentDidMount() {
    this.props.dispatch(Actions.getSprints())
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result

    const isUnvalidDrop = !destination ||
                         (destination.droppableId === source.droppableId
                           && destination.index === source.index)

    if (isUnvalidDrop) return

    const isBelongingChanged = destination.droppableId !== source.droppableId
    if (isBelongingChanged) {
      this.props.dispatch(Actions.changeStoryBelonging({ sourceId: source.droppableId,
                                                          destinationId: destination.droppableId,
                                                          storyId: draggableId,
                                                          newIndex: destination.index }))
      
      return
    }
  }

  render() {
    const {sprints, backlogCategories} = this.props

    return (
      <div className="container" style={{marginTop: "10px"}}>
        <div style={{display: "flex"}}>
          <DragDropContext onDragEnd={this.onDragEnd}>

            <SprintColumn sprints={sprints}/>
            <BacklogColumn backlogCategories={backlogCategories}/>

          </DragDropContext>
        </div>
      </div>
    )
  }

}

export default connect(state => {
  return {
    sprints: state.sprint.sprints,
    backlogCategories: state.sprint.backlogCategories
  }
})(SprintBacklog)