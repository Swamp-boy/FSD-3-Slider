export default class MainView {
  constructor(container) {
    this.container = container;
  }

  createSlider(model) {
    this.slider = document.createElement('input');
    this.slider.type = 'range';
    this.slider.min = model.min;
    this.slider.max = model.max;
    this.slider.step = model.step;
    this.slider.value = model.value;
    this.slider.classList.add(`${model.class}`)

    this.container.appendChild(this.slider);

    this.slider.oninput = this.mouseOnElement;

    this.slider.addEventListener('mouseup', this.mouseOut);
  }

  createNumCircle() {
    // criating bunner with slider value
    // conntainer for banner
    const circleContainer = document.createElement('div');
    circleContainer.classList.add('js-circle-container');
    // banner
    const numCircle = document.createElement('div');
    numCircle.classList.add('js-num-circle');

    const numCircleArrow = document.createElement('div');
    numCircleArrow.classList.add('js-numcircle-arrow');

    this.container.appendChild(circleContainer);
    circleContainer.appendChild(numCircle);
    circleContainer.appendChild(numCircleArrow);
  }

  render(model) {
    this.createNumCircle();
    this.createSlider(model);
  }
}
