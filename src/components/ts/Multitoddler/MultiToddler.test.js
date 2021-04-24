import MultiToddler from './MultiToddler';

describe('MultiToddler constructor', () => {
    const multi = new MultiToddler([10, 40, 60, 90], 'horizontal', 100);

    it('must write down values array', () => {
        expect(multi.values).toEqual([10, 40, 60, 90]);
    })

    it('must write down orientation', () => {
        expect(multi.orientation).toBe('horizontal');
    })

    it('must write down intervals num', () => {
        expect(multi.intervalsNum).toBe(100);
    })
})

describe('Create toddlers and field for horizontal version', () => {
    const multi = new MultiToddler([10, 40, 60, 90], 'horizontal');

    it('create toddlers must add them class', () => {
        multi.createToddlers();
        
        document.body.appendChild(multi.toddler1);
        document.body.appendChild(multi.toddler2);
        
        const toddlers = document.getElementsByClassName('js-slider-toddler');
        expect(toddlers.length).toBe(2);
    })

    it('creating field must add class', () => {
        multi.createField();

        document.body.appendChild(multi.sliderField);
        expect(multi.sliderField.className).toBe('js-slider-field');
    })
})

describe('Create field', () => {
    it('creating field must add class', () => {
        const multi = new MultiToddler([10, 40, 60, 90], 'horizontal');
        multi.createField();

        document.body.appendChild(multi.sliderField);
        expect(multi.sliderField.className).toBe('js-slider-field');
    })

    it('creating vertical field must add vertical class', () => {
        const multi = new MultiToddler([10, 40, 60, 90], 'vertical');
        multi.createField();

        document.body.appendChild(multi.sliderField);
        expect(multi.sliderField.className).toBe('js-slider-field js-slider-field_vertical');
    })
})

describe('Initialize events', () => {
    const multi = new MultiToddler([10, 40, 60, 90], 'horizontal');
    multi.createToddlers();
    multi.initializeEvents();

    it('mouse down on toddler1', () => {
        const ev = new MouseEvent('mousedown');
        multi.toddler1.dispatchEvent(ev);
        expect(multi.firstToddlerPushed).toBe(true);
    })

    it('mouse down on toddler2', () => {
        const ev = new MouseEvent('mousedown');
        multi.toddler2.dispatchEvent(ev);
        expect(multi.lastToddlerPushed).toBe(true);
    })

    it('the mouse is up away from the slider', () => {
        const ev = new MouseEvent('mouseup');

        document.dispatchEvent(ev);
        expect(multi.firstToddlerPushed).toBe(false);

        document.dispatchEvent(ev);
        expect(multi.lastToddlerPushed).toBe(false);
    })


})