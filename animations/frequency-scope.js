export default class FrequencyScope {
  color = "#FFFFFF";

  draw(ctx, audioData) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    let barWidth = ctx.canvas.width / audioData.length;
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = this.color;

    for (let i = 0; i < audioData.length; i++) {
      let percent = audioData[i] / 256;
      let percent2 =
        i < audioData.length ? audioData[i + 1] / 256 : audioData[i] / 256;
      let height = ctx.canvas.height * percent;
      let height2 = ctx.canvas.height * percent2;
      let offset = ctx.canvas.height - height - 1;
      let offset2 = ctx.canvas.height - height2 - 1;
      ctx.moveTo(i * barWidth, offset);
      ctx.lineTo(i * barWidth + barWidth, offset2);
    }
    ctx.stroke();
    ctx.closePath();
  }
}
