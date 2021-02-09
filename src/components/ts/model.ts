import Options from './interfaces/Options';

export default class Model {
    private options: Options;

    public min: number;
    public max: number;
    public value: number;
    public multiValue: number[];
    public step: number;
    public class: string;
    public type: string;
    public multiple: boolean;

    constructor(options: Options) {
        this.options = options;
    }

    public work(): void {
        this.setMinMaxStep();
        this.setValue();
        this.setClass();
        this.multupleCheck();
    }

    private setValue(): void{
        this.value = this.options.value === undefined ? 0 : this.options.value;
    }

    private setMinMaxStep(): void {
        this.min = this.options.min === undefined ? 0 : this.options.min;
        this.max = this.options.max === undefined ? 100 : this.options.max;
        this.step = this.options.step === undefined ? 1 : this.options.step;
    }

    private setClass(): void {
        this.class = 'defaul-slider';
    }
    
    private multupleCheck(): void {
        this.multiple = this.options.multiple === undefined ? false : this.options.multiple;
        this.multiValue = this.options.multiValue === undefined ? [] : this.options.multiValue;
    }
}