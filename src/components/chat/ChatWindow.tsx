import { useState } from 'react'
import MessageType from '../../types/Message.type'
import '../../css/chatWindow.css'

interface ChatProp {
  chatID: string
  messages: string[]
  sendMSG: (params: string) => any
}

const ChatWindow = ({ chatID, messages, sendMSG }: ChatProp) => {
  const [message, setMessage] = useState('')
  const [friend, setFriend] = useState('')
  const [currentChat, setCurrentChat] = useState('')
  const username = window.sessionStorage.getItem('username')
  var i = 0

  function sendMsg(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    sendMSG(JSON.stringify({ user: username, id: chatID, type: MessageType.MESSAGE, data: message }))
    setMessage('')
  }


  function addUser(playerToAdd: string) {
    sendMSG(JSON.stringify({ user: username, id: chatID, type: MessageType.ADD_USER, data: playerToAdd }))
    alert('Added ' + friend + ' to the chat!')
  }

  function leaveChat() {
    sendMSG(JSON.stringify({ user: username, id: chatID, type: MessageType.LEAVE_CHAT, data: '' }))
    alert('You left the chat!')
  }



  return (
    <>
      <button className='leavebutton' onClick={() => leaveChat()}>
        <p>❌</p>
      </button>
      <h2 className='chatheader'>Chat{currentChat}</h2>
      <div>
        <input
          className='friendfind'
          type='text'
          value={friend}
          placeholder='add friend to chat!'
          onChange={(event) => setFriend(event.target.value)}
        ></input>
        <button className='addpal' onClick={() => addUser(friend)}>
          Add Pal!
        </button>
      </div>
      <form onSubmit={sendMsg}>
        <div className='allmessage'>
          {messages.map((m) => (
            <h3 key={i++}>{m}</h3>
          ))}
        </div>
        <input
          className='ourmessage'
          type='text'
          value={message}
          placeholder='Message'
          onChange={(event) => setMessage(event.target.value)}
        />
        <br />
        <button type='submit' className='form-button'>
          <p>Send</p>
        </button>
      </form>
    </>
  )
}
export default ChatWindow
