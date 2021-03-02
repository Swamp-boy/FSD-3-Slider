export default class ProgressBar {
    progressBar: HTMLElement;
    sliderFieldWidth: number;
    toddlerWidth: number;
    position: string;

    constructor(sliderField: HTMLElement, toddler: HTMLElement, position: string) {
        if (position === 'horizontal') {
            this.sliderFieldWidth = sliderField.offsetWidth;
            this.toddlerWidth = toddler.offsetWidth;
        }
        if(position === 'vertical') {
            this.sliderFieldWidth = sliderField.offsetHeight;
            this.toddlerWidth = toddler.offsetHeight;
        }
        this.position = position;
    }

    public createSingleProgressBar():void {
        this.progressBar = document.createElement('div');

        this.progressBar.classList.add('slider-progress-bar');
        if (this.position === 'vertical') {
            this.progressBar.classList.add('slider-progress-bar_vertical');
        }
    }

    public progressBarSingleChange(path: number): void {
        if (this.position === 'horizontal') {
            const right: number = this.sliderFieldWidth - path - this.toddlerWidth / 2;
            this.progressBar.style.right = String(right) + 'px';
        } else {
            const top: number = this.sliderFieldWidth - path - this.toddlerWidth / 2;
            this.progressBar.style.top = String(top) + 'px';
        }
        
    }

    public setBarScope(path: number): void {
        if (this.position === 'horizontal') {
            const right: number = this.sliderFieldWidth - path - this.toddlerWidth / 2;
            this.progressBar.style.right = String(right) + 'px';
        }else {
            const top: number = this.sliderFieldWidth - path- this.toddlerWidth / 2;
            this.progressBar.style.top = String(top) + 'px';
        }
    }
}