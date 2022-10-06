import React, { useState, useEffect } from 'react'
import { AxiosResponse } from 'axios'
import { Opponent } from '../types/Opponent.type'
import WORDS_API from '../utils/ApiConfig'
import { User } from "../../src/types/User.type";
import '../css/lobby.css'

interface BoardProps {
    userList: Opponent[];
    gameType: string
}

export default function Challengeboard({ userList, gameType }: BoardProps) {
    
    var friends: { outgoingRequests: any[], incomingRequests: any[], friends: any[] } = { outgoingRequests: [], incomingRequests: [], friends: []}
    const friendslist: any = []

    async function getFriends() {
        await WORDS_API.get('getFriendsList')
            .then((response: AxiosResponse) => {
                sessionStorage.setItem('friends', JSON.stringify(response.data))
                
                // console.log(response.data)
                
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function populateList(){
        friends = JSON.parse(sessionStorage.friends)

        for (let i = 0; i < friends.friends.length; i++) {
            friendslist.push(
                // <div id='flrow' key={i}>
                //     <div className='friend'>{friends.friends[i].username}</div>
                //     <div className='friendElo'>{friends.friends[i].elo}</div>
                // </div>
                [i, friends.friends[i].username, friends.friends[i].elo, friends.friends[i].board_id]
            )
        }
        console.log(friendslist)
    }

    async function startGame(username: string, type: string) {
        await WORDS_API.post('makeGame', {
            username: username,
            type: type
        })
            .then((response) => {
                sessionStorage.setItem('board_id', response.data)
                window.location.href = '/game'
            })
            .catch((response) => alert(response))
    }

    function continueGame(board_id: string) {
        // alert('Board ID: ' + board_id)
        sessionStorage.setItem('board_id', board_id)
        window.location.href = '/game'
    }

    getFriends()
    populateList()

    return (
        <div id="tables">
            {/* <table data-testid='userTable' id = 'friendsTable'>
                <thead id="table-header">
                    <tr>
                        <th>Username</th>
                        <th>ELO</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="table-body">
                    {friendslist.map((user: (string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined)[]) => (
                        <tr key={user[0]}>
                            <td className="usernames-column">user[1]</td>
                            <td className="elo-column">{user[2]}</td>
                            <td>
                                {user[3] == null ? (
                                    <button onClick={() => startGame(user[1], gameType)} role='challengePlayerBtn'>Challenge!</button>
                                ) : (
                                    <button onClick={() => continueGame(user[3])} role='continueGameBtn'>Continue!</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
            <table data-testid='userTable' id = 'opponentsTable'>
                <thead id="table-header">
                    <tr>
                        <th>Username</th>
                        <th>ELO</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="table-body">
                    {userList.map((user) => (
                        <tr key={user.username}>
                            <td className="usernames-column">{user.username}</td>
                            <td className="elo-column">{user.elo.toFixed(0)}</td>
                            <td>
                                {user.board_id == null ? (
                                    <button onClick={() => startGame(user.username, gameType)} role='challengePlayerBtn'>Challenge!</button>
                                ) : (
                                    <button onClick={() => continueGame(user.board_id)} role='continueGameBtn'>Continue!</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}