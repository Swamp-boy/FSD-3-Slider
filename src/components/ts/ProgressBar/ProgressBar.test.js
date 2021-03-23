import ProgressBar from './ProgressBar';

// creating slider elements
const field = document.createElement('div');
const toddler = document.createElement('div');
// define width and height
Object.defineProperty(field, 'offsetWidth', { configurable: true, value: 100 })
Object.defineProperty(field, 'offsetHeight', { configurable: true, value: 20 })
Object.defineProperty(toddler, 'offsetWidth', { configurable: true, value: 20 })
Object.defineProperty(toddler, 'offsetHeight', { configurable: true, value: 10 })

describe('Progress bar constructor tests', () => {
    it('check if slider orientation === horizontal', () => {
        const bar = new ProgressBar(field, toddler, 'horizontal');
        expect(bar.sliderFieldWidth).toBe(100)
        expect(bar.toddlerWidth).toBe(20)
    })

    it('check if slider orientation === vertical', () => {
        const bar = new ProgressBar(field, toddler, 'vertical');
        expect(bar.sliderFieldWidth).toBe(20)
        expect(bar.toddlerWidth).toBe(10)
    })
})

describe('Progress ber createSingleProgressBar method tests', () => {
    
})