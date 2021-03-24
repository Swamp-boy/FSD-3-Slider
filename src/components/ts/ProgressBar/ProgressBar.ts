export default class ProgressBar {
    progressBar: HTMLElement;
    sliderFieldWidth: number;
    toddlerWidth: number;
    orientation: string;

    constructor(sliderField: HTMLElement, toddler: HTMLElement, orientation: string) {
        if (orientation === 'horizontal') {
            this.sliderFieldWidth = sliderField.offsetWidth;
            this.toddlerWidth = toddler.offsetWidth;
        }
        if(orientation === 'vertical') {
            this.sliderFieldWidth = sliderField.offsetHeight;
            this.toddlerWidth = toddler.offsetHeight;
        }
        this.orientation = orientation;
    }

    public createSingleProgressBar():void {
        this.progressBar = document.createElement('div');

        this.progressBar.classList.add('slider-progress-bar');
        if (this.orientation === 'vertical') {
            this.progressBar.classList.add('slider-progress-bar_vertical');
        }
    }

    public progressBarSingleChange(path: number): void {
        if (this.orientation === 'horizontal') {
            const right: number = this.sliderFieldWidth - path - this.toddlerWidth / 2;
            this.progressBar.style.right = String(right) + 'px';
        } else {
            const top: number = this.sliderFieldWidth - path - this.toddlerWidth / 2;
            this.progressBar.style.top = String(top) + 'px';
        }
        
    }
}