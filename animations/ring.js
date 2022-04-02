import randomNumber from "../random-number.js";

export default class Ring {
  constructor() {
    this.ringClusterAngle = 0;
    this.ringDots = [];
    this.ringTotalDots = 30;
    this.ringTotalClusters = 30;
  }

  _ringdot() {
    return {
      r: randomNumber(2, 10),
      speed: randomNumber(0, 0.04),
      orbit: Math.random() * 10,
      angle: 0,
    };
  }

  draw(ctx, state) {
    ctx.clearRect(0, 0, state.w, state.h);
    ctx.fillStyle = "#FFFFFF";
    this.ringClusterAngle += 0.00005; //TODO: interaction = state.mouseDistanceFromCenter / 20000;

    for (let cluster = 0; cluster < this.ringTotalClusters; cluster++) {
      let clusterA = (cluster / this.ringTotalClusters) * 2 * Math.PI;
      let clusterX =
        ((state.mainRadius * 2) / 3) *
          Math.cos(
            clusterA +
              (cluster % 2 == 0
                ? this.ringClusterAngle
                : -1 * this.ringClusterAngle)
          ) +
        state.xCenter;
      let clusterY =
        ((state.mainRadius * 2) / 3) *
          Math.sin(
            clusterA +
              (cluster % 2 == 0
                ? this.ringClusterAngle
                : -1 * this.ringClusterAngle)
          ) +
        state.yCenter;

      if (this.ringDots[cluster] == undefined) {
        this.ringDots.push([]);
      }
      for (let i = 0; i < this.ringTotalDots; i++) {
        if (!this.ringDots[cluster][i]) {
          this.ringDots[cluster].push(this._ringdot());
        }

        let dot = this.ringDots[cluster][i];
        dot.r -= 0.01; //TODO: interaction = 5 / state.mouseDistanceFromCenter;
        dot.angle += dot.speed;

        if (dot.r < 0) {
          this.ringDots[cluster][i] = this._ringdot();
        } else {
          ctx.beginPath();
          ctx.arc(
            clusterX + Math.cos(i + dot.angle) * dot.orbit * dot.angle * 4.5,
            clusterY + Math.sin(i + dot.angle) * dot.orbit * dot.angle * 4.5,
            dot.r,
            0,
            Math.PI * 2,
            true
          );
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }
}