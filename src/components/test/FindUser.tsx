import { AxiosResponse } from 'axios';
import React from 'react'
import {useState,useEffect} from 'react';
import { URL } from 'react-dnd-html5-backend/dist/NativeTypes';
import { URLSearchParams } from 'url';
import  "../../css/FUser.css"
import WORDS_API from '../../utils/ApiConfig';
import { useNavigate } from "react-router-dom";





const FindUser = () => {
  const navigate = useNavigate();
 
  const [findUsername,setFindUserName]= useState("");
  const [dataTable,setdataTable]=useState("");

function updateData(FoundUser:String)
{
setdataTable(findUsername)

}
  function updateFindByUsername(event : React.ChangeEvent<HTMLInputElement>)
  {
    console.log(event)
  setFindUserName(event.target.value)
  }

function getUserByUserName()
{
  console.log('here')
WORDS_API.get('/findUser',
  {
   
    params: {
       username: findUsername 
    }

  })
  .then((response : AxiosResponse) =>
  {
    let foundUser = response.data.username
   sessionStorage.setItem(foundUser, JSON.stringify(foundUser))
   sessionStorage.setItem("profileUser",JSON.stringify(response.data));

   updateData(foundUser)
  console.log(response.data)
  
  }).catch((error: { response: { data: { message: any; }; }; }) => {
    alert(error.response.data.message);
});

}

useEffect(() =>{
  console.log('effected')
  function updateData(FoundUser:String)
{
setdataTable(findUsername);
console.log(dataTable);
}
  },[findUsername])

  function toProfile(){
    navigate("/profile");
    window.location.reload();
  }
  


  return (
    <div id="searchUser">
<form>
  <label>Find</label>
<input id="userSearchBar" type="text" placeholder="Enter a Username" value={findUsername} onChange={updateFindByUsername}/>
        <input id="userButton" type="button" value="Search User" onClick={getUserByUserName} />
</form>

    <div id="dynamictab">
  <table>
    <thead>
      <th>Username</th>
    </thead>
    <tbody>
      <tr>
    <td>{dataTable}</td>
    <a href="#" onClick={toProfile}>{dataTable}</a>
      </tr>
    </tbody>
  </table>
  </div>


</div>


    
      
  )
}

export default FindUser