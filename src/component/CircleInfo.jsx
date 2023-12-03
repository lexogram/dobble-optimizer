/**
 * CircleInfo.jsx
 */

import { useContext } from 'react'
import { DragContext } from '../context/DragContext'


export const CircleInfo = ({ id }) => {
  const { dimensions } = useContext(DragContext)
  const data = dimensions[id]
  let { cx, cy, r, fill } = data
  cx = cx.toFixed(3)
  cy = cy.toFixed(3)
  r = r.toFixed(3)
  const size = "3em"

  const style = {
    display: "inline-block",
    width: size,
    height: size,
    textAlign: "center",
    lineHeight: size,
    borderRadius: size,
    backgroundColor: fill,
  }
  

  return (
    <>
      <span
        style={style}
      >
        {id}
      </span>
      <ul>
        <li>x: {cx}</li>
        <li>y: {cy}</li>
        <li>r: {r}</li>
      </ul>
    </>
  )
}