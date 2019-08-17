import axios from 'axios'

import userEnv from 'userEnv';

export default new axios.create({
  baseURL: userEnv.apiUrl
})
