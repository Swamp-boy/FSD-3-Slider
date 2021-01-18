import Model from './Model';
import BaseView from './views/baseView';

export default class Presenter {
    baseView: BaseView;
    model: Model;

    toddlerWidth: number;
    sliderWidth: number;

    min: string;
    max: string;
    value: string;
    step: string;

    constructor(view: BaseView, model: Model) {
        this.baseView = view;
        this.model = model;

        this.value = model.value;
        this.min = model.min;
        this.max = model.max;
        this.step = model.step;
    }

    mouseOnElement(e: MouseEvent) {
        
    }
    mouseOut(e: MouseEvent) {
        console.log('out');
    }
    mouseOnField(e: MouseEvent) {
        // get slider fiel left edge
        const sliderFieldRect = this.baseView.sliderField.getBoundingClientRect();
        const startFieldX = sliderFieldRect.left;
        // get toddlerr width and distance from sliders start
        const toddlerWidth = this.baseView.toddler.getBoundingClientRect().width;
        const toddlerPath = e.pageX - startFieldX - this.toddlerWidth / 2;

        this.baseView.toddler.style.left = `${toddlerPath}px`;

        this.setModelValue(toddlerPath);
        this.setViewValue();

        this.mouseOnElement(e);
    }

    setModelValue(toddlerPath: number) {
        const procent =  (toddlerPath + this.toddlerWidth / 2) / this.sliderWidth;

        this.value = String((Number(this.max) - Number(this.min)) * procent + Number(this.min));
        this.model.value = this.value;
    }

    setViewValue() {
        this.baseView.container.setAttribute('value', `${this.model.value}`);
    }

    slider() {
        this.initializeBaseEvents();
        this.baseView.render(this.model);
        // get slider and toddler width
        this.toddlerWidth = this.baseView.toddler.getBoundingClientRect().width;
        this.sliderWidth = this.baseView.sliderField.getBoundingClientRect().width;
    }

    initializeBaseEvents() {
        this.baseView.mouseOnElement = this.mouseOnElement.bind(this);
        this.baseView.mouseOut = this.mouseOut.bind(this);
        this.baseView.mouseOnField = this.mouseOnField.bind(this);
    }

}