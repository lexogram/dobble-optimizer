/**
 * DragReducer.jsx
 *
 * This app needs to deal with two types of data:
 * 1. The initial and final sizes of the circles, and the ratio
 *    that moves smoothly from one to the other. This is stored
 *    in a `sizes` map
 * 2. The centre and radius of each of the circles. This is stored
 *    in a `circles` map, along with fill colour and a set for
 *    intersecting circles.
 *
 * The user can save a layout, which consists of these two maps.
 * By default, two layouts are provided.
 */


const STORAGE_KEY = "dobble-optimizer"
const OUTER_RADIUS = 50
const VIEWBOX_REGEX = /\d+\s+\d+\s+(\d+)\s+(\d+)/ // "0 0 100 100"



const defaultLayouts = {
  "Big Centre (79.66)": {
    "sizes": {
      "initial": 0.302, // 30.2593388
      "final": 0.302, "ratio": 1
    },
    "circles": {
      "one": {
        "cx": 0, "cy": 0, "r": 19.74999, // 19.75 causes intersection; 30% bigger
        "fill": "#840"
      },
      "two": {
        "cx": 0, "cy": -34.875, "r": 15.125, // 15.1296694
        "fill": "#880"
      },
      "three": {
        "cx": 27.26637295107254, "cy": -21.744206839823335, "r": 15.125, "fill": "#090"
      },
      "four": {
        "cx": 34.0006109373411, "cy": 7.760417571726462, "r": 15.125, "fill": "#066"
      },
      "five": {
        "cx": 15.131695401724844, "cy": 31.421289268096864, "r": 15.125, "fill": "#048"
      },
      "six": {
        "cx": -15.131695401724844, "cy": 31.421289268096864, "r": 15.125, "fill": "#009"
      },
      "seven": {
        "cx": -34.0006109373411, "cy": 7.760417571726462, "r": 15.125, "fill": "#408"
      },
      "eight": {
        "cx": -27.26637295107254, "cy": -21.744206839823335, "r": 15.125, "fill": "#804"
      }
    },
    "coverage": "79.657%"
  },
  "Orange 78.43": {
    "sizes": {
      "initial": 0.38, "final": 0.248, "ratio": 0.94
    },
    "circles": {
      "one": {
        "cx": 1.37, "cy": 5.064, "r": 19.011, "fill": "#840"
      },
      "two": {
        "cx": -0.05, "cy": -32.114, "r": 17.885, "fill": "#880"
      },
      "three": {
        "cx": -29.867, "cy": -14.225, "r": 16.826, "fill": "#090"
      },
      "four": {
        "cx": 29.937, "cy": -16.472, "r": 15.83, "fill": "#066"
      },
      "five": {
        "cx": -30.42, "cy": 17.524, "r": 14.892, "fill": "#048"
      },
      "six": {
        "cx": 33.417, "cy": 13.359, "r": 14.01, "fill": "#00a"
      },
      "seven": {
        "cx": -8.956, "cy": 35.712, "r": 13.181, "fill": "#408"
      },
      "eight": {
        "cx": 16.594, "cy": 33.739, "r": 12.4, "fill": "#804"
      }
    },
    "coverage": "78.426%"
  },
  "Yellow 77.36": {
    "sizes": {
      "initial": 0.393, "final": 0.231, "ratio": 0.926
    },
    "circles": {
      "one": {
        "cx": 0, "cy": -30.312, "r": 19.687, "fill": "#840"
      },
      "two": {
        "cx": 2.239, "cy": 7.566, "r": 18.247, "fill": "#880"
      },
      "three": {
        "cx": -31.179, "cy": -11.075, "r": 16.911, "fill": "#090"
      },
      "four": {
        "cx": 31.371, "cy": -13.93, "r": 15.674, "fill": "#066"
      },
      "five": {
        "cx": -29.014, "cy": 20.407, "r": 14.527, "fill": "#048"
      },
      "six": {
        "cx": 33.187, "cy": 15.277, "r": 13.464, "fill": "#009"
      },
      "seven": {
        "cx": -7.493, "cy": 36.764, "r": 12.479, "fill": "#408"
      },
      "eight": {
        "cx": 17.054, "cy": 34.442, "r": 11.566, "fill": "#804"
      }
    },
    "coverage": "77.365%"
  },
  "Green 77.17": {
    "sizes": {
      "initial": 0.4, "final": 0.224, "ratio": 0.921
    },
    "coverage": 77.171,
    "circles": {
      "one": {
        "cx": 0, "cy": -30, "r": 20, "fill": "#840"
      },
      "two": {
        "cx": -31.003, "cy": 6.005, "r": 18.42, "fill": "#880"
      },
      "three": {
        "cx": 4.403, "cy": 6.73, "r": 16.964, "fill": "#090"
      },
      "four": {
        "cx": 31.611, "cy": -13.505, "r": 15.624, "fill": "#066"
      },
      "five": {
        "cx": -12.24, "cy": 33.439, "r": 14.39, "fill": "#048"
      },
      "six": {
        "cx": 33.385, "cy": 15.352, "r": 13.253, "fill": "#00a"
      },
      "seven": {
        "cx": 15.32, "cy": 34.548, "r": 12.206, "fill": "#408"
      },
      "eight": {
        "cx": -30.657, "cy": -23.712, "r": 11.242, "fill": "#804"
      }
    }
  },
  "Teal 77.12": {
    "sizes": {
      "initial": 0.4175, "final": 0.20875, "ratio": Math.pow(0.5, 1/7) // HARD-CODED to generate final
    },
    "coverage": 77.121,
    "circles": {
      "one": {
        "cx": 0.00, "cy": -29.124, "r": 20.875, "fill": "#840"
      },
      "two": {
        "cx": -30.712, "cy": 4.851, "r": 18.906, "fill": "#880"
      },
      "three": {
        "cx": 31.811, "cy": -8.297, "r": 17.124, "fill": "#090"
      },
      "four": {
        "cx": 3.603, "cy": 8.195, "r": 15.51, "fill": "#066"
      },
      "five": {
        "cx": -13.686, "cy": 33.245, "r": 14.047, "fill": "#048"
      },
      "six": {
        "cx": 13.124, "cy": 34.889, "r": 12.723, "fill": "#00a"
      },
      "seven": {
        "cx": 32.602, "cy": 20.432, "r": 11.523, "fill": "#408"
      },
      "eight": {
        "cx": -31.037, "cy": -24.533, "r": 10.437, "fill": "#804"
      }
    }
  },
  "Yellow 76.98": {
    "sizes": {
      "initial": 0.37, "final": 0.251, "ratio": 0.946
    },
    "circles": {
      "one": {
        "cx": 0.107, "cy": -31.484, "r": 18.515, "fill": "#840"
      },
      "two": {
        "cx": 2.631, "cy": 4.481, "r": 17.522, "fill": "#880"
      },
      "three": {
        "cx": -32.804, "cy": 6.372, "r": 16.582, "fill": "#090"
      },
      "four": {
        "cx": 30.686, "cy": -15.341, "r": 15.692, "fill": "#066"
      },
      "five": {
        "cx": -14.346, "cy": 32.088, "r": 14.85, "fill": "#048"
      },
      "six": {
        "cx": 32.951, "cy": 14.364, "r": 14.053, "fill": "#00a"
      },
      "seven": {
        "cx": 13.823, "cy": 33.997, "r": 13.299, "fill": "#408"
      },
      "eight": {
        "cx": -29.748, "cy": -22.688, "r": 12.586, "fill": "#804"
      }
    },
    "coverage": "76.978%"
  },
  "Royal 76.82": {
    "sizes": {
      "initial": 0.45, "final": 0.178, "ratio": 0.876
    },
    "circles": {
      "one": {
        "cx": 0, "cy": -27.5, "r": 22.5, "fill": "#840"
      },
      "two": {
        "cx": -29.491, "cy": 6.848, "r": 19.723, "fill": "#880"
      },
      "three": {
        "cx": -2.842, "cy": 32.586, "r": 17.289, "fill": "#090"
      },
      "four": {
        "cx": 34.755, "cy": -2.478, "r": 15.156, "fill": "#066"
      },
      "five": {
        "cx": 26.934, "cy": 24.948, "r": 13.286, "fill": "#048"
      },
      "six": {
        "cx": 8.821, "cy": 5.804, "r": 11.646, "fill": "#009"
      },
      "seven": {
        "cx": -32.46, "cy": -23.012, "r": 10.209, "fill": "#408"
      },
      "eight": {
        "cx": 31.456, "cy": -26.373, "r": 8.949, "fill": "#804"
      }
    },
    "coverage": "76.818%"
  },
  "Green 76.52" : {
    "sizes": {
      "initial": 0.45,
      "final": 0.177,
      "ratio": 0.875
    },
    "circles": {
      "one": {
        "cx": 0,
        "cy": -27.5,
        "r": 22.5,
        "fill": "#840"
      },
      "two": {
        "cx": -30.23,
        "cy": 1.962,
        "r": 19.706,
        "fill": "#880"
      },
      "three": {
        "cx": 5.802,
        "cy": 11.994,
        "r": 17.259,
        "fill": "#090"
      },
      "four": {
        "cx": 33.396,
        "cy": -10.079,
        "r": 15.116,
        "fill": "#066"
      },
      "five": {
        "cx": -17.417,
        "cy": 32.372,
        "r": 13.239,
        "fill": "#048"
      },
      "six": {
        "cx": 34.596,
        "cy": 16.673,
        "r": 11.595,
        "fill": "#009"
      },
      "seven": {
        "cx": 4.902,
        "cy": 39.542,
        "r": 10.155,
        "fill": "#408"
      },
      "eight": {
        "cx": 23.218,
        "cy": 33.919,
        "r": 8.894,
        "fill": "#804"
      }
    },
    "coverage": "76.516%"
  },
  "Royal 75.45": {
    "sizes": {
      "initial": 0.427, "final": 0.193, "ratio": 0.892
    },
    "circles": {
      "one": {
        "cx": 0, "cy": -28.606, "r": 21.393, "fill": "#840"
      },
      "two": {
        "cx": -30.749, "cy": 3.079, "r": 19.096, "fill": "#880"
      },
      "three": {
        "cx": -8.67, "cy": 31.792, "r": 17.045, "fill": "#090"
      },
      "four": {
        "cx": 34.631, "cy": 3.259, "r": 15.215, "fill": "#066"
      },
      "five": {
        "cx": 21.891, "cy": 29.104, "r": 13.581, "fill": "#048"
      },
      "six": {
        "cx": 5.234, "cy": 4.855, "r": 12.123, "fill": "#009"
      },
      "seven": {
        "cx": 31.942, "cy": -22.641, "r": 10.821, "fill": "#408"
      },
      "eight": {
        "cx": -31.053, "cy": -25.749, "r": 9.659, "fill": "#804"
      }
    },
    "coverage": "75.452%"
  },
  "Blue 75.39": {
    "sizes": {
      "initial": 0.4, "final": 0.217, "ratio": 0.916
    },
    "circles": {
      "one": {
        "cx": 0, "cy": -29.988, "r": 20.011, "fill": "#840"
      },
      "two": {
        "cx": -31.292, "cy": 4.776, "r": 18.344, "fill": "#880"
      },
      "three": {
        "cx": -8.833, "cy": 31.985, "r": 16.817, "fill": "#090"
      },
      "four": {
        "cx": 34.206, "cy": 5.088, "r": 15.416, "fill": "#066"
      },
      "five": {
        "cx": 4.549, "cy": 4.057, "r": 14.132, "fill": "#048"
      },
      "six": {
        "cx": 21.091, "cy": 30.453, "r": 12.956, "fill": "#009"
      },
      "seven": {
        "cx": 31.021, "cy": -22.158, "r": 11.877, "fill": "#408"
      },
      "eight": {
        "cx": -30.468, "cy": -24.523, "r": 10.888, "fill": "#804"
      }
    },
    "coverage": "75.388%"
  },
  "Purple+Pink 75.18": {
    "sizes": {
      "initial": 0.445, "final": 0.176, "ratio": 0.876
    },
    "circles": {
      "one": {
        "cx": 0, "cy": -27.723, "r": 22.276, "fill": "#840"
      },
      "two": {
        "cx": -30.463, "cy": 0.97, "r": 19.521, "fill": "#880"
      },
      "three": {
        "cx": 17.356, "cy": 27.942, "r": 17.106, "fill": "#090"
      },
      "four": {
        "cx": -14.773, "cy": 31.74, "r": 14.99, "fill": "#066"
      },
      "five": {
        "cx": 36.586, "cy": 4.516, "r": 13.135, "fill": "#048"
      },
      "six": {
        "cx": 32.921, "cy": -19.94, "r": 11.51, "fill": "#009"
      },
      "seven": {
        "cx": -1.855, "cy": 8.645, "r": 10.086, "fill": "#408"
      },
      "eight": {
        "cx": 15.077, "cy": -0.376, "r": 8.838, "fill": "#804"
      }
    },
    "coverage": "75.183%"
  },
  "Royal+Blue 73.73": {
    "sizes": {
      "initial": 0.45, "final": 0.167, "ratio": 0.868
    },
    "circles": {
      "one": {
        "cx": 0, "cy": -27.5, "r": 22.5, "fill": "#840"
      },
      "two": {
        "cx": -30.423, "cy": 1.535, "r": 19.537, "fill": "#880"
      },
      "three": {
        "cx": -9.649, "cy": 31.593, "r": 16.965, "fill": "#090"
      },
      "four": {
        "cx": 21.847, "cy": 27.685, "r": 14.732, "fill": "#066"
      },
      "five": {
        "cx": 25.47, "cy": -3.005, "r": 12.792, "fill": "#048"
      },
      "six": {
        "cx": 2.905, "cy": 6.244, "r": 11.108, "fill": "#009"
      },
      "seven": {
        "cx": 32.054, "cy": -24.513, "r": 9.646, "fill": "#408"
      },
      "eight": {
        "cx": 39.626, "cy": 12.739, "r": 8.376, "fill": "#804"
      }
    },
    "coverage": "73.725%"
  },
  "Royal+Pink 73.32": {
    "sizes": {
      "initial": 0.4, "final": 0.209, "ratio": 0.911
    },
    "circles": {
      "one": {
        "cx": 0, "cy": -29.979, "r": 20.02, "fill": "#840"
      },
      "two": {
        "cx": -30.894, "cy": -7.311, "r": 18.251, "fill": "#880"
      },
      "three": {
        "cx": 7.155, "cy": 32.584, "r": 16.639, "fill": "#090"
      },
      "four": {
        "cx": -23.841, "cy": 25.392, "r": 15.169, "fill": "#066"
      },
      "five": {
        "cx": 32.651, "cy": 15.564, "r": 13.828, "fill": "#048"
      },
      "six": {
        "cx": -2.581, "cy": 4.978, "r": 12.606, "fill": "#009"
      },
      "seven": {
        "cx": 30.814, "cy": -23.091, "r": 11.492, "fill": "#408"
      },
      "eight": {
        "cx": 18.491, "cy": -4.701, "r": 10.477, "fill": "#804"
      }
    },
    "coverage": "73.319%"
  },
  "Off Centre (72.96)": {
    "sizes": {
      "initial": 0.302, "final": 0.302, "ratio": 1
    },
    "circles": {
      "one": {
        "cx": 0, "cy": -5.309, "r": 15.1, "fill": "#840"
      },
      "two": {
        "cx": 15.1, "cy": -31.463, "r": 15.1, "fill": "#880"
      },
      "three": {
        "cx": 34.025, "cy": -7.765, "r": 15.1, "fill": "#090"
      },
      "four": {
        "cx": 27.285, "cy": 21.759, "r": 15.1, "fill": "#066"
      },
      "five": {
        "cx": 0, "cy": 34.9, "r": 15.1, "fill": "#048"
      },
      "six": {
        "cx": -27.285, "cy": 21.759, "r": 15.1, "fill": "#009"
      },
      "seven": {
        "cx": -34.025, "cy": -7.765, "r": 15.1, "fill": "#408"
      },
      "eight": {
        "cx": -15.142, "cy": -31.444, "r": 15.1, "fill": "#804"
      }
    },
    "coverage": "72.963%"
  },
  "Royal+Purple 72.74": {
    "sizes": {
      "initial": 0.39, "final": 0.215, "ratio": 0.918
    },
    "circles": {
      "one": {
        "cx": 0, "cy": -30.455, "r": 19.544, "fill": "#840"
      },
      "two": {
        "cx": -30.76, "cy": -8.977, "r": 17.956, "fill": "#880"
      },
      "three": {
        "cx": 5.023, "cy": 33.124, "r": 16.497, "fill": "#090"
      },
      "four": {
        "cx": -25.38, "cy": 23.873, "r": 15.156, "fill": "#066"
      },
      "five": {
        "cx": 31.384, "cy": 17.788, "r": 13.924, "fill": "#048"
      },
      "six": {
        "cx": -3.004, "cy": 4.662, "r": 12.792, "fill": "#009"
      },
      "seven": {
        "cx": 19.573, "cy": -5.18, "r": 11.753, "fill": "#408"
      },
      "eight": {
        "cx": 29.959, "cy": -25.283, "r": 10.798, "fill": "#804"
      }
    },
    "coverage": "72.743%"
  },
}



