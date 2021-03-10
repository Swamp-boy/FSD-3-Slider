import './scss/main.scss';

import Options from './components/ts/interfaces/Options';
import MainView from './components/ts/views/MainView';
import Model from './components/ts/Model';
import Presenter from './components/ts/Presenter';      

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
    value: 41,
    progressBar: true,
    valueBanner: true,
    minMaxFields: false,
});

$('#slider2').slider({
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    orientation: 'vertical',
    progressBar: true,
    valueBanner: true,
    minMaxFields: true,
});


//console.log($('#slider1').slider('min'))