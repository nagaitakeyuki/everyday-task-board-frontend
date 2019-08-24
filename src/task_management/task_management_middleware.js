import sprintBacklogActions from './sprint_backlog/sprint_backlog_actions'
import sprintBacklogTypes from './sprint_backlog/sprint_backlog_types'
import taskBoardActions from './task_board/task_board_actions'
import taskBoardTypes from './task_board/task_board_types'
import API from '../common/utils/api'

export default store => next => action => {
  const {dispatch} = store

  if (action.type === sprintBacklogTypes.GET_SPRINTS) {
    ; (async () => {
      const sprints = await API.sprints.get()
      dispatch(sprintBacklogActions.setSprints(sprints))
    })()
  }

  if (action.type === sprintBacklogTypes.ADD_SPRINT) {
    ; (async () => {
      const newSprint = await API.sprints.post(action.payload, "/sprint")
      dispatch(sprintBacklogActions.setNewSprint({...action.payload, newSprint}))
    })()
  }

  if (action.type === sprintBacklogTypes.ADD_BACKLOG_CATEGORY) {
    ; (async () => {
      const newBacklogCategory = await API.sprints.post(action.payload, "/backlogCategory")
      dispatch(sprintBacklogActions.setNewBacklogCategory({...action.payload, newBacklogCategory}))
    })()
  }

  if (action.type === sprintBacklogTypes.CHANGE_BACKLOG_CATEGORY_NAME) {
    ; (async () => {
      const changedBacklogCategory = await API.sprints.post(action.payload, "/backlogCategoryName")
      dispatch(sprintBacklogActions.setBacklogCategoryName({...action.payload, changedBacklogCategory}))
    })()
  }

  if (action.type === sprintBacklogTypes.ADD_STORY) {
    ; (async () => {
      const newStory = await API.sprints.post(action.payload, "/storyBelongingToSprint")
      dispatch(sprintBacklogActions.setStory({...action.payload, newStory}))
    })()
  }

  if (action.type === sprintBacklogTypes.ADD_STORY_TO_BACKLOGCATEGORY) {
    ; (async () => {
      const newStory = await API.sprints.post(action.payload, "/storyBelongingToBacklogCategory")
      dispatch(sprintBacklogActions.setStoryToBacklogCategory({...action.payload, newStory}))
    })()
  }

  if (action.type === sprintBacklogTypes.CHANGE_STORY_NAME) {
    ; (async () => {
      const changedStory = await API.sprints.post(action.payload, "/storyName")
      dispatch(sprintBacklogActions.setStoryName({...action.payload, changedStory}))
    })()
  }

  if (action.type === sprintBacklogTypes.CHANGE_STORY_BELONGING) {
    ; (async () => {
      await API.sprints.post(action.payload, "/storyBelonging")
    })()
  }

  if (action.type === sprintBacklogTypes.CHANGE_STORY_SORT_ORDER) {
    ; (async () => {
      await API.sprints.post(action.payload, "/storySortOrder")
    })()
  }

  if (action.type === taskBoardTypes.CHANGE_SORT_ORDER) {
    ; (async () => {
      await API.sprints.post(action.payload, "/taskSortOrder")
    })()
  }

  if (action.type === taskBoardTypes.CHANGE_TASK_STATUS) {
    ; (async () => {
      await API.sprints.post(action.payload, "/taskStatus")
    })()
  }

  if (action.type === taskBoardTypes.ADD_TASKS) {
    ; (async () => {
      const response =  await API.sprints.post(action.payload, "/tasks")

      dispatch(taskBoardActions.setAddedTasks({...action.payload, newTasks : response.newTasks}))
    })()
  }

  if (action.type === taskBoardTypes.UPDATE_STORY) {
    ; (async () => {
      const updatedStory = await API.sprints.post(action.payload, "/story")
      dispatch(taskBoardActions.setUpdatedStory({...action.payload, updatedStory}))
    })()
  }

  if (action.type === sprintBacklogTypes.DELETE_STORY) {
    ; (async () => {
      const {story} = action.payload
      await API.sprints.delete(`/story?storyId=${story.storyId}`)
      dispatch(sprintBacklogActions.deleteStoryFromState({...action.payload}))
    })()
  }

  if (action.type === taskBoardTypes.UPDATE_TASK) {
    ; (async () => {
      await API.sprints.post(action.payload, "/task")
      dispatch(taskBoardActions.setUpdatedTask({...action.payload}))
    })()
  }

  if (action.type === taskBoardTypes.DELETE_TASK) {
    ; (async () => {
      const {taskId} = action.payload
      await API.sprints.delete(`/task?taskId=${taskId}`)
      dispatch(taskBoardActions.deleteTaskFromState({...action.payload}))
    })()
  }



  next(action)
}
