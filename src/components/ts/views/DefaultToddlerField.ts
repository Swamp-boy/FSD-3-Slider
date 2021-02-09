class DefaultToddlerField {
    toddler: HTMLElement;
    sliderField: HTMLElement;
    toddlerPushed: boolean;

    public min: number;
    public max: number;
    public step: number;
    public value: number;

    constructor(min:number, max:number, step:number, value:number) {
        this.min = min;
        this.max = max;
        this.step = step;
        this.value = value;
    }

    public work(): void {
        this.crteateField();
        this.createToddler();
        this.initializeEvents();
    }
    
    givePresenterInfo(path: number):void {}
    // creating HTML Elements
    private createToddler(): void {
        this.toddler = document.createElement('div');
        this.toddler.classList.add('slider-toddler');
    }

    private crteateField(): void {
        this.sliderField = document.createElement('div');
        this.sliderField.classList.add('slider-field');
    }

    private initializeEvents(): void {
        this.toddler.addEventListener('mousedown', this.mouseOnElement.bind(this));
        this.sliderField.addEventListener('mousedown', this.mouseOnField.bind(this));
        document.addEventListener('mouseup', this.mouseOut.bind(this));
        document.addEventListener('mousemove', this.elementDrag.bind(this));
        
    }
    // Events
    private mouseOnElement(): void {
        this.toddlerPushed = true;
    }

    private mouseOut(): void {
        this.toddlerPushed = false;
    }

    private mouseOnField(e: MouseEvent): void {
        // get slider fiel left edge
        this.toddlerPushed = true;
        this.elementDrag(e);
    }
    // Events Funtions
    private getToddlerPath(e: MouseEvent): number {
        // get width od elements 
        const toddlerWidth = this.getToddlerWidth();
        const fieldWidth = this.getFieldWidth() - toddlerWidth / 2;
        // get left side of sliders field
        const startFieldLeft = this.sliderField.getBoundingClientRect().left;
        // calc distanse from left side of field to mouse
        const toddlerPath = e.clientX - startFieldLeft - toddlerWidth / 2 + 1;
        // calc number of intervals
        const intervalsNum = (this.max - this.min) / this.step;
        // calc length of interval in pixels
        const visualStep = fieldWidth / intervalsNum;
        // calc distanse in pixels
        let pathWithStep = Math.floor(toddlerPath / visualStep) * visualStep;
        // if mouse out of field
        if (pathWithStep >= fieldWidth - toddlerWidth / 2)
            pathWithStep = fieldWidth;

        if (pathWithStep <= 0)
            pathWithStep = 0;

        return pathWithStep;
    }

    private elementDrag(e: MouseEvent): void {
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
}

export default DefaultToddlerField;