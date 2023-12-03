/**
 * DragContext.jsx
 * description
 */

import React, { createContext, useState } from 'react'
import { startDragging } from './Drag'


export const DragContext = createContext()



const initialValues = {
  one:   { cx:   0, cy:   0, r: 25, ix: new Set() },
  two:   { cx:   0, cy: -35, r: 10, ix: new Set() },
  three: { cx:  25, cy: -25, r: 10, ix: new Set() },
  four:  { cx:  35, cy:   0, r: 10, ix: new Set() },
  five:  { cx:  25, cy:  25, r: 10, ix: new Set() },
  six:   { cx:   0, cy:  35, r: 10, ix: new Set() },
  seven: { cx: -25, cy:  25, r: 10, ix: new Set() },
  eight: { cx: -35, cy:   0, r: 10, ix: new Set() }
}


export const DragProvider = ({ children }) => {
  const [ dimensions, setDimensions ] = useState(initialValues)
  const [ sizes, setSizes ] = useState({
    initial: 0.5,
    ratio: 0.9,
    final: 0
  })


  const startDrag = event => {
    startDragging(event, dimensions, setDimensions)
  }


  const updateSize = (id, value) => {
    sizes[id] = value
    setSizes({...sizes})
  }


  return (
    <DragContext.Provider
      value ={{
        dimensions,
        startDrag,
        sizes,
        updateSize
      }}
    >
      {children}
    </DragContext.Provider>
  )
}
