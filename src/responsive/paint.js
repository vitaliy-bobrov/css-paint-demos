class CirclesPainter {
  static getColor(width) {
    if (width > 500) {
      return 'rebeccapurple';
    } else if (width > 400) {
      return 'coral';
    } else {
      return 'red';
    }
  }

  paint(ctx, geom) {
    console.log('paint render');
    const offset = 10;
    const size = Math.min(geom.width, geom.height);
    const radius = (size / 4) - offset;
    const point = radius + offset;

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        ctx.fillStyle = CirclesPainter.getColor(geom.width);

        ctx.beginPath();
        ctx.arc(point + (i * (point * 2)), point + (j * (point * 2)), radius, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }
}

registerPaint('responsive', CirclesPainter);
