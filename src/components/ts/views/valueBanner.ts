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

    getValueFromPath() {
        
    }

    public setStartPosition(path: number): void {
        const left = path - this.valueBanner.getBoundingClientRect().width / 5;
        this.valueBannerContainer.style.left = String(left) + 'px';
    }

    public bannerMove(path: number): void {
        // 5????? why 5??????
        const left = path - (this.valueBanner.getBoundingClientRect().width / 5);
        this.valueBannerContainer.style.left = String(left) + 'px';
        this.valueSpan.innerHTML = String(this.value);

        this.changeBannerWidth(path); 
    }

    private changeBannerWidth(path: number) {
        const bannerLeft = path - this.valueBanner.offsetWidth / 2 + this.toddlerWidth / 2;
        this.valueBannerContainer.style.left = String(bannerLeft) + 'px';

        const valueWidth = this.valueSpan.offsetWidth;
        console.log('span ' + valueWidth)
        console.log('banner ' + this.valueBanner.offsetWidth)
        if (valueWidth + 15 >= this.valueBanner.offsetWidth) {
            // change banner width if text is too big
            this.valueBanner.style.width = String(valueWidth + 10) + 'px';

            const arrowLeft = (this.valueBanner.offsetWidth / 2) - (this.valueBannerArrow.offsetWidth / 2);
            this.valueBannerArrow.style.left = String(arrowLeft) + 'px';
        }
        
        if ((valueWidth + 20) >= this.valueBanner.offsetWidth && (valueWidth +10) > 35) {
            // change banner width if text is too small
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