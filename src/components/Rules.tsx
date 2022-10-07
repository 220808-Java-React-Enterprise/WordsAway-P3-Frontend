import React, { useState, useEffect, createContext } from 'react'
import { AxiosResponse } from 'axios'
import { User } from '../types/User.type'
import WORDS_API from '../utils/ApiConfig'
import '../css/Rules.css'
import useLocalStorage from 'use-local-storage'

const Rules = () => {
 
  var [theme, getTheme] = useState('')
  useEffect(() => {
    getTheme(localStorage.getItem("theme") || '');
  },[]);

return (
    <>
    <div className='rulescontainer' data-theme = {theme}>
        <div className='titleRules'>
          <div>Rules</div>
        </div>
    </div>
</>
)    
}
export default Rules