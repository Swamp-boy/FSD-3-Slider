// Views imports
import DefaultToddlerField from './../DefaultToddlerField/DefaultToddlerField';
import ProgressBar from './../ProgressBar/ProgressBar';
import ValueBanner from './../ValueBanner/ValueBanner';
import MinMaxFields from './../MinMaxFields/MinMaxFields';

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
    valueBanner: ValueBanner
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
        this.baseSlider = new DefaultToddlerField(this.getIntervalsNum(), this.value, this.orientation);
        this.baseSlider.work();

        this.sliderField = this.baseSlider.sliderField;
        this.toddler = this.baseSlider.toddler;
        
        // append elements
        this.container.appendChild(this.sliderField);
        this.container.appendChild(this.toddler);
        // calc toddler star position
        this.baseSlider.setToddlerStartPosition(this.getPathFromValue());
    }
    public createProgressBar(): void {
        this.progressBar = new ProgressBar(this.sliderField, this.toddler, this.orientation);
        this.progressBar.createSingleProgressBar();
        this.progressBar.setBarScope(this.getPathFromValue())
        this.sliderField.appendChild(this.progressBar.progressBar);
    }
    public createBanner(): void {
        this.valueBanner = new ValueBanner(this.value, this.orientation, this.sliderField, this.toddler);
        
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
    private getPathFromValue() {
        // calc distance from left to value
        const fieldWidth = this.orientation === 'horizontal' ? this.sliderField.offsetWidth : this.sliderField.offsetHeight;
        
        const intervalsNum = (this.max - this.min) / this.step;        
        const percent = this.value / (this.max - this.min);
        // distance from left to toddler
        const path = percent * fieldWidth; 
        // step in px
        const visualStep = fieldWidth / intervalsNum; 
        
        return Math.floor(path / visualStep) * visualStep;
    }
    private getIntervalsNum() {
        return (this.max - this.min) / this.step;
    }
}

export default MainView;