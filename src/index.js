import BaseView from './components/ts/views/BaseView';
import Model from './components/ts/Model';
import Presenter from './components/ts/Presenter';

(function ($) {
  jQuery.fn.slider = function (options) {
    return this.each(function () {
      if (!$.data(this, 'slider')) {
        $.data(this, 'slider', new Presenter(this, options))
      }
    });

    /*
        const htmlel: HTMLElement = this[0];
        console.log(htmlel)
        const view = new BaseView(htmlel);
        const model = new Model({});
        const presenter = new Presenter(view, model);
        presenter.slider();
        */
  };
}(jQuery));

$('#slider1').slider();
