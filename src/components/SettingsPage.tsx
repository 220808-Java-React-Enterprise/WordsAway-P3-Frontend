import React, { useEffect, useState } from 'react';
import WORDS_API from '../utils/ApiConfig'
import { AxiosResponse } from 'axios';
import CryptoJS from 'crypto-js'
import '../css/settings.css'
import { User } from '../types/User.type'
const SettingsPage = () => {
  const [newEmail,setEmail]= useState("");
  const [newPassword,setPassword] =useState("")
  const [oldPassword,setOldPassword] =useState("")
  //const [username, setUser]=useState(sessionStorage.getItem("username"))
  const [user, setUser] = useState<User | null>(null);
  const [isShown2, setIsShown2] = useState(false);
  const [icon,setIcon] = useState<String | undefined>("");


  useEffect(()  => {
    const data = window.sessionStorage.getItem("user");
    if (data != null){ setUser(JSON.parse(data));
      setIcon((user?.avatar)?.toString());
    }

    
  }, [])

  
  useEffect(()  => {

    

    if (user != null){ ;
      setIcon((user?.avatar)?.toString());
    }
  }, [user])
  


  //const [profileUser, setProfileUser] = useState<User | null>(null);
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
await WORDS_API.get('salt', { params: { username: user?.username } }).then((response: AxiosResponse) => {
  salt = response.data
})

  console.log('after salt')

  let oldHash = CryptoJS.HmacSHA512(oldPassword, salt).toString()
  let newHash = CryptoJS.HmacSHA512(newPassword, salt).toString()

  console.log('currentPassword Hash:' + oldHash)
  console.log('newPassword Hash:' + newHash)

WORDS_API.put('/settings/updateUser/',
{
  currentPassword:oldHash,
  email : newEmail,
  newPassword : newHash,
  avatarIdx: Number(icon)

})
.then((response : AxiosResponse) =>
{
   WORDS_API.get('findUser', { params: { username: user?.username } }).then((response: AxiosResponse) => {
    let user2 = { ...response.data};
    window.sessionStorage.setItem("user", JSON.stringify(user2))
    window.location.href = '/lobby'
  })
  .catch((response) => console.log("wack"))
  alert('Change successful!');
  console.log(response)
}).catch((error: { response: { data: { message: any; }; }; }) => {
  alert('Sorry something went wrong');
});

}

function emptyFunction() {
  console.log(user);
  console.log(icon);
}

function emptyFunction2(event : React.MouseEvent<HTMLAnchorElement>) {
  
  var test = (event.currentTarget.dataset.value);
  setIcon(test);
  setIsShown2(false);
  
}




function iconPrompt() {
  setIsShown2(true)
  }

//function that takes a buttons value and sends a request to the server to update the user's settings
  console.log(user);
  console.log("icon: " + icon);

  return (
    <div>
        <h1> SettingsPage</h1>
        <br/>
        <section>
          
        <a href="#"  onClick={iconPrompt} ><img id="settingIcon" alt="Its broken!" src={'images/icon' +icon+'.png'}></img></a>   

        <div style={{ display: (isShown2) ? 'flex' : 'none' }} id='iconSelect'>
          
                <div id="iconSpace">
                <button id='closeIcons' onClick={() => (setIsShown2(false))}>Close</button>

                      <div id="grid">
                      <a href="#" className="yes" onClick={emptyFunction2} data-value='0'><img alt="Its broken!" src={'images/icon0.png'}></img></a>   
                      <a href="#" className="yes" onClick={emptyFunction2} data-value='1'><img alt="Its broken!" src={'images/icon1.png'}></img></a>  
                      <a href="#" className="yes" onClick={emptyFunction2} data-value='2'><img alt="Its broken!" src={'images/icon2.png'}></img></a>  
                      <a href="#" className="yes" onClick={emptyFunction2} data-value='3'><img alt="Its broken!" src={'images/icon3.png'}></img></a>  
                      <a href="#" className="yes" onClick={emptyFunction2} data-value='4'><img alt="Its broken!" src={'images/icon4.png'}></img></a>  
                      <a href="#" className="yes" onClick={emptyFunction2} data-value='5'><img alt="Its broken!" src={'images/icon5.png'}></img></a>  
                      <a href="#" className="yes" onClick={emptyFunction2} data-value='6'><img alt="Its broken!" src={'images/icon6.png'}></img></a>  
                      <a href="#" className="yes" onClick={emptyFunction2} data-value='7'><img alt="Its broken!" src={'images/icon7.png'}></img></a>  
                      </div>
                      
            </div>
        </div>  


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
        <input type="button" value="Wack" onClick={emptyFunction}/>
        </form>
        <br/>
        </section>
        </div>
  )
}

export default SettingsPage