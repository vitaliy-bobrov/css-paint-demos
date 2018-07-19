class CirclesPainter {
  static get inputArguments() {
    return [
      '<number>',
      '<number>',
      '<percentage>'
    ];
  }

  paint(ctx, geom, props, args) {
    console.log('paint render');
    const offset = parseInt(args[0].toString(), 10);
    const count = parseInt(args[1].toString(), 10);
    const opacity = parseInt(args[2].toString(), 10) / 100;
    const size = Math.min(geom.width, geom.height);
    const radius = Math.max(Math.round(((size / count) - offset * 2) / 2), 10);
    const point = radius + offset;

    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        ctx.fillStyle = `rgba(0,
          ${Math.floor(255 - 42.5 * i)},
          ${Math.floor(255 - 42.5 * j)},
          ${opacity})`;

        ctx.beginPath();
        ctx.arc(point + (i * (point * 2)), point + (j * (point * 2)), radius, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }
}

registerPaint('circles', CirclesPainter);
