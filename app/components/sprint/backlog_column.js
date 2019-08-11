import React, {Fragment} from 'react'

import BacklogCategory from './backlog_category'

export default ({backlogCategories}) => (
  <div style={{display: "flex", flexDirection: "column", width: "50%" }}>
    <div style={{margin: "8px"}}>
        <img src="../resource/plus.png" style={{cursor: "pointer"}}/>
        <span style={{verticalAlign: "middle"}}>バックログ</span>
    </div>

    {backlogCategories.size > 0 ? (
        <Fragment >
          {
            Array.from(backlogCategories.values())
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map(backlogCategory => (
                <BacklogCategory backlogCategory={backlogCategory} key={backlogCategory.backlogCategoryId}/>
            ))
          }
        </Fragment>
      ) : null}
  </div>
)