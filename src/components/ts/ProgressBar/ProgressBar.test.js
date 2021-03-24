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

describe('Progress bar create single progress bar method tests', () => {
    it('test horizontal version', () => {
        const bar = new ProgressBar(field, toddler, 'horizontal');
        bar.createSingleProgressBar();
        expect(bar.progressBar.classList.contains('slider-progress-bar')).toBe(true);
    })

    it('test vertical version', () => {
        const bar = new ProgressBar(field, toddler, 'vertical');
        bar.createSingleProgressBar();
        expect(bar.progressBar.classList.contains('slider-progress-bar_vertical')).toBe(true);
    })
    
})

describe('Progress bar test width change for one toddler', () => {
    const bar = new ProgressBar(field, toddler, 'horizontal');
    bar.createSingleProgressBar();

    it('change width for integer path horizontal version', () => {
        bar.progressBarSingleChange(25);
        expect(bar.progressBar.style.right).toBe('65px');
    })

    it('change width for float path horizontal version', () => {
        bar.progressBarSingleChange(0.1);
        let result = parseFloat(bar.progressBar.style.right)
        expect(result).toBeCloseTo(89.9);
    })
    
    const barVertical = new ProgressBar(field, toddler, 'vertical');
    barVertical.createSingleProgressBar();

    it('change width for integer path vertical version', () => {
        barVertical.progressBarSingleChange(5);
        expect(barVertical.progressBar.style.top).toBe('10px');
    })

    it('change width for float path vertical version', () => {
        barVertical.progressBarSingleChange(0.1);
        let result = parseFloat(barVertical.progressBar.style.top)
        expect(result).toBeCloseTo(14.9);
    })
    
})