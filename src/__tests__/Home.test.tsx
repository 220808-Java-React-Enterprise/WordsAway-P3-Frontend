/* eslint-disable testing-library/no-render-in-setup */
import { fireEvent, render, screen, cleanup } from '@testing-library/react';

import WORDS_API from '../utils/ApiConfig';
import CryptoJS from 'crypto-js'
import Home from '../components/Home';

// jest.mock('../utils/ApiConfig');
jest.mock('react-router-dom');
// jest.mock('crypto-js');

describe('render Setting', () => {

    const { alert } = window;
 
    beforeEach(() => {
      delete (window as Partial<Window>).alert;
      window.alert = jest.fn();
      render(<Home />)
    })
    afterEach(() => {
        cleanup()
        window.alert = alert
    })

    it('Login test fail', ()=>{
        fireEvent.change(screen.getByTestId('login-username-input'), "usernametest")
        fireEvent.change(screen.getByTestId('login-password-input'), "Passw0rd")
        fireEvent.click(screen.getByTestId('loginButton'))
    })
    it('Login test pass', () => {
        fireEvent.change(screen.getByTestId('login-username-input'), "nfielder3")
        fireEvent.change(screen.getByTestId('login-password-input'), "Passw0rd")
        fireEvent.click(screen.getByTestId('loginButton'))
    })
    it('Switch to signup and populate inputs', ()=>{
        // jest.mock('../utils/ApiConfig');
        fireEvent.click(screen.getByRole('switchMenu'))
        fireEvent.change(screen.getByPlaceholderText('Username'), "usernametest")
        fireEvent.change(screen.getByPlaceholderText('Email'), "test@email.com")
        fireEvent.change(screen.getByPlaceholderText('Password'), "Passw0rd")
        fireEvent.change(screen.getByPlaceholderText('Confirm Password'), "Passw0rd")
        fireEvent.click(screen.getByTestId('submit-signup'))

    })
    it('Switch to signup and populate inputs unmatching password', () => {
        // jest.mock('../utils/ApiConfig');
        fireEvent.click(screen.getByRole('switchMenu'))
        fireEvent.change(screen.getByPlaceholderText('Username'), "usernametest")
        fireEvent.change(screen.getByPlaceholderText('Email'), "test@email.com")
        fireEvent.change(screen.getByPlaceholderText('Password'), "Passw0rd")
        fireEvent.change(screen.getByPlaceholderText('Confirm Password'), "Pass0rd")
        fireEvent.click(screen.getByTestId('submit-signup'))

    })
    


})