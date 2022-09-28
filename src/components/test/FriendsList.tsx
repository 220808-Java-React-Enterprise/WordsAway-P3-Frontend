import React from 'react'
import FAKEWORDS_API from '../../utils/FakeApiConfig'
import { AxiosResponse } from 'axios'

type Props = {}

const FriendsList = (props: Props) => {
    function getFriends(){
        FAKEWORDS_API.get('getFriends')
            .then((response: AxiosResponse) => {
                console.log(response.data)
            })
    }
  return (
    <>
          <div>FriendsList</div>
          <button onClick={()=>(getFriends())}>getFriends</button>
    </>
    
  )
}

export default FriendsList