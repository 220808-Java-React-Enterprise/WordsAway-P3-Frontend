import { useState } from 'react'
import MessageType from '../../types/Message.type'

interface ChatProp {
  chatID: string
  messages: string[]
  sendMSG: (params: string) => any
}

const ChatWindow = ({ chatID, messages, sendMSG }: ChatProp) => {
  const [message, setMessage] = useState('')
  const username = window.sessionStorage.getItem('username')
  var i = 0

  function sendMsg(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    sendMSG(JSON.stringify({ user: username, id: chatID, type: MessageType.MESSAGE, data: message }))
    setMessage('')
  }

  function addUser(playerToAdd: string) {
    sendMSG(JSON.stringify({ user: username, id: chatID, type: MessageType.ADD_USER, data: playerToAdd }))
  }

  function leaveChat() {
    sendMSG(JSON.stringify({ user: username, id: chatID, type: MessageType.LEAVE_CHAT, data: '' }))
  }

  return (
    <>
      <button onClick={() => addUser('tahg')}>Add tahg to Chat</button>
      <button onClick={() => leaveChat()}>Leave Chat</button>
      <form onSubmit={sendMsg}>
        <div>
          {messages.map((m) => (
            <h3 key={i++}>{m}</h3>
          ))}
        </div>
        <input type='text' value={message} placeholder='Message' onChange={(event) => setMessage(event.target.value)} />
        <br />
        <button type='submit' className='form-button'>
          Send
        </button>
      </form>
    </>
  )
}
export default ChatWindow