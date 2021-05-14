import { getPathFromMousePosMulti } from './../CalculateFunctions';


class MultiToddler {
    private orientation: string;
    private min: number;
    private max: number;
    private step: number;
    private firstToddlerPushed: boolean;
    private lastToddlerPushed: boolean;

    public toddler1: HTMLElement;
    public toddler2: HTMLElement;
    public sliderField: HTMLElement;

    private toddler1Pos: number;
    private toddler2Pos: number;


    constructor(orientation: string, min: number, max: number, step: number) {
        this.orientation = orientation;
        this.min = min;
        this.max = max;
        this.step = step;
    }

    public givePresenterValue(path: number[]): void {}
    
    public createToddlers(): void {
        this.toddler1 = document.createElement('div');
        this.toddler2 = document.createElement('div');

        this.toddler1.ondragstart = () => { return false };
        this.toddler2.ondragstart = () => { return false };

        this.toddler1.classList.add('js-slider-toddler');
        this.toddler2.classList.add('js-slider-toddler');
    }

    public createField(): void {
        this.sliderField = document.createElement('div');
        this.sliderField.classList.add('js-slider-field');
        if (this.orientation === 'vertical') this.sliderField.classList.add('js-slider-field_vertical');
    }

    public initializeEvents(): void {
        this.toddler1.addEventListener('mousedown', this.mouseOnStartToddler.bind(this));
        this.toddler2.addEventListener('mousedown', this.mouseOnEndToddler.bind(this));
        document.addEventListener('mouseup', this.mouseOut.bind(this));
        document.addEventListener('mousemove', this.elementDrag.bind(this));
    }
    // in arguments must be passed an array of distance from left, in pixels
    public setToddlersStartPositions(path: number[]): void {
        if (this.orientation === 'horizontal') {
            const fieldHeight = this.sliderField.offsetHeight;
            const firstToddlerHeight = this.toddler1.offsetHeight;
            const secondToddlerHeight = this.toddler1.offsetHeight;
            
            const marginTopForFirst = fieldHeight / 2 - firstToddlerHeight / 2;
            const marginTopForSecond = fieldHeight / 2 - secondToddlerHeight / 2;

            this.toddler1.style.top = String(marginTopForFirst) + 'px';
            this.toddler2.style.top = String(marginTopForSecond) + 'px';

            this.toddler1Pos = path[0];
            this.toddler2Pos = path[1];

            this.toddler1.style.left = String(this.toddler1Pos) + 'px';
            this.toddler2.style.left = String(this.toddler2Pos) + 'px';
        }
        if (this.orientation === 'vertical') {
            
        }
    }
    // Events methods
    private mouseOnStartToddler(): void {
        this.firstToddlerPushed = true;
    }

    private mouseOnEndToddler(): void {
        this.lastToddlerPushed = true;
    }

    private mouseOut(): void {
        this.firstToddlerPushed = false;
        this.lastToddlerPushed = false;
    }
    // moving calculating methods
    private elementDrag(e: MouseEvent): void {
        if (this.firstToddlerPushed === true) {
            let path = getPathFromMousePosMulti(e, this.sliderField, this.toddler1, this.orientation,
                this.min, this.max, this.step);
            
            if (path >= this.toddler2Pos - this.step) {
                path = this.toddler2Pos - this.step
            }
            this.toddler1Pos = path;

            this.orientation === 'horizontal' ?
            this.toddler1.style.left = `${path}px` :
            this.toddler1.style.bottom = `${path}px`;
            
        }
        if (this.lastToddlerPushed === true) {
            let path = getPathFromMousePosMulti(e, this.sliderField, this.toddler2, this.orientation,
                this.min, this.max, this.step);
            
            if (path <= this.toddler1Pos + this.step) {
                path = this.toddler1Pos + this.step
            }
            this.toddler2Pos = path;
            
            this.orientation === 'horizontal' ?
            this.toddler2.style.left = `${path}px` :
            this.toddler2.style.bottom = `${path}px`;
        }
        this.givePresenterValue([this.toddler1Pos, this.toddler2Pos]);
    }
    /*
    private getFirstToddlerPath(e: MouseEvent): number {
        const toddlerWidth = this.toddler1.getBoundingClientRect().width;
        const fieldWidth = this.sliderField.getBoundingClientRect().width;
        const mousePos = e.clientX;
        const startFieldLeft = this.sliderField.getBoundingClientRect().left;

        const toddlerPath = mousePos - startFieldLeft - toddlerWidth / 2;

        // calc length of interval in pixels
        const visualStep = fieldWidth / this.intervalsNum;
        // calc distance in pixels
        let pathWithStep = Math.floor(toddlerPath / visualStep) * visualStep;
        
        if (pathWithStep >= this.toddler2Pos - toddlerWidth - visualStep) {
            pathWithStep = this.toddler2Pos - toddlerWidth - visualStep;
        }
        if (pathWithStep + toddlerWidth / 2 <= 0) {
            pathWithStep = - toddlerWidth / 2;     
        }
        this.toddler1Pos = pathWithStep;
        return pathWithStep;
    }

    private getLastToddlerPath(e: MouseEvent): number {
        const toddlerWidth = this.toddler2.getBoundingClientRect().width;
        const fieldWidth = this.sliderField.getBoundingClientRect().width;
        
        const mousePos = e.clientX;
        const startFieldLeft = this.sliderField.getBoundingClientRect().left;

        const toddlerPath = mousePos - startFieldLeft;
        // calc length of interval in pixels
        const visualStep = fieldWidth / this.intervalsNum;
        // calc distance in pixels
        let pathWithStep = Math.floor(toddlerPath / visualStep) * visualStep;
        
        if (pathWithStep <= this.toddler1Pos + toddlerWidth + visualStep) {
            pathWithStep = this.toddler1Pos + toddlerWidth + visualStep;
        }
        if (pathWithStep + toddlerWidth / 2 >= fieldWidth) {
            pathWithStep = fieldWidth - toddlerWidth / 2;
        }
        this.toddler2Pos = pathWithStep;
    
        return pathWithStep;
    }
    */
}

export default MultiToddler