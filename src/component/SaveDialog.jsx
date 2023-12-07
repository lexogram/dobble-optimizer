/**
 * SaveDialog.jsx
 */


import { useContext, useState, useRef, useEffect } from "react"
import { DragContext } from "../context/DragContext"



export const SaveDialog = () => {
  const {
    showDialog,
    cancelDialog,
    saveAs,
    layoutNames
  } = useContext(DragContext)
  const [ layoutName, setLayoutName ] = useState("")
  const inputRef = useRef()


  const checkForEnter = event => {
    if (event.key === "Enter") {
      event.preventDefault()
      save()
    }
  }


  const updateName = event => {
    setLayoutName(event.target.value)
  }


  const cancel = () => {
    cancelDialog()
  }


  // Disable button if there is no input, or if there is a
  // case insensitive match with an existing layout name
  const disabled = (() => {
    if (!layoutName) {
      return true
    }

    const lowerCaseName = layoutName.toLowerCase()
    const unique = layoutNames.every( name => (
      name.toLowerCase() !== lowerCaseName
    ))

    return !unique
  })()


  const save = () => {
    if (!disabled) {
      saveAs(layoutName)
    }
  }


  useEffect(() => {
    // Set focus in the input field
    const input = inputRef.current
    if (input) {
      input.focus()
    }
  }, [showDialog])


  return (
    showDialog && <div id="dialog">
      <div>
        <h1>Save layout as:</h1>
        <input
          type="text"
          name=""
          id=""
          value={layoutName}
          onKeyDown={checkForEnter}
          onChange={updateName}
          ref={inputRef}
        />
        <div className="buttons">
          <button
            onClick={cancel}
          >
            Cancel
          </button>
          <button
            className="save"
            disabled={disabled}
            onClick={save}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}