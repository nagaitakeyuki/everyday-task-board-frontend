import BaseAPI from './BaseAPI'

const sprints = new BaseAPI('/sprints')
const book = new BaseAPI('/books')

export default {
  sprints,
  book
}
