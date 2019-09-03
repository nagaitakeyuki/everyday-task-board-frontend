import sprintBacklogActions from './sprint_backlog/sprintBacklogActions'
import sprintBacklogTypes from './sprint_backlog/sprintBacklogTypes'
import taskBoardActions from './task_board/taskBoardActions'
import taskBoardTypes from './task_board/taskBoardTypes'
import ApiCommon from '../common/utils/api/apiCommon'

export default store => next => action => {
  const {dispatch} = store

  const jwt = store.getState().login.jwt

  if (action.type === sprintBacklogTypes.GET_SPRINTS) {
    ; (async () => {
      const response = await ApiCommon.get("/", jwt)
      dispatch(sprintBacklogActions.setSprints(response.json))
    })()
  }

  if (action.type === sprintBacklogTypes.ADD_SPRINT) {
    ; (async () => {
      const response = await ApiCommon.post("/sprint", action.payload, jwt)
      dispatch(sprintBacklogActions.setNewSprint({...action.payload, newSprint: response.json}))
    })()
  }

  if (action.type === sprintBacklogTypes.UPDATE_SPRINT) {
    ; (async () => {
      const {sprintId} = action.payload
      await ApiCommon.put(`/sprint/${sprintId}`, action.payload, jwt)
    })()
  }

  if (action.type === sprintBacklogTypes.ADD_BACKLOG_CATEGORY) {
    ; (async () => {
      const response = await ApiCommon.post("/backlogCategory", action.payload, jwt)
      dispatch(sprintBacklogActions.setNewBacklogCategory({...action.payload, newBacklogCategory: response.json}))
    })()
  }

  if (action.type === sprintBacklogTypes.CHANGE_BACKLOG_CATEGORY_NAME) {
    ; (async () => {
      const response = await ApiCommon.post("/backlogCategoryName", action.payload, jwt)
      dispatch(sprintBacklogActions.setBacklogCategoryName({...action.payload, changedBacklogCategory: response.json}))
    })()
  }

  if (action.type === sprintBacklogTypes.ADD_STORY) {
    ; (async () => {
      const response = await ApiCommon.post("/storyBelongingToSprint", action.payload, jwt)
      dispatch(sprintBacklogActions.setStory({...action.payload, newStory: response.json}))
    })()
  }

  if (action.type === sprintBacklogTypes.ADD_STORY_TO_BACKLOGCATEGORY) {
    ; (async () => {
      const response = await ApiCommon.post("/storyBelongingToBacklogCategory", action.payload, jwt)
      dispatch(sprintBacklogActions.setStoryToBacklogCategory({...action.payload, newStory: response.json}))
    })()
  }

  if (action.type === sprintBacklogTypes.CHANGE_STORY_NAME) {
    ; (async () => {
      const response = await ApiCommon.post("/storyName", action.payload, jwt)
      dispatch(sprintBacklogActions.setStoryName({...action.payload, changedStory: response.json}))
    })()
  }

  if (action.type === sprintBacklogTypes.CHANGE_STORY_BELONGING) {
    ; (async () => {
      await ApiCommon.post("/storyBelonging", action.payload, jwt)
    })()
  }

  if (action.type === sprintBacklogTypes.CHANGE_STORY_SORT_ORDER) {
    ; (async () => {
      await ApiCommon.post("/storySortOrder", action.payload, jwt)
    })()
  }

  if (action.type === taskBoardTypes.CHANGE_SORT_ORDER) {
    ; (async () => {
      await ApiCommon.post("/taskSortOrder", action.payload, jwt)
    })()
  }

  if (action.type === taskBoardTypes.CHANGE_TASK_STATUS) {
    ; (async () => {
      await ApiCommon.post("/taskStatus", action.payload, jwt)
    })()
  }

  if (action.type === taskBoardTypes.ADD_TASKS) {
    ; (async () => {
      const response =  await ApiCommon.post("/tasks", action.payload, jwt)

      dispatch(taskBoardActions.setAddedTasks({...action.payload, newTasks : response.json.newTasks}))
    })()
  }

  if (action.type === taskBoardTypes.UPDATE_STORY) {
    ; (async () => {
      const response = await ApiCommon.post("/story", action.payload, jwt)
      dispatch(taskBoardActions.setUpdatedStory({...action.payload, updatedStory: response.json}))
    })()
  }

  if (action.type === sprintBacklogTypes.DELETE_STORY) {
    ; (async () => {
      const {story} = action.payload
      await ApiCommon.delete(`/story?storyId=${story.storyId}`, jwt)
      dispatch(sprintBacklogActions.deleteStoryFromState({...action.payload}))
    })()
  }

  if (action.type === taskBoardTypes.UPDATE_TASK) {
    ; (async () => {
      await ApiCommon.post("/task", action.payload, jwt)
      dispatch(taskBoardActions.setUpdatedTask({...action.payload}))
    })()
  }

  if (action.type === taskBoardTypes.DELETE_TASK) {
    ; (async () => {
      const {taskId} = action.payload
      await ApiCommon.delete(`/task?taskId=${taskId}`, jwt)
      dispatch(taskBoardActions.deleteTaskFromState({...action.payload}))
    })()
  }

  next(action)
}
