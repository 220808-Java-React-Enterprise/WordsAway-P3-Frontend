import React from 'react';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import FriendsList from '../components/test/FriendsList';

import WORDS_API from '../utils/ApiConfig';

jest.mock('../utils/ApiConfig');

describe('Rendering FriendsList and Clicking Buttons', () => {

  (WORDS_API.get as jest.Mock).mockResolvedValue({
    data: { outgoingRequests: [], incomingRequests: [], friends: [] }
  });
  
  (WORDS_API.post as jest.Mock).mockResolvedValue({});
  

  // jest.fn.mockImplementation()
  JSON.parse = jest.fn().mockImplementation(() => {
    return {
      outgoingRequests: [],
      incomingRequests: [{ username: 'nfielder2', elo: 1000, gamesPlayed: 0, gamesWon: 0, avatar: 0 }],
      friends: [{ username: 'nfielder2', elo: 1000, gamesPlayed: 0, gamesWon: 0, avatar: 0 }]
    }
  });
  beforeEach(()=>{
    render(<FriendsList sendMSG={jest.fn()} chats={[]}/>)
  })
  afterEach(()=>{
    cleanup()
  })

  test('test acceptFR', () => {
    
    const page = render(<FriendsList sendMSG={jest.fn()} chats={[]}/>);
  
    const testbutton: any = page.getByTestId('acceptfr');
    // console.log(testbutton)
    fireEvent.click(testbutton);
  });
  test('test rejectFR', () => {
    const page = render(<FriendsList sendMSG={jest.fn()} chats={[]} />);
    const testbutton:any = page.container.querySelector('#rejectfr');
    // console.log(testbutton)
    fireEvent.click(testbutton);
  })
  test('test unfriendprompt and clicking no', () => {
    const page = render(<FriendsList sendMSG={jest.fn()} chats={[]} />);
    const testbutton : any= page.container.querySelector('#deletefr')
    console.log(testbutton)
    fireEvent.click(testbutton)
    const testbutton2 : any = page.container.querySelector('#confirm-uf-no')
    fireEvent.click(testbutton2)
  })
  test('test unfriendprompt and clicking yes', () => {
    const page = render(<FriendsList sendMSG={jest.fn()} chats={[]} />);
    const testbutton : any = page.container.querySelector('#deletefr')
    console.log(testbutton)
    fireEvent.click(testbutton)
    const testbutton2 : any = page.container.querySelector('#confirm-uf-yes')
    fireEvent.click(testbutton2)
  })
})
