class StarRatingPainter {
  static get inputProperties() {
    return [
      '--rating',
      '--star-corners',
      'stroke-width',
      'stroke',
      'fill'
    ];
  }

  paint(ctx, geom, props) {
    this.ctx = ctx;
    const ratingInput = parseFloat(props.get('--rating').toString(), 10);
    const rating = this._limitRating(ratingInput);
    const cornersInput = parseInt(props.get('--star-corners').toString(), 10);
    const corners = this._limitCorners(cornersInput);
    const strokeWidth = props.get('stroke-width').value || 2;
    const strokeColor = props.get('stroke').toString().trim() || 'orange';
    const fillColor = props.get('fill').toString().trim() || 'orange';

    const radius = geom.height / 2;
    const point = (geom.width / 5);
    const cY = radius;

    for (let i = 0; i < 5; i++) {
      const cX = (i * point) + (point / 2);
      const fill = rating - i;

      this._drawStar(radius, cX, cY, corners);
      this._stroke(strokeWidth, strokeColor);
      this._fill(fill, fillColor, cX, radius);
    }
  }

  _limitRating(input) {
    if (input < 0) {
      return 0;
    }

    if (input > 5) {
      return 5;
    }

    return input;
  }

  _limitCorners(input) {
    if (input < 5) {
      return 5;
    }

    if (input > 10) {
      return 10;
    }

    return input;
  }

  _drawStar(R, cX, cY, N) {
    this.ctx.beginPath();
    this.ctx.moveTo(cX, cY + R / 2);

    for (let i = 1; i <= N * 2; i++) {
      const theta = i * (Math.PI * 2) / (N * 2);
      const angle = i % 2 === 0 ? R / 2 : R;
      const x = cX + (angle * Math.sin(theta));
      const y = cY + (angle * Math.cos(theta));

      this.ctx.lineTo(x ,y);
    }

    this.ctx.closePath();
  }

  _stroke(strokeWidth, strokeColor) {
    this.ctx.lineWidth = strokeWidth;
    this.ctx.strokeStyle = strokeColor;
    this.ctx.stroke();
  }

  _fill(fill, fillColor, cX, R) {
    if (fill <= 0) {
      return;
    }

    if (fill >= 1) {
      this.ctx.fillStyle = fillColor;
    } else {
      const x1 = cX - R;
      const x2 = x1 + (R * 2);
      const gradient = this.ctx.createLinearGradient(x1, 0, x2, 0);
      gradient.addColorStop(0, fillColor);
      gradient.addColorStop(fill, fillColor);
      gradient.addColorStop(fill, 'white');
      gradient.addColorStop(1, 'white');

      this.ctx.fillStyle = gradient;
    }

    this.ctx.fill();
  }
}

registerPaint('star-rating', StarRatingPainter);
