/* eslint-disable testing-library/no-render-in-setup */
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import WORDS_API from '../utils/ApiConfig';
import { Opponent } from '../types/Opponent.type';
import Challengeboard from '../components/Challengeboard';

jest.mock('../utils/ApiConfig');

describe("Render ChallengeBoard", ()=>{

    (WORDS_API.get as jest.Mock).mockResolvedValue({
        data: {}
    });

    (WORDS_API.post as jest.Mock).mockResolvedValue({});
    beforeEach(() => {
        JSON.parse = jest.fn().mockImplementation(() => {
            return {
                outgoingRequests: [],
                incomingRequests: [{ username: 'nfielder2', elo: 1000, gamesPlayed: 0, gamesWon: 0, avatar: 0 }],
                friends: [{ username: 'nfielder2', elo: 1000, gamesPlayed: 0, gamesWon: 0, avatar: 0 }]
            }
        });

        let opponents: Opponent[] = [{ elo: 123, username: "username1", board_id: "hello" }, { elo: 999, username: "username2", board_id: String(null) }];

        render(<Challengeboard userList={opponents} gameType='practiced'/>)
    })

    afterEach(() => {
        cleanup()
    })

    it('click Continue!', ()=>{
        fireEvent.click(screen.getAllByRole('continueGameBtn')[0])
    })
    // it('click Continue!', () => {
    //     fireEvent.click(screen.getByRole('challengePlayerBtn'))
    // })

})