import FrequencyScope from "./animations/frequency-scope.js";
import ParticleRing from "./animations/particle-ring.js";
import RedElectricity from "./animations/red-electricity.js";
import LineConnections from "./animations/line-connections.js";
import Ring from "./animations/ring.js";
import Wobble from "./animations/wobble.js";

export default class Animations {
  canvasPadding = 200;

  _currentIndex = 0;
  _animations = [
    new FrequencyScope(),
    new Ring(),
    new Wobble(),
    new LineConnections(),
    new ParticleRing(),
    new RedElectricity(),
  ];

  constructor(elementID) {
    this.canvas = document.getElementById(elementID);
    this.canvasCtx = this.canvas.getContext("2d");
    window.onresize = this._windowResizeEventHandler.bind(this);
    window.onkeydown = this._windowKeyDownEventHandler.bind(this);
    this._windowResizeEventHandler();

    /* Used to reset everything on animation change. Prevents the following
     *  - animation 1 sets stroke width to 10
     *  - user changes to animation 2, which now renders with stroke width 10
     *  - works in conjunction with _resetCanvasContext
     */
    this.canvasCtx.save();
  }

  _resetCanvasContext() {
    this.canvasCtx.restore();
    this.canvasCtx.save();
  }

  _windowResizeEventHandler() {
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    //set props on canvas state to prevent calculations being done in animation request
    this.canvas.xCenter = canvasWidth / 2;
    this.canvas.yCenter = canvasHeight / 2;
    this.canvas.mainRadius =
      Math.min(canvasWidth, canvasHeight) - this.canvasPadding * 2;
  }

  _windowKeyDownEventHandler(event) {
    switch (event.key) {
      case "ArrowRight":
        this._resetCanvasContext();
        this.next();
        break;
      case "ArrowLeft":
        this._resetCanvasContext();
        this.previous();
        break;
    }
  }

  get current() {
    return this._animations[this._currentIndex];
  }

  next() {
    this._currentIndex = (this._currentIndex + 1) % this._animations.length;
  }

  previous() {
    this._currentIndex =
      (this._currentIndex + this._animations.length - 1) %
      this._animations.length;
  }

  draw(audioData) {
    this.current.draw(this.canvasCtx, audioData);
  }
}
