/**
 * DragContext.jsx
 * description
 */

import React, { createContext, useReducer } from 'react'
import { reducer, initialState } from './DragReducer'


export const DragContext = createContext()



export const DragProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer( reducer, initialState )
  const { circles, coverage, hasOverlap, sizes, layouts } = state


  const startDrag = event => {
    const action = {
      type: "START_DRAGGING",
      payload: event
    }
    dispatch(action)

    document.documentElement.onmousemove = drag
    document.documentElement.onmouseup = stopDrag
  }


  const drag = event => {
    const action = {
      type: "DRAG",
      payload: event
    }

    dispatch(action)
  }


  const stopDrag = () => {
    dispatch({ type: "STOP_DRAGGING" })

    document.documentElement.onmousemove = null
    document.documentElement.onmouseup = null
  }


  const updateSize = (key, value) => {
    const action = {
      type: "UPDATE_SIZE",
      payload: {
        key,
        value
      }
    }
    dispatch(action)
  }


  const selectLayout = name => {
    const action = {
      type: "SET_LAYOUT",
      payload: name
    }
    dispatch(action)
  }


  const saveLayout = () => {
    const replacer = (key, value) => {
      if (key === "ix" || key === "dragData" || key === "layouts") {
        return undefined
      } else if (typeof value === "number") {
        value = parseInt(value * 1000) / 1000
      }

      return value
    }

    console.log(
      "layout",
      JSON.stringify(state, replacer, '  ')
    );

  }


  return (
    <DragContext.Provider
      value ={{
        circles,
        startDrag,
        sizes,
        updateSize,
        coverage,
        hasOverlap,
        layouts,
        saveLayout,
        selectLayout
      }}
    >
      {children}
    </DragContext.Provider>
  )
}
