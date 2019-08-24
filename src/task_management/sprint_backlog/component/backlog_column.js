import React, {Component, Fragment} from 'react'
import ReactModal from 'react-modal'
import { connect } from 'react-redux'

import BacklogCategory from './backlog_category'
import Actions from '../sprint_backlog_actions'


class BacklogColumn extends Component {

  state = {
    isOpenBacklogCategoryAdd: false
  }

  render() {
    const {backlogCategories, dispatch} = this.props

    let backlogCategoryNameEl
    const autofocus = () => {
      backlogCategoryNameEl.focus()
    }

    const addBacklogCategory = () => {
      dispatch(Actions.addBacklogCategory({backlogCategoryName: backlogCategoryNameEl.value}))
      closeAddBacklogCategory()
    }

    const closeAddBacklogCategory = () => {
      this.setState({isOpenBacklogCategoryAdd: false})
    }

    return (
      <div style={{display: "flex", flexDirection: "column", width: "50%" }}>
        <div style={{margin: "8px"}}>
            <img src="imgs/plus.png" style={{cursor: "pointer"}}
                  onClick={() => this.setState({isOpenBacklogCategoryAdd: true})}/>
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
        
          <ReactModal 
              isOpen={this.state.isOpenBacklogCategoryAdd}
              onAfterOpen={autofocus}
              onRequestClose={() => closeAddBacklogCategory()}
              style={{content: {marginLeft: "auto", marginRight: "auto",  width: "600px", height: "200px"}}}>
      
              <img src="imgs/cross.png"
                  onClick={() => closeAddBacklogCategory()}
                  style={{ position: "absolute", right: "10px", top: "10px", cursor: "pointer" }} />
      
              <p>バックログカテゴリーを追加する</p>
              <div className="form-group">
                  <input type="text" name="backlogCategoryName" className="form-control" ref={el => backlogCategoryNameEl = el }/>
              </div>
              <div className="form-actions clearfix">
                  <button type="button" className="btn btn-secondary float-right" onClick={() => addBacklogCategory()}>追加</button>
              </div>
      
            </ReactModal>

      </div>
    )
  }
}

export default connect()(BacklogColumn)
