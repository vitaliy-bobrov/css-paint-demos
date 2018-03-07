class CirclesPainter {
  paint(ctx, geom, props) {
    console.log('paint render');
    const offset = 10;
    const size = Math.min(geom.width, geom.height);
    const radius = (size / 4) - offset;
    const point = radius + offset;

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        ctx.fillStyle = `rgb(0, ${Math.floor(255 - 42.5 * i)}, ${Math.floor(255 - 42.5 * j)})`;

        ctx.beginPath();
        ctx.arc(point + (i * (point * 2)), point + (j * (point * 2)), radius, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }
}

registerPaint('circles', CirclesPainter);
