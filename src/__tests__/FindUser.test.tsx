import React from 'react';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import WORDS_API from '../utils/ApiConfig';
import FindUser from '../components/test/FindUser';

jest.mock('../utils/ApiConfig');
jest.mock('react-router-dom');
jest.mock('')

describe('render finduser', ()=>{

    (WORDS_API.get as jest.Mock).mockResolvedValue({
        data: {  }
    });

    (WORDS_API.post as jest.Mock).mockResolvedValue({});
    beforeEach(() => {
        render(<FindUser/>)
    })

    afterEach(() => {
        cleanup()
    })

    it('Type user into search input, click "Search user"', ()=>{
        fireEvent.change(screen.getByPlaceholderText('Enter a Username'), {value:"testusername"});
        fireEvent.click(screen.getByTestId('search-user-button'));
    })

})