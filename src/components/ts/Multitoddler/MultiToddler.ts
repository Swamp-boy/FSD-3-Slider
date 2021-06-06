import { getPathFromMousePosMulti } from './../CalculateFunctions';


class MultiToddler {
    private orientation: string;
    private min: number;
    private max: number;
    private step: number;
    // have to be public for value banners
    public firstToddlerPushed: boolean;
    public lastToddlerPushed: boolean;

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

    public givePresenterValue(path: number[]): void { }
    
    public getPathAndMoveToddler(e: MouseEvent): void {
        const fromLeft = e.clientX - this.sliderField.getBoundingClientRect().left;
        fromLeft - this.toddler1Pos < this.toddler2Pos - fromLeft ?
            this.firstToddlerPushed = true : this.lastToddlerPushed = true
        
        this.elementDrag(e);
        this.firstToddlerPushed = false;
        this.lastToddlerPushed = false;
    }
    
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
            const secondToddlerHeight = this.toddler2.offsetHeight;
            
            const marginTopForFirst = fieldHeight / 2 - firstToddlerHeight / 2;
            const marginTopForSecond = fieldHeight / 2 - secondToddlerHeight / 2;

            this.toddler1.style.top = String(marginTopForFirst) + 'px';
            this.toddler2.style.top = String(marginTopForSecond) + 'px';

            this.toddler1Pos = path[0] - this.toddler1.offsetWidth / 2;
            this.toddler2Pos = path[1] - this.toddler2.offsetWidth / 2;

            this.toddler1.style.left = String(this.toddler1Pos) + 'px';
            this.toddler2.style.left = String(this.toddler2Pos) + 'px';
        }
        if (this.orientation === 'vertical') {
            const fieldHeight = this.sliderField.offsetWidth;
            const firstToddlerHeight = this.toddler1.offsetWidth;
            const secondToddlerHeight = this.toddler2.offsetWidth;

            const marginTopForFirst = fieldHeight / 2 - firstToddlerHeight / 2;
            const marginTopForSecond = fieldHeight / 2 - secondToddlerHeight / 2;

            this.toddler1.style.left = String(marginTopForFirst) + 'px';
            this.toddler2.style.left = String(marginTopForSecond) + 'px';

            this.toddler1Pos = path[0] - this.toddler1.offsetWidth / 2;
            this.toddler2Pos = path[1] - this.toddler2.offsetWidth / 2;

            this.toddler1.style.bottom = String(this.toddler1Pos) + 'px';
            this.toddler2.style.bottom = String(this.toddler2Pos) + 'px';
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
            path -= this.toddler1.offsetWidth / 2;
            
            const stepLength = this.sliderField.offsetWidth / ((this.max - this.min) / this.step);
            
            if (path >= (this.toddler2Pos + this.toddler1.offsetWidth / 2 - stepLength)) {
                path = this.toddler2Pos - stepLength;
                this.toddler1Pos = path - this.toddler1.offsetWidth / 2;
            } else {
                
                this.toddler1Pos = path - this.toddler1.offsetWidth / 2;
                
            }
            this.givePresenterValue([this.toddler1Pos, this.toddler2Pos]);

            this.orientation === 'horizontal' ?
            this.toddler1.style.left = `${path}px` :
            this.toddler1.style.bottom = `${path}px`;
            
            this.toddler1Pos += this.toddler1.offsetWidth / 2;
        }
        if (this.lastToddlerPushed === true) {
            let path = getPathFromMousePosMulti(e, this.sliderField, this.toddler2, this.orientation,
                this.min, this.max, this.step);
            
            const stepLength = this.sliderField.offsetWidth / ((this.max - this.min) / this.step);
            
            if (path <= this.toddler1Pos + this.toddler2.offsetWidth / 2 + stepLength) {
                path = this.toddler1Pos + stepLength;
                this.toddler2Pos = path - this.toddler2.offsetWidth / 2;
            } else {
                path -= this.toddler2.offsetWidth / 2;
                this.toddler2Pos = path - this.toddler1.offsetWidth / 2;
            }
            this.givePresenterValue([this.toddler1Pos, this.toddler2Pos]);

            this.orientation === 'horizontal' ?
            this.toddler2.style.left = `${path}px` :
                this.toddler2.style.bottom = `${path}px`;
            
            this.toddler2Pos += this.toddler2.offsetWidth / 2;
            
        }
    }
}

export default MultiToddler