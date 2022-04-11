import Animations from "./animations.js";
import AudioInput from "./audio-input.js";

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
let animations = new Animations("animation-canvas");

//bind initialization of the audio to a user action
document.getElementById("audio-input-initializer").onclick =
  initializeAudioInput;

//-------------------------//

async function initializeAudioInput(event) {
  audio = new AudioInput();
  //hide the button
  let elem = event.currentTarget;
  elem.style.display = "none";

  /* TODO
   * in reality.. some animations will not require audio input (ie. ring)
   * so audio input initialization should be animation dependent, that goes for
   * updating the globalCompositeOperation value as well
   */

  // trigger to set attr's
  animations.windowResizeEventHandler();

  let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  audio.setup_microphone_stream(stream);
  //start animation draw which is recursive
  drawAnimation();
}

function drawAnimation() {
  requestAnimationFrame(drawAnimation);
  audio.updateDataArray(animations.current);

  if (audio.dataArray) {
    //TODO: this not data check should not be needed?
    animations.current.draw(canvasCtx, audio.dataArray);
  }
}
