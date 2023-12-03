/**
 * Slider.jsx
 */

import { useContext, useRef, useEffect, useState } from "react"
import { DragContext } from "../context/DragContext"

export const Slider = ({ title, max, min }) => {
  const rangeRef = useRef()
  const thumbRef = useRef()
  const [ percent, setPercent ] = useState(-100) // offscreen


  const className = title.toLowerCase().replace(/\s+/, "-")
  // Initial Size —> initial-size
  const id = className.replace(/-.*/, "")
  // initial-size —> initial

  const { sizes, updateSize } = useContext(DragContext)
  const value = Number(sizes[id])


  const placeThumb = () => {
    // Get the widths of the range element and the thumb
    const { width: rangeWidth } = rangeRef
      .current.getBoundingClientRect()
    const { width: thumbWidth } = thumbRef
      .current.getBoundingClientRect()

    // Find which percent of the range width represents 100% of
    // the thumb movement
    const range = max - min
    const freeRange = (rangeWidth - thumbWidth) * 100 / rangeWidth
    const percent = (value - min) * freeRange / range
    setPercent(percent)
  }

  const style = {
    left: `${percent}%`
  }



  const checkKey = event => {

  }


  const updateValue = event => {
    const value = event.target.value
    updateSize(id, value)
  }


  const startDrag = event => {

  }


  useEffect(placeThumb, [])


  return (
    <div
      id={id}
      className={"setting " + className}
    >
      <p>{title}</p>
      <div className="slider">
        <input
          type="text"
          name=""
          value={value.toFixed(3)}
          onKeyDown={checkKey}
          onChange={updateValue}
        />
        <div
          className="range"
          onMouseDown={startDrag}
          ref={rangeRef}
        >
          <div
            className="thumb"
            style={style}
            ref={thumbRef}
          ></div>
        </div>
      </div>
    </div>
  )
}