import FrequencyScope from "./animations/frequency-scope.js";
import ParticleRing from "./animations/particle-ring.js";
import RedElectricity from "./animations/red-electricity.js";
import LineConnections from "./animations/line-connections.js";
import Ring from "./animations/ring.js";
import Wobble from "./animations/wobble.js";
export default class Animations {
  set = [
    new FrequencyScope(),
    new Ring(),
    new Wobble(),
    new LineConnections(),
    new ParticleRing(),
    new RedElectricity(),
  ];
  currentIndex = 0;

  get currentAnimation() {
    return this.set[this.currentIndex];
  }

  get setLengthOffset() {
    return this.set.length - 1;
  }

  next() {
    this.currentIndex++;
    if (this.currentIndex > this.setLengthOffset) {
      this.currentIndex = 0;
    }
  }

  previous() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.setLengthOffset;
    }
  }
}
