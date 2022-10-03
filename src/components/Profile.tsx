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
 console.log(profileUser?.username);
  
  async function addFriend(){
    await WORDS_API.post('addFriend', {
      params: { username: profileUser?.username }
    })
    .then((response) => {
      window.location.reload();
      
     
    })
    .catch((response) => alert(response))

    console.log("Friend added!");
  }

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
{profileUser?.username == sessionStorage.getItem("username") ? <></> : <button onClick={addFriend}>Add Friend</button>}

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





</div>

</div>
    
  )
}

