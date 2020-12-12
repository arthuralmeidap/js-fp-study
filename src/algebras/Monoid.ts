export interface Monoid<T> {
    empty: T,
    append: (x: T, y: T) => T
}

const MonoidString: Monoid<string> = {
    empty: '',
    append: (x, y) => x + y
}

export { MonoidString }