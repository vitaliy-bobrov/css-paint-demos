const PROGRESS = '--progress';

function rand(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Particle {
  constructor(x, y, rgbTuple) {
    this.x = x;
    this.y = y;
    this.rgbTuple = rgbTuple;
    this.speed = {
      x: -5 + Math.random() * 10,
      y: -5 + Math.random() * 10
    };
    this.radius = 5 + Math.random() * 5;
    this.life = 30 + Math.random() * 10;
    this.remainingLife = this.life;
  }

  draw(ctx) {
    if(this.remainingLife > 0 && this.radius > 0) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgb(${this.rgbTuple.join(',')})`;
      ctx.fill();

      this.remainingLife--;
      this.radius -= 0.25;
      this.x += this.speed.x;
      this.y += this.speed.y;
    }
  }
}

class ButtonParticlesPainter {
  static get inputProperties() {
    return [
      PROGRESS
    ];
  }

  static get inputArguments() {
    return [
      '<color>',
      '<color>'
    ];
  }

  constructor() {
    this.reset();
  }

  fillWithGradient(ctx, width, height, start, stop) {
    const gradient = ctx.createLinearGradient(0, 0, width, 0);

    gradient.addColorStop(0, start);
    gradient.addColorStop(1, stop);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  createParticles(width, height, count) {
    const x = rand(0, width);
    const y = rand(0, height);
    const rgbTuple = [255, 255, 255];

    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(x, y, rgbTuple));
    }

    this.init = true;
  }

  reset() {
    this.init = false;
    this.particles = [];
  }

  paint(ctx, {width, height}, props, args) {
    const start = args[0].toString();
    const stop = args[1].toString();
    const progress = Math.round(props.get(PROGRESS).value);

    this.fillWithGradient(ctx, width, height, start, stop);
    console.log(progress);

    if (!this.init) {
      this.createParticles(width, height, 100);
    }

    if (progress > 0 && progress < 100) {
      this.particles.forEach(p => {
        p.draw(ctx);
      });
    }

    if (progress === 100) {
      this.reset();
    }
  }
}

registerPaint('button-particles', ButtonParticlesPainter);
