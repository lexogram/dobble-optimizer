/**
 * Selector.jsx
 */


export const Selector = () => {


  return (
    <label htmlFor="layout">
      <span>Layout:</span>
      <select name="layout" id="layout">
        <option value="default">Default</option>
      </select>
    </label>
  )
}