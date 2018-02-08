class CirclesPainter {
  static get inputProperties() {
    return [
      '--circles-offset',
      '--circles-count',
      '--circles-opacity'
    ];
  }

  paint(ctx, geom, props) {
    const offset = parseInt(props.get('--circles-offset').toString(), 10) || 0;
    const count = parseInt(props.get('--circles-count').toString(), 10) || 2;
    const opacity = parseFloat(props.get('--circles-opacity').toString()) || 1;
    const radius = Math.max(Math.round(((geom.width / count) - offset * 2) / 2), 10);
    const point = radius + offset;

    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        ctx.fillStyle = `rgba(0, ${Math.floor(255 - 42.5 * i)}, ${Math.floor(255 - 42.5 * j)}, ${opacity})`;

        ctx.beginPath();
        ctx.arc(point + (i * (point * 2)), point + (j * (point * 2)), radius, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }
}

registerPaint('circles', CirclesPainter);
