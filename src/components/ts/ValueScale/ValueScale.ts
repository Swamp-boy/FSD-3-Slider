import ScaleSettings from '../interfaces/ScaleSettings';

class ValueScale {
    private scaleSettings: ScaleSettings;
    private sliderField: HTMLElement;
    private scaleType: string;
    private separatorsNum: number;
    private separatorsHeight: number;
    private separatorsWidth: number;

    public valueScale: HTMLElement;

    constructor(sliderField: HTMLElement, scaleSettings: ScaleSettings) {
        this.scaleSettings = scaleSettings;
        this.sliderField = sliderField;
    }

    public execute(): void {
        this.checkSetDefaultSettings();
        if (this.scaleType === 'default') {
            this.createScale();
            this.createSeparators();
        }
    }

    public givePath(e: MouseEvent):void {}

    private getPath(e: MouseEvent) {
        this.givePath(e);
    }

    private createScale(): void {
        this.valueScale = document.createElement('div');
        this.valueScale.classList.add('js-default-value-scale');
        this.valueScale.addEventListener('mousedown', this.getPath.bind(this));
    }

    private checkSetDefaultSettings(): void {
        const scaleType = 'default';
        const separatorsNum = 10;
        const separatorsHeight = 8;
        const separatorsWidth = 1;

        this.scaleType = this.scaleSettings.scaleType === undefined ?
            scaleType : this.scaleSettings.scaleType;

        this.separatorsNum = this.scaleSettings.separatorsNum === undefined ?
            separatorsNum : this.scaleSettings.separatorsNum;
        
        this.separatorsHeight = this.scaleSettings.separatorsHeight === undefined ?
            separatorsHeight : this.scaleSettings.separatorsHeight;
    
        this.separatorsWidth = this.scaleSettings.separatorsWidth === undefined ?
            separatorsWidth : this.scaleSettings.separatorsWidth;
    }

    private createSeparators(): void {
        const interval = (this.sliderField.offsetWidth - this.separatorsWidth) / (this.separatorsNum);
        
        for (let i = 0; i <= this.separatorsNum; i++) {
            const separator = document.createElement('div');
            separator.classList.add('js-slider-separator');
            // set width
            separator.style.borderRight = `${this.separatorsWidth}px solid black`;
            // set height
            separator.style.paddingTop = `${this.separatorsHeight}px`;
            separator.style.left = `${i * interval}px`;
            this.valueScale.appendChild(separator);
        }

    }
}

export default ValueScale