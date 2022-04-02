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
    this.setup_microphone_stream = this.setup_microphone_stream.bind(this);
  }

  updateDataArray({ analyserFunction = "getByteTimeDomainData" }) {
    //TODO: no string ref, set function ref on animation change
    this.analyser[analyserFunction](this.dataArray);
  }

  setup_microphone_stream(stream) {
    this.gain_node = this.audioContext.createGain();
    this.microphone_stream = this.audioContext.createMediaStreamSource(stream);
    this.microphone_stream.connect(this.gain_node);
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.smoothingTimeConstant = 0;
    this.analyser.fftSize = 2048;
    this.gain_node.connect(this.analyser);
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
  }
}
