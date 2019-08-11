import Types from '../utils/types'

const initState = {
  sprints: new Map(),
  backlogCategories: new Map(),
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

      const { backlogCategories } = action.payload

      const backlogCategoriesMap = new Map()

      for (const backlogCategoryId in backlogCategories) {
        const backlogCategory = backlogCategories[backlogCategoryId]
        backlogCategoriesMap.set(backlogCategoryId, backlogCategory)

        const storiesMap = new Map()

        for (const storyId in backlogCategory.stories) {
          const story = backlogCategory.stories[storyId]
          storiesMap.set(storyId, story)

          const tasksMap = new Map()

          for (const taskId in story.tasks) {
            const task = story.tasks[taskId]
            tasksMap.set(taskId, task)

          }

          story.tasks = tasksMap
        }

        backlogCategory.stories = storiesMap

      }

      return { ...state, sprints: sprintsMap, backlogCategories: backlogCategoriesMap }
    }
    case Types.SET_NEW_SPRINT: {
      const { newSprint } = action.payload

      // copySprintsMap()のために、空のMapを初期設定する
      newSprint.stories = new Map()
      
      const copiedSprints = copySprintsMap(state.sprints)

      copiedSprints.set(newSprint.sprintId, newSprint)

      return { ...state, sprints: copiedSprints}
    }
    case Types.SET_STORY: {
      const { sprintId, newStory } = action.payload

      // copySprintsMap()のために、空のMapを初期設定する
      newStory.tasks = new Map()
      
      const copiedSprints = copySprintsMap(state.sprints)

      copiedSprints.get(sprintId).stories.set(newStory.storyId, newStory)

      return { ...state, sprints: copiedSprints}
    }
    case Types.SWITCH_SPRINT: {
      const { sprintId } = action.payload

      return {...state, currentSprint: state.sprints.get(sprintId)}
    }
    case Types.CHANGE_SORT_ORDER: {
      // CHANGE_TASK_STATUSと同様の理由で、DBへの永続化が完了する前に、先行して新しいソート順をstateに反映させる。
      const { sprintId, storyId, taskId, newIndex } = action.payload

      const copiedSprints = copySprintsMap(state.sprints)

      const tasks = copiedSprints.get(sprintId).stories.get(storyId).tasks

      // 現在のステータス
      const currentStatus = tasks.get(taskId).taskStatus

      // 新たな表示位置を指定
      tasks.get(taskId).sortOrder = newIndex

      // タスク順を再設定する
      Array.from(tasks.values())
        .filter(task => task.taskStatus === currentStatus)
        .sort((a, b) => {
          // ユーザーにより変更されたタスクを優先的に前に並べる
          if(a.sortOrder === b.sortOrder && a.taskId === taskId) return -1;
          
          // その他の場合は単純に昇順に並べる
          return a.sortOrder - b.sortOrder
        })
        .forEach((task, index) => (task.sortOrder = index))

      return { ...state, sprints: copiedSprints, currentSprint: copiedSprints.get(sprintId)}
    }
    case Types.CHANGE_TASK_STATUS: {
      // TODO: 新ステータスやソート順の反映をAPIだけで実現できないか。APIとフロントエンドで重複した処理ができている。

      /*
      DBへの永続化が完了する前に、先行して新ステータスをstateに反映させる。
      先行して反映させないと、タスクのオブジェクトが旧ステータスの位置に一瞬だけ戻ってしまう。
      */
      const { sprintId, storyId, taskId, newStatus, newIndex } = action.payload

      const copiedSprints = copySprintsMap(state.sprints)

      const tasks = copiedSprints.get(sprintId).stories.get(storyId).tasks

      const oldStatus = tasks.get(taskId).taskStatus

      // ステータス変更
      tasks.get(taskId).taskStatus = newStatus

      // 新ステータスでの表示位置を指定
      tasks.get(taskId).sortOrder = newIndex

      // ステータスごとにタスク順を再設定する
      // 　1. 変更前のステータス
      // 　　　　ステータス変更されたタスクが無くなると、抜け番ができる。その抜け番を詰める。
      Array.from(tasks.values())
        .filter(task => task.taskStatus === oldStatus)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .forEach((task, index) => (task.sortOrder = index))
      
      // 　2. 変更後のステータス
      Array.from(tasks.values())
        .filter(task => task.taskStatus === newStatus)
        .sort((a, b) => {
          // ステータス変更されたタスクを優先的に前に並べる
          if(a.sortOrder === b.sortOrder && a.taskId === taskId) return -1;
          
          // その他の場合は単純に昇順に並べる
          return a.sortOrder - b.sortOrder
        })
        .forEach((task, index) => (task.sortOrder = index))

      return { ...state, sprints: copiedSprints, currentSprint: copiedSprints.get(sprintId)}
      
    }
    case Types.SET_ADDED_TASKS: {
      const { sprintId, storyId, newTasks } = action.payload
      
      const copiedSprints = copySprintsMap(state.sprints)

      const tasks = copiedSprints.get(sprintId)
                          .stories.get(storyId)
                          .tasks

      newTasks.forEach(newTask => {tasks.set(newTask.taskId, newTask)});

      return { ...state, sprints: copiedSprints, currentSprint: copiedSprints.get(sprintId)}
      
    } default:
      return state
  }
}
