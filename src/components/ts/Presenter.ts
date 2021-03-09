import Model from './Model';
import MainView from './views/MainView';
// Patterns
import PathEventObserver from './ObserverPattern';

export default class Presenter {
    mainView: MainView;
    model: Model;

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

    public setModelParams(model: Model): void {
        this.mainView.min = model.min;
        this.mainView.max = model.max;
        this.mainView.value = model.value;
        this.mainView.step = model.step;
        this.mainView.orientation = model.orientation;
    }

    public slider(): void { 
        this.model.work();
        this.setModelParams(this.model);
        this.checkModel();
        this.initialize();
    }

    private checkModel() {
        this.mainView.createBaseSlider();
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


        const value = Math.floor((max - min) * (path / width));
        this.value = value;
        this.model.value = value;
        this.mainView.value = value;
    }
}