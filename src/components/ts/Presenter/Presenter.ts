import Model from './../Model/Model';
import MainView from './../MainView/MainView';
// Patterns
import PathEventObserver from './ObserverPattern';

export default class Presenter {
    public mainView: MainView;
    public model: Model;

    pathChangeObserver: PathEventObserver;

    value: number;

    constructor(view: MainView, model: Model) {
        this.mainView = view;
        this.model = model;
    }

    public initialize(): void {
        this.pathChangeObserver = new PathEventObserver();
        this.bindElementsEvents();
        
    }

    public slider(): void { 
        this.model.execute();
        this.setMinMaxStep(this.model);
        this.setOrientation(this.model);
        this.setValue(this.model)
        this.creteSliderElements();
        this.initialize();
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

    private setValue(model: Model) {
        if (model.multiValue === undefined){
            this.mainView.value = this.floorStep(model.value);    
        }else {
            this.mainView.multiValue = [this.floorStep(model.multiValue[0]),
                                     this.floorStep(model.multiValue[1])];
        }
    }

    private creteSliderElements(): void {
        if (this.model.value !== undefined) this.mainView.createBaseSlider();
        if (this.model.multiValue !== undefined) this.mainView.createMultiToddlerSlider();
        if (this.model.valueBanner === true) this.mainView.createBanner();
        if (this.model.minMaxFields === true) this.mainView.createMinMax();
        if (this.model.progressBar === true) this.mainView.createProgressBar();
    }
    
    private bindElementsEvents(): void {
        this.mainView.baseSlider.givePresenterInfo = this.reactOnPathChange.bind(this);
        this.pathChangeObserver.subscribe(this.setValueFromPath.bind(this));
        
        if (this.mainView.valueBanner !== undefined) {
            // send value to sab view
            this.pathChangeObserver.subscribe(this.mainView.sendValueToElements.bind(this.mainView));

            this.pathChangeObserver.subscribe(this.mainView.valueBanner.bannerMove.bind(this.mainView.valueBanner));
        }
        if (this.mainView.progressBar !== undefined) {
            this.pathChangeObserver.subscribe(this.mainView.progressBar.progressBarSingleChange.bind(this.mainView.progressBar));
        }
    }

    private reactOnPathChange(path: number): void {
        this.pathChangeObserver.broadcast(path);
    }
    
    private setValueFromPath(path: number): void {       
        const max = this.model.max;
        const min = this.model.min;
        // need to stop toddler on half
        
        const width = (this.model.orientation === 'horizontal') ?
            this.mainView.sliderField.offsetWidth - this.mainView.toddler.offsetWidth / 2 :
            this.mainView.sliderField.offsetHeight - this.mainView.toddler.offsetHeight / 2;
            
        // const width = this.model.orientation === 'horizontal' ? this.mainView.sliderField.offsetWidth : this.mainView.sliderField.offsetHeight;

        const value = Math.floor((max - min) * (path / width));
        this.value = value;
        this.model.value = value;
        this.mainView.value = value;
    }
}