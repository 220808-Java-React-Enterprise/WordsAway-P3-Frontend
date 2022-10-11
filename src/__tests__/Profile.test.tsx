import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import Profile from '../components/Profile';
import WORDS_API from '../utils/ApiConfig';

jest.mock('../utils/ApiConfig');
jest.mock('react-router-dom');
describe('render profile', ()=>{
    (WORDS_API.get as jest.Mock).mockResolvedValue({
        data: {}
    });

    (WORDS_API.post as jest.Mock).mockResolvedValue({});
    (WORDS_API.put as jest.Mock).mockResolvedValue({});
    require = 

    beforeEach(() => {
        render(<Profile/>)
    })
    afterEach(() => {
        cleanup()
    })
    // it('Intial Render check', ()=>{

    // })

})