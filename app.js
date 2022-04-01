import Ring from "./animations/ring.service.js";
import State from "./state.js";

window.addEventListener("resize", Resize_Event_Handler, true);
window.addEventListener("keydown", Keydown_Event_Handler, true);

const canvas = document.getElementById("animation-canvas");
let canvasCtx = canvas.getContext("2d");
let canvasWidth = 0;
let canvasHeight = 0;
let currentAnimation = new Ring();
let state = new State();

Resize_Event_Handler(); // trigger to get starting values
DrawAnimation(state); // kick off the animation using requestAnimationFrame
NextAnimation(); // todo: just added this to set the composite value, should be handled via some initializer

//-------------------------//

function Resize_Event_Handler() {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  state.update(canvasWidth, canvasHeight);
}

function Keydown_Event_Handler(event) {
  switch (event.key) {
    case "ArrowRight":
      NextAnimation();
      break;
    case "ArrowLeft":
      PreviousAnimation();
      break;
  }
}

function NextAnimation() {
  //TODO: this should change with each animation... meaning we need a mapping
  canvasCtx.globalCompositeOperation = "lighter";
}

function PreviousAnimation() {}

function DrawAnimation() {
  requestAnimationFrame(DrawAnimation);
  currentAnimation.draw(canvasCtx, state);
}
