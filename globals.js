export { getAverageVolume, randomNumber, fadeCanvas };

function getAverageVolume(array) {
  let sum = array.reduce((a, b) => a + b, 0);
  return sum / array.length;
}

function randomNumber(from, to, decimals) {
  return decimals
    ? Number(
        (Math.random() * (Number(to) - Number(from)) + Number(from)).toFixed(
          decimals
        )
      )
    : Number(Math.random() * (to - from) + from);
}

function fadeCanvas(ctx, fadeAmount = 0.9) {
  //partial erase
  let oldArray = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  for (let d = 3; d < oldArray.data.length; d += 4) {
    //count through only the alpha pixels
    //dim it with some feedback, I'm using .9
    oldArray.data[d] = Math.floor(oldArray.data[d] * fadeAmount);
  }
  ctx.putImageData(oldArray, 0, 0);
}
