/**
 * CircleInfo.jsx
 */

import { useContext } from 'react'
import { DragContext } from '../context/DragContext'


export const CircleInfo = ({ id }) => {
  const { circles } = useContext(DragContext)
  const data = circles[id]
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
      <p>&lt;circle cx="{cx}" cy="{cy}" r="{r}" /&gt;</p>
      {/* <ul>
        <li>cx: {cx}</li>
        <li>cy: {cy}</li>
        <li>r: {r}</li>
      </ul> */}
    </>
  )
}