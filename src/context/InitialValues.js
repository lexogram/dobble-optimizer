/**
 * InitialValues.jsx
 *
 */


export const initialSizes = {
  initial: 0.4175,
  final: 0.20875,
  ratio: Math.pow(0.5, 1/7) // HARD-CODED to generate final
}


export const adjustSizes = (
  key, value,
  sizes, setSizes,
  dimensions, setDimensions
) => {
  // Treat the dimensions
  sizes = updateSizes(key, value, sizes)
  if (!sizes) {
    return
  }

  setSizes(sizes)

  // TODO: Adjust the position and sizes of the circles
}


function updateSizes(key, value, sizes) {
  // Update the ratio or the final value in sizes
  let final = sizes.initial
  let ratio = sizes.ratio

  switch (key) {
    default: return false

    case "initial":
      final = value
      // FALL THROUGH //
    case "ratio":
      if (key === "ratio") { // but not "initial"
        ratio = value
      }
      sizes.final = (() => {
        for ( let ii = 0; ii < 7; ii += 1 ) {
          final *= ratio
        }

        return final
      })()
    break

    case "final": 
      sizes.ratio = (() => {
        const scale = value / this.initial
        return Math.pow(scale, 1/7)
      })()
  }

  return sizes
}



// export const initialState = {
//   one:   { cx: 0, cy: 0, r: 25, ix: new Set() },
//   two:   { cx: 0, cy: 0, r: 10, ix: new Set() },
//   three: { cx: 0, cy: 0, r: 10, ix: new Set() },
//   four:  { cx: 0, cy: 0, r: 10, ix: new Set() },
//   five:  { cx: 0, cy: 0, r: 10, ix: new Set() },
//   six:   { cx: 0, cy: 0, r: 10, ix: new Set() },
//   seven: { cx: 0, cy: 0, r: 10, ix: new Set() },
//   eight: { cx: 0, cy: 0, r: 10, ix: new Set() }
// }

export const initialState1 = {
  "one": {
    "cx": 6.007,
    "cy": -29.392,
    "r": 20.5,
    "ix": new Set(),
    "fill": "#420"
  },
  "two": {
    "cx": -31.294,
    "cy": -2.942,
    "r": 18.567,
    "ix": new Set(),
    "fill": "#340"
  },
  "three": {
    "cx": -16.059,
    "cy": 29.038,
    "r": 16.816,
    "ix": new Set(),
    "fill": "#050"
  },
  "four": {
    "cx": 18.838,
    "cy": 29.222,
    "r": 15.231,
    "ix": new Set(),
    "fill": "#033"
  },
  "five": {
    "cx": 3.074,
    "cy": 4.798,
    "r": 13.795,
    "ix": new Set(),
    "fill": "#024"
  },
  "six": {
    "cx": 36.686,
    "cy": 7.791,
    "r": 12.494,
    "ix": new Set(),
    "fill": "#006"
  },
  "seven": {
    "cx": 34.852,
    "cy": -15.956,
    "r": 11.316,
    "ix": new Set(),
    "fill": "#204"
  },
  "eight": {
    "cx": -24.793,
    "cy": -31.07,
    "r": 10.25,
    "ix": new Set(),
    "fill": "#402"
  }
}

// let radius = initialSizes.final * 100
// const ratio = initialSizes.ratio
// Object.entries(initialState).forEach(([ id, data ], index ) => {
//   data.r = radius
//   radius *= ratio
// })

export const initialState2 = {
  "one": {
    "cx": 6.007,
    "cy": -29.392,
    "r": 20.5,
    "fill": "#840"
  },
  "two": {
    "cx": -31.294,
    "cy": -2.942,
    "r": 18.567,
    "fill": "#680"
  },
  "three": {
    "cx": 0.061,
    "cy": 33.097,
    "r": 16.816,
    "fill": "#090"
  },
  "four": {
    "cx": 34.03,
    "cy": -7.128,
    "r": 15.231,
    "fill": "#066"
  },
  "five": {
    "cx": 28.854,
    "cy": 21.868,
    "r": 13.795,
    "fill": "#048"
  },
  "six": {
    "cx": 3.012,
    "cy": 3.731,
    "r": 12.494,
    "fill": "#00c"
  },
  "seven": {
    "cx": -27.727,
    "cy": 26.974,
    "r": 11.316,
    "fill": "#408"
  },
  "eight": {
    "cx": -24.793,
    "cy": -31.07,
    "r": 10.25,
    "fill": "#804"
  }
}

export const initialState = {
  "one": {
    "cx": 0.00,
    "cy": -29.124,
    "r": 20.875,
    "fill": "#840"
  },
  "two": {
    "cx": -30.712,
    "cy": 4.851,
    "r": 18.906,
    "fill": "#680"
  },
  "three": {
    "cx": 31.811,
    "cy": -8.297,
    "r": 17.124,
    "fill": "#090"
  },
  "four": {
    "cx": 3.603,
    "cy": 8.195,
    "r": 15.51,
    "fill": "#066"
  },
  "five": {
    "cx": -13.686,
    "cy": 33.245,
    "r": 14.047,
    "fill": "#048"
  },
  "six": {
    "cx": 13.124,
    "cy": 34.889,
    "r": 12.723,
    "fill": "#00a"
  },
  "seven": {
    "cx": 32.602,
    "cy": 20.432,
    "r": 11.523,
    "fill": "#408"
  },
  "eight": {
    "cx": -31.037,
    "cy": -24.533,
    "r": 10.437,
    "fill": "#804"
  }
}
let radius = initialSizes.initial * 50
const ratio = initialSizes.ratio
Object.entries(initialState).forEach(([ id, data ], index ) => {
  data.ix = new Set()
  data.r = radius
  radius *= ratio
})