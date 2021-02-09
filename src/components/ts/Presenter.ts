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

    initialize(): void {
        this.pathChangeObserver = new PathEventObserver();
        this.checkSliderElements();
        this.pathChangeObserver.subscribe(this.getValueFromPath.bind(this));
        
        this.mainView.baseSlider.givePresenterInfo = this.reactOnPacthChange.bind(this);
    }

    private checkSliderElements(): void {
        if (this.mainView.valueBanner !== undefined) {
            this.pathChangeObserver.subscribe(this.mainView.valueBanner.bannerMove.bind(this.mainView.valueBanner));
            // send value to sabview
            this.pathChangeObserver.subscribe(this.mainView.sendValueToElements.bind(this.mainView));
        }

        if (this.mainView.progressBar !== undefined) {
            this.pathChangeObserver.subscribe(this.mainView.progressBar.progressBarSingleChange.bind(this.mainView.progressBar));
        }
    }

    reactOnPacthChange(path: number):void {
        this.pathChangeObserver.broadcast(path);
    }

    getValueFromPath(path: number): void {
        const max = this.model.max;
        const min = this.model.min;
        // need to stop toddler on half
        const width = this.mainView.sliderWidth - this.mainView.toddler.offsetWidth / 2;

        const value = Math.floor((max - min) * (path / width));
        this.value = value;
        this.model.value = value;
        this.mainView.value = value;
    }
    
    setModelParams(model: Model): void {
        this.mainView.min = model.min;
        this.mainView.max = model.max;
        this.mainView.value = model.value;
        this.mainView.step = model.step;
    }

    slider(): void {
        this.model.work();
        this.setModelParams(this.model);
        this.mainView.createBaseSlider();
        this.mainView.createProgressBar();
        this.mainView.createBanner();
        // this.mainView.createMinMax();
        this.initialize();
    }
}