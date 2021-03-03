// Views imports
import DefaultToddlerField from './DefaultToddlerField';
import ProgressBar from './ProgressBar';
import valueBanner from './valueBanner';
import MinMaxFields from './MinMaxFields';


import './../interfaces/containerParams';

class MainView {
    container: HTMLElement;

    public min: number;
    public max: number;
    public step: number;
    public value: number;
    public multiValue: number[];
    public orientation: string;

    //slider elements
    sliderField: HTMLElement;
    toddler: HTMLElement;
    bar: HTMLElement;
    banner: HTMLElement;
    minField: HTMLElement;
    maxField: HTMLElement;

    // Sub views
    baseSlider: DefaultToddlerField;
    progressBar: ProgressBar;
    valueBanner: valueBanner
    minMaxField: MinMaxFields;

    constructor(container: HTMLElement) {
        this.container = container;
        this.container.classList.add('js-slider-container_def')
        this.orientation === 'vertical' && this.container.classList.add('js-slider-container_vertical')
    }

    public sendValueToElements(): void {
        this.valueBanner.value = this.value;
    }

    public createBaseSlider(): void {
        this.baseSlider = new DefaultToddlerField(this.min, this.max, this.step, this.value, this.orientation);
        this.baseSlider.work();

        this.sliderField = this.baseSlider.sliderField;
        this.toddler = this.baseSlider.toddler;
        
        // append elements
        this.container.appendChild(this.sliderField);
        this.container.appendChild(this.toddler);
        // calc toddler star position
        this.baseSlider.setToddlerStartPosition();
    }

    public createProgressBar(): void {
        const path = this.getPathFromValue();
        /*const scopeArray: number[] = [this.sliderField.getBoundingClientRect().left,
            this.toddler.getBoundingClientRect().right - this.toddler.getBoundingClientRect().width / 2];*/
        
        this.progressBar = new ProgressBar(this.sliderField, this.toddler, this.orientation);
        
        this.progressBar.createSingleProgressBar();
        this.progressBar.setBarScope(path)
        this.sliderField.appendChild(this.progressBar.progressBar);

    }

    public createBanner(): void {
        this.valueBanner = new valueBanner(this.min, this.max, this.step, this.value, this.orientation,
            this.sliderField, this.toddler);
        
        this.valueBanner.work();
        this.container.appendChild(this.valueBanner.valueBannerContainer);
        this.orientation === 'horizontal' ?
            this.valueBanner.setStartPositionHorizontal(this.getPathFromValue()) :
            this.valueBanner.setStartPositionVertical(this.getPathFromValue());

        this.banner = this.valueBanner.valueBannerContainer;
    }

    public createMinMax(): void {
        this.minMaxField = new MinMaxFields(this.sliderField, this.min, this.max);
        this.minMaxField.createMinMax();
        

        if (this.orientation === 'vertical') {
            this.minMaxField.rotate();
        }

        this.container.appendChild(this.minMaxField.minField);
        this.container.appendChild(this.minMaxField.maxField);
        // change width of field if text width is too big
        this.minMaxField.setFieldsWidth(this.minMaxField.minSpan, this.minMaxField.maxSpan);
        this.minMaxField.setMinField(this.orientation);
        this.minMaxField.setMaxField(this.orientation);

        this.minField = this.minMaxField.minField;
        this.maxField = this.minMaxField.maxField;
    }
    private getHorizontalPath() {
        // calc margin left from value
        const fieldWidth = this.sliderField.offsetWidth;
        const intervalsNum = (this.max - this.min) / this.step;
        const visualStep = fieldWidth / intervalsNum;
        const visualStepsNum = fieldWidth / visualStep;
        const procent = this.value / (this.max - this.min);
        const path = procent * fieldWidth;

        return Math.floor(path / visualStepsNum) * visualStepsNum;
    }
    private getPathFromValue() {
        // calc margin left from value
        const fieldWidth = this.orientation === 'horizontal'? this.sliderField.offsetWidth : this.sliderField.offsetHeight;
        const intervalsNum = (this.max - this.min) / this.step;
        const visualStep = fieldWidth / intervalsNum;
        const visualStepsNum = fieldWidth / visualStep;
        const procent = this.value / (this.max - this.min);
        const path = procent * fieldWidth;

        return Math.floor(path / visualStepsNum) * visualStepsNum;
    }
}

export default MainView;