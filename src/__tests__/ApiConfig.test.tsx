import WORDS_API from '../utils/ApiConfig'
import { AxiosResponse } from 'axios'
import { Opponent } from '../types/Opponent.type'

describe('testing WORDS_API', ()=>{
    it('getOpponents as test', async ()=>{
        await WORDS_API.get('/getOpponents?type=human')
            .then((response: AxiosResponse<Opponent[]>) => {
                console.log(response.data)
            })
            .catch(() => (window.location.href = '/login'))
    })
    it('bad call', async () => {
        await WORDS_API.get('/getOpponents?type=humantghq5p34897oyv o')
            .then((response: AxiosResponse<Opponent[]>) => {
                console.log(response.data)
            })
            .catch(() => (window.location.href = '/login'))
    })
    
})