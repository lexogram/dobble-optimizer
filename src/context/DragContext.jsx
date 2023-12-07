/**
 * DragContext.jsx
 * description
 */

import React, { createContext, useReducer } from 'react'
import { reducer, initialState } from './DragReducer'


export const DragContext = createContext()



export const DragProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer( reducer, initialState )
  const {
    current,
    circles,
    sizes,
    coverage,
    hasOverlap,
    layoutNames,
    modified,
    showDialog
  } = state


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
    const action = {
      type: "TOGGLE_SAVE_DIALOG",
      payload: true
    }
    dispatch(action)
  }


  const cancelDialog = () => {
    const action = {
      type: "TOGGLE_SAVE_DIALOG",
      payload: false
    }
    dispatch(action)
  }


  const saveAs = layoutName => {
    const action = {
      type: "SAVE_LAYOUT",
      payload: layoutName
    }
    dispatch(action) 
  }


  return (
    <DragContext.Provider
      value ={{
        current,
        circles,
        startDrag,
        sizes,
        updateSize,
        coverage,
        hasOverlap,
        layoutNames,
        selectLayout,
        modified,
        saveLayout,
        showDialog,
        cancelDialog,
        saveAs
      }}
    >
      {children}
    </DragContext.Provider>
  )
}
