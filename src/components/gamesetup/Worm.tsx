import React from 'react'
import { useDrag } from 'react-dnd'

type Props = {
  type: string
}

const Worm = (props: Props) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'worm',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  if (props.type === 'a') {
    return <div style={{ opacity: isDragging ? 0 : 1 }} ref={drag} className='worma worm' />
  } else if (props.type === 'b') {
    return <div style={{ opacity: isDragging ? 0 : 1 }} ref={drag} className='wormb worm' />
  } else if (props.type === 'c') {
    return <div style={{ opacity: isDragging ? 0 : 1 }} ref={drag} className='wormc worm' />
  } else if (props.type === 'd') {
    return <div style={{ opacity: isDragging ? 0 : 1 }} ref={drag} className='wormd worm' />
  } else if (props.type === 's') {
    return <div style={{ opacity: isDragging ? 0 : 1 }} ref={drag} className='worms worm' />
  }

  return <div>Worm</div>
}

export default Worm
