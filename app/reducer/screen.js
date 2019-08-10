import Types from '../utils/types'

const initState = {
  isSprintAddOpening : false,
  taskAddOpening : {sprintId: undefined, storyId: undefined}
}

export default (state = initState, action) => {
  switch (action.type) {
    case Types.OPEN_TASK_ADD: {
      const { sprintId, storyId } = action.payload
      return { ...state, taskAddOpening: {sprintId, storyId} }
    }
    case Types.CLOSE_TASK_ADD: {
      return {...state, taskAddOpening : {sprintId: undefined, storyId: undefined}}
    }
    default:
      return state
  }
}
