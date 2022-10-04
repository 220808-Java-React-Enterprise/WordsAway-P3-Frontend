import React from 'react'
import MiniCell from './MiniCell'

type Props = {
  worms: string[]
}

const SecondaryBoard = (props: Props) => {
  const rows = []
  for (let i = 0; i < 16; i++) {
    const row = []
    for (let j = 0; j < 16; j++) {
      row.push(<MiniCell worm={props.worms[16 * i + j]} key={16 * i + j} />)
    }
    rows.push(
      <div className='minirow' key={i}>
        {row}
      </div>
    )
  }

  return <div className='secondaryBoard'>{rows}</div>
}

export default SecondaryBoard
