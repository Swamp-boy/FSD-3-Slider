import Model from '../Model';



export default class BaseView {
    container: HTMLElement;
    slider: HTMLInputElement;
    
    constructor(container: HTMLElement) {
        this.container = container;
    }

    createSlider(model:Model) {
        this.slider = document.createElement('input');
        this.slider.type = 'range';
        this.slider.min = model.min;
        this.slider.max = model.max;
        this.slider.step = model.step;
        this.slider.value = model.value;
        this.slider.classList.add(`${model.class}`);

        this.container.appendChild(this.slider);
    }

    render(model:Model) {
        this.createSlider(model);
    }
}