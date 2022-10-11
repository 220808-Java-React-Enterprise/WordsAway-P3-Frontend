import ChatWindow from "../components/chat/ChatWindow";
import sendMSG from '../components/chat/ChatWindow';
import addUser from "../components/chat/ChatWindow"
import {render, cleanup, fireEvent} from '@testing-library/react';
import WORDS_API from '../utils/ApiConfig';

afterEach(cleanup);
jest.mock('../utils/ApiConfig'); 

describe('Rendering a Chat window', ()=>{

    (WORDS_API.get as jest.Mock).mockResolvedValue({
        data: { outgoingRequests: [], incomingRequests: [], friends: [] }
    });

    (WORDS_API.post as jest.Mock).mockResolvedValue({});

    it('render a chat window', ()=>{
        const page = render(<ChatWindow chatID="" messages={[]} sendMSG={()=>{sendMSG}} />)
    });
    it('test sendMsg', ()=>{
        const page = render(<ChatWindow chatID="" messages={[]} sendMSG={() => { sendMSG }} />)
        fireEvent.click(page.getByTestId('chat-submit'))
    })
    it('Type letters into chat prompt', ()=>{
        const page = render(<ChatWindow chatID="" messages={[]} sendMSG={() => { sendMSG }} />)
        fireEvent.change(page.getByTestId('chat-message'), {value:"some text"})
    })
    it('Add friend to chat', () => {
        const page = render(<ChatWindow chatID="" messages={[]} sendMSG={() => { sendMSG }} />)
        fireEvent.change(page.getByTestId('chat-user'), { value: "bob" })
        fireEvent.click(page.getByTestId('chat-user-button'))
    })


})
