/**
 * InnerCircle.jsx
 */

import { useContext } from "react"
import { DragContext } from "../context/DragContext"


export const InnerCircle = ({ id }) => {
  const { startDrag, circles } = useContext(DragContext)
  let { cx, cy, r, ix, fill } = circles[id]
  let stroke

  if (ix.size) {
    fill = "#600"
    stroke = "#fff"
  } else {
    stroke="none"
  }

  return (
    <circle
      id={id}
      className="svg"
      cx={cx}
      cy={cy}
      r={r}
      fill={fill}
      stroke={stroke}
      strokeWidth={0.1}
      onMouseDown={startDrag}
    />
  )
}