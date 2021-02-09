export default class ProgressBar {
    progressBar: HTMLElement;
    sliderField: HTMLElement;
    backgroundColor: string;
    scopeArray: Array<number>;

    constructor(sliderField: HTMLElement,  scopeArray: Array<number>) {
        this.sliderField = sliderField;
        this.scopeArray = scopeArray;
    }

    public createSingleProgressBar():void {
        this.progressBar = document.createElement('div');

        this.progressBar.classList.add('slider-progres-bar');

        this.setBarScope(this.scopeArray);
    }

    public progressBarSingleChange(path: number): void {
        const right: number = this.sliderField.getBoundingClientRect().width - path;
        this.progressBar.style.right = String(right) + 'px';
    }

    private setBarScope(scopeArray: Array<number>): void {
        const left = 0;
        const right: number = this.sliderField.getBoundingClientRect().width - (scopeArray[1] - scopeArray[0]);
        this.progressBar.style.left = String(left) + 'px';
        this.progressBar.style.right = String(right) + 'px';
    }
}