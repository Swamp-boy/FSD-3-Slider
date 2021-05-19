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
        if (this.orientation === 'vertical') {
            const top = this.sliderFieldWidth - path - this.toddlerWidth / 2;
            this.progressBar.style.top = String(top) + 'px';
        } else {
            const right = this.sliderFieldWidth - path - this.toddlerWidth / 2;
            this.progressBar.style.right = String(right) + 'px';
        }
    }

    public setRangeProgressBar(path: number[]): void {
        if (this.orientation === 'vertical') {
            const bottom = path[0] + this.toddlerWidth;
            this.progressBar.style.bottom = String(bottom) + 'px';
            const top = this.sliderFieldWidth - path[1] - this.toddlerWidth;
            this.progressBar.style.top = String(top) + 'px';
        } else {
            const left = path[0] + this.toddlerWidth ;
            const right = this.sliderFieldWidth - path[1] - this.toddlerWidth;
            this.progressBar.style.left = String(left) + 'px';
            this.progressBar.style.right = String(right) + 'px';
        }
    }

    public progressBarChangeLeft(path: number): void {
        if (this.orientation === 'vertical') {
            const bottom = path + this.toddlerWidth;
            this.progressBar.style.bottom = String(bottom) + 'px';
        } else {
            const left = path + this.toddlerWidth;
            this.progressBar.style.left = String(left) + 'px';
        }
    }

    public progressBarChangeRight(path: number): void {
        if (this.orientation === 'vertical') {
            const top = this.sliderFieldWidth - path - this.toddlerWidth;
            this.progressBar.style.top = String(top) + 'px';
        } else {
            const right = this.sliderFieldWidth - path - this.toddlerWidth ;
            this.progressBar.style.right = String(right) + 'px';
        }
    }
}