// INITIAL STATE AND REDUCER // INITIAL STATE AND REDUCER //

export const initialState = (function (){
  // TODO: check which default layout the user set in localStorage
  let allLayouts = getLayoutsFromLocalStorage()
  allLayouts = { ...defaultLayouts, ...allLayouts}
  const layoutNames = Object.keys(allLayouts)
  let state = {}
  state.layoutNames = layoutNames
  state.allLayouts = allLayouts
  state.showDialog = false
  state.modified = false
  const current = state.current = layoutNames[1]
  const layout = allLayouts[current]

  checkForIntersections(layout.circles)

  return { ...state, ...layout }
})()



export const reducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case "START_DRAGGING":
      return startDragging(state, payload)

    case "DRAG":
      return drag(state, payload)

    case "STOP_DRAGGING":
      return stopDragging(state)

    case "UPDATE_SIZE":
      return updateSize(state, payload)

    case "SET_LAYOUT":
      return setLayout(state, payload)

    case "TOGGLE_SAVE_DIALOG":
      return toggleSaveDialog(state, payload)

    case "SAVE_LAYOUT":
      return saveLayout(state, payload)
  }

  return state
}



function sanitizeLayout(layout) {
  if (typeof layout !== "object") {
    return "ERROR: layout object expeced"
  }

  const hexColorRegex = /^#(([A-F0-9]{3})|([A-F0-9]{6}))$/
  const { sizes, circles } = layout
  if (typeof sizes !== "object") {
    if (typeof circles !== "object") {
      return "ERROR: layout object should contain sizes and circles"
    } else {
      return "ERROR: sizes are missing from layout object"
    }
  } else if (typeof circles !== "object") {
    return "ERROR: circles are missing from layout object"
  }

  let { initial, final, ratio } = sizes
  initial = Number(initial)
  final = Number(final)
  ratio = Number(ratio)
  if (isNaN(initial) || isNaN(final) || isNaN(ratio)) {
    return "ERROR: sizes object should contain number values for initial, final and ratio"
  }

  const entries = Object.entries(circles)
  if (entries.length !== 8) {
    return "ERROR: data for 8 circles expected"
  }

  let errorString = ""
  const invalid = entries.some(([ key, data ]) => {
    if (typeof key !== "string") {
      return `ERROR: invalid circle name ${key}`
    }
    let { cx, cy, r, fill } = data
    if (cx === undefined || cy === undefined || r === undefined) {
      errorString= `ERROR: invalid circles for circle "${key}"
      cx: ${cx}, cy: ${cy}, r: ${r}`
    }
    cx = Number(cx)
    cy = Number(cy)
    r = Number(r)
    if (isNaN(cx) || isNaN(cy) || isNaN(r)) {
      errorString = `ERROR: invalid circles for circle "${key}"
      cx: ${cx}, cy: ${cy}, r: ${r}`
    }

    if (!hexColorRegex.test(fill)) {
      // Tolerate: replace invalid colour with a plain grey
      data.fill = "#888"
    }

    return errorString
  })

  if (invalid) {
    return errorString
  }

  return layout
}



