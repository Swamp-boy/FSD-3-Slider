import Model from '../Model';
// Views imports
import DefaultToddlerField from './DefaultToddlerField';
import ProgressBar from './ProgressBar';

import './../interfaces/containerParams';

export default class BaseView {
    container: HTMLElement;

    public min: string;
    public max: string;
    public step: string;
    private value: string;

    public sliderWidth: number;

    //slider elements
    slederField: HTMLElement;
    toddler: HTMLElement;

    // Sub views
    baseSlider: DefaultToddlerField;
    progressBar: ProgressBar;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    setModelParams(model: Model): void {
        this.min = model.min;
        this.max = model.max;
        this.value = model.value;
        this.step = model.step;
    }

    getElements(field?: HTMLElement, toddler?: HTMLElement):void {
        this.slederField = field!;
        this.toddler = toddler!;
    }

    createBaseSlider(): void {
        this.baseSlider = new DefaultToddlerField(this.min, this.max, this.step);
        this.baseSlider.work();
        this.getElements(this.baseSlider.sliderField, this.baseSlider.toddler);
        // append elements
        this.container.appendChild(this.slederField);
        this.container.appendChild(this.toddler);
        // for this slider type range is
        this.sliderWidth = this.baseSlider.sliderField.getBoundingClientRect().width;
    }

    createProgressBar(): void {
        this.progressBar = new ProgressBar(this.slederField);
        this.progressBar.createProgressBar();
        this.slederField.appendChild(this.progressBar.progressBar);
    }
}