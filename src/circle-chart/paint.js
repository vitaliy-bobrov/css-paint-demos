class CircleChartPainter {
  static get inputProperties() {
    return [
      '--chart-inner-radius',
      '--chart-outer-radius',
      '--chart-value'
    ];
  }

  static get inputArguments() {
    return ['<color>', '<color>'];
  }

  paint(ctx, geom, props, args) {
    const outerR = parseInt(props.get('--chart-outer-radius').toString(), 10) || 100;
    const innerR = parseInt(props.get('--chart-inner-radius').toString(), 10) || 0;
    const value = parseFloat(props.get('--chart-value').toString()) || 0;
    const size = Math.min(geom.width, geom.height);
    const outerRadius = size * outerR / 200;
    const innerRadius = size * innerR / 200;
    const x = geom.width / 2;
    const y = geom.height / 2;
    const [background, foreground] = args;

    ctx.fillStyle = background.toString();

    ctx.beginPath();
    ctx.arc(x, y, outerRadius, 0, Math.PI * 2, false);
    ctx.arc(x, y, innerRadius, 0, Math.PI * 2, true);
    ctx.fill();

    ctx.fillStyle = foreground.toString();

    const sRadian = Math.PI * 1.5;
    const eRadian = Math.PI * 2 * (0.75 + value / 100);
    ctx.beginPath();
    ctx.arc(x, y, outerRadius, sRadian, eRadian, false);
    ctx.arc(x, y, innerRadius, eRadian, sRadian, true);
    ctx.fill();
  }
}

registerPaint('circle-chart', CircleChartPainter);
