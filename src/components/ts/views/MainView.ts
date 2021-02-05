// Views imports
import DefaultToddlerField from './DefaultToddlerField';
import ProgressBar from './ProgressBar';

import './../interfaces/containerParams';

export default class BaseView {
    container: HTMLElement;

    public min: number;
    public max: number;
    public step: number;
    public value: number;

    public sliderWidth: number;

    //slider elements
    slederField: HTMLElement;
    toddler: HTMLElement;

    // Sub views
    baseSlider: DefaultToddlerField;
    progressBar: ProgressBar;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    createBaseSlider(): void {
        this.baseSlider = new DefaultToddlerField(this.min, this.max, this.step, this.value);
        this.baseSlider.work();

        this.slederField = this.baseSlider.sliderField;
        this.toddler = this.baseSlider.toddler;
        
        // append elements
        this.container.appendChild(this.slederField);
        this.container.appendChild(this.toddler);
        // for this slider type range is
        this.sliderWidth = this.baseSlider.sliderField.getBoundingClientRect().width;
        // calc toddler star position
        this.setToddlerStartPosition();
    }

    

    createProgressBar(): void {
        const scopeArray: number[] = [this.slederField.getBoundingClientRect().left,
            this.toddler.getBoundingClientRect().right - this.toddler.getBoundingClientRect().width / 2];
        
        this.progressBar = new ProgressBar(this.slederField, scopeArray);
        
        this.progressBar.createSingleProgressBar();
        this.slederField.appendChild(this.progressBar.progressBar);
    }

    private setToddlerStartPosition() {
        // get height of elements
        const fieldHeight = this.slederField.offsetHeight;
        const toddlerHeigth = this.toddler.offsetHeight;
        // calc margin top
        const marginTop = fieldHeight / 2 - toddlerHeigth / 2;
        this.toddler.style.top = String(marginTop) + 'px';

        // calac margin left from value
        const fieldWidth = this.slederField.offsetWidth;
        const intervalsNum = (this.max - this.min) / this.step;
        const visualStep = fieldWidth / intervalsNum;
        const visualstepsNum = fieldWidth / visualStep;
        const procent = this.value / (this.max - this.min);
        const path = procent * fieldWidth
        
        const marginLeft = Math.floor(path / visualstepsNum) * visualstepsNum;
        this.toddler.style.left = String(marginLeft) + 'px';
    }
}