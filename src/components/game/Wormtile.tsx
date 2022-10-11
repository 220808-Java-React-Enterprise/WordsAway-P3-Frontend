import React from 'react'

type Props = {
  letter: string
}

const Wormtile = (props: Props) => {
  if (props.letter.match(/[a-z,A-Z]/g)) {
    return (
      <div
        style={{
          backgroundColor: props.letter === props.letter.toUpperCase() ? 'red' : 'white',
          color: props.letter === props.letter.toUpperCase() ? 'white' : 'black'
        }}
        className='wormtile'
      >
        {props.letter.toUpperCase()}
      </div>
    )
  } else if (props.letter.match(/[0-9↑↓→←\-\|↧↥↤↦]/g)) {
    return (
      <div style={{ backgroundColor: 'green' }} className='wormtile'>
        {props.letter.toUpperCase()}
      </div>
    )
  } else if (props.letter === '@') {
    return <div style={{ backgroundColor: 'red' }} className='wormtile'></div>
  } else if (props.letter == '*') {
    return (
      <div style={{ backgroundColor: 'red' }} className='wormtile'>
        🔥
      </div>
    )
  } else if (props.letter == '&') {
    return (
      <div style={{ backgroundColor: 'black' }} className='wormtile'>
        🔥
      </div>
    )
  } else return <div style={{ backgroundColor: 'black' }} className='wormtile'></div>
}

export default Wormtile
