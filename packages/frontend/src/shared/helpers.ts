export const numberRange = (start: number, end: number) => {
  return new Array(end - start).fill(null).map((d, i) => i + start)
}
