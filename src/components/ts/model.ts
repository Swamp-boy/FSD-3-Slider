import Options from './interfaces/Options';

export default class Model {
    private options: Options;

    public min: number;
    public max: number;
    public value: number;
    public multiValue: number[];
    public step: number;

    public orientation: string;

    // elements
    valueScale?: boolean;
    valueBanner?: boolean;
    stepCircles?: boolean;
    multiple?: boolean;
    minMaxFields: boolean;
    progressBar: boolean;



    constructor(options: Options) {
        this.options = options;
    }

    public work(): void {
        this.setMinMaxStep();
        this.setValue();
        this.multipleCheck();
        this.multipleCheck();
        this.minMaxFieldsCheck();
        this.stepCirclesCheck();
        this.valueBannerCheck();
        this.progressBarCheck();
        this.positionCheck();
    }

    private setValue(): void{
        this.value = this.options.value === undefined ? 0 : this.options.value;
    }

    private setMinMaxStep(): void {
        this.min = this.options.min === undefined ? 0 : this.options.min;
        this.max = this.options.max === undefined ? 100 : this.options.max;
        this.step = this.options.step === undefined ? 1 : this.options.step;
    }

    private multipleCheck(): void {
        this.multiple = this.options.multiple === undefined ? false : this.options.multiple;
        this.multiValue = this.options.multiValue === undefined ? [] : this.options.multiValue;
    }

    private valueBannerCheck(): void {
        this.valueBanner = this.options.valueBanner === undefined ? false : this.options.valueBanner;
    }

    private stepCirclesCheck(): void {
        this.stepCircles = this.options.stepCircles === undefined ? false : this.options.stepCircles;
    }

    private minMaxFieldsCheck(): void {
        this.minMaxFields = this.options.minMaxFields === undefined ? false : this.options.minMaxFields;
    }

    private progressBarCheck(): void {
        this.progressBar = this.options.progressBar === undefined ? true : this.options.progressBar;
    }

    private positionCheck(): void {
        this.orientation = this.options.orientation === undefined ? 'horizontal' : this.options.orientation;
    }
}