function checkForIntersection(id1, data, circles) {
  const { cx: cx1, cy: cy1, r: r1, ix: ix1} = data

  const entries = Object.entries(circles)
  entries.forEach(([ id, { cx, cy, r, ix }]) => {
    if (id1 !== id) {
      const dx = cx1 - cx // may be negative: we'll square it
      const dy = cy1 - cy // may be negative: we'll square it
      const minDelta = r1 + r
      const minDelta2 = minDelta * minDelta

      const delta2 = (dx * dx) + (dy * dy)

      const intersectsNow = delta2 < minDelta2
      const didIntersect = ix.has(id1)

      if (intersectsNow !== didIntersect) {
        if (intersectsNow) {
          ix.add(id1)
          ix1.add(id)
        } else {
          ix.delete(id1)
          ix1.delete(id)
        }
      }
    }
  })
}



function checkForIntersections(circles) {
  const entries = Object.entries(circles)

  entries.forEach(([ key1, data1 ], index) => {
    let { cx: cx1, cy: cy1, r: r1, ix: ix1 } = data1
    if (!ix1) {
      data1.ix = ix1 = new Set()
    }

    const others = entries.slice(index + 1)
    others.forEach(([ key2, data2 ]) => {
      let { cx: cx2, cy: cy2, r: r2, ix: ix2 } = data2
      if (!ix2) {
        data2.ix = ix2 = new Set()
      }

      const minDelta = r1 + r2
      const minDelta2 = minDelta * minDelta

      const deltaX = cx1 - cx2 // may be negative: we'll square it
      const deltaY = cy1 - cy2 // may be negative: we'll square it
      const delta2 = (deltaX * deltaX) + (deltaY * deltaY)

      if (delta2 < minDelta2) {
        ix1.add(key2)
        ix2.add(key1)
      } else {
        ix1.delete(key2)
        ix2.delete(key1)
      }
    })
  })

  return circles
}


