import Types from './signInTypes'

export default {

  signIn: payload => ({
    type: Types.SIGN_IN,
    payload
  })
  
}
