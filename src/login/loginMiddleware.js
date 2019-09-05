import Actions from './loginActions'
import Types from './loginTypes'
import ApiCommon from '../common/utils/api/apiCommon';

export default store => next => action => {
  const {dispatch} = store

  if (action.type === Types.LOGIN) {
    ; (async () => {
      const params = action.payload

      const response =  await ApiCommon.post("/authenticate", params, {
        body: Object.keys(params).map((key)=>key+"="+encodeURIComponent(params[key])).join("&"),
        headers : new Headers({"Content-type" : "application/x-www-form-urlencoded" })
      })
  
      if (response.ok) {
        dispatch(Actions.setLoginUser(response.json))
      } else {
        console.log("ログイン失敗")
      }
    })()
  }

  if (action.type === Types.GET_LOGIN_USER) {
    ; (async () => {
      const response =  await ApiCommon.get("/user/loginUser")
  
      if (response.ok) {
        dispatch(Actions.setLoginUser(response.json))
      } else {
        dispatch(Actions.markNotLoggedInYet())
      }
    })()
  }


  next(action)
}
