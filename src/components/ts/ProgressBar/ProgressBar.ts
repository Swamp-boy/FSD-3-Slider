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

    public progressBarChangeRange(path: number[]): void {
        if (this.orientation === 'vertical') {
            const top = path[0];
            const bot = path[1]
            this.progressBar.style.top = String(top) + 'px';
            this.progressBar.style.bottom = String(bot) + 'px';
        } else {
            const left = path[0] + this.toddlerWidth / 2;
            const right = this.sliderFieldWidth - path[1] - this.toddlerWidth / 2;
            this.progressBar.style.left = String(left) + 'px';
            this.progressBar.style.right = String(right) + 'px';
        }
    }
}