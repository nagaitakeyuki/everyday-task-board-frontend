import $http from './http'

export default class {
  constructor(resource) {
    this.resource = resource
  }

  async ajax({type = 'get', path = '', body = null}) {
    await fetch(this.resource + path, {
      method: type,
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(body)
    }).then(response => {


    }) 




    const {data} = await $http[type](this.resource + path, body)
    return data
  }

  async get(path = '') {
    fetch()
    return await this.ajax({path})
  }

  async put(body, path = '') {
    return await this.ajax({type: 'put', body, path})
  }

  async post(body, path = '') {
    return await this.ajax({type: 'post', body, path})
  }

  async delete(path) {
    return await this.ajax({type: 'delete', path})
  }
}
