/// <reference path="options.d.ts" />

export default class Model {
    min: number;
    max: number;
    value: number;
    step: number;
    class: string;

    constructor(options: options) {
        this.min = options.min === undefined ? 0 : options.min;
        this.max = options.max === undefined ? 100 : options.max;
        this.step = options.step === undefined ? 1 : options.step;
        this.value = options.value === undefined ? 0 : options.value;
        this.class = 'defaul-slider';
    }
}