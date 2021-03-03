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

    public setFieldsWidth(minSpan: HTMLElement, maxSpan: HTMLElement): void {
        if (maxSpan.offsetWidth + 10 > this.maxField.offsetWidth) {
            this.maxField.style.width = String(this.maxField.offsetWidth + 10) + 'px';
        }
        if (minSpan.offsetWidth + 10 > this.minField.offsetWidth) {
            this.minField.style.width = String(this.minField.offsetWidth + 10) + 'px';
        }
    }
    public rotate(): void {
        this.minField.classList.add('js-slider-min-field_vertical');
        this.maxField.classList.add('js-slider-max-field_vertical');
    }

    public createMinMax():void {
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

    public setMinField(position: string): void {
        if (position === 'horizontal') {
            const top = -this.minField.offsetHeight - 5; /* space from field to slider */
            this.minField.style.top = String(top) + 'px';
            this.minField.style.left = '0px';
        } else {
            const right = 5; /* space from field to slider */
            this.minField.style.right = String(right) + 'px';
            this.minField.style.bottom = '9px';
        }
        
    }

    public setMaxField(position: string): void {
        if (position === 'horizontal') {
            const top = -this.minField.offsetHeight - 5;
            this.maxField.style.top = String(top) + 'px';
            this.maxField.style.right = '0px';
        } else {
            const right = 5; /* space from field to slider */
            this.maxField.style.right = String(right) + 'px';
            this.maxField.style.top = '9px';
        }
    }
}

export default MinMaxFields;