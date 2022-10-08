import React from 'react'
import axios from 'axios'
import { render, screen, cleanup, act } from '@testing-library/react'
import Login from '../components/Login'
import userEvent from '@testing-library/user-event'

describe('Login module', () => {
    beforeEach(() => {
        render(<Login />)
        jest.mock('axios')
    })

    afterEach(() => {
        cleanup()
    })

    test('renders login screen title', () => {
        const linkElement = screen.getByTestId('title')
        expect(linkElement).toBeInTheDocument()
        expect(linkElement).toHaveTextContent("WORDS AWAY")
    })
    test('renders login form', () => {
        const linkElement = screen.getByRole('loginForm')
        expect(linkElement).toBeInTheDocument()
    })

    // test('mocks menu switch', () => {
    //     const mockedAxios = axios as jest.Mocked<typeof axios>

    //     act(() => {
    //         userEvent.click(screen.getByRole('switchMenu'))
    //     });
    //     expect(screen.findByRole('signupForm')).toBeInTheDocument()
    // })

    // test('mocks login function', () => {
    //     const mockLogin = jest.fn();
    //     const form = screen.getByRole('loginForm')
    //     fireEvent.submit(form)
    //     expect(mockLogin).toBeCalled()
    // })
})