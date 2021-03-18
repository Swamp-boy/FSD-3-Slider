import Model from './Model'
import Options from './../interfaces/Options';

let options: Options = {};
let model = new Model(options);

describe('If the model received 0 params, all fields have to be equal to default', () => {
    beforeAll(() => {
        options = {};
        model = new Model(options)
    })

    it('min field', () => {
        expect(model.min).toBe(model.defaultSet.min);
    })

    it('max field', () => {
        expect(model.max).toBe(model.defaultSet.max);
    })

    it('step should', () => {
        expect(model.step).toBe(model.defaultSet.step);
    })

    it('start value', () => {
        expect(model.value).toBe(model.defaultSet.value);
    })

    it('multiple value should be undef', () => {
        expect(model.multiValue).toEqual(model.defaultSet.multiValue);
    })

    it('orientation', () => {
        expect(model.orientation).toBe(model.defaultSet.orientation);
    })

    it('', () => {
        expect().toBe(0);
    })

    it('orientation', () => {
        expect(model.orientation).toBe(model.defaultSet.orientation);
    })

    it('orientation', () => {
        expect(model.orientation).toBe(model.defaultSet.orientation);
    })

    it('orientation', () => {
        expect(model.orientation).toBe(model.defaultSet.orientation);
    })
})

