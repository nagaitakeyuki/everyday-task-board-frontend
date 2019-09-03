import Types from './loginTypes'

export default {

  login: payload => ({
    type: Types.LOGIN,
    payload
  }),

  setLoginUser: payload => ({
    type: Types.SET_LOGIN_USER,
    payload
  })
}