function getCirclesTouchingEdge(circles) {
  const circleData = Object.values(circles)

  return circleData.map( data  => {
    const { cx, cy, r } = data
    const maxDistance = OUTER_RADIUS - r
    const maxDistance2 = maxDistance * maxDistance
    const actualDistance2 = (cx * cx) + (cy * cy)
    const fromEdge = Math.abs(actualDistance2 - maxDistance2)

    return fromEdge < 0.1
  })
}



function preventOverflow(circles, touching) {
  const circleData = Object.values(circles)

  circleData.forEach(( data, index ) => {
    const wasTouching = touching[index]

    const { cx, cy, r } = data
    const maxDistance = OUTER_RADIUS - r
    const maxDistance2 = maxDistance * maxDistance
    const actualDistance2 = (cx * cx) + (cy * cy)
    if (actualDistance2 > maxDistance2 || wasTouching) {
      const actualDistance = Math.sqrt(actualDistance2)
      const adjustment = maxDistance / actualDistance
      data.cx *= adjustment
      data.cy *= adjustment
    }
  })
}


// DRAGGING // DRAGGING // DRAGGING // DRAGGING // DRAGGING //

function startDragging(state, event) {
  const { circles } = state
  const target = event.target

  // Find the scale of the svg viewBox. Assume:
  // 1. Width and Height are identical
  // 2. Left and Top are both 0
  const viewBox = target.closest("svg").getAttribute("viewBox")
  const matches = VIEWBOX_REGEX.exec(viewBox)
  const scale = Number(matches[1]) // "0 0 (100) 100"
  const outerRadius = scale / 2

  // Find the centre and the scale of the <g> parent. Assume:
  // <g> is translated by half of scale on both x and y axes
  const gParent = target.closest("g")
  const { x, y, width: size } = gParent.getBoundingClientRect()
  const gx = size / scale
  const ox = x + size / 2
  const oy = y + size / 2

  // Find the centre of the target
  const id = target.id
  let data = circles[id] // { cx, cy, r, fill, ix }
  const cx = ox + data.cx * gx
  const cy = oy + data.cy * gx

  // Find the maximum (squared) distance from the origin of <g>
  const maxDistance = outerRadius - data.r
  const maxDistance2 = maxDistance * maxDistance

  // Find the offset from the click to the centre of the target
  const clickX = event.pageX
  const clickY = event.pageY
  const offsetX = cx - clickX
  const offsetY = cy - clickY

  const dragData = {
    id,
    offsetX,
    offsetY,
    maxDistance,
    maxDistance2,
    ox,
    oy,
    gx
  }

  return { ...state, dragData }
}


