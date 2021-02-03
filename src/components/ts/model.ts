import './interfaces/Options';

export default class Model {
    options: options;

    min: number;
    max: number;
    value: number;
    step: number;
    class: string;
    type: string;

    constructor(options: options) {
        this.options = options;

        this.value = options.value === undefined ? 0 : options.value;
        this.type = options.type === undefined ? 'base' : options.type;
    }

    setMinMaxStep(): void {
        this.min = this.options.min === undefined ? 0 : this.options.min;
        this.max = this.options.max === undefined ? 100 : this.options.max;
        this.step = this.options.step === undefined ? 1 : this.options.step;
    }

    setClass(): void {
        this.class = 'defaul-slider';
    }
    
}