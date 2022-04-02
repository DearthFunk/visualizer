import { getAverageVolume } from "../globals.js";

export default class LineConnections {
  galaxyStars = [];
  galaxyTotalStars = 400;
  lineFlux = 50;
  orbitFlux = 100;
  speed = 0.03;
  hPadding = 360;
  wPadding = 160;
  twoPI = Math.PI * 2;

  constructor() {
    for (let i = 0; i < this.galaxyTotalStars; i++) {
      this.galaxyStars.push({
        x: Math.random(),
        y: Math.random(),
        xD: 0,
        yD: 0,
        size: Math.random() + 0.01,
        angle: 0,
        speed: Math.random() * this.speed + 0.01,
        orbit: Math.random() * this.orbitFlux,
      });
    }
  }

  draw(ctx, state, data) {
    ctx.clearRect(0, 0, state.w, state.h);
    let db = getAverageVolume(data);
    ctx.fillStyle = "#FFFFFF";
    let w = state.w - this.wPadding * 2;
    let h = state.h - this.hPadding * 2;
    for (let i = 0; i < this.galaxyStars.length; i++) {
      let star = this.galaxyStars[i];

      star.angle += star.speed;
      star.xD =
        this.wPadding +
        Math.floor(
          star.x * w + Math.cos(i + star.angle) * ((star.orbit * db) / 100)
        );
      star.yD =
        this.hPadding +
        Math.floor(
          star.y * h + Math.sin(i + star.angle) * ((star.orbit * db) / 100)
        );

      ctx.beginPath();
      ctx.arc(star.xD, star.yD, star.size, 0, this.twoPI, true);
      ctx.fill();
      ctx.closePath();
    }

    for (let a = 0; a < this.galaxyStars.length; a++) {
      let p1 = this.galaxyStars[a];
      for (let b = a; b < this.galaxyStars.length; b++) {
        let p2 = this.galaxyStars[b];
        let d = Math.sqrt(
          Math.pow(p1.xD - p2.xD, 2) + Math.pow(p1.yD - p2.yD, 2)
        );
        if (d < this.lineFlux) {
          ctx.beginPath();
          ctx.strokeStyle = "rgba(255,0,0," + d / this.lineFlux + ")";
          ctx.lineWidth = 1 - d / this.lineFlux;

          ctx.moveTo(p1.xD, p1.yD);
          ctx.lineTo(p2.xD, p2.yD);
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  }
}
