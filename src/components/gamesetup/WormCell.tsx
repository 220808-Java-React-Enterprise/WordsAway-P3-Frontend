import React from 'react'
import Worm from './Worm'

type Props = {
  type: string
  updateBoard: Function
}

const WormCell = (props: Props) => {
  return (
    <div className='wormcell'>
      <Worm type={props.type} />
    </div>
  )
}

export default WormCell
