import React from 'react'
import { ItemTypes } from './Constants'
import { useDrag } from 'react-dnd'

const TrayTile = ({ letter }: any) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.TRAYTILE,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  return (
    <div ref={drag} className='traytile'>
      {letter.toUpperCase()}
    </div>
  )
}

export default TrayTile
