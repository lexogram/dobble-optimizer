/**
 * Slider.jsx
 */

import { useContext } from "react"
import { DragContext } from "../context/DragContext"

export const Slider = ({ title }) => {
  const className = title.toLowerCase().replace(/\s+/, "-")
  // Initial Size —> initial-size
  const id = className.replace(/-.*/, "")
  // initial-size —> initial

  const { sizes, updateSize } = useContext(DragContext)
  const value = sizes[id]


  const checkKey = event => {
    
  }


  const updateValue = event => {
    const value = event.target.value
    updateSize(id, value)
  }


  const startDrag = event => {
    
  }
  

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
          value={value}
          onKeyDown={checkKey}
          onChange={updateValue}
        />
        <div
          className="range"
          onMouseDown={startDrag}
        >
          <div className="thumb">
          </div>
        </div>
      </div>
    </div>
  )
}