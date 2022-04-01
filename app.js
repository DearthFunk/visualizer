window.addEventListener("resize", Resize_Event_Handler, true);
const canvas = document.getElementById("animation-canvas");
let canvasWidth = 0;
let canvasHeight = 0;

function Resize_Event_Handler() {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  /*
    TODO: REMOVE THIS
    just setting up :)
  */
  let context = canvas.getContext("2d");
  context.fillText("Goodbye world", 20, 20);
}

Resize_Event_Handler();
