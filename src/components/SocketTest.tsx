import { useEffect, useRef, useState } from 'react'
import MessageType from '../types/Message.type'
import ChatWindow from './chat/ChatWindow'
import Chat from './chat/Chat'

const URL = 'ws://backendcicd-env.eba-6jtmi298.us-east-1.elasticbeanstalk.com/wordsaway/chat'
//const URL = 'ws://localhost:8080/wordsaway/chat'

const SocketTest = () => {
  const connection = useRef<WebSocket>()
  const [waitingToReconnect, setWaitingToReconnect] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [chats, setChats] = useState<Chat[]>([])
  const username = window.sessionStorage.getItem('username')

  useEffect(() => {
    if (waitingToReconnect) return
    if (!connection.current) {
      const client = new WebSocket(URL)
      //while (client.CONNECTING) {}
      connection.current = client

      client.onopen = () => {
        setIsOpen(true)
        client.send(JSON.stringify({ user: username, id: '', type: MessageType.LOGIN, data: '' }))
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
      }

      client.onmessage = (event) => {
        const message = JSON.parse(event.data)
        switch (message.type) {
          case MessageType.LOGIN:
            console.log('Logged in with server.')
            break
          case MessageType.START_CHAT:
          case MessageType.START_CHAT_ACK:
            getChat(message.id)
            setChats([...chats])
            break
          case MessageType.MESSAGE:
            const chat = getChat(message.id)
            chat.messages.push(message.data)
            setChats([...chats])
            break
          case MessageType.LEAVE_CHAT_ACK:
            chats.splice(chats.indexOf(getChat(message.id)), 1)
            setChats([...chats])
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
        console.log(client.readyState)
        console.log('Cleanuping up Dead Socket.')
        connection.current = undefined
        client.close()
      }
    }
  }, [waitingToReconnect])

  function getChat(id: string) {
    var chat
    chats.forEach((c) => {
      if (c.id === id) chat = c
    })
    if (chat === undefined) {
      chat = new Chat(id)
      chats.push(chat)
    }
    return chat
  }

  function startChat(user: string) {
    connection.current?.send(JSON.stringify({ user: user, id: '', type: MessageType.START_CHAT, data: username }))
  }

  function sendMsg(message: string) {
    connection.current?.send(message)
  }

  return (
    <>
      <h2>Websocket {isOpen ? 'Connected' : 'Disconnected'}</h2>
      {waitingToReconnect && <p>Reconnecting momentarily...</p>}
      <button onClick={() => startChat('tahg')}>Start Chat with ChristheWizard</button>
      <div>
        {chats.map((m) => (
          <ChatWindow key={m.id} chatID={m.id} messages={getChat(m.id).messages} send={sendMsg} />
        ))}
      </div>
    </>
  )
}
export default SocketTest
