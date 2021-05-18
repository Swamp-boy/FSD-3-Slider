import './scss/main.scss';

import Options from './components/ts/interfaces/Options';
import MainView from './components/ts/MainView/MainView';
import Model from './components/ts/Model/Model';
import Presenter from './components/ts/Presenter/Presenter';      

(function ($) {
    jQuery.fn.slider = function (options: Options) {
        /*
        return this.each(function () {
            if (!$.data(this, 'slider')) {
                $.data(this, 'slider');
            }
        });
        */
        
        return this.each(function () {
            const view = new MainView(this);
            const model = new Model(options);
            const presenter = new Presenter(view, model);
            presenter.slider();
        })
        
    };
})(jQuery);

const sl1 = $('#slider1').slider({
    min: 0,
    max: 100,
    step: 15,
    //multiValue: [30, 60],
    value: 0,
    orientation: 'horizontal',
    progressBar: true,
    valueBanner: true,
    minMaxFields: false,
    //valueScale: true,
    //marksNum: 3,
});

const sl2 = $('#slider2').slider({
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    orientation: 'vertical',
    progressBar: true,
    valueBanner: true,
    minMaxFields: true,
});

const sl3 = $('#slider3').slider({
    min: 0,
    max: 100,
    step: 15,
    multiValue: [30, 60],
    orientation: 'horizontal',
    progressBar: true,
    valueBanner: true,
    minMaxFields: true,
});

const sl4 = $('#slider4').slider({
    min: 0,
    max: 100,
    step: 1,
    multiValue: [20, 40],
    orientation: 'horizontal',
    progressBar: true,
    valueBanner: true,
    minMaxFields: true,
});
