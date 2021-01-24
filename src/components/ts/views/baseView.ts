import Model from '../Model';
/// <reference path="containerParams.d.ts" />


export default class BaseView {
    container: HTMLElement;
    sliderField: HTMLElement;
    toddler: HTMLElement;
    min: string;
    max: string;
    value: string;
    step: string;

    slider: HTMLInputElement;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    mouseOnElement(e: MouseEvent) {}

    mouseOut(e: MouseEvent) {}

    mouseOnField(e: MouseEvent) { }

    elementDrag(e: MouseEvent) { }

    createBaseSlider(model:Model) {
        this.sliderField = document.createElement('div');
        this.sliderField.classList.add('slider-field');
        this.container.appendChild(this.sliderField);

        this.toddler = document.createElement('div');
        this.toddler.classList.add('slider-toddler');
        this.container.appendChild(this.toddler);

        this.container.setAttribute('value', `${model.value}`);
        this.container.setAttribute('min', `${model.min}`);
        this.container.setAttribute('max', `${model.max}`);
        this.container.setAttribute('step', `${model.step}`);

        this.toddler.addEventListener('mousedown', this.mouseOnElement);
        this.toddler.addEventListener('mouseup', this.mouseOut);
        this.sliderField.addEventListener('mousedown', this.mouseOnField);
        // this.sliderField.addEventListener('mousemove', this.elementDrag);
        document.addEventListener('mouseup', this.mouseOut);
        document.addEventListener('mousemove', this.elementDrag);
    }

    render(model:Model) {
        this.createBaseSlider(model);
    }
}