function drag(state, event) {
  const { dragData, circles } = state
  const { pageX, pageY } = event
  const {
    id,
    offsetX,
    offsetY,
    maxDistance,
    maxDistance2,
    ox,
    oy,
    gx
  } = dragData
  let data = circles[id]

  const left = offsetX + pageX
  const top = offsetY + pageY
  const { cx, cy } = getNewCentre((left-ox)/gx, (top-oy)/gx)

  data = { ...data, cx, cy }
  circles[id] = data
  checkForIntersection(id, data, circles)
  state.circles = circles
  state.hasOverlap = getOverlap(circles)
  state.modified = true

  return { ...state }


  // Ensure dragged circle stays entirely inside the OuterCircle
  function getNewCentre(cx, cy) {
    const distance2 = (cx * cx) + (cy * cy)
    if (distance2 > maxDistance2) {
      const distance = Math.sqrt(distance2)
      const correction = maxDistance / distance
      cx *= correction
      cy *= correction
    }
    return { cx, cy }
  }
}


function getOverlap(circles) {
  const circleData = Object.values(circles)
  return circleData.some( data => data.ix.size )
}



function stopDragging(state) {
  // delete state.dragData
  return { ...state }
}



// RESIZING // RESIZING // RESIZING // RESIZING // RESIZING //

