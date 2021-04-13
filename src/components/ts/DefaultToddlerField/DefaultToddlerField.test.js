import DefaultToddlerField from './DefaultToddlerField';

it('constructor test', () => {
    const def = new DefaultToddlerField(100, 50, 'horizontal');
    expect(def.intervalsNum).toBe(100);
    expect(def.value).toBe(50);
    expect(def.orientation).toBe('horizontal');
})

describe('create slider field method', () => {
    it('field must have class js-slider-field', () => {
        const slider = new DefaultToddlerField(100, 50, 'horizontal');
        slider.createField();
        expect(slider.sliderField.classList.contains('js-slider-field')).toBe(true);
    })

    it('field must have class js-slider-field_vertical if orientation is vertical', () => {
        const slider = new DefaultToddlerField(100, 50, 'vertical');
        slider.createField();
        expect(slider.sliderField.classList.contains('js-slider-field_vertical')).toBe(true);
    })
})

describe('create toddler method', () => {
    const slider = new DefaultToddlerField(100, 50, 'horizontal');
    slider.createToddler();

    it('check toddler ondragstart property', () => {
        expect(slider.toddler.ondragstart()).toEqual(false)
    })

    it('toddler must have class js-slider-toddler', () => {
        expect(slider.toddler.classList.contains('js-slider-toddler')).toBe(true);
    })
})

describe('DefaultToddlerField initialize events method', () => {
    const slider = new DefaultToddlerField(100, 50, 'horizontal');
    slider.createToddler();
    slider.createField();
    slider.initializeEvents();
    
    it('toddler must be pushed on mousedown', () => {
        const ev = new Event('mousedown');
        slider.toddler.dispatchEvent(ev);
        expect(slider.toddlerPushed).toBe(true);
    })

    it('toddler pushed === false on mouse up', () => {
        const ev = new Event('mouseup');
        document.dispatchEvent(ev);
        expect(slider.toddlerPushed).toBe(false);
    })

    it('toddler must be pushed, if mouse down on slider field', () => {
        const ev = new Event('mousedown');
        slider.sliderField.dispatchEvent(ev);
        expect(slider.toddlerPushed).toBe(true);
    })
    
    it('slider field mouse down must call elementDrag() that calls givePresenterInfo()', () => {
        const ev = new Event('mousedown');
        slider.givePresenterInfo = jest.fn();
        slider.sliderField.dispatchEvent(ev);
        expect(slider.givePresenterInfo).toBeCalled();
    })
})

describe('testing toddler drag fo horizontal version', () => {
    const slider = new DefaultToddlerField(100, 50, 'horizontal');
    slider.createToddler();
    slider.createField();
    slider.initializeEvents();
    
    slider.toddler.getBoundingClientRect = jest.fn(() => ({
        width: 10,
        height: 10,
        top: 0,
        left: 0,
    }));
        
    slider.sliderField.getBoundingClientRect = jest.fn(() => ({
        width: 105,
        height: 50,
        top: 0,
        left: 0,
    }));

    it('mouse down on field 50', () => {
        const ev = new MouseEvent('mousedown', {
            clientX: 50,
        });
        slider.sliderField.dispatchEvent(ev);
        expect(slider.toddler.style.left).toBe('45px')
    })

    it('mouse down on field 10', () => {
        const ev = new MouseEvent('mousedown', {
            clientX: 10,
        });
        slider.sliderField.dispatchEvent(ev);
        expect(slider.toddler.style.left).toBe('5px')
    })

    it('mouse down on field 17,5', () => {
        const ev = new MouseEvent('mousedown', {
            clientX: 17.5,
        });
        slider.sliderField.dispatchEvent(ev);
        expect(slider.toddler.style.left).toBe('12px');
    })

    it('mouse move 33', () => {
        slider.toddlerPushed = true;
        const ev = new MouseEvent('mousemove', {
            clientX: 33,
        });

        document.dispatchEvent(ev);
        expect(slider.toddler.style.left).toBe('28px');
    })
})

//=============================
describe('testing toddler drag fo vertical version', () => {
    const slider = new DefaultToddlerField(50, 100, 'vertical');
    slider.createToddler();
    slider.createField();
    slider.initializeEvents();
    
    slider.toddler.getBoundingClientRect = jest.fn(() => ({
        width: 10,
        height: 10,
        top: 0,
        left: 0,
    }));
        
    slider.sliderField.getBoundingClientRect = jest.fn(() => ({
        width: 50,
        height: 105,
        top: 0,
        left: 0,
        bottom:105,
    }));

    it('mouse down on field 50', () => {
        const ev = new MouseEvent('mousedown', {
            clientY: 50,
        });
        slider.sliderField.dispatchEvent(ev);
        expect(slider.toddler.style.bottom).toBe('50px')
    })

    it('mouse down on field 10', () => {
        const ev = new MouseEvent('mousedown', {
            clientY: 10,
        });
        slider.sliderField.dispatchEvent(ev);
        expect(slider.toddler.style.bottom).toBe('90px')
    })

    it('mouse down on field 17,5', () => {
        const ev = new MouseEvent('mousedown', {
            clientY: 17.5,
        });
        slider.sliderField.dispatchEvent(ev);
        expect(slider.toddler.style.bottom).toBe('82px');
    })

    it('mouse move 33', () => {
        slider.toddlerPushed = true;
        const ev = new MouseEvent('mousemove', {
            clientY: 33,
        });

        document.dispatchEvent(ev);
        expect(slider.toddler.style.bottom).toBe('66px');
    })
})

describe('set toddler start position method for horizontal version', () => {
    const slider = new DefaultToddlerField(50, 100, 'horizontal');
    slider.createToddler();
    slider.createField();
    
    Object.defineProperty(slider.toddler, 'offsetHeight', { value: 10 });
    Object.defineProperty(slider.sliderField, 'offsetHeight', { value: 105 });
    
    it('set start position if path = 10', () => {
        slider.setToddlerStartPosition(10);
        expect(slider.toddler.style.top).toBe('47.5px');
        expect(slider.toddler.style.left).toBe('10px');
    })
})

describe('set toddler start position method for vertical version', () => {
    const slider = new DefaultToddlerField(50, 100, 'vertical');
    slider.createToddler();
    slider.createField();
    
    Object.defineProperty(slider.toddler, 'offsetWidth', { value: 10 });
    Object.defineProperty(slider.sliderField, 'offsetWidth', { value: 105 });
    
    it('set start position if path = 10', () => {
        slider.setToddlerStartPosition(10);
        expect(slider.toddler.style.left).toBe('47.5px');
        expect(slider.toddler.style.bottom).toBe('10px');
    })
})