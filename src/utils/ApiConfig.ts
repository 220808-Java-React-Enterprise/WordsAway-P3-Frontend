import axios, { AxiosRequestConfig } from 'axios'

//export const URL:string = 'http://backendcicd-env.eba-6jtmi298.us-east-1.elasticbeanstalk.com/wordsaway'
// export const URL:string = 'http://Wordsawayp3-env.eba-vv9ddjdz.us-east-1.elasticbeanstalk.com/wordsaway'
export const URL:string = 'http://localhost:8080/wordsaway'
const WORDS_API = axios.create({
  baseURL: URL,
  headers: {
    'Content-type': 'application/json'
  }
})

WORDS_API.interceptors.request.use(
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

export default WORDS_API
