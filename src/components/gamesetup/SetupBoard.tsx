import React from 'react'
import Cell from './Cell'

type Props = {
  worms: string[]
}

const SetupBoard = (props: Props) => {
  const rows = []
  for (let i = 0; i < 16; i++) {
    const row = []
    for (let j = 0; j < 16; j++) {
      if (props.worms[16 * i + j] === '.') {
        row.push(<Cell />)
      }
    }
    rows.push(
      <div className='row' key={i}>
        {row}
      </div>
    )
  }

  return <div className='mainboard'>{rows}</div>
}

export default SetupBoard
