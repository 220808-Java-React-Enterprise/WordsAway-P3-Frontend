import { AxiosResponse } from 'axios';
import React from 'react'
import {useState,useEffect} from 'react';
import  "../../css/FUser.css"
import FAKEWORDS_API from '../../utils/FakeApiConfig';
import Table from '../custom/Table';
function getUser(){
  FAKEWORDS_API.get('getUser')
      .then((response: AxiosResponse) => {
          sessionStorage.setItem('friends',JSON.stringify(response.data))
      })
    }

function loadUsers()
{  
  FAKEWORDS_API.get('userResult')
  .then(response => {
console.log(response)

  })
}

function findUser(): void
{


}


const FindUser = () => {
  const [userId,setUserId]= useState('');
  const [dataTable,setdataTable]=useState([]);
  return (
    <div id="searchUser">
<form>
  <label>Find</label>
<input id="userSearchBar" type="search" placeholder="Enter a Username"/>
        <input id="userButton" type="button" value="Search User" />
</form>
     <Table/>



</div>


    
      
  )
}

export default FindUser