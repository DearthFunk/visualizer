import Visualizer from "./visualizer.js";

let visualizer = new Visualizer("visualizer-canvas");

//bind initialization of the audio to a user action
document.getElementById("audio-input-initializer").onclick =
  initializeAudioInput;

async function initializeAudioInput({ currentTarget }) {
  currentTarget.style.display = "none";
  await visualizer.setupAudio();

  //start animation drawing which is recursive
  //can be scoped up to intercept animation
  visualizer.drawAnimation();
}
