import React from 'react'
import WORDS_API from '../utils/ApiConfig'
import { useState } from 'react';
import { AxiosResponse } from 'axios';
import CryptoJS from 'crypto-js'
const SettingsPage = () => {
  const [newEmail,setEmail]= useState("");
  const [newPassword,setPassword] =useState("")
  const [oldPassword,setOldPassword] =useState("")
  const [username, setUser]=useState(sessionStorage.getItem("username"))
function updateEmail(event : React.ChangeEvent<HTMLInputElement>)
{
  console.log(event)
setEmail(event.target.value)

}

function updatePassword(event : React.ChangeEvent<HTMLInputElement>)
{
  console.log(event)
setPassword(event.target.value)

}

function updateOldPassword(event : React.ChangeEvent<HTMLInputElement>)
{
  console.log(event)
setOldPassword(event.target.value)

}



async function handleUpdatePassword(){
  console.log('here at handlePassword')
let salt=''
await WORDS_API.get('salt', { params: { username: username } }).then((response: AxiosResponse) => {
  salt = response.data
})

console.log(username)
  console.log('after salt')

  let oldHash = CryptoJS.HmacSHA512(oldPassword, salt).toString()
  let newHash = CryptoJS.HmacSHA512(newPassword, salt).toString()

  console.log('currentPassword Hash:' + oldHash)
  console.log('newPassword Hash:' + newHash)

WORDS_API.put('/settings/updateUser/',
{
  currentPassword:oldHash,
  email : newEmail,
  newPassword : newHash
 

})
.then((response : AxiosResponse) =>
{
  alert('Change successful!');
  console.log(response)
}).catch((error: { response: { data: { message: any; }; }; }) => {
  alert('Sorry something went wrong');
});

}
  return (
    <div>
        <h1> SettingsPage</h1>
        <br/>
        <section>
          
        <input type="checkbox" value="Toggle DarkMode"/>
          <br/>
          <form>
          <label>New Email</label>
          <br/>
        <input type="text" placeholder="enter new email" onChange={updateEmail}/>
        <br/>
        <label>New Password</label>
        <br/>
        <input type="text" placeholder="enter new password" onChange={updatePassword}/>
        <br/>
        <label>Old Password</label>
        <br/>
        <input type="text" placeholder="enter old password" onChange={updateOldPassword}/>


        <input type="button" value="Enter" onClick={handleUpdatePassword}/>

        </form>
        <br/>
        </section>
        </div>
  )
}

export default SettingsPage