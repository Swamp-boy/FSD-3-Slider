import './scss/main.scss';

/// <reference path="./../src/components/ts/@types/jquery/jquery.index.d.ts"/>
/// <reference types="jqury" />



import BaseView from './components/ts/views/BaseView';
import Model from './components/ts/Model';
import Presenter from './components/ts/Presenter';

const el: HTMLElement = document.getElementById('slider1')!;


const view = new BaseView(el);
const model = new Model({});
const presenter = new Presenter(view, model);



const input1: HTMLInputElement = document.querySelector('input')!;


(($) => {
    jQuery.fn.slider = () => {
        presenter.slider();
    };
})(jQuery);

$('#slider1').slider();

