/**
 * SaveButton.jsx
 */


import { useContext } from "react"
import { DragContext } from "../context/DragContext"

export const SaveButton = () => {
  const { saveLayout, hasOverlap } = useContext(DragContext)

  return (
    <button
      onClick={saveLayout}
      disabled={hasOverlap}
    >
      Save Layout...
    </button>
  )
}