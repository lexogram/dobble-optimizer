/**
 * Selector.jsx
 */

import { useContext } from "react"
import { DragContext } from "../context/DragContext"



export const Selector = () => {
  const { layouts, selectLayout } = useContext(DragContext)

  const options = layouts.map( layoutName => (
    <option
      key={layoutName}
      value={layoutName}
    >
      {layoutName}
    </option>
  ))

  const setLayout = event => {
    const value = event.target.value
    selectLayout(value)
  }


  return (
    <label htmlFor="layout">
      <span>Layout:</span>
      <select
        name="layout" id="layout"
        onChange={setLayout}
      >
        {options}
      </select>
    </label>
  )
}