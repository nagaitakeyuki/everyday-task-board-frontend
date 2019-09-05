import sprintBacklogActions from './sprint_backlog/sprintBacklogActions'
import sprintBacklogTypes from './sprint_backlog/sprintBacklogTypes'
import taskBoardActions from './task_board/taskBoardActions'
import taskBoardTypes from './task_board/taskBoardTypes'
import ApiCommon from '../common/utils/api/apiCommon'

export default store => next => action => {
  const {dispatch} = store

  if (action.type === sprintBacklogTypes.GET_SPRINTS) {
    ; (async () => {
      const response = await ApiCommon.get("/sprints")
      dispatch(sprintBacklogActions.setSprints(response.json))
    })()
  }

  if (action.type === sprintBacklogTypes.ADD_SPRINT) {
    ; (async () => {
      const response = await ApiCommon.post("/sprints/sprint", action.payload)
      dispatch(sprintBacklogActions.setNewSprint({...action.payload, newSprint: response.json}))
    })()
  }

  if (action.type === sprintBacklogTypes.UPDATE_SPRINT) {
    ; (async () => {
      const {sprintId} = action.payload
      await ApiCommon.put(`/sprints/sprint/${sprintId}`, action.payload)
    })()
  }

  if (action.type === sprintBacklogTypes.ADD_BACKLOG_CATEGORY) {
    ; (async () => {
      const response = await ApiCommon.post("/sprints/backlogCategory", action.payload)
      dispatch(sprintBacklogActions.setNewBacklogCategory({...action.payload, newBacklogCategory: response.json}))
    })()
  }

  if (action.type === sprintBacklogTypes.CHANGE_BACKLOG_CATEGORY_NAME) {
    ; (async () => {
      const response = await ApiCommon.post("/sprints/backlogCategoryName", action.payload)
      dispatch(sprintBacklogActions.setBacklogCategoryName({...action.payload, changedBacklogCategory: response.json}))
    })()
  }

  if (action.type === sprintBacklogTypes.ADD_STORY) {
    ; (async () => {
      const response = await ApiCommon.post("/sprints/storyBelongingToSprint", action.payload)
      dispatch(sprintBacklogActions.setStory({...action.payload, newStory: response.json}))
    })()
  }

  if (action.type === sprintBacklogTypes.ADD_STORY_TO_BACKLOGCATEGORY) {
    ; (async () => {
      const response = await ApiCommon.post("/sprints/storyBelongingToBacklogCategory", action.payload)
      dispatch(sprintBacklogActions.setStoryToBacklogCategory({...action.payload, newStory: response.json}))
    })()
  }

  if (action.type === sprintBacklogTypes.CHANGE_STORY_NAME) {
    ; (async () => {
      const response = await ApiCommon.post("/sprints/storyName", action.payload)
      dispatch(sprintBacklogActions.setStoryName({...action.payload, changedStory: response.json}))
    })()
  }

  if (action.type === sprintBacklogTypes.CHANGE_STORY_BELONGING) {
    ; (async () => {
      await ApiCommon.post("/sprints/storyBelonging", action.payload)
    })()
  }

  if (action.type === sprintBacklogTypes.CHANGE_STORY_SORT_ORDER) {
    ; (async () => {
      await ApiCommon.post("/sprints/storySortOrder", action.payload)
    })()
  }

  if (action.type === taskBoardTypes.CHANGE_SORT_ORDER) {
    ; (async () => {
      await ApiCommon.post("/sprints/taskSortOrder", action.payload)
    })()
  }

  if (action.type === taskBoardTypes.CHANGE_TASK_STATUS) {
    ; (async () => {
      await ApiCommon.post("/sprints/taskStatus", action.payload)
    })()
  }

  if (action.type === taskBoardTypes.ADD_TASKS) {
    ; (async () => {
      const response =  await ApiCommon.post("/sprints/tasks", action.payload)

      dispatch(taskBoardActions.setAddedTasks({...action.payload, newTasks : response.json.newTasks}))
    })()
  }

  if (action.type === taskBoardTypes.UPDATE_STORY) {
    ; (async () => {
      const response = await ApiCommon.post("/sprints/story", action.payload)
      dispatch(taskBoardActions.setUpdatedStory({...action.payload, updatedStory: response.json}))
    })()
  }

  if (action.type === sprintBacklogTypes.DELETE_STORY) {
    ; (async () => {
      const {story} = action.payload
      await ApiCommon.delete(`/sprints/story?storyId=${story.storyId}`)
      dispatch(sprintBacklogActions.deleteStoryFromState({...action.payload}))
    })()
  }

  if (action.type === taskBoardTypes.UPDATE_TASK) {
    ; (async () => {
      await ApiCommon.post("/sprints/task", action.payload)
      dispatch(taskBoardActions.setUpdatedTask({...action.payload}))
    })()
  }

  if (action.type === taskBoardTypes.DELETE_TASK) {
    ; (async () => {
      const {taskId} = action.payload
      await ApiCommon.delete(`/sprints/task?taskId=${taskId}`)
      dispatch(taskBoardActions.deleteTaskFromState({...action.payload}))
    })()
  }

  next(action)
}
