import React from 'react'

export interface BottomBannerProps {
  name: string
  active: boolean
}

const BottomBanner = ({ name, active }: BottomBannerProps) => {
  return <div className='banner botbanner' style={{color: active ? 'black' : 'grey'}}>{name}</div>
}

export default BottomBanner
