import MultiToddler from './MultiToddler';

describe('MultiToddler constructor', () => {
    const multi = new MultiToddler([10, 40, 60, 90], 'horizontal');

    it('must write down values array', () => {
        expect(multi.values).toEqual([10, 40, 60, 90]);
    })

    it('must write down orientation', () => {
        expect(multi.orientation).toBe('horizontal');
    })
})

describe('Create toddlers and field for horizontal version', () => {
    const multi = new MultiToddler([10, 40, 60, 90], 'horizontal');

    it('create toddlers', () => {
        
    })
})