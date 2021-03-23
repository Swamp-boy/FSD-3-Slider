import MinMaxFields from './MinMaxFields';


describe('check values of min and max fields', () => {
    const sliderField = document.createElement('div');

    it('check value of min field',() => {
        const min = new MinMaxFields(sliderField, 0, 100);
        min.createMinField();
        expect(min.minField.innerHTML).toBe('<span>0</span>');
    })

    it('check value of vax field', () => {
        const max = new MinMaxFields(sliderField, 0, 100);
        max.createMaxField();
        expect(max.maxField.innerHTML).toBe('<span>100</span>')
    })
})

describe('MinMaxFields: setMinField method', () => {
    const sliderField = document.createElement('div');
    const min = new MinMaxFields(sliderField, 0, 100);
    min.createMinField();
    
    Object.defineProperty(min.minField, 'offsetHeight', { value: 5 });
    
    it('method with horizontal orientation', () => {
        min.setMinField('horizontal');
        expect(min.minField.style.top).toBe('-10px');
    })

    it('method with vertical orientation', () => {
        min.setMinField('vertical');
        expect(min.minField.style.right).toBe('5px');
    })
})

describe('MinMaxFields: setMaxField method', () => {
    const sliderField = document.createElement('div');
    const max = new MinMaxFields(sliderField, 0, 100);
    max.createMaxField();
    
    Object.defineProperty(max.maxField, 'offsetHeight', { value: 5 });
    
    it('method with horizontal orientation', () => {
        max.setMaxField('horizontal');
        expect(max.maxField.style.top).toBe('-10px');
    })

    it('method with vertical orientation', () => {
        max.setMaxField('vertical');
        expect(max.maxField.style.right).toBe('5px');
    })
})

describe('MinMaxFields: setMaxFieldWidth method', () => {
    const sliderField = document.createElement('div');
    const minMax = new MinMaxFields(sliderField, 0, 100);

    minMax.createMaxField();

    it('check max span if max span width + 10 <= max Field', () => {
        document.body.appendChild(minMax.maxField);

        Object.defineProperty(minMax.maxField, 'offsetWidth', { configurable:true, value: 25 });
        Object.defineProperty(minMax.maxSpan, 'offsetWidth', { configurable:true, value: 15 });

        minMax.maxField.style.width = '25px';
        minMax.setMaxFieldWidth();
        expect(minMax.maxField.style.width).toBe('25px');
    })
    
    it('if max span width + 10 > max Field, max field width should += 10', () => {
        document.body.appendChild(minMax.maxField);

        Object.defineProperty(minMax.maxField, 'offsetWidth', { configurable:true, value: 25 });
        Object.defineProperty(minMax.maxSpan, 'offsetWidth', { configurable:true, value: 17 });

        minMax.setMaxFieldWidth();
        expect(minMax.maxField.style.width).toBe('35px');
    })
})

describe('MinMaxFields: setMaxFieldWidth method', () => {
    const sliderField = document.createElement('div');
    const minMax = new MinMaxFields(sliderField, 0, 100);

    minMax.createMinField()

    it('if span width + 10 <= Field, nothing changes', () => {
        document.body.appendChild(minMax.minField);

        Object.defineProperty(minMax.minField, 'offsetWidth', { configurable:true, value: 25 });
        Object.defineProperty(minMax.minSpan, 'offsetWidth', { configurable:true, value: 15 });

        minMax.minField.style.width = '25px';
        minMax.setMinFieldWidth();
        expect(minMax.minField.style.width).toBe('25px');
    })
    
    it('if min span width + 10 > min Field, min field width should += 10', () => {
        document.body.appendChild(minMax.minField);

        Object.defineProperty(minMax.minField, 'offsetWidth', { configurable:true, value: 25 });
        Object.defineProperty(minMax.minSpan, 'offsetWidth', { configurable:true, value: 17 });

        minMax.setMinFieldWidth();
        expect(minMax.minField.style.width).toBe('35px');
    })
})

describe('min max fields rotate() method', () => {
    const sliderField = document.createElement('div');
    const minMax = new MinMaxFields(sliderField, 0, 100);
    

    it('adds class to the fields', () => {
        // creating fields
        minMax.createMinField();
        minMax.createMaxField();
        // add it to dom
        document.body.appendChild(minMax.minField);
        document.body.appendChild(minMax.maxField);
        // calling method
        minMax.rotate();
        
        expect(minMax.minField.classList.contains('js-slider-min-field_vertical')).toBe(true);
        expect(minMax.maxField.classList.contains('js-slider-max-field_vertical')).toBe(true);
    })
})