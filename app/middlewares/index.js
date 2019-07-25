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

  next(action)
}
