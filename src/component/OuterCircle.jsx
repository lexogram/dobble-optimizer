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
          <InnerCircle id="one"   fill="#420" />
          <InnerCircle id="two"   fill="#340" />
          <InnerCircle id="three" fill="#050" />
          <InnerCircle id="four"  fill="#033" />
          <InnerCircle id="five"  fill="#024" />
          <InnerCircle id="six"   fill="#006" />
          <InnerCircle id="seven" fill="#204" />
          <InnerCircle id="eight" fill="#402" />

          <line
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
          />
        </g>
      </svg>
    </div>
  )
}