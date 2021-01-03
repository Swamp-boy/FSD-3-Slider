export default class MainController {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.i = 0;
  }

  initialize() {
    this.view.mouseOnElement = this.mouseOnElement.bind(this);
    this.view.mouseOut = this.mouseOut.bind(this);
  }

  mouseOnElement() {
    const { min } = this.view.slider;
    const { max } = this.view.slider;
    const { value } = this.view.slider;
    const numCircle = document.querySelector('.js-num-circle');

    this.inputWidth = this.view.slider.offsetWidth - 20;

    const procent = (value - min) / (max - min);
    const leftPush = procent * this.inputWidth - 7; // 7 need to set num field on center

    numCircle.style.left = `${leftPush}px`;
    numCircle.style.display = 'block';
  }

  mouseOut() {
    $('.js-num-circle').hide();
  }

  slider() {
    this.initialize();
    this.view.render(this.model);
  }
}
