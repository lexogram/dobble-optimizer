/**
 * Dimensions.jsx
 */

import { useContext } from "react"
import { DragContext } from "../context/DragContext"

import { Selector } from "./Selector"
import { Slider } from "./Slider"
import { CircleInfo } from "./CircleInfo"
import { AreaCovered } from "./AreaCovered"
import { SaveButton } from "./SaveButton"


export const Dimensions = () => {
  const { sizes, circles } = useContext(DragContext)
  const circleIds = Object.keys(circles)

  const infoList = circleIds.map(( id ) => (
    <li
      key={id}
    >
      <CircleInfo
        id={id}
      />
    </li>
  ))

  const maxSize = 0.45
  const minSize = 0.30 // .302593388 allows a circle of 7 circles
  const minRatio = 0.82
  const maxMin = sizes.initial
  const minMin = maxMin * Math.pow(minRatio, 7)

  return (
    <div id="dimensions">
      <Selector />
      <hr />
      <Slider
        title="Initial Size"
        max={maxSize}
        min={minSize}
      />
      <Slider
        title="Ratio"
        max={1}        // smallest = 2/3 of largest
        min={minRatio} // smallest = 1/4 of largest
      />
      <Slider
        title="Final Size"
        max={maxMin}
        min={minMin}
      />
      <AreaCovered />
      <SaveButton />
      <hr />
      <ul>{infoList}</ul>
    </div>
  )
}