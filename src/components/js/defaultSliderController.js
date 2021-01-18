export default class MainController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  initialize() {
    this.view.mouseOnElement = this.mouseOnElement.bind(this);
    this.view.mouseOut = this.mouseOut.bind(this);
  }

  mouseOnElement() {
    const { min } = this.view.slider;
    const { max } = this.view.slider;
    const { value } = this.view.slider;
    // get container with value banner
    const circleContainer = this.view.container.querySelector('.js-circle-container');
    // get banner
    const numCircle = circleContainer.querySelector('.js-num-circle');
    // get arrow
    const numCircleArrow = circleContainer.querySelector('.js-numcircle-arrow');

    // get slider width
    this.inputWidth = this.view.slider.offsetWidth - numCircle.offsetWidth / 2; // REWORK

    const procent = (value - min) / (max - min);

    const leftPush = procent * this.inputWidth - numCircle.offsetWidth / 4; // 7 need to set num field on center
    console.log(numCircle.offsetWidth);
    numCircle.style.left = `${leftPush}px`;
    numCircleArrow.style.left = `${leftPush + numCircle.offsetWidth / 2 - numCircleArrow.offsetWidth / 2}px`;
    circleContainer.style.display = 'block';

    numCircle.innerHTML = Math.round(value);
  }

  mouseOut() {
    // get container with value banner and hide it
    const circleContainer = this.view.container.querySelector('.js-circle-container')
    circleContainer.style.display = 'none';
  }

  slider() {
    this.initialize();
    this.view.render(this.model);
  }
}
