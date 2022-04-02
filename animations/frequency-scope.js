export default class FrequencyScope {
  color = "#FFFFFF";

  draw(ctx, state, audioData) {
    ctx.clearRect(0, 0, state.w, state.h);
    let barWidth = state.w / audioData.length;
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = this.color;

    for (let i = 0; i < audioData.length; i++) {
      let percent = audioData[i] / 256;
      let percent2 =
        i < audioData.length ? audioData[i + 1] / 256 : audioData[i] / 256;
      let height = state.h * percent;
      let height2 = state.h * percent2;
      let offset = state.h - height - 1;
      let offset2 = state.h - height2 - 1;
      ctx.moveTo(i * barWidth, offset);
      ctx.lineTo(i * barWidth + barWidth, offset2);
    }
    ctx.stroke();
    ctx.closePath();
  }
}
