/**
 * Dimensions.jsx
 */

import { useContext } from "react"
import { DragContext } from "../context/DragContext"

import { Slider } from "./Slider"
import { CircleInfo } from "./CircleInfo"
import { SaveButton } from "./SaveButton"


export const Dimensions = () => {
  const { dimensions } = useContext(DragContext)
  const circleIds = Object.keys(dimensions)
  console.log("circleIds:", circleIds);

  const infoList = circleIds.map(( id ) => (
    <li
      key={id}
    >
      <CircleInfo
        id={id}
      />
    </li>
  ))


  return (
    <div id="dimensions">
      <Slider title="Initial Size" />
      <Slider title="Ratio" />
      <Slider title="Final Size" />
      <ul>{infoList}</ul>
      <SaveButton />
    </div>
  )
}