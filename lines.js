import {
  last,
  idGenerator,
  randomInt,
  // jaggedLine,
  smoothLine,
} from './utils.js'

// Create a single line with a single path.
const createLine = (
  points,
  color = '#000',
  width = 1,
  pathFunction = smoothLine,
) => {
  if (points.length < 2) return ''
  const sharedAttributes = `stroke-width="${width}" stroke-linecap="round" stroke="${color}" fill="none"`
  return `<path ${sharedAttributes} d="${pathFunction(points)}"/>`
}

// Main exported draw.
export const draw = (
  rootSelector,
  width = 450, // overall art width
  height = 750, // overall art height
  artPad = 50, // padding inside art where lines don't go
  xJump = 4, // each line moves this many pixels across screen each jump
  yJump = 4, // jump up or down one less than this yJump
  lineAttract = 4, // when lines get closer than this to each other they collapse into one
  edgeAvoid = 80, // when closer than this to the top or bottom push lines to the vertical center
  seed = undefined, // for deterministic randomness, make sure seed is from zero up to but not including one
  background = '#262', // art background color, trying on green for size
  lineColor = '#000', // line color
  lineWidth = 1, // line width
) => {
  const innerHeight = height - 2 * artPad
  const heightByJump = Math.floor(innerHeight / xJump)
  const mirror = true
  const divisor = mirror ? 2 : 1
  const innerWidth = width - 2 * artPad
  const widthByJump = Math.floor(innerWidth / xJump / divisor)

  const yJumpLower = -(yJump - 1)
  const random = randomInt(yJumpLower, yJump, seed)

  // We track if the line collided with another and it's "done".
  let initialLinesDone = []
  // List of all lines, with each line being a set of points [x, y]
  let initialLines = []
  for (let i = 0; i <= heightByJump; i++) {
    initialLines.push([[0, i * xJump]])
  }

  // Walk across the screen jump by jump.
  for (let j = 0; j < widthByJump; j++) {
    // Then walk down from top to bottom.
    for (let i = 0; i <= heightByJump; i++) {
      if (initialLinesDone.includes(i)) continue

      const currentLine = initialLines[i]
      const [currentX, currentY] = last(currentLine)
      const newX = currentX + xJump
      let previousIndex = i - 1
      while (initialLinesDone.includes(previousIndex)) {
        previousIndex -= 1
      }
      const previousLine = initialLines[previousIndex] || [[0, 0]]
      const [unusedX, previousY] = last(previousLine)
      const potentailBump = random()
      let newY = currentY + potentailBump
      if (newY < edgeAvoid) {
        newY = currentY + Math.abs(potentailBump)
      }
      if (newY > innerHeight - edgeAvoid) {
        newY = currentY - Math.abs(potentailBump)
      }
      if (newY <= previousY + lineAttract && i > 0) {
        initialLinesDone.push(i)
        currentLine.push([newX, previousY])
      } else {
        currentLine.push([newX, newY])
      }
    }
  }

  // Flip lines and handle ones that should join vs. being disconnected.
  if (mirror) {
    const longestLineLength = Math.max(...initialLines.map((d) => d.length))
    for (let i = 0; i <= heightByJump; i++) {
      const newLine = initialLines[i].map((p) => [innerWidth - p[0], p[1]])
      if (initialLines[i].length === longestLineLength) {
        initialLines[i] = [...initialLines[i], ...newLine.reverse()]
      } else {
        initialLines.push(newLine)
        // TODO consider putting lollipop ends on the lines
      }
    }
  }

  // Create all the lines.
  const mapLine = (points) => createLine(points, lineColor, lineWidth)
  const lines = initialLines.map(mapLine).join('\n      ')

  // Create the svg and add to the page.
  const mainId = idGenerator('lines')
  document.querySelector(
    rootSelector,
  ).innerHTML = `<svg width=${width} height=${height} viewbox="0 0 ${width} ${height}" id="${mainId}">
    <rect width="${width}" height="${height}" fill="${background}"/>
    <g transform="translate(${artPad},${artPad})">
      ${lines}
    </g>
  </svg>`
}
