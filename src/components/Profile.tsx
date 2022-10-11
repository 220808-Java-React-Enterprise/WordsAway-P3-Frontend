import React, { useState, useEffect } from 'react'
import { AxiosResponse } from 'axios'
import { Opponent } from '../types/Opponent.type'
import { User } from '../types/User.type'
import WORDS_API from '../utils/ApiConfig'
import gear4 from '../components/icons/gear4.png'
import '../css/Profile.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { updateShorthandPropertyAssignment } from 'typescript'

export default function Profile() {
  const [profileUser, setProfileUser] = useState<User>()
  const [isShown2, setIsShown2] = useState(false)
  const [userFriends, setUserFriends] = useState<User[]>([])
  const [userOutgoing, setUserOutgoing] = useState<User[]>([])
  const [theme, getTheme] = useState('')
  var friends: { outgoingRequests: any[]; incomingRequests: any[]; friends: any[] } = {
    outgoingRequests: [],
    incomingRequests: [],
    friends: []
  }
  let navigate = useNavigate()

  async function getUser(username: string | null) {
    
    if (username === null) {
      username = sessionStorage.getItem('username')
    }

    await WORDS_API.get('findUser', { params: { username: username } })
      .then((response: AxiosResponse) => {
        setProfileUser(response.data)
        //getFriends()
        //getMatches()
      })
      .catch((response) => console.log(response))
    
  }

  useEffect(() => {
    let username = sessionStorage.getItem('profileUsername')
      ? sessionStorage.getItem('profileUsername')
      : sessionStorage.getItem('username')

    getUser(username)
    getTheme(localStorage.getItem('theme') || 'light')
    //getFriends()
    //getMatches()
  }, [])

  useEffect(() => {
    
    getFriends()
    getMatches()
  }, [profileUser])

  async function getFriends() {
    await WORDS_API.get('/getFriendsList')
      .then((response: AxiosResponse<User[]>) => {
        const test = JSON.parse(JSON.stringify(response.data))
        setUserOutgoing(test.outgoingRequests)
        setUserFriends(test.friends)

        //setUserFriends(response.data);

        

      })
      .catch(() => (window.location.href = '/login'))
  }

  async function getMatches() {

    
    await WORDS_API.get('/gameHistory', {
      params: {
        username: profileUser?.username
      }
    })
  .then((response) => {
    console.log(JSON.stringify(response.data));
    console.log(profileUser?.username);
    console.log("username")
    
    sessionStorage.removeItem('profileUsername');
  })
  .catch(() => (console.log("broke")))
  
  
 


  }

  async function addFriend() {
    await WORDS_API.post(
      'addFriend',
      {},
      {
        params: { username: profileUser?.username }
      }
    )
      .then((response) => {
        console.log(profileUser?.username)
        window.location.reload()
      })
      .catch((response) => alert(response))
  }

  async function removeFriend() {
    await WORDS_API.post(
      'removeFriend',
      {},
      {
        params: { username: profileUser?.username }
      }
    )
      .then((response) => {
        window.location.reload()
      })
      .catch((response) => alert(response))
  }

  function removeFriendPrompt() {
    setIsShown2(true)
    console.log('UNFRIEND Pending')
  }

  async function cancelRequest() {
    await WORDS_API.post(
      'cancelFriend',
      {},
      {
        params: { username: profileUser?.username }
      }
    )
      .then((response) => {
        window.location.reload()
      })
      .catch((response) => alert(response))
  }

  useEffect(() => {
    getTheme(localStorage.getItem('theme') || 'light')
  }, [])

  function gosettings() {
    navigate('/settings')
    window.location.reload()
  }


  return (
    <div className='profile' data-theme={theme}>
      <div className='topholder'>
        <div className='icon'>
          {profileUser?.avatar == 0 ? (
            <img alt=':(' src={'images/icon0.png'}></img>
          ) : profileUser?.avatar ? (
            <img alt=':(' src={'images/icon' + profileUser.avatar.toString() + '.png'}></img>
          ) : (
            <></>
          )}
        </div>

        <div className='intro'>
          <div className='titleProf'>
            <h1>{profileUser?.username}</h1>
          </div>
        </div>
        <a href='#' onClick={gosettings}>
          {' '}
          <img className='gears' src={require('../components/icons/gear4.png')} />{' '}
        </a>
        <div className='addfriend'>
          {profileUser?.username == sessionStorage.getItem('username') ? (
            <></>
          ) : JSON.stringify(userFriends).includes(JSON.stringify(profileUser)) ? (
            <button onClick={removeFriendPrompt}>Remove Friend</button>
          ) : JSON.stringify(userOutgoing).includes(JSON.stringify(profileUser)) ? (
            <button onClick={cancelRequest}>Cancel Friend Request</button>
          ) : (
            <button onClick={addFriend}>Add Friend</button>
          )}
        </div>
      </div>

      <div className='rest'>
        <div className='history'>
          <div className='winrate'>
            {profileUser?.gamesPlayed == 0 ? (
              <h2>No Games Played!</h2>
            ) : (
              <h2>
                Games won: {profileUser?.gamesWon}/{profileUser?.gamesPlayed}
              </h2>
            )}
          </div>
          <h2>Recent Matches</h2>
          <div className='match'>
            <h3>PoliceLettuce v LoserGuy</h3>
            <h3 id='win'> Victory! </h3>
          </div>
          <div className='match'>
            <h3>PoliceLettuce v WinnerGuy</h3>
            <h3 id='lose'> Defeat! </h3>
          </div>
          <div className='match'>
            <h3>PoliceLettuce v LoserGuy</h3>
            <h3 id='win'> Victory! </h3>
          </div>
        </div>

        <div style={{ display: isShown2 ? 'flex' : 'none' }} id='removeConfirm'>
          <div>
            <div>
              Are You sure You want to delete {profileUser?.username} from your friends List?{' '}
              <div>
                <button
                  id='confirm-uf-yes'
                  onClick={() => {
                    removeFriend()
                    setIsShown2(false)
                  }}
                >
                  Yes
                </button>
                <button id='confirm-uf-no' onClick={() => setIsShown2(false)}>
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
