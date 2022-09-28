import React, { useState } from 'react'
import FAKEWORDS_API from '../../utils/FakeApiConfig'
import { AxiosResponse } from 'axios'
import { get } from 'https'

import '../../css/friendlist.css'

type Props = {}

const FriendsList = (props: Props) => {
    const [isShown, setIsShown] = useState(false);
    getFriends()
    function getFriends(){
        FAKEWORDS_API.get('getFriends')
            .then((response: AxiosResponse) => {
                sessionStorage.setItem('friends',JSON.stringify(response.data))
            })
    }

    const friends = JSON.parse(sessionStorage.friends)

    const friendslist = []
    const pendinglist = []
    for (let i = 0; i < friends.length; i++) {
        if (!friends[i].pending){
            friendslist.push(
                <div id='flrow'>
                    <div className='friend'>{friends[i].name}</div><button>Accept</button><button>Dismiss</button>
                </div>
            ) 
        }else{
            pendinglist.push(
                <div id='flrow'>
                    <div className='friend'>{friends[i].name}</div><button>Chat</button><button>Unfriend</button>
                </div>
            )
        }
    }


  return (
    <><div id='flall'>
          <div onClick={() => (setIsShown(!isShown))} id='fldiv' className='simple'>
              <div style={{display: isShown?'flex':'none'}} id='floverlay'>
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
      </div>
            
          
    </>
    
  )
}

export default FriendsList