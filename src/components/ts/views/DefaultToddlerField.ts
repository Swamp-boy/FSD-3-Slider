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
    
    public givePresenterInfo(path: number): void { }
    
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
            const toddlerHeight = this.toddler.offsetWidth;
            // calc margin left
            const marginLeft = fieldHeight / 2 - toddlerHeight / 2;
            this.toddler.style.left = String(marginLeft) + 'px';
            
            const marginBot = this.getPathFromValue();
            
            this.toddler.style.bottom = String(marginBot) + 'px';
        }
    }
    
    // creating HTML Elements
    private createToddler(): void {
        this.toddler = document.createElement('div');
        this.toddler.ondragstart = () => { return false };
        this.toddler.classList.add('js-slider-toddler');
    }

    private createField(): void {
        this.sliderField = document.createElement('div');
        this.sliderField.classList.add('js-slider-field');
        if (this.position === 'vertical') this.sliderField.classList.add('js-slider-field_vertical');
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
        let toddlerWidth: number;
        let fieldWidth: number;
        // get mouse position
        let mousePos: number;
        // get left side of slider field
        let startFieldLeft: number;
        // toddler distance
        let toddlerPath: number;
    
        if (this.position === 'vertical') {
            toddlerWidth = this.toddler.getBoundingClientRect().height;
            fieldWidth = this.sliderField.getBoundingClientRect().height - toddlerWidth / 2;
            startFieldLeft = this.sliderField.getBoundingClientRect().bottom;
            mousePos = e.clientY;
            toddlerPath = startFieldLeft - mousePos - toddlerWidth / 2;
        } else {
            // if position is horizontal
            toddlerWidth = this.toddler.getBoundingClientRect().width;
            fieldWidth = this.sliderField.getBoundingClientRect().width - toddlerWidth / 2;
            startFieldLeft = this.sliderField.getBoundingClientRect().left;
            mousePos = e.clientX;
            toddlerPath = mousePos - startFieldLeft - toddlerWidth / 2;
        }
        // calc number of intervals
        const intervalsNum = (this.max - this.min) / this.step;
        // calc length of interval in pixels
        const visualStep = fieldWidth / intervalsNum;
        // calc distance in pixels
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
            if (this.position === 'horizontal')
                this.toddler.style.left = `${path}px`;
            else
                this.toddler.style.bottom = `${path}px`;
            
            this.givePresenterInfo(path);
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
}

export default DefaultToddlerField;