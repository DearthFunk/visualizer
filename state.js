export default class State {
  xCenter = 0;
  ycenter = 0;
  w = 0;
  h = 0;
  padding = 200;

  update(w, h) {
    this.w = w;
    this.h = h;
    this.xCenter = w / 2;
    this.yCenter = h / 2;
    this.mainRadius = Math.min(w, h) - this.padding * 2;
  }
}
