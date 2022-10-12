import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Profile from '../components/Profile';
import WORDS_API from '../utils/ApiConfig';

jest.mock('../utils/ApiConfig');
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe('render profile', ()=>{
    (WORDS_API.get as jest.Mock).mockResolvedValue({
        data: {}
    });

    (WORDS_API.post as jest.Mock).mockResolvedValue({});
    (WORDS_API.put as jest.Mock).mockResolvedValue({});
    

    beforeEach(() => {
        render(<Profile/>)
    })
    afterEach(() => {
        cleanup()
    })
    it('Intial Render check', ()=>{
        
    })
    it('click on setting button', ()=>{
        fireEvent.click(screen.getByTestId("gear-image"))

    })
})