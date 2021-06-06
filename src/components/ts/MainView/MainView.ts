// Views imports
import DefaultToddlerField from './../DefaultToddlerField/DefaultToddlerField';
import MultiToddler from '../MultiToddler/MultiToddler';
import ProgressBar from './../ProgressBar/ProgressBar';
import ValueBanner from './../ValueBanner/ValueBanner';
import MinMaxFields from './../MinMaxFields/MinMaxFields';
import ValueScale from './../ValueScale/ValueScale';

import { getPathFromValue, getIntervalsNum } from './../CalculateFunctions';

import ScaleSettings from './../interfaces/ScaleSettings';

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
    public sliderField: HTMLElement;
    public toddler: HTMLElement;
    //if multi toddlers
    public toddler1: HTMLElement;
    public toddler2: HTMLElement;
    public bar: HTMLElement;
    public banner: HTMLElement;
    public minField: HTMLElement;
    public maxField: HTMLElement;
    public scale: HTMLElement;

    // Sub views
    public baseSlider: DefaultToddlerField | MultiToddler;
    public progressBar: ProgressBar;
    public valueBanner: ValueBanner
    public minMaxField: MinMaxFields;
    public valueScale: ValueScale;

    //
    public valueInput: HTMLInputElement;

    constructor(container: HTMLElement) {
        this.container = container;
        this.container.classList.add('js-container-clear');
        this.container.classList.add('js-slider-container_def');
        this.orientation === 'vertical' && this.container.classList.add('js-slider-container_vertical');

        this.initInputField();
    }
    public sendValueToValueBanner(): void {
        this.sliderType === 'single' ? 
            this.valueBanner.value = this.value :
            this.valueBanner.multiValue = this.multiValue;
    }
    public createBaseSlider(): void {
        this.baseSlider = new DefaultToddlerField(this.min, this.max, this.step, this.orientation);
        this.baseSlider.createField();
        this.baseSlider.createToddler();
        this.baseSlider.initializeEvents();

        this.sliderField = this.baseSlider.sliderField;
        this.toddler = this.baseSlider.toddler;
        
        this.container.appendChild(this.sliderField);
        this.container.appendChild(this.toddler);
        // calc toddler star position
        this.baseSlider.setToddlerStartPosition(getPathFromValue(this.value, 
            this.sliderField, this.toddler, this.orientation, this.min, this.max, this.step));
    }

    public createMultiToddlerSlider(): void {
        this.baseSlider = new MultiToddler(this.orientation, this.min, this.max, this.step);
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
            this.sliderField, this.toddler, this.orientation, this.min, this.max, this.step));
        pathArray.push(getPathFromValue(this.multiValue[1],
            this.sliderField, this.toddler, this.orientation, this.min, this.max, this.step));
        
        this.baseSlider.setToddlersStartPositions(pathArray);
    }

    public createProgressBar(): void {
        this.progressBar = new ProgressBar(this.sliderField, this.toddler, this.orientation);
        this.progressBar.createSingleProgressBar();

        if (this.sliderType === 'single') {
            const path = getPathFromValue(this.value,
                this.sliderField, this.toddler, this.orientation, this.min, this.max, this.step) - this.toddler.offsetWidth / 2;
            this.progressBar.progressBarSingleChange(path);
        }
        if (this.sliderType === 'multi') {
            const pathArray = [];
            pathArray.push(getPathFromValue(this.multiValue[0],
                this.sliderField, this.toddler, this.orientation, this.min, this.max, this.step) - this.toddler.offsetWidth);
            pathArray.push(getPathFromValue(this.multiValue[1],
                this.sliderField, this.toddler, this.orientation, this.min, this.max, this.step) - this.toddler.offsetWidth);
            
            this.progressBar.setRangeProgressBar(pathArray);
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

    public createValueScale(scaleSettings:ScaleSettings): void {
        this.valueScale = new ValueScale(this.sliderField, scaleSettings);
        this.valueScale.execute();
        this.scale = this.valueScale.valueScale;
        this.container.appendChild(this.scale);
        // binding slider move on scale click
        
        this.valueScale.givePath = this.baseSlider.getPathAndMoveToddler.bind(this.baseSlider);
    }

    public moveBannerMulti(path: number[]): void {
        if (this.baseSlider instanceof MultiToddler) {
            if (this.baseSlider.firstToddlerPushed === true) {
                this.valueBanner.moveFirstBanner(path[0]);
            }
            if (this.baseSlider.lastToddlerPushed === true) {
                this.valueBanner.moveSecondBanner(path[1]);
            }
        }
    }

    public moveProgressBarMulti(path: number[]): void {
        if (this.baseSlider instanceof MultiToddler) {
            if (this.baseSlider.firstToddlerPushed === true) {
                this.progressBar.progressBarChangeLeft(path[0]);
            }
            if (this.baseSlider.lastToddlerPushed === true) {
                this.progressBar.progressBarChangeRight(path[1]);
            }
        }
    }
    
    private initInputField() {
        this.valueInput = document.createElement('input');
        this.valueInput.type = 'hidden';
        this.valueInput.classList.add('js-slider-value-container');
        this.container.appendChild(this.valueInput);
    }    
}

export default MainView;