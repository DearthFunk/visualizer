import Visualizer from "./visualizer.js";

let visualizer = new Visualizer("visualizer-canvas");

//bind initialization of the audio to a user action
document.getElementById("audio-input-initializer").onclick =
  initializeAudioInput;

//-------------------------//

async function initializeAudioInput(event) {
  //hide the button
  let elem = event.currentTarget;
  elem.style.display = "none";

  //setup audio
  await visualizer.setupAudio();

  //start animation drawing which is recursive
  drawAnimation();
}

function drawAnimation() {
  requestAnimationFrame(drawAnimation);
  visualizer.audio.updateDataArray(visualizer.animation);

  if (visualizer.audio.dataArray) {
    //TODO: this not data check should not be needed?
    visualizer.draw(visualizer.audio.dataArray);
  }
}
