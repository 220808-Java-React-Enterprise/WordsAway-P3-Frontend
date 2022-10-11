import React from 'react';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import WORDS_API from '../utils/ApiConfig';
import FindUser from '../components/test/FindUser';

jest.mock('../utils/ApiConfig');
jest.mock('react-router-dom')

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

    it('basic render', ()=>{
        
    })

})