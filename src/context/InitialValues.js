







export const initialSizes = {
  initial: 0.41,
  ratio: Math.pow(0.5, 1/7),
  final: 0.205,

  // set size(data) {
  //   const [ key, value ] = Object.entries(data)[0]
  //   let final = this.initial
  //   let ratio = this.ratio

  //   switch (key) {
  //     default: return

  //     case "initial":
  //       final = value
  //       // FALL THROUGH //
  //     case "ratio":
  //       if (key === "ratio") { // but not "initial"
  //         ratio = value
  //       }
  //       this.final = (() => {
  //         for ( let ii = 0; ii < 7; ii += 1 ) {
  //           final *= ratio
  //         }

  //         return final
  //       })()
  //     break

  //     case "final": 
  //       this.ratio = (() => {
  //         const scale = value / this.initial
  //         return Math.pow(scale, 1/7)
  //       })()
  //   }

  //   this[key] = value
  // }
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


export const saveLayout = (dimensions) => {
  console.log("dimensions:", dimensions);
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
export const initialState = {
  "one": {
    "cx": 6.007,
    "cy": -29.392,
    "r": 20.5,
    "ix": new Set()
  },
  "two": {
    "cx": -31.294,
    "cy": -2.942,
    "r": 18.567,
    "ix": new Set()
  },
  "three": {
    "cx": -16.059,
    "cy": 29.038,
    "r": 16.816,
    "ix": new Set()
  },
  "four": {
    "cx": 18.838,
    "cy": 29.222,
    "r": 15.231,
    "ix": new Set()
  },
  "five": {
    "cx": 3.074,
    "cy": 4.798,
    "r": 13.795,
    "ix": new Set()
  },
  "six": {
    "cx": 36.686,
    "cy": 7.791,
    "r": 12.494,
    "ix": new Set()
  },
  "seven": {
    "cx": 34.852,
    "cy": -15.956,
    "r": 11.316,
    "ix": new Set()
  },
  "eight": {
    "cx": -24.793,
    "cy": -31.07,
    "r": 10.25,
    "ix": new Set()
  }
}

let radius = initialSizes.final * 100
const ratio = initialSizes.ratio
Object.entries(initialState).forEach(([ id, data ], index ) => {
  data.r = radius
  radius *= ratio
})

console.log("initialValues - State:", initialState);
