import React from 'react';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import FriendsList from '../components/test/FriendsList';
import Navbar from '../components/Navbar';
import { createRoot } from 'react-dom/client'

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe('rendering navbar', ()=>{
    beforeEach(() => {
        render(<Navbar/>)
    })

    afterEach(() => {
        cleanup()
    })


    it('renders navbar', () => {

    })
    it('Click Rules link', ()=>{
        fireEvent.click(screen.getByTestId("nav-rules"))
    }) 
    it('Click Search User Button', () => {
        fireEvent.click(screen.getByTestId("nav-finduser"))
    })
    it('Click Profile Button', () => {
        fireEvent.click(screen.getByTestId("nav-profile"))
    })
    it('Click Signout Button', () => {
        fireEvent.click(screen.getByTestId("nav-logout"))
    })
    it('Click Lobby Banner', () => {
        fireEvent.click(screen.getByTestId("nav-lobby"))
    })
})

