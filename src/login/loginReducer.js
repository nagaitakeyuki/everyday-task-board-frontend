import Types from './loginTypes'

const initState = {
  jwt: undefined
}

export default (state = initState, action) => {
  switch (action.type) {
    case Types.SET_LOGIN_USER: {
      const { jwt } = action.payload

      return { ...state, jwt }
    }
    default:
      return state
  }
}
