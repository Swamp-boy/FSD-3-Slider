import Model from './Model';
import MainView from './views/MainView';
// Patterns
import EventObserver from './ObserverPattern';

export default class Presenter {
    mainView: MainView;
    model: Model;

    pathChangeObserver: EventObserver;

    value: number;

    constructor(view: MainView, model: Model) {
        this.mainView = view;
        this.model = model;
    }

    initialize(): void {
        this.pathChangeObserver = new EventObserver();
        this.pathChangeObserver.subscribe(this.getValueFromPath.bind(this));
        this.pathChangeObserver.subscribe(this.mainView.progressBar.progressBarChange.bind(this.mainView.progressBar));

        this.mainView.baseSlider.givePresenterInfo = this.reactOnPacthChange.bind(this);
    }

    reactOnPacthChange(path: number):void {
        this.pathChangeObserver.broadcast(path);
    }

    getValueFromPath(path: number): void {
        const max = this.model.max;
        const min = this.model.min;
        const width = this.mainView.sliderWidth - (this.mainView.toddler.getBoundingClientRect().width / 2);

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

    slider():void {
        this.model.setMinMaxStep();
        this.setModelParams(this.model);
        this.mainView.createBaseSlider();
        this.mainView.createProgressBar();
        this.initialize();
    }
}