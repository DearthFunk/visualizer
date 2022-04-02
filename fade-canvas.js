export { fadeCanvas };

function fadeCanvas(ctx, state, fadeAmount = 0.9) {
  //partial erase
  let oldArray = ctx.getImageData(0, 0, state.w, state.h);
  for (let d = 3; d < oldArray.data.length; d += 4) {
    //count through only the alpha pixels
    //dim it with some feedback, I'm using .9
    oldArray.data[d] = Math.floor(oldArray.data[d] * fadeAmount);
  }
  ctx.putImageData(oldArray, 0, 0);
}
