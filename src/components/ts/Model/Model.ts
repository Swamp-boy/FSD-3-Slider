import Options from './../interfaces/Options';
import DefaultSettings from './../interfaces/DefaultSettigs';

export default class Model {
    private options: Options;
    
    public defaultSet: DefaultSettings;

    public sliderType: string;

    public min: number;
    public max: number;
    public value: number;
    public multiValue: number[];
    public step: number;
    public marksNum: number;
    // horizontal or vertical slider
    public orientation: string;
    // elements
    public valueBanner?: boolean;
    public minMaxFields: boolean;
    public progressBar: boolean;
    public valueScale: boolean;

    constructor(options: Options) {
        this.options = options;

        this.defaultSet = {
            sliderType: 'single',
            min: 0,
            max: 100,
            step: 1,
            value: 0,
            multiValue: [],
            valueScale: false,
            
            marksNum:  this.getMarksNum(),
            valueBanner: false,
            stepCircles: false,
            multiple: false,
            minMaxFields: false,
            progressBar: false,
            orientation: 'horizontal', 
        }
    }

    public execute(): void {
        this.setValue();
        this.setMinMaxStep();
        this.minMaxFieldsCheck();
        this.valueBannerCheck();
        this.progressBarCheck();
        this.orientationCheck();
        this.valueScaleCheck();
    }
    // TO DO: change all if bla === undef on obj.hasOwnProperty('prop') 
    private setValue(): void{
        if (this.options.multiValue === undefined){
            this.sliderType = this.defaultSet.sliderType;
            this.value = this.options.value === undefined ? this.defaultSet.value : this.options.value;
        }    
        else {
            this.sliderType = 'multi';
            this.multiValue = this.options.multiValue;
        }
    }

    private setMinMaxStep(): void {
        this.min = this.options.min === undefined ? this.defaultSet.min : this.options.min;
        this.max = this.options.max === undefined ? this.defaultSet.max : this.options.max;
        this.step = this.options.step === undefined ? this.defaultSet.step : this.options.step;
    }

    private valueBannerCheck(): void {
        this.valueBanner = this.options.valueBanner === undefined ? this.defaultSet.valueBanner : this.options.valueBanner;
    }

    private minMaxFieldsCheck(): void {
        this.minMaxFields = this.options.minMaxFields === undefined ? this.defaultSet.minMaxFields : this.options.minMaxFields;
    }

    private progressBarCheck(): void {
        this.progressBar = this.options.progressBar === undefined ? this.defaultSet.progressBar : this.options.progressBar;
    }

    private valueScaleCheck(): void{
        this.valueScale = this.options.valueScale === undefined ? this.defaultSet.valueScale : this.options.valueScale;
        this.marksNum = this.options.marksNum === undefined ? (Math.round((this.max - this.min) / 10)) : this.options.marksNum;
    }

    private orientationCheck(): void {
        this.orientation = this.options.orientation === undefined ? this.defaultSet.orientation : this.options.orientation;
    }

    private getMarksNum(): number {
        return Math.round((this.max - this.min) / 10)
    }
    
}