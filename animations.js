import FrequencyScope from "./animations/frequency-scope.js";
import Ring from "./animations/ring.js";

export default class Animations {
  set = [new Ring(), new FrequencyScope()];
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
