import React from 'react'

import MainLayout from '../../../common/component/MainLayout'
import SprintBacklogPage from './SprintBacklogPage'

export default ({isClosedView}) => (
  <MainLayout>
    <SprintBacklogPage isClosedView={isClosedView} />
  </MainLayout>
)
