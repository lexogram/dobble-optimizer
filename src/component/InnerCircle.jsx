/**
 * InnerCircle.jsx
 */

import { useContext } from "react"
import { DragContext } from "../context/DragContext"


export const InnerCircle = ({ id, fill }) => {
  const { startDrag, dimensions } = useContext(DragContext)
  const { cx, cy, r, colour } = dimensions[id]

  return (
    <circle
      id={id}
      className="svg"
      cx={cx}
      cy={cy}
      r={r}
      fill={colour || fill}
      onMouseDown={startDrag}
    />
  )
}