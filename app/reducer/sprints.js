import uuid from 'uuid'

import Types from '../utils/types'

const initState = {
  sprints: new Map(),
  currentSprint: undefined
}

const copySprintsMap = srcSprintsMap => {
  const copiedSprintsMap = new Map()

  for (const [srcSprintId, srcSprint] of srcSprintsMap.entries()) {
    const copiedStories = new Map()

    for (const [srcStoryId, srcStory] of srcSprint.stories.entries()) {
      const copiedTasks = new Map()

      for (const [srcTaskId, srcTask] of srcStory.tasks.entries()) {
        copiedTasks.set(srcTaskId, {...srcTask})
      }

      copiedStories.set(srcStoryId, {...srcStory, tasks: copiedTasks})
    }

    copiedSprintsMap.set(srcSprintId, {...srcSprint, stories: copiedStories})
  }

  return copiedSprintsMap
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
    case Types.CHANGE_TASK_STATUS: {
      /*
      DBへの永続化が完了する前に、先行して新ステータスをstateに反映させる。
      先行して反映させないと、タスクのオブジェクトが旧ステータスの位置に一瞬だけ戻ってしまう。
      */

      const { sprintId, storyId, taskId, newStatus } = action.payload

      const copiedSprints = copySprintsMap(state.sprints)

      copiedSprints.get(sprintId)
        .stories.get(storyId)
        .tasks.get(taskId).taskStatus = newStatus
      
      return { sprints: copiedSprints, currentSprint: copiedSprints.get(sprintId)}
      
    }
    case Types.SWITCH_SPRINT: {
      const { sprintId } = action.payload

      return {...state, currentSprint: state.sprints.get(sprintId)}
    }
    case Types.SET_TASK_STATUS: {
      const { sprintId, storyId, taskId, newStatus } = action.payload

      const copiedSprints = copySprintsMap(state.sprints)

      copiedSprints.get(sprintId)
        .stories.get(storyId)
        .tasks.get(taskId).taskStatus = newStatus
      
      return { sprints: copiedSprints, currentSprint: copiedSprints.get(sprintId)}
      
    }
    case Types.SET_ADDED_TASKS: {
      const { sprintId, storyId, newTasks } = action.payload
      
      const copiedSprints = copySprintsMap(state.sprints)

      const tasks = copiedSprints.get(sprintId)
                          .stories.get(storyId)
                          .tasks

      newTasks.forEach(newTask => {tasks.set(newTask.taskId, newTask)});

      return { sprints: copiedSprints, currentSprint: copiedSprints.get(sprintId)}
      
    } default:
      return state
  }
}
