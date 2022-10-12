/* eslint-disable testing-library/no-render-in-setup */
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

  const { location } = window

    beforeEach(() => {
      delete (window as Partial<Window>).location;
      window.location = { ...window.location, reload: jest.fn() };
      render(<Navbar/>)
    })

    afterEach(() => {
        cleanup()
        window.location = location
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

