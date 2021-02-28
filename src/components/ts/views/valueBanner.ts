class valueBanner {
    
    public min: number;
    public max: number;
    public step: number;
    public value: number;
    public position: string;
    
    public valueBannerContainer: HTMLElement;
    private toddler: HTMLElement;
    private sliderField: HTMLElement;

    private valueBanner: HTMLElement;
    private valueBannerArrow: HTMLElement;
    private valueSpan: HTMLElement;

    private bannerWidth: number;
    private toddlerWidth: number;
    private fieldWidth: number;
    

    constructor(min: number, max: number, step: number, value: number, position:string, sliderField: HTMLElement, toddler: HTMLElement) {
        this.min = min;
        this.max = max;
        this.step = step;
        this.value = value;
        this.position = position;

        this.sliderField = sliderField;
        this.toddler = toddler;

        this.fieldWidth = this.sliderField.getBoundingClientRect().width;
        this.toddlerWidth = this.toddler.getBoundingClientRect().width;
    }

    public work(): void {
        this.createValueWindow();
    }

    public setStartPositionHorizontal(path: number): void {
        // set banner center over toddler
        const bannerLeft = path - this.valueBanner.offsetWidth / 2 + this.toddlerWidth / 2;
        this.valueBannerContainer.style.left = String(bannerLeft) + 'px';
        
        const bannerBottom = Math.max(this.sliderField.offsetHeight, this.toddler.offsetHeight) + this.valueBanner.offsetHeight + 10;  
        this.valueBannerContainer.style.bottom = String(bannerBottom) + 'px';
        
    }

    public setStartPositionVertical(path: number): void {
        this.valueBannerContainer.classList.add('js-value-banner-container_vertical');
        
        const bannerBottom = path + this.valueBanner.offsetWidth / 2 - this.toddlerWidth / 2;
        this.valueBannerContainer.style.bottom = String(bannerBottom) + 'px';

        const bannerRight = Math.max(this.sliderField.offsetWidth, this.toddler.offsetWidth) + this.valueBanner.offsetHeight  - 14;
        console.log(this.sliderField.offsetWidth)
        this.valueBannerContainer.style.right = String(bannerRight) + 'px';
    }

    public bannerMove(path: number): void {
        // set banner center over toddler
        
        
        if (this.position === 'horizontal') {
            const bannerLeft = path - this.valueBanner.offsetWidth / 2 + this.toddlerWidth / 2;
            this.valueBannerContainer.style.left = String(bannerLeft) + 'px';
        }    
        else {
            const bannerBottom = path /*+ this.valueBanner.offsetWidth / 2 + this.toddlerWidth / 2*/;
            this.valueBannerContainer.style.bottom = String(bannerBottom) + 'px';
        }
            
        this.valueSpan.innerHTML = String(this.value);

        this.changeBannerWidth(path); 
    }

    private changeBannerWidth(path: number) {
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
}

export default valueBanner;