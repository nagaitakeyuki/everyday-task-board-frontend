import Actions from './loginActions'
import Types from './loginTypes'
import API from '../common/utils/api'

export default store => next => action => {
  const {dispatch} = store

  if (action.type === Types.LOGIN) {
    const params = action.payload

    fetch("/authenticate", {
      method: "post",
      body: Object.keys(params).map((key)=>key+"="+encodeURIComponent(params[key])).join("&"),
      headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded' })
    })
    .then((response) => {
      if (response.ok) {
        const jwt = response.headers.get("Authorization").substring(7)
        dispatch(Actions.setLoginUser({jwt}))
      }
      // TODO: エラーハンドリング
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  next(action)
}
