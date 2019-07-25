import Types from '../utils/types'

export default {

  getSprints: () => ({
    type: Types.GET_SPRINTS
  }),

  setSprints: payload => ({
    type: Types.SET_SPRINTS,
    payload
  }),
  
  swithSprint: payload => ({
    type: Types.SWITCH_SPRINT,
    payload
  }),

  changeTaskStatus: payload => ({
    type: Types.CHANGE_TASK_STATUS,
    payload
  })
}
