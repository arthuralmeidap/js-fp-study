export class Optional<A> {
    _isValid = false
    _value: A

    constructor(value: A = null) {
        if(value){
            this._isValid = true
            this._value = value
        }
    }

    isValid(): boolean {
        return this._isValid
    }

    value(): A {
        return this._value
    }
}

interface Partial<T> {
    value: T | null
    isValid: boolean
}

// type Partial<T> = [a: T, boolean] -> same as above. Above is better?

type PartialFN<T> = (x:T) => Partial<T>

const identity = <T>(v: T): Partial<T> => ({ value: v, isValid: true })

const compose = <T>(...args:PartialFN<T>[] ) => (z: T) => {
    function loop<T>(fns: PartialFN<T>[], val: T) {
        const [head, ...tail] = fns
        if (fns.length === 0) return { value: val, isValid: true }
        const partial = head(val)
        if (!partial.isValid) return partial
        return loop(tail, partial.value)
    }

    return loop(args.reverse(), z)
}

// safe_root is a partial function , in the mathematical sense, which is a function that is not defined 
// for all possible values of it's arguments. It's not really a mathematical function
// We can represent that using the Optional embellished type.
function safe_root(x: number): Optional<number> {
    return (x >= 0) ? new Optional(Math.sqrt(x)) : new Optional()
}

function safe_reciprocal(x: number): Optional<number> {
    return (x !== 0) ? new Optional(1/x) : new Optional()
}

function partial_safe_root(x: number): Partial<number> {
    return (x >= 0) ? { value: Math.sqrt(x), isValid: true} : { value: null, isValid: false}
}

function partial_safe_reciprocal(x: number): Partial<number> {
    return (x !== 0) ? { value: 1/x, isValid: true } : { value: null, isValid: false }
} 

describe('Optional', () => {
    it('Safe root', () => {
        expect(safe_root(2)).toEqual(new Optional(1.4142135623730951))
        expect(safe_root(-1)).toEqual(new Optional())
    })

    it('Safe Reciprocal', () => {
        expect(safe_reciprocal(2)).toEqual(new Optional(0.5))
    })

    it('Partial Safe root', () => {
        expect(partial_safe_root(2)).toEqual({ value: 1.4142135623730951, isValid: true })
        expect(partial_safe_root(-1)).toEqual({ value: null, isValid: false })
    })

    it('Partial Safe Reciprocal', () => {
        expect(partial_safe_reciprocal(2)).toEqual({value: 0.5, isValid: true })
        expect(partial_safe_reciprocal(0)).toEqual({value: null, isValid: false })
    })

    it('identity function', () => {
        const partial:Partial<number> = {
            value: 1,
            isValid: true
        }

        expect(identity(1)).toEqual(partial)
    })

    describe('compose function', () => {
        it('should be able to compose', () => {
            const a = (v: number):Partial<number> => ({ value: v + 1, isValid: true })
            const b = (v: number):Partial<number> => ({ value: v * 2, isValid: true })
            
            const sumMulti = compose(b, a)

            expect(sumMulti(1).value).toEqual(4)

        })

        it('Compose a sum with identity should not makes difference', () => {

            const add11 = (x: number): Partial<number> => ({value: x + 11, isValid: true})
            const sum = compose(add11, identity)

            expect(sum(1).value).toEqual(12)
        })

        it('should be able to compose if one fails', () => {
            const add11 = (x: number): Partial<number> => ({value: x + 11, isValid: true})
            const fails = (): Partial<number> => ({value: null, isValid: false})
            const failedSum = compose(add11, fails)

            expect(failedSum(1)).toEqual({isValid: false, value: null })
        })

        it('should be able to compose if one fails at any moment', () => {

            const add12 = (x: number): Partial<number> => ({value: x + 11, isValid: true})
            const add11 = (x: number): Partial<number> => ({value: x + 11, isValid: true})
            const fails = (): Partial<number> => ({value: null, isValid: false})
            const failedSum = compose(add11, fails, add12) //fails on middle
            const failedSum1 = compose(add11, add12, fails) //fails on start
            const failedSum2 = compose(fails, add11, add12) //fails on end

            expect(failedSum(1)).toEqual({isValid: false, value: null })
            expect(failedSum1(1)).toEqual({isValid: false, value: null })
            expect(failedSum2(1)).toEqual({isValid: false, value: null })
        })

        it('composes partial_safe_root with partial_safe_reciprocal', () => {

            const total = compose(partial_safe_root, partial_safe_reciprocal)

            expect(total(4).value).toEqual(0.5)
            expect(total(0)).toMatchObject({ isValid: false })
        })
    })


})