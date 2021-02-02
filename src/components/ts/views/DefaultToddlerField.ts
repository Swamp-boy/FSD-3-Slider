class DefaultToddlerField {
    toddler: HTMLElement;
    sliderField: HTMLElement;
    toddlerPushed: boolean;

    private min: string;
    private max: string;
    private step: string;

    private toddlerWidth: number;
    private toddlerHeigth: number;
    private fieldHeigth: number;

    constructor(min:string, max:string, step:string) {
        this.min = min;
        this.max = max;
        this.step = step;
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

        this.toddler.style.width = this.toddlerWidth === undefined ? `${20}px` : `${this.toddlerWidth}px`;
        this.toddler.style.width = this.toddlerHeigth === undefined ? `${20}px` : `${this.toddlerHeigth}px`;
        // доделать автоположение слайдера
    }

    crteateField(): void {
        this.sliderField = document.createElement('div');
        this.sliderField.classList.add('slider-field');

        this.sliderField.style.height = this.fieldHeigth === undefined ? `${30}px` : `${this.fieldHeigth}px`;
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

    elementDrag(e: MouseEvent): void {
        if (this.toddlerPushed) {
            const path = this.getToddlerPath(e);
            this.toddler.style.left = `${path}px`;
            this.givePresenterInfo(e);
        }

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