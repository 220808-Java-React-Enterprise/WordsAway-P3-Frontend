import React from 'react'
import { useDrag } from 'react-dnd'

const Tile = ({ type, tileletter, position }: { type: string; tileletter: string; position: number }) => {
  var movetype = 'none'
  if (type === 'movetile' || type === 'traytile' || type === 'fbtile') {
    movetype = 'moveable'
  }


  const [{ isDragging }, drag] = useDrag(() => ({
    type: movetype,
    item: { letter: tileletter, type: type, position: position },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))
  function placetile() {
    if (type === 'boardtile') {
      if (tileletter === tileletter.toUpperCase() && tileletter!== "&") {
        if (tileletter==='*'){
          return <div className='tile hit'><div style={{fontSize:"1.5rem"}}>🔥</div></div>
        } else {
          if (tileletter.match(/[fkvyw]/i)) {
            return (
              <div  className='tile hit'>
                {tileletter}<div className='subtile'>+</div>
              </div>
            )
          } else if (tileletter.match(/[jqxz]/i)) {
            return (
              <div className='tile hit'>
                {tileletter}<div className='subtile'>#</div>
              </div>
            )
          } else {
            return (
              <div className='tile hit'>
                {tileletter}<div className='subtile'>-</div>
              </div>
            )
          }
}
      } else {
        if (tileletter==='&'){
          return <div style={{opacity:.5}} className='tile'><div style={{ fontSize: "1.5rem" }}>🔥</div></div>
        } else {
          if (tileletter.match(/[fkvyw]/i)) {
            return (
              <div className='tile'>
                {tileletter.toUpperCase()}<div className='subtile'>+</div>
              </div>
            )
          } else if (tileletter.match(/[jqxz]/i)) {
            return (
              <div className='tile'>
                {tileletter.toUpperCase()}<div className='subtile'>#</div>
              </div>
            )
          } else {
            return (
              <div  className='tile'>
                {tileletter.toUpperCase()}<div className='subtile'>-</div>
              </div>
            )
          }
}
      }
    } else if (type === 'traytile') {
      if (tileletter.match(/[fkvyw]/i)){
        return (
          <div ref={drag} className='tile'>
            {tileletter}<div className='subtile'>+</div>
          </div>
        )
      } else if (tileletter.match(/[jqxz]/i)) {
        return (
          <div ref={drag} className='tile'>
            {tileletter}<div className='subtile'>#</div>
          </div>
        )
      }else {
        return (
          <div ref={drag} className='tile'>
            {tileletter}<div className='subtile'>-</div>
          </div>
        )
      }

    } else if (type === 'movetile') {
      if (tileletter==='*'){
        return <div className='tile'><div style={{ fontSize: "1.5rem" }}>🔥</div></div>
      }else return (
        <div ref={drag} className='tile'>
          {tileletter}
        </div>
      )
    } else if (type === 'fbtile') {
      return (
        <div ref={drag} className='tile'>
          <div style={{ fontSize: "1.5rem" }}>🔥</div>
        </div>
      )
    } else {
      return <div className='tile'>{tileletter}</div>
    }
  }

  return <>{placetile()}</>
}

export default Tile
