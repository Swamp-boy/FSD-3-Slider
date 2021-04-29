import Model from './../Model/Model';
import MainView from './../MainView/MainView';
// Patterns
import ChangePathObs from './changePathObs';
import ChangeRangeObs from './changeRangeObs';

class Presenter {
    public mainView: MainView;
    public model: Model;

    private changePathObs: ChangePathObs;
    private changeRangeObs: ChangeRangeObs;

    public sliderType: string;
    public value: number;
    public  multiValue: number[];

    constructor(view: MainView, model: Model) {
        this.mainView = view;
        this.model = model;   
    }

    public initialize(): void {
        if (this.sliderType === 'single'){
            this.changePathObs = new ChangePathObs();
            this.bindElementsEventsSingleV();
        }
        if (this.sliderType === 'multi') {
            this.changeRangeObs = new ChangeRangeObs();
            this.bindElementsEventsMultiV();
        }
        
    }

    public slider(): void { 
        this.model.execute();
        this.setSliderType();
        this.setMinMaxStep(this.model);
        this.setOrientation(this.model);
        this.valueToView(this.model)
        this.creteSliderElements();
        this.initialize();
    }

    private setSliderType(): void {
        this.sliderType = this.model.sliderType;
        this.mainView.sliderType = this.model.sliderType;
    }

    private floorStep(value: number): number {
        return Math.floor(value / this.model.step) * this.model.step;
    }

    private setMinMaxStep(model: Model) {
        this.mainView.min = model.min;
        this.mainView.max = model.max;
        this.mainView.step = model.step;
    }

    private setOrientation(model: Model) {
        this.mainView.orientation = model.orientation;
    }

    private valueToView(model: Model) {
        if (this.sliderType === 'single'){
            this.mainView.value = this.floorStep(model.value);    
        }
        if (this.sliderType === 'multi') {
            this.mainView.multiValue = [this.floorStep(model.multiValue[0]),
                                     this.floorStep(model.multiValue[1])];
        }
    }

    private creteSliderElements(): void {
        if (this.sliderType === 'single') this.mainView.createBaseSlider();
        if (this.sliderType === 'multi') this.mainView.createMultiToddlerSlider();
        if (this.model.valueBanner === true) this.mainView.createBanner();
        if (this.model.minMaxFields === true) this.mainView.createMinMax();
        if (this.model.progressBar === true) this.mainView.createProgressBar();
        if (this.model.valueScale === true) this.mainView.createValueScale(this.model.marksNum);
        
    }
    
    private bindElementsEventsSingleV(): void {
        this.mainView.baseSlider.givePresenterValue = this.reactOnPathChangeSingleVersion.bind(this);
        // send value to model and view
        this.changePathObs.subscribe(this.setValueToModelViewSingleVersion.bind(this));
        // check and send value to value banner
        if (this.mainView.valueBanner !== undefined) {
            this.changePathObs.subscribe(this.mainView.sendValueToValueBanner.bind(this.mainView));
            this.changePathObs.subscribe(this.mainView.valueBanner.bannerMove.bind(this.mainView.valueBanner));
        }
        // check and send value to progress bar
        if (this.mainView.progressBar !== undefined) {
            this.changePathObs.subscribe(this.mainView.progressBar.progressBarSingleChange.bind(this.mainView.progressBar));
        }
    }

    private bindElementsEventsMultiV(): void {
        this.mainView.baseSlider.givePresenterValue = this.reactOnPathChangeMultiVersion.bind(this);
        // send value to model and view
        this.changeRangeObs.subscribe(this.setValueToModelViewMultiVersion.bind(this));
        
        // TO DO: check and send value to value banner


        // TO DO: check and send value to progress barf
        if (this.mainView.progressBar !== undefined) {
            this.changeRangeObs.subscribe(this.mainView.progressBar.progressBarChangeRange.bind(this.mainView.progressBar));
        }
    }

    private reactOnPathChangeSingleVersion(path: number): void {
        this.changePathObs.broadcast(path);
        
    }

    private reactOnPathChangeMultiVersion(path: number[]): void {
        this.changeRangeObs.broadcast(path);
    }

    private getSingleValueFromPath(path: number): number {
        const fieldWidth = (this.model.orientation === 'horizontal') ?
        this.mainView.sliderField.offsetWidth :
        this.mainView.sliderField.offsetHeight;   
        const percent = path / fieldWidth
        const value = (this.model.max - this.model.min) * percent
        
        return Math.floor(value);
    }

    private getMultiValueFromPath(path: number[]): number[] {
        
        const fieldWidth = (this.model.orientation === 'horizontal') ?
        this.mainView.sliderField.offsetWidth :
        this.mainView.sliderField.offsetHeight;
        
        const percent1 = path[0] / fieldWidth;
        const percent2 = path[1] / fieldWidth;
        const value1 = (this.model.max - this.model.min) * percent1;
        const value2 = (this.model.max - this.model.min) * percent2;
        
        const valueArray = [value1, value2];
        return valueArray;
    }

    private setValueToModelViewMultiVersion(path: number[]): void {
        const value = this.getMultiValueFromPath(path);
        this.multiValue = value;
        this.model.multiValue = value;
        this.mainView.multiValue = value;
    }
    
    private setValueToModelViewSingleVersion(path: number): void {       
        const value = this.getSingleValueFromPath(path);
        this.value = value;
        this.model.value = value;
        this.mainView.value = value;
    }
}

export default Presenter;