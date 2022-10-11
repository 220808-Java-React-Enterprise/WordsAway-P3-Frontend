import React from 'react';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import WORDS_API from '../utils/ApiConfig';
import Lobby from '../components/Lobby';

jest.mock('../utils/ApiConfig');

describe('render',()=>{
    (WORDS_API.get as jest.Mock).mockResolvedValue({
        data: {}
    });

    (WORDS_API.post as jest.Mock).mockResolvedValue({});


    beforeEach(() => {
        render(<Lobby/>)
    })
    afterEach(() => {
        cleanup()
    })

    it('Click challenge table button', ()=>{
        fireEvent.click(screen.getByRole('rankedMatchBtn'))
    })
    it('Click practice table button', () => {
        fireEvent.click(screen.getByTestId('practice-table-button'))
    })


})