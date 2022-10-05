import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import FriendsList, {acceptFR, rejectFR, unfriendprompt, unfriend} from '../components/test/FriendsList'
import { efafee} from '../components/test/FriendsList'
import {login} from '../components/Login'
// import Login from '../components/Login'
import axios from 'axios';
import WORDS_API from '../utils/ApiConfig'

jest.mock('../utils/ApiConfig');

describe('Rendering FriendsList and Clicking Buttons', ()=>{
    WORDS_API.get.mockResolvedValue({
        data: { outgoingRequests: [], incomingRequests: [], friends: [] }
    })
    WORDS_API.post.mockResolvedValue({
        
    })

    // jest.fn.mockImplementation()
    JSON.parse = jest.fn().mockImplementation(() => {
        return { outgoingRequests: [], incomingRequests: [{ username: 'nfielder2', elo: 1000, gamesPlayed: 0, gamesWon: 0, avatar: 0 }], friends: [{ username: 'nfielder2', elo: 1000, gamesPlayed: 0, gamesWon: 0, avatar: 0 }] }
    });

    
    
    
    test('test acceptFR', () => {
        const page = render(<FriendsList />)
        const testbutton = page.container.querySelector('#acceptfr')
        // console.log(testbutton)
        fireEvent.click(testbutton)
    })
    test('test rejectFR', () => {
        const page = render(<FriendsList />)
        const testbutton = page.container.querySelector('#rejectfr')
        // console.log(testbutton)
        fireEvent.click(testbutton)
    })
    test('test unfriendprompt and clicking no', () => {
        const page = render(<FriendsList />)
        const testbutton = page.container.querySelector('#deletefr')
        console.log(testbutton)
        fireEvent.click(testbutton)
        const testbutton2 = page.container.querySelector('#confirm-uf-no')
        fireEvent.click(testbutton2)
    })
    test('test unfriendprompt and clicking yes', () => {
        const page = render(<FriendsList />)
        const testbutton = page.container.querySelector('#deletefr')
        console.log(testbutton)
        fireEvent.click(testbutton)
        const testbutton2 = page.container.querySelector('#confirm-uf-yes')
        fireEvent.click(testbutton2)
    })
})
