import { NumberSetoid, StringSetoid, Setoid } from "../Setoid"

describe('Algebras Fantasy Land', () => {
  describe('Setoid', () => {

    describe('basic setoid for strings', () => {
      it('should be true if equals', () => {
        expect(StringSetoid.equals('a', 'a')).toBeTruthy
      })

      it('should be false if not equals', () => {
        expect(StringSetoid.equals('a', 'b')).toBeTruthy
      })

      it('should be case sensitive', () => {
        expect(StringSetoid.equals('a', 'A')).toBeFalsy()
      })

      describe('custom case insensitive', () => {
        it('should be case insensitive', () => {
          const caseInsensitive: Setoid<string> = {
            equals: (x, y) => String(x).toLocaleLowerCase() === String(y).toLowerCase()
          }

          expect(caseInsensitive.equals('a', 'A')).toBeTruthy()
        })
      })
    })

    it('should be true if equals', () => {
        expect(NumberSetoid.equals(1, 1)).toBeTruthy
    })
    
    it('should be false if not equals', () => {
        expect(NumberSetoid.equals(1, 2)).toBeFalsy()
    })

    describe('Laws', () => {
      it('reflexivity', () => {
        const a = 1
        expect(NumberSetoid.equals(a, a)).toBeTruthy()
      })
      it('symmetry', () => {
        const a = 1
        const b = 1
        expect(NumberSetoid.equals(a, b)).toEqual(
          NumberSetoid.equals(b, a)
        )
      })

      it('transitivity', () => {
        const a = 1
        const b = 1
        const c = 1
        // se a e b são iguais
        expect(NumberSetoid.equals(a, b)).toBeTruthy()
        // e b e c são iguais
        expect(NumberSetoid.equals(b, c)).toBeTruthy()
        //portanto a e c são iguais
        expect(NumberSetoid.equals(a, c)).toBeTruthy()
      })
    })

    it('basic setoid for numbers', () => {
      expect(NumberSetoid.equals(1, 1)).toBeTruthy()
    })

    it('setoid for object', () => {
      interface Data {
        x: number
        y: string
      }

      const setoidData: Setoid<Data> = {
        equals: (x, y) => x.x === y.x && x.y === y.y
      }

      const setoidDataStrict: Setoid<Data> = {
        equals: (x, y) => x.x === y.x && x.y === y.y && x === y
      }

      const a:Data = {
        x: 1,
        y: 'hello world'
      }

      const b:Data = {
        x: 1,
        y: 'hello world'
      }

      expect(setoidData.equals(a, b)).toBeTruthy()
      expect(setoidDataStrict.equals(a, b)).toBeFalsy()
      expect(setoidDataStrict.equals(a, a)).toBeTruthy()
    })
  })
})
