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
        // const htmlel: HTMLElement = this[0];
        const view = new MainView(this[0]);
        const model = new Model(options);
        const presenter = new Presenter(view, model);
        presenter.slider();
        
    };
})(jQuery);

$('#slider1').slider(
    {
    min: 0,
    max: 100000,
    step: 1,
    value: 0,
    progressBar: true,
    valueBanner: true,
});

$('#slider2').slider({
    position: 'vertical',
});





