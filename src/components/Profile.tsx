import React, { useState, useEffect } from 'react'
import { AxiosResponse } from 'axios'
import { User } from '../types/User.type'
import WORDS_API from '../utils/ApiConfig'

import '../css/Profile.css'

const Profile = () => {
 

  return (
    <div className ="profile">

<div className ="topholder">
<div className  = "icon">
<img alt=":(" src="lancer.png"></img>
</div>

<div className  = "intro">
<div className  = "title">
<h1>PoliceLettuce</h1>
</div>
</div>
</div>



<div className="rest">
<div className="history">
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
export default Profile
