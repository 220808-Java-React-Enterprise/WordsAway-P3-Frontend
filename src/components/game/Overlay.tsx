import React from 'react'

type Props = {
    message:string;
    active:boolean;
}

const Overlay = (props: Props) => {
  return (
    <div id='gameoverlay' style={{
        display:props.active?'none':'flex'
    }}><h1 className='center2ElectricBoogaloo'>Opponent is Thinking...</h1></div>
  )
}

export default Overlay