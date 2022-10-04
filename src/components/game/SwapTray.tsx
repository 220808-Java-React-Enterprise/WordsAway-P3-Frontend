import React from 'react'

type Props = {
  swapTray: Function
}

const SwapTray = (props: Props) => {
  return (
    <button onClick={() => props.swapTray()} className='swaptray'>
      <div style={{margin:'auto'}}>SwapTray</div>
    </button>
  )
}

export default SwapTray
