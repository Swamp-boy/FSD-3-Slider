import Model from './Model';
import BaseView from './views/baseView';

export default class Presenter {
    baseView: BaseView;
    model: Model;

    constructor(view: BaseView, model: Model) {
        this.baseView = view;
        this.model = model;
    }

    slider() {
        this.baseView.render(this.model)
    }

}