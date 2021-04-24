import Options from './../interfaces/Options';
import DefaultSettings from './../interfaces/DefaultSettigs';

export default class Model {
    private options: Options;
    
    public defaultSet: DefaultSettings;

    public min: number;
    public max: number;
    public value: number;
    public multiValue: number[];
    public step: number;
    // horizontal or vertical slider
    public orientation: string;
    // elements
    public valueBanner?: boolean;
    public minMaxFields: boolean;
    public progressBar: boolean;

    constructor(options: Options) {
        this.options = options;

        this.defaultSet = {
            min: 0,
            max: 100,
            step: 1,
            value: 0,
            multiValue: [],
            valueScale: false,
            valueBanner: false,
            stepCircles: false,
            multiple: false,
            minMaxFields: false,
            progressBar: false,
            orientation: 'horizontal', 
        }
    }

    public execute(): void {
        this.setMinMaxStep();
        this.setValue();
        this.minMaxFieldsCheck();
        this.valueBannerCheck();
        this.progressBarCheck();
        this.positionCheck();
    }

    private setValue(): void{
        if (this.options.multiValue === undefined)
            this.value = this.options.value === undefined ? this.defaultSet.value : this.options.value;
        else {
            
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

    private positionCheck(): void {
        this.orientation = this.options.orientation === undefined ? this.defaultSet.orientation : this.options.orientation;
    }
}