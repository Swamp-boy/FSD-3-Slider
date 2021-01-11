/// <reference path="options.d.ts" />

export default class Model {
    min: string;
    max: string;
    value: string;
    step: string;
    class: string;

    constructor(options: options) {
        this.min = String(options.min === undefined ? 0 : options.min);
        this.max = String(options.max === undefined ? 100 : options.max);
        this.step = String(options.step === undefined ? 1 : options.step);
        this.value = String(options.value === undefined ? 0 : options.value);
        this.class = 'defaul-slider';
    }
}