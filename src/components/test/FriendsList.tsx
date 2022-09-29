import React, { useState } from 'react'
import FAKEWORDS_API from '../../utils/FakeApiConfig'
import { AxiosResponse } from 'axios'
import { get } from 'https'

import '../../css/friendlist.css'

type Props = {}

const FriendsList = (props: Props) => {
    const [isShown, setIsShown] = useState(false);
    sessionStorage.setItem('username', "test")
    getFriends()
    function getFriends(){
        FAKEWORDS_API.get('getFriends')
            .then((response: AxiosResponse) => {
                sessionStorage.setItem('friends',JSON.stringify(response.data))
            })
    }

    function acceptFR(name:string){
        console.log("ACCEPT " + name)
    }
    function rejectFR(name: string){
        console.log("REJECT " + name)
    }
    function unfriend(name: string){
        console.log("UNFRIEND " + name)
    }

    const friends = JSON.parse(sessionStorage.friends)

    const friendslist = []
    const pendinglist = []
    for (let i = 0; i < friends.length; i++) {
        if (!friends[i].pending){
            friendslist.push(
                <div id='flrow' key={i}>
                    <div className='friend'>{friends[i].name}</div><button onClick={() => (acceptFR(friends[i].name))}>Accept</button><button onClick={() => (rejectFR(friends[i].name))}>Dismiss</button>
                </div>
            ) 
        }else{
            pendinglist.push(
                <div id='flrow' key={i}>
                    <div className='friend'>{friends[i].name}</div><button onClick={() => (unfriend(friends[i].name))}>Unfriend</button>
                </div>
            )
        }
    }


  return (
    <><div id='flall'>
          <div onClick={() => (setIsShown(!isShown))} id='fldiv' className='simple'>
                 
          </div>
          <div style={{ display: isShown ? 'flex' : 'none' }} id='floverlay'>
              <div className='frtitle'>Friend Requests</div>

              <div id='flcontainer'>
                  <div id='fl'></div>
                  {friendslist}
              </div>
              <div className='frtitle'>Friends</div>
              <div id='flpcontainer'>
                  <div id='fl'></div>
                  {pendinglist}
              </div>
          </div>         
      </div>
            
          
    </>
    
  )
}

export default FriendsList