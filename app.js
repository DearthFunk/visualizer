import Animations from "./animations.js";
import AudioInput from "./audio-input.js";
import State from "./state.js";

window.onresize = windowResizeEventHandler;
window.onkeydown = windowKeyDownEventHandler;

const canvas = document.getElementById("animation-canvas");
let canvasCtx = canvas.getContext("2d");
/* Used to reset everything on animation change. Prevents the following
 *  - animation 1 sets stroke width to 10
 *  - user changes animation
 *  - animation 2 now renders with stroke width 10
 *  - (when you don't want it too)
 */
canvasCtx.save();
let audio;
let state = new State();
let animations = new Animations();

document.getElementById("audio-input-initializer").onclick =
  initializeAudioInput;

// trigger to set attr's
windowResizeEventHandler();

//-------------------------//

function initializeAudioInput(event) {
  audio = new AudioInput();

  //hide the button
  let elem = event.currentTarget;
  elem.style.display = "none";

  /* TODO
   * in reality.. some animations will not require audio input (ie. ring)
   * so audio input initialization should be animation dependent, that goes for
   * updating the globalCompositeOperation value as well
   */

  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(audio.setup_microphone_stream)
    .then(drawAnimation); //kick off the animation
}

function resetCanvasContext() {
  canvasCtx.restore();
  canvasCtx.save();
}

function windowResizeEventHandler() {
  let canvasWidth = window.innerWidth;
  let canvasHeight = window.innerHeight;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  state.update(canvasWidth, canvasHeight);
}

function windowKeyDownEventHandler(event) {
  switch (event.key) {
    case "ArrowRight":
      resetCanvasContext();
      animations.next();
      break;
    case "ArrowLeft":
      resetCanvasContext();
      animations.previous();
      break;
  }
}

function drawAnimation() {
  requestAnimationFrame(drawAnimation);
  audio.updateDataArray();

  if (audio.dataArray) {
    //TODO: this not data check should not be needed?
    animations.currentAnimation.draw(canvasCtx, state, audio.dataArray);
  }
}
