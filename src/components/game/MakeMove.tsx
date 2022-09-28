import React from 'react'

type Props = {
  makeMove: Function
}

const MakeMove = (props: Props) => {
  return (
    <button onClick={() => props.makeMove()} className='makemove'>
      <div className='center'>Make Move</div>
    </button>
  )
}

export default MakeMove
