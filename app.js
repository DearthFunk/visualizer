import Animations from "./animations.js";
import AudioInput from "./audio-input.js";

let audio;
let animations = new Animations("animation-canvas");

//bind initialization of the audio to a user action
document.getElementById("audio-input-initializer").onclick =
  initializeAudioInput;

//-------------------------//

async function initializeAudioInput(event) {
  //hide the button
  let elem = event.currentTarget;
  elem.style.display = "none";

  //setup audio
  audio = new AudioInput();
  let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  audio.setup_microphone_stream(stream);

  //start animation drawing which is recursive
  drawAnimation();
}

function drawAnimation() {
  requestAnimationFrame(drawAnimation);
  audio.updateDataArray(animations.current);

  if (audio.dataArray) {
    //TODO: this not data check should not be needed?
    animations.draw(audio.dataArray);
  }
}
