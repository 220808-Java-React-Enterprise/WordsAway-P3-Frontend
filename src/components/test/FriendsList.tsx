import { useState } from 'react'
import { AxiosResponse } from 'axios'
import MessageType from '../../types/Message.type'
// import { ReactComponent as UserSVG } from '../icons/user-solid.svg'
// import { ReactComponent as CheckSVG } from '../icons/check-solid.svg'
// import { ReactComponent as XMarkSVG } from '../icons/xmark-solid.svg'
// import { ReactComponent as TrashSVG } from '../icons/trash-can-solid.svg'

import '../../css/chatWindow.css'
import '../../css/friendlist.css'
import WORDS_API from '../../utils/ApiConfig'
import Chat from '../chat/Chat'
import ChatWindow from '../chat/ChatWindow'
//import internal from 'stream'

type Props = {
  chats: Chat[]
  sendMSG: (params: string) => any
}

const FriendsList = ({ chats, sendMSG }: Props) => {
  const [isShown, setIsShown] = useState(false)
  const [isShown2, setIsShown2] = useState(false)
  const [isShown3, setIsShown3] = useState(false)
  const [unfriendName, setUnfriendName] = useState('')
  const friendslist: any = []
  const pendinglist: any = []
  var friends: { outgoingRequests: any[]; incomingRequests: any[]; friends: any[] } = {
    outgoingRequests: [],
    incomingRequests: [],
    friends: []
  }
  const username = window.sessionStorage.getItem('username')

  //TODO make one chat visable at a time maybe using this number as an id
  //const [chatVisible, setChatVisible] = useState<number | null>(null)

  async function getFriends() {
    await WORDS_API.get('getFriendsList')
      .then((response: AxiosResponse) => {
        sessionStorage.setItem('friends', JSON.stringify(response.data))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function populateList() {
    friends = JSON.parse(sessionStorage.friends)

    for (let i = 0; i < friends.incomingRequests.length; i++) {
      pendinglist.push(
        <div id='flrow' key={'IR' + i}>
          <div className='friend'>{friends.incomingRequests[i].username}</div>
          <button id='acceptfr' onClick={() => acceptFR(friends.incomingRequests[i].username)}>
            {/* <CheckSVG style={{ fill: 'green', height: '90%' }} /> */}✔
          </button>
          <button id='rejectfr' onClick={() => rejectFR(friends.incomingRequests[i].username)}>
            {/* <XMarkSVG style={{ fill: 'red', height: '90%' }} /> */}✘
          </button>
        </div>
      )
    }
    for (let i = 0; i < friends.friends.length; i++) {
      friendslist.push(
        <div id='flrow' key={'F' + i}>
          <div className='friend'>{friends.friends[i].username}</div>
          <button id='deletefr' onClick={() => unfriendprompt(friends.friends[i].username)}>
            {/* <TrashSVG style={{ fill: 'red', height: '80%' }} /> */}
            <p>🗑️</p>
          </button>
          <button
            className='startchat'
            onClick={() =>
              sendMSG(
                JSON.stringify({
                  user: friends.friends[i].username,
                  id: '',
                  type: MessageType.START_CHAT,
                  data: username
                })
              )
            }
          >
            <p>✉</p>
          </button>
        </div>
      )
    }
  }

  async function acceptFR(name: string) {
    console.log('ACCEPT ' + name)
    const params = { username: name }
    WORDS_API.post('addFriend', {}, { params }).catch((error) => {
      console.log(error)
    })
  }

  function rejectFR(name: string) {
    console.log('REJECT ' + name)
  }
  function unfriendprompt(name: string) {
    setIsShown2(true)
    console.log('UNFRIEND Pending' + name)
    setUnfriendName(name)
  }

  function unfriend(name: string) {
    const params = { username: unfriendName }
    WORDS_API.post('removeFriend', {}, { params })
  }

  getFriends()
  populateList()

  return (
    <>
      
      <div id='fl-invis' style={{ display: isShown3 || isShown ? 'block' : 'none' }} onClick={() => {setIsShown3(false);setIsShown(false)}} />
      <div id='flall2'>
        <div id='chat-c1'>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {chats.map((m) => (
              <div style={{ display: isShown3 ? 'flex' : 'none' }} id='floverlay2'>
                <ChatWindow key={m.id} chatID={m.id} messages={m.messages} sendMSG={sendMSG} />
              </div>
            ))}
          </div>
        </div>
        <div
          style={{ borderRadius: isShown3 ? '0rem 0rem 1rem 1rem' : '1rem' }}
          onClick={() => {setIsShown3(!isShown3); if (isShown)setIsShown(false)}}
          id='fldiv2'
          className='simple'
        >
          {/* <UserSVG style={{ height: '55%', margin: 'auto', fill: ((pendinglist.length > 0) ? 'red' : 'white') }} /> */}
          <p className='emoji'>💬</p>
        </div>
      </div>
      
      <div id='flall'>
        <div style={{ display: isShown ? 'flex' : 'none' }} id='floverlay'>
          <div style={{ height: '30%', display: pendinglist.length > 0 ? 'block' : 'none' }}>
            <div className='frtitle'>Friend Requests</div>
            <div id='flpcontainer'>{pendinglist}</div>
          </div>
          <div style={{ height: pendinglist.length > 0 ? '65%' : '100%' }}>
            <div className='frtitle'>Friends</div>
            <div id='flcontainer'>{friendslist}</div>
          </div>
        </div>
        <div
          style={{ borderRadius: isShown ? '0rem 0rem 1rem 1rem' : '1rem' }}
          onClick={() => { setIsShown(!isShown); setIsShown3(false) }}
          id='fldiv'
          className='simple'
        >
          {/* <UserSVG style={{ height: '55%', margin: 'auto', fill: ((pendinglist.length > 0) ? 'red' : 'white') }} /> */}
          <p className='emoji'>🧙</p>
        </div>
      </div>
      <div style={{ display: isShown2 ? 'flex' : 'none' }} id='flconfirm'>
        <div>
          <div>
            Are You sure You want to delete {unfriendName} from your friends List?{' '}
            <div>
              <button
                id='confirm-uf-yes'
                onClick={() => {
                  unfriend(unfriendName)
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
    </>
  )
}

export default FriendsList
