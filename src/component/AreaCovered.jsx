/**
 * AreaCovered.jsx
 */

import { useContext } from "react"
import { DragContext } from "../context/DragContext"

export const AreaCovered = () => {
  const { dimensions } = useContext(DragContext)

  const totalArea = Math.PI * 50 * 50
  const circleData = Object.values(dimensions)

  const coveredArea = circleData.reduce(( area, data) => {
    const { r } = data
    area += Math.PI * r * r
    return area
  }, 0)

  const areaCovered = (coveredArea * 100 / totalArea)
  .toFixed(3) + "%"
  
  const disabled = circleData.some( data => data.ix.size )
  console.log("disabled:", disabled);
  


  return (
    <h1
      disabled={disabled}
    >
      Area Covered: {areaCovered}
    </h1>
  )
}