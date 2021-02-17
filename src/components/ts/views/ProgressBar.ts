export default class ProgressBar {
    progressBar: HTMLElement;
    sliderFieldWidth: number;
    toddlerWidth: number;
    scopeArray: Array<number>;

    constructor(sliderFieldWidth: number, toddlerWidth: number,  scopeArray: Array<number>) {
        this.sliderFieldWidth = sliderFieldWidth;
        this.toddlerWidth = toddlerWidth;
        this.scopeArray = scopeArray;
    }

    public createSingleProgressBar():void {
        this.progressBar = document.createElement('div');

        this.progressBar.classList.add('slider-progres-bar');

        this.setBarScope(this.scopeArray);
    }

    public progressBarSingleChange(path: number): void {
        const right: number = this.sliderFieldWidth - path - this.toddlerWidth / 2;
        this.progressBar.style.right = String(right) + 'px';
    }

    private setBarScope(scopeArray: Array<number>): void {
        const left = 0;
        const right: number = this.sliderFieldWidth - (scopeArray[1] - scopeArray[0]);
        this.progressBar.style.left = String(left) + 'px';
        this.progressBar.style.right = String(right) + 'px';
    }
}