export default class ProgressBar {
    progressBar: HTMLElement;
    sliderField: HTMLElement;
    backgroundColor: string;
    scopeArray: Array<number>;

    constructor(sliderField: HTMLElement,  scopeArray: Array<number>) {
        this.sliderField = sliderField;
        this.scopeArray = scopeArray;
    }

    setProgressBarBackgroundColor(color: string):void {
        this.backgroundColor = color;       
    }
    
    setBarScope(scopeArray: Array<number>): void {
        const left = 0;
        const right: number = this.sliderField.getBoundingClientRect().width - (scopeArray[1] - scopeArray[0]);
        this.progressBar.style.left = String(left) + 'px';
        this.progressBar.style.right = String(right) + 'px';
    }
    
    createSingleProgressBar():void {
        this.progressBar = document.createElement('div');

        if (this.backgroundColor !== undefined){
            this.progressBar.style.backgroundColor = this.backgroundColor;
        }    
        else {
            this.progressBar.style.backgroundColor = "#e75735";
        }

        this.progressBar.classList.add('slider-progres-bar');

        this.setBarScope(this.scopeArray);
    }

    progressBarChange(path: number): void {
        
        const right: number = this.sliderField.getBoundingClientRect().width - path;
        this.progressBar.style.right = String(right) + 'px';
        
    }
}