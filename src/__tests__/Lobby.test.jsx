import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { mount } from 'enzyme'
import Lobby from '../components/Lobby'

describe('Lobby module', () => {
    beforeEach(() => {
        render(<Lobby />)
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