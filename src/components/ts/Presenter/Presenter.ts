import Model from './../Model/Model';
import MainView from './../MainView/MainView';
// Patterns
import ChangePathObs from './changePathObs';
import ChangeRangeObs from './changeRangeObs';

import { getValueFromPath, getValueFromPathMultiVersion } from './../CalculateFunctions';

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
        if (this.model.valueScale === true) this.mainView.createValueScale(this.model.scaleSettings);
        
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
        if (this.mainView.valueBanner !== undefined) {
            this.changeRangeObs.subscribe(this.mainView.sendValueToValueBanner.bind(this.mainView));
            this.changeRangeObs.subscribe(this.mainView.moveBannerMulti.bind(this.mainView));
        }
        
        // TO DO: check and send value to progress bar
        if (this.mainView.progressBar !== undefined) {
            this.changeRangeObs.subscribe(this.mainView.moveProgressBarMulti.bind(this.mainView));
        }
    }

    private reactOnPathChangeSingleVersion(path: number): void {
        this.changePathObs.broadcast(path);
        
    }

    private reactOnPathChangeMultiVersion(path: number[]): void {
        this.changeRangeObs.broadcast(path);
    }

    private setValueToModelViewMultiVersion(path: number[]): void {
        const value = getValueFromPathMultiVersion(path, this.mainView.sliderField, this.mainView.toddler,
            this.model.orientation, this.model.min, this.model.max);
        
        this.multiValue = value;
        this.model.multiValue = value;
        this.mainView.multiValue = value;
    }
    
    private setValueToModelViewSingleVersion(path: number): void {       
        const value = getValueFromPath(path, this.mainView.sliderField, this.mainView.toddler,
            this.model.orientation, this.model.min, this.model.max);
        
        this.value = value;
        this.model.value = value;
        this.mainView.value = value;
    }
}

export default Presenter;