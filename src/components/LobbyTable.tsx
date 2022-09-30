import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import WORDS_API from '../utils/ApiConfig'
import { AxiosResponse } from 'axios'
import { URL } from '../utils/ApiConfig'

import '../css/lobby'

async function startGame(username: string) {
    await WORDS_API.post('makeGame', {
        username: username
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

function LobbyTable(props: any[]) {
    return (
        <table>
            <thead id="table-header">
                <tr>
                    <th>Username</th>
                    <th>ELO</th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="table-body">
                {props.map((user) => (
                    <tr key={user.username}>
                        <td className="usernames-column">{user.username}</td>
                        <td className="elo-column">{user.elo.toFixed(0)}</td>
                        <td>
                            {user.board_id == null ? (
                                <button onClick={() => startGame(user.username)}>Challenge!</button>
                            ) : (
                                <button onClick={() => continueGame(user.board_id)}>Continue!</button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

module.exports = LobbyTable