function updateSize(state, { key, value }) {
  if (["initial", "final", "ratio"].indexOf(key) < 0) {
    return state // unchanged
  }

  const { sizes, circles } = state

  adjustSizes(sizes, key, value)

  // Now change the circles of the circles
  const touching = getCirclesTouchingEdge(circles)

  adjustCircles(circles, sizes)
  preventOverflow(circles, touching)
  checkForIntersections(circles)
  setCoverage(state, circles)
  state.modified = true

  return { ...state }
}


function adjustSizes(sizes, key, value) {
  // Update the ratio or the final value in sizes
  let final = sizes.initial
  let ratio = sizes.ratio

  switch (key) {
    default: return false // will never happen

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
        const scale = value / sizes.initial
        return Math.pow(scale, 1/7)
      })()
  }

  sizes[key] = value
}


function adjustCircles(circles, sizes) {
  const circleData = Object.values(circles)
  let { initial: radius, ratio } = sizes

  circleData.forEach(( data, index ) => {
    data.r = radius * 50
    radius *= ratio
  })
}


function setCoverage(state, circles) {
  const totalArea = Math.PI * 50 * 50
  const circleData = Object.values(circles)

  const coveredArea = circleData.reduce(( area, data) => {
    const { r } = data
    area += Math.PI * r * r
    return area
  }, 0)

  const coverage = (coveredArea * 100 / totalArea)
  .toFixed(3) + "%"

  state.coverage = coverage
  state.hasOverlap = circleData.some( data => data.ix.size )
}


