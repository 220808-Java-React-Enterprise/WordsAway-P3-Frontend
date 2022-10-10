import { AxiosResponse } from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import '../../css/FUser.css'
import WORDS_API from '../../utils/ApiConfig'
import { useNavigate } from 'react-router-dom'

const FindUser = () => {
  const navigate = useNavigate()

  const [findUsername, setFindUserName] = useState('')
  const [dataTable, setdataTable] = useState('')

  function updateData(FoundUser: String) {
    setdataTable(findUsername)
  }

  async function getUserByUserName(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await WORDS_API.get('/findUser', {
      params: {
        username: findUsername
      }
    })
      .then((response: AxiosResponse) => {
        let foundUser = response.data.username
        sessionStorage.setItem(foundUser, JSON.stringify(foundUser))
        updateData(foundUser)
      })
      .catch((error: { response: { data: { message: any } } }) => {
        alert(error.response.data.message)
      })
  }

  useEffect(() => {
    function updateData(FoundUser: String) {
      setdataTable(findUsername)
      console.log(dataTable)
    }
  }, [findUsername])

  function toProfile() {
    sessionStorage.setItem('profileUsername', dataTable)
    navigate('/profile')
    window.location.reload()
  }

  return (
    <div id='searchUser'>
      <form onSubmit={getUserByUserName}>
        <label>Find</label>
        <input
          id='userSearchBar'
          type='text'
          placeholder='Enter a Username'
          value={findUsername}
          onChange={(event) => {
            setFindUserName(event.target.value)
          }}
        />
        <input id='userButton' type='submit' value='Search User' />
      </form>

      <div id='dynamictab'>
        <table>
          <thead>
            <th>Username</th>
          </thead>
          <tbody>
            <tr>
              <a href='#' onClick={toProfile}>
                {dataTable}
              </a>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FindUser