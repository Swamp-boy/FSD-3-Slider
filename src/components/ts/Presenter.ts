import Model from './Model';
import MainView from './views/MainView';

export default class Presenter {
    mainView: MainView;
    model: Model;

    value: number;

    constructor(view: MainView, model: Model) {
        this.mainView = view;
        this.model = model;
    }


    initialize():void {
        this.mainView.baseSlider.givePresenterInfo = this.getViewPath.bind(this);
    }

    getViewPath(e: MouseEvent): string {
        const path = this.mainView.baseSlider.getValueFromPath(e);
        const value = this.calcValue(path);
        return value
    }

    calcValue(path: number): string {
        const max = this.model.max;
        const min = this.model.min;
        const width = this.mainView.sliderWidth;

        const value = String(Math.floor((max - min) * (path / width)));

        return value;
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