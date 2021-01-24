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

    toddlerPushed: boolean;
    currentPosition: number;

    constructor(view: BaseView, model: Model) {
        this.baseView = view;
        this.model = model;

        this.value = model.value;
        this.min = model.min;
        this.max = model.max;
        this.step = model.step;

        this.currentPosition = Number(model.value);
    }

    mouseDownOnElement(e: MouseEvent) {
        this.toddlerPushed = true;
        const pos1 = e.clientX;
    }

    getToddlerPath(e: MouseEvent) : number {
        const sliderFieldRect = this.baseView.sliderField.getBoundingClientRect();
        const startFieldX = sliderFieldRect.left;
        const toddlerPath = e.pageX - startFieldX - this.toddlerWidth / 2;

        const intervalsNum = (Number(this.model.max) - Number(this.model.min)) / Number(this.model.step);
        const visualStep = sliderFieldRect.width / intervalsNum;
        let pathWithStep = Math.floor(toddlerPath / visualStep) * visualStep;

        if (pathWithStep >= sliderFieldRect.width - this.toddlerWidth / 2)
            pathWithStep = sliderFieldRect.width - this.toddlerWidth / 2;

        if (pathWithStep <= 0)
            pathWithStep = 0;

        return pathWithStep;
    }

    elementDrag(e: MouseEvent) {
        if (this.toddlerPushed) {
            const pathWithStep = this.getToddlerPath(e);
            this.baseView.toddler.style.left = `${pathWithStep}px`;
        }
    }

    mouseOut(e: MouseEvent) {
        this.toddlerPushed = false;
    }

    mouseOutOfField(e: MouseEvent) {
        this.toddlerPushed = false;
    }

    mouseOnField(e: MouseEvent) {
        // get slider fiel left edge
        const pathWithStep = this.getToddlerPath(e);
        this.baseView.toddler.style.left = `${pathWithStep}px`;

        this.toddlerPushed = true;
        this.elementDrag(e);
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
        this.baseView.mouseOnElement = this.mouseDownOnElement.bind(this);
        this.baseView.mouseOut = this.mouseOut.bind(this);
        this.baseView.mouseOnField = this.mouseOnField.bind(this);
        this.baseView.elementDrag = this.elementDrag.bind(this);
    }

}