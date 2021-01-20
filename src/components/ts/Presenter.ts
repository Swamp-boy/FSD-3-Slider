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

    constructor(view: BaseView, model: Model) {
        this.baseView = view;
        this.model = model;

        this.value = model.value;
        this.min = model.min;
        this.max = model.max;
        this.step = model.step;
    }

    mouseDownOnElement(e: MouseEvent) {
        this.toddlerPushed = true;
        const pos1 = e.clientX;

        

    }

    elementDrag(e: MouseEvent) {
        if (this.toddlerPushed) {
            const mousePos = e.clientX - this.baseView.sliderField.getBoundingClientRect().left - this.toddlerWidth / 2;
            this.baseView.toddler.style.left = `${mousePos}px`;
        }
    }

    mouseOut(e: MouseEvent) {
        this.toddlerPushed = false;
        console.log('out');
    }

    mouseOutOfField(e: MouseEvent) {
        this.toddlerPushed = false;
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

        this.mouseDownOnElement(e);
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