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
    const numCircle = document.createElement('div');
    numCircle.classList.add('js-num-circle');
    this.container.appendChild(numCircle)
  }

  render(model) {
    this.createNumCircle();
    this.createSlider(model);
  }
}
