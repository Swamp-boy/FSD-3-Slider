export default class ProgressBar {
    progressBar: HTMLElement;
    sliderField: HTMLElement;
    backgroundColor: string;

    constructor(sliderField: HTMLElement) {
        this.sliderField = sliderField;
    }

    setProgressBarBackgroundColor(color: string):void {
        this.backgroundColor = color;       
    }
    
    createProgressBar():void {
        this.progressBar = document.createElement('div');

        if (this.backgroundColor !== undefined){
            this.progressBar.style.backgroundColor = this.backgroundColor;
        }    
        else {
            this.progressBar.style.backgroundColor = "#e75735";
        }

        this.progressBar.classList.add('slider-progres-bar');
    }
}