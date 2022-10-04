import React from 'react'

export interface TopBannerProps {
  name: string,
  active: boolean
}

const TopBanner = ({ name, active }: TopBannerProps) => {
  return <div className='banner topbanner' style={{color: active ? 'black' : 'grey'}}>{name}</div>
}

export default TopBanner
