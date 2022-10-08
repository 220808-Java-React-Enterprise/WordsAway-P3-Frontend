import React from 'react'
import { fireEvent, render, screen, cleanup } from '@testing-library/react'
import Lobby from '../components/Lobby'
import { User } from "../../src/types/User.type";


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

    // test('mocks get players function', () => {
        // const wrapper = mount(<Lobby />)
        // const container = wrapper.find("#lobbycontainer")
    //     const challengeButton = container.find('#challengeButton')
        
        
    //     const mockGetPlayers = jest.fn();

    //     expect(mockGetPlayers).not.toHaveBeenCalled()
    //     challengeButton.simulate("click")
    //     expect(mockGetPlayers).toHaveBeenCalled()
    // })
})