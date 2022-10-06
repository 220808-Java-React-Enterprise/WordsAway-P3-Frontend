import React from 'react'
import { fireEvent, render, screen, cleanup } from '@testing-library/react'
import Lobby from '../components/Lobby'
import { User } from "../../src/types/User.type";
import userEvent from '@testing-library/user-event'


describe('Lobby module', () => {
    beforeEach(() => {
        render(<Lobby currentUser={null} />)
    })

    afterEach(() => {
        cleanup()
    })

    test('renders lobby title', () => {
        const linkElement = screen.getByTestId('title')
        expect(linkElement).toBeInTheDocument()
        expect(linkElement).toHaveTextContent("Welcome,")
    })

    test('mocks get players function', () => {
        fireEvent.click(screen.getByRole('rankedMatchBtn'))
        expect(screen.getByTestId('userTable')).toBeInTheDocument
        
        fireEvent.click(screen.getByText(/practice/i))
        expect(screen.getByTestId('userTable')).toBeInTheDocument
    })

    test('mocks game initiation', () => {
        fireEvent.click(screen.getByRole('challengePlayerBtn'))
        

    })
})