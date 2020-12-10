export interface Setoid<A> {
  readonly equals: (x: A, y: A) => boolean
}
const NumberSetoid: Setoid<number> = {
  equals: (x, y) => Number(x) === Number(y)
}

const StringSetoid: Setoid<string> = {
  equals: (x, y) => String(x) === String(y)
}



export { NumberSetoid, StringSetoid }