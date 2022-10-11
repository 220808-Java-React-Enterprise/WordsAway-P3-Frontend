import React from 'react'

type Props = {
  count: number
}

const FireballCounter = (props: Props) => {
  return (
    <div className='fbcount'>
      <div className='center'>{props.count}</div>
    </div>
  )
}

export default FireballCounter
