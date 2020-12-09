export interface Setoid<A> {
  readonly equals: (x: A, y: A) => boolean
}
