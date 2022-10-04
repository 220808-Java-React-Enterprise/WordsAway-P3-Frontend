import React from 'react'
import WORDS_API from '../utils/ApiConfig'

const Home = () => {
  WORDS_API.get('auth')
  .then((response) => {
    window.location.href = '/lobby'
  })
  .catch((response) => {
    window.location.href = '/login'
  })
  return <div />
}

export default Home
