/**
 * DragContext.jsx
 * description
 */

import React, { createContext, useState } from 'react'
import { startDragging } from './Drag'
import { initialSizes, initialState } from './InitialValues'


export const DragContext = createContext()



export const DragProvider = ({ children }) => {
  const [ dimensions, setDimensions ] = useState(initialState)
  const [ sizes, setSizes ] = useState(initialSizes)


  const startDrag = event => {
    startDragging(event, dimensions, setDimensions)
  }


  const updateSize = (id, value) => {
    sizes[id] = value
    setSizes({...sizes})
  }


  const saveLayout = () => {
    const replacer = (key, value) => {
      if (key === "ix") {
        return undefined
      } else if (typeof value === "number") {
        value = parseInt(value * 1000) / 1000
      }

      return value
    }

    console.log(
      "dimensions",
      JSON.stringify(dimensions, replacer, '  ')
    );

  }


  return (
    <DragContext.Provider
      value ={{
        dimensions,
        startDrag,
        sizes,
        updateSize,
        saveLayout
      }}
    >
      {children}
    </DragContext.Provider>
  )
}
