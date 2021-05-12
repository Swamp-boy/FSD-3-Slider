class ValueBanner {
    public min: number;
    public max: number;
    public step: number;
    public value: number;
    public multiValue: number[];
    public orientation: string;
    
    public valueBannerContainer: HTMLElement;
    public valueBannerContainer1: HTMLElement;
    public valueBannerContainer2: HTMLElement;
    private toddler: HTMLElement;
    private sliderField: HTMLElement;

    private valueBanner: HTMLElement;
    private valueBannerArrow: HTMLElement;
    private valueSpan: HTMLElement;

    constructor(value: number, multiValue: number[], orientation: string, sliderField: HTMLElement,
        toddler: HTMLElement, min:number, max:number, step:number) {
        this.value = value;
        this.multiValue = multiValue;
        this.orientation = orientation;

        this.sliderField = sliderField;
        this.toddler = toddler;
        this.min = min;
        this.max = max;
        this.step = step;
    }

    public execute(): void {
        if (this.multiValue !== undefined) {
            this.createFirstValueWindow();
            this.createSecondValueWindow();
        } else {
            this.createValueWindow();
        }
    }

    public setOnPosition(): void {
        if (this.multiValue !== undefined) {
            const pathArray = [this.getPathFromValue(this.multiValue[0]), this.getPathFromValue(this.multiValue[1])];
            if (this.orientation === 'horizontal') {
                this.setStartPositionHorizontalMulti(pathArray);
            }
            if (this.orientation === 'vertical') {
                this.setStartPositionVerticalMulti(pathArray);
            }
        } else {
            if (this.orientation === 'horizontal') {
                this.setStartPositionHorizontal(this.getPathFromValue(this.value));
            }
            if (this.orientation === 'vertical') {
                this.setStartPositionVertical(this.getPathFromValue(this.value));
            }
        }
    }

    

    public bannerMove(path: number): void {
        // set banner center over toddler
        if (this.orientation === 'horizontal') {
            const bannerLeft = path - this.valueBanner.offsetWidth / 2 + this.toddler.offsetWidth / 2;
            this.valueBannerContainer.style.left = String(bannerLeft) + 'px';
        }    
        else {
            const bannerBottom = path + this.toddler.offsetWidth / 2 + this.valueBanner.offsetWidth / 2 - 2;
            this.valueBannerContainer.style.bottom = String(bannerBottom) + 'px';
        }
            
        this.valueSpan.innerHTML = String(this.value);

        this.changeBannerWidth(); 
    }

    private setStartPositionHorizontal(path: number): void {
        // set banner center over toddler
        const bannerLeft = path - this.valueBanner.offsetWidth / 2 + this.toddler.offsetWidth / 2;
        this.valueBannerContainer.style.left = String(bannerLeft) + 'px';
        
        const bannerBottom = Math.max(this.sliderField.offsetHeight, this.toddler.offsetHeight) + this.valueBanner.offsetHeight + 10; //margin for customization;
        this.valueBannerContainer.style.bottom = String(bannerBottom) + 'px';
    }

    private setStartPositionVertical(path: number): void {
        this.valueBannerContainer.classList.add('js-value-banner-container_vertical');
        
        const bannerBottom = path - this.toddler.offsetWidth / 2 + this.valueBanner.offsetWidth / 2;
        
        this.valueBannerContainer.style.bottom = String(bannerBottom) + 'px';

        const bannerRight = Math.max(this.sliderField.offsetWidth, this.toddler.offsetHeight) + this.valueBanner.offsetHeight;
        this.valueBannerContainer.style.right = String(bannerRight) + 'px';
    }

    private setStartPositionHorizontalMulti(path: number[]): void {
        // set banner center over toddler
        const firstBannerLeft = path[0] - this.valueBanner.offsetWidth / 2 + this.toddler.offsetWidth / 2;
        this.valueBannerContainer1.style.left = String(firstBannerLeft) + 'px';

        const secondBannerLeft = path[1] - this.valueBanner.offsetWidth / 2 + this.toddler.offsetWidth / 2;
        this.valueBannerContainer2.style.left = String(secondBannerLeft) + 'px';
        
        const bannerBottom = Math.max(this.sliderField.offsetHeight, this.toddler.offsetHeight) + this.valueBanner.offsetHeight + 10//margin for customization;  
        this.valueBannerContainer1.style.bottom = String(bannerBottom) + 'px';
        this.valueBannerContainer2.style.bottom = String(bannerBottom) + 'px';
    }

    private setStartPositionVerticalMulti(path: number[]): void {
        this.valueBannerContainer.classList.add('js-value-banner-container_vertical');
        this.valueBannerContainer2.classList.add('js-value-banner-container_vertical');
        
        const firstBannerBottom = path[0] + this.toddler.offsetWidth / 2;
        const secondBannerBottom = path[1] + this.toddler.offsetWidth / 2;

        this.valueBannerContainer.style.bottom = String(firstBannerBottom) + 'px';
        this.valueBannerContainer2.style.bottom = String(secondBannerBottom) + 'px';

        const bannerRight = Math.max(this.sliderField.offsetWidth, this.toddler.offsetHeight) + this.valueBanner.offsetHeight - 10//margin for customization;
        this.valueBannerContainer.style.right = String(bannerRight) + 'px';
        this.valueBannerContainer2.style.right = String(bannerRight) + 'px';
    }

    private changeBannerWidth() {
        // get text width
        const valueWidth = this.valueSpan.offsetWidth;
        // change banner width if text is too big
        if (valueWidth + 15 >= this.valueBanner.offsetWidth) {
            this.valueBanner.style.width = String(valueWidth + 10) + 'px';

            const arrowLeft = (this.valueBanner.offsetWidth / 2) - (this.valueBannerArrow.offsetWidth / 2);
            this.valueBannerArrow.style.left = String(arrowLeft) + 'px';
        }
        // change banner width if text is too small
        if ((valueWidth + 20) >= this.valueBanner.offsetWidth && (valueWidth +10) > 35) {
            
            this.valueBanner.style.width = String(valueWidth + 10) + 'px';

            const arrowLeft = (this.valueBanner.offsetWidth / 2) - (this.valueBannerArrow.offsetWidth / 2);
            this.valueBannerArrow.style.left = String(arrowLeft) + 'px';
        } 
    }

    private createValueWindow(): void {
        this.valueBannerContainer = document.createElement('div');
        this.valueBannerContainer.classList.add('js-circle-container');

        this.valueBanner = document.createElement('div');
        this.valueBanner.classList.add('js-num-circle');

        // need create nothing meters element to get text width
        this.valueSpan = document.createElement('span');
        this.valueSpan.innerHTML = String(this.value);
        this.valueBanner.appendChild(this.valueSpan);

        this.valueBannerArrow = document.createElement('div');
        this.valueBannerArrow.classList.add('js-numcircle-arrow');

        this.valueBannerContainer.appendChild(this.valueBanner);
        this.valueBannerContainer.appendChild(this.valueBannerArrow);
    }

    private createFirstValueWindow(): void {
        this.valueBannerContainer1 = document.createElement('div');
        this.valueBannerContainer1.classList.add('js-circle-container');

        this.valueBanner = document.createElement('div');
        this.valueBanner.classList.add('js-num-circle');

        // need create nothing meters element to get text width
        this.valueSpan = document.createElement('span');
        this.valueSpan.innerHTML = String(this.multiValue[0]);
        this.valueBanner.appendChild(this.valueSpan);

        this.valueBannerArrow = document.createElement('div');
        this.valueBannerArrow.classList.add('js-numcircle-arrow');

        this.valueBannerContainer1.appendChild(this.valueBanner);
        this.valueBannerContainer1.appendChild(this.valueBannerArrow);
    }

    private createSecondValueWindow(): void {
        this.valueBannerContainer2 = document.createElement('div');
        this.valueBannerContainer2.classList.add('js-circle-container');

        this.valueBanner = document.createElement('div');
        this.valueBanner.classList.add('js-num-circle');
        // need create nothing meters element to get text width
        this.valueSpan = document.createElement('span');
        this.valueSpan.innerHTML = String(this.multiValue[1]);
        this.valueBanner.appendChild(this.valueSpan);

        this.valueBannerArrow = document.createElement('div');
        this.valueBannerArrow.classList.add('js-numcircle-arrow');

        this.valueBannerContainer2.appendChild(this.valueBanner);
        this.valueBannerContainer2.appendChild(this.valueBannerArrow);
    }

    private getPathFromValue(value: number): number {
        // calc distance from left to value in px
        const fieldWidth = this.orientation === 'horizontal' ?
            this.sliderField.offsetWidth:
            this.sliderField.offsetHeight;
        
        const intervalsNum = this.getIntervalsNum();        
        const percent = value / (this.max - this.min);
        // distance from left to toddler
        const path = percent * fieldWidth; 
        // step in px
        const visualStep = fieldWidth / intervalsNum;
        
        return Math.floor(path / visualStep) * visualStep;
    }

    private getIntervalsNum(): number {
        return (this.max - this.min) / this.step;
    }
}

export default ValueBanner;