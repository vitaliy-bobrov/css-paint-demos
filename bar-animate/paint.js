class BarChartPainter {
  static get inputProperties() {
    return [
      '--bar-map',
      '--bar-placement',
      '--bar-gap',
      '--bar-max',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left'
    ];
  }

  paint(ctx, geom, props) {
    const position = props.get('--bar-placement').toString().trim();
    const gap = parseInt((props.get('--bar-gap') || 10).toString(), 10);
    const max = parseInt(props.get('--bar-max').toString(), 10);
    const padding = {
      top: props.get('padding-top').value || 10,
      right: props.get('padding-right').value || 10,
      bottom: props.get('padding-bottom').value || 10,
      left: props.get('padding-left').value || 10
    };
    const vertical = position === 'top' || position === 'bottom';
    const width = geom.width - padding.left - padding.right;
    const height = geom.height - padding.top - padding.bottom;
    const data = JSON.parse(props.get('--bar-map').toString());

    const domain = vertical ? height : width;
    const baseWidth = vertical ? width : height;
    const multiplier = domain / max;
    const barWidth = (baseWidth - (gap * (data.length - 1))) / data.length;

    for (let i = 0; i < data.length; i++) {
      const x = i * (barWidth + gap) + padding.left;
      const barHeight = data[i].value * multiplier;
      const y = {
        top: padding.top,
        right: domain - barHeight + padding.left,
        bottom: domain - barHeight + padding.top,
        left: padding.left
      }[position];

      ctx.fillStyle = data[i].color;

      if (vertical) {
        ctx.fillRect(x, y, barWidth, barHeight);
      } else {
        ctx.fillRect(y, x, barHeight, barWidth);
      }
    }
  }
}

registerPaint('bar-chart', BarChartPainter);
