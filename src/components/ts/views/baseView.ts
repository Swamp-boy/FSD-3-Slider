import Model from '../model';

interface Slider {
    slider: HTMLInputElement;
}

interface SliderParameters extends Slider{
    type: string;
    min: number;
}

export default class baseView {
    container: HTMLElement;
    slider: Slider;
    

    constructor(container: HTMLElement) {
        this.container = container;
    }

    createSlider(model:Model) {
        this.slider = document.createElement('input');
    }
}