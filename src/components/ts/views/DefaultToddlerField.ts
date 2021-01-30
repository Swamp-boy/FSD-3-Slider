class DefaultToddlerField {
    toddler: HTMLElement;
    sliderField: HTMLElement;
    toddlerPushed: boolean;
    
    private min: string;
    private max: string;
    private step: string;

    constructor(min:string, max:string, step:string) {
        this.min = min;
        this.max = max;
        this.step = step;
    }
    work() {
        this.crteateField();
        this.createToddler();
        this.initializeEvents();
    }
    // creating HTML Elements
    createToddler() {
        this.toddler = document.createElement('div');
        this.toddler.classList.add('slider-toddler');
    }

    crteateField() {
        this.sliderField = document.createElement('div');
        this.sliderField.classList.add('slider-field');
    }

    initializeEvents() {
        this.toddler.addEventListener('mousedown', this.mouseOnElement.bind(this));
        this.sliderField.addEventListener('mousedown', this.mouseOnField.bind(this));
        document.addEventListener('mouseup', this.mouseOut.bind(this));
        document.addEventListener('mousemove',this.elementDrag.bind(this));
    }
    // Events
    mouseOnElement(e: MouseEvent) {
        this.toddlerPushed = true;
    }

    mouseOut(e: MouseEvent) {
        this.toddlerPushed = false;
    }

    mouseOnField(e: MouseEvent) {
        // get slider fiel left edge
        this.toddlerPushed = true;
        const path = this.getToddlerPath(e);
        this.toddler.style.left = `${path}px`;
        this.elementDrag(e);
    }
    // Events Funtions
    getToddlerPath(e: MouseEvent): number {
        const sliderFieldRect = this.sliderField.getBoundingClientRect();
        const startFieldX = sliderFieldRect.left;
        const toddlerPath = e.pageX - startFieldX - this.toddler.getBoundingClientRect().width / 2;

        const intervalsNum = (Number(this.max) - Number(this.min)) / Number(this.step);
        const visualStep = sliderFieldRect.width / intervalsNum;
        let pathWithStep = Math.floor(toddlerPath / visualStep) * visualStep;

        if (pathWithStep >= sliderFieldRect.width - this.toddler.getBoundingClientRect().width / 2)
            pathWithStep = sliderFieldRect.width - this.toddler.getBoundingClientRect().width / 2;

        if (pathWithStep <= 0)
            pathWithStep = 0;

        return pathWithStep;
    }

    elementDrag(e: MouseEvent) {
        if (this.toddlerPushed) {
            const path = this.getToddlerPath(e);
            this.toddler.style.left = `${path}px`;
        }
    }

}

export default DefaultToddlerField;