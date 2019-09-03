let setting = undefined
let endPoint = ""
const mode = "cors"
const credential = "omit"

export default class ApiCommon {
  static Method = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
  }

  static init(serverSetting) {
    // setting = serverSetting
    // endPoint = `${setting.url}/${setting.base}`
    endPoint = "/sprints"
  }

  static async get(path, jwt) {
    return doFetch(
      getApiUrl(path),
      getOption(jwt)
    )
  }

  static async post(path, request, jwt) {
    return doFetch(
      getApiUrl(path),
      getUpdateOption(ApiCommon.Method.POST, request, jwt)
    )
  }

  static async put(path, request, jwt) {
    return doFetch(
      getApiUrl(path),
      getUpdateOption(ApiCommon.Method.PUT, request, jwt)
    )
  }

  static async delete(path, request, jwt) {
    return doFetch(
      getApiUrl(path),
      getUpdateOption(ApiCommon.Method.DELETE, request, jwt)
    )
  }
}

const getApiUrl = (path) => {
  const apiUrl = `${endPoint}${path}`
  return apiUrl
}

const getOption = (jwt) => {
  const headers =  jwt
    ?
      new Headers({
        "Content-type": "application/json",
        "Authorization": `Bearer ${jwt}`
      })
    :
      new Headers({
        "Content-type": "application/json"
      })

  const option = {
    method: ApiCommon.Method.GET,
    mode: mode,
    credential: credential,
    headers
  }

  console.log(option)
  return option
}

const getUpdateOption = (method, request, jwt) => {
  const headers =  jwt
    ?
      new Headers({
        "Content-type": "application/json",
        "Authorization": `Bearer ${jwt}`
      })
    :
      new Headers({
        "Content-type": "application/json"
      })

  const option = {
    method: method,
    mode: mode,
    credential: credential,
    headers,
    body: JSON.stringify(request),
  }
  return option
}

const doFetch = async (path, option) => {
  let ok = false
  let status = -1
  console.debug("API-request:", path, option)
  return await fetch(
    path,
    option,
  ).then(response => {
    ok = response.ok
    status = response.status
    return response.text()
  }).then(text => {
    const json = (text !== "") ? JSON.parse(text) : {}
    console.debug("API-response:", path, status, { json })
    return { ok, status, json }
  }).catch(error => {
    console.debug("API-error:", path, { error })
    throw error
  })
}
