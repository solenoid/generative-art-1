/**
 * Get the last element of an array, assumes elements are arrays.
 * An empty array is returned for an empty list.
 */
export const last = (list) => (list.length ? list[list.length - 1] : [])

let idIndex = 1
/**
 * Generate application wide unique ids with prefix support.
 */
export const idGenerator = (prefix) => `${prefix}-${idIndex++}`

/**
 * Simple d attribute line that just has straight segments between points.
 *
 * Do an initial M and then join all points with L.
 */
export const jaggedLine = (points) =>
  'M' + points.map((p) => `${p[0]},${p[1]}`).join('L')

// import { line, curveBumpX } from 'https://cdn.skypack.dev/d3-shape@3'
// const smoothLine = line().curve(curveBumpX)

/**
 * Like `line().curve(curveBumpX)` from https://cdn.skypack.dev/d3-shape@3
 *
 * Do an initial M and then for each point afterwards use the mid X value
 * for both control points and start with the previous Y then the current Y
 * then join with C.
 */
export const smoothLine = (points) =>
  'M' +
  points
    .map((p, i, all) => {
      if (i === 0) return `${p[0]},${p[1]}`
      const prev = all[i - 1]
      const midX = (p[0] + prev[0]) / 2
      return `${midX},${prev[1]},${midX},${p[1]},${p[0]},${p[1]}`
    })
    .join('C')

// https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use
const mul = 1664525
const inc = 1013904223
const eps = 1 / 4294967296
const lcg = (seed = Math.random()) => {
  let state = (seed / eps) | 0
  return () => {
    state = (mul * state + inc) | 0
    return eps * (state >>> 0)
  }
}

// import { randomInt, randomLcg } from 'https://cdn.skypack.dev/d3-random@3'
// const random = randomInt.source(randomLcg(seed))(lower, upper)

/**
 * Like `randomInt.source(randomLcg(seed))(lower, upper)` or `randomInt(lower, upper)`
 *
 * Takes a min, max, and optional seed, always uses lcg for the source of random.
 *
 * Like d3 randomInt this returns an int that is min up to max - 1.
 */
export const randomInt = (min, max, seed) => {
  const source = lcg(seed)
  return () => Math.floor(source() * (max - min) + min)
}
