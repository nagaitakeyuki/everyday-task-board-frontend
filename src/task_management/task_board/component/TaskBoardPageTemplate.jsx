import React from 'react'

import MainLayout from '../../../common/component/MainLayout'
import TaskBoardPage from './TaskBoardPage'

export default (props) => (
  <MainLayout>
    <TaskBoardPage {...props}/>
  </MainLayout>
)
