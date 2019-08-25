import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'

import Modal from '../../../common/component/Modal'
import BacklogCategory from './BacklogCategory'
import BacklogCategoryForm from './form/BacklogCategoryForm'
import Actions from '../sprintBacklogActions'


class BacklogColumn extends Component {

  state = {
    isOpenBacklogCategoryAdd: false
  }

  render() {
    const {backlogCategories, dispatch} = this.props

    const addBacklogCategory = (param) => {
      dispatch(Actions.addBacklogCategory(param))
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
        
          <Modal
            visible={this.state.isOpenBacklogCategoryAdd}
            onCancel={closeAddBacklogCategory}
            footer={null}
            destroyOnClose
            width={500}>
            <BacklogCategoryForm onSaveButtonClick={addBacklogCategory}/>
          </Modal>


      </div>
    )
  }
}

export default connect()(BacklogColumn)
