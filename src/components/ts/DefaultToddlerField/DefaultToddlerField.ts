import { getPathFromMousePos } from './../CalculateFunctions';

class DefaultToddlerField {
    public toddler: HTMLElement;
    public sliderField: HTMLElement;
    public toddlerPushed: boolean;

    private orientation: string;
    private min: number;
    private max: number;
    private step: number;

    constructor(min:number, max:number, step:number, orientation: string) {
        this.min = min;
        this.max = max;
        this.step = step;
        this.orientation = orientation;
    }
    
    public givePresenterValue(path: number): void { }

    public getPathAndMoveToddler(e: MouseEvent): void {
        this.toddlerPushed = true;
        this.elementDrag(e);
        this.toddlerPushed = false;
    }
    
    public setToddlerStartPosition(path: number): void {
        if (this.orientation === 'horizontal') {
            const fieldHeight = this.sliderField.offsetHeight;
            const toddlerHeight = this.toddler.offsetHeight;
            
            const marginTop = fieldHeight / 2 - toddlerHeight / 2;
            this.toddler.style.top = String(marginTop) + 'px';

            const marginLeft = path - this.toddler.offsetWidth / 2;

            this.toddler.style.left = String(marginLeft) + 'px';
        } else {
            // if position === vertical
            const fieldHeight = this.sliderField.offsetWidth;
            const toddlerHeight = this.toddler.offsetWidth;
            // calc margin left
            const marginLeft = fieldHeight / 2 - toddlerHeight / 2;
            this.toddler.style.left = String(marginLeft) + 'px';
            
            const marginBot = path - this.toddler.offsetWidth / 2;
            
            this.toddler.style.bottom = String(marginBot) + 'px';
        }
    }
    // creating HTML Elements
    public createToddler(): void {
        this.toddler = document.createElement('div');
        this.toddler.ondragstart = () => { return false };
        this.toddler.classList.add('js-slider-toddler');
    }

    public createField(): void {
        this.sliderField = document.createElement('div');
        this.sliderField.classList.add('js-slider-field');
        if (this.orientation === 'vertical') this.sliderField.classList.add('js-slider-field_vertical');
    }

    public initializeEvents(): void {
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

    private elementDrag(e: MouseEvent): void {
        if (this.toddlerPushed) {
            let path = getPathFromMousePos(e, this.sliderField, this.toddler, this.orientation,
                this.min, this.max, this.step)
            path -= this.toddler.offsetWidth / 2;

            if (this.orientation === 'horizontal')
                this.toddler.style.left = `${path}px`;
            else
                this.toddler.style.bottom = `${path}px`;
            
            this.givePresenterValue(path);
        }
    }
}

export default DefaultToddlerField;