/**
 * Slider.jsx
 */

import { useContext, useRef, useEffect, useState } from "react"
import { DragContext } from "../context/DragContext"

export const Slider = ({ title, max, min }) => {
  const range = max - min
  const rangeRef = useRef()
  const thumbRef = useRef()
  const [ thumbLeft, setThumbLeft ] = useState(-100) // offscreen


  const className = title.toLowerCase().replace(/\s+/, "-")
  // Initial Size —> initial-size
  const id = className.replace(/-.*/, "")
  // initial-size —> initial

  const { sizes, updateSize } = useContext(DragContext)
  const value = Number(sizes[id])


  const placeThumb = () => {
    // Get the widths of the range element and the thumb
    const { x: minX, width: rangeWidth } = rangeRef
      .current.getBoundingClientRect()
    const { width: thumbWidth } = thumbRef
      .current.getBoundingClientRect()

    // Find which percent of the range width represents 100% of
    // the thumb movement
    const maxScroll = rangeWidth - thumbWidth
    const ratio = (value - min) / range
    const thumbLeft = ratio * maxScroll
    setThumbLeft(thumbLeft)
  }


  const style = {
    left: `${thumbLeft}px`
  }



  const checkKey = event => {

  }


  const updateValue = event => {
    const value = event.target.value
    updateSize(id, value)
  }


  const updateSlider = (ratio) => {
    const value = min + (range * ratio)
    updateSize(id, value)
  }


  const startDrag = event => {
    let clientX = event.clientX
    // The click could be on the .range div or the .thumb div. If
    // it's on the .range div, the thumb should jump to underneath
    // the mouse... and then start moving.
    let range = event.target
    let thumb = event.target
    let placeThumb = false

    if (thumb.classList.contains("range")) {
      thumb = thumb.querySelector(".thumb")
      placeThumb = true

    } else {
      range = range.closest(".range")
    }

    // Determine the dimensions of the range and the thumb
    const {
      x: revertX,
      width: thumbWidth
    } = thumb.getBoundingClientRect()
    const {
      x: minX,
      width: rangeWidth
    } = range.getBoundingClientRect()
    const maxScroll = rangeWidth - thumbWidth
    const maxX = minX + maxScroll

    const thumbX = (placeThumb)
      ? Math.max(minX, Math.min(clientX - thumbWidth/2, maxX))
      // Half a thumbWidth to the left of the mouse, if possible
      : revertX

    if (placeThumb) {
      const scrollX = thumbX - minX
      const ratio = scrollX / maxScroll
      updateSlider(ratio)
    }

    const offsetX = thumbX - clientX

    document.body.addEventListener("mousemove", drag)
    document.body.addEventListener("mouseup", stopDrag)


    function drag(event) {
      const dragX = event.clientX + offsetX
      const scrollX = Math.max(minX, Math.min(dragX, maxX)) - minX
      const ratio = scrollX / maxScroll
      updateSlider(ratio)
    }


    function stopDrag() {
      document.body.removeEventListener("mousemove", drag)
      document.body.removeEventListener("mouseup", stopDrag)
    }
  }


  useEffect(placeThumb, [value])


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