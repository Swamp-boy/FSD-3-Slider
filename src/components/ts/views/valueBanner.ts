class valueBanner {
    
    public min: number;
    public max: number;
    public step: number;
    public value: number;
    public valueBannerContainer: HTMLElement;

    private toddlerWidth: number;
    private sliderFieldWidth: number;

    private valueBanner: HTMLElement;
    private valueBannerArrow: HTMLElement;
    private valueSpan: HTMLElement;
    

    constructor(min: number, max: number, step: number, value: number, sliderFieldWidth: number, toddlerWidth: number) {
        this.min = min;
        this.max = max;
        this.step = step;
        this.value = value;
        this.sliderFieldWidth = sliderFieldWidth;
        this.toddlerWidth = toddlerWidth;
    }

    public work(): void {
        this.createValueWindow();
    }

    public setStartPosition(path: number): void {
        // set banner center over toddler
       const bannerLeft = path - this.valueBanner.offsetWidth / 2 + this.toddlerWidth / 2;
       this.valueBannerContainer.style.left = String(bannerLeft) + 'px';
    }

    public bannerMove(path: number): void {
        // set banner center over toddler
        const bannerLeft = path - this.valueBanner.offsetWidth / 2 + this.toddlerWidth / 2;
        this.valueBannerContainer.style.left = String(bannerLeft) + 'px';
        this.valueSpan.innerHTML = String(this.value);

        this.changeBannerWidth(path); 
    }

    private changeBannerWidth(path: number) {
        // set banner center over toddler
        const bannerLeft = path - this.valueBanner.offsetWidth / 2 + this.toddlerWidth / 2;
        this.valueBannerContainer.style.left = String(bannerLeft) + 'px';
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
            
            this.valueBanner.style.width = String(valueWidth +10) + 'px';

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