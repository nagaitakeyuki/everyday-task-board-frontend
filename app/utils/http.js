import axios from 'axios'

export default new axios.create({
  baseURL: 'http://127.0.0.1:8080'
})
