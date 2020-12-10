import { Setoid } from "../Setoid"

describe('Algebras Fantasy Land', () => {
  describe('Setoid', () => {
    it('should be true if equals', () => {
      const setoidNumber: Setoid<number> = {
          equals: (x, y) => Number(x) === Number(y)
        }
        
        expect(setoidNumber.equals(1, 1)).toBeTruthy()
    })
    
    it('should be false if not equals', () => {
      const setoidNumber: Setoid<number> = {
          equals: (x, y) => Number(x) === Number(y)
        }
        
        expect(setoidNumber.equals(1, 2)).toBeFalsy()
    })

    describe('Laws', () => {
      it('reflexivity', () => {
        const a = 1
        const setoidNumber: Setoid<number> = {
          equals: (x, y) => Number(x) === Number(y)
        }
        
        expect(setoidNumber.equals(a, a)).toBeTruthy()
      })
      it('symmetry', () => {
        const a = 1
        const b = 1
        const setoidNumber: Setoid<number> = {
          equals: (x, y) => Number(x) === Number(y)
        }
        
        expect(setoidNumber.equals(a, b)).toEqual(
          setoidNumber.equals(b, a)
        )
      })

      it('transitivity', () => {
        const a = 1
        const b = 1
        const c = 1
        const setoidNumber: Setoid<number> = {
          equals: (x, y) => Number(x) === Number(y)
        }
        
        // se a e b são iguais
        expect(setoidNumber.equals(a, b)).toBeTruthy()
        // e b e c são iguais
        expect(setoidNumber.equals(b, c)).toBeTruthy()
        //portanto a e c são iguais
        expect(setoidNumber.equals(a, c)).toBeTruthy()
      })
    })

    it('basic setoid for numbers', () => {
      const setoidNumber: Setoid<number> = {
        equals: (x, y) => Number(x) === Number(y)
      }

      expect(setoidNumber.equals(1, 1)).toBeTruthy()
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
