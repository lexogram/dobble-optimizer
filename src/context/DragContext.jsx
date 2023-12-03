/**
 * DragContext.jsx
 * description
 */

import React, { createContext, useState } from 'react'



export const DragContext = createContext()



const initialState = {
  one: { cx: 0, cy: 0, r: 25, colour: "#030" },
  two: { cx: 25, cy: 25, r: 10 },
}
const viewBoxRegex = /\d+\s+\d+\s+(\d+)\s+(\d+)/ // "0 0 100 100"

export const DragProvider = ({ children }) => {
  const [ dimensions, setTheDimensions ] = useState(initialState)


  const setDimensions = dimensions => {
    console.log("dimensions:", dimensions);
    setTheDimensions(dimensions)
  }

  function startDrag(event) {
    const target = event.target

    // Find the scale of the svg viewBox. Assume:
    // 1. Width and Height are identical
    // 2. Left and Top are both 0
    const viewBox = target.closest("svg").getAttribute("viewBox")
    const matches = viewBoxRegex.exec(viewBox)
    const scale = Number(matches[1]) // "0 0 (100) 100"
    const outerRadius = scale / 2
     
    // Find the centre and the scale of the <g> parent. Assume:
    // <g> is translated by half of scale on both x and y axes
    const gParent = target.closest("g")
    const { x, y, width: size } = gParent.getBoundingClientRect()
    const gx = size / scale
    const ox = x + size / 2
    const oy = y + size / 2

    // Find the centre of the target
    const id = target.id
    let data = dimensions[id] // { cx, cy, r [, fill] }
    const cx = ox + data.cx * gx
    const cy = oy + data.cy * gx

    // Find the maximum (squared) distance from the origin of <g>
    const maxDistance = outerRadius - data.r
    const maxDistance2 = maxDistance * maxDistance
    
    // Find the offset from the click to the centre of the target
    const clickX = event.pageX
    const clickY = event.pageY
    const offsetX = cx - clickX
    const offsetY = cy - clickY
    console.log(" cx, cy:", cx, cy, );
    console.log(" ox, oy:", ox, oy, );
    console.log("clickX, clickY:", clickX, clickY);
    console.log("offsetX, offsetY:", offsetX, offsetY);
  
    // TODO: Add timeout to stop drag, in case mouseUp was outside
    // browser window
    document.documentElement.onmousemove = drag
    document.documentElement.onmouseup = stopDrag

    // Ensure dragged circle stays entirely inside the OuterCircle
    function getNewCentre(cx, cy) {
      const distance2 = (cx * cx) + (cy * cy)
      if (distance2 > maxDistance2) {
        const distance = Math.sqrt(distance2)
        const correction = maxDistance / distance
        cx *= correction
        cy *= correction
      }
      return { cx, cy }
    }
  
    function drag(event) {
      const left = offsetX + event.pageX
      const top = offsetY + event.pageY
      const { cx, cy } = getNewCentre((left-ox)/gx, (top-oy)/gx)

      data = { ...data, cx, cy }
      setDimensions({ ...dimensions, [id]: data })
    }
  
    function stopDrag() {
      document.documentElement.onmousemove = null
      document.documentElement.onmouseup = null
    }
  }


  return (
    <DragContext.Provider
      value ={{
        dimensions,
        startDrag
      }}
    >
      {children}
    </DragContext.Provider>
  )
}
