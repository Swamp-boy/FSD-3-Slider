class DefaultToddlerField {
    toddler: HTMLElement;
    sliderField: HTMLElement;
    toddlerPushed: boolean;

    private min: number;
    private max: number;
    private step: number;
    public value: number;

    private toddlerWidth: number;
    private fieldHeigth: number;

    constructor(min:number, max:number, step:number, value:number) {
        this.min = min;
        this.max = max;
        this.step = step;
        this.value = value;
    }
    work(): void {
        this.crteateField();
        this.createToddler();
        
        this.initializeEvents();
    }
    // creating HTML Elements
    createToddler(): void {
        this.toddler = document.createElement('div');
        this.toddler.classList.add('slider-toddler');
    }

    crteateField(): void {
        this.sliderField = document.createElement('div');
        this.sliderField.classList.add('slider-field');
        this.sliderField.style.height = String(this.fieldHeigth) + 'px';
    }

    initializeEvents(): void {
        this.toddler.addEventListener('mousedown', this.mouseOnElement.bind(this));
        this.sliderField.addEventListener('mousedown', this.mouseOnField.bind(this));
        document.addEventListener('mouseup', this.mouseOut.bind(this));
        document.addEventListener('mousemove',this.elementDrag.bind(this));
    }
    // Events
    mouseOnElement(): void {
        this.toddlerPushed = true;
    }

    mouseOut(): void {
        this.toddlerPushed = false;
    }

    mouseOnField(e: MouseEvent): void {
        // get slider fiel left edge
        this.toddlerPushed = true;
        this.elementDrag(e);
    }
    // Events Funtions
    getToddlerPath(e: MouseEvent): number {
        // get width od elements 
        const fieldWidth = this.getFieldWidth();
        const toddlerWidth = this.getToddlerWidth();
        // get left side of sliders field
        const startFieldLeft = this.sliderField.getBoundingClientRect().left;
        // calc distanse from left side of field to mouse
        const toddlerPath = e.pageX - startFieldLeft - toddlerWidth / 2;
        // calc number of intervals
        const intervalsNum = (this.max - this.min) / this.step;
        // calc length of interval in pixels
        const visualStep = fieldWidth / intervalsNum;
        // calc distanse in pixels
        let pathWithStep = Math.floor(toddlerPath / visualStep) * visualStep;
        // if mouse out of field
        if (pathWithStep >= fieldWidth - toddlerWidth / 2)
            pathWithStep = fieldWidth - toddlerWidth / 2;

        if (pathWithStep <= 0)
            pathWithStep = 0;

        return pathWithStep;
    }

    elementDrag(e: MouseEvent): void {
        if (this.toddlerPushed) {
            const path = this.getToddlerPath(e);
            this.toddler.style.left = `${path}px`;
            this.givePresenterInfo(path);
        }

    }

    private getFieldWidth(): number {
        return this.sliderField.getBoundingClientRect().width;
    }

    private getToddlerWidth(): number {
        return this.toddler.getBoundingClientRect().width;
    }
    /*
    getValueFromPath(e: MouseEvent): number {
        let path = this.getToddlerPath(e);
        path = Math.floor(path + this.getToddlerWidth() / 2);
        return path;
    }
    */
    givePresenterInfo(path: number):void {}
        
}

export default DefaultToddlerField;