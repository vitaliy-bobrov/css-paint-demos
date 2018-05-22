function roundTo(n, step) {
  return Math.round(n / step) * step;
}

function lerp(a, b, t) {
  return a + t * (b - a);
}

function getRandomItem(arr) {
  return arr[Math.floor(arr.length * Math.random())];
}

function nearestPow2(aSize) {
  return Math.pow(2, Math.round(Math.log(aSize) / Math.log(2)));
}

class CanvasFigures {
  static drawCircle(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
  }

  static drawPolygon(ctx, x, y, r, a, sides) {
    const aDelta = 2 * Math.PI / sides;

    ctx.beginPath();

    for (let i = 0; i < sides; i++) {
      const method = i === 0 ? 'moveTo' : 'lineTo';

      ctx[method](x + r * Math.cos(a + i * aDelta), y + r * Math.sin(a + i * aDelta));
    }

    ctx.closePath();
  }

  static drawTriangle(ctx, x, y, r, a) {
    CanvasFigures.drawPolygon(ctx, x, y, r, a, 3);
  }

  static drawHexagon(ctx, x, y, r, a) {
    CanvasFigures.drawPolygon(ctx, x, y, r, a, 6);
  }

  static drawLine(ctx, x, y, r, a) {
    ctx.beginPath();
    ctx.lineTo(x + r * -Math.cos(a), y + r * -Math.sin(a));
    ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
    ctx.closePath();
  }

  static get figureMethods() {
    return ['drawCircle', 'drawLine', 'drawHexagon', 'drawTriangle'];
  }
}

const rgbSplitRegExp = /(?!\))\s(?=r)/;

class PatternBgPainter {
  static get inputArguments() {
    return ['<color>+'];
  }

  static get inputProperties() {
    return [
      'background-size'
    ];
  }

  drawShape(ctx, width, height, gridSize, shapeOptions, colors) {
    const drawMethod = getRandomItem(CanvasFigures.figureMethods);

    const lineWidth = lerp(shapeOptions.lineWidthMin, shapeOptions.lineWidthMax, Math.random());
    const r = lerp(shapeOptions.shapeSizeMin, shapeOptions.shapeSizeMax, Math.random());

    const xMin = r + lineWidth;
    const xMax = width - xMin;
    const yMin = xMin;
    const yMax = height - yMin;
    const x = roundTo(lerp(xMin, xMax, Math.random()), gridSize);
    const y = roundTo(lerp(yMin, yMax, Math.random()), gridSize);
    const a = roundTo(Math.random() * 2 * Math.PI, Math.PI * 0.5);
    const drawStyle = Math.random() < shapeOptions.fillProbability ? 'fill' : 'stroke';

    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = ctx.strokeStyle = getRandomItem(colors);

    CanvasFigures[drawMethod](ctx, x, y, r, a);
    ctx[drawStyle]();
    ctx.restore();
  }

  paint(ctx, {width, height}, props, args) {
    const palette = args[0].toString().split(rgbSplitRegExp);
    const bgSize = props.get('background-size').toString();
    const scaler = (bgSize === 'auto' ? 100 : parseInt(bgSize, 10)) / 100;
    const size = Math.max(width, height);
    const gridSize = nearestPow2(Math.round(size / 16));
    const shapeCount = Math.pow(8, 2);

    const shapeOptions = {
      fillProbability: 0.2,

      lineWidthMin: 1,
      lineWidthMax: 8 * scaler,

      shapeSizeMin: 4 * scaler,
      shapeSizeMax: 8 * scaler,
    };

    for (let i = 0; i < shapeCount; i++) {
      this.drawShape(ctx, width, height, gridSize, shapeOptions, palette);
    }
  }
}

registerPaint('pattern-bg', PatternBgPainter);
