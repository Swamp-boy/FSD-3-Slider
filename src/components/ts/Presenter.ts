import Model from './Model';
import BaseView from './views/MainView';

export default class Presenter {
    baseView: BaseView;
    model: Model;

    constructor(view: BaseView, model: Model) {
        this.baseView = view;
        this.model = model;
    }

    /*
    initialize() {
        this.baseView.PresenterEvent = this.PresenterEvent.bind(this);
    }

    PresenterEvent() {
    }
    */
    slider() {
        this.model.setMinMaxStep();
        this.baseView.setModelParams(this.model);
        this.baseView.createBaseSlider();
    }
}