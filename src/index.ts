import './scss/main.scss';

import Options from './components/ts/interfaces/Options';
import MainView from './components/ts/MainView/MainView';
import Model from './components/ts/Model/Model';
import Presenter from './components/ts/Presenter/Presenter';      

(function ($) {
    /*
    const methods = {
        slider: function (options: Options) {
            return this.each(function () {
                const view = new MainView(this);
                const model = new Model(options);
                const presenter = new Presenter(view, model);
                presenter.slider();
               
            })
        },
        
    }
    jQuery.fn.slider = function (method) {

    }
    */
    
    jQuery.fn.slider = function (options: Options) {
        return this.each(function () {
            const view = new MainView(this);
            const model = new Model(options);
            const presenter = new Presenter(view, model);
            presenter.slider();
            
        })
    }

    jQuery.fn.destroySlider = function () {
        return this.get(0).innerHTML = '';
    }

    jQuery.fn.sliderVal = function () {
        return Number(this.children('.js-slider-value-container').val())
    }
})(jQuery);

$('#slider1').slider({
    min: 0,
    max: 100,
    step: 10,
    multiValue: [30, 60],
    //value: 50,
    orientation: 'horizontal',
    progressBar: true,
    valueBanner: true,
    minMaxFields: false,
    valueScale: true,
    /*
    scaleSettings: {
        separatorsHeight: 20,
        separatorsWidth: 5,
        separatorsNum: 3,
    }
    */
    
});
console.log($('#slider1').sliderVal());



// ================================================================================
//$('#slider1 input').on('change', console.log($('#slider1 input').val()))


/*
const sl2 = $('#slider2').slider({
    min: 0,
    max: 100000,
    step: 1,
    value: 50,
    //multiValue: [30, 60],
    orientation: 'vertical',
    progressBar: true,
    valueBanner: true,
    //minMaxFields: true,
});

const sl3 = $('#slider3').slider({
    min: 0,
    max: 100,
    step: 15,
    multiValue: [45, 100],
    orientation: 'horizontal',
    progressBar: false,
    valueBanner: true,
    minMaxFields: true,
});

const sl4 = $('#slider4').slider({
    min: 0,
    max: 100,
    step: 1,
    multiValue: [0, 50],
    orientation: 'vertical',
    progressBar: true,
    valueBanner: true,
    minMaxFields: true,
});
*/