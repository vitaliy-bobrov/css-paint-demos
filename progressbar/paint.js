const PROGRESS_PROP = '--progress';
const PARTICLES_PROP = '--progress-particles';
const COLOR_PROP = '--progress-color';
const CIRCLE_RAD = 2 * Math.PI;

function rand(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = rand(10, 1);
    this.vy = rand(15, 1);
    this.gravity = rand(3, 1);
    this.size = rand(3, 1);
    this.color = `hsla(${rand(0, 360)}, 100%, 50%, 84%)`;
  }

  move(ctx, x, y) {
    this.x = x;
    this.y = y;
    this.vy = rand(15, 1);
    this.gravity = rand(3, 1);

    this.draw(ctx);
  }

  update(ctx) {
    this.x -= this.vx;
    this.y -= this.vy;
    this.vy -= this.gravity;
    this.gravity -= 0.01;

    this.draw(ctx);
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, CIRCLE_RAD);
    ctx.fill();
  }
}

class ProgressBarPainter {
  static get inputProperties() {
    return [
      PROGRESS_PROP,
      PARTICLES_PROP,
      COLOR_PROP,
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left'
    ];
  }

  static get inputArguments() {
    return [
      '<color>'
    ];
  }

  constructor() {
    this.particles = [];
  }

  createParticles(ctx, x, y, count) {
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(x, y));
    }

    this.particles.forEach(p => p.draw(ctx));
  }

  renderBar(ctx, top, left, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(left, top, w, h);
  }

  renderProgress(ctx, top, left, w, h, progress, color) {
    const grad = ctx.createLinearGradient(0, 0, w + left, 0);
    grad.addColorStop(0, color);
    grad.addColorStop(progress / 100, color);
    grad.addColorStop(progress / 100, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(left, top, w, h);
  }

  paint(ctx, {width, height}, props, args) {
    const progress = Math.round(props.get(PROGRESS_PROP).value || 0);
    const particlesNum = Math.round(props.get(PARTICLES_PROP).value || 50);
    const progressColor = props.get(COLOR_PROP).toString() || 'green';
    const padding = {
      top: props.get('padding-top').value,
      right: props.get('padding-right').value,
      bottom: props.get('padding-bottom').value,
      left: props.get('padding-left').value
    };
    const bg = args[0].toString().trim();
    const barW = width - padding.left - padding.right;
    const barH = height - padding.top - padding.bottom;
    const left = width * progress / 100;
    const halfH = barH / 2;
    const top = padding.top + barH / 2;
    const spread = Math.min(barH / 2, 5);

    this.renderBar(ctx, padding.top, padding.left, barW, barH, bg);
    this.renderProgress(ctx, padding.top, padding.left, barW, barH, progress, progressColor);

    if (!this.particles.length && progress < 100 && progress > 0) {
      this.createParticles(ctx, left, top, particlesNum);
    } else if (progress < 100 && progress > 0) {
      const particlesDiff = particlesNum - this.particles.length;
      if (particlesDiff < 0) {
        this.particles.splice(particlesDiff, Math.abs(particlesDiff));
      }

      this.particles.forEach((p, i) => {
        if (p.x <= 0 || p.x >= padding.left + barW ||
          p.y >= height || p.y <= 0) {
          p.move(ctx, left - rand(spread, -spread), top - rand(spread, -spread));
        } else {
          p.update(ctx);
        }
      });
    } else {
      this.particles = [];
    }
  }
}

registerPaint('progress-bar', ProgressBarPainter);
