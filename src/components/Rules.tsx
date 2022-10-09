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
     <div className='titleRules'>
          <div>
            <h1>How to Play Words Away</h1>
            <h2>Story</h2>

            <p>A hybrid games of two relics; Battleship and Scrabble.  This is a guessing, strategy game with the theme of the game as follows: You and your opponent are wizards.  
                You have to put book worms into each other's spell books to stop them from casting spells.  Your objective is to find and destroy our opponent's worms from your
                book by casting the spells you can see at your book.
            </p>
            <h2>Preparation</h2>
            <p>Each game you're given 5 worms that vary in size from 2-5 spaces.  These worms are placed on your opponents' book and are invisible to your opponent.  You are also
                given 7 letters from which are used to case spells.
            </p>
            <h2>In Play</h2>
            <ul>
                <li>When its your turn, you will construct a spell from the letter set given for that turn and place that spell anywhere on your book.</li>
                <li>If your spell consists of any special letters (see below) your spell will have a splash damage effect hitting adjacent squares</li>
                <li>Any connected spells will grant the player a fireball.  This fireball can be used on any space, but will remove that pace from play.  So, use wisely.</li>
                <li>If any part of your spell turns red, this indicates that there is a worm in that space.</li>
            </ul>

            <h2>Special Characters</h2>
            <ul>
                <li>Any spells with the letter set: F,K,V,Y,W (Indicated by a +) will hit its space and any adjacent spaces.</li>
                <li>Any spells with the letter set: J,Q,X,Z (Indicated by a #) will hit its space and the adjacent spaces for all letters in that spell.</li>
                <li>All other letters only hit the space it's on (Indicated by a -)</li>
            </ul>
            <h2>Victory</h2>
            <p>The player who successfully locates and destroys all their opponent's worms first is the winner.</p>
            
            </div>
          
        </div>
        
</>
)    
}
export default Rules