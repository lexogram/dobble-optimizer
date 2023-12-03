/**
 * Dimensions.jsx
 */

import { Slider } from "./Slider"
import { SaveButton } from "./SaveButton"


export const Dimensions = (props) => {


  return (
    <div id="dimensions">
      <Slider title="Initial Size" />
      <Slider title="Ratio" />
      <Slider title="Final Size" />
      <SaveButton />
    </div>
  )
}