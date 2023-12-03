/**
 * Dimensions.jsx
 */

import { Slider } from "./Slider"


export const Dimensions = (props) => {


  return (
    <div id="dimensions">
      <Slider title="Initial Size" />
      <Slider title="Ratio" />
      <Slider title="Final Size" />
    </div>
  )
}