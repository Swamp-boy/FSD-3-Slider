// Views imports
import DefaultToddlerField from './../DefaultToddlerField/DefaultToddlerField';
import MultiToddler from '../MultiToddler/MultiToddler';
import ProgressBar from './../ProgressBar/ProgressBar';
import ValueBanner from './../ValueBanner/ValueBanner';
import MinMaxFields from './../MinMaxFields/MinMaxFields';
import ValueScale from './../ValueScale/ValueScale';

import { getPathFromValue, getIntervalsNum } from './../CalculateFunctions';

class MainView {
    public sliderType: string;
    public container: HTMLElement;
    public min: number;
    public max: number;
    public step: number;
    public value: number;
    public multiValue: number[];
    public orientation: string;

    //slider elements
    sliderField: HTMLElement;
    toddler: HTMLElement;
    //if multi toddlers
    toddler1: HTMLElement;
    toddler2: HTMLElement;
    bar: HTMLElement;
    banner: HTMLElement;
    minField: HTMLElement;
    maxField: HTMLElement;
    scale: HTMLElement;

    // Sub views
    baseSlider: DefaultToddlerField | MultiToddler;
    progressBar: ProgressBar;
    valueBanner: ValueBanner
    minMaxField: MinMaxFields;
    valueScale: ValueScale;

    constructor(container: HTMLElement) {
        this.container = container;
        this.container.classList.add('js-slider-container_def')
        this.orientation === 'vertical' && this.container.classList.add('js-slider-container_vertical')
    }
    public sendValueToValueBanner(): void {
        this.sliderType === 'single' ? 
            this.valueBanner.value = this.value :
            this.valueBanner.multiValue = this.multiValue;
    }
    public createBaseSlider(): void {
        this.baseSlider = new DefaultToddlerField(
            getIntervalsNum(this.min, this.max, this.step), this.value, this.orientation);
        this.baseSlider.createField();
        this.baseSlider.createToddler();
        this.baseSlider.initializeEvents();

        this.sliderField = this.baseSlider.sliderField;
        this.toddler = this.baseSlider.toddler;
        
        this.container.appendChild(this.sliderField);
        this.container.appendChild(this.toddler);
        // calc toddler star position
        this.baseSlider.setToddlerStartPosition(getPathFromValue(this.value, 
            this.sliderField, this.orientation, this.min, this.max, this.step));
    }

    public createMultiToddlerSlider(): void {
        //console.log(this.multiValue)
        this.baseSlider = new MultiToddler(this.multiValue, this.orientation,
            getIntervalsNum(this.min, this.max, this.step));
        this.baseSlider.createField();
        this.baseSlider.createToddlers();
        this.baseSlider.initializeEvents();

        this.sliderField = this.baseSlider.sliderField;
        this.toddler1 = this.baseSlider.toddler1;
        this.toddler = this.baseSlider.toddler2;

        this.container.appendChild(this.sliderField);
        this.container.appendChild(this.toddler1);
        this.container.appendChild(this.toddler);
        
        const pathArray = [];
        pathArray.push(getPathFromValue(this.multiValue[0],
            this.sliderField, this.orientation, this.min, this.max, this.step));
        pathArray.push(getPathFromValue(this.multiValue[1],
            this.sliderField, this.orientation, this.min, this.max, this.step));
        
        this.baseSlider.setToddlersStartPositions(pathArray);
    }

    public createProgressBar(): void {
        this.progressBar = new ProgressBar(this.sliderField, this.toddler, this.orientation);
        this.progressBar.createSingleProgressBar();
        if (this.sliderType === 'single') {
            this.progressBar.progressBarSingleChange(getPathFromValue(this.value,
                this.sliderField,  this.orientation, this.min, this.max, this.step));
        }
        if (this.sliderType === 'multi') {
            const pathArray = [];
            pathArray.push(getPathFromValue(this.multiValue[0],
                this.sliderField, this.orientation, this.min, this.max, this.step));
            pathArray.push(getPathFromValue(this.multiValue[1],
                this.sliderField, this.orientation, this.min, this.max, this.step));
            
            this.progressBar.progressBarChangeRange(pathArray);
        }
        
        this.sliderField.appendChild(this.progressBar.progressBar);
    }

    public createBanner(): void {
        this.valueBanner = new ValueBanner(this.value, this.multiValue, this.orientation, this.sliderField,
            this.toddler, this.min, this.max, this.step);

        this.valueBanner.execute();
        
        if (this.sliderType === 'single') {
            this.container.appendChild(this.valueBanner.valueBannerContainer)
        }
        if (this.sliderType === 'multi') {
            this.container.appendChild(this.valueBanner.valueBannerContainer1)
            this.container.appendChild(this.valueBanner.valueBannerContainer2)
        }
        this.valueBanner.setOnPosition(); //method need element in dom to work
        
    }

    public createMinMax(): void {
        this.minMaxField = new MinMaxFields(this.sliderField, this.min, this.max);
        this.minMaxField.createMinField();
        this.minMaxField.createMaxField();
        
        if (this.orientation === 'vertical') {
            this.minMaxField.rotate();
        }
        // append in container
        this.container.appendChild(this.minMaxField.minField);
        this.container.appendChild(this.minMaxField.maxField);
        // change width of field if text width is too big
        this.minMaxField.setMaxFieldWidth();
        this.minMaxField.setMinFieldWidth()
        // put min and max on start position
        this.minMaxField.setMinField(this.orientation);
        this.minMaxField.setMaxField(this.orientation);

        this.minField = this.minMaxField.minField;
        this.maxField = this.minMaxField.maxField;
    }

    public createValueScale(valueMarks:number): void {
        this.valueScale = new ValueScale(this.sliderField, valueMarks);
        
        this.valueScale.createScale();
        this.valueScale.createLineMarks();

        this.scale = this.valueScale.valueScale;
        this.container.appendChild(this.scale);
    }
}

export default MainView;