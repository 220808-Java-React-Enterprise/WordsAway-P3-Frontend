import { useEffect, useRef, useState } from 'react'
import MessageType from '../types/Message.type'
import ChatWindow from './chat/ChatWindow'
import Chat from './chat/Chat'

const SocketTest = () => {
  const connection = useRef<WebSocket>(new WebSocket('ws://localhost:9000'))
  const [chats, setChats] = useState<Chat[]>([])
  const username = window.sessionStorage.getItem('username')

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

  function startWebsocket() {
    if (!(connection && connection.current && connection.current.readyState === 1)) {
      connection.current = new WebSocket('ws://localhost:9000')
      connection.current.onopen = () => {
        while (connection.current.CONNECTING) {}
        connection.current.send(JSON.stringify({ user: username, id: '', type: MessageType.LOGIN, data: '' }))
        console.log('Websocket Opened.', connection.current)
      }
      connection.current.onclose = () => {
        console.log('Connection closed. Reconnecting.')
        setTimeout(startWebsocket, 5000)
      }
      connection.current.onmessage = (event) => {
        const message = JSON.parse(event.data)
        switch (message.type) {
          case MessageType.LOGIN:
            console.log('Logged in with server.')
            break
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
          default:
            console.log('Invalid MessageType.', message.type)
            break
        }
      }
      connection.current.onerror = (event) => {
        console.log(event)
      }
    }
  }

  useEffect(() => {
    startWebsocket()
  }, [])

  function startChat(user: string) {
    connection.current.send(JSON.stringify({ user: user, id: '', type: MessageType.START_CHAT, data: username }))
  }

  function sendMsg(message: string) {
    connection.current.send(message)
  }

  return (
    <>
      <button onClick={() => startChat('christhewizard')}>Start Chat with ChristheWizard</button>
      <div>
        {chats.map((m) => (
          <ChatWindow
            key={m.id}
            webSocket={connection.current}
            chatID={m.id}
            messages={getChat(m.id).messages}
            send={sendMsg}
          />
        ))}
      </div>
    </>
  )
}
export default SocketTest