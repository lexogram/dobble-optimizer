/**
 * startDrag
 *
 * @export
 * @param {*} event
 */

const viewBoxRegex = /\d+\s+\d+\s+(\d+)\s+(\d+)/ // "0 0 100 100"


export function startDragging(event, dimensions, setDimensions) {
  const target = event.target

  // Find the scale of the svg viewBox. Assume:
  // 1. Width and Height are identical
  // 2. Left and Top are both 0
  const viewBox = target.closest("svg").getAttribute("viewBox")
  const matches = viewBoxRegex.exec(viewBox)
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
  let data = dimensions[id] // { cx, cy, r [, fill] }
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
  console.log(" cx, cy:", cx, cy, );
  console.log(" ox, oy:", ox, oy, );
  console.log("clickX, clickY:", clickX, clickY);
  console.log("offsetX, offsetY:", offsetX, offsetY);

  // TODO: Add timeout to stop drag, in case mouseUp was outside
  // browser window
  document.documentElement.onmousemove = drag
  document.documentElement.onmouseup = stopDrag

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

  function checkForIntersections() {
    let updateNeeded = false

    const { cx: tx, cy: ty, r: tr, ix: tIx} = data
    const entries = Object.entries(dimensions)
    entries.forEach(([ oId, { cx, cy, r, ix }]) => {
      if (oId !== id) {
        const dx = Math.abs(tx - cx)
        const dy = Math.abs(ty - cy)
        const minDelta = r + tr
        const minDelta2 = minDelta * minDelta

        const delta2 = (dx * dx) + (dy * dy)
        const intersectsNow = delta2 < minDelta2
        const didIntersect = ix.has(id)
        if (intersectsNow !== didIntersect) {
          updateNeeded = true

          if (intersectsNow) {
            ix.add(id)
            tIx.add(oId)
          } else {
            ix.delete(id)
            tIx.delete(oId)
          }
        }
      }
    })

    return updateNeeded
  }

  function drag(event) {
    const left = offsetX + event.pageX
    const top = offsetY + event.pageY
    const { cx, cy } = getNewCentre((left-ox)/gx, (top-oy)/gx)

    data = { ...data, cx, cy }

    const fullUpdateNeeded = checkForIntersections()

    if (fullUpdateNeeded) {
      dimensions[id] = data
      setDimensions({ ...dimensions })
    } else {

      setDimensions({ ...dimensions, [id]: data })
    }
  }

  function stopDrag() {
    document.documentElement.onmousemove = null
    document.documentElement.onmouseup = null
  }
}