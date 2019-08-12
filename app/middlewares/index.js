import Types from '../utils/types'
import API from '../api'
import Actions from '../actions'

export default store => next => action => {
  const {dispatch} = store

  if (action.type === Types.GET_SPRINTS) {
    ; (async () => {
      const sprints = await API.sprints.get()
      dispatch(Actions.setSprints(sprints))
    })()
  }

  if (action.type === Types.ADD_SPRINT) {
    ; (async () => {
      const newSprint = await API.sprints.post(action.payload, "/sprint")
      dispatch(Actions.setNewSprint({...action.payload, newSprint}))
    })()
  }

  if (action.type === Types.ADD_BACKLOG_CATEGORY) {
    ; (async () => {
      const newBacklogCategory = await API.sprints.post(action.payload, "/backlogCategory")
      dispatch(Actions.setNewBacklogCategory({...action.payload, newBacklogCategory}))
    })()
  }

  if (action.type === Types.ADD_STORY) {
    ; (async () => {
      const newStory = await API.sprints.post(action.payload, "/storyBelongingToSprint")
      dispatch(Actions.setStory({...action.payload, newStory}))
    })()
  }

  if (action.type === Types.ADD_STORY_TO_BACKLOGCATEGORY) {
    ; (async () => {
      const newStory = await API.sprints.post(action.payload, "/storyBelongingToBacklogCategory")
      dispatch(Actions.setStoryToBacklogCategory({...action.payload, newStory}))
    })()
  }

  if (action.type === Types.CHANGE_STORY_BELONGING) {
    ; (async () => {
      await API.sprints.post(action.payload, "/storyBelonging")
    })()
  }

  if (action.type === Types.CHANGE_STORY_SORT_ORDER) {
    ; (async () => {
      await API.sprints.post(action.payload, "/storySortOrder")
    })()
  }

  if (action.type === Types.CHANGE_SORT_ORDER) {
    ; (async () => {
      await API.sprints.post(action.payload, "/taskSortOrder")
    })()
  }

  if (action.type === Types.CHANGE_TASK_STATUS) {
    ; (async () => {
      await API.sprints.post(action.payload, "/taskStatus")
    })()
  }

  if (action.type === Types.ADD_TASKS) {
    ; (async () => {
      const response =  await API.sprints.post(action.payload, "/tasks")

      dispatch(Actions.setAddedTasks({...action.payload, newTasks : response.newTasks}))
    })()
  }

  next(action)
}
