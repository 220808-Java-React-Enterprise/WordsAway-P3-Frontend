import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import Login from '../components/Login'

describe('Login module', () => {
    beforeEach(() => {
        render(<Login />)
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

    // test('mocks login function', () => {
    //     const mockLogin = jest.fn();
    //     const form = screen.getByRole('loginForm')
    //     fireEvent.submit(form)
    //     expect(mockLogin).toBeCalled()
    // })
})