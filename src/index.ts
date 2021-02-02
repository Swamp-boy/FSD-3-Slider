import './scss/main.scss';

/// <reference path="jquery.index.d.ts"/>
/// <reference path="./components/ts/Options.d.ts"/>

import BaseView from './components/ts/views/MainView';
import Model from './components/ts/Model';
import Presenter from './components/ts/Presenter';

(function ($) {
    jQuery.fn.slider = function () {
        /*
        return this.each(function () {
            if (!$.data(this, 'slider')) {
                $.data(this, 'slider');
            }
        });
        */
        // const htmlel: HTMLElement = this[0];

        const view = new BaseView(this[0]);
        const model = new Model({});
        const presenter = new Presenter(view, model);
        presenter.slider();
    };
})(jQuery);

$('#slider1').slider();

