import { MonoidString } from "../Monoid"

describe('sasa', () => {
    it('te', () => {
        expect(MonoidString.append('a', 'b')).toEqual('ab')
    })
})
