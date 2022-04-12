import { randomNumber, getAverageVolume, fadeCanvas } from "../globals.js";

export default class RedElectricity {
  analyserFunction = "getByteFrequencyData";
  galaxyStars = [];
  galaxyTotalStars = 350;
  lineFlux = 100;
  orbitFlux = 100;
  screenPadding = 100;
  mainColor = "#FF0000";
  oddsOfWhiteLine = 0.15;
  oddsOfBlueLine = 0.02;

  constructor() {
    for (let i = 0; i < this.galaxyTotalStars; i++) {
      this.galaxyStars.push({
        x: Math.random(),
        y: Math.random(),
        xD: 0,
        yD: 0,
        angle: 0,
        speed: randomNumber(-0.01, 0.01, 5),
        orbit: Math.random() * this.orbitFlux,
      });
    }
  }

  draw(ctx, data) {
    fadeCanvas(ctx, 0.7);
    let db = getAverageVolume(data);
    let w = ctx.canvas.width - this.screenPadding * 2;
    let h = ctx.canvas.height - this.screenPadding * 2;
    for (let i = 0; i < this.galaxyStars.length; i++) {
      let star = this.galaxyStars[i];
      star.angle += star.speed;
      star.xD =
        this.screenPadding +
        Math.floor(star.x * w + Math.cos(i + star.angle) * star.orbit);
      star.yD =
        this.screenPadding +
        Math.floor(star.y * h + Math.sin(i + star.angle) * star.orbit);
    }

    for (let a = 0; a < this.galaxyStars.length; a++) {
      let p1 = this.galaxyStars[a];
      let whiteOdds = db > 40 && Math.random() < this.oddsOfWhiteLine;
      let blueOdds = db > 60 && Math.random() < this.oddsOfBlueLine;
      let lineColor = whiteOdds
        ? "#FFFFFF"
        : blueOdds
        ? "#0000FF"
        : this.mainColor;
      for (let b = a; b < this.galaxyStars.length; b++) {
        let p2 = this.galaxyStars[b];
        let d = Math.sqrt(
          Math.pow(p1.xD - p2.xD, 2) + Math.pow(p1.yD - p2.yD, 2)
        );
        if (d < this.lineFlux) {
          ctx.beginPath();

          ctx.strokeStyle = lineColor; //"red"; // genColors.convert.rgba(lineColor,d/this.lineFlux);
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
