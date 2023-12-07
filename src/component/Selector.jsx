/**
 * Selector.jsx
 */

import { useContext } from "react"
import { DragContext } from "../context/DragContext"



export const Selector = () => {
  const {
    current,
    layoutNames,
    selectLayout
  } = useContext(DragContext)

  const options = layoutNames.map( layoutName => (
    <option
      key={layoutName}
      value={layoutName}
      selected={layoutName === current}
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