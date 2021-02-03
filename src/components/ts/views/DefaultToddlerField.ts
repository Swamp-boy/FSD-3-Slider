class DefaultToddlerField {
    toddler: HTMLElement;
    sliderField: HTMLElement;
    toddlerPushed: boolean;

    private min: number;
    private max: number;
    private step: number;
    public value: number;

    private toddlerWidth: number;
    private toddlerHeigth: number;
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

        this.toddlerWidth = this.toddlerWidth === undefined ? 20 : this.toddlerWidth;
        this.toddlerHeigth = this.toddlerHeigth === undefined ? 20 : this.toddlerHeigth;

        this.toddler.style.width = String(this.toddlerWidth) + 'px';
        this.toddler.style.height = String(this.toddlerHeigth) + 'px';
    }

    crteateField(): void {
        this.sliderField = document.createElement('div');
        this.sliderField.classList.add('slider-field');

        this.fieldHeigth = this.fieldHeigth === undefined ? 30 : this.fieldHeigth;
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
        const fieldWidth = this.getFieldWidth();
        const startFieldLeft = this.sliderField.getBoundingClientRect().left;
        const toddlerPath = e.pageX - startFieldLeft - this.toddlerWidth / 2;

        const intervalsNum = (this.max - this.min) / this.step;
        const visualStep = fieldWidth / intervalsNum;
        let pathWithStep = Math.floor(toddlerPath / visualStep) * visualStep;

        if (pathWithStep >= fieldWidth - this.toddlerWidth / 2)
            pathWithStep = fieldWidth - this.toddlerWidth / 2;

        if (pathWithStep <= 0)
            pathWithStep = 0;

        return pathWithStep;
    }

    elementDrag(e: MouseEvent): void {
        if (this.toddlerPushed) {
            const path = this.getToddlerPath(e);
            this.toddler.style.left = `${path}px`;
            this.givePresenterInfo(e);
        }

    }

    private getFieldWidth(): number {
        return this.sliderField.getBoundingClientRect().width;
    }

    getValueFromPath(e: MouseEvent): number {
        let path = this.getToddlerPath(e);
        path = Math.floor(path + this.toddler.getBoundingClientRect().width / 2);
        return path;
    }

    givePresenterInfo(e:MouseEvent):void {
        console.log('defaultToddlerPath')
    }
}

export default DefaultToddlerField;