/**
 * AreaCovered.jsx
 */

import { useContext } from "react"
import { DragContext } from "../context/DragContext"

export const AreaCovered = () => {
  const { coverage, hasOverlap } = useContext(DragContext)

  return (
    <h2
      disabled={hasOverlap}
    >
      Area Covered: {coverage}
    </h2>
  )
}