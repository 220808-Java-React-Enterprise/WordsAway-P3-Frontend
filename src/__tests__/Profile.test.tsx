/* eslint-disable testing-library/no-render-in-setup */
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import Profile from '../components/Profile';
import WORDS_API from '../utils/ApiConfig';

jest.mock('../utils/ApiConfig');
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe('render profile', ()=>{

  const { location } = window;

  beforeEach(() => {
    delete (window as Partial<Window>).location;
    window.location = { ...window.location, reload: jest.fn() };
    render(<Profile/>)
  });

  afterEach(() => {
    cleanup();
    window.location = location;
  });

    (WORDS_API.get as jest.Mock).mockResolvedValue({
        data: {}
    });

    (WORDS_API.post as jest.Mock).mockResolvedValue({});
    (WORDS_API.put as jest.Mock).mockResolvedValue({});
    
    it('Intial Render check', ()=>{
        
    })
    it('click on setting button', ()=>{
        fireEvent.click(screen.getByTestId("gear-image"))

    })
})