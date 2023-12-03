/**
 * SaveButton.jsx
 */


import { useContext } from "react"
import { DragContext } from "../context/DragContext"

export const SaveButton = () => {
  const { saveLayout, dimensions } = useContext(DragContext)

  
  const disabled = Object.values(dimensions).some(
    data => data.ix.size
  )

  return (
    <button
      onClick={saveLayout}
      disabled={disabled}
    >
      Save Layout...
    </button>
  )
}