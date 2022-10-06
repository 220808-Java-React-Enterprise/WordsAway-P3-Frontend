import React, { useState, useEffect } from 'react'
import { AxiosResponse } from 'axios'
import { Opponent } from '../types/Opponent.type'
import { User } from '../types/User.type'
import WORDS_API from '../utils/ApiConfig'

import '../css/Profile.css'

interface UserProp{
  profileUser: User | null;
}


export default function Profile({profileUser}: UserProp){
 const [users, setUsers] = useState<User[]>([]);
 const [isShown2, setIsShown2] = useState(false);
 const [unfriendName, setUnfriendName] = useState("")
 var friends: { outgoingRequests: any[], incomingRequests: any[], friends: any[] } = { outgoingRequests: [], incomingRequests: [], friends: []}

 useEffect(() => {
  getFriends()
}, [])
  
async function getFriends() {
  await WORDS_API.get('/getFriendsList')
  .then((response: AxiosResponse<User[]>) => {
    console.log(response.data)
    setUsers(response.data)
    sessionStorage.setItem('friends', JSON.stringify(response.data))
    
    console.log(friends)
    
  })
  .catch(() => (window.location.href = '/login'))
}

  async function addFriend(){
    console.log(profileUser?.username);
    await WORDS_API.post('addFriend',{}, {
      params: { username: profileUser?.username } 
    })
    .then((response) => {
      window.location.reload();
    })
    .catch((response) => alert(response))

  }

  async function removeFriend(){
    console.log(profileUser?.username);
    await WORDS_API.post('removeFriend',{}, {
      params: { username: profileUser?.username } 
    })
    .then((response) => {
      window.location.reload();
    })
    .catch((response) => alert(response))

  }


  function removeFriendPrompt() {
    setIsShown2(true)
    console.log("UNFRIEND Pending");
}

  async function cancelRequest(){
    console.log(profileUser?.username);
    await WORDS_API.post('cancelFriend',{}, {
      params: { username: profileUser?.username } 
    })
    .then((response) => {
      window.location.reload();
    })
    .catch((response) => alert(response))

  }
  friends = JSON.parse(sessionStorage.friends)
  console.log("prof: " + JSON.stringify(profileUser))
  console.log("requests: " + friends?.outgoingRequests)
  console.log("status: " + friends.outgoingRequests.includes(profileUser))
  return (
    <div className ="profile">

<div className ="topholder">
<div className  = "icon">
<img alt=":(" src="images/lancer.png"></img>
</div>

<div className  = "intro">
<div className  = "titleProf">
<h1>{profileUser?.username}</h1>
</div>


</div>

<div className = "addfriend">
{profileUser?.username == sessionStorage.getItem("username") ? <></> : JSON.stringify(friends?.friends).includes(JSON.stringify(profileUser)) ? <button onClick={removeFriendPrompt}>Remove Friend</button> : JSON.stringify(friends?.outgoingRequests).includes(JSON.stringify(profileUser)) ? <button onClick={cancelRequest}>Cancel Friend Request</button> : <button onClick={addFriend}>Add Friend</button> }

</div>
</div>



<div className="rest">



<div className="history">
<div className = "winrate">
{ profileUser?.gamesPlayed == 0 ? <h2>No Games Played!</h2> : <h2>Games won: {profileUser?.gamesWon}/{profileUser?.gamesPlayed}</h2> }
</div>
<h2>Recent Matches</h2>
<div className="match">
<h3>PoliceLettuce v LoserGuy</h3>
<h3 id="win"> Victory! </h3>
</div>
<div className="match">
<h3>PoliceLettuce v WinnerGuy</h3>
<h3 id="lose"> Defeat! </h3>
</div>
<div className="match">
<h3>PoliceLettuce v LoserGuy</h3>
<h3 id="win"> Victory! </h3>
</div>
</div>

<div style={{ display: (isShown2) ? 'flex' : 'none' }} id='removeConfirm'>
                <div>
                    <div>Are You sure You want to delete {profileUser?.username} from your friends List? <div><button id='confirm-uf-yes' onClick={() => { removeFriend(); setIsShown2(false) }}>Yes</button><button id='confirm-uf-no' onClick={() => (setIsShown2(false))}>No</button></div></div>
                </div>
            </div>  



</div>

</div>
    
  )
}

