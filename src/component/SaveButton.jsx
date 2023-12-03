/**
 * SaveButton.jsx
 */


import { useContext } from "react"
import { DragContext } from "../context/DragContext"

export const SaveButton = () => {
  const { saveLayout } = useContext(DragContext)

  return (
    <button
      onClick={saveLayout}
    >
      Save Layout
    </button>
  )
}