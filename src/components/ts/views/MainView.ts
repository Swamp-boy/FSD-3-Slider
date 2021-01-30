import Model from '../Model';
// Views imports
import DefaultToddlerField from './DefaultToddlerField';

/// <reference path="containerParams.d.ts" />


export default class BaseView {
    container: HTMLElement;

    public min: string;
    public max: string;
    public step: string;
    private value: string;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    setModelParams(model: Model) {
        this.min = model.min;
        this.max = model.max;
        this.value = model.value;
        this.step = model.step;
    }

    createBaseSlider() {
        const baseSlider = new DefaultToddlerField(this.min, this.max, this.step);
        baseSlider.work();
        // append elements
        this.container.appendChild(baseSlider.sliderField);
        this.container.appendChild(baseSlider.toddler);
    }
}