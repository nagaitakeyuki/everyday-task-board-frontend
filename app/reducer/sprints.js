import Types from '../utils/types'

const initState = {
  sprints: new Map(),
  currentSprint: undefined
}

export default (state = initState, action) => {
  switch (action.type) {
    case Types.SET_SPRINTS: {
      const { sprints } = action.payload

      const sprintsMap = new Map()

      for (const sprintId in sprints) {
        const sprint = sprints[sprintId]
        sprintsMap.set(sprintId, sprint)

        const storiesMap = new Map()

        for (const storyId in sprint.stories) {
          const story = sprint.stories[storyId]
          storiesMap.set(storyId, story)

          const tasksMap = new Map()

          for (const taskId in story.tasks) {
            const task = story.tasks[taskId]
            tasksMap.set(taskId, task)

          }

          story.tasks = tasksMap
        }

        sprint.stories = storiesMap

      }

      return { ...state, sprints: sprintsMap }
    }
    case Types.SWITCH_SPRINT: {
      const { sprintId } = action.payload

      return {...state, currentSprint: state.sprints.get(sprintId)}
    }
    case Types.CHANGE_TASK_STATUS: {
      const { sprintId, storyId, taskId, newStatus } = action.payload

      state
        .sprints.get(sprintId)
        .stories.get(storyId)
        .tasks.get(taskId).taskStatus = newStatus
      
      return { ...state }
      
    }
    default:
      return state
  }
}
