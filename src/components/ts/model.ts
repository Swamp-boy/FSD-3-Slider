/// <reference path="Options.d.ts" />

export default class Model {
    options: options;

    min: string;
    max: string;
    value: string;
    step: string;
    class: string;
    type: string;

    constructor(options: options) {
        this.options = options;

        this.value = String(options.value === undefined ? 0 : options.value);
        this.type = options.type === undefined ? 'base' : options.type;
    }

    setMinMaxStep() {
        this.min = String(this.options.min === undefined ? 0 : this.options.min);
        this.max = String(this.options.max === undefined ? 100 : this.options.max);
        this.step = String(this.options.step === undefined ? 1 : this.options.step);
    }

    setClass() {
        this.class = 'defaul-slider';
    }
    
}