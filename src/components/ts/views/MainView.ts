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

    public sliderWidth: number;

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
        this.container.classList.add('js-slider-container-def')
    }

    public sendValueToElements(): void {
        this.valueBanner.value = this.value;
    }

    public createBaseSlider(): void {
        this.baseSlider = new DefaultToddlerField(this.min, this.max, this.step, this.value);
        this.baseSlider.work();

        this.sliderField = this.baseSlider.sliderField;
        this.toddler = this.baseSlider.toddler;
        
        // append elements
        this.container.appendChild(this.sliderField);
        this.container.appendChild(this.toddler);
        // for this slider type range is
        this.sliderWidth = this.baseSlider.sliderField.getBoundingClientRect().width;
        // calc toddler star position
        this.setToddlerStartPosition();
    }

    public createProgressBar(): void {
        const scopeArray: number[] = [this.sliderField.getBoundingClientRect().left,
            this.toddler.getBoundingClientRect().right - this.toddler.getBoundingClientRect().width / 2];
        
        this.progressBar = new ProgressBar(this.sliderField, scopeArray);
        
        this.progressBar.createSingleProgressBar();
        this.sliderField.appendChild(this.progressBar.progressBar);

    }

    public createBanner(): void {
        this.valueBanner = new valueBanner(this.min, this.max, this.step, this.value,
            this.sliderField.offsetWidth, this.toddler.offsetWidth);
        
        this.valueBanner.work();
        this.container.appendChild(this.valueBanner.valueBannerContainer);

        this.valueBanner.setStartPosition(this.getPathFromValue());

        this.banner = this.valueBanner.valueBannerContainer;
    }

    public createMinMax(): void {
        this.minMaxField = new MinMaxFields(this.sliderField, this.min, this.max);
        this.minMaxField.work();

        this.container.appendChild(this.minMaxField.minField);
        this.container.appendChild(this.minMaxField.maxField);
        // change width of field if text width is too big
        this.minMaxField.setFieldsWidth(this.minMaxField.minSpan, this.minMaxField.maxSpan);

        this.minField = this.minMaxField.minField;
        this.maxField = this.minMaxField.maxField;
    }

    public rotateSlider(): void {
        this.sliderField.classList.add('slider-field-vertical');
    }

    private getPathFromValue() {
        // calc margin left from value
        const fieldWidth = this.sliderField.offsetWidth;
        const intervalsNum = (this.max - this.min) / this.step;
        const visualStep = fieldWidth / intervalsNum;
        const visualStepsNum = fieldWidth / visualStep;
        const procent = this.value / (this.max - this.min);
        const path = procent * fieldWidth;

        return Math.floor(path / visualStepsNum) * visualStepsNum;
    }

    private setToddlerStartPosition() {
        // get height of elements
        const fieldHeight = this.sliderField.offsetHeight;
        const toddlerHeigth = this.toddler.offsetHeight;
        // calc margin top
        const marginTop = fieldHeight / 2 - toddlerHeigth / 2;
        this.toddler.style.top = String(marginTop) + 'px';

        const marginLeft = this.getPathFromValue();
        this.toddler.style.left = String(marginLeft) + 'px';
    }
}

export default MainView;