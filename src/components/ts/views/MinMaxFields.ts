class MinMaxFields {
    min: number;
    max: number;

    sliderField: HTMLElement;
    minField: HTMLElement;
    minSpan: HTMLElement;
    maxField: HTMLElement;
    maxSpan: HTMLElement;

    constructor(sliderField: HTMLElement, min: number, max: number) {
        this.sliderField = sliderField;
        this.min = min;
        this.max = max;
    }

    public work(): void {
        this.createMinMax();
    }

    public setFieldsWidth(minSpan: HTMLElement, maxSpan: HTMLElement): void {
        if (maxSpan.offsetWidth + 10 > this.maxField.offsetWidth) {
            this.maxField.style.width = String(this.maxField.offsetWidth + 10) + 'px';
        }
        if (minSpan.offsetWidth + 10 > this.minField.offsetWidth) {
            this.minField.style.width = String(this.minField.offsetWidth + 10) + 'px';
        }
    }
    public rotate() {
        this.minField.classList.add('js-slider-min-field_vertical');
        this.maxField.classList.add('js-slider-max-field_vertical');
    }

    private createMinMax() {
        this.minField = document.createElement('div');
        this.minField.classList.add('js-slider-min-field');

        this.minSpan = document.createElement('span');
        this.minSpan.innerHTML = String(this.min);

        this.minField.appendChild(this.minSpan);

        this.maxField = document.createElement('div');
        this.maxField.classList.add('js-slider-max-field');
        
        this.maxSpan = document.createElement('span');
        this.maxSpan.innerHTML = String(this.max);

        this.maxField.appendChild(this.maxSpan);
    }
}

export default MinMaxFields;