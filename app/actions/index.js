import Types from '../utils/types'

export default {

  getSprints: () => ({
    type: Types.GET_SPRINTS
  }),

  setSprints: payload => ({
    type: Types.SET_SPRINTS,
    payload
  }),
  
  addSprint: payload => ({
    type: Types.ADD_SPRINT,
    payload
  }),

  setNewSprint: payload => ({
    type: Types.SET_NEW_SPRINT,
    payload
  }),

  addStory: payload => ({
    type: Types.ADD_STORY,
    payload
  }),

  setStory: payload => ({
    type: Types.SET_STORY,
    payload
  }),

  addStoryToBacklogCategory: payload => ({
    type: Types.ADD_STORY_TO_BACKLOGCATEGORY,
    payload
  }),

  setStoryToBacklogCategory: payload => ({
    type: Types.SET_STORY_TO_BACKLOGCATEGORY,
    payload
  }),

  changeStoryName: payload => ({
    type: Types.CHANGE_STORY_NAME,
    payload
  }),

  setStoryName: payload => ({
    type: Types.SET_STORY_NAME,
    payload
  }),

  changeStoryBelonging: payload => ({
    type: Types.CHANGE_STORY_BELONGING,
    payload
  }),

  changeStorySortOrder: payload => ({
    type: Types.CHANGE_STORY_SORT_ORDER,
    payload
  }),

  swithSprint: payload => ({
    type: Types.SWITCH_SPRINT,
    payload
  }),

  changeSortOrder: payload => ({
    type: Types.CHANGE_SORT_ORDER,
    payload
  }),

  setSortOrder: payload => ({
    type: Types.SET_SORT_ORDER,
    payload
  }),

  changeTaskStatus: payload => ({
    type: Types.CHANGE_TASK_STATUS,
    payload
  }),

  setTaskStatus: payload => ({
    type: Types.SET_TASK_STATUS,
    payload
  }),

  setTaskStatus: payload => ({
    type: Types.SET_TASK_STATUS,
    payload
  }),

  openTaskAdd: payload => ({
    type: Types.OPEN_TASK_ADD,
    payload
  }),

  closeTaskAdd: payload => ({
    type: Types.CLOSE_TASK_ADD,
    payload
  }),

  addSprint: payload => ({
    type: Types.ADD_SPRINT,
    payload
  }),

  addBacklogCategory: payload => ({
    type: Types.ADD_BACKLOG_CATEGORY,
    payload
  }),

  setNewBacklogCategory: payload => ({
    type: Types.SET_NEW_BACKLOG_CATEGORY,
    payload
  }),

  changeBacklogCategoryName: payload => ({
    type: Types.CHANGE_BACKLOG_CATEGORY_NAME,
    payload
  }),

  setBacklogCategoryName: payload => ({
    type: Types.SET_BACKLOG_CATEGORY_NAME,
    payload
  }),

  addTasks: payload => ({
    type: Types.ADD_TASKS,
    payload
  }),

  setAddedTasks: payload => ({
    type: Types.SET_ADDED_TASKS,
    payload
  })



}
