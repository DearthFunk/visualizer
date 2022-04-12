import Visualizer from "./visualizer.js";

let visualizer = new Visualizer("visualizer-canvas");
let audioInputSelect = document.getElementById("audio-input-select");
setupAudioInputDeviceSelect();

/////////////////////////////////////////////

async function setupAudioInputDeviceSelect() {
  let deviceInfos = await navigator.mediaDevices.enumerateDevices();
  let audioInputs = deviceInfos.filter(
    (device) => device.kind === "audioinput"
  );
  audioInputs.forEach((audioInput) => {
    let selectOption = document.createElement("option");
    selectOption.value = audioInput.deviceId;
    selectOption.text = audioInput.label;
    audioInputSelect.appendChild(selectOption);
  });
  audioInputSelect.onchange = initializeAudioInput;
}

async function initializeAudioInput() {
  let menu = document.getElementById("menu");
  menu.style.display = "none";
  resetWindowStreams();
  const audioSource = audioInputSelect.value;
  let audio = { deviceId: audioSource ? { exact: audioSource } : undefined };
  await visualizer.setupAudio({ audio });

  //start animation drawing which is recursive
  //can be scoped up to intercept animation
  visualizer.drawAnimation();
}

function resetWindowStreams() {
  if (window.stream) {
    window.stream.getTracks().forEach((track) => {
      track.stop();
    });
  }
}
