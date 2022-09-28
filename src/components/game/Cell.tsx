import React from 'react'
import Tile from './Tile'
import { useDrop } from 'react-dnd'

const Cell = ({
  letter,
  type,
  position,
  updateGame
}: {
  letter: string
  type: string
  position: number
  updateGame: Function
}) => {
  var dropType = 'none'
  if (letter === '.' || letter === '!' || letter === '@') {
    dropType = 'moveable'
  }

  const [, drop] = useDrop(() => ({
    accept: dropType,
    drop: (item: any) => {
      //(inOb:string, outOb:string, inN:number, outN:number, letter:string)
      // updateTest(type, item.type, position, item.position, item.letter);
      updateGame(type, item.type, position, item.position, item.letter)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  function updateTest(inOb: string, outOb: string, inN: number, outN: number, letter: string) {
    console.log(inOb + ' | ' + outOb + ' | ' + inN + ' | ' + outN + ' | ' + letter + ' | ')
  }

  function placecell() {
    if (type === 'boardtile') {
      return (
        <div className='cell'>
          <Tile tileletter={letter} position={position} type='boardtile' />
        </div>
      )
    } else if (type === 'movetile') {
      return (
        <div className='cell'>
          <Tile tileletter={letter} position={position} type='movetile' />
        </div>
      )
    } else if (type === 'traytile') {
      return (
        <div className='cell'>
          <Tile tileletter={letter} position={position} type='traytile' />
        </div>
      )
    } else if (type === '!') {
      return <div ref={drop} className='cell miss'></div>
    } else if (type === '@') {
      return (
        <div ref={drop} className='cell hit'>
        </div>
      )
    } else if (type === 'fbtile') {
      return (
        <div className='cell'>
          <Tile tileletter={letter} position={position} type='fbtile' />
        </div>
      )
    } else if (type === 'empty' || type ==='emptytraytile') {
      return <div ref={drop} className='cell'></div>
    }
  }

  return <>{placecell()}</>
}

export default Cell
