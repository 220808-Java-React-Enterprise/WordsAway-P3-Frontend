import axios, { AxiosRequestConfig } from 'axios'

export const URL: string = 'http://localhost:5000'
//export const URL:string = 'http://localhost:8080/wordsaway'

const FAKEWORDS_API = axios.create({
  baseURL: URL,
  headers: {
    'Content-type': 'application/json'
  }
})

FAKEWORDS_API.interceptors.request.use(
  function (request: AxiosRequestConfig) {
    if (request !== undefined && request.headers !== undefined) {
      let token = sessionStorage.getItem('token')
      if (token !== null) request.headers['Authorization'] = token
    }
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default FAKEWORDS_API
