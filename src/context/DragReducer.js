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


const OUTER_RADIUS = 50
const VIEWBOX_REGEX = /\d+\s+\d+\s+(\d+)\s+(\d+)/ // "0 0 100 100"



const defaultLayouts = {
  "First": {
    "sizes": {
      "initial": 0.409,
      "final": 0.207,
      "ratio": 0.907
    },
    "circles": {
      "one": {
        "cx": 6.011,
        "cy": -28.903,
        "r": 20.478,
        "fill": "#840"
      },
      "two": {
        "cx": -31.319,
        "cy": -2.415,
        "r": 18.587,
        "fill": "#680"
      },
      "three": {
        "cx": -15.263,
        "cy": 29.402,
        "r": 16.872,
        "fill": "#090"
      },
      "four": {
        "cx": 32.898,
        "cy": 10.988,
        "r": 15.314,
        "fill": "#066"
      },
      "five": {
        "cx": 4.128,
        "cy": 5.431,
        "r": 13.9,
        "fill": "#048"
      },
      "six": {
        "cx": 14.893,
        "cy": 34.287,
        "r": 12.617,
        "fill": "#009"
      },
      "seven": {
        "cx": 35.132,
        "cy": -15.755,
        "r": 11.452,
        "fill": "#408"
      },
      "eight": {
        "cx": -24.893,
        "cy": -30.803,
        "r": 10.395,
        "fill": "#804"
      }
    },
    "hasOverlap": false,
    "coverage": "75.031%"
  },
  "Second": {
    "sizes": {
      "initial": 0.4175,
      "final": 0.20875,
      "ratio": Math.pow(0.5, 1/7) // HARD-CODED to generate final
    },
    "coverage": 77.121,
    "circles": {
      "one": {
        "cx": 0.00, "cy": -29.124, "r": 20.875, "fill": "#840"
      },
      // "extra": {},
      "two": {
        "cx": -30.712, "cy": 4.851, "r": 18.906, "fill": "#680"
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
  "Third": {
    "sizes": {
      "initial": 0.4,
      "final": 0.224,
      "ratio": 0.921
    },
    "coverage": 77.171,
    "circles": {
      "one": {
        "cx": 0,
        "cy": -30,
        "r": 20,
        "fill": "#840"
      },
      "two": {
        "cx": -31.003,
        "cy": 6.005,
        "r": 18.42,
        "fill": "#680"
      },
      "three": {
        "cx": 4.403,
        "cy": 6.73,
        "r": 16.964,
        "fill": "#090"
      },
      "four": {
        "cx": 31.611,
        "cy": -13.505,
        "r": 15.624,
        "fill": "#066"
      },
      "five": {
        "cx": -12.24,
        "cy": 33.439,
        "r": 14.39,
        "fill": "#048"
      },
      "six": {
        "cx": 33.385,
        "cy": 15.352,
        "r": 13.253,
        "fill": "#00a"
      },
      "seven": {
        "cx": 15.32,
        "cy": 34.548,
        "r": 12.206,
        "fill": "#408"
      },
      "eight": {
        "cx": -30.657,
        "cy": -23.712,
        "r": 11.242,
        "fill": "#804"
      }
    }
  }
}



// INITIAL STATE AND REDUCER // INITIAL STATE AND REDUCER //

export const initialState = (function (){
  // TODO: check which default layout the user set in localStorage
  const layoutNames = Object.keys(defaultLayouts)
  const layout = defaultLayouts[layoutNames[0]]
  layout.layouts = layoutNames
  checkForIntersections(layout.circles)
  return layout
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


function setLayout(state, layoutName) {
  const layout = defaultLayouts[layoutName]
  checkForIntersections(layout.circles)
  return { ...state, ...layout }
}