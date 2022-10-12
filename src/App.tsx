import { useEffect, useState, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Game from './components/Game'
import Lobby from './components/Lobby'
import FindUser from './components/test/FindUser'
import Profile from './components/Profile'
import Navbar from './components/Navbar'
import FriendsList from './components/test/FriendsList'
import Rules from './components/Rules'
import SettingsPage from './components/Settings'
import MessageType from './types/Message.type'
import Chat from './types/Chat'

function App() {
  const connection = useRef<WebSocket>()
  const [waitingToReconnect, setWaitingToReconnect] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [chats, setChats] = useState<Chat[]>([])
  const username = window.sessionStorage.getItem('username')
  const WS_URL = 'ws://backendcicd-env.eba-6jtmi298.us-east-1.elasticbeanstalk.com/wordsaway/chat'
  //const WS_URL = 'ws://localhost:8080/wordsaway/chat'

  var [theme, getTheme] = useState('')
  useEffect(() => {
    getTheme(localStorage.getItem('theme') || 'light')
  }, [])

  useEffect(() => {
    setupWebSocket()
  }, [])

  function setupWebSocket() {
    if (!connection.current) {
      const client = new WebSocket(WS_URL)
      connection.current = client

      client.onopen = () => {
        setIsOpen(true)
        setWaitingToReconnect(false)
        sendMSG(JSON.stringify({ user: username, id: '', type: MessageType.LOGIN, data: '' }))
        console.log('Websocket Opened.', connection.current)
      }

      client.onclose = () => {
        if (connection.current) {
          console.log('Connection closed by Server.')
        } else {
          console.log('Connection closed by app component unmount.')
          return
        }
        if (waitingToReconnect) return
        setIsOpen(false)
        setWaitingToReconnect(true)
        setupWebSocket()
      }

      client.onmessage = (event) => {
        const message = JSON.parse(event.data)
        switch (message.type) {
          case MessageType.NOTIFICATION:
            alert(message.data)
            break
          case MessageType.LOGIN:
            console.log('Logging in with server.')
            break
          case MessageType.LOGIN_ACK:
            console.log('Logged in with server.')
            break
          case MessageType.START_CHAT:
          case MessageType.START_CHAT_ACK: {
            const chat = new Chat(message.id)
            chat.messages.push('Chat started with users: ' + message.data)
            //chat.messages = [...chat.messages, 'Chat started with users: ' + message.data]
            setChats([...chats, chat])
            break
          }
          case MessageType.MESSAGE: {
            const chat = getChat(message.id)
            chat.messages = [...chat.messages, message.user + ': ' + message.data]
            setChats([...chats])
            break
          }
          case MessageType.ADD_USER_ACK: {
            const chat = getChat(message.id)
            chat.messages = [...chat.messages, message.data + ' joined the chat.']
            setChats([...chats])
            break
          }
          case MessageType.LEAVE_CHAT_ACK:
            break
          case MessageType.ERROR:
            console.log(message)
            break
          default:
            console.log('Invalid MessageType.', message.type)
            break
        }
      }

      client.onerror = (event) => {
        console.log(event)
      }

      return () => {
        console.log('Cleanuping up Dead Socket.')
        connection.current = undefined
        client.close()
      }
    }
  }

  //TODO replace this with a map and useImmer
  function getChat(id: string) {
    var chat
    chats.forEach((c) => {
      if (c.id === id) chat = c
    })
    if (chat === undefined) {
      chat = new Chat(id)
      chats.push(chat)
      setChats([...chats])
    }
    return chat
  }

  function sendMSG(message: string) {
    let mts = JSON.parse(message)
    if (mts.type === MessageType.LEAVE_CHAT) {
      setChats(chats.filter((item) => item.id !== mts.id))
    } else if (mts.type === MessageType.MESSAGE) {
      const chat = getChat(mts.id)
      chat.messages.push(mts.user + ': ' + mts.data)
      setChats([...chats])
    } else if (mts.type === MessageType.ADD_USER) {
      const chat = getChat(mts.id)
      chat.messages.push(mts.user + ' requested that ' + mts.data + ' join the chat.')
      setChats([...chats])
    }
    sendToServer(message)
  }

  function sendToServer(message: string) {
    if (connection.current?.readyState === 1) connection.current.send(message)
    else {
      setTimeout(() => {
        sendToServer(message)
      }, 100)
    }
  }

  return (
    <div className='container' data-theme={theme}>
      <BrowserRouter>
        {sessionStorage.getItem('username') && (
          <>
            <Navbar />
            <FriendsList sendMSG={sendMSG} chats={chats} />
          </>
        )}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/rules' element={<Rules />} />
          <Route path='/lobby' element={<Lobby />} />
          <Route path='/game' element={<Game />} />
          <Route path='/finduser' element={<FindUser />} />
          <Route path='/settings' element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
