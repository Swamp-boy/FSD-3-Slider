import Model from './Model'

let options = {};
let model = new Model(options);

describe('If the model received 0 params, all fields have to be equal to default', () => {
    beforeAll(() => {
        options = {};
        model = new Model(options);
        model.work();
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
        expect(model.multiValue).toBeUndefined()
    })

    it('orientation', () => {
        expect(model.orientation).toBe(model.defaultSet.orientation);
    })

    it('value banner', () => {
        expect(model.valueBanner).toBe(model.defaultSet.valueBanner);
    })

    it('min and max fields', () => {
        expect(model.minMaxFields).toBe(model.defaultSet.minMaxFields);
    })

    it('progress bar', () => {
        expect(model.progressBar).toBe(model.progressBar);
    })
})

