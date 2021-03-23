class MinMaxFields {
    public min: number;
    public max: number;

    public sliderField: HTMLElement;
    public minField: HTMLElement;
    public minSpan: HTMLElement;
    public maxField: HTMLElement;
    public maxSpan: HTMLElement;

    constructor(sliderField: HTMLElement, min: number, max: number) {
        this.sliderField = sliderField;
        this.min = min;
        this.max = max;
    }

    public createMinField(): void {
        this.minField = document.createElement('div');
        this.minField.classList.add('js-slider-min-field');

        this.minSpan = document.createElement('span');
        this.minSpan.innerHTML = String(this.min);

        this.minField.appendChild(this.minSpan);
    }

    public createMaxField():void {
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
            const top = -this.maxField.offsetHeight - 5;
            this.maxField.style.top = String(top) + 'px';
            this.maxField.style.right = '0px';
        } else {
            const right = 5; /* space from field to slider */
            this.maxField.style.right = String(right) + 'px';
            this.maxField.style.top = '9px';
        }
    }

    public setMaxFieldWidth(): void {
        if (this.maxSpan.offsetWidth + 10 > this.maxField.offsetWidth) {
            this.maxField.style.width = String(this.maxField.offsetWidth + 10) + 'px';
        }
        
    }

    public setMinFieldWidth():void {
        if (this.minSpan.offsetWidth + 10 > this.minField.offsetWidth) {
            this.minField.style.width = String(this.minField.offsetWidth + 10) + 'px';
        }
    }

    public rotate(): void {
        this.minField.classList.add('js-slider-min-field_vertical');
        this.maxField.classList.add('js-slider-max-field_vertical');
    }
}

export default MinMaxFields;