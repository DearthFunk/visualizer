import { getAverageVolume, randomNumber } from "../globals.js";

export default class ParticleRing {
  analyserFunction = "getByteFrequencyData";
  tracerLines = true;
  innerRadius = 20;
  outerRadius = 400;
  dbIntensity = 20;
  maxSize = 5;
  total = 300;
  speed = 0.05;
  layers = 5;
  particles = [];

  constructor() {
    for (let i = 0; i < this.layers; i++) {
      this.particles.push([]);
    }
  }

  createParticle({ xCenter, yCenter }) {
    return {
      position: { x: xCenter, y: yCenter },
      size: randomNumber(0.01, 1),
      angle: 0,
      speed: 0.05 + Math.random(),
      targetSize: 1,
      fillColor: "rgba(100, 100, 100, 0.4)",
      orbit: Math.random(),
      direction: randomNumber(0, 1, 0),
    };
  }

  draw(ctx, data) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    let db = (getAverageVolume(data) * this.dbIntensity) / 10;
    for (let x = 0; x < this.layers; x++) {
      for (let i = 0; i < this.total; i++) {
        if (!this.particles[x][i]) {
          this.particles[x].push(this.createParticle(ctx.canvas));
        }
        let particle = this.particles[x][i];

        let lp = { x: particle.position.x, y: particle.position.y };
        let dbAdjust = db / 100;
        particle.direction == 0
          ? (particle.angle -= particle.speed * this.speed * dbAdjust)
          : (particle.angle += particle.speed * this.speed * dbAdjust);

        let orbit =
          this.innerRadius +
          particle.orbit * (this.outerRadius - this.innerRadius);

        particle.position.x =
          ctx.canvas.xCenter +
          Math.cos(i + particle.angle) * (orbit + db / (x + 1));
        particle.position.y =
          ctx.canvas.yCenter +
          Math.sin(i + particle.angle) * (orbit + db / (x + 1));
        ctx.beginPath();
        ctx.fillStyle = particle.fillColor;

        if (this.tracerLines && db > 0) {
          ctx.strokeStyle = particle.fillColor;
          ctx.lineWidth = particle.size * this.maxSize;
          ctx.moveTo(lp.x, lp.y);
          ctx.lineTo(particle.position.x, particle.position.y);
          ctx.stroke();
        }
        ctx.arc(
          particle.position.x,
          particle.position.y,
          (particle.size * this.maxSize) / 2,
          0,
          Math.PI * 2,
          true
        );
        ctx.fill();
      }
    }
  }
}
