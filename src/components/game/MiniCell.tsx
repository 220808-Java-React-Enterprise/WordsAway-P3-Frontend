import React from 'react'
import Wormtile from './Wormtile'

type Props = {
  worm: string
  // hit:string;
}

const MiniCell = (props: Props) => {
  if (props.worm !=='.') {
    return (
      <div className='minicell'>
        <Wormtile letter={props.worm} />
      </div>
    )
  }

  return <div className='minicell'></div>
}

export default MiniCell
