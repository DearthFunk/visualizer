import { getAverageVolume } from "../get-average-db.js";
export default class Tunnel {
  lines = [{ r: 0 }, { r: 8 }];
  color = "#FFFFFF";
  speed = 1;

  draw(ctx, state, data) {
    ctx.strokeStyle = this.color;
    ctx.clearRect(0, 0, state.w, state.h);
    let nextIndex = false;
    let db = getAverageVolume(data);

    ctx.lineWidth = 1;

    for (let index = 0; index < this.lines.length + 1; index++) {
      if (this.lines[index]) {
        this.lines[index].r +=
          Math.round(this.speed) +
          Math.pow(this.lines[index].r, 2) / 20000 +
          db / 3;
        ctx.beginPath();

        ctx.arc(
          state.xCenter,
          state.yCenter,
          this.lines[index].r,
          0,
          2 * Math.PI,
          true
        );

        ctx.stroke();
        ctx.closePath();
      } else if (!nextIndex && this.lines.length) {
        nextIndex = true;
        if (this.lines[index - 1].r > 8) {
          this.lines.push({ r: 1 });
        }
      }
    }
    for (let index = 0; index < this.lines.length; index++) {
      if (this.lines[index].r > state.xCenter + 60) {
        this.lines.splice(index, 1);
      }
    }
  }
}
