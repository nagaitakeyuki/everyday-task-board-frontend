import axios from 'axios'

export default new axios.create({
  baseURL: process.env.REACT_APP_API_URL
})
