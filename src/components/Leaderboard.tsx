import axios, { Axios, AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { User } from "../types/User.type"
import WORDS_API from "../utils/ApiConfig"
import '../css/leaderboard.css'
export function getLeaders() {}
export function getRank() {}




const Leaderboard = () => {
    const [users, setUsers] = useState<User[]>([])
    const [user, setUser] = useState<User | null>(null);
    const [rank, setRank] = useState<number | null>(null);
    

    useEffect(()=>{
      const data = sessionStorage.getItem("user");
      if(data != null) setUser(JSON.parse(data));
      console.log(user);
    }, [])




     async function getLeaders() {
        await WORDS_API.get('/getTopTenElo')
        .then((response: AxiosResponse) => {
          console.log(response.data)
          setUsers(response.data)
        })
        .catch(() => (window.location.href = '/login'))
      }
      useEffect(() => {
        getLeaders()
        console.log(users);
      }, []);

      async function getRank(){
        await WORDS_API.get('/getRankElo')
        .then((response: AxiosResponse) =>{
          console.log(response.data)
          setRank(response.data)
        })
        .catch(()=>(window.location.href = '/login'))
      }
      useEffect(() =>{
        getRank()
        console.log("this is your rank "+ rank)
      })

 

      return (
        <div data-testid="leaderboard" className="leaderboard">
          <header>
            <h1>Leader Board</h1>
            <img src="assets\wizard3.png" alt="?"></img>
          </header>
          <table>
            <thead>
              <tr>
                <th className="rank">Ranking</th>
                <th className="username">Username</th>
                <th className="mmr">MMR</th>
                <th className="winstreak">Games Won</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="rank">1</td>
                <td className="username">{users[0]?.username}</td>
                <td className="mmr">{users[0]?.elo}</td>
                <td className="winstreak">{users[0]?.gamesWon}</td>
              </tr>
              <tr>
                <td className="rank">2</td>
                <td className="username">{users[1]?.username}</td>
                <td className="mmr">{users[1]?.elo}</td>
                <td className="winstreak">{users[1]?.gamesWon}</td>
              </tr>
              <tr>
                <td className="rank">3</td>
                <td className="username">{users[2]?.username}</td>
                <td className="mmr">{users[2]?.elo}</td>
                <td className="winstreak">{users[2]?.gamesWon}</td>
              </tr>
              <tr>
                <td className="rank">4</td>
                <td className="username">{users[3]?.username}</td>
                <td className="mmr">{users[3]?.elo}</td>
                <td className="winstreak">{users[3]?.gamesWon}</td>
              </tr>
              <tr>
                <td className="rank">5</td>
                <td className="username">{users[4]?.username}</td>
                <td className="mmr">{users[4]?.elo}</td>
                <td className="winstreak">{users[4]?.gamesWon}</td>
              </tr>
              <tr>
                <td className="rank">6</td>
                <td className="username">{users[5]?.username}</td>
                <td className="mmr">{users[5]?.elo}</td>
                <td className="winstreak">{users[5]?.gamesWon}</td>
              </tr>
              <tr>
                <td className="rank">7</td>
                <td className="username">{users[6]?.username}</td>
                <td className="mmr">{users[6]?.elo}</td>
                <td className="winstreak">{users[6]?.gamesWon}</td>
              </tr>
              <tr>
                <td className="rank">8</td>
                <td className="username">{users[7]?.username}</td>
                <td className="mmr">{users[7]?.elo}</td>
                <td className="winstreak">{users[7]?.gamesWon}</td>
                </tr>
                <tr>
                <td className="rank">9</td>
                <td className="username">{users[8]?.username}</td>
                <td className="mmr">{users[8]?.elo}</td>
                <td className="winstreak">{users[8]?.gamesWon}</td>
              </tr>
              <tr>
                <td className="rank">10</td>
                <td className="username">{users[9]?.username}</td>
                <td className="mmr">{users[9]?.elo}</td>
                <td className="winstreak">{users[9]?.gamesWon}</td>
                </tr>
                <tr>
                <td className="rank">{rank}</td>
                <td className="username">{user?.username}</td>
                <td className="mmr">{user?.elo}</td>
                <td className="winstreak">{user?.gamesWon}</td>
              </tr>
            </tbody>
          </table>
        </div>

    );
    }
    


export default Leaderboard

