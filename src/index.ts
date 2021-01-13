import './scss/main.scss';

import BaseView from './components/ts/views/BaseView';
import Model from './components/ts/Model';
import Presenter from './components/ts/Presenter';

const el: HTMLElement = document.getElementById('slider1')!;

const view = new BaseView(el);
const model = new Model({});
const presenter = new Presenter(view, model);

presenter.slider();


