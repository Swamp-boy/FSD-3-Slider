import './scss/main.scss';
import MainView from './components/js/defaultSliderView';
import MainModel from './components/js/defaultSliderModel';
import MainController from './components/js/defaultSliderController';

const element = document.querySelector('#slider1');

const view = new MainView(element);
const model = new MainModel({
  min: 0,
  max: 100000,
  step: 0.1,
  value: 0,
});
const controller = new MainController(view, model);

controller.slider();
