class DefaultToddlerField {
    toddler: HTMLElement;
    sliderField: HTMLElement;
    toddlerPushed: boolean;

    public min: number;
    public max: number;
    public step: number;
    public value: number;
    public position: string;

    constructor(min:number, max:number, step:number, value:number, position: string) {
        this.min = min;
        this.max = max;
        this.step = step;
        this.value = value;
        this.position = position;
    }

    public work(): void {
        this.createField();
        this.createToddler();
        this.initializeEvents();
    }
    
    public givePresenterInfo(path: number):void {}
    // creating HTML Elements
    private createToddler(): void {
        this.toddler = document.createElement('div');
        this.toddler.classList.add('slider-toddler');
    }

    private createField(): void {
        this.sliderField = document.createElement('div');
        this.sliderField.classList.add('slider-field');
        if(this.position === 'vertical') this.sliderField.classList.add('slider-field_vertical');
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
        this.toddlerPushed = true;
        this.elementDrag(e);
    }
    // Events Functions
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

    public setToddlerStartPosition(): void {
        if (this.position === 'horizontal') {
            // get height of elements
            const fieldHeight = this.sliderField.offsetHeight;
            const toddlerHeigth = this.toddler.offsetHeight;
            // calc margin top
            const marginTop = fieldHeight / 2 - toddlerHeigth / 2;
            this.toddler.style.top = String(marginTop) + 'px';

            const marginLeft = this.getPathFromValue();

            this.toddler.style.left = String(marginLeft) + 'px';
        } else {
            // if position = vertical
            const fieldHeight = this.sliderField.offsetWidth;
            const toddlerHeight = this.toddler.offsetHeight;
            // calc margin left
            const marginLeft = fieldHeight / 2 - toddlerHeight / 2;
            this.toddler.style.left = String(marginLeft) + 'px';
            

            const marginBot = this.getPathFromValue();
            
            this.toddler.style.bottom = String(marginBot) + 'px';
        }
    }

    private getPathFromValue() {
        // calc margin left from value
        let fieldWidth;
        if (this.position === 'horizontal') {
            fieldWidth = this.sliderField.offsetWidth;
        } else {
            // if position = vertical
            fieldWidth = this.sliderField.offsetHeight;
        }
        
        const intervalsNum = (this.max - this.min) / this.step;
        const visualStep = fieldWidth / intervalsNum;
        const visualStepsNum = fieldWidth / visualStep;
        const procent = this.value / (this.max - this.min);
        const path = procent * fieldWidth;

        return Math.floor(path / visualStepsNum) * visualStepsNum;
    }

    private getFieldWidth(): number {
        return this.sliderField.getBoundingClientRect().width;
    }

    private getToddlerWidth(): number {
        return this.toddler.getBoundingClientRect().width;
    }
}

export default DefaultToddlerField;