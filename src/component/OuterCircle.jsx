/**
 * OuterCircle.jsx
 */

import { InnerCircle } from "./InnerCircle"


export const OuterCircle = (props) => {


  return (
    <div id="outer-circle">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">

        <g
          transform="translate(50, 50)"
        >
          <circle cx="0" cy="0" r="50" />
          <InnerCircle id="one"   />
          <InnerCircle id="two"   />
          <InnerCircle id="three" />
          <InnerCircle id="four"  />
          <InnerCircle id="five"  />
          <InnerCircle id="six"   />
          <InnerCircle id="seven" />
          <InnerCircle id="eight" />

          {/* <line
            x1="0"
            y1="-50"
            x2="0"
            y2="50"
            stroke="white"
            strokeWidth="0.05"
          />

          <line
            x1="-50"
            y1="0"
            x2="50"
            y2="0"
            stroke="white"
            strokeWidth="0.05"
          /> */}
        </g>
      </svg>
    </div>
  )
}