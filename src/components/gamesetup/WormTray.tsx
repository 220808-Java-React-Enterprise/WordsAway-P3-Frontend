import React from 'react'
import WormCell from './WormCell'

type Props = {
  wormtray: string[]
  updateBoard: Function
}

const WormTray = (props: Props) => {
  const wormcells = []
  for (let i = 0; i < 5; i++) {
    wormcells.push(<WormCell updateBoard={props.updateBoard} type={props.wormtray[i]} key={i} />)
  }

  return <div className='wormtray'>{wormcells}</div>
}

export default WormTray
