import React from 'react';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import FriendsList from '../components/test/FriendsList';
import Navbar from '../components/Navbar';
import { createRoot } from 'react-dom/client'

jest.mock('react-router-dom')

describe('rendering navbar', ()=>{
    beforeEach(() => {

    })

    afterEach(() => {
        cleanup()
    })


    it('renders navbar', () => {
        const div = document.createElement('div')
        const root = createRoot(div)
        root.render(<Navbar />)
    })

    // it('renders navbar: click Rules', () => {
        
    //     const page = render(<Navbar />)
    //     screen.getByText('Rules')
    // })
    
})

