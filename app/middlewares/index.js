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

  if (action.type === Types.CHANGE_SORT_ORDER) {
    ; (async () => {
      // TODO: エラーハンドリング
      await API.sprints.post(action.payload, "/taskSortOrder")
    })()
  }

  if (action.type === Types.CHANGE_TASK_STATUS) {
    ; (async () => {
      // TODO: エラーハンドリング
      await API.sprints.post(action.payload, "/taskStatus")
    })()
  }

  if (action.type === Types.ADD_TASKS) {
    ; (async () => {
      // TODO: エラーハンドリング
      const response =  await API.sprints.post(action.payload, "/tasks")

      dispatch(Actions.setAddedTasks({...action.payload, newTasks : response.newTasks}))
    })()
  }

  next(action)
}
