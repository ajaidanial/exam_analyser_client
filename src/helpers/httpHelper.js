import axios from 'axios'

export function triggerSimpleAjax(
  endpoint,
  method = 'get',
  data = {},
  params = {},
  headers = {
    'Content-Type': 'application/json'
  }
) {
  // append auth header only if it is present
  if (localStorage.getItem('auth_key', null)) {
    headers['Authorization'] = `Token ${localStorage.getItem('auth_key', null)}`
  }

  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: endpoint,
      baseURL: 'https://testing.ajaidanial.wtf/',
      headers: headers,
      params: params,
      data: data,
      withCredentials: true
    })
      .then((response) => {
        if ([200, 201, 204].includes(response.status)) {
          // successful response
          resolve(response.data)
        } else {
          // unhandled
          alert('Unhandled Success Response')
          reject(response)
        }

        // log data from server
        console.log(response, response.data)
      })
      .catch((error) => {
        let { response } = error

        if ([401, 403].includes(response.status)) {
          // user is unauthenticated
          if (localStorage.getItem('auth_key')) {
            localStorage.removeItem('auth_key')
            window.location.href = '/login'
          }
        } else if ([400, 406].includes(response.status)) {
          // bad request is sent to server
          reject(response.data)
        } else {
          // unhandled
          alert('Unhandled Error Response')
          reject(error)
        }

        // log data from server
        console.log(response, error)
      })
  })
}
