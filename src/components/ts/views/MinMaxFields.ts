class MinMaxFields {
    min: number;
    max: number;

    sliderField: HTMLElement;
    minField: HTMLElement;
    maxField: HTMLElement;

    constructor(sliderField: HTMLElement, min: number, max: number) {
        this.sliderField = sliderField;
        this.min = min;
        this.max = max;
    }

    public work(): void {
        this.createMinMax();
    }

    private createMinMax() {
        this.minField = document.createElement('div');
        this.minField.classList.add('js-slider-min-field');
        this.minField.innerHTML = String(this.min);

        this.maxField = document.createElement('div');
        this.maxField.classList.add('js-slider-max-field');
        this.maxField.innerHTML = String(this.max);
    }
}

export default MinMaxFields;