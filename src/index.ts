
import BaseView from './components/ts/views/baseView';
import Model from './components/ts/model';

const el: HTMLElement = document.getElementById('slider1')!;

const view = new BaseView(el);
const model = new Model({});
view.render(model);