// LAYOUTS // LAYOUTS // LAYOUTS // LAYOUTS // LAYOUTS //

const keysToIgnore = [
  "hasOverlap",
  "layoutNames",
  "allLayouts",
  "showDialog",
  "ix",
  "dragData",
  "modified"
]
function replacer(key, value) {
  if (keysToIgnore.indexOf(key) < 0) {
    if (typeof value === "number") {
      value = parseInt(value * 1000) / 1000
    }

    return value
  }
}


function getLayoutsFromLocalStorage() {
  let layouts = localStorage.getItem(STORAGE_KEY)
  if (layouts) {
    try {
      layouts = JSON.parse(layouts)
      return layouts
    } catch (error) {}
  }

  return {}
}


function setLayoutsInLocalStorage(layouts) {
  const layoutString = JSON.stringify(layouts, replacer, '  ')
  localStorage.setItem(STORAGE_KEY, layoutString)
}


function setLayout(state, layoutName) {
  let layout = state.allLayouts[layoutName]

  if (!layout) {
    return state
  }

  // Clone the layout so that the original is unchanged
  layout = JSON.parse(JSON.stringify(layout, replacer, ''))

  checkForIntersections(layout.circles)

  state.current = layoutName
  state.modified = false
  state.hasOverlap = false

  return { ...state, ...layout }
}


function toggleSaveDialog(state, showDialog) {
  state.showDialog = showDialog
  return { ...state }
}


function saveLayout(state, layoutName) {
  // TODO: write sizes, circles and coverage to localStorage
  const { sizes, circles, coverage, layoutNames } = state

  let layout = {
    sizes,
    circles,
    coverage
  }

  let localLayouts = getLayoutsFromLocalStorage()
  localLayouts[layoutName] = layout

  setLayoutsInLocalStorage(localLayouts)

  layout = JSON.stringify(layout, replacer, '  ')

  console.log(
      layoutName, ":", layout
  );

  // Add at the end of the allLayouts list
  layout = JSON.parse(layout)
  state.allLayouts = { ...state.allLayouts, [layoutName]: layout }

  if (layoutNames.indexOf(layoutName) < 0) {
    // In StrictMode all state changes are triggered twice
    state.layoutNames.push(layoutName)
  }

  // Update the Selector and close the dialog
  state.current = layoutName
  state.showDialog = false

  return { ...state }
}