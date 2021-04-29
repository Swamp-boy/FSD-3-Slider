class ValueScale {
    private valueMarks: number;
    private sliderField: HTMLElement;

    public valueScale: HTMLElement;

    constructor(sliderField: HTMLElement, valueMarks: number) {
        this.sliderField = sliderField;
        this.valueMarks = valueMarks;
    }

    public createScale(): void {
        this.valueScale = document.createElement('div');
        this.valueScale.classList.add('default-value-scale');
    }

    public createLineMarks(): void {
        const intervalsBlock = document.createElement('div');
        intervalsBlock.classList.add('slider-line-block')
        const interval = this.sliderField.getBoundingClientRect().width / this.valueMarks;
        
        for (let i = 0; i <= this.valueMarks; i++) {
            const lineMark = document.createElement('div');
            lineMark.classList.add('slider-line-mark');
            if (i === 0) {
                lineMark.style.left = `${i * interval}px`;
            }
            lineMark.style.left = `${i * interval}px`;
            intervalsBlock.appendChild(lineMark);
        }
        this.valueScale.appendChild(intervalsBlock);
    }

    public createValueMarks(): void {

    }
}

export default ValueScale