export default class AudioInput {
  BUFF_SIZE_RENDERER = 16384;
  microphone_stream = null;
  gain_node = null;
  analyser = null;
  script_processor_analysis_node = null;
  analyser = null;
  dataArray = [];

  constructor() {
    this.audioContext = new AudioContext();
    this.start_microphone = this.start_microphone.bind(this);
    this.process_audio_data = this.process_audio_data.bind(this);
  }

  process_audio_data() {
    if (!this.analyser) {
      return;
    }
    this.analyser.getByteTimeDomainData(this.dataArray);
  }

  start_microphone(stream) {
    this.gain_node = this.audioContext.createGain();
    this.microphone_stream = this.audioContext.createMediaStreamSource(stream);
    this.microphone_stream.connect(this.gain_node);
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.smoothingTimeConstant = 0;
    this.analyser.fftSize = 2048;
    this.gain_node.connect(this.analyser);
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

    // --- enable volume control for output speakers
    document.getElementById("volume").addEventListener("change", function () {
      var curr_volume = this.value;
      this.gain_node.gain.value = curr_volume;
      console.log("curr_volume ", curr_volume);
    });
  }
}
